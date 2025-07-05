const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz: mostrar login.html
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rutas opcionales
app.get('/bienvenida.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bienvenida.html'));
});

app.get('/veterinaria.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'veterinaria.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
