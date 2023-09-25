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
const { obtenerUsuarios, obtenerUsuario, obtenerUsuarioCedula, crearUsuario, actualizarUsuario, borrarUsuario, loginUsuario, } = controllers_1.Usuario;
const { validarCampos, verificarIngreso, verificarRegistro } = middlewares_1.default;
const router = (0, express_1.Router)();
exports.router = router;
router.post('/loginUsuario/', verificarIngreso, validarCampos, loginUsuario);
router.get('/', obtenerUsuarios);
router.get('/obtenerUsuario/:id', (0, express_validator_1.check)('id', 'El ID de Mongo no es Valido').isMongoId(), validarCampos, obtenerUsuario);
router.get('/obtenerUsuarioCedula/:cedula', validarCampos, obtenerUsuarioCedula);
router.post('/crearUsuario', (0, express_validator_1.check)('cedulaUsuario', 'El numero de cedula es Obligatorio')
    .not()
    .isEmpty(), verificarRegistro, validarCampos, crearUsuario);
router.put('/actualizarUsuario/:idU', (0, express_validator_1.check)('idU', 'No se encuentran usuarios registrados con ese ID')
    .isMongoId(), validarCampos, actualizarUsuario);
router.delete('/borrarUsuario/:idU', (0, express_validator_1.check)('idU', 'No se encuentran usuarios registrados con ese ID')
    .isMongoId(), validarCampos, borrarUsuario);
