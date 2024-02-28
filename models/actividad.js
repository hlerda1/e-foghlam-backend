const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActividadSchema = Schema({
  descripcion: String,
  tipoActividad: String,
  fechaFin: Date,
  consigna: String,
  createDtt: { type: Date, default: Date.now },
  alumnos: [
    {
      idAlumno: String, 
      estado: String, 
      respuesta: String
    },
  ],
});

module.exports = mongoose.model('Actividad', ActividadSchema);