import axios from 'axios'
import { IUsuario } from '../models/IUsuario'

const url = import.meta.env.VITE_URI

const httpAxios = axios.create( {
    baseURL: url,
} )

class UsuarioService {
    getUsuarioById( id: string | undefined ) {
        return httpAxios
            .get( `usuarios/obtenerUsuario/${id}` )
            .then( ( { data } ) => {
                return data
            } )
    }

    updateUsuario( id: string | undefined, datos: IUsuario ) {
        return httpAxios
            .put( `usuarios/actualizarUsuario/${id}`, datos )
            .then( ( { data } ) => {
                return data
            } )
    }
}

export default new UsuarioService()
