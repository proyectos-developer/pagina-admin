import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './styles.css'

import GlobalPanel from './components/global/panel.jsx'
import GlobalPanelTablet from './components/global/paneltablet.jsx'
import GlobalPanelCell from './components/global/panelcell.jsx'

import SessionPanel from './components/session/panel.jsx'
import SessionPanelTablet from './components/session/paneltablet.jsx'
import SessionPanelCell from './components/session/panelcell.jsx'

import LoginSession from './components/session/login.jsx'
import LoginSessionTablet from './components/session/logintablet.jsx'
import LoginSessionCell from './components/session/logincell.jsx'

import OlvidoPassword from './components/session/olvidoPassword.jsx'
import OlvidoPasswordTablet from './components/session/olvidopasswordtablet.jsx'
import OlvidoPasswordCell from './components/session/olvidopasswordcell.jsx'

import CambioPassword from './components/session/cambiopassword.jsx'
import CambioPasswordTablet from './components/session/cambiopasswordtablet.jsx'
import CambioPasswordCell from './components/session/cambiopasswordcell.jsx'

import HomePanel from './components/home/panel.jsx'
import HomePanelTablet from './components/home/paneltablet.jsx'
import HomePanelCell from './components/home/panelcell.jsx'

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

import CompradoresPanel from './components/compradores/panel.jsx'
import CompradoresPanelTablet from './components/compradores/paneltablet.jsx'
import CompradoresPanelCell from './components/compradores/panelcell.jsx'

import ListaCompradores from './components/compradores/lista.jsx'
import ListaCompradoresTablet from './components/compradores/listatablet.jsx'
import ListaCompradoresCell from './components/compradores/listacell.jsx'

import DetallesComprador from './components/compradores/detalles.jsx'
import DetallesCompradorTablet from './components/compradores/detallestablet.jsx'
import DetallesCompradorCell from './components/compradores/detallescell.jsx'

import ProductosPanel from './components/productos/panel.jsx'
import ProductosPanelTablet from './components/productos/paneltablet.jsx'
import ProductosPanelCell from './components/productos/panelcell.jsx'

import ListaProductos from './components/productos/lista.jsx'
import ListaProductosTablet from './components/productos/listatablet.jsx'
import ListaProductosCell from './components/productos/listacell.jsx'

import NuevoProducto from './components/productos/nuevo.jsx'
import NuevoProductoTablet from './components/productos/nuevotablet.jsx'
import NuevoProductoCell from './components/productos/nuevocell.jsx'

import DetallesProducto from './components/productos/detalles.jsx'
import DetallesProductoTablet from './components/productos/detallestablet.jsx'
import DetallesProductoCell from './components/productos/detallescell.jsx'

import FavoritosPanel from './components/favoritos/panel.jsx'
import FavoritosPanelTablet from './components/favoritos/paneltablet.jsx'
import FavoritosPanelCell from './components/favoritos/panelcell.jsx'

import ListaFavoritos from './components/favoritos/lista.jsx'
import ListaFavoritosTablet from './components/favoritos/listatablet.jsx'
import ListaFavoritosCell from './components/favoritos/listacell.jsx'

import DetallesProductoFavorito from './components/favoritos/detalles.jsx'
import DetallesProductoFavoritoTablet from './components/favoritos/detallestablet.jsx'
import DetallesProductoFavoritoCell from './components/favoritos/detallescell.jsx'

import ComentariosPanel from './components/comentarios/panel.jsx'
import ComentariosPanelTablet from './components/comentarios/paneltablet.jsx'
import ComentariosPanelCell from './components/comentarios/panelcell.jsx'

import ListaComentarios from './components/comentarios/lista.jsx'
import ListaComentariosTablet from './components/comentarios/listatablet.jsx'
import ListaComentariosCell from './components/comentarios/listacell.jsx'

