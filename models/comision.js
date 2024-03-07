const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComisionSchema = Schema({
  nombre: String,
  año: Number,
  turno: String,
  createDtt: { type: Date, default: Date.now },
  alumnos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
  ],
});

module.exports = mongoose.model('Comision', ComisionSchema);
