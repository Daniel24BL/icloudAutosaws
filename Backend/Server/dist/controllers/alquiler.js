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
exports.obtenerAlquilerPorUsuario = exports.borrarAlquiler = exports.actualizarAlquiler = exports.crearAlquiler = exports.obtenerAlquiler = exports.obtenerAlquileres = void 0;
const models_1 = require("../models");
// Obtener todos los alquileres
const obtenerAlquileres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = '10', desde = '0', } = req.query;
    const query = {
        estado: true,
    };
    try {
        const [total, alquileres] = yield Promise.all([
            models_1.Alquiler.countDocuments(query),
            models_1.Alquiler.find(query)
                .skip(Number(desde))
                .limit(Number(limite)),
        ]);
        res.json({
            total,
            alquileres,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerAlquileres = obtenerAlquileres;
// Obtener alquiler por ID
const obtenerAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const alquiler = yield models_1.Alquiler.findById(id);
        alquiler
            ? res.json({ alquiler })
            : res.status(404)
                .json({ message: 'Alquiler no encontrado' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerAlquiler = obtenerAlquiler;
const obtenerAlquilerPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idU } = req.params;
    try {
        const alquiler = yield models_1.Alquiler.find({
            usuario_ID: idU,
        })
            .populate('usuario_ID')
            .populate('vehiculo_ID')
            .populate('agencia_ID');
        alquiler
            ? res.json({ alquiler })
            : res.status(404)
                .json({ message: 'No posee alquileres' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerAlquilerPorUsuario = obtenerAlquilerPorUsuario;
// Crear un nuevo Alquiler
const crearAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    try {
        const alquiler = new models_1.Alquiler(body);
        const alquilerNuevo = yield alquiler.save();
        res.json({ alquiler: alquilerNuevo });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.crearAlquiler = crearAlquiler;
// Actualizar los datos de un Alquiler
const actualizarAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idA } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    try {
        const alquilerModificado = yield models_1.Alquiler.findByIdAndUpdate(idA, body, { new: true });
        alquilerModificado
            ? res.json({ alquiler: alquilerModificado })
            : res.status(404)
                .json({ message: 'Alquiler no encontrado' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.actualizarAlquiler = actualizarAlquiler;
// Eliminar un Alquiler
const borrarAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idA } = req.params;
    try {
        const alquilerEliminado = yield models_1.Alquiler.findByIdAndDelete(idA, { estado: false, new: true });
        alquilerEliminado
            ? res.json({ alquiler: alquilerEliminado })
            : res.status(404).json({ message: 'Alquiler no encontrado' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.borrarAlquiler = borrarAlquiler;
