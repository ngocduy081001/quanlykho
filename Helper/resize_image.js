
const sharp = require('sharp');
const path = require('path');
const {v4 : uuidv4} = require('uuid')
class Resize {

  constructor(folder) {
    this.folder = folder;
  }
  async save(file) {
    const filename = Resize.filename();
    
    const filepath = this.filepath(filename);
   
    // await sharp(file)
    //   .resize(300, 300, { // size image 300x300
    //     fit: sharp.fit.inside,
    //     withoutEnlargement: true
    //   })
    //   .toBuffer();
   
    return filename;
  }

  static filename() {
     // random file name
    return uuidv4() + '.png';
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;
