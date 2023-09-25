import { Router } from 'express'
import { check } from 'express-validator'

import { Agencia } from '../controllers'
import funciones from '../middlewares'

const {
    obtenerAgencias,
    obtenerAgencia,
    crearAgencia,
    actualizarAgencia,
    borrarAgencia,
} = Agencia

const { validarCampos } = funciones

const router = Router()

router.get( '/', obtenerAgencias )

router.get( '/obtenerAgencia/:id',
    check( 'id', 'El ID de Mongo no es Valido' ).isMongoId(),
    validarCampos, obtenerAgencia,
)

router.post(
    '/crearAgencia',
    check( 'usuario_ID', 'El ID de Mongo no es Valido' ).isMongoId(),
    validarCampos,
    crearAgencia,
)

router.put( '/actualizarAgencia/:idA',
    check( 'idA', 'La agencia con el ID no esta registrada' ).isMongoId(),
    validarCampos, actualizarAgencia,
)

router.delete( '/borrarAgencia/:idA',
    check( 'idA', 'La agencia con el ID no esta registrada' )
        .isMongoId(),
    validarCampos, borrarAgencia,
)

export { router }
