import React from 'react'
import ListAlquiler from './listAlquiler'
import useAlquiler from '../../hooks/Alquiler/useAlquiler'

const Alquiler = () => {
    const { alquileres, handleDeleteAlquiler } = useAlquiler()

    return (
        <>
            <h1 className="text-center">Alquileres Realizados</h1>
            {
                alquileres.length === 0
                    ? (
                        <div className="container">
                            <h2 className="text-center">No hay alquileres</h2>
                        </div>
                    )
                    : (
                        <div
                            className=" d-flex flex-row justify-content-center align-items-center flex-wrap">
                            {
                                alquileres.map((alquiler: any) =>
                                (
                                    <ListAlquiler
                                        key={alquiler._id}
                                        alquiler={alquiler}
                                        funcion={() => handleDeleteAlquiler(
                                            alquiler._id)}
                                    />
                                ),
                                )
                            }
                        </div>
                    )
            }
        </>
    )
}

export default Alquiler
