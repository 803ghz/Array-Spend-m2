require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");
const PORT = process.env.PORT || 2001;

async function initServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor funcionando en ${PORT}`);
    });
}

initServer();