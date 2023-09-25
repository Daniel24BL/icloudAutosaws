import './index.css'
import React from 'react'
import { Link } from 'react-router-dom'
import imgPerfil from '../../../assets/avatarPerfil.png'
import usePerfil from '../../hooks/Perfil/usePerfil'

const Perfil = () => {
    const { data, id } = usePerfil()

    return (
        <section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">Sobre mi</h3>
                            <h6 className="theme-color lead">
                                Soy { data.nombreUsuario + ' ' +
                                data.apellidoUsuario }
                            </h6>
                            <div className="row about-list">
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>Cedula</label>
                                        <p>{ data.cedulaUsuario }</p>
                                    </div>
                                    <div className="media">
                                        <label>Residencia</label>
                                        <p>{ data.ciudadResidencia }</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>E-mail</label>
                                        <p>{ data.emailUsuario }</p>
                                    </div>
                                    <div className="media">
                                        <label>Telefono</label>
                                        <p>{ data.telefonoUsuario }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar">
                            <img
                                src={ imgPerfil }
                                alt="foto"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-1">
                <Link
                    to={ `modificar/${id}` }
                    className="alert-primary btn btn-lg btn-secondary fw-bold border-white bg-white"
                >Modificar</Link>
            </div>
        </section>
    )
}

export default Perfil
