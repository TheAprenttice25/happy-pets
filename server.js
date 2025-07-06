const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Modelo = require('./models/registro'); // ✅ Aquí importas el modelo

dotenv.config();

const app = express();


const allowedOrigins = [
  'http://localhost:10000', // Desarrollo local
  'https://happy-pets-csqm.onrender.com', // 🔁 Reemplaza con tu URL de frontend real
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ No permitido por CORS'));
    }
  }
}));



app.use(express.json()); // NECESARIO para leer JSON desde el frontend

console.log("URI de Mongo:", process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err);
    process.exit(1); // Termina si no conecta
  });

// ✅ Ruta para registrar datos
app.post('/registro', async (req, res) => {
  try {
    const nuevoRegistro = new Modelo(req.body);
    await nuevoRegistro.save();
    res.status(201).json({ mensaje: '✅ Registro guardado' });
  } catch (error) {
    console.error('❌ Error al guardar en MongoDB:', error);
    res.status(500).json({ mensaje: '❌ Error del servidor' });
  }
});
