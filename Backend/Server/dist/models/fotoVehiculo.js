"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FotoVehiculo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const FotoVehiculoSchema = new Schema({
    imagen: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    vehiculo_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true,
    },
});
const FotoVehiculo = model('FotoVehiculo', FotoVehiculoSchema);
exports.FotoVehiculo = FotoVehiculo;
