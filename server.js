const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // NECESARIO para leer JSON desde el frontend

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Ruta para registrar datos
app.post('/registro', async (req, res) => {
  try {
    const nuevoRegistro = new Modelo(req.body);
    await nuevoRegistro.save();
    res.status(200).json({ mensaje: 'Registro guardado' });
  } catch (error) {
    console.error('Error al guardar en MongoDB:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});
