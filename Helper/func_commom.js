const upload = require("../middleware/uploadImage");
const Resize = require("../Helper/resize_image");
const path = require("path");
class func_commom {
  gennateCodeProduct(prefix, id) {
    if (id < 10) {
      return prefix  +"000" + id;
    }

    if (id < 100) {
      return prefix + "00" + id;
    }

    if (id < 1000) {
      return prefix + "0" + id;
    }
    return prefix + +id;
  }

  async moveImage(file) {
    const imagePath = path.join(__dirname, "../uploads/images/product");
    const fileUpload = new Resize(imagePath);
    const filename = await fileUpload.save(file);

    return filename;
  }
}

module.exports = new func_commom();
