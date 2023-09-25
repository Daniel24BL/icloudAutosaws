"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const UsuarioSchema = new Schema({
    cedulaUsuario: {
        type: String,
        required: true,
        unique: true,
    },
    nombreUsuario: {
        type: String,
    },
    apellidoUsuario: {
        type: String,
    },
    telefonoUsuario: {
        type: String,
    },
    emailUsuario: {
        type: String,
    },
    contrasenaUsuario: {
        type: String,
    },
    ciudadResidencia: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
});
const Usuario = model('Usuario', UsuarioSchema);
exports.Usuario = Usuario;
