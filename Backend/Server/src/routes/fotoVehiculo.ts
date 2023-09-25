import { Router } from 'express'
import { check } from 'express-validator'

import upload from '../libs/multers'

import { FotoVehiculo } from '../controllers'
import funciones from '../middlewares'
import { obtenerfotoVehiculosPorIDVehiculo } from '../controllers/fotoVehiculo'

const {
    obtenerfotoVehiculos,
    obtenerfotoVehiculo,
    crearfotoVehiculo,
    actualizarfotoVehiculo,
    borrarfotoVehiculo,
} = FotoVehiculo

const { validarCampos } = funciones

const router = Router()

router.get( '/', obtenerfotoVehiculos )

router.get(
    '/:id',
    check( 'id', 'El ID de Mongo no es Valido' ).isMongoId(),
    validarCampos,
    obtenerfotoVehiculo,
)

router.post( '/', upload.single( 'imagen' ), validarCampos, crearfotoVehiculo )

router.put(
    '/:idF',
    check( 'idF', 'La fotoVehiculo con ese ID no esta registrada' ).isMongoId(),
    validarCampos,
    actualizarfotoVehiculo,
)

router.delete(
    '/:id',
    check( 'id', 'La fotoVehiculo con ese ID no esta registrada' ).isMongoId(),
    validarCampos,
    borrarfotoVehiculo,
)

router.get( '/obtenerFoto/:id', obtenerfotoVehiculosPorIDVehiculo )

export { router }
