'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var unidadAcademicaSchema = new Schema({
    nombre: String,
    edificios: [{ type: Schema.Types.ObjectId, ref: 'Edificio' }]
});

var UnidadAcademica = mongoose.model('unidadAcademicas', unidadAcademicaSchema, 'unidadAcademicas');
module.exports = UnidadAcademica;