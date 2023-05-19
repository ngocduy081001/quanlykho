const { json } = require('express');
const mongoose = require('mongoose');


const Schema =  mongoose.Schema;

const WareHouseSchema = new Schema({
    name: String,
    created_at : Date,
    deleted_at: Date,
    updated_at : Date,
    slug : String,
    code: String,
    count: Number,
  },{
    collection:'warehouse'
  });
  
  
  const WareHouseModel = mongoose.model('warehouse', WareHouseSchema);

  module.exports = WareHouseModel