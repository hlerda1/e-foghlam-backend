const { response } = require('express');
const Materia = require('../models/materia');

// crear materia
const CrearMateria = async (req, res = response) => {
  const materia = new Materia(req.body);
  try {
    const materiaGuardar = await materia.save();

    res.status(201).json({
      ok: true,
      materia: materiaGuardar,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// obtener materias,
const obtenerMateria = async (req, res = response) => {
  const materias = await Materia.find();
  res.json({
    ok: true,
    materias,
  });
};

module.exports = {
  CrearMateria,
  obtenerMateria,
  // actualizarMateria,
  // eliminarMateria,
};
