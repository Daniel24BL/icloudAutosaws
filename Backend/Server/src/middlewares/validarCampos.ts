import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ExpresionesRegulares } from '../libs/expresionesRegulares'

const validarCampos = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        validationResult( req ).throw()
        return next()
    } catch ( err: Error | any ) {
        res.status( 403 )
        res.send( { errors: err.array() } )
    }
}

const verificarRegistro = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { body } = req
    if ( body.cedulaUsuario === '' ||
        ExpresionesRegulares.text.test( body.cedulaUsuario ) ) {
        return res
            .status( 404 )
            .json(
                'Su número de cedula solo debe contener números, por favor ingréselo de forma correcta.' )
    }
    if ( body.nombreUsuario === '' ||
        ExpresionesRegulares.number.test( body.nombreUsuario ) ) {
        return res
            .status( 404 )
            .json(
                'Sus Nombres solo deben contener letras, por favor ingréselo de forma correcta.' )
    }
    if ( body.apellidoUsuario === '' ||
        ExpresionesRegulares.number.test( body.apellidoUsuario ) ) {
        return res
            .status( 404 )
            .json(
                'Sus Apellidos solo deben contener letras, por favor ingréselo de forma correcta.' )
    }
    if ( body.telefonoUsuario === '' ||
        ExpresionesRegulares.text.test( body.telefonoUsuario ) ) {
        return res
            .status( 404 )
            .json( 'Su número de Teléfono no debe letras.' )
    }
    if ( body.emailUsuario === '' ||
        !ExpresionesRegulares.email.test( body.emailUsuario ) ) {
        return res
            .status( 404 )
            .json( 'Ingresar un correo electrónico válido por favor.' )
    }
    if ( body.contrasenaUsuario === '' ) {
        return res
            .status( 404 )
            .json(
                'La contraseña debe cumplir los párametro de seguridad, por favor ingrese una contraseña válida.' )
    }
    if ( body.ciudadResidencia === '' ||
        ExpresionesRegulares.number.test( body.ciudadResidencia ) ) {
        return res
            .status( 404 )
            .json(
                'Este campo solo debe contener letras, por favor ingréselo de forma correcta.' )
    }
    next()
}

const verificarIngreso = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { body } = req
    if ( body.emailUsuario === '' ||
        !ExpresionesRegulares.email.test( body.emailUsuario ) ) {
        return res
            .status( 404 )
            .json( 'Ingresar un correo electrónico válido por favor.' )
    }
    if ( body.contrasenaUsuario === '' ) {
        return res
            .status( 404 )
            .json( 'Contraseña incorrecta, vuelva a intentarlo' )
    }
    next()
}

export {
    validarCampos,
    verificarRegistro,
    verificarIngreso,
}
