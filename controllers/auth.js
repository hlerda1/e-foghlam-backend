const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

// obtener usuario y rol
const obtenerUsuario = async (req, res = response) => {
  const usuarios = await Usuario.find(req.query).populate([
    {
      path: 'tutorAsignado',
      model: 'Usuario',
    },
    
  ]);
  res.json({
    ok: true,
    msg: usuarios,
  });
};

//actualizar usuario rol alumno
const actualizarUsuario = async (req, res = response) => {
  const alumnoId = req.params.id;

  try {
    const alumno = await Usuario.findById(alumnoId);

    if (!alumno) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe alumno con ese id',
      });
    }

    //creacion nuevo alumno
    const nuevoAlumno = {
      ...req.body,
    };

    //actualizacion nuevo alumno
    const alumnoActualizado = await Usuario.findByIdAndUpdate(
      alumnoId,
      nuevoAlumno,
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

// eliminar usuario rol alumno
const eliminarUsuario = async (req, res = response) => {
  const alumnoId = req.params.id;

  try {
    const alumno = await Usuario.findById(alumnoId);

    if (!alumno) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe alumno con ese id',
      });
    }

    
    await Usuario.findByIdAndDelete(alumnoId);
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

//crear usuario
const crearUsuario = async (req, res = response) => {
  const { nombre, apellido, dni, email, password, fechaNacimiento, rol } =
    req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        msg: 'El usuario ya existe',
        ok: false,
      });
    }

    usuario = new Usuario(req.body);
    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    //generar JWT
    const token = await generarJWT(usuario.id, usuario.nombre);

    //respuesta exitosa
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      msg: 'usuario creado',
      nombre: nombre.usuario,
      token: token,
      apellido,
      dni,
      email,
      password,
      fechaNacimiento,
      rol,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};

// login, falta algo const ?
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      });
    }

    const token = await generarJWT(usuario.id, usuario.nombre, usuario.rol);

    res.json({
      ok: true,
      uid: usuario.id,
      msg: 'login',
      nombre: usuario.nombre,
      rol: usuario.rol,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador',
    });
  }
};
auth.js
//revalidar
const revalidarToken = async (req, res = response) => {
  const { uid, nombre, rol } = req;

  //tarea token
  const token = await generarJWT(uid, nombre, rol);

  res.json({
    ok: true,
    uid,
    nombre,
    rol,
    token,
  });
};

module.exports = {
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
