// const express = require("express");
// const router = express.Router();
// const { crearMesero, obtenerMeseros, actualizarMesero, eliminarMesero } = require("../controllers/meseroController");
// router.post("/crear_mesero", crearMesero);
// router.get("/obtener_meseros", obtenerMeseros);
// router.put("/actualizar_mesero", actualizarMesero);
// router.delete("/eliminar_mesero/:id", eliminarMesero);
//
//
// module.exports = router;

const express = require('express');
const router = express.Router();
const meseroController = require('../controllers/meseroController');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Crea un mesero
router.post("/crear_mesero", meseroController.crearMesero);
router.get("/obtener_meseros",auth, meseroController.obtenerMeseros);
router.put("/actualizar_mesero/:id",auth, meseroController.actualizarMesero);
router.delete("/eliminar_mesero/:id",auth, meseroController.eliminarMesero);
router.post('/autenticar', authController.autenticarMesero);

module.exports = router;