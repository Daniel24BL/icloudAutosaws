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
exports.borrarAgencia = exports.actualizarAgencia = exports.crearAgencia = exports.obtenerAgencia = exports.obtenerAgencias = void 0;
const models_1 = require("../models");
// Obtener todas las Agencias
const obtenerAgencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = '10', desde = '0', } = req.query;
    const query = {
        estado: true,
    };
    try {
        const [total, agencias] = yield Promise.all([
            models_1.Agencia.countDocuments(query),
            models_1.Agencia.find(query).skip(Number(desde)).limit(Number(limite)),
        ]);
        res.json({
            total,
            agencias,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerAgencias = obtenerAgencias;
// Obtener Agencias por ID
const obtenerAgencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const agencia = yield models_1.Agencia.findById(id);
        agencia
            ? res.json({ agencia })
            : res.status(404)
                .json({ message: 'Agencia no encontrada' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerAgencia = obtenerAgencia;
// Crear un nueva Agencia
const crearAgencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    try {
        const agencia = new models_1.Agencia(body);
        const agenciaNueva = yield agencia.save();
        res.json({ agencia: agenciaNueva });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.crearAgencia = crearAgencia;
// Actualizar los datos de una Agencia
const actualizarAgencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idA } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    try {
        const agenciaModificada = yield models_1.Agencia.findByIdAndUpdate(idA, body, { new: true });
        agenciaModificada
            ? res.json({ agencia: agenciaModificada })
            : res.status(404)
                .json({ message: 'Agencia no encontrada' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.actualizarAgencia = actualizarAgencia;
// Eliminar una Agencia
const borrarAgencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idA } = req.params;
    try {
        const agenciaEliminada = yield models_1.Agencia.findByIdAndDelete(idA, { estado: false, new: true });
        agenciaEliminada
            ? res.json({ agencia: agenciaEliminada })
            : res.status(404)
                .json({ message: 'Agencia no encontrada' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.borrarAgencia = borrarAgencia;
