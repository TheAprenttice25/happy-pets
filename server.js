const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const Modelo = require('./models/registro');

dotenv.config();

const app = express();

// 🌍 CORS: permitir solo orígenes autorizados
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

// 📦 Middleware para leer JSON
app.use(express.json());

// 📁 Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// 📍 Ruta raíz: login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 📍 Ruta para formulario
app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});

// 📍 Ruta para bienvenida
app.get('/bienvenida', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bienvenida.html'));
});

// 🔌 Conexión a MongoDB
console.log("🔗 Conectando a MongoDB...");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');

    // 📝 Ruta para guardar formulario
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

    // 🚀 Iniciar servidor solo si Mongo conecta
    const PORT = process.env.PORT;
    if (!PORT) {
      console.error('❌ No se encontró PORT en process.env');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });

  })
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err);
    process.exit(1);
  });
