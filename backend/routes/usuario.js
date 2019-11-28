'use strict'
var express = require('express');
var UsuarioController = require('../controllers/usuario');
var api = express.Router();

api.patch('/', UsuarioController.patchUsuario);

module.exports = api;