const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status.json(401)({
      ok: false,
      msg: 'No hay token',
    });
  }

  try {
    const { uid, nombre } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.nombre = nombre;
  } catch (error) {
    return res.status.json(401)({
      ok: false,
      msg: 'Token no válido',
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
