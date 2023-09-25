import mongoose from "mongoose";
import { IfotoVehiculo } from '../interfaces/IfotoVehiculo';

const { Schema, model } = mongoose;

const FotoVehiculoSchema: mongoose.Schema = new Schema<IfotoVehiculo> ({
    imagen: {
        type: String,
    },
    descripcion: {
        type: String,
    },
})

const FotoVehiculo = model<IfotoVehiculo>('FotoVehiculo', FotoVehiculoSchema);

export { FotoVehiculo };