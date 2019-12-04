'use strict'
var express = require('express');
var UnidadAcademicaController = require('../controllers/unidadAcademica');
var api = express.Router();

api.get('/', async (req, res) => {
    const unidadesAcademicas = await UnidadAcademicaController.getUnidadesAcademicas()
    res.json(unidadesAcademicas);
});

api.get('/:idUnidadAcademica', UnidadAcademicaController.getUnidadAcademica);
api.patch('/:idUnidadAcademica', UnidadAcademicaController.patchUnidadAcademica);
api.post('/', UnidadAcademicaController.postUnidadAcademica);
api.delete('/:idUnidadAcademica', UnidadAcademicaController.deleteUnidadAcademica);

module.exports = api;