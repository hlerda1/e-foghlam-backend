const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventoSchema = Schema({
  title: String,
  descripcion: String,
  start: Date,
  end: Date,

  createDtt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Evento', EventoSchema);
