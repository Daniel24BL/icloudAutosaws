import { ChangeEvent, useEffect, useState } from 'react'
import vehiculoService from '../../services/vehiculoService'

const useVehiculos = ( params: any ) => {
    const [vehiculo, setVehiculo] = useState( {
        seguroVehiculo  : '',
        valorAlquilerDia: 0,
        usuario_ID      : '',
    } )

    useEffect( () => {
        getVehiculo()
    }, [] )

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        setVehiculo( {
            ...vehiculo,
            [e.target.name]: e.target.value,
        } )
    }

    const getVehiculo = () => {
        vehiculoService.getVehiculosById( params.id )
            .then( ( { vehiculo } ) => {
                setVehiculo( vehiculo )
            } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    return {
        vehiculo,
        handleChange,
    }
}

export default useVehiculos
