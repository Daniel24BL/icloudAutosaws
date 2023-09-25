import React, { ChangeEvent, useState } from 'react'
import vehiculoFotoService from '../../services/vehiculoFotoService'
import { useParams } from 'react-router-dom'
import useImagen from '../../hooks/Vehiculo/useImagen'

const SubirImagen = () => {
    const params = useParams()
    const {imagen,file, handleChange, handleChangeFile}= useImagen()

    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        const data = {
            vehiculo_ID: params.id,
            imagen     : file,
            descripcion: imagen.descripcion,
        }
        console.log( data )
        vehiculoFotoService.postVehiculoFotos( data )
            .then( ( data ) => {
                console.log( data )
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
                                                htmlFor="imagen">Subir Foto</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="imagen"
                                                placeholder="Subir Foto"
                                                onChange={ handleChangeFile }
                                                name="imagen"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3">
                                            <label
                                                htmlFor="descripcion">Descripcion</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="descripcion"
                                                placeholder="Ingrese una descripcion"
                                                onChange={ handleChange }
                                                name="descripcion"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button
                                            type="submit"
                                            className="alert-primary btn btn-lg btn-secondary fw-bold border-white bg-white m-2"
                                            disabled={
                                                !imagen.descripcion
                                            }
                                        >Subir
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

export default SubirImagen
