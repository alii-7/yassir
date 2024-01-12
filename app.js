const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cron = require("node-cron");
const appRoutes = require("./routes");
const app = express();

const { save, constructURL } = require("./utils.js");
const {
  PORT,
  PARIS_LAT,
  PARIS_LONG,
  CRON_JOB_EXPRESSION,
} = require("./consts");

// MIDDLEWARE
app.use(bodyParser.json());

// ROUTES
app.use("/v1", appRoutes);

// CRON JOB - to check air quality
cron.schedule(CRON_JOB_EXPRESSION, async () => {
  console.log("Running cron job to check air quality for Paris...");

  try {
    const airVisualEndpoint = constructURL(PARIS_LAT, PARIS_LONG);

    const response = await axios.get(airVisualEndpoint);
    if (response.status === 200) {
      const data = {
        Result: { Pollution: response.data.data.current.pollution },
      };
      await save(data);
      console.log("Air quality saved:", data);
    } else {
      console.error("Error fetching data from AirVisual API:", response.status);
    }
  } catch (error) {
    console.error("Internal Server Error");
  }
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
