'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sitioSchema = new Schema({
    nombre: String,
    latitud: String,
    longitud: String,
    piso: String,
    icon: String,
});

var Sitio = mongoose.model('Sitio', sitioSchema);
module.exports = Sitio;
