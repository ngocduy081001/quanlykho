const { json } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const importSchema = new Schema(
  {
    count: Number,
    code: String,
    warehouse: {
      type: String,
      ref: "warehouse",
    },
    status: Number,
    user: {
      type: String,
      ref: "user",
    },
    total: Number,
    debt: Number,
    product: Array,
  },
  {
    timestamps: true,
    collection: "import",
  }
);

const ImportModel = mongoose.model("import", importSchema);

module.exports = ImportModel;
