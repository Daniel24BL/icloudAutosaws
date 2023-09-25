'use strict'
const __createBinding = ( this && this.__createBinding ) || ( Object.create
    ? function( o, m, k, k2 ) {
        if ( k2 === undefined ) k2 = k
        let desc = Object.getOwnPropertyDescriptor( m, k )
        if ( !desc || ( 'get' in desc ? !m.__esModule : desc.writable || desc.configurable ) ) {
            desc = { enumerable: true, get: function() { return m[k] } }
        }
        Object.defineProperty( o, k2, desc )
    }
    : function( o, m, k, k2 ) {
        if ( k2 === undefined ) k2 = k
        o[k2] = m[k]
    } )
const __setModuleDefault = ( this && this.__setModuleDefault ) || ( Object.create
    ? function( o, v ) {
        Object.defineProperty( o, 'default', { enumerable: true, value: v } )
    }
    : function( o, v ) {
        o.default = v
    } )
const __importStar = ( this && this.__importStar ) || function( mod ) {
    if ( mod && mod.__esModule ) return mod
    const result = {}
    if ( mod != null ) for ( const k in mod ) if ( k !== 'default' && Object.prototype.hasOwnProperty.call( mod, k ) ) __createBinding( result, mod, k )
    __setModuleDefault( result, mod )
    return result
}
const __awaiter = ( this && this.__awaiter ) || function( thisArg, _arguments, P, generator ) {
    function adopt( value ) { return value instanceof P ? value : new P( function( resolve ) { resolve( value ) } ) }

    return new ( P || ( P = Promise ) )( function( resolve, reject ) {
        function fulfilled( value ) { try { step( generator.next( value ) ) } catch ( e ) { reject( e ) } }

        function rejected( value ) { try { step( generator.throw( value ) ) } catch ( e ) { reject( e ) } }

        function step( result ) { result.done ? resolve( result.value ) : adopt( result.value ).then( fulfilled, rejected ) }

        step( ( generator = generator.apply( thisArg, _arguments || [] ) ).next() )
    } )
}
const __rest = ( this && this.__rest ) || function( s, e ) {
    const t = {}
    for ( var p in s ) {
        if ( Object.prototype.hasOwnProperty.call( s, p ) && e.indexOf( p ) < 0 ) { t[p] = s[p] }
    }
    if ( s != null && typeof Object.getOwnPropertySymbols === 'function' ) {
        for ( var i = 0, p = Object.getOwnPropertySymbols( s ); i < p.length; i++ ) {
            if ( e.indexOf( p[i] ) < 0 && Object.prototype.propertyIsEnumerable.call( s, p[i] ) ) { t[p[i]] = s[p[i]] }
        }
    }
    return t
}
Object.defineProperty( exports, '__esModule', { value: true } )
exports.obtenerfotoVehiculosPorIDVehiculo = exports.borrarfotoVehiculo = exports.actualizarfotoVehiculo = exports.crearfotoVehiculo = exports.obtenerfotoVehiculo = exports.obtenerfotoVehiculos = void 0
const models_1 = require( '../models' )
const fs = __importStar( require( 'fs-extra' ) )
const path = __importStar( require( 'path' ) )
// Obtener todos las fotos de vehiculos
const obtenerfotoVehiculos = ( req, res ) => __awaiter( void 0, void 0, void 0, function * () {
    const { limite = '10', desde = '0' } = req.query
    const query = {
        estado: true,
    }
    try {
        const [total, fotoVehiculos] = yield Promise.all( [
            models_1.FotoVehiculo.countDocuments( query ),
            models_1.FotoVehiculo.find( query )
                .skip( Number( desde ) )
                .limit( Number( limite ) ),
        ] )
        fotoVehiculos.map( ( img ) => {
            return fs.writeFileSync( path.join( __dirname, '../uploads/uploads2/' ) + img._id +
                '-prueba.png', img.imagen )
        } )
        const imgPath = fs.readdirSync( path.join( __dirname, '../uploads/uploads2/' ) )
        console.log( fs.readdirSync( path.join( __dirname, '../uploads/uploads2/' ) ) )
        res.json( {
            total,
            // fotoVehiculos,
            imgPath,
        } )
    } catch ( error ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
} )
exports.obtenerfotoVehiculos = obtenerfotoVehiculos
// Obtener todos las fotos de vehiculos por ID vehiculo
const obtenerfotoVehiculosPorIDVehiculo = ( req, res ) => __awaiter( void 0, void 0, void 0, function * () {
    const { id } = req.params
    try {
        const resFotoVehiculo = yield models_1.FotoVehiculo.findOne( {
            vehiculo_ID: id,
        } )
        fs.writeFileSync( path.join( __dirname, '../uploads/uploads2/' ) +
            resFotoVehiculo._id +
            '-prueba.png', resFotoVehiculo.imagen )
        const imgPath = fs.readdirSync( path.join( __dirname, '../uploads/uploads2/' ) )
        console.log( fs.readdirSync( path.join( __dirname, '../uploads/uploads2/' ) ) )
        console.log( __dirname )
        resFotoVehiculo
            ? res.status( 200 ).json( { fotoVehiculo: imgPath } )
            : res.json( { message: 'Este vehiculo no tiene foto' } )
    } catch ( error ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
} )
exports.obtenerfotoVehiculosPorIDVehiculo = obtenerfotoVehiculosPorIDVehiculo
// Obtener la foto de un vehiculo por ID
const obtenerfotoVehiculo = ( req, res ) => __awaiter( void 0, void 0, void 0, function * () {
    const { id } = req.params
    try {
        const fotoVehiculo = yield models_1.FotoVehiculo.findById( id )
        fotoVehiculo
            ? res.json( { fotoVehiculo } )
            : res.json( { message: 'La Foto no ha sido encontrada' } )
    } catch ( error ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
} )
exports.obtenerfotoVehiculo = obtenerfotoVehiculo
// Crear nueva foto de vehiculo
const crearfotoVehiculo = ( req, res ) => __awaiter( void 0, void 0, void 0, function * () {
    const _a = req.body; const { imagen } = _a; const body = __rest( _a, ['imagen'] )
    if ( req.file ) {
        const img = fs.readFileSync( path.join( __dirname, '../uploads/' +
            req.file.filename ) )
        // const imgPath           = req.file.originalname
        // const imgSplit          = imgPath.split( '\\' )
        // const newImagen         = imgSplit[imgSplit.length - 1]
        const fotoVehiculoNuevo = Object.assign( { imagen: img }, body )
        console.log( fotoVehiculoNuevo )
        try {
            const fotoVehiculo = new models_1.FotoVehiculo( fotoVehiculoNuevo )
            yield fotoVehiculo.save()
            return res.json( {
                message: 'La Imagen se ha guardado Satisfactoriamente',
                fotoVehiculo,
            } )
        } catch ( error ) {
            return res.status( 500 ).json( {
                message: error.message,
            } )
        }
    } else {
        return res.json( { message: 'No se ha subido ninguna imagen' } )
    }
} )
exports.crearfotoVehiculo = crearfotoVehiculo
// Actualizar la foto de un vehiculo
const actualizarfotoVehiculo = ( req, res ) => __awaiter( void 0, void 0, void 0, function * () {
    const { idF } = req.params
    const { descripcion, vehiculo_ID } = req.body
    try {
        const actualizarfotoVehiculo = yield models_1.FotoVehiculo.findByIdAndUpdate( idF, {
            descripcion,
            vehiculo_ID,
        } )
        actualizarfotoVehiculo
            ? res.json( {
                message     : 'La Foto ha sido actualizada',
                fotoVehiculo: actualizarfotoVehiculo,
            } )
            : res.json( { message: 'La Foto no ha sido encontrada' } )
    } catch ( error ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
} )
exports.actualizarfotoVehiculo = actualizarfotoVehiculo
// Borrar la foto de un vehiculo
const borrarfotoVehiculo = ( req, res ) => __awaiter( void 0, void 0, void 0, function * () {
    const { id } = req.params
    try {
        const fotoVehiculo = yield models_1.FotoVehiculo.findByIdAndDelete( id ).lean()
        if ( fotoVehiculo ) {
            const existe = yield fs.pathExists( path.resolve( fotoVehiculo.imagen ) )
            if ( existe ) {
                yield fs.unlink( path.resolve( fotoVehiculo.imagen ) )
            }
        } else {
            return res.json( { message: 'La Foto no ha sido encontrada' } )
        }
        return res.json( { message: 'La Foto ha sido eliminada', fotoVehiculo } )
    } catch ( error ) {
        return res.status( 500 ).json( {
            message: error.message,
        } )
    }
} )
exports.borrarfotoVehiculo = borrarfotoVehiculo
