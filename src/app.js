import express from "express";
import gastosRoutes from './routes/gastos.routes.js';
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());

app.use('/api/gastos', gastosRoutes);
app.use('/api/users', usersRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

export default app;