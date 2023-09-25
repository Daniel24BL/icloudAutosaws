import mongoose from 'mongoose'
import { IAlquiler } from '../interfaces'

const { Schema, model } = mongoose

const AlquilerSchema: mongoose.Schema = new Schema<IAlquiler>( {
    agencia_ID: {
        type    : Schema.Types.ObjectId,
        ref     : 'Agencia',
        required: true,
    },
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
        type    : Boolean,
        default : true,
        required: true,
    },
} )

const Alquiler: mongoose.Model<IAlquiler> = model<IAlquiler>(
    'Alquiler',
    AlquilerSchema,
)

export { Alquiler }
