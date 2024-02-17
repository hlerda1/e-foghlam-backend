// Rutas de usuario
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// 2° desestructuro metodos e importo las controladoras
const {
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require('../controllers/auth');
const { loginUsuario } = require('../controllers/auth');
const { revalidarToken } = require('../controllers/auth');

const router = Router();

router.post(
  '/new',
  [
    //Validaciones
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('dni', 'El dni es obligatorio').isNumeric(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength({
      min: 6,
    }),
    check('fechaNacimiento', 'La fecha de nacimiento').not().isEmpty(),
    validarCampos,
  ],

  crearUsuario
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

//rutas alumno, docente, falta agregar validarJWT a los del usuario
router.get('/usuario', obtenerUsuario);
router.put('/usuario/:id', actualizarUsuario);
router.delete('/usuario/:id', eliminarUsuario);
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
