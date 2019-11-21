'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materiaSchema = new Schema({
    nombre: String,
    añoCarrera: String,
});

var Materia = mongoose.model('Materia', materiaSchema);
module.exports = Materia;