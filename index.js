require('dotenv').config();

const express =  require("express");
const conectarBD= require("./config/database");
const config= require("./config/global");
const cors= require("cors");
const app= express();


conectarBD();
app.use(cors());
app.use(express.json());

//RUTAS
app.use("/api", require("./routers/platillo"))
app.use("/api", require("./routers/categoria"))
app.use("/api", require("./routers/cliente"))
app.use("/api", require("./routers/orden"))
app.use("/api", require("./routers/mesero"))

app.listen(config.port, ()=>{
    console.log(`Server corriendo en el puerto, ${config.port}`)
})



