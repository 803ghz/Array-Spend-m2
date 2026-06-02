const express = require('express');
const router = express.Router();
const { obtenerGastos, obtenerGastoPorId, crearGasto, actualizarGasto, borrarGasto } = require('../controllers/gastos.controller');

router.get('/', obtenerGastos);
router.get('/:id', obtenerGastoPorId);
router.post('/', crearGasto);
router.put('/:id', actualizarGasto);

module.exports = router;