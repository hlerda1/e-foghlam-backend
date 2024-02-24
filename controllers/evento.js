const { response } = require('express');
const Evento = require('../helpers/evento');

// crear evento
const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);
  try {
    const eventoGuardar = await evento.save();

    res.status(201).json({
      ok: true,
      evento: eventoGuardar,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// obtener eventos
const obtenerEvento = async (req, res = response) => {
  const eventos = await Evento.find();
  res.json({
    ok: true,
    eventos,
  });
};

// editar evento
const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe el evento',
      });
    }

    const nuevoEvento = {
      ...req.body,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// eliminar evento
const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe evento',
      });
    }

    await Evento.findByIdAndDelete(eventoId);
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
  crearEvento,
  obtenerEvento,
  actualizarEvento,
  eliminarEvento,
};
