import { useEffect, useState } from 'react'
import alquilerService from '../../services/alquilerService'

const useAlquiler = () => {
    const id                          = JSON.parse(
        window.localStorage.getItem( 'user' ) || '{}' )
    const [alquileres, setAlquileres] = useState( [] as any[] )

    useEffect( () => {
        if ( id ) {
            getAlquilerByUserId()
        }
    }, [] )

    const getAlquilerByUserId = () => {
        alquilerService.getAlquilerByUserId( id ).then( ( { alquiler } ) => {
            setAlquileres( alquiler )
        } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    const handleDeleteAlquiler = ( id: string ) => {
        alquilerService.deleteAlquiler( id )
            .then( () => {
                setAlquileres( alquileres.filter( alquiler => alquiler._id !==
                id ) )
            } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    return {
        alquileres,
        handleDeleteAlquiler,
    }
}

export default useAlquiler
