import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './styles.css'

import GlobalPanel from './components/global/panel.jsx'

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

import ListaFavoritos from './components/favoritos/lista.jsx'
import ListaFavoritosTablet from './components/favoritos/listatablet.jsx'
import ListaFavoritosCell from './components/favoritos/listacell.jsx'

import DetallesProductoFavorito from './components/favoritos/detalles.jsx'
import DetallesProductoFavoritoTablet from './components/favoritos/detallestablet.jsx'
import DetallesProductoFavoritoCell from './components/favoritos/detallescell.jsx'

import ComentariosPanel from './components/comentarios/panel.jsx'

import ListaComentarios from './components/comentarios/lista.jsx'
import ListaComentariosTablet from './components/comentarios/listatablet.jsx'
import ListaComentariosCell from './components/comentarios/listacell.jsx'

import DetallesComentariosProducto from './components/comentarios/detalles.jsx'
import DetallesComentariosProductoTablet from './components/comentarios/detallestablet.jsx'
import DetallesComentariosProductoCell from './components/comentarios/detallescell.jsx'

import CarritoComprasPanel from './components/carrito/panel.jsx'

import ListaCarritoCompras from './components/carrito/lista.jsx'
import ListaCarritoComprasTablet from './components/carrito/listatablet.jsx'
import ListaCarritoComprasCell from './components/carrito/listacell.jsx'

import DetallesCompra from './components/carrito/detalles.jsx'
import DetallesCompraTablet from './components/carrito/detallestablet.jsx'
import DetallesCompraCell from './components/carrito/detallescell.jsx'

import SuscriptoresPanel from './components/suscripcion/panel.jsx'

import ListaSuscriptores from './components/suscripcion/lista.jsx'
import ListaSuscriptoresTablet from './components/suscripcion/listatablet.jsx'
import ListaSuscriptoresCell from './components/suscripcion/listacell.jsx'

import DetallesSuscriptor from './components/suscripcion/detalles.jsx'
import DetallesSuscriptorTablet from './components/suscripcion/detallestablet.jsx'
import DetallesSuscriptorCell from './components/suscripcion/detallescell.jsx'

import NoticiasPanel from './components/noticias/panel.jsx'
import NoticiasPanelTablet from './components/noticias/paneltablet.jsx'
import NoticiasPanelCell from './components/noticias/panelcell.jsx'

import ListaNoticias from './components/noticias/lista.jsx'
import ListaNoticiasTablet from './components/noticias/listatablet.jsx'
import ListaNoticiasCell from './components/noticias/listacell.jsx'

import NuevaNoticia from './components/noticias/nuevo.jsx'
import NuevaNoticiaTablet from './components/noticias/nuevotablet.jsx'
import NuevaNoticiaCell from './components/noticias/nuevocell.jsx'

import DetallesNoticia from './components/noticias/detalles.jsx'
import DetallesNoticiaTablet from './components/noticias/detallestablet.jsx'
import DetallesNoticiaCell from './components/noticias/detallescell.jsx'

import CategoriasNoticiasPanel from './components/noticias/categorias/panel.jsx'
import CategoriasNoticiasPanelTablet from './components/noticias/categorias/paneltablet.jsx'
import CategoriasNoticiasPanelCell from './components/noticias/categorias/panelcell.jsx'

import ListaCategoriasNoticias from './components/noticias/categorias/lista.jsx'
import ListaCategoriasNoticiasTablet from './components/noticias/categorias/listatablet.jsx'
import ListaCategoriasNoticiasCell from './components/noticias/categorias/listacell.jsx'

import NuevaCategoriaNoticia from './components/noticias/categorias/nuevo.jsx'
import NuevaCategoriaNoticiaTablet from './components/noticias/categorias/nuevotablet.jsx'
import NuevaCategoriaNoticiaCell from './components/noticias/categorias/nuevocell.jsx'

import DetallesCategoriaNoticia from './components/noticias/categorias/detalles.jsx'
import DetallesCategoriaNoticiaTablet from './components/noticias/categorias/detallestablet.jsx'
import DetallesCategoriaNoticiaCell from './components/noticias/categorias/detallescell.jsx'

