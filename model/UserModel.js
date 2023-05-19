const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/quanlykhohang');

}
const Schema =  mongoose.Schema;




const UserSchema = new Schema({
    username:   String,
    password:   String,
    role_id:    Number,

  },{
    collection:'user'
  });
  
  
  const UserModel = mongoose.model('user', UserSchema);

  module.exports = UserModel