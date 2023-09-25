import axios from 'axios'

const url = import.meta.env.VITE_URI

const httpAxios = axios.create( {
    baseURL: url,
} )

class AlquilerService {
    getAlquilerByUserId( id: string ) {
        return httpAxios
            .get( `alquileres/obtenerAlquilerPorUsuario/${id}` )
            .then( ( { data } ) => {
                return data
            } )
    }

    deleteAlquiler( id: string ) {
        return httpAxios
            .delete( `alquileres/borrarAlquiler/${id}` )
            .then( ( { data } ) => {
                return data
            } )
    }

    postAlquiler( alquiler: any ) {
        return httpAxios
            .post( 'alquileres/crearAlquiler', alquiler )
            .then( ( { data } ) => {
                return data
            } )
    }
}

export default new AlquilerService()
