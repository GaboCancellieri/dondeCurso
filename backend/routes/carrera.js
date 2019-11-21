'use strict'
var express = require('express');
var CarreraController = require('../controllers/carrera');
var api = express.Router();

api.get('/', CarreraController.getCarreras);
api.get('/:idCarrera', CarreraController.getCarrera);
api.patch('/:idCarrera', CarreraController.patchCarrera);
api.post('/', CarreraController.postCarrera);
api.delete('/:idCarrera', CarreraController.deleteCarrera);

module.exports = api;