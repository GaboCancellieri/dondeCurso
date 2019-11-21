var Carrera = require('../models/carrera');
var Usuario = require('../models/usuario');

function getCarreras(req, res) {
    Carrera.find({})
        .exec((error, carreras) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!carreras) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No hay carreras'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: carreras
            });
        });
}

function getCarrera(req, res) {
    Carrera.findById(req.params.idCarrera)
        .populate('materias')
        .populate({path: 'unidadAcademica', model: 'UnidadAcademica'})
        .exec((error, carrera) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!carrera) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicha carrera'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: carrera
            });
        });
}

function patchCarrera(req, res) {
    Carrera.findById(req.params.idCarrera)
        .exec((error, carrera) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!carrera) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicha carrera'
                });
            }

            if (req.body.nombre) {
                carrera.nombre = req.body.nombre
            }

            if (req.body.unidadAcademica) {
                carrera.unidadAcademica = req.body.unidadAcademica
            }

            carrera.save((carreraGuardada) => {
                res.status(200).json({
                    message: 'Success',
                    obj: carreraGuardada
                });
            }, function (err) {
                // Si el nombre o el numero del contrato ya existen, devolver error
                if (err.code == 11000) {
                    var msj = ""
                    if (err.errmsg.toString().includes("nombre"))
                        msj = "Nombre de carrera";

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

function postCarrera(req, res) {
    if (!req.body.nombre) {
        return res.status(404).json({
            title: 'Error',
            error: 'Nombre requerido'
        });
    }

    if (!req.body.unidadAcademica) {
        return res.status(404).json({
            title: 'Error',
            error: 'Unidad Academica requerida'
        });
    }

    nuevaCarrera = new Carrera({
        nombre: req.body.nombre,
        unidadAcademica: req.body.unidadAcademica,
        materias: null
    })

    nuevaCarrera.save((carreraGuardada) => {
        res.status(200).json({
            message: 'Success',
            obj: carreraGuardada
        });
    }, function (err) {
        // Si el nombre o el numero del contrato ya existen, devolver error
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("nombre"))
                msj = "Nombre de carrera";

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

function deleteCarrera(req, res) {
    Usuario.find({ 'carreras': req.params.idCarrera })
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
                    error: 'Hay usuarios inscriptos en esta carrera!'
                });
            }

            Carrera.findOneAndDelete({ '_id': req.params.idCarrera })
                .exec((error, carreraEliminada) => {
                    if (error) {
                        return res.status(400).json({
                            title: 'Error',
                            error: error
                        });
                    }

                    res.status(200).json({
                        message: 'Success',
                        obj: carreraEliminada
                    });
                });
        });
}

module.exports = {
    getCarreras,
    getCarrera,
    patchCarrera,
    postCarrera,
    deleteCarrera
}