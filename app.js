const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cron = require("node-cron");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const toastr = require("express-toastr");
const port = process.env.PORT;
const dbURI = process.env.DB_URI;
var fs = require("fs");

const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const apiRoute = require("./routes/api");
const {
  storeTwoDData,
  storeBTCData,
  intervalProcess,
  scrapeData,
  updateTwoDRunning,
  getHoliday,
  deleteBTCDate,
} = require("./helper");
const e = require("connect-flash");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "thisissessionsecret12345",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(toastr());

function isWeekend(date = new Date()) {
  return date.getDay() === 6 || date.getDay() === 0;
}

async function isHoliday(todayDate) {
  const holiday = await getHoliday();
  const hasHolidayValue = holiday.some((d) => d.date === todayDate);
  return hasHolidayValue;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// check every midnight
cron.schedule("33 0 * * *", () => {
  // cron.schedule("20 1 * * *", () => {
  const today = new Date();
  const todayDate =
    today.getDate() +
    " " +
    months[today.getMonth()] +
    " " +
    today.getFullYear();

  fs.appendFile("./logs/schedule.txt", `Date - ${todayDate}`, function (err) {
    if (err) {
      console.log("log write error");
    } else {
      console.log("log write success");
    }
  });
  if (!isWeekend(today)) {
    console.log("Today is not weekend");
    fs.appendFile("./logs/schedule.txt", ` / BTC (Open)`, function (err) {
      if (err) {
        console.log("log write error");
      } else {
        console.log("log write success");
      }
    });
    // schedules
    console.log("BTC Data will store at 12:01 PM");
    cron.schedule("34 0 * * *", () => {
      // cron.schedule("1 12 * * *", () => {
      // store data at 12:01 PM
      storeBTCData("12:01");
    });
    console.log("BTC Data will store at 4:30 PM");
    cron.schedule("30 16 * * *", () => {
      // store data at 4:30 PM
      storeBTCData("4:30");
    });
  } else {
    fs.appendFile(
      "./logs/schedule.txt",
      ` / BTC (Close - Weekend)`,
      function (err) {
        if (err) {
          console.log("log write error");
        } else {
          console.log("log write success");
        }
      }
    );
  }

  isHoliday(todayDate).then((status) => {
    if (!status) {
      console.log("today is not holiday");
      if (!isWeekend(today)) {
        fs.appendFile("./logs/schedule.txt", ` / 2D (Open)`, function (err) {
          if (err) {
            console.log("log write error");
          } else {
            console.log("log write success");
          }
        });

        // schedules
        console.log("2D Data will store at 12:01 PM");
        cron.schedule("1 12 * * *", () => {
          // store data at 12:01 PM
          storeTwoDData("12:01");
        });

        console.log("2D Data will store at 4:30 PM");
        cron.schedule("30 16 * * *", () => {
          // store data at 4:30 PM
          storeTwoDData("4:30");
        });
      } else {
        fs.appendFile(
          "./logs/schedule.txt",
          ` / 2D (Close - Weekend)`,
          function (err) {
            if (err) {
              console.log("log write error");
            } else {
              console.log("log write success");
            }
          }
        );
      }
    } else {
      fs.appendFile(
        "./logs/schedule.txt",
        ` / 2D (Close - Holiday)`,
        function (err) {
          if (err) {
            console.log("log write error");
          } else {
            console.log("log write success");
          }
        }
      );
    }
  });
});

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (result) {
    console.log("App is running at Port " + port);
    app.listen(port, "localhost");
  })
  .catch((err) => console.log(err));

app.use("/panel", adminRoute);
app.use("/api", apiRoute);
app.use("/", userRoute);

app.use((req, res) => {
  res.send("<h1>404 Not Found</h1>");
});
