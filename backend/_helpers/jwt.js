const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate',
            '/api/users/register',
            '/api/sitios/unidad/academica',
            '/api/sitios',
            '/api/data/unidadesAcademicas',
            '/api/data/carreras',
            '/api/data/materias',
            '/api/data/modulos',
            '/api/data/edificios',
            '/api/usuarios',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};