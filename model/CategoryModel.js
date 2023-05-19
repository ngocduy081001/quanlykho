const { json } = require('express');
const mongoose = require('mongoose');


const Schema =  mongoose.Schema;

const CategorySchema = new Schema({
    count: Number,
    name: String,
    code: String,
    created_at : Date,
    deleted_at: Date,
    updated_at : Date,
    slug : String,
  },{
    collection:'category'
  });
  
  
  const CategoryModel = mongoose.model('category', CategorySchema);

  module.exports = CategoryModel