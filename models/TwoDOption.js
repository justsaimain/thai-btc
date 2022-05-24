const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const twoDOptionSchema = new Schema(
  {
    running: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const TwoDOption = mongoose.model("TwoDOption", twoDOptionSchema);

module.exports = TwoDOption;
