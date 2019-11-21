'use strict'
var express = require('express');
var MateriaController = require('../controllers/materia');
var api = express.Router();

api.get('/', MateriaController.getMaterias);
api.get('/:idMateria', MateriaController.getMateria);
api.patch('/:idMateria', MateriaController.patchMateria);
api.post('/', MateriaController.postMateria);
api.delete('/:idMateria', MateriaController.deleteMateria);

module.exports = api;