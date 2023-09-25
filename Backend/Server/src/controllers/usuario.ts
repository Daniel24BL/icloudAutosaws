import { Request, Response } from 'express'
import { IUsuario } from '../interfaces'
import { Usuario } from '../models'
import { compare, encrypt } from '../helpers/bcrypt'

// Obtener todos los Usuarios
const obtenerUsuarios = async( req: Request, res: Response ) => {
    const query = {
        estado: true,
    }
    try {
        const [total, usuarios]: [Number, IUsuario[]] = await Promise.all(
            [
                Usuario.countDocuments( query ),
                Usuario.find( query ),
            ],
        )
        res.status( 200 ).json( {
            total,
            usuarios,
        } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Obtener Usuario por ID
const obtenerUsuario = async( req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const usuario: IUsuario | null = await Usuario.findById( id )
        usuario === null
            ? res.status( 404 )
                .json( 'No existe un usuario registrado con ese ID' )
            : res.status( 200 ).json( { usuario } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Obtener Usuarios por número de Cedula
const obtenerUsuarioCedula = async( req: Request, res: Response ) => {
    const { cedula } = req.params
    try {
        const usuario = await Usuario.findOne( { cedulaUsuario: cedula } )
        if ( !usuario ) {
            const error   = new Error()
            error.message = `El Usuario con número de cedula ${cedula} no se encuentra registrado`
            throw error
        } else {
            res.json( { usuario } )
        }
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Crear un nuevo Usuario
const crearUsuario = async( req: Request, res: Response ) => {
    const { estado, contrasenaUsuario, ...body } = req.body as IUsuario
    try {
        const existeUsuario = await Usuario.findOne( { cedulaUsuario: body.cedulaUsuario } )
        if ( existeUsuario ) {
            return res.status( 400 ).json( {
                message: `El Usuario con número de cedula ${body.cedulaUsuario} ya se encuentra registrado`,
            } )
        }
        const contrasenaHash = await encrypt( contrasenaUsuario )
        const nuevoUsuario   = {
            contrasenaUsuario: contrasenaHash,
            ...body,
        }
        const usuario        = new Usuario( nuevoUsuario )
        const usuarioNuevo   = await usuario.save()
        return res.status( 201 ).json( { usuario: usuarioNuevo } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Actualizar los datos de un Usuario
const actualizarUsuario = async( req: Request, res: Response ) => {
    const { idU }             = req.params
    const { estado, ...body } = req.body as IUsuario
    try {
        const usuarioModificado = await Usuario.findByIdAndUpdate(
            idU,
            body,
            { new: true },
        )
        usuarioModificado === null
            ? res.status( 404 ).json( 'No existe un usuario registrado con ese ID' )
            : res.status( 200 ).json( { usuario: usuarioModificado } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Eliminar un Usuario
const borrarUsuario = async( req: Request, res: Response ) => {
    const { idU } = req.params
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(
            idU,
            { estado: false, new: true },
        )
        usuarioEliminado === null
            ? res.status( 404 ).json( 'No existe un usuario registrado con ese ID' )
            : res.status( 200 ).json( { usuario: usuarioEliminado } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

// Login de Usuario
const loginUsuario = async( req: Request, res: Response ) => {
    const { emailUsuario, contrasenaUsuario } = req.body
    try {
        const user = await Usuario.findOne( { emailUsuario } )
        if ( !user ) {
            return res.status( 404 )
                .json( 'No existe un usuario registrado con ese email' )
        }

        const verificarContrasena = await compare(
            contrasenaUsuario,
            user.contrasenaUsuario,
        )
        verificarContrasena
            ? res.status( 200 ).json( { user } )
            : res.status( 404 )
                .json( { message: 'Contraseña incorrecta' } )
    } catch ( error: Error | any ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
}

export {
    obtenerUsuarios,
    obtenerUsuario,
    obtenerUsuarioCedula,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    loginUsuario,
}
