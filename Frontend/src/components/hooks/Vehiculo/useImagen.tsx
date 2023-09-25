import { useState, ChangeEvent } from "react"

const useImagen=()=>{
    const [imagen, setImagen] = useState( {
        imagen     : '',
        descripcion: '',
        vehiculo_ID: '',
    } )
    const [file, setFile] = useState( null )

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        setImagen( {
            ...imagen,
            [e.target.name]: e.target.value,
        } )
    }

    const handleChangeFile = ( e: ChangeEvent<HTMLInputElement | any> ) => {
        setFile( e.target.files[0] )
    }

    return {
        imagen,
        file,
        handleChange,
        handleChangeFile,
    }
}

export default useImagen
