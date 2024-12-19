const jwt = require("jsonwebtoken");
const config = require("../config/global");
const Categoria = require("../models/Categoria");

exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) return res.status(400).json({ message: "Faltan datos: (nombre,descripcion)" })

        const categoria = new Categoria({ nombre, descripcion })



        const token = jwt.sign({ id: categoria._id }, config.secret, {
            expiresIn: 60 * 60 * 24

        });
        await categoria.save();

        res.json({
            mensaje: "Categoria creada exitosamente",
            auth: true,
            categoria: {
                id: categoria._id,
                nombre: categoria.nombre,
                descripcion: categoria.descripcion
            },
            token
        })


    } catch (error) {
        res.status(500).send(`Hubo un error ${error.message}`);
        console.log(error)

    }
}

exports.obtenerCategorias = async (req, res) => {
    try {
        const result = await Categoria.find();

        if (!result) return res.status(404).send("Categoria no encontrada");
        res.json({
            mensaje: "Detalle de categorias",
            categorias: result
        })


    } catch (error) {
        res.status(500).send(`Hubo un error ${error.message}`);
        console.log(error)

    }
}

exports.actualizarCategoria = async (req, res) => {

    try {
        const { id, nombre, descripcion } = req.body;
        if (!id) {
            return res.status(404).send("El Id es Obligatorio")
        }


        const categoria = await Categoria.findByIdAndUpdate(id,
            { nombre, descripcion }, { new: true });

        if (!categoria) return res.status(404).send("Categoria no encontrada")

        res.json({
            mesanje: "categoria actualizada con exito",
            categoria: {
                id: categoria._id,
                nombre: categoria.nombre,
                categoria: categoria.descripcion
            }
        })

    } catch (error) {
        res.status(500).send(`Hubo un error ${error.message}`);
        console.log(error)
    }

}

exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByIdAndDelete(id);
        if (!categoria) return res.status(404).send("Categoria no encontrada");
        res.status(200).send(`Categoria eliminada con exito`)

    } catch (error) {
        res.status(500).send(`Hubo un error ${error.message}`);
        console.log(error)
    }
}

exports.obtenerCategoria = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters

        // Validate ID presence
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        // Find category by ID using mongoose findById
        const categoria = await Categoria.findById(id);

        // Handle category not found
        if (!categoria) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({
            mensaje: 'Detalle de la categoría',
            categoria
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
};