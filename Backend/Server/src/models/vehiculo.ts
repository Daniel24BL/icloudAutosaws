import mongoose from 'mongoose'
import { IVehiculo } from '../interfaces'

const { Schema, model } = mongoose

const VehiculoSchema: mongoose.Schema = new Schema<IVehiculo>( {
    placaVehiculo: {
        type    : String,
        required: true,
        unique  : true,
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
        type   : Number,
        default: 0,
    },
    usuario_ID: {
        type    : Schema.Types.ObjectId,
        ref     : 'Usuario',
        required: true,
    },
    estado: {
        type    : Boolean,
        default : true,
        required: true,
    },
} )

const Vehiculo: mongoose.Model<IVehiculo> = model<IVehiculo>(
    'Vehiculo',
    VehiculoSchema,
)

export { Vehiculo }
