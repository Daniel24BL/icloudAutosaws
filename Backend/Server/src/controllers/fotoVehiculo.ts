import { Request, Response } from 'express'
import { IfotoVehiculo } from '../interfaces'
import { FotoVehiculo } from '../models'
import * as fs from 'fs-extra'
import * as path from 'path'

// Obtener todos las fotos de vehiculos
const obtenerfotoVehiculos = async( req: Request, res: Response ) => {
    const { limite = '10', desde = '0' } = req.query
    const query                          = {
        estado: true,
    }
    try {
        const [total, fotoVehiculos]: [Number, IfotoVehiculo[] | any] = await Promise.all(
            [
                FotoVehiculo.countDocuments( query ),
                FotoVehiculo.find( query )
                    .skip( Number( desde ) )
                    .limit( Number( limite ) ),
            ] )
        // fotoVehiculos.map( ( img: any ) => {
        //     return fs.writeFileSync(
        //         path.join( __dirname, '../uploads2/' ) + img._id +
        //         '-prueba.png',
        //         img.imagen,
        //     )
        // } )
        //
        // const imgPath = fs.readdirSync( path.join(
        //     __dirname,
        //     '../uploads2/',
        // ) )

        res.json( {
            total,
            fotoVehiculos,
            // imgPath,
        } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Obtener todos las fotos de vehiculos por ID vehiculo
const obtenerfotoVehiculosPorIDVehiculo = async(
    req: Request,
    res: Response,
) => {
    const { id } = req.params
    try {
        const resFotoVehiculo: IfotoVehiculo[] | any = await FotoVehiculo.findOne(
            {
                vehiculo_ID: id,
            } )

        resFotoVehiculo
            ? res.status( 200 ).json( { fotoVehiculo: resFotoVehiculo } )
            : res.json( { message: 'Este vehiculo no tiene foto' } )
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
        const fotoVehiculo: IfotoVehiculo | null = await FotoVehiculo.findById(
            id,
        )
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
    const { imagen, ...body } = req.body
    console.log( req.file )
    try {
        if ( req.file ) {
            const data = req.file.filename
            const fotoVehiculoNuevo = {
                imagen: data,
                ...body,
            }
            console.log( fotoVehiculoNuevo )
            const fotoVehiculo = new FotoVehiculo( fotoVehiculoNuevo )
            await fotoVehiculo.save()
            return res.json( {
                message: 'La Imagen se ha guardado Satisfactoriamente',
                fotoVehiculo,
            } )
        } else {
            return res.json( { message: 'No se ha subido ninguna imagen' } )
        }
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Actualizar la foto de un vehiculo
const actualizarfotoVehiculo = async( req: Request, res: Response ) => {
    const { idF }                      = req.params
    const { descripcion, vehiculo_ID } = req.body
    try {
        const actualizarfotoVehiculo = await FotoVehiculo.findByIdAndUpdate(
            idF,
            { descripcion, vehiculo_ID },
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
        const fotoVehiculo = await FotoVehiculo.findByIdAndDelete( id ).lean()
        if ( fotoVehiculo ) {
            const existe = await fs.pathExists(
                path.resolve( fotoVehiculo.imagen ),
            )
            if ( existe ) {
                await fs.unlink( path.resolve( fotoVehiculo.imagen ) )
            }
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
    obtenerfotoVehiculosPorIDVehiculo,
}
