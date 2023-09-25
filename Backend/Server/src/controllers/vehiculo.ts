import { Request, Response } from 'express'
import { IVehiculo } from '../interfaces'
import { Vehiculo } from '../models'

// Obtener todos los vehiculos
const obtenerVehiculos = async( req: Request, res: Response ) => {
    const {
        limite = '10', desde = '0',
    }     = req.query
    const query = {
        estado: true,
    }
    try {
        const [total, vehiculos]: [Number, IVehiculo[]] = await Promise.all(
            [
                Vehiculo.countDocuments( query ),
                Vehiculo.find( query ).skip( Number( desde ) ).limit( Number( limite ) ),
            ],
        )
        res.json( {
            total,
            vehiculos,
        } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Obtener vehiculo por ID
const obtenerVehiculo = async( req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const vehiculo: IVehiculo | null = await Vehiculo.findById( id )
        vehiculo
            ? res.json( { vehiculo } )
            : res.status( 404 )
                .json( { message: 'El Vehiculo no existe' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Obtener vehiculo por ID de Usuario
const obtenerVehiculoIdUsuario = async( req: Request, res: Response ) => {
    const { idU } = req.params
    try {
        const vehiculo = await Vehiculo.find( { usuario_ID: idU } )
        if ( vehiculo.length === 0 ) {
            const error   = new Error()
            error.message = `El Usuario con número de ID: ${idU} no se encuentra registrado`
            throw error
        } else {
            return res.json( { vehiculo } )
        }
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Crear un nuevo Vehiculo
const crearVehiculo = async( req: Request, res: Response ) => {
    const { estado, ...body } = req.body as IVehiculo
    try {
        const existeVehiculo = await Vehiculo.findOne( { placaVehiculo: body.placaVehiculo } )
        if ( existeVehiculo ) {
            return res.status( 400 ).json( {
                message: `El Vehiculo con placa ${body.placaVehiculo} ya se encuentra registrado`,
            } )
        }
        const vehiculo      = new Vehiculo( body )
        const vehiculoNuevo = await vehiculo.save()
        return res.status( 201 ).json( { vehiculo: vehiculoNuevo } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Actualizar los datos de un Vehiculo
const actualizarVehiculo = async( req: Request, res: Response ) => {
    const { idV }             = req.params
    const { estado, ...body } = req.body as IVehiculo
    try {
        const vehiculoModificado = await Vehiculo.findByIdAndUpdate(
            idV,
            body,
            { new: true },
        )
        vehiculoModificado
            ? res.json( { vehiculo: vehiculoModificado } )
            : res.status( 404 )
                .json( { message: 'El Vehiculo no existe' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Eliminar un Vehiculo
const borrarVehiculo = async( req: Request, res: Response ) => {
    const { idV } = req.params
    try {
        const vehiculoEliminado = await Vehiculo.findByIdAndDelete(
            idV,
            { estado: false, new: true },
        )
        vehiculoEliminado
            ? res.json( { vehiculo: vehiculoEliminado } )
            : res.status( 404 ).json( { message: 'El Vehiculo no existe' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

export {
    obtenerVehiculo,
    obtenerVehiculos,
    obtenerVehiculoIdUsuario,
    crearVehiculo,
    actualizarVehiculo,
    borrarVehiculo,
}
