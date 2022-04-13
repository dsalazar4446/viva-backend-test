
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opionSchema = new Schema({
    text: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio'],
    },
    isAnswer: {
        type: Boolean,
        default: false

    },
});

const preguntaSchema = new Schema({
    text: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio'],
    },
    cuestionario: {
        type: Schema.Types.ObjectId,
        ref: 'Cuestionario'
    },
    options: [opionSchema]
});


module.exports = mongoose.model('Pregunta', preguntaSchema);