import React, { FormEvent } from 'react'
import authService from '../../services/authService'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/Auth/useUser'

const Login = () => {
    const navigate: NavigateFunction = useNavigate()
    const { usuario, handleChange }  = useUser()

    const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        authService.loginUsuario( usuario.correo, usuario.contrasena )
            .then( ( { user } ) => {
                localStorage.setItem( 'user', JSON.stringify( user._id ) )
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
                                    Iniciar Sesion
                                </h3>
                                <form className="form-horizontal"
                                    onSubmit={ handleSubmit }>
                                    <div className="row">
                                        <div className="col-3">
                                            <label
                                                htmlFor="correo">Correo</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="correo"
                                                placeholder="Ingrese un correo"
                                                value={ usuario.correo }
                                                onChange={ handleChange }
                                                name="correo"
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
                                                id="contrasena"
                                                placeholder="Ingrese una contraseña"
                                                value={ usuario.contrasena }
                                                onChange={ handleChange }
                                                name="contrasena"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button
                                            type="submit"
                                            className="alert-primary btn btn-lg btn-secondary fw-bold border-white bg-white m-2"
                                            disabled={
                                                !usuario.correo ||
                                                !usuario.contrasena
                                            }
                                        >Iniciar Sesion
                                        </button>
                                    </div>
                                    <div className="my-3 text-center">
                                        <span>¿No tienes una cuenta? <Link
                                            className="ur"
                                            to="/registrarse"
                                        >Regístrate aquí
                                        </Link>
                                        </span>
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

export default Login
