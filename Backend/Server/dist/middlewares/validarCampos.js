"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarIngreso = exports.verificarRegistro = exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const expresionesRegulares_1 = require("../libs/expresionesRegulares");
const validarCampos = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        return next();
    }
    catch (err) {
        res.status(403);
        res.send({ errors: err.array() });
    }
};
exports.validarCampos = validarCampos;
const verificarRegistro = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (body.cedulaUsuario === '' ||
        expresionesRegulares_1.ExpresionesRegulares.text.test(body.cedulaUsuario)) {
        return res
            .status(404)
            .json('Su número de cedula solo debe contener números, por favor ingréselo de forma correcta.');
    }
    if (body.nombreUsuario === '' ||
        expresionesRegulares_1.ExpresionesRegulares.number.test(body.nombreUsuario)) {
        return res
            .status(404)
            .json('Sus Nombres solo deben contener letras, por favor ingréselo de forma correcta.');
    }
    if (body.apellidoUsuario === '' ||
        expresionesRegulares_1.ExpresionesRegulares.number.test(body.apellidoUsuario)) {
        return res
            .status(404)
            .json('Sus Apellidos solo deben contener letras, por favor ingréselo de forma correcta.');
    }
    if (body.telefonoUsuario === '' ||
        expresionesRegulares_1.ExpresionesRegulares.text.test(body.telefonoUsuario)) {
        return res
            .status(404)
            .json('Su número de Teléfono no debe letras.');
    }
    if (body.emailUsuario === '' ||
        !expresionesRegulares_1.ExpresionesRegulares.email.test(body.emailUsuario)) {
        return res
            .status(404)
            .json('Ingresar un correo electrónico válido por favor.');
    }
    if (body.contrasenaUsuario === '') {
        return res
            .status(404)
            .json('La contraseña debe cumplir los párametro de seguridad, por favor ingrese una contraseña válida.');
    }
    if (body.ciudadResidencia === '' ||
        expresionesRegulares_1.ExpresionesRegulares.number.test(body.ciudadResidencia)) {
        return res
            .status(404)
            .json('Este campo solo debe contener letras, por favor ingréselo de forma correcta.');
    }
    next();
});
exports.verificarRegistro = verificarRegistro;
const verificarIngreso = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (body.emailUsuario === '' ||
        !expresionesRegulares_1.ExpresionesRegulares.email.test(body.emailUsuario)) {
        return res
            .status(404)
            .json('Ingresar un correo electrónico válido por favor.');
    }
    if (body.contrasenaUsuario === '') {
        return res
            .status(404)
            .json('Contraseña incorrecta, vuelva a intentarlo');
    }
    next();
});
exports.verificarIngreso = verificarIngreso;
