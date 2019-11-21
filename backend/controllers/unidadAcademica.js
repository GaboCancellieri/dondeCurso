var UnidadAcademica = require('../models/unidadAcademica');
var Carrera = require('../models/carrera');

function getUnidadAcademicas(req, res) {
    UnidadAcademica.find({})
        .exec((error, unidadAcademicas) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!unidadAcademicas) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No hay unidadAcademicas'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: unidadAcademicas
            });
        });
}

function getUnidadAcademica(req, res) {
    UnidadAcademica.findById(req.params.idUnidadAcademica)
        .populate('edificios')
        .exec((error, unidadAcademica) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!unidadAcademica) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicha unidadAcademica'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: unidadAcademica
            });
        });
}

function patchUnidadAcademica(req, res) {
    UnidadAcademica.findById(req.params.idUnidadAcademica)
        .exec((error, unidadAcademica) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!unidadAcademica) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicha unidadAcademica'
                });
            }

            if (req.body.nombre) {
                unidadAcademica.nombre = req.body.nombre
            }

            if (req.body.edificios) {
                unidadAcademica.edificios = req.body.edificios
            }

            unidadAcademica.save((unidadAcademicaGuardada) => {
                res.status(200).json({
                    message: 'Success',
                    obj: unidadAcademicaGuardada
                });
            });
        });
}

function postUnidadAcademica(req, res) {
    if (!req.body.nombre) {
        return res.status(404).json({
            title: 'Error',
            error: 'Se requiere nombre'
        });
    }

    nuevaUnidadAcademica = new UnidadAcademica({
        nombre: req.body.nombre,
        edificios: null,
    })

    nuevaUnidadAcademica.save((unidadAcademicaGuardada) => {
        res.status(200).json({
            message: 'Success',
            obj: unidadAcademicaGuardada
        });
    });
}

function deleteUnidadAcademica(req, res) {
    Carrera.find({ 'unidadAcademica': req.params.idUnidadAcademica })
        .exec((error, carreras) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (carreras.length > 0) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Hay carreras que dependen de esta Unidad Academica!'
                });
            }

            UnidadAcademica.findOneAndDelete({ '_id': req.params.idUnidadAcademica })
                .exec((error, unidadAcademicaEliminada) => {
                    if (error) {
                        return res.status(400).json({
                            title: 'Error',
                            error: error
                        });
                    }

                    res.status(200).json({
                        message: 'Success',
                        obj: unidadAcademicaEliminada
                    });
                });
        });
}

module.exports = {
    getUnidadAcademicas,
    getUnidadAcademica,
    patchUnidadAcademica,
    postUnidadAcademica,
    deleteUnidadAcademica
}