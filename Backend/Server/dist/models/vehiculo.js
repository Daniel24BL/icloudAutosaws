"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehiculo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const VehiculoSchema = new Schema({
    placaVehiculo: {
        type: String,
        required: true,
        unique: true,
    },
    marcaVehiculo: {
        type: String,
    },
    modeloVehiculo: {
        type: String,
    },
    tipoVehiculo: {
        type: String,
    },
    matriculaVehiculo: {
        type: String,
    },
    seguroVehiculo: {
        type: String,
    },
    valorAlquilerDia: {
        type: Number,
        default: 0,
    },
    usuario_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
});
const Vehiculo = model('Vehiculo', VehiculoSchema);
exports.Vehiculo = Vehiculo;
