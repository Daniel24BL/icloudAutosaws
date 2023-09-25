import React, { FormEvent } from 'react'
import vehiculoService from '../../services/vehiculoService'
import { useNavigate } from 'react-router-dom'
import useFormVehiculo from '../../hooks/Vehiculo/useFormVehiculo'

const formVehiculo = () => {
    const navigate = useNavigate()
    const { vehiculo, handleChange, id } = useFormVehiculo()

    const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        const { usuario_ID, ...datos } = vehiculo
        const data = {
            usuario_ID: id,
            ...datos,
        }
        vehiculoService.postVehiculo( data )
            .then( ( res ) => {
                console.log( res )
                navigate( -1 )
            } )
            .catch( ( error: Error | any ) => {
                console.log( error.response.data )
            } )
    }

    return (
        <section className="h-100 h-custom">
            <div className="container py-5 h-100">
                <div
                    className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <h3
                                    className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center">
                                    Registrar Vehiculo
                                </h3>
                                <form className="form-horizontal"
                                    onSubmit={ handleSubmit }
                                >
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="placaVehiculo">Placa del Vehiculo</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="placaVehiculo"
                                                placeholder="Ingrese la placa del vehiculo"
                                                onChange={ handleChange }
                                                value={ vehiculo.placaVehiculo }
                                                name="placaVehiculo"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="marcaVehiculo">Marca del Vehiculo</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="marcaVehiculo"
                                                placeholder="Ingrese la marca del vehiculo"
                                                onChange={ handleChange }
                                                value={ vehiculo.marcaVehiculo }
                                                name="marcaVehiculo"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="modeloVehiculo">Modelo del Vehiculo</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="modeloVehiculo"
                                                placeholder="Ingrese el modelo del vehiculo"
                                                onChange={ handleChange }
                                                value={ vehiculo.modeloVehiculo }
                                                name="modeloVehiculo"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="tipoVehiculo">Tipo de Vehiculo</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tipoVehiculo"
                                                placeholder="Ingrese el tipo del vehiculo"
                                                onChange={ handleChange }
                                                value={ vehiculo.tipoVehiculo }
                                                name="tipoVehiculo"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="matriculaVehiculo">Matricula del Vehiculo</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="matriculaVehiculo"
                                                placeholder="Ingrese la matricula del vehiculo"
                                                onChange={ handleChange }
                                                value={ vehiculo.matriculaVehiculo }
                                                name="matriculaVehiculo"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="seguroVehiculo">Seguro
                                                Vehiculo</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="seguroVehiculo"
                                                placeholder="Ingrese el seguro del Vehiculo"
                                                onChange={ handleChange }
                                                value={ vehiculo.seguroVehiculo }
                                                name="seguroVehiculo"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="valorAlquilerDia">Valor
                                                Alquiler por Dia</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="valorAlquilerDia"
                                                placeholder="Ingrese el valor del alquiler por dia"
                                                onChange={ handleChange }
                                                value={ vehiculo.valorAlquilerDia }
                                                name="valorAlquilerDia"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button
                                            type="submit"
                                            className="alert-primary btn btn-lg btn-secondary fw-bold border-white bg-white m-2"
                                            disabled={
                                                !vehiculo.placaVehiculo ||
                                                !vehiculo.marcaVehiculo ||
                                                !vehiculo.modeloVehiculo ||
                                                !vehiculo.tipoVehiculo ||
                                                !vehiculo.matriculaVehiculo ||
                                                !vehiculo.seguroVehiculo ||
                                                !vehiculo.valorAlquilerDia
                                            }
                                        >Registar Vehiculo
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default formVehiculo
