const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Carrera: require('../models/carrera'),
    Edificio: require('../models/edificio'),
    Materia: require('../models/materia'),
    Modulo: require('../models/modulo'),
    Sitio: require('../models/sitio'),
    UnidadAcademica: require('../models/unidadAcademica'),
};