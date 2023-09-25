import React from 'react'
import { Link, NavigateFunction, Outlet, useNavigate } from 'react-router-dom'

import logo from '../../../assets/logo.png'

const Nav = () => {
    const user                       = localStorage.getItem( 'user' )
    const navigate: NavigateFunction = useNavigate()
    const cerrarSesion               = () => {
        localStorage.removeItem( 'user' )
        navigate( '/' )
    }
    return (
        <>
            <div className="container">
                < header
                    className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <img
                        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
                        src={ logo }
                        alt={ 'Logo' }/>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Inicio</Link>
                        </li>
                        { user
                            ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="vehiculos"
                                            className="nav-link">Mis
                                            vehiculos</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="alquileres"
                                            className="nav-link">Mis
                                            Alquileres</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/perfil" className="nav-link">MI
                                            perfil</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link"
                                            onClick={ cerrarSesion }>Cerrar
                                            Sesión</Link>
                                    </li>
                                </>
                            )
                            : (
                                <>
                                    <li className="nav-item">
                                        <Link to="iniciar-sesion"
                                            className="nav-link">Inicio de
                                            Sesion</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="registrarse"
                                            className="nav-link">Registrarse</Link>
                                    </li>
                                </>
                            ) }
                    </ul>
                </header>
            </div>
            <div className="container">
                <Outlet/>
            </div>
        </>

    )
}

export default Nav
