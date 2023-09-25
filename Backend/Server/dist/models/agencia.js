"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agencia = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const AgenciaSchema = new Schema({
    usuario_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    vehiculo_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true,
    },
    ciudadUbicacion: {
        type: String,
        required: true,
    },
    barrioUbicacion: {
        type: String,
    },
    direccionUbicacion: {
        type: String,
    },
    referenciaUbicacion: {
        type: String,
    },
    disponibilidadVehiculo: {
        type: Boolean,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
});
const Agencia = model('Agencia', AgenciaSchema);
exports.Agencia = Agencia;
