import { Router } from 'express'
import { check } from 'express-validator'

import { Alquiler } from '../controllers'
import funciones from '../middlewares'
import { obtenerAlquilerPorUsuario } from '../controllers/alquiler'

const {
    obtenerAlquileres,
    obtenerAlquiler,
    crearAlquiler,
    actualizarAlquiler,
    borrarAlquiler,
} = Alquiler

const { validarCampos } = funciones

const router = Router()

router.get( '/', obtenerAlquileres )

router.get( '/obtenerAlquiler/:id',
    check( 'id', 'El ID de Mongo no es Valido' ).isMongoId(),
    validarCampos, obtenerAlquiler,
)

router.get( '/obtenerAlquilerPorUsuario/:idU', obtenerAlquilerPorUsuario )

router.post(
    '/crearAlquiler',
    check( 'agencia_ID', 'El ID de Mongo no es Valido' ).isMongoId(),
    validarCampos,
    crearAlquiler,
)

router.put( '/actualizarAlquiler/:idA',
    check( 'idA', 'El Alquiler con ese ID no se encuentra registrado' )
        .isMongoId(),
    validarCampos, actualizarAlquiler,
)

router.delete( '/borrarAlquiler/:idA',
    check( 'idA', 'El Alquiler con ese ID no esta registrado' )
        .isMongoId(),
    validarCampos, borrarAlquiler,
)

export { router }
