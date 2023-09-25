import { Router } from 'express'
import { check } from 'express-validator'

import { Usuario } from '../controllers'
import funciones from '../middlewares'

const {
    obtenerUsuarios,
    obtenerUsuario,
    obtenerUsuarioCedula,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    loginUsuario,
} = Usuario

const { validarCampos, verificarIngreso, verificarRegistro } = funciones

const router = Router()

router.post(
    '/loginUsuario/',
    verificarIngreso,
    validarCampos,
    loginUsuario,
)

router.get( '/', obtenerUsuarios )

router.get( '/obtenerUsuario/:id',
    check( 'id', 'El ID de Mongo no es Valido' ).isMongoId(),
    validarCampos, obtenerUsuario,
)

router.get( '/obtenerUsuarioCedula/:cedula',
    validarCampos, obtenerUsuarioCedula,
)

router.post( '/crearUsuario',
    check( 'cedulaUsuario', 'El numero de cedula es Obligatorio' )
        .not()
        .isEmpty(),
    verificarRegistro,
    validarCampos, crearUsuario,
)

router.put( '/actualizarUsuario/:idU',
    check( 'idU', 'No se encuentran usuarios registrados con ese ID' )
        .isMongoId(),
    validarCampos, actualizarUsuario,
)

router.delete( '/borrarUsuario/:idU',
    check( 'idU', 'No se encuentran usuarios registrados con ese ID' )
        .isMongoId(),
    validarCampos, borrarUsuario,
)

export { router }
