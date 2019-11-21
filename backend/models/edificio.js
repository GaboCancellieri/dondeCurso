'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var edificioSchema = new Schema({
    nombre: String,
    descripcion: String,
    sitios: [{type: Schema.Types.ObjectId, ref: 'Sitio'}],
    latitud: String,
    longitud: String,
});

var Edificio = mongoose.model('Edificio', edificioSchema);
module.exports = Edificio;