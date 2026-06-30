import express from "express";
import gastosRoutes from "./routes/gastos.routes.js";
import usersRoutes from "./routes/users.routes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/api/gastos", gastosRoutes);
app.use("/api/users", usersRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

export default app;