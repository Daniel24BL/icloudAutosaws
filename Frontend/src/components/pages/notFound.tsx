import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="container text-center accordion-body">
            <h1>404</h1>
            <Link
                className="alert-primary btn btn-lg btn-secondary fw-bold border-white bg-white"
                to="/"
            >Volver a inicio
            </Link>
        </div>
    )
}

export default NotFound
