"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alquiler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const AlquilerSchema = new Schema({
    agencia_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Agencia',
        required: true,
    },
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
    diasAlquiler: {
        type: Number,
    },
    inicioAlquiler: {
        type: Date,
    },
    finAlquiler: {
        type: Date,
    },
    pagoAbono: {
        type: Number,
    },
    garantia: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
});
const Alquiler = model('Alquiler', AlquilerSchema);
exports.Alquiler = Alquiler;
