const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const PORT = 3000;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Esto sirve para cargar los archivos HTML, CSS, imágenes desde "public"

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

app.post('/registro', async (req, res) => {
  const datos = req.body;
  console.log("📥 Datos recibidos:", datos);

  try {
    await db.collection('hospitalizaciones').insertOne(datos);
    res.send('<script>alert("✅ Datos guardados correctamente"); window.location.href="/veterinaria.html";</script>');
  } catch (err) {
    console.error("❌ Error al guardar en MongoDB:", err);
    res.status(500).send('<script>alert("❌ Error al guardar"); window.location.href="/veterinaria.html";</script>');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
