const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = Schema({
  descripcion: String,
  catedra: String,
  reqExamen: Boolean,
  reqTrabajo: Boolean,

  createDtt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Materia', MateriaSchema);
