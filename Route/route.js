var express = require('express')
var app = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var Controller= require('../Controller/Controller')
const Eleve = require('../Modele/Eleve.modele');

app.get('/eleve/:_id',Controller.findOne)
app.get('/eleve',Controller.getEleve)
app.get('/prof',Controller.getProf)


app.post('/eleve',Controller.postEleve)
app.post('/prof',Controller.postProf)
app.delete('/prof',Controller.deleteProf)
app.put('/',Controller.put)

module.exports = app;