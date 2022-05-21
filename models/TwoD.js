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
    twoD: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TwoD = mongoose.model("TwoD", twoDSchema);

module.exports = TwoD;
