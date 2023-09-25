import axios from 'axios'

const url = import.meta.env.VITE_URI

const httpAxios = axios.create( {
    baseURL: url,
} )

class VehiculoFotoService {
    getVehiculoFotosById( id: string ) {
        return httpAxios
            .get( `fotovehiculos/obtenerFoto/${id}` )
            .then( ( { data } ) => {
                return data
            } )
    }

    postVehiculoFotos( data: any ) {
        const { imagen, descripcion, vehiculo_ID } = data
        const formData = new FormData()
        formData.append( 'imagen', imagen )
        formData.append( 'descripcion', descripcion )
        formData.append( 'vehiculo_ID', vehiculo_ID )
        return httpAxios
            .post( 'fotoVehiculos', formData )
            .then( ( { data } ) => {
                return data
            } )
    }
}

export default new VehiculoFotoService()
