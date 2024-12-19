// Importar Mongoose
const mongoose= require('mongoose');
// Definir el esquema de la orden
const ordenSchema = new mongoose.Schema({
    // Representa el ID de la mesa con un tipo de dato Number y es obligatorio
    mesaId: {
        type: Number, required: true
    },
    // Es un arreglo de objetos, donde cada platillo tiene, platilloId, cantidad
    platillos: [{
        platilloId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Platillo',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    }],
    // Representa el estado de la orden, si no se especifica, por defecto sera Pendiente
    estado: {
        type: String,
        default: "Pendiente"
    },
    // Representa la fecha de creacion de la orden, si no se especifica, utilizara la fecha
    // y hora actual como valor por defecto.
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});
// Exportar el modelo
module.exports = mongoose.model('Orden', ordenSchema)