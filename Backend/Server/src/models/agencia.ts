import mongoose from 'mongoose'
import { IAgencia } from '../interfaces'

const { Schema, model } = mongoose

const AgenciaSchema: mongoose.Schema = new Schema<IAgencia>( {
    usuario_ID: {
        type    : Schema.Types.ObjectId,
        ref     : 'Usuario',
        required: true,
    },
    vehiculo_ID: {
        type    : Schema.Types.ObjectId,
        ref     : 'Vehiculo',
        required: true,
    },
    ciudadUbicacion: {
        type    : String,
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
        type    : Boolean,
        required: true,
    },
    estado: {
        type    : Boolean,
        default : true,
        required: true,
    },
} )

const Agencia: mongoose.Model<IAgencia> = model<IAgencia>(
    'Agencia',
    AgenciaSchema,
)

export { Agencia }








