const { response } = require('express');
const Calificacion = require('../models/calificacion');

// crear calificacion
const crearCalificacion = async (req, res = response) => {
    const calificacion = new Calificacion(req.body);
    try {
      const calificacionGuardar = await calificacion.save();
  
      res.status(201).json({
        ok: true,
        calificacion: calificacionGuardar,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'por favor hable con el administrador',
      });
    }
};

// obtener calificaciones
const obtenerCalificacion = async (req, res = response) => {
    const calificaciones = await Calificacion.find().populate([
    {
        path: 'alumno',
        model: 'Usuario',
      },
  
      {
        path: 'materia',
        model: 'Materia',
      },
  
   {
        path: 'actividad',
        model: 'Actividad',
      },
    
    ]);
    res.json({
      ok: true,
      calificaciones,
    });
};

const actualizarCalificacion = async (req, res = response) => {
    const calificacionId = req.params.id;
  
    try {
      const calificacion = await Calificacion.findById(calificacionId);
  
      if (!calificacion) {
        return res.status(404).json({
          ok: false,
          msg: 'no existe la calificacion',
        });
      }
  
      const nuevaCalificacion = {
        ...req.body,
      };
  
      const calificacionActualizada = await Calificacion.findByIdAndUpdate(
        calificacionId,
        nuevaCalificacion,
        { new: true }
      );
      res.json({
        ok: true,
        evento: calificacionActualizada,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'por favor hable con el administrador',
      });
    }
};

//eliminar curso
const eliminarCalificacion = async (req, res = response) => {
    const calificacionId = req.params.id;
  
    try {
      const calificacion = await Calificacion.findById(calificacionId);
  
      if (!calificacion) {
        return res.status(404).json({
          ok: false,
          msg: 'no existe la calificacion',
        });
      }
  
      await Calificacion.findByIdAndDelete(calificacionId);
      res.json({
        ok: true,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'por favor hable con el administrador',
      });
    }
};

module.exports = {
    crearCalificacion,
    obtenerCalificacion,
    actualizarCalificacion,
    eliminarCalificacion,
};
  