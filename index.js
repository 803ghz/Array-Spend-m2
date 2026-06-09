import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 2001;

async function initServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor funcionando en puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
}

initServer();