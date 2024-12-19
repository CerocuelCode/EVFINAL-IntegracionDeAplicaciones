const mongoose = require("mongoose");
const conectarBD= async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tagliatore', {
            useNewUrlParser: true, 
            useUnifiedTopology: true });
       console.log('Base de datos conectada');
        
    } catch (error) {
        console.log("No se pudo conectar a la base de datos", error)
        process.exit(1);
    }
}
module.exports = conectarBD;
