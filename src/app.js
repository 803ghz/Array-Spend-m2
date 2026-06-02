const express = require("express");
const app = express();
const gastosRoutes = require('./routes/gastos.routes');

app.use(express.json());

app.use('/api/gastos', gastosRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;



