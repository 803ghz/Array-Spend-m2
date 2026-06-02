const mongoose = require ('mongoose')

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
        }
    },
    {
        timestamps: true,
    }
);

async function obtenerGastos() {
    return await Gasto.find();
}

async function obtenerGastoPorId(id) {
    return await Gasto.findById(id);
}

async function crearGasto(req, res) {
    return await Gasto.create(req, body)
};

async function actualizarGasto(id, data) {
    return await Gasto.findByIdAndUpdate(id, data, {
        new: true, 
        runValidators: true,
    })
}

async function borrarGasto(id) {
    return await Gasto.findByIdAndDelete(id);
}

module.exports = mongoose.model("Gasto", gastoSchema);