var Materia = require('../models/materia');
var Modulo = require('../models/modulo');

function getMaterias(req, res) {
    Materia.find({})
        .exec((error, materias) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!materias) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No hay materias'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: materias
            });
        });
}

function getMateria(req, res) {
    Materia.findById(req.params.idMateria)
        .exec((error, materia) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!materia) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicha materia'
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: materia
            });
        });
}

function patchMateria(req, res) {
    Materia.findById(req.params.idMateria)
        .exec((error, materia) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!materia) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicha materia'
                });
            }

            if (req.body.nombre) {
                materia.nombre = req.body.nombre
            }

            if (req.body.añoCarrera) {
                materia.añoCarrera = req.body.añoCarrera
            }

            materia.save((materiaGuardada) => {
                res.status(200).json({
                    message: 'Success',
                    obj: materiaGuardada
                });
            });
        });
}

function postMateria(req, res) {
    if (!req.body.nombre) {
        return res.status(404).json({
            title: 'Error',
            error: 'Se requiere nombre'
        });
    }

    if (!req.body.añoCarrera) {
        return res.status(404).json({
            title: 'Error',
            error: 'Se requiere año de carrera'
        });
    }

    nuevaMateria = new Materia({
        nombre: req.body.nombre,
        añoCarrera: req.body.añoCarrera,
    });

    nuevaMateria.save((materiaGuardada) => {
        res.status(200).json({
            message: 'Success',
            obj: materiaGuardada
        });
    });
}

function deleteMateria(req, res) {
    Modulo.find({ 'materia': req.params.idMateria })
        .exec((error, modulos) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (modulos.length > 0) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Hay modulos que dependen de esta materia!'
                });
            }

            Materia.findOneAndDelete({ '_id': req.params.idMateria })
                .exec((error, materiaEliminada) => {
                    if (error) {
                        return res.status(400).json({
                            title: 'Error',
                            error: error
                        });
                    }

                    res.status(200).json({
                        message: 'Success',
                        obj: materiaEliminada
                    });
                });
        });
}

module.exports = {
    getMaterias,
    getMateria,
    patchMateria,
    postMateria,
    deleteMateria
}