import React from 'react'
import ListaVehiculos from './listaVehiculos'
import useVehiculo from '../../hooks/Vehiculo/useVehiculo'
import { useNavigate } from 'react-router-dom';

const Vehiculo = () => {
    const navigate = useNavigate()
    const { vehiculos, handleDeleteVehiculo } = useVehiculo()

    return (
        <>
            <div className="text-end">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate('registrar')}
                >Registrar Vehiculo
                </button>
            </div>
            <h1 className="text-center">Mis Vehiculos</h1>
            {
                vehiculos.length === 0
                    ? (
                        <div className="container">
                            <h2 className="text-center">No hay vehiculos</h2>
                        </div>
                    )
                    : (
                        <div
                            className="d-flex flex-column justify-content-center align-items-center">
                            {
                                vehiculos.map( vehiculo =>
                                    (
                                        <ListaVehiculos
                                            key={ vehiculo._id }
                                            vehiculo={ vehiculo }
                                            funcion={ () => handleDeleteVehiculo(
                                                vehiculo._id ) }
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

export default Vehiculo
