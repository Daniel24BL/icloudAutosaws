import mongoose from 'mongoose'
import { IUsuario } from '../interfaces'

const { Schema, model } = mongoose

const UsuarioSchema: mongoose.Schema = new Schema<IUsuario>( {
    cedulaUsuario: {
        type    : String,
        required: true,
        unique  : true,
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
        type    : Boolean,
        default : true,
        required: true,
    },
} )

const Usuario: mongoose.Model<IUsuario> = model<IUsuario>(
    'Usuario',
    UsuarioSchema,
)

export { Usuario }
