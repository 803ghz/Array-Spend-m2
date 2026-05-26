const express = require("express");

const app = express();
const PORT = 2001;

app.get('/api/health', (req, res) => {
    res.json({ status: "ok" });
});

let gastos = [
    { id: 1, concepto: 'Alquiler', cantidad: 800, categoria: 'Vivienda' },
    { id: 2, concepto: 'Supermercado', cantidad: 150, categoria: 'Alimentación' },
    { id: 3, concepto: 'Internet', cantidad: 40, categoria: 'Servicios' },
    { id: 4, concepto: 'Coche', cantidad: 30, categoria: 'Utilidad' },
    { id: 5, concepto: 'Cena fuera', cantidad: 50, categoria: 'Ocio' }
];

app.get('/api/gastos', (req, res) => {
    res.json(gastos);
});

app.get('/api/gastos/:id', (req, res) => {
    const id = Number(req.params.id);
    const gasto = gastos.find(g => g.id === id);

    if (!gasto) {
        return res.status(404).json({ Error: "Gasto no encontrado" });
    }

    res.json(gasto);
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${PORT}`);
});