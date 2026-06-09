const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middlewares/validate");
const verifyToken = require("../middlewares/verifyToken");
const { crearLista, obtenerListas, borrarLista, crearGasto, obtenerGastos, actualizarGasto, borrarGasto } = require('../controllers/gastos.controller');

router.get('/listas', verifyToken, obtenerListas);

router.post('/listas',
    verifyToken,
    body("nombre").notEmpty().withMessage("El nombre de la lista es obligatorio"),
    validate,
    crearLista
);

router.delete('/listas/:listaId', verifyToken, borrarLista);

router.get('/listas/:listaId/gastos', verifyToken, obtenerGastos);

router.post('/listas/:listaId/gastos',
    verifyToken,
    body("concepto").notEmpty().withMessage("El concepto es obligatorio"),
    body("cantidad").isNumeric().withMessage("La cantidad debe ser un número"),
    body("categoria").notEmpty().withMessage("La categoría es obligatoria"),
    validate,
    crearGasto
);

router.put('/listas/:listaId/gastos/:gastoId', verifyToken, actualizarGasto);

router.delete('/listas/:listaId/gastos/:gastoId', verifyToken, borrarGasto);

module.exports = router;