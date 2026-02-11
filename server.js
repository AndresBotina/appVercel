// 1. IMPORTACIONES 
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables del archivo .env

const app = express();
app.use(express.json()); // Crucial: Permite que Express entienda JSON

// CONEXION A LA BASE DE DATOS
// Aquí usamos una variable de entorno o un link local por defecto
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:3000/usuarios';

await mongoose.connect(MONGO_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("Error de conexion", err));

// 1. IMPORTAR LAS RUTAS
import usersRoutes from './routes/usersRoutes.js'; // Importante el .js

app.get('/test', (req, res) => {
    res.send('Servidor funcionando OK');
});

// 2. USAMOS LAS RUTAS
app.use('/usuarios', usersRoutes); 

// LEVANTAMOS EL SERVIDOR
const PORT = process.env.PORT || 3000;

// Solo para desarrollo local
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor funcionando y corriendo en: http://localhost:${PORT}`);
    });
}

// Exportar para Vercel
export default app;