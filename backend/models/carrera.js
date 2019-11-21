'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carreraSchema = new Schema({
    nombre: String,
    unidadAcademica: {type: Schema.Types.ObjectId, ref: 'UnidadAcademica'},
    materias: [{type: Schema.Types.ObjectId, ref: 'Materia'}]
});

var Carrera = mongoose.model('Carrera', carreraSchema);
module.exports = Carrera;