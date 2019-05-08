const mongoose = require('mongoose');
 
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
const EleveSchema = mongoose.Schema({
  _id:Number,
  nom: String,
  prenom: String,
  age: Number,
  classe: Number

}, {
  timestamps: true
});
  module.exports=mongoose.model('Eleve',EleveSchema)