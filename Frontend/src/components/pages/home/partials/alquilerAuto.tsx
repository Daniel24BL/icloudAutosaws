import React, { FormEvent } from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import alquilerService from '../../../services/alquilerService'
import useAlquilerAuto from '../../../hooks/Alquiler/useAlquilerAuto'

const AlquilerAuto = () => {
    const navigate: NavigateFunction          = useNavigate()
    const id                                  = JSON.parse(
        window.localStorage.getItem( 'user' ) || '{}' )
    const params                              = useParams()
    const { agencia, alquiler, handleChange } = useAlquilerAuto()

    const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        const { usuario_ID, vehiculo_ID, ...alquilers } = alquiler

        const data = {
            usuario_ID : id,
            vehiculo_ID: params.id,
            ...alquilers,
        }
        alquilerService.postAlquiler( data )
            .then( () => {
                navigate( '/' )
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
                                    Alquiler de autos
                                </h3>
                                <form className="form-horizontal"
                                    onSubmit={ handleSubmit }
                                >
                                    <div className="row">
                                        <div className="col-3">
                                            <label
                                                htmlFor="agencia_ID">Ciudad</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <select
                                                defaultValue="0"
                                                className="form-select"
                                                id="agencia_ID"
                                                name="agencia_ID"
                                                onChange={ handleChange }
                                            >
                                                <option>Seleccione una
                                                    opción
                                                </option>
                                                <option value="Manta">Manta</option>
                                                <option value="Portoviejo">Portoviejo</option>
                                                <option value="Montecristi">Montecristi</option>

                                                {
                                                    agencia.map( agencia => {
                                                        return (
                                                            <option
                                                                key={ agencia._id }
                                                                value={ agencia._id }
                                                            >{ agencia.ciudadUbicacion }
                                                            </option>
                                                        )
                                                    } )

                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="diasAlquiler">Dias de Alquiler</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="diasAlquiler"
                                                placeholder="Ingrese dias de alquiler"
                                                onChange={ handleChange }
                                                name="diasAlquiler"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="inicioAlquiler">Inicio de Alquiler</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="inicioAlquiler"
                                                placeholder="Ingrese fecha de inicio de alquiler"
                                                onChange={ handleChange }
                                                name="inicioAlquiler"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="finAlquiler">Fin de Alquiler</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                min={ Date.now() }
                                                max={ Date.now() +
                                                    ( 1000 * 60 * 60 * 24 * 30
                                                    ) }
                                                type="date"
                                                className="form-control"
                                                id="finAlquiler"
                                                placeholder="Ingrese fecha de fin de alquiler"
                                                onChange={ handleChange }
                                                name="finAlquiler"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="pagoAbono">Pago de Abono</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="pagoAbono"
                                                placeholder="Ingrese pago de abono"
                                                onChange={ handleChange }
                                                name="pagoAbono"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="garantia">Garantia</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="garantia"
                                                placeholder="Ingrese garantia"
                                                onChange={ handleChange }
                                                name="garantia"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button
                                            type="submit"
                                            className="alert-primary btn btn-lg btn-secondary fw-bold border-white bg-white m-2"
                                            disabled={
                                                !alquiler.agencia_ID ||
                                                !alquiler.diasAlquiler ||
                                                !alquiler.inicioAlquiler ||
                                                !alquiler.finAlquiler ||
                                                !alquiler.pagoAbono ||
                                                !alquiler.garantia
                                            }
                                        >Alquilar
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

export default AlquilerAuto
