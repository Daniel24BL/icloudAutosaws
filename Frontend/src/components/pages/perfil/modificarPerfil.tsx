import React from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import usuarioService from '../../services/usuarioService'
import useModificarPerfil from '../../hooks/Perfil/useModificarPerfil'

const modificarPerfil = () => {
    const navigate: NavigateFunction = useNavigate()
    const params                     = useParams()
    const { data, handleChange }     = useModificarPerfil( params, navigate )

    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        usuarioService.updateUsuario( params.id, data )
            .then( () => {
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
                                                value={ data.cedulaUsuario }
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
                                                value={ data.nombreUsuario }
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
                                                value={ data.apellidoUsuario }
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
                                                value={ data.telefonoUsuario }
                                                name="telefonoUsuario"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="correo">Correo Electronico</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="emailUsuario"
                                                placeholder="Ingrese un correo"
                                                onChange={ handleChange }
                                                value={ data.emailUsuario }
                                                name="emailUsuario"
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
                                                value={ data.ciudadResidencia }
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
                                                !data.ciudadResidencia }
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

export default modificarPerfil
