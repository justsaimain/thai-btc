const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const btcSchema = new Schema(
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

const BTC = mongoose.model("BTC", btcSchema);

module.exports = BTC;
