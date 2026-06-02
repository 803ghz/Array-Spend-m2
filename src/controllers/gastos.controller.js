const Gasto = require('../models/gastos.models');

const obtenerGastos = async (req, res) => {
    try {
        const gastos = await Gasto.find();
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const obtenerGastoPorId = async (req, res) => {
    try {
        const gasto = await Gasto.findById(req.params.id);
        
        if (!gasto) {
            return res.status(404).json({ message: "Gasto no encontrado" });
        }
        res.status(200).json(gasto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const crearGasto = async (req, res) => {
    try {
        const nuevoGasto = await Gasto.create(req.body);
        res.status(201).json(nuevoGasto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const actualizarGasto = async (req, res) => {
    try {
        const actualizado = await Gasto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const borrarGasto = async (req, res) => {
    try {
        await Gasto.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Gasto eliminado con éxito" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { obtenerGastos, obtenerGastoPorId, crearGasto, actualizarGasto, borrarGasto };