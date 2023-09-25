import React from 'react'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Nav from './components/pages/Navbar/Nav'
import Home from './components/pages/home/home'
import Perfil from './components/pages/perfil/perfil'
import ModificarPerfil from './components/pages/perfil/modificarPerfil'
import Login from './components/pages/auth/login'
import Register from './components/pages/auth/register'
import Alquiler from './components/pages/alquiler/alquiler'
import Vehiculo from './components/pages/vehiculo/vehiculo'
import ModificarVehiculo from './components/pages/vehiculo/modificarVehiculo'
import NotFound from './components/pages/notFound'
import AlquilerAuto from './components/pages/home/partials/alquilerAuto'
import FormVehiculo from './components/pages/vehiculo/formVehiculo'
import SubirImagen from './components/pages/vehiculo/subirImagen'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <Nav/> } caseSensitive>
                    <Route index element={ <Home/> }/>
                    <Route
                        path="perfil"
                        element={ <Perfil/> }
                        caseSensitive
                    />
                    <Route
                        path="perfil/modificar/:id"
                        element={ <ModificarPerfil/> }
                        caseSensitive
                    />
                    <Route
                        path="iniciar-sesion"
                        element={ <Login/> }
                        caseSensitive
                    />
                    <Route
                        path="registrarse"
                        element={ <Register/> }
                        caseSensitive
                    />
                    <Route
                        path="alquileres"
                        element={ <Alquiler/> }
                        caseSensitive
                    />
                    <Route
                        path="vehiculos"
                        element={ <Vehiculo/> }
                        caseSensitive
                    />
                    <Route
                        path="vehiculos/registrar"
                        element={ <FormVehiculo/> }
                        caseSensitive
                    />
                    <Route
                        path="vehiculos/modificar/:id"
                        element={ <ModificarVehiculo/> }
                        caseSensitive
                    />
                    <Route
                        path="vehiculos/imagen/:id"
                        element={ <SubirImagen/> }
                        caseSensitive
                    />
                    <Route
                        path="alquiler/:id"
                        element={ <AlquilerAuto/> }
                        caseSensitive
                    />
                </Route>
                <Route path="*" element={ <NotFound/> } caseSensitive/>
            </Routes>
        </div>
    )
}

export default App