import DetallesComentariosProducto from './components/comentarios/detalles.jsx'
import DetallesComentariosProductoTablet from './components/comentarios/detallestablet.jsx'
import DetallesComentariosProductoCell from './components/comentarios/detallescell.jsx'

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

                  <Route path='' element={width < 500 ? <SessionPanelCell   proporcional={499 / width}/> : 
                                          width < 991 ? <SessionPanelTablet proporcional={991 / width}/> : 
                                                        <SessionPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <LoginSessionCell   proporcional={499 / width}/> : 
                                            width < 991 ? <LoginSessionTablet proporcional={991 / width}/> : 
                                                          <LoginSession       proporcional={1920 / width} />}/>
                                                            
                      <Route path='olvido-password' element={width < 500 ? <OlvidoPasswordCell   proporcional={499 / width}/> : 
                                                             width < 991 ? <OlvidoPasswordTablet proporcional={991 / width}/> : 
                                                                           <OlvidoPassword       proporcional={1920 / width} />}/>
                                                            
                      <Route path='cambiar-password' element={width < 500 ? <CambioPasswordCell   proporcional={499 / width}/> : 
                                                              width < 991 ? <CambioPasswordTablet proporcional={991 / width}/> : 
                                                                            <CambioPassword       proporcional={1920 / width} />}/>
                  </Route>

                  <Route path='panel' element={width < 500 ? <HomePanelCell   proporcional={499 / width}/> : 
                                               width < 991 ? <HomePanelTablet proporcional={991 / width}/> : 
                                                             <HomePanel       proporcional={1920 / width} />}>

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
                                                                
                      <Route path='cliente/:cliente/:id' element={width < 500 ? <DetallesClienteCell   proporcional={499 / width}/> : 
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
                                                                
                      <Route path='tipo-proyecto/:tipo_proyecto/:id' element={width < 500 ? <DetallesTipoProyectoCell   proporcional={499 / width}/> : 
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
                                                                
                      <Route path='proyecto/:proyecto/:id' element={width < 500 ? <DetallesProyectoCell   proporcional={499 / width}/> : 
                                                                    width < 991 ? <DetallesProyectoTablet proporcional={991 / width}/> : 
                                                                                  <DetallesProyecto       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='productos' element={width < 500 ? <ProductosPanelCell   proporcional={499 / width}/> : 
                                                     width < 991 ? <ProductosPanelTablet proporcional={991 / width}/> : 
                                                                   <ProductosPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaProductosCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaProductosTablet proporcional={991 / width}/> : 
                                                          <ListaProductos       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevoProductoCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevoProductoTablet proporcional={991 / width}/> : 
                                                                 <NuevoProducto       proporcional={1920 / width} />}/>
                                                                
                      <Route path='producto/:producto/:id' element={width < 500 ? <DetallesProductoCell   proporcional={499 / width}/> : 
                                                                    width < 991 ? <DetallesProductoTablet proporcional={991 / width}/> : 
                                                                                  <DetallesProducto       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='favoritos' element={width < 500 ? <FavoritosPanelCell   proporcional={499 / width}/> : 
                                                     width < 991 ? <FavoritosPanelTablet proporcional={991 / width}/> : 
                                                                   <FavoritosPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaFavoritosCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaFavoritosTablet proporcional={991 / width}/> : 
                                                          <ListaFavoritos       proporcional={1920 / width} />}/>

                      <Route path='producto/:producto/:id' element={width < 500 ? <DetallesProductoFavoritoCell   proporcional={499 / width}/> : 
                                                                    width < 991 ? <DetallesProductoFavoritoTablet proporcional={991 / width}/> : 
                                                                                  <DetallesProductoFavorito       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='calificaciones' element={width < 500 ? <ComentariosPanelCell   proporcional={499 / width}/> : 
                                                          width < 991 ? <ComentariosPanelTablet proporcional={991 / width}/> : 
                                                                        <ComentariosPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaComentariosCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaComentariosTablet proporcional={991 / width}/> : 
                                                          <ListaComentarios       proporcional={1920 / width} />}/>

                      <Route path='producto/:producto/:id' element={width < 500 ? <DetallesComentariosProductoCell   proporcional={499 / width}/> : 
                                                                       width < 991 ? <DetallesComentariosProductoTablet proporcional={991 / width}/> : 
                                                                                     <DetallesComentariosProducto       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='compradores' element={width < 500 ? <CompradoresPanelCell   proporcional={499 / width}/> : 
                                                       width < 991 ? <CompradoresPanelTablet proporcional={991 / width}/> : 
                                                                     <CompradoresPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaCompradoresCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaCompradoresTablet proporcional={991 / width}/> : 
                                                          <ListaCompradores       proporcional={1920 / width} />}/>

                      <Route path='comprador/:comprador/:id' element={width < 500 ? <DetallesCompradorCell   proporcional={499 / width}/> : 
                                                            width < 991 ? <DetallesCompradorTablet proporcional={991 / width}/> : 
                                                                          <DetallesComprador       proporcional={1920 / width} />}/>

                    </Route>
                  </Route>

              </Route>
          </Routes>
      </BrowserRouter>
    )
}
