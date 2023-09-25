import { ChangeEvent, useState } from 'react'

const useFormVehiculo = () => {
    const id = JSON.parse( localStorage.getItem( 'user' ) || '{}' )
    const [vehiculo, setVehiculo] = useState( {
        placaVehiculo    : '',
        marcaVehiculo    : '',
        modeloVehiculo   : '',
        tipoVehiculo     : '',
        matriculaVehiculo: '',
        seguroVehiculo   : '',
        valorAlquilerDia : 0,
        usuario_ID       : '',
    } )

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        setVehiculo( {
            ...vehiculo,
            [e.target.name]: e.target.value,
        } )
    }

    return {
        vehiculo,
        handleChange,
        id,
    }
}

export default useFormVehiculo
