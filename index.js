const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const uri = 'mongodb://localhost:27017'; // Cambia si usas Mongo Atlas
const client = new MongoClient(uri);
let db;

// Middleware para recibir formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde /public
app.use(express.static('public'));

// Conectar a MongoDB
async function connectDB() {
  try {
    await client.connect();
    db = client.db('veterinaria'); // Usa el nombre de tu base
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err);
  }
}
connectDB();

// Ruta para guardar los datos del formulario
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
      fecha_ingreso: req.body.fecha_ingreso,
      fecha_salida: req.body.fecha_salida,
      diagnostico: req.body.diagnostico
    }
  };

  try {
    await db.collection('hospitalizaciones').insertOne(datos);
    res.send('<script>alert("✅ Datos guardados con éxito"); window.location.href="/veterinaria.html";</script>');
  } catch (err) {
    console.error('❌ Error al guardar en MongoDB:', err);
    res.status(500).send('<script>alert("❌ Error al guardar datos"); window.location.href="/veterinaria.html";</script>');
  }
});

// (Opcional) Mostrar veterinaria.html al ir a la raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/veterinaria.html');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
