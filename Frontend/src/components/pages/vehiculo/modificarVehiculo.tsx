import React from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import vehiculoService from '../../services/vehiculoService'
import useVehiculos from '../../hooks/Vehiculo/useVehiculos'

const ModificarVehiculo = () => {
    const navigate: NavigateFunction = useNavigate()
    const params: string | any       = useParams()
    const { vehiculo, handleChange } = useVehiculos( params )

    const handleSubmit = async( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        vehiculoService.modificarVehiculo( params.id, vehiculo ).then( () => {
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
                                    Modificacion de datos
                                </h3>
                                <form className="form-horizontal"
                                    onSubmit={ handleSubmit }
                                >
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
                                                !vehiculo.seguroVehiculo ||
                                                !vehiculo.valorAlquilerDia }
                                        >Actualizar
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

export default ModificarVehiculo
