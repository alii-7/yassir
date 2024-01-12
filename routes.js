const express = require("express");
const axios = require("axios");

const router = express.Router();

const { read, findMaxPolluted, constructURL } = require("./utils");
// ROUTES

// Health Route
router.get("/", (_, res) => {
  res.json({ message: "Healthy" });
});

// Ait Quality Route
router.get("/air-quality", async (req, res) => {
  const { longitude, latitude } = req.query;

  if (!longitude || !latitude) {
    res
      .status(400)
      .json({ error: "Longitude and latitude are required parameters." });
  } else {
    try {
      const airVisualEndpoint = constructURL(latitude, longitude);

      const response = await axios.get(airVisualEndpoint);

      if (response.status === 200) {
        res.json({
          Result: { Pollution: response.data.data.current.pollution },
        });
      } else {
        res
          .status(response.status)
          .json({ message: "Error fetching data from AirVisual API." });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Find Max Pollution Route
router.get("/most-polluted", async (req, res) => {
  try {
    const data = await read();
    return res
      .status(400)
      .send(
        `Paris is most polluted at ${findMaxPolluted(data).Result.Pollution.ts}`
      );
  } catch (error) {
    console.error("Internal Server Error1");
  }
});

module.exports = router;
