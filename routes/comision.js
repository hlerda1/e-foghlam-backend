const { Router } = require('express');

const { crearComision } = require('../controllers/comision');
const { obtenerComision } = require('../controllers/comision');
const { actualizarComision } = require('../controllers/comision');
const { eliminarComision } = require('../controllers/comision');

const router = Router();

router.post('/', crearComision);
router.get('/', obtenerComision);
router.put('/:id', actualizarComision);
router.delete('/:id', eliminarComision);

module.exports = router;
