'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Clase = new Schema({
    dia: String,
    horaInicio: Number,
    duracion: Number,
    tipo: String,
    sitio: {type: Schema.Types.ObjectId, ref: 'Sitio'},
});


var moduloSchema = new Schema({
    nombre: String,
    añoAcademico: String,
    materia: {type: Schema.Types.ObjectId, ref: 'Materia'},
    clases: [Clase]
});

moduloSchema.index({nombre: 1, materia: 1}, {unique: true})

var Modulo = mongoose.model('Modulo', moduloSchema);
module.exports = Modulo;