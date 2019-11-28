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

// api routes
app.use('/api/users', require('./users/user.controller'));
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/sitios', require('./routes/sitio'));
app.use('/api/data/carreras', require('./routes/carrera'));
app.use('/api/data/edificios', require('./routes/edificio'));
app.use('/api/data/materias', require('./routes/materia'));
app.use('/api/data/modulos', require('./routes/modulo'));
app.use('/api/data/unidadesAcademicas', require('./routes/unidadAcademica'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});