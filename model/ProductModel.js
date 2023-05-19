const { json } = require("express");
const mongoose = require("mongoose");
const { array } = require("../middleware/uploadImage");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    name: String,
    code: String,
    quantity: Number,
    price_in: String,
    price_out: String,
    price_sale: String,
    count: Number,
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    unit_id: {
      type: String,
      ref: 'unit',
    },

    supplier_id: {
      type: String,
      ref: "supplier",
    },
    cat_id: {
      type: String,
      ref: "category",
    },
    warehouse_id: {
      type: String,
      ref: "warehouse",
    },
    status: Number,
    image: {
      data: String,
      contentType: String,
    },
    user_id: String,
  },
  {
    _id: true,
    collection: "product",
  }
);

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
