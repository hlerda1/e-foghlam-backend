const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalificacionSchema = Schema({
    valor: number,
    // Cambie de [{}] a simplemente {} ya que solo hay un usuario, materia y actividad por calificación
    alumno: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Usuario',
        },

    materia: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Materia',
        },
    
    actividad: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Actividad',
        },
    
    createDttm: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Calificacion", CalificacionSchema);
