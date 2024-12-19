const Orden = require('../models/Orden');
const Platillo = require('../models/Platillo');

// CRUD
// CREATE
exports.crearOrden = async (req, res) => {
    try {
        const {
            mesaId,
            platillos
        } = req.body;
        if (!mesaId || !platillos || !platillos.length) {
            return res.status(400).json({
                message: 'Faltan datos: mesaId, platillos'
            });
        } const platillosConIds = await Promise.all(platillos.map(async (platillo) => {
            const platilloEncontrado = await Platillo.findOne({
                nombre: platillo.nombre });
            if (!platilloEncontrado) {
                throw new Error(`Platillo ${platillo.nombre} no encontrado`);
            } return {
                platilloId: platilloEncontrado._id,
                cantidad: platillo.cantidad
            };
        }));
        const nuevaOrden = new Orden({ mesaId, platillos: platillosConIds });
        await nuevaOrden.save(); res.status(201).json({
            message: 'Orden creada exitosamente',
            orden: nuevaOrden
        });
    } catch (error) {
        res.status(500).json({
            message: `Error al crear la orden: ${error.message}`
        });
    }
};

// READ
exports.obtenerOrden = async (req, res) => {
    try {
        // Se extrae el parámetro `id` del objeto `req.params`.
        // Esto representa el ID de la mesa de la cual se desea obtener la orden
        const {
            mesaId
        } = req.params;
        const orden = await Orden.findOne(mesaId);
        // Si no se encuentra la orden (`!orden`), la función responde con un estado HTTP 404,
        // indicando que la orden no fue encontrada, y envía un mensaje JSON con el texto
        // 'Orden no encontrada'.
        if (!orden) {
            return res.status(404).json({
                message: 'Orden no encontrada'
            });
        }
        // Si se encuentra la orden, se responde con un estado HTTP 200, que denota éxito, y envía
        // un objeto JSON que contiene un mensaje ('Detalles de la orden') y la información de la
        // orden (`orden`). Si se encuentra la orden, se responde con un estado HTTP 200,
        // que denota éxito, y envía un objeto JSON que contiene un mensaje ('Detalles de la orden') y la información de la orden (`orden`).
        return res.status(200).json({
            message: 'Detalles de la orden',
            orden
        });

    } catch (error) {
          // Si ocurre algún error durante el proceso (por ejemplo, en la consulta a la base de datos),
          // es capturado por el bloque `catch`. La función responde con un estado HTTP 500, indicando un error en el servidor, y envía un mensaje JSON describiendo el error con el texto 'Error al obtener la orden', seguido por el mensaje del error capturado.
        return res.status(500).json({
            message: `Error al obtener la orden: ${error.message}`
        });
    }
};
// UPDATE
exports.actualizarOrden = async (req, res) => {
    try {
        // Se extrae el parámetro `id`, `mesaId`, `platillos`, `estado` del objeto `req.params`.
        // Esto representa el ID de la orden que se desea actualizar.
        const {
            id, mesaId, platillos, estado
        } = req.body;
        // Si id, mesaId, platillos o estado no están presentes en req.body, devuelve una respuesta
        // con un estado HTTP 400 y un mensaje explicativo.
        if (!id || !mesaId || !platillos || !estado) {
            return res.status(400).json({
                message: 'Faltan datos: id, mesaId, platillos, estado'
            });
        }
        // Se realiza una búsqueda y actualización de la orden en la base de datos usando el metodo
        // `findByIdAndUpdate` de un modelo `Orden` (presumiblemente un modelo de Mongoose).
        // Este metodo intentará encontrar un documento por su `id` y actualizarlo con los nuevos
        // datos (`mesaId`, `platillos`, `estado`).
        const orden = await Orden.findByIdAndUpdate(id, {mesaId, platillos, estado}, {
            new: true
        });
        // Si `Orden.findByIdAndUpdate` no encuentra una orden (es decir, retorna `null`), devuelve
        // una respuesta con estado HTTP 404 (Not Found) junto con un mensaje indicando que la
        // orden no fue encontrada.
        if (!orden) {
            return res.status(404).json({
                message: 'Orden no encontrada'
            });
        }
        // Si la actualización es exitosa, se devuelve un objeto JSON con un mensaje de
        // éxito y el documento actualizado `orden`.
        res.json({
            message: 'Orden actualizada exitosamente',
            orden
        });
    } catch (error) {
        // Si ocurre alguna excepción durante el proceso de actualización, se captura en el bloque
        // `catch`. En ese caso, la función envía una respuesta con estado HTTP 500
        // (Internal Server Error) incluyendo un mensaje que describe el error.
        res.status(500).json({
            message: `Error al actualizar la orden: ${error.message}`
        });
    }
}
// DELETE
exports.eliminarOrden = async (req, res) => {
    try {
        // Se extrae el parámetro `id` del objeto `req.params`. Esto representa el ID de la orden
        // que se desea eliminar.
        const {
            id
        } = req.params;
        // Utiliza `await` para esperar el resultado de la función `Orden.findByIdAndDelete(id)`,
        // la cual es una operación de base de datos que intenta encontrar y borrar el documento
        // con el ID proporcionado.
        const orden = await Orden.findByIdAndDelete(id);
        // ¡Si no se encuentra ninguna orden con el ID especificado (`!orden`), la respuesta al
        // cliente será un estado HTTP 404 (No encontrado) con un mensaje `'Orden no encontrada'`.
        if (!orden) {
            return res.status(404).json({
                message: 'Orden no encontrada'
            });
        }
        // Si la orden se elimina con éxito, la función responde con un estado HTTP 200 (OK) y
        // un mensaje indicando que la orden ha sido eliminada exitosamente.
        res.status(200).json({
            message: 'Orden eliminada exitosamente'
        });
    } catch (error) {
        // El bloque `try-catch` captura cualquier error que pueda surgir durante la operación
        // de búsqueda o eliminación. Si se produce un error, responde con un estado
        // HTTP 500 (Error de servidor interno) y un mensaje que incluye el detalle del error.
        res.status(500).json({
            message: `Error al eliminar la orden: ${error.message}`
        });
    }
};

