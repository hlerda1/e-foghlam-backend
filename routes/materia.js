const { Router } = require('express');

const { CrearMateria } = require('../controllers/materia');
const { obtenerMateria } = require('../controllers/materia');

const router = Router();

router.post('/', CrearMateria);
router.get('/', obtenerMateria);

module.exports = router;
