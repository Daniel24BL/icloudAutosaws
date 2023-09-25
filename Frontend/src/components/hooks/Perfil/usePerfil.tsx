import { useEffect, useState } from 'react'
import usuarioService from '../../services/usuarioService'

const usePerfil = () => {
    const id              = JSON.parse(
        window.localStorage.getItem( 'user' ) || '{}' )
    const [data, setData] = useState( {
        cedulaUsuario    : '',
        nombreUsuario    : '',
        apellidoUsuario  : '',
        telefonoUsuario  : '',
        emailUsuario     : '',
        contrasenaUsuario: '',
        ciudadResidencia : '',
        estado           : true,
    } )

    const getUsuario = () => {
        usuarioService.getUsuarioById( id )
            .then( ( { usuario } ) => {
                setData( usuario )
            } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    useEffect( () => {
        if ( id ) {
            getUsuario()
        }
    }, [] )

    return {
        data,
        id,
    }
}

export default usePerfil
