const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cron = require("node-cron");

const port = process.env.PORT;
const dbURI = process.env.DB_URI;

const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const apiRoute = require("./routes/api");
const { storeTwoDData, storeBTCData } = require("./helper");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// schedules
cron.schedule("1 12 * * *", () => {
  // store data at 12:01 PM
  storeTwoDData();
});

cron.schedule("30 4 * * *", () => {
  // store data at 4:30 PM
  storeTwoDData();
});

cron.schedule("54 20 * * *", () => {
  // store data at Testing Time
  // storeTwoDData();
});

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (result) {
    console.log("App is running at Port " + port);
    app.listen(port);
  })
  .catch((err) => console.log(err));

app.use("/panel", adminRoute);
app.use("/api", apiRoute);
app.use("/", userRoute);

app.use((req, res) => {
  res.send("<h1>404 Not Found</h1>");
});
