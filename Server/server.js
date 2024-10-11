const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const weatherRouter = require("./routes/weather");
const scheduleRouter = require("./routes/schedule");

app.use("/api", weatherRouter);
app.use("/api", scheduleRouter);

app.listen(port, () => {
     console.log(`Server running on http://localhost:${port}`);
});
