import React from 'react'
import { format } from 'date-fns'

const CardFechas = ( { nombre, datos }: any ) => {
    return (
        <div className="d-flex">
            <h5 className="card-title">
                { nombre }
            </h5>
            <p className="card-text ps-3">
                {
                    format(
                        new Date( datos ),
                        'dd MMMM, yyyy',
                    )
                }
            </p>
        </div>
    )
}

const Card = ( { nombre, datos }: any ) => {
    return (
        <div className="d-flex">
            <h5 className="card-title">
                { nombre }
            </h5>
            <p className="card-text ps-3">
                { datos }
            </p>
        </div>
    )
}

const ListAlquiler = ( { alquiler, funcion }: any ) => {
    return (
        <div
            className="card m-3"
            style={ { width: '28rem' } }
        >
            <div className="card-body">
                <CardFechas
                    nombre={ 'Fecha de Inicio:' }
                    datos={ alquiler.inicioAlquiler }/>
                <CardFechas
                    nombre={ 'Fecha de Fin:' }
                    datos={ alquiler.finAlquiler }/>
                <Card
                    nombre={ 'Marca del Vehiculo:' }
                    datos={ alquiler.vehiculo_ID.marcaVehiculo }/>
                <Card
                    nombre={ 'Modelo del Vehiculo:' }
                    datos={ alquiler.vehiculo_ID.modeloVehiculo }/>
                <Card nombre={ 'Tipo de Vehiculo:' }
                    datos={ alquiler.vehiculo_ID.tipoVehiculo }/>
                <Card nombre={ 'Pago de Abono:' }
                    datos={ alquiler.pagoAbono }/>
                <Card nombre={ 'Garantia:' }
                    datos={ alquiler.garantia }/>
                <div className="text-center mt-3">
                    <a href="#"
                        onClick={ funcion }
                        className="btn btn-primary"
                    >Eliminar
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ListAlquiler
