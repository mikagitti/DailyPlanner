const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/schedule", async (req, res) => {
     try {
          const response = await axios.get("http://localhost:5000/schedule");
          console.log(response.data);
          res.json(response.data);
     } catch (error) {
          res.status(500).json({
               message: "Error fetching data",
               error: error.message,
          });
     }
});

module.exports = router;
