const express = require("express");
const app = express();
const gastosRoutes = require('./routes/gastos.routes');
const usersRoutes = require("./routes/users.routes.js")

app.use(express.json());

app.use('/api/gastos', gastosRoutes);
app.use('/api/gastos', usersRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;