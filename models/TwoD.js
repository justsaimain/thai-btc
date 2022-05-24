const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const twoDSchema = new Schema(
  {
    set: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    time: {
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

const TwoD = mongoose.model("TwoD", twoDSchema);

module.exports = TwoD;
