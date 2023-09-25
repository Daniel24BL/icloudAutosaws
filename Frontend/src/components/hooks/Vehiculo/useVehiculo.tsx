import { useEffect, useState } from 'react'
import vehiculoService from '../../services/vehiculoService'

const useVehiculo = () => {
    const id                        = JSON.parse(
        window.localStorage.getItem( 'user' ) || '{}' )
    const [vehiculos, setVehiculos] = useState( [] as any[] )

    useEffect( () => {
        if ( id ) {
            getVehiculos()
        }
    }, [] )

    const getVehiculos = () => {
        vehiculoService.getVehiculosByIdUser( id )
            .then( ( { vehiculo } ) => {
                setVehiculos( vehiculo )
            } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    const handleDeleteVehiculo = ( id: string ) => {
        vehiculoService.eliminarVehiculo( id )
            .then( () => {
                setVehiculos( vehiculos.filter( vehiculo => vehiculo._id !== id ) )
            } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    return {
        vehiculos,
        handleDeleteVehiculo,
    }
}

export default useVehiculo
