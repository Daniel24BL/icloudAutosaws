import mongoose from 'mongoose'
import { IfotoVehiculo } from '../interfaces'

const { Schema, model } = mongoose

const FotoVehiculoSchema: mongoose.Schema = new Schema<IfotoVehiculo>( {
    imagen: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    vehiculo_ID: {
        type    : Schema.Types.ObjectId,
        ref     : 'Vehiculo',
        required: true,
    },
} )

const FotoVehiculo: mongoose.Model<IfotoVehiculo> = model<IfotoVehiculo>(
    'FotoVehiculo',
    FotoVehiculoSchema,
)

export { FotoVehiculo }
