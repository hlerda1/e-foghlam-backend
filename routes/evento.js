const { Router } = require('express');

const { crearEvento } = require('../controllers/evento');
const { obtenerEvento } = require('../controllers/evento');
const { actualizarEvento } = require('../controllers/evento');
const { eliminarEvento } = require('../controllers/evento');
const router = Router();

router.post('/', crearEvento);
router.get('/', obtenerEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

module.exports = router;
