import { Request, Response } from 'express'
import fs from 'fs-extra'
import path from 'path'

import { IfotoVehiculo } from '../interfaces'
import { FotoVehiculo } from '../models'

// Obtener todos las fotos de vehiculos
const obtenerfotoVehiculos = async( req: Request, res: Response ) => {
    const {
        limite = '10', desde = '0',
    }     = req.query
    const query = {
        estado: true,
    }
    try {
        const [total, fotoVehiculos]: [Number, IfotoVehiculo[]] = await Promise.all(
            [
                FotoVehiculo.countDocuments( query ),
                FotoVehiculo.find( query )
                    .skip( Number( desde ) )
                    .limit( Number( limite ) ),
            ],
        )
        res.json( {
            total,
            fotoVehiculos,
        } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Obtener la foto de un vehiculo por ID
const obtenerfotoVehiculo = async( req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const fotoVehiculo: IfotoVehiculo | null = await FotoVehiculo.findById(id)
        fotoVehiculo
            ? res.json( { fotoVehiculo } )
            : res.json( { message: 'La Foto no ha sido encontrada' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Crear nueva foto de vehiculo
const crearfotoVehiculo = async( req: Request, res: Response ) => {
    const { descripcion } = req.body

    const fotoVehiculoNuevo = { descripcion, imagen: req.file?.path }
    try {
        const fotoVehiculo = new FotoVehiculo( fotoVehiculoNuevo )
        await fotoVehiculo.save()
        return res.json( {
            message: 'La Imagen se ha guardado Satisfactoriamente',
            fotoVehiculo,
        } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Actualizar la foto de un vehiculo
const actualizarfotoVehiculo = async( req: Request, res: Response ) => {
    const { idF }         = req.params
    const { descripcion } = req.body
    try {
        const actualizarfotoVehiculo = await FotoVehiculo.findByIdAndUpdate(
            idF,
            { descripcion },
        )
        actualizarfotoVehiculo
            ? res.json( {
                message     : 'La Foto ha sido actualizada',
                fotoVehiculo: actualizarfotoVehiculo,
            } )
            : res.json( { message: 'La Foto no ha sido encontrada' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}


// Borrar la foto de un vehiculo
const borrarfotoVehiculo = async( req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const fotoVehiculo = await FotoVehiculo.findByIdAndDelete( id )
            .lean()
        if ( fotoVehiculo ) {
            const existe = await fs.pathExists( path.resolve( fotoVehiculo.imagen ) )
            if ( existe ) { await fs.unlink( path.resolve( fotoVehiculo.imagen ) ) }
        } else {
            return res.json( { message: 'La Foto no ha sido encontrada' } )
        }
        return res.json( { message: 'La Foto ha sido eliminada', fotoVehiculo } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

export {
    obtenerfotoVehiculos,
    obtenerfotoVehiculo,
    crearfotoVehiculo,
    actualizarfotoVehiculo,
    borrarfotoVehiculo,
}
