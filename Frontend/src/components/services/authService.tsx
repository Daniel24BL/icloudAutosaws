import axios from 'axios'
import { IUsuario } from '../models/IUsuario'

const url = import.meta.env.VITE_URI

const httpAxios = axios.create( {
    baseURL: url,
} )

class AuthService {
    loginUsuario( correo: string, contrasena: string ) {
        return httpAxios
            .post( 'usuarios/loginUsuario', {
                emailUsuario     : correo,
                contrasenaUsuario: contrasena,
            } )
            .then( ( { data } ) => {
                return data
            } )
    }

    registerUsuario( datos: IUsuario ) {
        return httpAxios
            .post( 'usuarios/crearUsuario', datos )
            .then( ( { data } ) => {
                return data
            } )
    }
}

export default new AuthService()
