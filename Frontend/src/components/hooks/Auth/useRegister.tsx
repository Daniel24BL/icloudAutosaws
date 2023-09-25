import { ChangeEvent, useState } from 'react'

const useRegister = () => {
    const [data, setData] = useState( {
        cedulaUsuario    : '',
        nombreUsuario    : '',
        apellidoUsuario  : '',
        telefonoUsuario  : '',
        emailUsuario     : '',
        contrasenaUsuario: '',
        ciudadResidencia : '',
        estado           : true,
    } )

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        setData( {
            ...data,
            [e.target.name]: e.target.value,
        } )
    }

    return {
        data,
        handleChange,
    }
}

export default useRegister
