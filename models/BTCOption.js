const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const btcOptionSchema = new Schema(
  {
    set: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BTCOption = mongoose.model("BTCOption", btcOptionSchema);

module.exports = BTCOption;
