import { Request, Response } from 'express'
import { IAgencia } from '../interfaces'
import { Agencia } from '../models'

// Obtener todas las Agencias
const obtenerAgencias = async( req: Request, res: Response ) => {
    const {
        limite = '10', desde = '0',
    }     = req.query
    const query = {
        estado: true,
    }
    try {
        const [total, agencias]: [Number, IAgencia[]] = await Promise.all(
            [
                Agencia.countDocuments( query ),
                Agencia.find( query ).skip( Number( desde ) ).limit( Number( limite ) ),
            ],
        )
        res.json( {
            total,
            agencias,
        } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Obtener Agencias por ID
const obtenerAgencia = async( req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const agencia: IAgencia | null = await Agencia.findById( id )
        agencia
            ? res.json( { agencia } )
            : res.status( 404 )
                .json( { message: 'Agencia no encontrada' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Crear un nueva Agencia
const crearAgencia = async( req: Request, res: Response ) => {
    const { estado, ...body } = req.body as IAgencia
    try {
        const agencia      = new Agencia( body )
        const agenciaNueva = await agencia.save()
        res.json( { agencia: agenciaNueva } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Actualizar los datos de una Agencia
const actualizarAgencia = async( req: Request, res: Response ) => {
    const { idA }             = req.params
    const { estado, ...body } = req.body as IAgencia
    try {
        const agenciaModificada = await Agencia.findByIdAndUpdate(
            idA,
            body,
            { new: true },
        )
        agenciaModificada
            ? res.json( { agencia: agenciaModificada } )
            : res.status( 404 )
                .json( { message: 'Agencia no encontrada' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Eliminar una Agencia
const borrarAgencia = async( req: Request, res: Response ) => {
    const { idA } = req.params
    try {
        const agenciaEliminada = await Agencia.findByIdAndDelete(
            idA,
            { estado: false, new: true },
        )
        agenciaEliminada
            ? res.json( { agencia: agenciaEliminada } )
            : res.status( 404 )
                .json( { message: 'Agencia no encontrada' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

export {
    obtenerAgencias,
    obtenerAgencia,
    crearAgencia,
    actualizarAgencia,
    borrarAgencia,
}
