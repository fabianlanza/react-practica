import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Usuarios } from './components/ListaUsuario'
import { TarjetaUsuario } from './components/Card'
import { Route } from 'react-router'
import { Routes } from 'react-router'
import { Link, useLocation } from 'react-router' 
import { Productos } from './pages/Productos'
import { Inicio } from './pages/Inicio'
import Divisa from './pages/Divisa'



function App() {
  const [count, setCount] = useState(0)
  const location = useLocation(); // Hook para detectar cambios de ruta


    return (
      <>
      {/* Navbar */}
        <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand fw-bold">
              🚀 Mi Portafolio
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to={"/"}>
                  Inicio
                </Link>
                <Link className={`nav-link ${location.pathname === '/divisa' ? 'active' : ''}`} to={"/divisa"}>
                  Divisa
                </Link>
                <Link className={`nav-link ${location.pathname === '/clientes' ? 'active' : ''}`} to={"/clientes"}>
                  Clientes
                </Link>
                <Link className={`nav-link ${location.pathname === '/productos' ? 'active' : ''}`} to={"/productos"}>
                  Productos
                </Link>
                <Link className={`nav-link ${location.pathname === '/acercade' ? 'active' : ''}`} to={"/acercade"}>
                  Acerca de
                </Link>
              </div>
            </div>
          </div>
        </nav>

      {/* Rutas */}
        <div className="page-container" key={location.pathname}>
          <Routes location={location}>
            <Route path = '/' element = {<Inicio />}/>
            <Route path = '/divisa' element = {<Divisa />}/>
            <Route path = '/clientes' element = {<Usuarios /> }/>
            <Route path = '/productos' element = {<Productos /> }/>
          </Routes>
        </div>
      </>
    )
  } 


export default App
