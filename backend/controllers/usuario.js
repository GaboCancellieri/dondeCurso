var Usuario = require('../users/user.model');
var Modulo = require('../models/modulo');

function patchUsuario(req, res) {
    Usuario.findById(req.body.usuario)
        .exec((error, usuario) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!usuario) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'No existe dicha usuario'
                });
            }

            var modulo = usuario.modulos.map(m => m !== req.body.modulo);

            if (modulo.length === 0) {
                usuario.modulos.push(req.body.modulo)
            }

            usuario.save();

            res.status(200).json({
                message: 'Success',
                obj: { exito: true }
            });
        });
}

module.exports = {
    patchUsuario,
}