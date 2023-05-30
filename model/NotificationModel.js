const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quanlykhohang");
}
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    title: String,
    content: String,
    user_id: String,
    status: Boolean,
  },
  {
    collection: "notification",

    timestamps: true,
  }
);

const SupplierModel = mongoose.model("notification", NotificationSchema);

module.exports = SupplierModel;
