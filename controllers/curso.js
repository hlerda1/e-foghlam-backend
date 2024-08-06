const { response } = require('express');
const Curso = require('../models/curso');

// crear curso
const CrearCurso = async (req, res = response) => {
  const curso = new Curso(req.body);
  try {
    const cursoGuardar = await curso.save();

    res.status(201).json({
      ok: true,
      evento: cursoGuardar,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// obtener cursos
const obtenerCurso = async (req, res = response) => {
  //const cursos = await Curso.find().populate('materias');
  const cursos = await Curso.find(req.query).populate([
    {
      path: 'materias',
      model: 'Materia',
    },
    {
      path: 'comision',
      model: 'Comision',
    },
  ]);
  res.json({
    ok: true,
    cursos,
  });
};

const actualizarCurso = async (req, res = response) => {
  const cursoId = req.params.id;

  try {
    const curso = await Curso.findById(cursoId);

    if (!curso) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe el curso',
      });
    }

    const nuevoCurso = {
      ...req.body,
    };

    const cursoActualizado = await Curso.findByIdAndUpdate(
      cursoId,
      nuevoCurso,
      { new: true }
    );
    res.json({
      ok: true,
      evento: cursoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

//eliminar curso
const eliminarCurso = async (req, res = response) => {
  const cursoId = req.params.id;

  try {
    const curso = await Curso.findById(cursoId);

    if (!curso) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe el curso',
      });
    }

    await Curso.findByIdAndDelete(cursoId);
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
  CrearCurso,
  obtenerCurso,
  actualizarCurso,
  eliminarCurso,
};
