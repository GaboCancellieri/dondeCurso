'use strict'
var express = require('express');
var UnidadAcademicaController = require('../controllers/unidadAcademica');
var api = express.Router();

api.get('/', UnidadAcademicaController.getUnidadAcademicas);
api.get('/:idUnidadAcademica', UnidadAcademicaController.getUnidadAcademica);
api.patch('/:idUnidadAcademica', UnidadAcademicaController.patchUnidadAcademica);
api.post('/', UnidadAcademicaController.postUnidadAcademica);
api.delete('/:idUnidadAcademica', UnidadAcademicaController.deleteUnidadAcademica);

module.exports = api;