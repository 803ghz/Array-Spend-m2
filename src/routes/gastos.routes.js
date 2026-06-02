const express = require('express');
const router = express.Router();
const { obtenerGastos, obtenerGastoPorId, crearGasto, actualizarGasto, borrarGasto } = require('../controllers/gastos.controller');
const validate = require("../middlewares/validate")
const { body, validationResult } = require("express-validator");

router.get('/', obtenerGastos);
router.get('/:id', obtenerGastoPorId);
router.post('/', body("concepto").notEmpty().withMessage("El concepto es obligatorio"), validate, crearGasto);
router.put('/:id', actualizarGasto);

module.exports = router;