import CategoriasPanel from './components/categorias/panel.jsx'
import CategoriasPanelTablet from './components/categorias/paneltablet.jsx'
import CategoriasPanelCell from './components/categorias/panelcell.jsx'

import ListaCategorias from './components/categorias/lista.jsx'
import ListaCategoriasTablet from './components/categorias/listatablet.jsx'
import ListaCategoriasCell from './components/categorias/listacell.jsx'

import NuevaCategoria from './components/categorias/nuevo.jsx'
import NuevaCategoriaTablet from './components/categorias/nuevotablet.jsx'
import NuevaCategoriaCell from './components/categorias/nuevocell.jsx'

import DetallesCategoria from './components/categorias/detalles.jsx'
import DetallesCategoriaTablet from './components/categorias/detallestablet.jsx'
import DetallesCategoriaCell from './components/categorias/detallescell.jsx'

import SubCategoriasPanel from './components/subcategorias/panel.jsx'
import SubCategoriasPanelTablet from './components/subcategorias/paneltablet.jsx'
import SubCategoriasPanelCell from './components/subcategorias/panelcell.jsx'

import ListaSubCategorias from './components/subcategorias/lista.jsx'
import ListaSubCategoriasTablet from './components/subcategorias/listatablet.jsx'
import ListaSubCategoriasCell from './components/subcategorias/listacell.jsx'

import NuevaSubCategoria from './components/subcategorias/nuevo.jsx'
import NuevaSubCategoriaTablet from './components/subcategorias/nuevotablet.jsx'
import NuevaSubCategoriaCell from './components/subcategorias/nuevocell.jsx'

import DetallesSubCategoria from './components/subcategorias/detalles.jsx'
import DetallesSubCategoriaTablet from './components/subcategorias/detallestablet.jsx'
import DetallesSubCategoriaCell from './components/subcategorias/detallescell.jsx'

import ServiciosPanel from './components/servicios/panel.jsx'
import ServiciosPanelTablet from './components/servicios/paneltablet.jsx'
import ServiciosPanelCell from './components/servicios/panelcell.jsx'

import ListaServicios from './components/servicios/lista.jsx'
import ListaServiciosTablet from './components/servicios/listatablet.jsx'
import ListaServiciosCell from './components/servicios/listacell.jsx'

import NuevoServicio from './components/servicios/nuevo.jsx'
import NuevoServicioTablet from './components/servicios/nuevotablet.jsx'
import NuevoServicioCell from './components/servicios/nuevocell.jsx'

import DetallesServicio from './components/servicios/detalles.jsx'
import DetallesServicioTablet from './components/servicios/detallestablet.jsx'
import DetallesServicioCell from './components/servicios/detallescell.jsx'

import UnidadesPanel from './components/unidades/panel.jsx'
import UnidadesPanelTablet from './components/unidades/paneltablet.jsx'
import UnidadesPanelCell from './components/unidades/panelcell.jsx'

import ListaUnidades from './components/unidades/lista.jsx'
import ListaUnidadesTablet from './components/unidades/listatablet.jsx'
import ListaUnidadesCell from './components/unidades/listacell.jsx'

import NuevaUnidad from './components/unidades/nuevo.jsx'
import NuevaUnidadTablet from './components/unidades/nuevotablet.jsx'
import NuevaUnidadCell from './components/unidades/nuevocell.jsx'

import DetallesUnidad from './components/unidades/detalles.jsx'
import DetallesUnidadTablet from './components/unidades/detallestablet.jsx'
import DetallesUnidadCell from './components/unidades/detallescell.jsx'

import TrabajadoresPanel from './components/trabajadores/panel.jsx'
import TrabajadoresPanelTablet from './components/trabajadores/paneltablet.jsx'
import TrabajadoresPanelCell from './components/trabajadores/panelcell.jsx'

import ListaTrabajadores from './components/trabajadores/lista.jsx'
import ListaTrabajadoresTablet from './components/trabajadores/listatablet.jsx'
import ListaTrabajadoresCell from './components/trabajadores/listacell.jsx'

import NuevoTrabajador from './components/trabajadores/nuevo.jsx'
import NuevoTrabajadorTablet from './components/trabajadores/nuevotablet.jsx'
import NuevoTrabajadorCell from './components/trabajadores/nuevocell.jsx'

