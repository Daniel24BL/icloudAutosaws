import axios from 'axios'

const url = import.meta.env.VITE_URI

const httpAxios = axios.create( {
    baseURL: url,
} )

class AgenciaService {
    getAgencias = () => {
        return httpAxios
            .get( 'agencias' )
            .then( ( { data } ) => {
                return data
            } )
    }
}

export default new AgenciaService()
