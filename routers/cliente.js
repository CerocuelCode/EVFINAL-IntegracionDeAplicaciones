const express = require("express");
const router = express.Router();
const {crearCliente,obtenerCliente,actualizarCliente,eliminarCliente} = require("../controllers/clienteController");
router.post("/crear_cliente", crearCliente);
router.get("/obtener_cliente/:id", obtenerCliente);
router.put("/actualizar_cliente", actualizarCliente);
router.delete("/eliminar_cliente/:id", eliminarCliente);


module.exports = router;