import DetallesTrabajador from './components/trabajadores/detalles.jsx'
import DetallesTrabajadorTablet from './components/trabajadores/detallestablet.jsx'
import DetallesTrabajadorCell from './components/trabajadores/detallescell.jsx'

import AreasEmpresaPanel from './components/areasempresa/panel.jsx'
import AreasEmpresaPanelTablet from './components/areasempresa/paneltablet.jsx'
import AreasEmpresaPanelCell from './components/areasempresa/panelcell.jsx'

import ListaAreasEmpresa from './components/areasempresa/lista.jsx'
import ListaAreasEmpresaTablet from './components/areasempresa/listatablet.jsx'
import ListaAreasEmpresaCell from './components/areasempresa/listacell.jsx'

import NuevoAreaEmpresa from './components/areasempresa/nuevo.jsx'
import NuevoAreaEmpresaTablet from './components/areasempresa/nuevotablet.jsx'
import NuevoAreaEmpresaCell from './components/areasempresa/nuevocell.jsx'

import DetallesAreaEmpresa from './components/areasempresa/detalles.jsx'
import DetallesAreaEmpresaTablet from './components/areasempresa/detallestablet.jsx'
import DetallesAreaEmpresaCell from './components/areasempresa/detallescell.jsx'

import NotificacionesPanel from './components/notificaciones/panel.jsx'

import ListaNotificaciones from './components/notificaciones/lista.jsx'
import ListaNotificacionesTablet from './components/notificaciones/listatablet.jsx'
import ListaNotificacionesCell from './components/notificaciones/listacell.jsx'

import DetallesNotificacion from './components/notificaciones/detalles.jsx'
import DetallesNotificacionTablet from './components/notificaciones/detallestablet.jsx'
import DetallesNotificacionCell from './components/notificaciones/detallescell.jsx'

import MensajesPanel from './components/mensajes/panel.jsx'

import ListaMensajes from './components/mensajes/lista.jsx'
import ListaMensajesTablet from './components/mensajes/listatablet.jsx'
import ListaMensajesCell from './components/mensajes/listacell.jsx'

import DetallesMensaje from './components/mensajes/detalles.jsx'
import DetallesMensajeTablet from './components/mensajes/detallestablet.jsx'
import DetallesMensajeCell from './components/mensajes/detallescell.jsx'

import ReunionesPanel from './components/reuniones/panel.jsx'

import ListaReuniones from './components/reuniones/lista.jsx'
import ListaReunionesTablet from './components/reuniones/listatablet.jsx'
import ListaReunionesCell from './components/reuniones/listacell.jsx'

import DetallesReunion from './components/reuniones/detalles.jsx'
import DetallesReunionTablet from './components/reuniones/detallestablet.jsx'
import DetallesReunionCell from './components/reuniones/detallescell.jsx'

import GestionProyectosPanel from './components/gestion/proyecto/panel.jsx'
import GestionProyectosPanelTablet from './components/gestion/proyecto/paneltablet.jsx'
import GestionProyectosPanelCell from './components/gestion/proyecto/panelcell.jsx'

import ListaGestionProyectos from './components/gestion/proyecto/lista.jsx'
import ListaGestionProyectosTablet from './components/gestion/proyecto/listatablet.jsx'
import ListaGestionProyectosCell from './components/gestion/proyecto/listacell.jsx'

import NuevaGestionProyecto from './components/gestion/proyecto/nuevo.jsx'
import NuevaGestionProyectoTablet from './components/gestion/proyecto/nuevotablet.jsx'
import NuevaGestionProyectoCell from './components/gestion/proyecto/nuevocell.jsx'

import DatosGestionProyecto from './components/gestion/proyecto/nuevo/datos.jsx'
import DatosGestionProyectoTablet from './components/gestion/proyecto/nuevo/datostablet.jsx'
import DatosGestionProyectoCell from './components/gestion/proyecto/nuevo/datoscell.jsx'

