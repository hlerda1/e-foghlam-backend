const { Router } = require('express');

const { crearActividad } = require('../controllers/actividad');
const { obtenerActividad } = require('../controllers/actividad');
const { actualizarActividad } = require('../controllers/actividad');
const { eliminarActividad } = require('../controllers/actividad');

const router = Router();

router.post('/', crearActividad);
router.get('/', obtenerActividad);
router.put('/:id', actualizarActividad);
router.delete('/:id', eliminarActividad);

module.exports = router;
