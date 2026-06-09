const mongoose = require('mongoose')

const listaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const gastoSchema = new mongoose.Schema(
    {
        concepto: {
            type: String,
            required: true,
            trim: true,
        },
        cantidad: {
            type: Number,
            required: true,
            min: 0,
        },
        categoria: {
            type: String,
            required: true,
        },
        lista: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lista",
            required: true,
        },
    },
    { timestamps: true }
);

const Lista = mongoose.model("Lista", listaSchema);
const Gasto = mongoose.model("Gasto", gastoSchema);

async function crearLista(data) {
    return await Lista.create(data);
}

async function obtenerListasPorUsuario(usuarioId) {
    return await Lista.find({ usuario: usuarioId });
}

async function obtenerListaPorId(id) {
    return await Lista.findById(id);
}

async function borrarLista(id) {
    return await Lista.findByIdAndDelete(id);
}

async function crearGasto(data) {
    return await Gasto.create(data);
}

async function obtenerGastosPorLista(listaId) {
    return await Gasto.find({ lista: listaId });
}

async function obtenerGastoPorId(id) {
    return await Gasto.findById(id);
}

async function actualizarGasto(id, data) {
    return await Gasto.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function borrarGasto(id) {
    return await Gasto.findByIdAndDelete(id);
}

module.exports = {
    crearLista,
    obtenerListasPorUsuario,
    obtenerListaPorId,
    borrarLista,
    crearGasto,
    obtenerGastosPorLista,
    obtenerGastoPorId,
    actualizarGasto,
    borrarGasto,
};