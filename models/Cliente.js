const mongoose = require('mongoose');
const clienteSchema = new mongoose.Schema({
        nombre: String,
        correo: String, 
        telefono: String,
        dni: String
});

module.exports = mongoose.model('Cliente', clienteSchema);
