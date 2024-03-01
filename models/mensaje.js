const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MensajeSchema = Schema({
  titulo: String,
  cuerpo: String,
  idRemitente: String,

  destinatarios: [String],

  createDtt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
