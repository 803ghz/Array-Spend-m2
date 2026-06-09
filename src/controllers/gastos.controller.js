import { validationResult } from 'express-validator';
import * as Gastos from '../models/gastos.models.js';
import { cleanInput } from '../utils/sanitizer.js';

export const crearLista = async (req, res) => {
    try {
        const nombre = cleanInput(req.body.nombre); 
        const usuarioId = req.user.id;

        const lista = await Gastos.crearLista({ nombre, usuario: usuarioId });

        res.status(201).json({ message: "Lista creada", lista });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const obtenerListas = async (req, res) => {
    try {
        const usuarioId = req.user.id;

        const listas = await Gastos.obtenerListasPorUsuario(usuarioId);

        res.status(200).json(listas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const borrarLista = async (req, res) => {
    try {
        const lista = await Gastos.obtenerListaPorId(req.params.listaId);

        if (!lista) return res.status(404).json({ message: "Lista no encontrada" });

        if (lista.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para borrar esta lista" });
        }

        await Gastos.borrarLista(req.params.listaId);

        res.status(200).json({ message: "Lista eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const crearGasto = async (req, res) => {
    try {
        const concepto = cleanInput(req.body.concepto);
        const { cantidad, categoria } = req.body;
        
        const lista = await Gastos.obtenerListaPorId(req.params.listaId);

        if (!lista) return res.status(404).json({ message: "Lista no encontrada" });

        if (lista.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para añadir gastos a esta lista" });
        }

        const gasto = await Gastos.crearGasto({ concepto, cantidad, categoria, lista: lista._id });

        res.status(201).json({ message: "Gasto creado", gasto });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const obtenerGastos = async (req, res) => {
    try {
        const lista = await Gastos.obtenerListaPorId(req.params.listaId);

        if (!lista) return res.status(404).json({ message: "Lista no encontrada" });

        if (lista.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para ver esta lista" });
        }

        const gastos = await Gastos.obtenerGastosPorLista(req.params.listaId);

        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const actualizarGasto = async (req, res) => {
    try {
        const gasto = await Gastos.obtenerGastoPorId(req.params.gastoId);
        if (!gasto) return res.status(404).json({ message: "Gasto no encontrado" });

        const lista = await Gastos.obtenerListaPorId(gasto.lista);
        if (lista.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para editar este gasto" });
        }
        
        const datosActualizados = { ...req.body };
        if (datosActualizados.concepto) {
            datosActualizados.concepto = cleanInput(datosActualizados.concepto);
        }

        const actualizado = await Gastos.actualizarGasto(req.params.gastoId, datosActualizados);

        res.status(200).json({ message: "Gasto actualizado", gasto: actualizado });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const borrarGasto = async (req, res) => {
    try {
        const gasto = await Gastos.obtenerGastoPorId(req.params.gastoId);

        if (!gasto) return res.status(404).json({ message: "Gasto no encontrado" });

        const lista = await Gastos.obtenerListaPorId(gasto.lista);

        if (lista.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para borrar este gasto" });
        }

        await Gastos.borrarGasto(req.params.gastoId);

        res.status(200).json({ message: "Gasto eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};