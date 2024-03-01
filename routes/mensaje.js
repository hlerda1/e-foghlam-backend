const { response } = require('express');
const Mensaje = require('../models/mensaje');

// crear mensaje
const crearMensaje = async (req, res = response) => {
  const mensaje = new Mensaje(req.body);
  try {
    const mensajeGuardar = await mensaje.save();

    res.status(201).json({
      ok: true,
      mensaje: mensajeGuardar,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// obtener mensaje todos y por id
const obtenerMensaje = async (req, res = response) => {
  const mensajes = await Mensaje.find(req.query);
  res.json({
    ok: true,
    mensajes,
  });
};

// editar mensaje
const actualizarMensaje = async (req, res = response) => {
  const mensajeId = req.params.id;

  try {
    const mensaje = await Mensaje.findById(mensajeId);

    if (!mensaje) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe el mensaje',
      });
    }

    const nuevoMensaje = {
      ...req.body,
    };

    const mensajeActualizado = await Mensaje.findByIdAndUpdate(
      mensajeId,
      nuevoMensaje,
      { new: true }
    );
    res.json({
      ok: true,
      evento: mensajeActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// eliminar mensaje
const eliminarMensaje = async (req, res = response) => {
  const mensajeId = req.params.id;

  try {
    const mensaje = await Mensaje.findById(mensajeId);

    if (!mensaje) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe mensaje',
      });
    }

    await Mensaje.findByIdAndDelete(mensajeId);
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
  crearMensaje,
  obtenerMensaje,
  actualizarMensaje,
  eliminarMensaje,
};
