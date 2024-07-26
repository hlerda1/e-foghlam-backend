const { Router } = require('express');

const { CrearCalificacion } = require('../controllers/calificacion');
const { obtenerCalificacion } = require('../controllers/calificacion');
const { actualizarCalificacion } = require('../controllers/calificacion');
const { eliminarCalificacion } = require('../controllers/calificacion');

const router = Router();

router.post('/', CrearCalificacion);
router.get('/', obtenerCalificacion);
router.put('/:id', actualizarCalificacion);
router.delete('/:id', eliminarCalificacion);

module.exports = router;
