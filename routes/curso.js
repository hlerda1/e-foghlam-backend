const { Router } = require('express');

const { CrearCurso } = require('../controllers/curso');
const { obtenerCurso } = require('../controllers/curso');
const { actualizarCurso } = require('../controllers/curso');
const { eliminarCurso } = require('../controllers/curso');

const router = Router();

router.post('/', CrearCurso);
router.get('/', obtenerCurso);
router.put('/:id', actualizarCurso);
router.delete('/:id', eliminarCurso);

module.exports = router;
