import { ChangeEvent, useState } from 'react'

const useUser = () => {
    const [usuario, setUsuario] = useState( {
        correo    : '',
        contrasena: '',
    } )

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        setUsuario( {
            ...usuario,
            [e.target.name]: e.target.value,
        } )
    }

    return {
        usuario,
        handleChange,
    }
}

export {
    useUser,
}
