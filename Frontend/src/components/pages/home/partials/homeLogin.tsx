import React from 'react'
import imgInicial from '../../../../assets/ImgInicial.jpeg'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Center } from '@chakra-ui/react'

const HomeLogin = () => {
    const navigate: NavigateFunction = useNavigate()
    return (
        <div className="container">
            <div>
                <div className="d-flex flex-row">
                    <div className="ps-2">
                        <img src={ imgInicial }
                            alt="Imagen Inicial"
                            height={ 400 } width={ 700 }/>
                    </div>
                    <div className="p-5">
                        <h2 className="text-primary"> <Center>Cars
                            Rental</Center> </h2>
                            <br />
                        <h3>Lo Mejor en Alquiler de
                            Vehiculos</h3>
                        <p> 
                            El mejor servicio de alquiler de
                            Vehículos:
                            busca,
                            compara y ahorra.
                            <br />
                            ¿Deseas conseguir dinero extra?,
                            también
                            puedes
                            poner en alquiler
                            tu vehículo de forma segura.
                        </p>
                        <div className="text-center mt-5">
                            <button
                                className="alert-primary btn btn-lg btn-secondary fw-bold border-white bg-white"
                                onClick={ () => {
                                    navigate( '/iniciar-sesion' )
                                } }
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeLogin
