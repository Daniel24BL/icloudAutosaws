import { ChangeEvent, useEffect, useState } from 'react'
import agenciaService from '../../services/agenciaService'

const useAlquilerAuto = () => {
    const [agencia, setAgencia]   = useState( [] as any[] )
    const [alquiler, setAlquiler] = useState( {
        agencia_ID    : '',
        usuario_ID    : '',
        vehiculo_ID   : '',
        diasAlquiler  : 0,
        inicioAlquiler: '',
        finAlquiler   : '',
        pagoAbono     : 0,
        garantia      : '',
    } )

    useEffect( () => {
        getAgencias()
    }, [] )

    const getAgencias = () => {
        agenciaService.getAgencias()
            .then( ( { agencias } ) => {
                setAgencia( agencias )
            } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    const handleChange = ( e: ChangeEvent<HTMLInputElement | any> ) => {
        setAlquiler( {
            ...alquiler,
            [e.target.name]: e.target.value,
        } )
    }

    return {
        agencia,
        alquiler,
        handleChange,
    }
}

export default useAlquilerAuto
