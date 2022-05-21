const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threeDSchema = new Schema(
  {
    result: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ThreeD = mongoose.model("ThreeD", threeDSchema);

module.exports = ThreeD;
