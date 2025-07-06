const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const Modelo = require('./models/registro');

dotenv.config();

const app = express();

// CORS: permitir solo orígenes autorizados
const allowedOrigins = [
  'http://localhost:10000',
  'https://happy-pets-csqm.onrender.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🌐 Bloqueado por CORS: ${origin}`);
      callback(new Error('❌ No permitido por CORS'));
    }
  }
}));

app.use(express.json()); // Para leer JSON del frontend

// 📁 Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));




//  Ruta principal a login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});




// 🔌 Conexión a MongoDB Atlas
console.log("🔗 URI de Mongo:", process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err);
    process.exit(1);
  });

// 🚀 Ruta para registrar datos
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

// ✅ Puerto para Render o local
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
