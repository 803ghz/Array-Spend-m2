import mongoose from 'mongoose';

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

export const Lista = mongoose.model("Lista", listaSchema);
export const Gasto = mongoose.model("Gasto", gastoSchema);

export async function crearLista(data) {
    return await Lista.create(data);
}

export async function obtenerListasPorUsuario(usuarioId) {
    return await Lista.find({ usuario: usuarioId });
}

export async function obtenerListaPorId(id) {
    return await Lista.findById(id);
}

export async function borrarLista(id) {
    return await Lista.findByIdAndDelete(id);
}

export async function crearGasto(data) {
    return await Gasto.create(data);
}

export async function obtenerGastosPorLista(listaId) {
    return await Gasto.find({ lista: listaId });
}

export async function obtenerGastoPorId(id) {
    return await Gasto.findById(id);
}

export async function actualizarGasto(id, data) {
    return await Gasto.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function borrarGasto(id) {
    return await Gasto.findByIdAndDelete(id);
}