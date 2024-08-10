import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './styles.css'

import GlobalPanel from './components/global/panel.jsx'
import GlobalPanelTablet from './components/global/paneltablet.jsx'
import GlobalPanelCell from './components/global/panelcell.jsx'

import DashboardPanel from './components/dashboard/panel.jsx'
import DashboardPanelTablet from './components/dashboard/paneltablet.jsx'
import DashboardPanelCell from './components/dashboard/panelcell.jsx'

import ClientesPanel from './components/clientes/panel.jsx'
import ClientesPanelTablet from './components/clientes/paneltablet.jsx'
import ClientesPanelCell from './components/clientes/panelcell.jsx'

import ListaClientes from './components/clientes/lista.jsx'
import ListaClientesTablet from './components/clientes/listatablet.jsx'
import ListaClientesCell from './components/clientes/listacell.jsx'

import NuevoCliente from './components/clientes/nuevo.jsx'
import NuevoClienteTablet from './components/clientes/nuevotablet.jsx'
import NuevoClienteCell from './components/clientes/nuevocell.jsx'

import DetallesCliente from './components/clientes/detalles.jsx'
import DetallesClienteTablet from './components/clientes/detallestablet.jsx'
import DetallesClienteCell from './components/clientes/detallescell.jsx'

import TiposProyectosPanel from './components/tipos/panel.jsx'
import TiposProyectosPanelTablet from './components/tipos/paneltablet.jsx'
import TiposProyectosPanelCell from './components/tipos/panelcell.jsx'

import ListaTiposProyectos from './components/tipos/lista.jsx'
import ListaTiposProyectosTablet from './components/tipos/listatablet.jsx'
import ListaTiposProyectosCell from './components/tipos/listacell.jsx'

import NuevoTipoProyecto from './components/tipos/nuevo.jsx'
import NuevoTipoProyectoTablet from './components/tipos/nuevotablet.jsx'
import NuevoTipoProyectoCell from './components/tipos/nuevocell.jsx'

import DetallesTipoProyecto from './components/tipos/detalles.jsx'
import DetallesTipoProyectoTablet from './components/tipos/detallestablet.jsx'
import DetallesTipoProyectoCell from './components/tipos/detallescell.jsx'

import ProyectosPanel from './components/proyectos/panel.jsx'
import ProyectosPanelTablet from './components/proyectos/paneltablet.jsx'
import ProyectosPanelCell from './components/proyectos/panelcell.jsx'

import ListaProyectos from './components/proyectos/lista.jsx'
import ListaProyectosTablet from './components/proyectos/listatablet.jsx'
import ListaProyectosCell from './components/proyectos/listacell.jsx'

import NuevoProyecto from './components/proyectos/nuevo.jsx'
import NuevoProyectoTablet from './components/proyectos/nuevotablet.jsx'
import NuevoProyectoCell from './components/proyectos/nuevocell.jsx'

import DetallesProyecto from './components/proyectos/detalles.jsx'
import DetallesProyectoTablet from './components/proyectos/detallestablet.jsx'
import DetallesProyectoCell from './components/proyectos/detallescell.jsx'

export default function App() {
    const [width, setWidth] = useState (window.outerWidth)

    useEffect(() => {
      window.addEventListener('resize', handle_resize)

      return () => {
        window.removeEventListener('resize', handle_resize)
      }
    }, [])

    const handle_resize = () => {
      setWidth(window.outerWidth)
    }

    return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={width < 500 ? <GlobalPanelCell   proporcional={499 / width}/> : 
                                       width < 991 ? <GlobalPanelTablet proporcional={991 / width}/> : 
                                                     <GlobalPanel       proporcional={1920 / width} />}>

                  <Route index element={width < 500 ? <DashboardPanelCell   proporcional={499 / width}/> : 
                                        width < 991 ? <DashboardPanelTablet proporcional={991 / width}/> : 
                                                      <DashboardPanel       proporcional={1920 / width} />}/>

                  <Route path='clientes' element={width < 500 ? <ClientesPanelCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ClientesPanelTablet proporcional={991 / width}/> : 
                                                                <ClientesPanel       proporcional={1920 / width} />}>

                    <Route index element={width < 500 ? <ListaClientesCell   proporcional={499 / width}/> : 
                                          width < 991 ? <ListaClientesTablet proporcional={991 / width}/> : 
                                                        <ListaClientes       proporcional={1920 / width} />}/>

                    <Route path='nuevo' element={width < 500 ? <NuevoClienteCell   proporcional={499 / width}/> : 
                                                 width < 991 ? <NuevoClienteTablet proporcional={991 / width}/> : 
                                                               <NuevoCliente       proporcional={1920 / width} />}/>
                                                               
                    <Route path=':negocio/:id' element={width < 500 ? <DetallesClienteCell   proporcional={499 / width}/> : 
                                                        width < 991 ? <DetallesClienteTablet proporcional={991 / width}/> : 
                                                                      <DetallesCliente       proporcional={1920 / width} />}/>

                  </Route>
                  

                  <Route path='tipos-proyectos' element={width < 500 ? <TiposProyectosPanelCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <TiposProyectosPanelTablet proporcional={991 / width}/> : 
                                                                       <TiposProyectosPanel       proporcional={1920 / width} />}>

                    <Route index element={width < 500 ? <ListaTiposProyectosCell   proporcional={499 / width}/> : 
                                          width < 991 ? <ListaTiposProyectosTablet proporcional={991 / width}/> : 
                                                        <ListaTiposProyectos       proporcional={1920 / width} />}/>

                    <Route path='nuevo' element={width < 500 ? <NuevoTipoProyectoCell   proporcional={499 / width}/> : 
                                                 width < 991 ? <NuevoTipoProyectoTablet proporcional={991 / width}/> : 
                                                               <NuevoTipoProyecto       proporcional={1920 / width} />}/>
                                                               
                    <Route path=':tipo_proyecto/:id' element={width < 500 ? <DetallesTipoProyectoCell   proporcional={499 / width}/> : 
                                                        width < 991 ? <DetallesTipoProyectoTablet proporcional={991 / width}/> : 
                                                                      <DetallesTipoProyecto       proporcional={1920 / width} />}/>

                  </Route>
                  
                  <Route path='proyectos' element={width < 500 ? <ProyectosPanelCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <ProyectosPanelTablet proporcional={991 / width}/> : 
                                                                 <ProyectosPanel       proporcional={1920 / width} />}>

                    <Route index element={width < 500 ? <ListaProyectosCell   proporcional={499 / width}/> : 
                                          width < 991 ? <ListaProyectosTablet proporcional={991 / width}/> : 
                                                        <ListaProyectos       proporcional={1920 / width} />}/>

                    <Route path='nuevo' element={width < 500 ? <NuevoProyectoCell   proporcional={499 / width}/> : 
                                                 width < 991 ? <NuevoProyectoTablet proporcional={991 / width}/> : 
                                                               <NuevoProyecto       proporcional={1920 / width} />}/>
                                                               
                    <Route path=':proyecto/:id' element={width < 500 ? <DetallesProyectoCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <DetallesProyectoTablet proporcional={991 / width}/> : 
                                                                       <DetallesProyecto       proporcional={1920 / width} />}/>

                  </Route>


              </Route>
          </Routes>
      </BrowserRouter>
    )
}
