const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modernSchema = new Schema(
  {
    mod: {
      type: String,
      required: true,
    },
    net: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Modern = mongoose.model("Modern", modernSchema);

module.exports = Modern;
