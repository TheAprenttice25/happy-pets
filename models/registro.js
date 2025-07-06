const Modelo = require('./models/registro');

const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  nombre_dueño: String,
  apellido_dueño: String,
  telefono: String,
  direccion: String,
  nombre_mascota: String,
  especie: String,
  raza: String,
  edad: Number,
  motivo_consulta: String,
  diagnostico: String,
  fecha_ingreso: Date,
  fecha_salida: Date
});

module.exports = mongoose.model('Registro', registroSchema);
