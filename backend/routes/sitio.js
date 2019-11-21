'use strict'
var express = require('express');
var SitioController = require('../controllers/sitio');
var api = express.Router();

api.get('/', SitioController.getSitios);
api.get('/unidad/academica', SitioController.getSitiosUnidadAcademica);
api.get('/:idSitio', SitioController.getSitio);
api.patch('/:idSitio', SitioController.patchSitio);
api.post('/', SitioController.postSitio);
api.delete('/:idSitio', SitioController.deleteSitio);

module.exports = api;