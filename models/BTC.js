const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const btcSchema = new Schema(
  {
    c: {
      type: String,
      required: true,
    },
    percent: {
      type: String,
      required: true,
    },
    twoD: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BTC = mongoose.model("BTC", btcSchema);

module.exports = BTC;
