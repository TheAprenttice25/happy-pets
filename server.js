const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Registro = require('./models/registro'); // ✅ en minúscula, coincide con el archivo real
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// ✅ Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Rutas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/bienvenida', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bienvenida.html'));
});

app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'veterinaria.html'));
});

app.get('/ver-registros', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ver-registros.html'));
});

// ✅ Rutas API
app.post('/registro', async (req, res) => {
  try {
    const nuevoRegistro = new Registro(req.body);
    await nuevoRegistro.save();
    console.log("🐾 Registro guardado:", nuevoRegistro);
    res.json({ mensaje: `✅ Registro exitoso de ${nuevoRegistro.nombre_mascota}` });
  } catch (err) {
    console.error('❌ Error al guardar registro:', err);
    res.status(500).json({ mensaje: '❌ Error al guardar en la base de datos' });
  }
});

app.get('/registros', async (req, res) => {
  try {
    const registros = await Registro.find();
    res.json(registros);
  } catch (err) {
    console.error('❌ Error al obtener registros:', err);
    res.status(500).json({ mensaje: '❌ Error al obtener registros' });
  }
});

// ✅ Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
