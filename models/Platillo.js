const mongoose= require('mongoose');
const platilloSchema= new mongoose.Schema({
        nombre : String,
        ingredientes: String,
        precio: Number,
        imagen: String,
})

module.exports= mongoose.model('Platillo', platilloSchema);