const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mesero = require('../models/Mesero');

exports.autenticarMesero = async (req, res) => {
    const { email, password } = req.body;

    try {
        let mesero = await Mesero.findOne({ email });
        if (!mesero) {
            return res.status(400).json({ msg: 'El mesero no existe' });
        }

        const passCorrecto = await bcryptjs.compare(password, mesero.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Password Incorrecto' });
        }

        const payload = {
            mesero: {
                id: mesero.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
        }, (error, token) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ msg: 'Hubo un error al generar el token' });
            }
            res.json({ token });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor' });
    }
};