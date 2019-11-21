'use strict'
var express = require('express');
var ModuloController = require('../controllers/modulo');
var api = express.Router();

api.get('/:idMateria', ModuloController.getModulos);
api.get('/:idModulo', ModuloController.getModulo);

api.patch('/:idModulo', ModuloController.patchModulo);
api.patch('/:idClase/:idModulo', ModuloController.patchClase);

api.post('/', ModuloController.postModulo);
api.post('/:idModulo', ModuloController.postClase);

api.delete('/:idModulo', ModuloController.deleteModulo);
api.delete('/:idClase/:idModulo', ModuloController.deleteClase);

module.exports = api;