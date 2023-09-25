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
exports.borrarVehiculo = exports.actualizarVehiculo = exports.crearVehiculo = exports.obtenerVehiculoIdUsuario = exports.obtenerVehiculos = exports.obtenerVehiculo = void 0;
const models_1 = require("../models");
// Obtener todos los vehiculos
const obtenerVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = '10', desde = '0', } = req.query;
    const query = {
        estado: true,
    };
    try {
        const [total, vehiculos] = yield Promise.all([
            models_1.Vehiculo.countDocuments(query),
            models_1.Vehiculo.find(query).skip(Number(desde)).limit(Number(limite)),
        ]);
        res.json({
            total,
            vehiculos,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerVehiculos = obtenerVehiculos;
// Obtener vehiculo por ID
const obtenerVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vehiculo = yield models_1.Vehiculo.findById(id);
        vehiculo
            ? res.json({ vehiculo })
            : res.status(404)
                .json({ message: 'El Vehiculo no existe' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerVehiculo = obtenerVehiculo;
// Obtener vehiculo por ID de Usuario
const obtenerVehiculoIdUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idU } = req.params;
    try {
        const vehiculo = yield models_1.Vehiculo.find({ usuario_ID: idU });
        if (vehiculo.length === 0) {
            const error = new Error();
            error.message = `El Usuario con número de ID: ${idU} no se encuentra registrado`;
            throw error;
        }
        else {
            return res.json({ vehiculo });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.obtenerVehiculoIdUsuario = obtenerVehiculoIdUsuario;
// Crear un nuevo Vehiculo
const crearVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    try {
        const existeVehiculo = yield models_1.Vehiculo.findOne({ placaVehiculo: body.placaVehiculo });
        if (existeVehiculo) {
            return res.status(400).json({
                message: `El Vehiculo con placa ${body.placaVehiculo} ya se encuentra registrado`,
            });
        }
        const vehiculo = new models_1.Vehiculo(body);
        const vehiculoNuevo = yield vehiculo.save();
        return res.status(201).json({ vehiculo: vehiculoNuevo });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.crearVehiculo = crearVehiculo;
// Actualizar los datos de un Vehiculo
const actualizarVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idV } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    try {
        const vehiculoModificado = yield models_1.Vehiculo.findByIdAndUpdate(idV, body, { new: true });
        vehiculoModificado
            ? res.json({ vehiculo: vehiculoModificado })
            : res.status(404)
                .json({ message: 'El Vehiculo no existe' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.actualizarVehiculo = actualizarVehiculo;
// Eliminar un Vehiculo
const borrarVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idV } = req.params;
    try {
        const vehiculoEliminado = yield models_1.Vehiculo.findByIdAndDelete(idV, { estado: false, new: true });
        vehiculoEliminado
            ? res.json({ vehiculo: vehiculoEliminado })
            : res.status(404).json({ message: 'El Vehiculo no existe' });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.borrarVehiculo = borrarVehiculo;
