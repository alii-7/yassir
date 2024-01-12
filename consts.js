require("dotenv").config();

// CONSTANTS
const ENV = "prod";
const PORT = 3000;
const JSON_FILE_PATH = "Data.json";
const AIR_VISUAL_API_KEY = "ef2ddc6d-8fb6-4d1e-becc-1fbf29f21186";
const BASE_URL = "http://api.airvisual.com";
const PARIS_LAT = 48.856613;
const PARIS_LONG = 2.352222;
const CRON_JOB_EXPRESSION = "0 * * * *";
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const TABLE_NAME = "pollution";

// Export the constants
module.exports = {
  PORT,
  JSON_FILE_PATH,
  AIR_VISUAL_API_KEY,
  BASE_URL,
  PARIS_LAT,
  PARIS_LONG,
  CRON_JOB_EXPRESSION,
  ENV,
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
  TABLE_NAME,
};