import DetallesGestionProyecto from './components/gestion/proyecto/detalles.jsx'
import DetallesGestionProyectoTablet from './components/gestion/proyecto/detallestablet.jsx'
import DetallesGestionProyectoCell from './components/gestion/proyecto/detallescell.jsx'

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
              <Route path='/' element={<GlobalPanel/>}>

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
                    
                    <Route path='categorias' element={width < 500 ? <CategoriasPanelCell   proporcional={499 / width}/> : 
                                                      width < 991 ? <CategoriasPanelTablet proporcional={991 / width}/> : 
                                                                    <CategoriasPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaCategoriasCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaCategoriasTablet proporcional={991 / width}/> : 
                                                          <ListaCategorias       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevaCategoriaCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevaCategoriaTablet proporcional={991 / width}/> : 
                                                                 <NuevaCategoria       proporcional={1920 / width} />}/>
                                                                
                      <Route path='categoria/:categoria/:id' element={width < 500 ? <DetallesCategoriaCell   proporcional={499 / width}/> : 
                                                                      width < 991 ? <DetallesCategoriaTablet proporcional={991 / width}/> : 
                                                                                    <DetallesCategoria       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='subcategorias' element={width < 500 ? <SubCategoriasPanelCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <SubCategoriasPanelTablet proporcional={991 / width}/> : 
                                                                       <SubCategoriasPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaSubCategoriasCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaSubCategoriasTablet proporcional={991 / width}/> : 
                                                          <ListaSubCategorias       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevaSubCategoriaCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevaSubCategoriaTablet proporcional={991 / width}/> : 
                                                                 <NuevaSubCategoria       proporcional={1920 / width} />}/>
                                                                
                      <Route path='subcategoria/:subcategoria/:id' element={width < 500 ? <DetallesSubCategoriaCell   proporcional={499 / width}/> : 
                                                                            width < 991 ? <DetallesSubCategoriaTablet proporcional={991 / width}/> : 
                                                                                          <DetallesSubCategoria       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='unidades' element={width < 500 ? <UnidadesPanelCell   proporcional={499 / width}/> : 
                                                    width < 991 ? <UnidadesPanelTablet proporcional={991 / width}/> : 
                                                                  <UnidadesPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaUnidadesCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaUnidadesTablet proporcional={991 / width}/> : 
                                                          <ListaUnidades       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevaUnidadCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevaUnidadTablet proporcional={991 / width}/> : 
                                                                 <NuevaUnidad       proporcional={1920 / width} />}/>
                                                                
                      <Route path='unidad/:unidad/:id' element={width < 500 ? <DetallesUnidadCell   proporcional={499 / width}/> : 
                                                                width < 991 ? <DetallesUnidadTablet proporcional={991 / width}/> : 
                                                                              <DetallesUnidad       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='servicios' element={width < 500 ? <ServiciosPanelCell   proporcional={499 / width}/> : 
                                                     width < 991 ? <ServiciosPanelTablet proporcional={991 / width}/> : 
                                                                   <ServiciosPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaServiciosCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaServiciosTablet proporcional={991 / width}/> : 
                                                          <ListaServicios       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevoServicioCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevoServicioTablet proporcional={991 / width}/> : 
                                                                 <NuevoServicio       proporcional={1920 / width} />}/>
                                                                
                      <Route path='servicio/:servicio/:id' element={width < 500 ? <DetallesServicioCell   proporcional={499 / width}/> : 
                                                                    width < 991 ? <DetallesServicioTablet proporcional={991 / width}/> : 
                                                                                  <DetallesServicio       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='favoritos' element={<FavoritosPanel/>}>

                      <Route index element={width < 500 ? <ListaFavoritosCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaFavoritosTablet proporcional={991 / width}/> : 
                                                          <ListaFavoritos       proporcional={1920 / width} />}/>

                      <Route path='producto/:producto/:id' element={width < 500 ? <DetallesProductoFavoritoCell   proporcional={499 / width}/> : 
                                                                    width < 991 ? <DetallesProductoFavoritoTablet proporcional={991 / width}/> : 
                                                                                  <DetallesProductoFavorito       proporcional={1920 / width} />}/>
                    </Route>
                    
                    <Route path='calificaciones' element={<ComentariosPanel/>}>

                      <Route index element={width < 500 ? <ListaComentariosCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaComentariosTablet proporcional={991 / width}/> : 
                                                          <ListaComentarios       proporcional={1920 / width} />}/>

                      <Route path='producto/:producto/:id' element={width < 500 ? <DetallesComentariosProductoCell   proporcional={499 / width}/> : 
                                                                    width < 991 ? <DetallesComentariosProductoTablet proporcional={991 / width}/> : 
                                                                                  <DetallesComentariosProducto       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='compradores' element={<CompradoresPanel/>}>

                      <Route index element={width < 500 ? <ListaCompradoresCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaCompradoresTablet proporcional={991 / width}/> : 
                                                          <ListaCompradores       proporcional={1920 / width} />}/>

                      <Route path='comprador/:comprador/:id' element={width < 500 ? <DetallesCompradorCell   proporcional={499 / width}/> : 
                                                                      width < 991 ? <DetallesCompradorTablet proporcional={991 / width}/> : 
                                                                                    <DetallesComprador       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='compras' element={<CarritoComprasPanel/>}>

                      <Route index element={width < 500 ? <ListaCarritoComprasCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaCarritoComprasTablet proporcional={991 / width}/> : 
                                                          <ListaCarritoCompras       proporcional={1920 / width} />}/>

                      <Route path='productos/:shop_id' element={width < 500 ? <DetallesCompraCell   proporcional={499 / width}/> : 
                                                                width < 991 ? <DetallesCompraTablet proporcional={991 / width}/> : 
                                                                              <DetallesCompra       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='suscriptores' element={<SuscriptoresPanel/>}>

                      <Route index element={width < 500 ? <ListaSuscriptoresCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaSuscriptoresTablet proporcional={991 / width}/> : 
                                                          <ListaSuscriptores       proporcional={1920 / width} />}/>

                      <Route path='suscriptor/:usuario' element={width < 500 ? <DetallesSuscriptorCell   proporcional={499 / width}/> : 
                                                                 width < 991 ? <DetallesSuscriptorTablet proporcional={991 / width}/> : 
                                                                               <DetallesSuscriptor       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='noticias' element={width < 500 ? <NoticiasPanelCell   proporcional={499 / width}/> : 
                                                    width < 991 ? <NoticiasPanelTablet proporcional={991 / width}/> : 
                                                                  <NoticiasPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaNoticiasCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaNoticiasTablet proporcional={991 / width}/> : 
                                                          <ListaNoticias       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevaNoticiaCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevaNoticiaTablet proporcional={991 / width}/> : 
                                                                 <NuevaNoticia       proporcional={1920 / width} />}/>
                                                                
                      <Route path='noticia/:noticia/:id' element={width < 500 ? <DetallesNoticiaCell   proporcional={499 / width}/> : 
                                                                  width < 991 ? <DetallesNoticiaTablet proporcional={991 / width}/> : 
                                                                                <DetallesNoticia       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='categorias-noticias' element={width < 500 ? <CategoriasNoticiasPanelCell   proporcional={499 / width}/> : 
                                                               width < 991 ? <CategoriasNoticiasPanelTablet proporcional={991 / width}/> : 
                                                                             <CategoriasNoticiasPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaCategoriasNoticiasCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaCategoriasNoticiasTablet proporcional={991 / width}/> : 
                                                          <ListaCategoriasNoticias       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevaCategoriaNoticiaCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevaCategoriaNoticiaTablet proporcional={991 / width}/> : 
                                                                 <NuevaCategoriaNoticia       proporcional={1920 / width} />}/>
                                                                
                      <Route path='categoria-noticia/:categoria-noticia/:id' element={width < 500 ? <DetallesCategoriaNoticiaCell   proporcional={499 / width}/> : 
                                                                                      width < 991 ? <DetallesCategoriaNoticiaTablet proporcional={991 / width}/> : 
                                                                                                    <DetallesCategoriaNoticia       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='trabajadores' element={width < 500 ? <TrabajadoresPanelCell   proporcional={499 / width}/> : 
                                                        width < 991 ? <TrabajadoresPanelTablet proporcional={991 / width}/> : 
                                                                      <TrabajadoresPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaTrabajadoresCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaTrabajadoresTablet proporcional={991 / width}/> : 
                                                          <ListaTrabajadores       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevoTrabajadorCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevoTrabajadorTablet proporcional={991 / width}/> : 
                                                                 <NuevoTrabajador       proporcional={1920 / width} />}/>
                                                                
                      <Route path='trabajador/:trabajador/:id' element={width < 500 ? <DetallesTrabajadorCell   proporcional={499 / width}/> : 
                                                                        width < 991 ? <DetallesTrabajadorTablet proporcional={991 / width}/> : 
                                                                                      <DetallesTrabajador       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='areas-empresa' element={width < 500 ? <AreasEmpresaPanelCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <AreasEmpresaPanelTablet proporcional={991 / width}/> : 
                                                                       <AreasEmpresaPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaAreasEmpresaCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaAreasEmpresaTablet proporcional={991 / width}/> : 
                                                          <ListaAreasEmpresa       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevoAreaEmpresaCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevoAreaEmpresaTablet proporcional={991 / width}/> : 
                                                                 <NuevoAreaEmpresa       proporcional={1920 / width} />}/>
                                                                
                      <Route path='area-empresa/:area-empresa/:id' element={width < 500 ? <DetallesAreaEmpresaCell   proporcional={499 / width}/> : 
                                                                            width < 991 ? <DetallesAreaEmpresaTablet proporcional={991 / width}/> : 
                                                                                          <DetallesAreaEmpresa       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='gestion-proyectos' element={width < 500 ? <GestionProyectosPanelCell   proporcional={499 / width}/> : 
                                                             width < 991 ? <GestionProyectosPanelTablet proporcional={991 / width}/> : 
                                                                           <GestionProyectosPanel       proporcional={1920 / width} />}>

                      <Route index element={width < 500 ? <ListaGestionProyectosCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaGestionProyectosTablet proporcional={991 / width}/> : 
                                                          <ListaGestionProyectos       proporcional={1920 / width} />}/>

                      <Route path='nuevo' element={width < 500 ? <NuevaGestionProyectoCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <NuevaGestionProyectoTablet proporcional={991 / width}/> : 
                                                                 <NuevaGestionProyecto       proporcional={1920 / width} />}/>
                      
                      <Route path='datos/proyecto/:id' element={width < 500 ? <DatosGestionProyectoCell   proporcional={499 / width}/> : 
                                                                width < 991 ? <DatosGestionProyectoTablet proporcional={991 / width}/> : 
                                                                              <DatosGestionProyecto       proporcional={1920 / width} />}/>
                                                                
                      <Route path='proyecto/:proyecto/:id' element={width < 500 ? <DetallesGestionProyectoCell   proporcional={499 / width}/> : 
                                                                    width < 991 ? <DetallesGestionProyectoTablet proporcional={991 / width}/> : 
                                                                                  <DetallesGestionProyecto       proporcional={1920 / width} />}/>

                    </Route>

                    
                    
                    <Route path='notificaciones' element={<NotificacionesPanel/>}>

                      <Route index element={width < 500 ? <ListaNotificacionesCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaNotificacionesTablet proporcional={991 / width}/> : 
                                                          <ListaNotificaciones       proporcional={1920 / width} />}/>

                      <Route path='notificacion/:id' element={width < 500 ? <DetallesNotificacionCell   proporcional={499 / width}/> : 
                                                              width < 991 ? <DetallesNotificacionTablet proporcional={991 / width}/> : 
                                                                            <DetallesNotificacion       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='mensajes' element={<MensajesPanel/>}>

                      <Route index element={width < 500 ? <ListaMensajesCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaMensajesTablet proporcional={991 / width}/> : 
                                                          <ListaMensajes       proporcional={1920 / width} />}/>

                      <Route path='mensaje/:id' element={width < 500 ? <DetallesMensajeCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <DetallesMensajeTablet proporcional={991 / width}/> : 
                                                                       <DetallesMensaje       proporcional={1920 / width} />}/>

                    </Route>
                    
                    <Route path='reuniones' element={<ReunionesPanel/>}>

                      <Route index element={width < 500 ? <ListaReunionesCell   proporcional={499 / width}/> : 
                                            width < 991 ? <ListaReunionesTablet proporcional={991 / width}/> : 
                                                          <ListaReuniones       proporcional={1920 / width} />}/>

                      <Route path='reunion/:id' element={width < 500 ? <DetallesReunionCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <DetallesReunionTablet proporcional={991 / width}/> : 
                                                                       <DetallesReunion       proporcional={1920 / width} />}/>

                    </Route>

                  </Route>

              </Route>
          </Routes>
      </BrowserRouter>
    )
}
