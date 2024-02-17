const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActividadSchema = Schema({
  descripcion: String,
  tipo: Number,
  createAtt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Actividad', ActividadSchema);
