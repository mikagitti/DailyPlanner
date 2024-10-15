const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = process.env.OPENWEATHERMAP_API_KEY;
const city = "Oulu";
const units = "metric"; // For Celsius
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
let lastFetchTime = null;
let previouslyFetchWeather = null;
const fetchIntervalInMinutes = 2 * 60 * 1000; //Limit the fetch frequency : 1 fetch per 2 minutes.

function isFetchIntervalPassed() {
     let isIntervalPassed = true;
     const currentTime = Date.now();

     if (lastFetchTime) {
          isIntervalPassed =
               currentTime - lastFetchTime > fetchIntervalInMinutes;
     }

     if (isIntervalPassed) {
          lastFetchTime = currentTime;
     }

     return isIntervalPassed;
}

router.get("/weather", async (req, res) => {
     try {
          if (!apiKey) {
               return res.status(400).json({
                    message: "API key is missing",
               });
          }

          if (isFetchIntervalPassed() === false) {
               return res.json(previouslyFetchWeather);
          }

          const response = await axios.get(apiUrl);
          previouslyFetchWeather = response.data;
          res.json(response.data);
     } catch (error) {
          res.status(500).json({
               message: "Error fetching data",
               error: error.message,
          });
     }
});

module.exports = router;
