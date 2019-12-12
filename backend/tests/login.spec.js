const mongoose = require('mongoose');
const userService = require('../users/user.service')

describe('Login de Usuario', () => {
    beforeAll(() => {
        const mongoUri = 'mongodb://localhost:27017/dondeCurso';
        mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    })


    test('Login fail', async () => {
        const resultado = await userService.authenticate({ username: 'asdasddwer34', password: 'fth555ur' })
        expect(resultado).toBeUndefined()
    })

    test('Login success', async () => {
        const resultado = await userService.authenticate({ username: 'gabriel.cancellieri', password: 'Gabo123$' })
        expect(resultado.token).toBeDefined()
    })
})