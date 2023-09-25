import React from 'react'
import ListAlquiler from './listAlquiler'
import useHome from '../../../hooks/Home/useHome'

const HomeAlquiler = () => {
    const { vehiculos } = useHome()
    return (
        <>
            <div
                className="d-flex flex-column justify-content-center align-items-center">
                {
                    vehiculos.map( vehiculo => {
                        return (
                            <ListAlquiler key={ vehiculo._id }
                                vehiculo={ vehiculo }
                            />
                        )
                    } )
                }
            </div>
        </>
    )
}

export default HomeAlquiler
