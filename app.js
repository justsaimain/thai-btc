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
} = require("./helper");

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

// function isHoliday(todayDate) {
//   await getHoli().then((res) => {
//     const found = res.find((element) => element.date === todayDate);
//     return found;
//   });
// }

// const isH = isHoliday("3 January 2022").then((r) => {
// console.log("rr", r);
// });
// console.log("is ", isH);
// check every midnight
cron.schedule("0 0 0 * * *", () => {
  const today = new Date();
  const todayDate =
    today.getDate() +
    " " +
    months[today.getMonth()] +
    " " +
    today.getFullYear();

  isHoliday(todayDate).then((status) => {
    if (status) {
      if (!isWeekend(today)) {
        // schedules
        cron.schedule("1 12 * * *", () => {
          // store data at 12:01 PM
          storeTwoDData("12:01");
        });

        cron.schedule("30 16 * * *", () => {
          // store data at 4:30 PM
          storeTwoDData("16:30");
        });
      } else {
        console.log("Today is not a weekend", today);
      }
    } else {
      console.log("Today is not a holiday", todayDate);
    }
  });
});

cron.schedule("30 9 * * *", () => {});
cron.schedule("0 14 * * *", () => {});

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
