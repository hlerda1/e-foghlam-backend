const { response } = require('express');
const Actividad = require('../models/actividad');

// crear actividad
const crearActividad = async (req, res = response) => {
  const actividad = new Actividad(req.body);

  try {
    const actividadGuardar = await actividad.save();

    res.status(201).json({
      ok: true,
      actividad: actividadGuardar,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// obtener actividades
const obtenerActividad = async (req, res = response) => {
  const actividades = await Actividad.find();

  res.json({
    ok: true,
    actividades,
  });
};

// editar actividad
const actualizarActividad = async (req, res = response) => {
  const actividadId = req.params.id;

  try {
    const actividad = await Actividad.findById(actividadId);

    if (!actividad) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe la actividad',
      });
    }

    const nuevaActividad = {
      ...req.body,
    };

    const actividadActualizada = await Actividad.findByIdAndUpdate(
      actividadId,
      nuevaActividad,
      { new: true }
    );
    res.json({
      ok: true,
      evento: actividadActualizada,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// eliminar actividad
const eliminarActividad = async (req, res = response) => {
  const actividadId = req.params.id;

  try {
    const actividad = await Actividad.findById(actividadId);

    if (!actividad) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe actividad',
      });
    }

    await Actividad.findByIdAndDelete(actividadId);
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
  crearActividad,
  obtenerActividad,
  actualizarActividad,
  eliminarActividad,
};
