const Cliente = require("../models/Cliente");

exports.crearCliente = async (req, res) => {
    try {
        const { nombre, correo, telefono, dni } = req.body;

        
        if (!nombre || !correo || !telefono || !dni) {
            return res.status(400).json({ message: "Faltan datos (nombre, correo, telefono, dni)" });
        }

        
        const clienteExistente = await Cliente.findOne({ $or: [{ correo }, { dni }] });
        if (clienteExistente) {
            return res.status(400).json({ message: "El correo o DNI ya están registrados" });
        }

        const cliente = new Cliente({ nombre, correo, telefono, dni });
        await cliente.save();

        res.status(201).json({
            message: "Cliente registrado ",
            cliente
        });
    } catch (error) {
        res.status(500).json({ message: `Error al registrar : ${error.message}` });
    }
};

exports.obtenerCliente = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json({ message: "Detalles del cliente", cliente });
    } catch (error) {
        res.status(500).json({ message: `Error al obtener cliente: ${error.message}` });
    }
};

exports.actualizarCliente = async (req, res) => {
    try {
        const { id } = req.body;
        const { correo, telefono, dni } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El ID es obligatorio" });
        }

        const cliente = await Cliente.findByIdAndUpdate(
            id,
            { correo, telefono, dni },
            { new: true } 
        );

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json({ message: "Cliente actualizado exitosamente", cliente });
    } catch (error) {
        res.status(500).json({ message: `Error al actualizar cliente: ${error.message}` });
    }
};

exports.eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await Cliente.findByIdAndDelete(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.status(200).json({ message: "Cliente eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar cliente: ${error.message}` });
    }
};
