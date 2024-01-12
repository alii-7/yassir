const fs = require("fs");
const {
  AIR_VISUAL_API_KEY,
  BASE_URL,
  JSON_FILE_PATH,
  ENV,
  SECRET_ACCESS_KEY,
  ACCESS_KEY,
  TABLE_NAME,
} = require("./consts");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

// Configure the AWS region
const REGION = "us-east-1";
const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(ddbClient);

// Utility function to append data to a JSON file
const read = async () => {
  try {
    if (ENV === "dev") {
      // Read the JSON file synchronously
      const jsonData = fs.readFileSync(JSON_FILE_PATH, "utf-8");

      // Parse the JSON data
      const parsedData = JSON.parse(jsonData);

      return parsedData;
    } else {
      const data = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NAME,
        })
      );
      return data.Items;
    }
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    return null;
  }
};

// Utility function to append data to a JSON file
const save = async (data) => {
  if (ENV === "dev") {
    let jsonData = [];

    try {
      // Read existing data from the file
      const fileContent = fs.existsSync(JSON_FILE_PATH)
        ? fs.readFileSync(JSON_FILE_PATH, "utf-8")
        : "";

      // If the file is not empty, parse its content
      if (fileContent) {
        jsonData = JSON.parse(fileContent);

        // Ensure jsonData is an array
        if (!Array.isArray(jsonData)) {
          console.error(
            "Existing data in the file is not an array. Initializing jsonData as an empty array."
          );
          jsonData = [];
        }
      }
    } catch (error) {
      console.error("Error reading JSON file:", error.message);
    }

    // Append new data
    jsonData.push(data);

    // Write the updated data back to the file
    try {
      fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(jsonData, null, 2));
    } catch (error) {
      console.error("Error writing to JSON file:", error.message);
    }
  } else {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        PK: data.Result.Pollution.ts.toString(),
        SK: data.Result.Pollution.aqius.toString(),
        ...data,
      },
    };

    try {
      const data = await docClient.send(new PutCommand(params));
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
};

// Utility function to construct URL
const constructURL = (lat, long) => {
  return `${BASE_URL}/v2/nearest_city?lat=${lat}&lon=${long}&key=${AIR_VISUAL_API_KEY}`;
};

// Utility function to find max aqius
const findMaxPolluted = (pollutionData) => {
  let maxItem = pollutionData[0];

  for (const item of pollutionData.slice(1)) {
    if (
      item["Result"]["Pollution"]["aqius"] >
      maxItem["Result"]["Pollution"]["aqius"]
    ) {
      maxItem = item;
    }
  }

  return maxItem;
};

// Export the constants
module.exports = {
  read,
  save,
  findMaxPolluted,
  constructURL,
};
