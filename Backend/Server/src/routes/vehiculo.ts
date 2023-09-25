import { Router } from 'express'
import { check } from 'express-validator'

import { Vehiculo } from '../controllers'
import funciones from '../middlewares'

const {
    obtenerVehiculos,
    obtenerVehiculo,
    obtenerVehiculoIdUsuario,
    crearVehiculo,
    actualizarVehiculo,
    borrarVehiculo,
} = Vehiculo

const { validarCampos } = funciones

const router = Router()

router.get( '/', obtenerVehiculos )

router.get( '/obtenerVehiculo/:id',
    check( 'id', 'El ID de Mongo no es Valido' ).isMongoId(),
    validarCampos, obtenerVehiculo )

router.get( '/obtenerVehiculoIdUsuario/:idU',
    check( 'idU', 'El Id de usuario ingresado no esta registrado' ).isMongoId(),
    validarCampos, obtenerVehiculoIdUsuario )

router.post( '/crearVehiculo',
    check( 'placaVehiculo', 'La Placa del Vehiculo es Obligatoria' ).not().isEmpty(),
    validarCampos, crearVehiculo )

router.put( '/actualizarVehiculo/:idV',
    check( 'idV', 'El Vehiculo con ese ID no esta registrado' ).isMongoId(),
    validarCampos, actualizarVehiculo )

router.delete( '/borrarVehiculo/:idV',
    check( 'idV', 'El Vehiculo con ese ID no esta registrado' ).isMongoId(),
    validarCampos, borrarVehiculo )

export { router }
