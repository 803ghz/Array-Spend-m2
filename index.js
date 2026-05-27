const express = require("express");
const app = express();
const PORT = 2001;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
})

app.get('/api/health', (req, res) => {
    res.json({ status: "ok" });
});

const gastos = [
    { id: 1, concepto: 'Alquiler', cantidad: 800, categoria: 'Vivienda' },
    { id: 2, concepto: 'Supermercado', cantidad: 150, categoria: 'Alimentación' },
    { id: 3, concepto: 'Internet', cantidad: 40, categoria: 'Servicios' },
    { id: 4, concepto: 'Coche', cantidad: 30, categoria: 'Utilidad' },
    { id: 5, concepto: 'Cena fuera', cantidad: 50, categoria: 'Ocio' },
    { id: 6, concepto: 'Luz', cantidad: 50, categoria: 'Servicios' },
    { id: 7, concepto: 'Amazon Prime', cantidad: 4.99, categoria: 'Suscripciones' },
    { id: 8, concepto: 'PlayStation Plus', cantidad: 8.99, categoria: 'Ocio' },
];

app.get('/api/gastos', (req, res) => {
    return res.json(gastos);
});

app.post("/api/gastos", (req, res) => {
    console.log(req.body);
    const { concepto, cantidad, categoria } = req.body;
if (!concepto || !cantidad || !categoria) {
    return res.status(400).json({ error: "falta contenido"})
}

const nuevoGasto = {
    id: gastos.length + 1,
    concepto,
    cantidad,
    categoria
};

gastos.push(nuevoGasto)
    res.status(200).json(nuevoGasto);
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