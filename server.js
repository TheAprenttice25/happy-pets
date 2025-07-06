const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Modelo = require('./models/registro'); // ✅ Aquí importas el modelo

dotenv.config();

const app = express();
app.use(cors());
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
