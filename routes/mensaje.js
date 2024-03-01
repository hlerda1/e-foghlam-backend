const { Router } = require('express');

const { crearMensaje } = require('../controllers/mensaje');
const { obtenerMensaje } = require('../controllers/mensaje');
const { actualizarMensaje } = require('../controllers/mensaje');
const { eliminarMensaje } = require('../controllers/mensaje');

const router = Router();

router.post('/', crearMensaje);
router.get('/', obtenerMensaje);
router.put('/:id', actualizarMensaje);
router.delete('/:id', eliminarMensaje);

module.exports = router;