import express, { Express, Router } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

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
        this.port   = Number( process.env.PORT )
        this.paths  = { fotoVehiculos: '/api/fotovehiculos' }

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
        this.app.use( morgan( 'dev' ) )
    }

    private routes() {
        this.app.use( this.paths.fotoVehiculos, fotoVehiculo )
    }

    private libs() {
        this.app.use( 'src/uploads', express.static( path.resolve( 'uploads' ) ) )
    }

    listen() {
        this._express.listen( this.port, () => {
            console.log( `Servidor corriendo en http://localhost:${this.port}/v2/AlquilerVehiculos/api/fotovehiculos` )
        } )
    }
}

export { Server }
