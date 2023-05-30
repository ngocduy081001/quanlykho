const { json } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const importSchema = new Schema(
  {
    count: Number,
    code: String,
    warehouse_id: {
      type: String,
      ref: "warehouse",
    },
    status: Number,
    user: {
      type: String,
      ref: "user",
    },
    tong_cong: Number,
    thanh_toan: Number,
    tien_hang: Number,
    cong_no: Number,
    note: String,
    product: {
      type: Object,
      ref: "product",
    },

    date: Date,
  },
  {
    timestamps: true,
    collection: "import",
  }
);

const ImportModel = mongoose.model("import", importSchema);

module.exports = ImportModel;