// PERSONALIZADAS
exports.obtenerOrdenes = async (req, res) => {
    try {
        const ordenes = await Orden.find();
        res.json({
            message: 'Lista de todas las órdenes',
            ordenes
        });
    } catch (error) {
        res.status(500).json({
            message: `Error al obtener las órdenes: ${error.message}`
        });
    }
}

exports.obtenerOrdenesPendientes = async (req, res) => {
    try {
        const ordenes = await Orden.find({
            estado: 'Pendiente'
        });
        res.json({
            message: 'Lista de órdenes pendientes',
            ordenes
        });
    } catch (error) {
        res.status(500).json({
            message: `Error al obtener las órdenes pendientes: ${error.message}`
        });
    }
}

exports.actualizarEstadoOrden = async (req, res) => {
    try {
        // Se extrae el parámetro `id` del objeto `req.params`.
        // Esto representa el ID de la orden que se desea actualizar el estado.
        const {
            id, estado
        } = req.body;
        // Si id o estado no están presentes en req.body, devuelve una respuesta
        // con un estado HTTP 400 y un mensaje explicativo.
        if (!id || !estado) {
            return res.status(400).json({
                message: 'Faltan datos: id, estado'
            });
        }
        // Usa `Orden.findByIdAndUpdate` para buscar y actualizar una orden
        // por su `id` con el nuevo `estado`.
        const orden = await Orden.findByIdAndUpdate(id, { estado }, {
            // La opción `{ new: true }` asegura que el metodo devuelva el documento actualizado.
            new: true
        });
        // Si `orden` resulta ser `null` (es decir, no se encuentra ninguna orden con el `id` dado),
        // responde con un estado HTTP 404 y un mensaje explícito.
        if (!orden) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        // Si se encuentra y actualiza la orden, responde con un mensaje de éxito y la nueva
        // información de la orden.
        res.json({
            message: 'Estado de la orden actualizado',
            orden
        });
    } catch (error) {
        // Si ocurre una excepción durante el proceso, responde con un estado HTTP 500 y un
        // mensaje de error que incluye el mensaje de error específico.
        res.status(500).json({
            message: `Error al actualizar el estado de la orden: ${error.message}`
        });
    }
};


// EXPLICACIÓN DE FUNCIONES
// ------------------------

// Hola profe, aquí le dejo la explicación de por qué tenemos dos funciones actualizar.

// actualizarOrden: Esta función está diseñada para actualizar varios atributos de una orden
// (como `mesaId`, `platillos`, y `estado`).

// actualizarEstadoOrden: Esta función está enfocada únicamente en actualizar el estado de
// una orden, lo cual es útil si queremos tener un endpoint específico que se encargue solo
// de cambios de estado. Esto es beneficioso para operaciones en las que solo deseamos cambiar
// el estado sin alterar otros detalles de la orden.

// Al tener funciones separadas, cada una con su responsabilidad particular, es más fácil mantener
// y modificar cada función. Si necesito cambiar la lógica de cómo se actualiza el estado,
// lo haría únicamente en actualizarEstadoOrden sin afectar la lógica de la función de
// actualizar toda la orden.