'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    username: String,
    password: String,
    nombre: String,
    apellido: String,
    mail: String,
    modulos: [{type: Schema.Types.ObjectId, ref: 'Modulo'}],
    carreras: [{type: Schema.Types.ObjectId, ref: 'Carrera'}],
});

usuarioSchema.index({ username: 1 });

var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;