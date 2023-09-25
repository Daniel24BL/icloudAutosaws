import { useEffect, useState } from 'react'
import vehiculoFotoService from '../../services/vehiculoFotoService'

const useFoto = ( vehiculos: any ) => {
    const [foto, setFoto] = useState( {} as any )

    useEffect( () => {
        getFoto()
    }, [] )

    const getFoto = () => {
        vehiculoFotoService.getVehiculoFotosById( vehiculos._id )
            .then( ( { fotoVehiculo } ) => {
                setFoto( fotoVehiculo )
            } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    return {
        foto,
    }
}

export default useFoto
