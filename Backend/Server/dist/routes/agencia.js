"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = __importDefault(require("../middlewares"));
const { obtenerAgencias, obtenerAgencia, crearAgencia, actualizarAgencia, borrarAgencia, } = controllers_1.Agencia;
const { validarCampos } = middlewares_1.default;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', obtenerAgencias);
router.get('/obtenerAgencia/:id', (0, express_validator_1.check)('id', 'El ID de Mongo no es Valido').isMongoId(), validarCampos, obtenerAgencia);
router.post('/crearAgencia', (0, express_validator_1.check)('usuario_ID', 'El ID de Mongo no es Valido').isMongoId(), validarCampos, crearAgencia);
router.put('/actualizarAgencia/:idA', (0, express_validator_1.check)('idA', 'La agencia con el ID no esta registrada').isMongoId(), validarCampos, actualizarAgencia);
router.delete('/borrarAgencia/:idA', (0, express_validator_1.check)('idA', 'La agencia con el ID no esta registrada')
    .isMongoId(), validarCampos, borrarAgencia);
