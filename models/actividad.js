const mongoose = require('mongoose');
const curso = require('./curso');
const Schema = mongoose.Schema;

const ActividadSchema = Schema({
  descripcion: String,
  tipoActividad: String,
  fechaFin: Date,
  consigna: String,
  curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', },
  createDttm: { type: Date, default: Date.now },
  alumnos: [
    {
      idAlumno: String, 
      estado: String,       
      cuestionario: [
        {
          pregunta: String,
          respuesta: String
        }
      ],
      archivo: String,
    },
  ],
});

module.exports = mongoose.model('Actividad', ActividadSchema);