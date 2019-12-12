const mongoose = require('mongoose');
const userService = require('../users/user.service')

describe('Registrar un Usuario', () => {
    beforeAll(() => {
        const mongoUri = 'mongodb://localhost:27017/dondeCurso';
        mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    })


    test('Register fail', async () => {
        const resultado = await userService.create({
            nombre: '####$$$$', apellido: '$$$###', email: '$$$$DDD', password: '%%%#"""$'
        })
        expect(resultado.message).toBe('El nombre "####$$$$" es inválido.')
    })

    test('Register success', async () => {
        const resultado = await userService.create({
            nombre: 'Gabo', apellido: 'Cancellieri', email: 'elgabonqn@gmail.com', password: 'Gabo123$'
        })
        expect(resultado).toBeDefined()
    })
})