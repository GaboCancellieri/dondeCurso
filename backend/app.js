const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    env = process.env;

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/dondeCurso", { useNewUrlParser: true, useUnifiedTopology: true });

var carreraRoutes = require('./routes/carrera');
var edificioRoutes = require('./routes/edificio');
var materiaRoutes = require('./routes/materia');
var moduloRoutes = require('./routes/modulo');
var sitioRoutes = require('./routes/sitio');
var unidadAcademicaRoutes = require('./routes/unidadAcademica');

var Usuario = require('./models/usuario');
var Carrera = require('./models/carrera');
var Edificio = require('./models/edificio');
var Materia = require('./models/materia');
var Modulo = require('./models/modulo');
var Sitio = require('./models/sitio');
var UnidadAcademica = require('./models/unidadAcademica');

express = require('express');
bodyParser = require('body-parser');
//User = require('./models/user').User;
//Local = require('./models/local').Local;
var cfg = require('./config.js');
var jwt = require('jwt-simple');
//var cors = require('cors');

var auth = require("./auth.js")();

app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Content-Type,authorization');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, authorization');



    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/public', express.static('public'));
app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(auth.initialize());

app.use('/api/carreras', carreraRoutes);
app.use('/api/edificios', edificioRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/sitios', sitioRoutes);
app.use('/api/unidadAcademicas', unidadAcademicaRoutes);

//#########################################################
//            INDEX RENDER PARA ANGULAR2
//######################################################
app.set('views', path.join(__dirname, 'src'));
// engine
app.set('view enginer', 'ejs');
app.engine('html', require('ejs').renderFile);
// angular  dist -- VERY IMPORTANT
app.use(express.static(__dirname + '/dist'));


app.get('/', function (req, res, next) {
    res.render('index.html');
});


app.post("/login", function (req, res) {
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;

        var user;
        Usuario.findOne({
            'username': username
        }, function (err, u) {
            user = u;
            if (user && user.password == req.body.password) {
                var payload = {
                    username: user.username,
                    permissions: ['empresa:read']
                };
                var token = jwt.encode(payload, cfg.jwtSecret);
                res.json({
                    _id: user._id,
                    token: token
                });
            } else {
                res.sendStatus(401);
            }
        });

    } else {
        res.sendStatus(401);
    }
});

var server = http.createServer(app);
server.listen(process.env.PORT || 4000, function () {
    console.log("Servidor Corriendo");
});