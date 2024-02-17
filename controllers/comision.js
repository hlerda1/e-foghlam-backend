const { response } = require('express');
const Comision = require('../models/comision');

// crear comision
const crearComision = async (req, res = response) => {
  const comision = new Comision(req.body);
  try {
    const comisionGuardar = await comision.save();

    res.status(201).json({
      ok: true,
      comision: comisionGuardar,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};
// obtener comisiones
const obtenerComision = async (req, res = response) => {
  const comisiones = await Comision.find();
  res.json({
    ok: true,
    comisiones,
  });
};

// editar comision
const actualizarComision = async (req, res = response) => {
  const comisionId = req.params.id;

  try {
    const comision = await Comision.findById(comisionId);

    if (!comision) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe la comision',
      });
    }

    const nuevaComision = {
      ...req.body,
    };

    const alumnoActualizado = await Comision.findByIdAndUpdate(
      comisionId,
      nuevaComision,
      { new: true }
    );
    res.json({
      ok: true,
      evento: alumnoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// eliminar comision
const eliminarComision = async (req, res = response) => {
  const comisionId = req.params.id;

  try {
    const comision = await Comision.findById(comisionId);

    if (!comision) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe comision',
      });
    }

    await Comision.findByIdAndDelete(comisionId);
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
  crearComision,
  obtenerComision,
  actualizarComision,
  eliminarComision,
};
