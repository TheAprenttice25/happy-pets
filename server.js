const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 10000;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 👉 Aquí pegas esta línea para servir archivos estáticos:
app.use(express.static(path.join(__dirname, 'public')));

// 👉 Aquí se configura que cargue veterinaria.html al acceder directamente:
app.get('/veterinaria.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'veterinaria.html'));
});

// 👉 Aquí va la lógica para guardar en MongoDB:
app.post('/registro', async (req, res) => {
  const datos = {
    dueño: {
      nombre: req.body.nombre_dueño,
      apellido: req.body.apellido_dueño,
      telefono: req.body.telefono,
      direccion: req.body.direccion
    },
    mascota: {
      nombre: req.body.nombre_mascota,
      especie: req.body.especie,
      raza: req.body.raza,
      edad: parseInt(req.body.edad)
    },
    hospitalizacion: {
      motivo: req.body.motivo_consulta,
      diagnostico: req.body.diagnostico,
      ingreso: req.body.fecha_ingreso,
      salida: req.body.fecha_salida
    }
  };

  try {
    await db.collection('hospitalizaciones').insertOne(datos);
    res.send(`<h2>✅ Registro guardado con éxito</h2><a href="/veterinaria.html">← Volver</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error al guardar');
  }
});

// 👉 Conexión a MongoDB
async function connectDB() {
  try {
    await client.connect();
    db = client.db('veterinaria');
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err);
  }
}
connectDB();

// 👉 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
