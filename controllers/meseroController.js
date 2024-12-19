const Mesero = require("../models/Mesero");
const jwt = require("jsonwebtoken");
const config = require("../config/global");
const bcryptjs = require('bcryptjs');

exports.crearMesero = async (req, res) => {
    try {
        const { nombre, ape_paterno, ape_materno, telefono, dni, email, password, estado } = req.body;

        let mesero = await Mesero.findOne({ email });
        if (mesero) {
            return res.status(400).json({ msg: 'Ya existe un mesero con este correo electrónico' });
        }

        mesero = new Mesero(req.body);

        const salt = await bcryptjs.genSalt(10);
        mesero.password = await bcryptjs.hash(password, salt);

        await mesero.save();

        res.status(201).json({ msg: 'Mesero creado correctamente', mesero });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al crear el mesero' });
    }
};

exports.obtenerMeseros = async (req, res) => {
    try {

        const meseros = await Mesero.find();
        if (!meseros || meseros.length === 0) {
            return res.status(404).json({ message: "No se encontrado Meseros" });
        }

        res.json({ message: "Lista de meseros", meseros });
    } catch (error) {
        res.status(500).json({ message: `Error al obtener Mesero: ${error.message}` });
    }
};

exports.actualizarMesero = async (req, res) => {
    try {
        const { id, nombre, ape_paterno, ape_materno, telefono, dni, email, password, estado } = req.body;

        if (!id) {
            return res.status(400).json({ msg: "El ID es obligatorio en el cuerpo de la petición" });
        }

        const nuevoMesero = {};

        if (nombre) nuevoMesero.nombre = nombre;
        if (ape_paterno) nuevoMesero.ape_paterno = ape_paterno;
        if (ape_materno) nuevoMesero.ape_materno = ape_materno;
        if (telefono) nuevoMesero.telefono = telefono;
        if (dni) nuevoMesero.dni = dni;
        if (email) nuevoMesero.email = email;

        if (password) {
            const salt = await bcryptjs.genSalt(10);
            nuevoMesero.password = await bcryptjs.hash(password, salt);
        }

        if (estado !== undefined) {
            nuevoMesero.estado = estado;
        }

        let mesero = await Mesero.findById(id);

        if (!mesero) {
            return res.status(404).json({ msg: "Mesero no existe" });
        }

        mesero = await Mesero.findByIdAndUpdate(id, { $set: nuevoMesero }, { new: true });
        res.json({ message: "Mesero actualizado exitosamente", mesero });

    } catch (error) {
        console.error("Error al actualizar mesero:", error);
        res.status(500).json({ message: `Error al actualizar Mesero: ${error.message}` });
    }
};

exports.eliminarMesero = async (req, res) => {
    try {
        const { id } = req.params;

        const mesero = await Mesero.findById(id);
        if (!mesero) {
            return res.status(404).json({ message: "Mesero No encontrado" });
        }

        if (mesero.estado.toLowerCase() === "inactivo") {
            return res.status(400).json({ message: "El Mesero ya esta Inactivo" });
        }
        mesero.estado = "Inactivo";
        await mesero.save();
        res.status(200).json({ message: "Mesero marcado como inactivo", mesero: mesero });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar Mesero: ${error.message}` });
    }
};



