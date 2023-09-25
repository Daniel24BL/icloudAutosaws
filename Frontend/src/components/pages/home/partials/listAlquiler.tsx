import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import useFoto from '../../../hooks/Vehiculo/useFoto'

const Card = ( props: any ) => {
    return (
        <div className="d-flex">
            <h5 className="card-title">
                { props.nombre }
            </h5>
            <p className="card-text ps-3">
                { props.datos }
            </p>
        </div>
    )
}

const Imagen = ( props: any ) => {
    return (
        <div
            className="d-flex justify-content-lg-center align-items-center pt-5">
            <img src={ props.imagen } alt="imagen" className="img-fluid"/>
        </div>
    )
}

const ListAlquiler = ( { vehiculo }: any ) => {
    const navigate: NavigateFunction = useNavigate()
    const { foto }                   = useFoto( vehiculo )

    return (
        <>
            <div
                className="card m-3 w-50"
            >
                <div className="d-flex flex-row flex-fill">
                    <div className="w-50">
                        {
                            foto === undefined || foto === null
                                ? (

                                    <Imagen
                                        imagen={ 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/2048px-Imagen_no_disponible.svg.png' }
                                    />
                                )
                                : (
                                    <Imagen
                                        imagen={ `${import.meta.env.VITE_URI_FOTO}${foto.imagen}` }
                                    />
                                )
                        }
                    </div>
                    <div>
                        <div className="card-body">

                            <Card
                                nombre={ 'Marca del Vehiculo:' }
                                datos={ vehiculo.marcaVehiculo }/>
                            <Card
                                nombre={ 'Modelo del Vehiculo:' }
                                datos={ vehiculo.modeloVehiculo }/>
                            <Card
                                nombre={ 'Tipo de Vehiculo:' }
                                datos={ vehiculo.tipoVehiculo }/>
                            <Card
                                nombre={ 'Seguro del Vehiculo:' }
                                datos={ vehiculo.seguroVehiculo }/>
                            <Card
                                nombre={ 'Valor de Alquiler por Dia:' }
                                datos={ vehiculo.valorAlquilerDia }/>
                        </div>
                        <div className="text-center m-3">
                            <div className="btn-group ms-3">
                                <a
                                    onClick={ () => navigate( `/alquiler/${vehiculo._id}` ) }
                                    className="btn btn-primary"
                                >Alquilar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListAlquiler
