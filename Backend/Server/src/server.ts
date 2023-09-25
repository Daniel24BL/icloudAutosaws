import express, { Express, Router } from 'express'
import cors from 'cors'
import path from 'path'

import { router as usuario } from './routes/usuario'
import { router as vehiculo } from './routes/vehiculo'
import { router as agencia } from './routes/agencia'
import { router as alquiler } from './routes/alquiler'
import { router as fotoVehiculo } from './routes/fotoVehiculo'

import { dbConnection } from './database/config'

class Server {
    app: Router
    router: Router
    port: Number
    paths: { [key: string]: string }
    private _express: Express

    constructor() {
        this.app    = Router()
        this.router = Router()
        // this.port = Number(process.env["PORT"]);
        this.port   = 3030
        this.paths  = {
            usuarios     : '/api/usuarios',
            vehiculos    : '/api/vehiculos',
            agencias     : '/api/agencias',
            alquileres   : '/api/alquileres',
            fotoVehiculos: '/api/fotovehiculos',
        }
        this.conectarDB()
        this.middleware()
        this.routes()
        this.libs()
        this.router.use( '/v2/AlquilerVehiculos', this.app )
        this._express = express().use( this.router )
    }

    private async conectarDB() {
        await dbConnection()
    }

    private middleware() {
        this.app.use( cors() )
        this.app.use( express.json() )
    }

    private routes() {
        this.app.use( this.paths.usuarios, usuario )
        this.app.use( this.paths.vehiculos, vehiculo )
        this.app.use( this.paths.agencias, agencia )
        this.app.use( this.paths.alquileres, alquiler )
        this.app.use( this.paths.fotoVehiculos, fotoVehiculo )
    }

    private libs() {
        this.app.use( express.static( path.resolve( 'uploads' ) ) )
    }

    listen() {
        this._express.listen( this.port, () => {
            console.log(
                `Servidor corriendo en http://localhost:${this.port}/v2/AlquilerVehiculos/api/usuarios`,
            )
            console.log(
                `Servidor corriendo en http://localhost:${this.port}/v2/AlquilerVehiculos/api/vehiculos`,
            )
            console.log(
                `Servidor corriendo en http://localhost:${this.port}/v2/AlquilerVehiculos/api/agencias`,
            )
            console.log(
                `Servidor corriendo en http://localhost:${this.port}/v2/AlquilerVehiculos/api/alquileres`,
            )
        } )
    }
}

export { Server }
