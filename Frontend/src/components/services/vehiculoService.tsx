import axios from 'axios'

const url = import.meta.env.VITE_URI

const httpAxios = axios.create( {
    baseURL: url,
} )

class VehiculoService {
    getVehiculosByIdUser( id: string ) {
        return httpAxios
            .get( `vehiculos/obtenerVehiculoIdUsuario/${id}` )
            .then( ( { data } ) => {
                return data
            } )
    }

    getVehiculosById( id: string ) {
        return httpAxios
            .get( `vehiculos/obtenerVehiculo/${id}` )
            .then( ( { data } ) => {
                return data
            } )
    }

    getVehiculos() {
        return httpAxios
            .get( 'vehiculos/' )
            .then( ( { data } ) => {
                return data
            } )
    }

    modificarVehiculo( id: string, vehiculo: any ) {
        return httpAxios
            .put( `vehiculos/actualizarVehiculo/${id}`, vehiculo )
            .then( ( { data } ) => {
                return data
            } )
    }

    eliminarVehiculo( id: string ) {
        return httpAxios
            .delete( `vehiculos/borrarVehiculo/${id}` )
            .then( ( { data } ) => {
                return data
            } )
    }

    postVehiculo( vehiculo: any ) {
        return httpAxios
            .post( 'vehiculos/crearVehiculo', vehiculo )
            .then( ( { data } ) => {
                return data
            } )
    }
}

export default new VehiculoService()
