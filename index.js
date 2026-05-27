const express = require("express");
const fs = require("node:fs").promises;
const path = require("node:path");
const app = express();
const PORT = 2001;

const RUTA = path.join(__dirname, "gastos.json");

async function cargarGastos() {
    const contenido = await fs.readFile(RUTA, "utf-8");
    return JSON.parse(contenido);
}

async function guardarGastos(gastos) {
    await fs.writeFile(RUTA, JSON.stringify(gastos, null, 2), "utf-8");
}

app.use(express.json());

app.get('/api/gastos', async (req, res) => {
    const gastos = await cargarGastos();
    return res.json(gastos);            
});

app.get('/api/gastos/:id', async (req, res) => {
    const gastos = await cargarGastos();
    const id = Number(req.params.id);
    const gasto = gastos.find(g => g.id === id);

    if (!gasto) {
        return res.status(404).json({ error: "Gasto no encontrado" });
    }
    res.json(gasto);
});

app.post("/api/gastos", async (req, res) => {
    const gastos = await cargarGastos();
    const { concepto, cantidad, categoria } = req.body;

    if (!concepto || !cantidad || !categoria) {
        return res.status(400).json({ error: "falta contenido" });
    }

    const nuevoGasto = {
        id: gastos.length > 0 ? gastos[gastos.length - 1].id + 1 : 1,
        concepto,
        cantidad,
        categoria
    };

    gastos.push(nuevoGasto);
    await guardarGastos(gastos);
    res.status(201).json(nuevoGasto);
});

app.put('/api/gastos/:id', async (req, res) => {
    const id = Number(req.params.id);
    const datosNuevos = req.body;
    
    const gastos = await cargarGastos();
    const index = gastos.findIndex(g => g.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Gasto no encontrado" });
    }

    gastos[index] = { ...gastos[index], ...datosNuevos, id: id };

    await guardarGastos(gastos);
    res.json(gastos[index]);
});

app.delete("/api/gastos/:id", async (req, res) => {
    const gastos = await cargarGastos();
    const id = Number(req.params.id);
    const gastosFiltrados = gastos.filter(g => g.id !== id);

    if (gastos.length === gastosFiltrados.length) {
        return res.status(404).json({ error: "Gasto no encontrado" });
    }

    await guardarGastos(gastosFiltrados);
    res.status(200).json({ mensaje: "Gasto eliminado correctamente" });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${PORT}`);
});