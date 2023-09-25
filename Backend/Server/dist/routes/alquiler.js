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
const alquiler_1 = require("../controllers/alquiler");
const { obtenerAlquileres, obtenerAlquiler, crearAlquiler, actualizarAlquiler, borrarAlquiler, } = controllers_1.Alquiler;
const { validarCampos } = middlewares_1.default;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', obtenerAlquileres);
router.get('/obtenerAlquiler/:id', (0, express_validator_1.check)('id', 'El ID de Mongo no es Valido').isMongoId(), validarCampos, obtenerAlquiler);
router.get('/obtenerAlquilerPorUsuario/:idU', alquiler_1.obtenerAlquilerPorUsuario);
router.post('/crearAlquiler', (0, express_validator_1.check)('agencia_ID', 'El ID de Mongo no es Valido').isMongoId(), validarCampos, crearAlquiler);
router.put('/actualizarAlquiler/:idA', (0, express_validator_1.check)('idA', 'El Alquiler con ese ID no se encuentra registrado')
    .isMongoId(), validarCampos, actualizarAlquiler);
router.delete('/borrarAlquiler/:idA', (0, express_validator_1.check)('idA', 'El Alquiler con ese ID no esta registrado')
    .isMongoId(), validarCampos, borrarAlquiler);
