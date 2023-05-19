const mongoose = require("mongoose");
const { array } = require("../middleware/uploadImage");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quanlykhohang");
}
const Schema = mongoose.Schema;

const UnitSchema = new Schema(
  {
    name: String,
    code: String,
    count: Number,
  },
  {
    collection: "unit",
  }
);

const UnitModel = mongoose.model("unit", UnitSchema);

module.exports = UnitModel;
