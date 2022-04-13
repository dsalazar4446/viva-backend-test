
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cuestionarioSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio'],
    },
    description: {
        type: String,
        unique: true,
        required: [true, 'La descripcion en obligatoria'],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Cuestionario', cuestionarioSchema);