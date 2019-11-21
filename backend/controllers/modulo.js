var Modulo = require('../models/modulo');
var Usuario = require('../models/usuario');

function getModulos(req, res) {
    Modulo.find({'materia': req.params.idMateria})
        .populate({path: 'materia', model: "Materia"})
        .populate('clases.sitio')
        .exec((error, modulos) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!modulos) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No hay modulos'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: modulos
            });
        });
}

function getModulo(req, res) {
    Modulo.findById(req.params.idModulo)
        .populate('materia')
        .exec((error, modulo) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!modulo) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicho modulo'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: modulo
            });
        });
}

function patchModulo(req, res) {
    Modulo.findById(req.params.idModulo)
        .exec((error, modulo) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!modulo) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicho modulo'
                });
            }

            if (req.body.nombre) {
                modulo.nombre = req.body.nombre
            }

            if (req.body.añoAcademico) {
                modulo.añoAcademico = req.body.añoAcademico
            }

            modulo.save((moduloGuardada) => {
                res.status(200).json({
                    message: 'Success',
                    obj: moduloGuardada
                });
            }, function (err) {
                // Si el nombre o el numero del contrato ya existen, devolver error
                if (err.code == 11000) {
                    var msj = ""
                    if (err.errmsg.toString().includes("nombre"))
                        msj = "Nombre de modulo";

                    return res.status(404).json({
                        title: 'Error',
                        error: msj + ' existente.'
                    });
                }
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            });
        });
}

function patchClase(req, res) {
    Modulo.findById(req.params.idModulo)
        .exec((error, modulo) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!modulo) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicho modulo'
                });
            }

            let i = 0;
            let clase;
            while ((!clase) && (i < modulo.clases.length)) {
                if (clase._id === req.params.idClase) {
                    clase = modulo.clases[i];
                } else {
                    i++;
                }
            }

            if (!clase) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No se encuentra dicha clase'
                });
            }

            if (req.body.dia) {
                clase.dia = req.body.dia;
            }

            if (req.body.horaInicio) {
                clase.horaInicio = req.body.horaInicio;
            }

            if (req.body.duracion) {
                clase.duracion = req.body.duracion;
            }

            if (req.body.tipo) {
                clase.tipo = req.body.tipo;
            }

            if (req.body.sitio) {
                clase.sitio = req.body.sitio;
            }

            modulo.clases[i] = clase;

            modulo.save((moduloGuardada) => {
                res.status(200).json({
                    message: 'Success',
                    obj: moduloGuardada
                });
            });
        });
}

function postModulo(req, res) {
    if (!req.body.nombre) {
        return res.status(404).json({
            title: 'Error',
            error: 'Se requiere nombre'
        });
    }

    if (!req.body.añoAcademico) {
        return res.status(404).json({
            title: 'Error',
            error: 'Se requiere año academico'
        });
    }

    if (!req.body.materia) {
        return res.status(404).json({
            title: 'Error',
            error: 'Se requiere materia'
        });
    }

    nuevoModulo = new Modulo({
        nombre: req.body.nombre,
        añoAcademico: req.body.añoAcademico,
        materia: req.body.materia,
    })

    nuevoModulo.save((moduloGuardado) => {
        res.status(200).json({
            message: 'Success',
            obj: moduloGuardado
        });
    }, function (err) {
        // Si el nombre o el numero del contrato ya existen, devolver error
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("nombre"))
                msj = "Modulo";

            return res.status(404).json({
                title: 'Error',
                error: msj + ' existente.'
            });
        }
        return res.status(404).json({
            title: 'Error',
            error: err
        });
    });
}

function postClase(req, res) {
    Modulo.findById(req.params.idModulo)
        .exec((error, modulo) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!modulo) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicho modulo'
                });
            }

            if (!req.body.dia) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Se requiere dia'
                });
            }

            if (!req.body.horaInicio) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Se requiere hora de inicio'
                });
            }

            if (!req.body.duracion) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Se requiere duracion'
                });
            }

            if (!req.body.tipo) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Se requiere tipo'
                });
            }

            if (!req.body.sitio) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Se requiere sitio'
                });
            }

            nuevaClase = {
                dia: req.body.dia,
                horaInicio: req.body.horaInicio,
                duracion: req.body.duracion,
                tipo: req.body.tipo,
                sitio: req.body.sitio
            };

            modulo.clases.push(nuevaClase);

            modulo.save((moduloGuardado) => {
                res.status(200).json({
                    message: 'Success',
                    obj: moduloGuardado
                });
            }, function (err) {
                // Si el nombre o el numero del contrato ya existen, devolver error
                if (err.code == 11000) {
                    var msj = ""
                    if (err.errmsg.toString().includes("nombre"))
                        msj = "Nombre de modulo";

                    return res.status(404).json({
                        title: 'Error',
                        error: msj + ' existente.'
                    });
                }
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            });
        });
}

function deleteModulo(req, res) {
    Usuario.find({ 'modulos': req.params.idModulo })
        .exec((error, usuarios) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (usuarios.length > 0) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Hay usuarios inscriptos a este modulo!'
                });
            }

            Modulo.findOneAndDelete({ '_id': req.params.idModulo })
                .exec((error, moduloEliminado) => {
                    if (error) {
                        return res.status(400).json({
                            title: 'Error',
                            error: error
                        });
                    }

                    res.status(200).json({
                        message: 'Success',
                        obj: moduloEliminado
                    });
                });
        });
}

function deleteClase(req, res) {
    Modulo.findById(req.params.idModulo)
        .exec((error, modulo) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!modulo) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No se encuentra dicho modulo'
                });
            }

            let i = 0;
            let clase;
            while ((!clase) && (i < modulo.clases.length)) {
                if (clase._id === req.params.idClase) {
                    clase = modulo.clases[i];
                } else {
                    i++;
                }
            }

            if (!clase) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No se encuentra dicha clase'
                });
            }

            modulo.clases.splice(i, 1);

            modulo.save((moduloGuardado) => {
                res.status(200).json({
                    message: 'Success',
                    obj: moduloGuardado
                });
            });
        });
}

module.exports = {
    getModulos,
    getModulo,
    patchModulo,
    patchClase,
    postModulo,
    postClase,
    deleteModulo,
    deleteClase
}