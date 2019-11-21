'use strict'
var express = require('express');
var EdificioController = require('../controllers/edificio');
var api = express.Router();

api.get('/', EdificioController.getEdificios);
api.get('/:idEdificio', EdificioController.getEdificio);
api.patch('/:idEdificio', EdificioController.patchEdificio);
api.post('/', EdificioController.postEdificio);
api.delete('/:idEdificio', EdificioController.deleteEdificio);

module.exports = api;