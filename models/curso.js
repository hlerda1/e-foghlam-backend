const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = Schema({
  descripcion: String,
  modalidad: String,
  fechaInicio: Date,
  fechaFin: Date,
  createDttm: { type: Date, default: Date.now },

  materias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Materia',
    },
  ],

  comision: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Curso',
    },
  ],
});

module.exports = mongoose.model('Curso', CursoSchema);
