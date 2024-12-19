const mongoose = require('mongoose');
const meseroSchema = new mongoose.Schema({
    nombre: String,
    ape_paterno: String,
    ape_materno: String,
    telefono: String,
    dni: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },

    estado: String,
});

module.exports = mongoose.model('Mesero', meseroSchema);
