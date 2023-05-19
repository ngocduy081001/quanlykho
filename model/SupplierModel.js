const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quanlykhohang");
}
const Schema = mongoose.Schema;

const SupplierSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    count: Number,
    code: String,
  },
  {
    collection: "supplier",

    timestamps: true,
  }
);

const SupplierModel = mongoose.model("supplier", SupplierSchema);

module.exports = SupplierModel;
