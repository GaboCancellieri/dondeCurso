require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

var carreraRoutes = require('./routes/carrera');
var edificioRoutes = require('./routes/edificio');
var materiaRoutes = require('./routes/materia');
var moduloRoutes = require('./routes/modulo');
var sitioRoutes = require('./routes/sitio');
var unidadAcademicaRoutes = require('./routes/unidadAcademica');

// api routes
app.use('/api/users', require('./users/user.controller'));
app.use('/api/carreras', carreraRoutes);
app.use('/api/edificios', edificioRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/sitios', sitioRoutes);
app.use('/api/unidadAcademicas', unidadAcademicaRoutes);


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});