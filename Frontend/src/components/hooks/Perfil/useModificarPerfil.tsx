import { ChangeEvent, useEffect, useState } from 'react'
import usuarioService from '../../services/usuarioService'

const useModificarPerfil = ( params: any, navigate: any ) => {
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
        if ( params.id ) {
            usuarioService.getUsuarioById( params.id )
                .then( ( { usuario } ) => {
                    setData( usuario )
                } )
                .catch( ( error: Error | any ) => {
                    console.log( error.response.data )
                } )
        } else {
            navigate( '/' )
        }
    }

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        setData( {
            ...data,
            [e.target.name]: e.target.value,
        } )
    }

    useEffect( () => {
        if ( params.id ) {
            getUsuario()
        }
    }, [params.id] )

    return {
        data,
        handleChange,
    }
}

export default useModificarPerfil
