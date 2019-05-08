const mongoose = require('mongoose');
 
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
const ProfSchema = mongoose.Schema({
  _id:Number,
  nom: String,
  prenom: String,
  matiere: {matiere1:String,matiere2:String,matiere3:String},
  classe: {classe1:Number,classe2:Number,classe3:Number}

}, {
  timestamps: true
});
  module.exports=mongoose.model('Prof',ProfSchema)