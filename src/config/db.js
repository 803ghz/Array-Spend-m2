import mongoose from 'mongoose';
import dns from 'dns';

async function connectDB() {
    const URI = process.env.MONGO_URI;

    try {
        if (URI.startsWith("mongodb+srv://")) {
            dns.setServers(["8.8.8.8", "1.1.1.1"]);
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;