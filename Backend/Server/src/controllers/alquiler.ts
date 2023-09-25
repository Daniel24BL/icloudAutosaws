import { Request, Response } from 'express'
import { IAlquiler } from '../interfaces'
import { Alquiler } from '../models'

// Obtener todos los alquileres
const obtenerAlquileres = async( req: Request, res: Response ) => {
    const {
        limite = '10', desde = '0',
    }     = req.query
    const query = {
        estado: true,
    }
    try {
        const [total, alquileres]: [Number, IAlquiler[]] = await Promise.all(
            [
                Alquiler.countDocuments( query ),
                Alquiler.find( query )
                    .skip( Number( desde ) )
                    .limit( Number( limite ) ),
            ],
        )
        res.json( {
            total,
            alquileres,
        } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Obtener alquiler por ID
const obtenerAlquiler = async( req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const alquiler: IAlquiler | null = await Alquiler.findById( id )
        alquiler
            ? res.json( { alquiler } )
            : res.status( 404 )
                .json( { message: 'Alquiler no encontrado' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

const obtenerAlquilerPorUsuario = async( req: Request, res: Response ) => {
    const { idU } = req.params
    try {
        const alquiler: IAlquiler | any = await Alquiler.find( {
            usuario_ID: idU,
        } )
            .populate( 'usuario_ID' )
            .populate( 'vehiculo_ID' )
            .populate( 'agencia_ID' )
        alquiler
            ? res.json( { alquiler } )
            : res.status( 404 )
                .json( { message: 'No posee alquileres' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Crear un nuevo Alquiler
const crearAlquiler = async( req: Request, res: Response ) => {
    const { estado, ...body } = req.body as IAlquiler
    try {
        const alquiler      = new Alquiler( body )
        const alquilerNuevo = await alquiler.save()
        res.json( { alquiler: alquilerNuevo } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Actualizar los datos de un Alquiler
const actualizarAlquiler = async( req: Request, res: Response ) => {
    const { idA }             = req.params
    const { estado, ...body } = req.body as IAlquiler
    try {
        const alquilerModificado = await Alquiler.findByIdAndUpdate(
            idA,
            body,
            { new: true },
        )
        alquilerModificado
            ? res.json( { alquiler: alquilerModificado } )
            : res.status( 404 )
                .json( { message: 'Alquiler no encontrado' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Eliminar un Alquiler
const borrarAlquiler = async( req: Request, res: Response ) => {
    const { idA } = req.params
    try {
        const alquilerEliminado = await Alquiler.findByIdAndDelete(
            idA,
            { estado: false, new: true },
        )
        alquilerEliminado
            ? res.json( { alquiler: alquilerEliminado } )
            : res.status( 404 ).json( { message: 'Alquiler no encontrado' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

export {
    obtenerAlquileres,
    obtenerAlquiler,
    crearAlquiler,
    actualizarAlquiler,
    borrarAlquiler,
    obtenerAlquilerPorUsuario,
}
