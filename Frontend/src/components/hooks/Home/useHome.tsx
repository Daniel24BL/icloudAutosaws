import { useEffect, useState } from 'react'
import vehiculoService from '../../services/vehiculoService'

const useHome = () => {
    const [vehiculos, setVehiculos] = useState( [] as any[] )

    useEffect( () => {
        getVehiculos()
    }, [] )

    const getVehiculos = () => {
        vehiculoService.getVehiculos()
            .then( ( { vehiculos } ) => {
                setVehiculos( vehiculos )
            } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    return {
        vehiculos,
    }
}

export default useHome
