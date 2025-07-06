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

// 📍 Ruta raíz redirige al login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 📍 Ruta para formulario (si se accede directamente por URL)
app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});

// 📍 Ruta para bienvenida (si se accede direc
