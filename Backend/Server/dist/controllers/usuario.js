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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsuario = exports.borrarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuarioCedula = exports.obtenerUsuario = exports.obtenerUsuarios = void 0;
const models_1 = require("../models");
const bcrypt_1 = require("../helpers/bcrypt");
// Obtener todos los Usuarios
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        estado: true,
    };
    try {
        const [total, usuarios] = yield Promise.all([
            models_1.Usuario.countDocuments(query),
            models_1.Usuario.find(query),
        ]);
        res.status(200).json({
            total,
            usuarios,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
// Obtener Usuario por ID
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield models_1.Usuario.findById(id);
        usuario === null
            ? res.status(404)
                .json('No existe un usuario registrado con ese ID')
            : res.status(200).json({ usuario });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerUsuario = obtenerUsuario;
// Obtener Usuarios por número de Cedula
const obtenerUsuarioCedula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula } = req.params;
    try {
        const usuario = yield models_1.Usuario.findOne({ cedulaUsuario: cedula });
        if (!usuario) {
            const error = new Error();
            error.message = `El Usuario con número de cedula ${cedula} no se encuentra registrado`;
            throw error;
        }
        else {
            res.json({ usuario });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerUsuarioCedula = obtenerUsuarioCedula;
// Crear un nuevo Usuario
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado, contrasenaUsuario } = _a, body = __rest(_a, ["estado", "contrasenaUsuario"]);
    try {
        const existeUsuario = yield models_1.Usuario.findOne({ cedulaUsuario: body.cedulaUsuario });
        if (existeUsuario) {
            return res.status(400).json({
                message: `El Usuario con número de cedula ${body.cedulaUsuario} ya se encuentra registrado`,
            });
        }
        const contrasenaHash = yield (0, bcrypt_1.encrypt)(contrasenaUsuario);
        const nuevoUsuario = Object.assign({ contrasenaUsuario: contrasenaHash }, body);
        const usuario = new models_1.Usuario(nuevoUsuario);
        const usuarioNuevo = yield usuario.save();
        return res.status(201).json({ usuario: usuarioNuevo });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.crearUsuario = crearUsuario;
// Actualizar los datos de un Usuario
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idU } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    try {
        const usuarioModificado = yield models_1.Usuario.findByIdAndUpdate(idU, body, { new: true });
        usuarioModificado === null
            ? res.status(404).json('No existe un usuario registrado con ese ID')
            : res.status(200).json({ usuario: usuarioModificado });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
// Eliminar un Usuario
const borrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idU } = req.params;
    try {
        const usuarioEliminado = yield models_1.Usuario.findByIdAndDelete(idU, { estado: false, new: true });
        usuarioEliminado === null
            ? res.status(404).json('No existe un usuario registrado con ese ID')
            : res.status(200).json({ usuario: usuarioEliminado });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.borrarUsuario = borrarUsuario;
// Login de Usuario
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailUsuario, contrasenaUsuario } = req.body;
    try {
        const user = yield models_1.Usuario.findOne({ emailUsuario });
        if (!user) {
            return res.status(404)
                .json('No existe un usuario registrado con ese email');
        }
        const verificarContrasena = yield (0, bcrypt_1.compare)(contrasenaUsuario, user.contrasenaUsuario);
        verificarContrasena
            ? res.status(200).json({ user })
            : res.status(404)
                .json({ message: 'Contraseña incorrecta' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.loginUsuario = loginUsuario;
