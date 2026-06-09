import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import verifyToken from '../middlewares/verifyToken.js';
import { 
    crearLista, 
    obtenerListas, 
    borrarLista, 
    crearGasto, 
    obtenerGastos, 
    actualizarGasto, 
    borrarGasto 
} from '../controllers/gastos.controller.js';

const router = express.Router();

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

export default router;