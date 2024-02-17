const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// las mismas propiedades deben coincidir en el front cuando se definen
const UsuarioSchema = Schema({
  nombre: String,
  apellido: String,
  email: { type: String, unique: true },
  password: String,
  dni: Number,
  fechaNacimiento: String,
  createAtt: { type: Date, default: Date.now },
  rol: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
