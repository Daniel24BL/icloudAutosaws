import React, { ChangeEvent } from 'react'
import authService from '../../services/authService'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import useRegister from '../../hooks/Auth/useRegister'

const Register = () => {
    const navigate: NavigateFunction = useNavigate()
    const { data, handleChange }     = useRegister()

    const handleSubmit = async( e: ChangeEvent<HTMLFormElement> ) => {
        e.preventDefault()
        authService.registerUsuario( data )
            .then( () => {
                navigate( '/iniciar-sesion' )
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
                                    Registrarse
                                </h3>
                                <form className="form-horizontal"
                                    onSubmit={ handleSubmit }>
                                    <div className="row">
                                        <div className="col-3">
                                            <label
                                                htmlFor="cedula">Cedula</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cedulaUsuario"
                                                placeholder="Ingrese un cedula"
                                                onChange={ handleChange }
                                                name="cedulaUsuario"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="nombre">Nombre</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nombreUsuario"
                                                placeholder="Ingrese sus nombres"
                                                onChange={ handleChange }
                                                name="nombreUsuario"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="apellido">Apellido</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="apellidoUsuario"
                                                placeholder="Ingrese sus apelidos"
                                                onChange={ handleChange }
                                                name="apellidoUsuario"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="telefono">Telefono</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="telefonoUsuario"
                                                placeholder="Ingrese su telefono"
                                                onChange={ handleChange }
                                                name="telefonoUsuario"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="correo">Correo</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="emailUsuario"
                                                placeholder="Ingrese un correo"
                                                onChange={ handleChange }
                                                name="emailUsuario"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="contrasena">Contraseña</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="contrasenaUsuario"
                                                placeholder="Ingrese una contraseña"
                                                onChange={ handleChange }
                                                name="contrasenaUsuario"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="ciudad">Ciudad</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="ciudadResidencia"
                                                placeholder="Ingrese su ciudad"
                                                onChange={ handleChange }
                                                name="ciudadResidencia"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button
                                            type="submit"
                                            className="alert-primary btn btn-lg btn-secondary fw-bold border-white bg-white m-2"
                                            disabled={ !data.apellidoUsuario ||
                                                !data.nombreUsuario ||
                                                !data.cedulaUsuario ||
                                                !data.emailUsuario ||
                                                !data.telefonoUsuario ||
                                                !data.ciudadResidencia ||
                                                !data.contrasenaUsuario }
                                        >Registrarse
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

export default Register
