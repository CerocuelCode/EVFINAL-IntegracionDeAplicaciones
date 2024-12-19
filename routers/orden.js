const express = require('express');
const router = express.Router();
const { crearOrden, obtenerOrden, obtenerOrdenesPendientes, obtenerOrdenes, actualizarOrden, actualizarEstadoOrden, eliminarOrden } = require('../controllers/ordenController');

router.post('/crear_orden', crearOrden);
router.get('/obtener_orden/:id', obtenerOrden);
router.get('/obtener_ordenes_pendientes', obtenerOrdenesPendientes); // Ruta para obtener órdenes pendientes
router.get('/obtener_ordenes', obtenerOrdenes); // Nueva ruta para obtener todas las órdenes
router.put('/actualizar_orden', actualizarOrden);
router.put('/actualizar_estado_orden', actualizarEstadoOrden);
router.delete('/eliminar_orden/:id', eliminarOrden);

module.exports = router;
