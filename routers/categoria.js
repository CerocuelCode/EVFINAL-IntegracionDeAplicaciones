const express = require("express")
const router = express.Router();
const {crearCategoria, obtenerCategorias,eliminarCategoria, actualizarCategoria, obtenerCategoria} = require("../controllers/categoriaController")
router.post('/crear_categoria', crearCategoria);
router.get('/obtener_categoria/:id', obtenerCategoria);
router.get('/obtener_categorias', obtenerCategorias);
router.put('/actualizar_categoria', actualizarCategoria);
router.delete('/eliminar_categoria/:id', eliminarCategoria);



module.exports = router;