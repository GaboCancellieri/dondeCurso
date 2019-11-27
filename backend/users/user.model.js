const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    modulos: [{ type: Schema.Types.ObjectId, ref: 'Modulo' }],
    carreras: [{ type: Schema.Types.ObjectId, ref: 'Carrera' }],
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);