var Edificio = require('../models/edificio');
var UnidadAcademica = require('../models/unidadAcademica');

function getEdificios(req, res) {
    Edificio.find({})
        .exec((error, edificios) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!edificios) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No hay edificios'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: edificios
            });
        });
}

function getEdificio(req, res) {
    Edificio.findById(req.params.idEdificio)
        .populate('sitios')
        .exec((error, edificio) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!edificio) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicha edificio'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: edificio
            });
        });
}

function patchEdificio(req, res) {
    Edificio.findById(req.params.idEdificio)
        .exec((error, edificio) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!edificio) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicha edificio'
                });
            }

            if (req.body.nombre) {
                edificio.nombre = req.body.nombre
            }

            if (req.body.descripcion) {
                edificio.descripcion = req.body.descripcion
            }

            if (req.body.latitud) {
                edificio.latitud = req.body.latitud
            }

            if (req.body.longitud) {
                edificio.longitud = req.body.longitud
            }

            if (req.body.sitios) {
                edificio.sitios = req.body.sitios
            }

            edificio.save((edificioGuardada) => {
                res.status(200).json({
                    message: 'Success',
                    obj: edificioGuardada
                });
            }, function (err) {
                // Si el nombre o el numero del contrato ya existen, devolver error
                if (err.code == 11000) {
                    var msj = ""
                    if (err.errmsg.toString().includes("nombre"))
                        msj = "Nombre de edificio";

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

function postEdificio(req, res) {
    if (!req.body.nombre) {
        return res.status(404).json({
            title: 'Error',
            error: 'Se requiere nombre'
        });
    }

    if (!req.body.latitud) {
        return res.status(404).json({
            title: 'Error',
            error: 'Se requiere latitud'
        });
    }

    if (!req.body.longitud) {
        return res.status(404).json({
            title: 'Error',
            error: 'Se requiere longitud'
        });
    }

    nuevoEdificio = new Edificio({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        sitios: req.body.sitios
    })

    nuevoEdificio.save((edificioGuardado) => {
        res.status(200).json({
            message: 'Success',
            obj: edificioGuardado
        });
    }, function (err) {
        // Si el nombre o el numero del contrato ya existen, devolver error
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("nombre"))
                msj = "Nombre de edificio";

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

function deleteEdificio(req, res) {
    UnidadAcademica.find({ 'edificios': req.params.idEdificio })
        .exec((error, unidadAcademicas) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (unidadAcademicas.length > 0) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Hay unidades académicas que utilizan este edificio!'
                });
            }

            Edificio.findOneAndDelete({ '_id': req.params.idEdificio })
                .exec((error, edificioEliminado) => {
                    if (error) {
                        return res.status(400).json({
                            title: 'Error',
                            error: error
                        });
                    }

                    res.status(200).json({
                        message: 'Success',
                        obj: edificioEliminado
                    });
                });
        });
}

module.exports = {
    getEdificios,
    getEdificio,
    patchEdificio,
    postEdificio,
    deleteEdificio
}