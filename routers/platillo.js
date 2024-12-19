const express = require("express")
const router = express.Router();
const { crearPlatillo, obtenerPlatillo,eliminarPlatillo, actualizarPlatillo, obtenerPlatillos } = require("../controllers/platilloController")
router.post('/crear_platillo', crearPlatillo);
router.get('/obtener_platillos', obtenerPlatillos);
router.get('/obtener_platillo/:id', obtenerPlatillo);
router.put('/actualizar_platillo', actualizarPlatillo);
router.delete('/eliminar_platillo/:id', eliminarPlatillo);


module.exports = router;