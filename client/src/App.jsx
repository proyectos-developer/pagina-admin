import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './styles.css'

import GlobalPanel from './components/global/panel.jsx'

/**------------------------Session login, olvido, cambio ------------------------*/
import SessionPanel from './components/inicio/session/panel.jsx'
import SessionPanelTablet from './components/inicio/session/paneltablet.jsx'
import SessionPanelCell from './components/inicio/session/panelcell.jsx'

import LoginSession from './components/inicio/session/login.jsx'
import LoginSessionTablet from './components/inicio/session/logintablet.jsx'
import LoginSessionCell from './components/inicio/session/logincell.jsx'

import OlvidoPassword from './components/inicio/session/olvidopassword.jsx'
import OlvidoPasswordTablet from './components/inicio/session/olvidopasswordtablet.jsx'
import OlvidoPasswordCell from './components/inicio/session/olvidopasswordcell.jsx'

import CambioPassword from './components/inicio/session/cambiopassword.jsx'
import CambioPasswordTablet from './components/inicio/session/cambiopasswordtablet.jsx'
import CambioPasswordCell from './components/inicio/session/cambiopasswordcell.jsx'
/*------------------------------------------*/
/*------------------------------------------*/

/**------------------------Panel ------------------------*/
import HomePanel from './components/home/panel.jsx'
import HomePanelTablet from './components/home/paneltablet.jsx'
import HomePanelCell from './components/home/panelcell.jsx'

import DashboardPanel from './components/dashboard/panel.jsx'
import DashboardPanelTablet from './components/dashboard/paneltablet.jsx'
import DashboardPanelCell from './components/dashboard/panelcell.jsx'
/*------------------------------------------*/

/**---------------------------------Empresa ------------------------------------------------*/
import ModuloEmpresaPanel from './components/empresa/panel.jsx'
import ModuloEmpresaPanelTablet from './components/empresa/paneltablet.jsx'
import ModuloEmpresaPanelCell from './components/empresa/panelcell.jsx'

import EmpresaDashboard from './components/empresa/dashboard.jsx'
import EmpresaDashboardTablet from './components/empresa/dashboardtablet.jsx'
import EmpresaDashboardCell from './components/empresa/dashboardcell.jsx'

/**------------------------Áreas empresa------------------------*/
import DepartamentosEmpresaPanel from './components/empresa/departamento/panel.jsx'
import DepartamentosEmpresaPanelTablet from './components/empresa/departamento/paneltablet.jsx'
import DepartamentosEmpresaPanelCell from './components/empresa/departamento/panelcell.jsx'

import ListaDepartamentosEmpresa from './components/empresa/departamento/lista.jsx'
import ListaDepartamentosEmpresaTablet from './components/empresa/departamento/listatablet.jsx'
import ListaDepartamentosEmpresaCell from './components/empresa/departamento/listacell.jsx'

import NuevoDepartamento from './components/empresa/departamento/nuevo.jsx'
import NuevoDepartamentoTablet from './components/empresa/departamento/nuevotablet.jsx'
import NuevoDepartamentoCell from './components/empresa/departamento/nuevocell.jsx'

import DetallesDepartamento from './components/empresa/departamento/detalles.jsx'
import DetallesDepartamentoTablet from './components/empresa/departamento/detallestablet.jsx'
import DetallesDepartamentoCell from './components/empresa/departamento/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Servicios ------------------------*/
import ServiciosPanel from './components/empresa/servicios/panel.jsx'
import ServiciosPanelTablet from './components/empresa/servicios/paneltablet.jsx'
import ServiciosPanelCell from './components/empresa/servicios/panelcell.jsx'

import ListaServicios from './components/empresa/servicios/lista.jsx'
import ListaServiciosTablet from './components/empresa/servicios/listatablet.jsx'
import ListaServiciosCell from './components/empresa/servicios/listacell.jsx'

import NuevoServicio from './components/empresa/servicios/nuevo.jsx'
import NuevoServicioTablet from './components/empresa/servicios/nuevotablet.jsx'
import NuevoServicioCell from './components/empresa/servicios/nuevocell.jsx'

import DetallesServicio from './components/empresa/servicios/detalles.jsx'
import DetallesServicioTablet from './components/empresa/servicios/detallestablet.jsx'
import DetallesServicioCell from './components/empresa/servicios/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Agenda------------------------*/
import AgendaPanelEmpresa from './components/empresa/agenda/panel.jsx'
import AgendaPanelEmpresaTablet from './components/empresa/agenda/paneltablet.jsx'
import AgendaPanelEmpresaCell from './components/empresa/agenda/panelcell.jsx'

import CalendarioEmpresa from './components/empresa/agenda/calendario.jsx'
import CalendarioEmpresaTablet from './components/empresa/agenda/calendariotablet.jsx'
import CalendarioEmpresaCell from './components/empresa/agenda/calendariocell.jsx'

import ListaReunionesAgendadas from './components/empresa/agenda/lista.jsx'
import ListaReunionesAgendadasTablet from './components/empresa/agenda/listatablet.jsx'
import ListaReunionesAgendadasCell from './components/empresa/agenda/listacell.jsx'

import DetallesReunionAgendada from './components/empresa/agenda/detalles.jsx'
import DetallesReunionAgendadaTablet from './components/empresa/agenda/detallestablet.jsx'
import DetallesReunionAgendadaCell from './components/empresa/agenda/detallescell.jsx'
/*------------------------------------------*/
/*------------------------------------------*/

/**------------------------------------------------Proyectos ------------------------------------------------*/
import ModuloProjectsPanel from './components/proyectos/projects/panel.jsx'
import ModuloProjectsPanelTablet from './components/proyectos/projects/paneltablet.jsx'
import ModuloProjectsPanelCell from './components/proyectos/projects/panelcell.jsx'

import ProjectsDashboard from './components/proyectos/projects/dashboard.jsx'
import ProjectsDashboardTablet from './components/proyectos/projects/dashboardtablet.jsx'
import ProjectsDashboardCell from './components/proyectos/projects/dashboardcell.jsx'

/**------------------------Clientes ------------------------*/
import NegociosPanel from './components/proyectos/negocios/panel.jsx'
import NegociosPanelTablet from './components/proyectos/negocios/paneltablet.jsx'
import NegociosPanelCell from './components/proyectos/negocios/panelcell.jsx'

import ListaNegocios from './components/proyectos/negocios/lista.jsx'
import ListaNegociosTablet from './components/proyectos/negocios/listatablet.jsx'
import ListaNegociosCell from './components/proyectos/negocios/listacell.jsx'

import NuevoNegocio from './components/proyectos/negocios/nuevo.jsx'
import NuevoNegocioTablet from './components/proyectos/negocios/nuevotablet.jsx'
import NuevoNegocioCell from './components/proyectos/negocios/nuevocell.jsx'

import DetallesNegocio from './components/proyectos/negocios/detalles.jsx'
import DetallesNegocioTablet from './components/proyectos/negocios/detallestablet.jsx'
import DetallesNegocioCell from './components/proyectos/negocios/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Tipo Proyectos ------------------------*/
import TiposProyectosPanel from './components/proyectos/tipos/panel.jsx'
import TiposProyectosPanelTablet from './components/proyectos/tipos/paneltablet.jsx'
import TiposProyectosPanelCell from './components/proyectos/tipos/panelcell.jsx'

import ListaTiposProyectos from './components/proyectos/tipos/lista.jsx'
import ListaTiposProyectosTablet from './components/proyectos/tipos/listatablet.jsx'
import ListaTiposProyectosCell from './components/proyectos/tipos/listacell.jsx'

import NuevoTipoProyecto from './components/proyectos/tipos/nuevo.jsx'
import NuevoTipoProyectoTablet from './components/proyectos/tipos/nuevotablet.jsx'
import NuevoTipoProyectoCell from './components/proyectos/tipos/nuevocell.jsx'

import DetallesTipoProyecto from './components/proyectos/tipos/detalles.jsx'
import DetallesTipoProyectoTablet from './components/proyectos/tipos/detallestablet.jsx'
import DetallesTipoProyectoCell from './components/proyectos/tipos/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Proyectos ------------------------*/
import ProyectosPanel from './components/proyectos/proyectos/panel.jsx'
import ProyectosPanelTablet from './components/proyectos/proyectos/paneltablet.jsx'
import ProyectosPanelCell from './components/proyectos/proyectos/panelcell.jsx'

import ListaProyectos from './components/proyectos/proyectos/lista.jsx'
import ListaProyectosTablet from './components/proyectos/proyectos/listatablet.jsx'
import ListaProyectosCell from './components/proyectos/proyectos/listacell.jsx'

import NuevoProyecto from './components/proyectos/proyectos/nuevo.jsx'
import NuevoProyectoTablet from './components/proyectos/proyectos/nuevotablet.jsx'
import NuevoProyectoCell from './components/proyectos/proyectos/nuevocell.jsx'

import DetallesProyecto from './components/proyectos/proyectos/detalles.jsx'
import DetallesProyectoTablet from './components/proyectos/proyectos/detallestablet.jsx'
import DetallesProyectoCell from './components/proyectos/proyectos/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Gestión de proyectos ------------------------*/
import GestionProyectosPanel from './components/proyectos/gestion/proyecto/panel.jsx'
import GestionProyectosPanelTablet from './components/proyectos/gestion/proyecto/paneltablet.jsx'
import GestionProyectosPanelCell from './components/proyectos/gestion/proyecto/panelcell.jsx'

import ListaGestionProyectos from './components/proyectos/gestion/proyecto/lista.jsx'
import ListaGestionProyectosTablet from './components/proyectos/gestion/proyecto/listatablet.jsx'
import ListaGestionProyectosCell from './components/proyectos/gestion/proyecto/listacell.jsx'

import NuevaGestionProyecto from './components/proyectos/gestion/proyecto/nuevo.jsx'
import NuevaGestionProyectoTablet from './components/proyectos/gestion/proyecto/nuevotablet.jsx'
import NuevaGestionProyectoCell from './components/proyectos/gestion/proyecto/nuevocell.jsx'

import DetallesGestionProyecto from './components/proyectos/gestion/proyecto/detalles.jsx'
import DetallesGestionProyectoTablet from './components/proyectos/gestion/proyecto/detallestablet.jsx'
import DetallesGestionProyectoCell from './components/proyectos/gestion/proyecto/detallescell.jsx'
/*------------------------------------------*/
/*------------------------------------------*/


/**------------------------Tienda ------------------------*/
import ModuloTiendaPanel from './components/tienda/tienda/panel.jsx'
import ModuloTiendaPanelTablet from './components/tienda/tienda/paneltablet.jsx'
import ModuloTiendaPanelCell from './components/tienda/tienda/panelcell.jsx'

import TiendaDashboard from './components/tienda/tienda/dashboard.jsx'
import TiendaDashboardTablet from './components/tienda/tienda/dashboardtablet.jsx'
import TiendaDashboardCell from './components/tienda/tienda/dashboardcell.jsx'

/**------------------------Compradores ------------------------*/
import CompradoresPanel from './components/tienda/compradores/panel.jsx'

import ListaCompradores from './components/tienda/compradores/lista.jsx'
import ListaCompradoresTablet from './components/tienda/compradores/listatablet.jsx'
import ListaCompradoresCell from './components/tienda/compradores/listacell.jsx'

import DetallesComprador from './components/tienda/compradores/detalles.jsx'
import DetallesCompradorTablet from './components/tienda/compradores/detallestablet.jsx'
import DetallesCompradorCell from './components/tienda/compradores/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Compras ------------------------*/
import CarritoComprasPanel from './components/tienda/carrito/panel.jsx'

import ListaCarritoCompras from './components/tienda/carrito/lista.jsx'
import ListaCarritoComprasTablet from './components/tienda/carrito/listatablet.jsx'
import ListaCarritoComprasCell from './components/tienda/carrito/listacell.jsx'

import DetallesCompra from './components/tienda/carrito/detalles.jsx'
import DetallesCompraTablet from './components/tienda/carrito/detallestablet.jsx'
import DetallesCompraCell from './components/tienda/carrito/detallescell.jsx'
/*------------------------------------------*/
/*------------------------------------------*/


/**------------------------Almacén ------------------------*/
import ModuloAlmacenPanel from './components/almacen/almacen/panel.jsx'
import ModuloAlmacenPanelTablet from './components/almacen/almacen/paneltablet.jsx'
import ModuloAlmacenPanelCell from './components/almacen/almacen/panelcell.jsx'

import AlmacenDashboard from './components/almacen/almacen/dashboard.jsx'
import AlmacenDashboardTablet from './components/almacen/almacen/dashboardtablet.jsx'
import AlmacenDashboardCell from './components/almacen/almacen/dashboardcell.jsx'

/**------------------------Proveedores ------------------------*/
import ProveedoresPanel from './components/almacen/proveedores/panel.jsx'
import ProveedoresPanelTablet from './components/almacen/proveedores/paneltablet.jsx'
import ProveedoresPanelCell from './components/almacen/proveedores/panelcell.jsx'

import ListaProveedores from './components/almacen/proveedores/lista.jsx'
import ListaProveedoresTablet from './components/almacen/proveedores/listatablet.jsx'
import ListaProveedoresCell from './components/almacen/proveedores/listacell.jsx'

import NuevoProveedor from './components/almacen/proveedores/nuevo.jsx'
import NuevoProveedorTablet from './components/almacen/proveedores/nuevotablet.jsx'
import NuevoProveedorCell from './components/almacen/proveedores/nuevocell.jsx'

import DetallesProveedor from './components/almacen/proveedores/detalles.jsx'
import DetallesProveedorTablet from './components/almacen/proveedores/detallestablet.jsx'
import DetallesProveedorCell from './components/almacen/proveedores/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Marcas ------------------------*/
import MarcasPanel from './components/almacen/marcas/panel.jsx'
import MarcasPanelTablet from './components/almacen/marcas/paneltablet.jsx'
import MarcasPanelCell from './components/almacen/marcas/panelcell.jsx'

import ListaMarcas from './components/almacen/marcas/lista.jsx'
import ListaMarcasTablet from './components/almacen/marcas/listatablet.jsx'
import ListaMarcasCell from './components/almacen/marcas/listacell.jsx'

import NuevaMarca from './components/almacen/marcas/nuevo.jsx'
import NuevaMarcaTablet from './components/almacen/marcas/nuevotablet.jsx'
import NuevaMarcaCell from './components/almacen/marcas/nuevocell.jsx'

import DetallesMarca from './components/almacen/marcas/detalles.jsx'
import DetallesMarcaTablet from './components/almacen/marcas/detallestablet.jsx'
import DetallesMarcaCell from './components/almacen/marcas/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Productos ------------------------*/
import ProductosPanel from './components/almacen/productos/panel.jsx'
import ProductosPanelTablet from './components/almacen/productos/paneltablet.jsx'
import ProductosPanelCell from './components/almacen/productos/panelcell.jsx'

import ListaProductos from './components/almacen/productos/lista.jsx'
import ListaProductosTablet from './components/almacen/productos/listatablet.jsx'
import ListaProductosCell from './components/almacen/productos/listacell.jsx'

import NuevoProducto from './components/almacen/productos/nuevo.jsx'
import NuevoProductoTablet from './components/almacen/productos/nuevotablet.jsx'
import NuevoProductoCell from './components/almacen/productos/nuevocell.jsx'

import DetallesProducto from './components/almacen/productos/detalles.jsx'
import DetallesProductoTablet from './components/almacen/productos/detallestablet.jsx'
import DetallesProductoCell from './components/almacen/productos/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Categorías ------------------------*/
import CategoriasPanel from './components/almacen/categorias/panel.jsx'
import CategoriasPanelTablet from './components/almacen/categorias/paneltablet.jsx'
import CategoriasPanelCell from './components/almacen/categorias/panelcell.jsx'

import ListaCategorias from './components/almacen/categorias/lista.jsx'
import ListaCategoriasTablet from './components/almacen/categorias/listatablet.jsx'
import ListaCategoriasCell from './components/almacen/categorias/listacell.jsx'

import NuevaCategoria from './components/almacen/categorias/nuevo.jsx'
import NuevaCategoriaTablet from './components/almacen/categorias/nuevotablet.jsx'
import NuevaCategoriaCell from './components/almacen/categorias/nuevocell.jsx'

import DetallesCategoria from './components/almacen/categorias/detalles.jsx'
import DetallesCategoriaTablet from './components/almacen/categorias/detallestablet.jsx'
import DetallesCategoriaCell from './components/almacen/categorias/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Sub categorías ------------------------*/
import SubCategoriasPanel from './components/almacen/subcategorias/panel.jsx'
import SubCategoriasPanelTablet from './components/almacen/subcategorias/paneltablet.jsx'
import SubCategoriasPanelCell from './components/almacen/subcategorias/panelcell.jsx'

import ListaSubCategorias from './components/almacen/subcategorias/lista.jsx'
import ListaSubCategoriasTablet from './components/almacen/subcategorias/listatablet.jsx'
import ListaSubCategoriasCell from './components/almacen/subcategorias/listacell.jsx'

import NuevaSubCategoria from './components/almacen/subcategorias/nuevo.jsx'
import NuevaSubCategoriaTablet from './components/almacen/subcategorias/nuevotablet.jsx'
import NuevaSubCategoriaCell from './components/almacen/subcategorias/nuevocell.jsx'

import DetallesSubCategoria from './components/almacen/subcategorias/detalles.jsx'
import DetallesSubCategoriaTablet from './components/almacen/subcategorias/detallestablet.jsx'
import DetallesSubCategoriaCell from './components/almacen/subcategorias/detallescell.jsx'

/**------------------------Unidades ------------------------*/
import UnidadesPanel from './components/almacen/unidades/panel.jsx'
import UnidadesPanelTablet from './components/almacen/unidades/paneltablet.jsx'
import UnidadesPanelCell from './components/almacen/unidades/panelcell.jsx'

import ListaUnidades from './components/almacen/unidades/lista.jsx'
import ListaUnidadesTablet from './components/almacen/unidades/listatablet.jsx'
import ListaUnidadesCell from './components/almacen/unidades/listacell.jsx'

import NuevaUnidad from './components/almacen/unidades/nuevo.jsx'
import NuevaUnidadTablet from './components/almacen/unidades/nuevotablet.jsx'
import NuevaUnidadCell from './components/almacen/unidades/nuevocell.jsx'

import DetallesUnidad from './components/almacen/unidades/detalles.jsx'
import DetallesUnidadTablet from './components/almacen/unidades/detallestablet.jsx'
import DetallesUnidadCell from './components/almacen/unidades/detallescell.jsx'
/*------------------------------------------*/
/*------------------------------------------*/


/**------------------------Estdadísticas ------------------------*/
import ModuloEstadisticasPanel from './components/estadisticas/estadisticas/panel.jsx'
import ModuloEstadisticasPanelTablet from './components/estadisticas/estadisticas/paneltablet.jsx'
import ModuloEstadisticasPanelCell from './components/estadisticas/estadisticas/panelcell.jsx'

import EstadisticasDashboard from './components/estadisticas/estadisticas/dashboard.jsx'
import EstadisticasDashboardTablet from './components/estadisticas/estadisticas/dashboardtablet.jsx'
import EstadisticasDashboardCell from './components/estadisticas/estadisticas/dashboardcell.jsx'

/**------------------------Favoritos ------------------------*/
import FavoritosPanel from './components/estadisticas/favoritos/panel.jsx'

import ListaFavoritos from './components/estadisticas/favoritos/lista.jsx'
import ListaFavoritosTablet from './components/estadisticas/favoritos/listatablet.jsx'
import ListaFavoritosCell from './components/estadisticas/favoritos/listacell.jsx'

import DetallesProductoFavorito from './components/estadisticas/favoritos/detalles.jsx'
import DetallesProductoFavoritoTablet from './components/estadisticas/favoritos/detallestablet.jsx'
import DetallesProductoFavoritoCell from './components/estadisticas/favoritos/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Comentarios ------------------------*/
import ComentariosPanel from './components/estadisticas/comentarios/panel.jsx'

import ListaComentarios from './components/estadisticas/comentarios/lista.jsx'
import ListaComentariosTablet from './components/estadisticas/comentarios/listatablet.jsx'
import ListaComentariosCell from './components/estadisticas/comentarios/listacell.jsx'

import DetallesComentariosProducto from './components/estadisticas/comentarios/detalles.jsx'
import DetallesComentariosProductoTablet from './components/estadisticas/comentarios/detallestablet.jsx'
import DetallesComentariosProductoCell from './components/estadisticas/comentarios/detallescell.jsx'
/*------------------------------------------*/
/*------------------------------------------*/


/**------------------------Otros ------------------------*/
import ModuloOtrosPanel from './components/otros/otros/panel.jsx'
import ModuloOtrosPanelTablet from './components/otros/otros/paneltablet.jsx'
import ModuloOtrosPanelCell from './components/otros/otros/panelcell.jsx'

import OtrosDashboard from './components/otros/otros/dashboard.jsx'
import OtrosDashboardTablet from './components/otros/otros/dashboardtablet.jsx'
import OtrosDashboardCell from './components/otros/otros/dashboardcell.jsx'
/**------------------------Suscripctores ------------------------*/
import SuscriptoresPanel from './components/otros/suscripcion/panel.jsx'

import ListaSuscriptores from './components/otros/suscripcion/lista.jsx'
import ListaSuscriptoresTablet from './components/otros/suscripcion/listatablet.jsx'
import ListaSuscriptoresCell from './components/otros/suscripcion/listacell.jsx'

import DetallesSuscriptor from './components/otros/suscripcion/detalles.jsx'
import DetallesSuscriptorTablet from './components/otros/suscripcion/detallestablet.jsx'
import DetallesSuscriptorCell from './components/otros/suscripcion/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Categorías de noticias ------------------------*/
import CategoriasNoticiasPanel from './components/otros/categorias/panel.jsx'
import CategoriasNoticiasPanelTablet from './components/otros/categorias/paneltablet.jsx'
import CategoriasNoticiasPanelCell from './components/otros/categorias/panelcell.jsx'

import ListaCategoriasNoticias from './components/otros/categorias/lista.jsx'
import ListaCategoriasNoticiasTablet from './components/otros/categorias/listatablet.jsx'
import ListaCategoriasNoticiasCell from './components/otros/categorias/listacell.jsx'

import NuevaCategoriaNoticia from './components/otros/categorias/nuevo.jsx'
import NuevaCategoriaNoticiaTablet from './components/otros/categorias/nuevotablet.jsx'
import NuevaCategoriaNoticiaCell from './components/otros/categorias/nuevocell.jsx'

import DetallesCategoriaNoticia from './components/otros/categorias/detalles.jsx'
import DetallesCategoriaNoticiaTablet from './components/otros/categorias/detallestablet.jsx'
import DetallesCategoriaNoticiaCell from './components/otros/categorias/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Noticias ------------------------*/
import NoticiasPanel from './components/otros/noticias/panel.jsx'
import NoticiasPanelTablet from './components/otros/noticias/paneltablet.jsx'
import NoticiasPanelCell from './components/otros/noticias/panelcell.jsx'

import ListaNoticias from './components/otros/noticias/lista.jsx'
import ListaNoticiasTablet from './components/otros/noticias/listatablet.jsx'
import ListaNoticiasCell from './components/otros/noticias/listacell.jsx'

import NuevaNoticia from './components/otros/noticias/nuevo.jsx'
import NuevaNoticiaTablet from './components/otros/noticias/nuevotablet.jsx'
import NuevaNoticiaCell from './components/otros/noticias/nuevocell.jsx'

import DetallesNoticia from './components/otros/noticias/detalles.jsx'
import DetallesNoticiaTablet from './components/otros/noticias/detallestablet.jsx'
import DetallesNoticiaCell from './components/otros/noticias/detallescell.jsx'
/*------------------------------------------*/
/*------------------------------------------*/

/**------------------------R.R.H.H ------------------------*/
import ModuloRrHhPanel from './components/rrhh/panel.jsx'
import ModuloRrHhPanelTablet from './components/rrhh/paneltablet.jsx'
import ModuloRrHhPanelCell from './components/rrhh/panelcell.jsx'

import RrHhDashboard from './components/rrhh/dashboard.jsx'
import RrHhDashboardTablet from './components/rrhh/dashboardtablet.jsx'
import RrHhDashboardCell from './components/rrhh/dashboardcell.jsx'

/**------------------------Personal ------------------------*/
import PersonalPanel from './components/rrhh/personal/panel.jsx'
import PersonalPanelTablet from './components/rrhh/personal/paneltablet.jsx'
import PersonalPanelCell from './components/rrhh/personal/panelcell.jsx'

import ListaPersonal from './components/rrhh/personal/lista.jsx'
import ListaPersonalTablet from './components/rrhh/personal/listatablet.jsx'
import ListaPersonalCell from './components/rrhh/personal/listacell.jsx'

import NuevoPersonal from './components/rrhh/personal/nuevo.jsx'
import NuevoPersonalTablet from './components/rrhh/personal/nuevotablet.jsx'
import NuevoPersonalCell from './components/rrhh/personal/nuevocell.jsx'

import DetallesPersonal from './components/rrhh/personal/detalles.jsx'
import DetallesPersonalTablet from './components/rrhh/personal/detallestablet.jsx'
import DetallesPersonalCell from './components/rrhh/personal/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Estado trabajo ------------------------*/
import EstadoTrabajoPanel from './components/rrhh/estadotrabajo/panel.jsx'
import EstadoTrabajoPanelTablet from './components/rrhh/estadotrabajo/paneltablet.jsx'
import EstadoTrabajoPanelCell from './components/rrhh/estadotrabajo/panelcell.jsx'

import ListaEstadoTrabajo from './components/rrhh/estadotrabajo/lista.jsx'
import ListaEstadoTrabajoTablet from './components/rrhh/estadotrabajo/listatablet.jsx'
import ListaEstadoTrabajoCell from './components/rrhh/estadotrabajo/listacell.jsx'

import NuevoEstadoTrabajo from './components/rrhh/estadotrabajo/nuevo.jsx'
import NuevoEstadoTrabajoTablet from './components/rrhh/estadotrabajo/nuevotablet.jsx'
import NuevoEstadoTrabajoCell from './components/rrhh/estadotrabajo/nuevocell.jsx'

import DetallesEstadoTrabajo from './components/rrhh/estadotrabajo/detalles.jsx'
import DetallesEstadoTrabajoTablet from './components/rrhh/estadotrabajo/detallestablet.jsx'
import DetallesEstadoTrabajoCell from './components/rrhh/estadotrabajo/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Asistencias ------------------------*/
import AsistenciasPanel from './components/rrhh/asistencias/panel.jsx'
import AsistenciasPanelTablet from './components/rrhh/asistencias/paneltablet.jsx'
import AsistenciasPanelCell from './components/rrhh/asistencias/panelcell.jsx'

import ListaAsistencias from './components/rrhh/asistencias/lista.jsx'
import ListaAsistenciasTablet from './components/rrhh/asistencias/listatablet.jsx'
import ListaAsistenciasCell from './components/rrhh/asistencias/listacell.jsx'

import NuevaAsistencia from './components/rrhh/asistencias/nuevo.jsx'
import NuevaAsistenciaTablet from './components/rrhh/asistencias/nuevotablet.jsx'
import NuevaAsistenciaCell from './components/rrhh/asistencias/nuevocell.jsx'

import DetallesAsistencia from './components/rrhh/asistencias/detalles.jsx'
import DetallesAsistenciaTablet from './components/rrhh/asistencias/detallestablet.jsx'
import DetallesAsistenciaCell from './components/rrhh/asistencias/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Cumpleaños ------------------------*/
import CumpleaniosPanel from './components/rrhh/cumpleanios/panel.jsx'
import CumpleaniosPanelTablet from './components/rrhh/cumpleanios/paneltablet.jsx'
import CumpleaniosPanelCell from './components/rrhh/cumpleanios/panelcell.jsx'

import ListaCumpleanios from './components/rrhh/cumpleanios/lista.jsx'
import ListaCumpleaniosTablet from './components/rrhh/cumpleanios/listatablet.jsx'
import ListaCumpleaniosCell from './components/rrhh/cumpleanios/listacell.jsx'
/*------------------------------------------*/

/**------------------------Nominas ------------------------*/
import NominasPanel from './components/rrhh/nominas/panel.jsx'
import NominasPanelTablet from './components/rrhh/nominas/paneltablet.jsx'
import NominasPanelCell from './components/rrhh/nominas/panelcell.jsx'

import ListaNominas from './components/rrhh/nominas/lista.jsx'
import ListaNominasTablet from './components/rrhh/nominas/listatablet.jsx'
import ListaNominasCell from './components/rrhh/nominas/listacell.jsx'

import NuevaNomina from './components/rrhh/nominas/nuevo.jsx'
import NuevaNominaTablet from './components/rrhh/nominas/nuevotablet.jsx'
import NuevaNominaCell from './components/rrhh/nominas/nuevocell.jsx'

import DetallesNomina from './components/rrhh/nominas/detalles.jsx'
import DetallesNominaTablet from './components/rrhh/nominas/detallestablet.jsx'
import DetallesNominaCell from './components/rrhh/nominas/detallescell.jsx'
/*------------------------------------------*/
/*------------------------------------------*/


/**------------------------Menú superior ------------------------*/
/**------------------------Notificaciones ------------------------*/
import NotificacionesPanel from './components/notificaciones/notificaciones/panel.jsx'

import ListaNotificaciones from './components/notificaciones/notificaciones/lista.jsx'
import ListaNotificacionesTablet from './components/notificaciones/notificaciones/listatablet.jsx'
import ListaNotificacionesCell from './components/notificaciones/notificaciones/listacell.jsx'

import DetallesNotificacion from './components/notificaciones/notificaciones/detalles.jsx'
import DetallesNotificacionTablet from './components/notificaciones/notificaciones/detallestablet.jsx'
import DetallesNotificacionCell from './components/notificaciones/notificaciones/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Mensajes ------------------------*/
import MensajesPanel from './components/notificaciones/mensajes/panel.jsx'

import ListaMensajes from './components/notificaciones/mensajes/lista.jsx'
import ListaMensajesTablet from './components/notificaciones/mensajes/listatablet.jsx'
import ListaMensajesCell from './components/notificaciones/mensajes/listacell.jsx'

import DetallesMensaje from './components/notificaciones/mensajes/detalles.jsx'
import DetallesMensajeTablet from './components/notificaciones/mensajes/detallestablet.jsx'
import DetallesMensajeCell from './components/notificaciones/mensajes/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Reuniones ------------------------*/
import ReunionesPanel from './components/notificaciones/reuniones/panel.jsx'

import ListaReuniones from './components/notificaciones/reuniones/lista.jsx'
import ListaReunionesTablet from './components/notificaciones/reuniones/listatablet.jsx'
import ListaReunionesCell from './components/notificaciones/reuniones/listacell.jsx'

import DetallesReunion from './components/notificaciones/reuniones/detalles.jsx'
import DetallesReunionTablet from './components/notificaciones/reuniones/detallestablet.jsx'
import DetallesReunionCell from './components/notificaciones/reuniones/detallescell.jsx'
/*------------------------------------------*/

/**------------------------Contabilidad ------------------------*/
import ModuloContabilidadPanel from './components/contabilidad/contabilidad/panel.jsx'
import ModuloContabilidadPanelTablet from './components/contabilidad/contabilidad/paneltablet.jsx'
import ModuloContabilidadPanelCell from './components/contabilidad/contabilidad/panelcell.jsx'

import ContabilidadDashboard from './components/contabilidad/contabilidad/dashboard.jsx'
import ContabilidadDashboardTablet from './components/contabilidad/contabilidad/dashboardtablet.jsx'
import ContabilidadDashboardCell from './components/contabilidad/contabilidad/dashboardcell.jsx'

/**------------------------Facturación ------------------------*/
import FacturacionPanel from './components/contabilidad/facturacion/panel.jsx'
import FacturacionPanelTablet from './components/contabilidad/facturacion/paneltablet.jsx'
import FacturacionPanelCell from './components/contabilidad/facturacion/panelcell.jsx'

import ListaFacturacion from './components/contabilidad/facturacion/lista.jsx'
import ListaFacturacionTablet from './components/contabilidad/facturacion/listatablet.jsx'
import ListaFacturacionCell from './components/contabilidad/facturacion/listacell.jsx'

import NuevaFactura from './components/contabilidad/facturacion/nuevo.jsx'
import NuevaFacturaTablet from './components/contabilidad/facturacion/nuevotablet.jsx'
import NuevaFacturaCell from './components/contabilidad/facturacion/nuevocell.jsx'

import DetallesFactura from './components/contabilidad/facturacion/detalles.jsx'
import DetallesFacturaTablet from './components/contabilidad/facturacion/detallestablet.jsx'
import DetallesFacturaCell from './components/contabilidad/facturacion/detallescell.jsx'
/*------------------------------------------*/
/*------------------------------------------*/

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

                      {/**Empresa servicio, departamentos, agenda, administradores*/}
                      <Route path='empresa' element={width < 500 ? <ModuloEmpresaPanelCell   proporcional={499 / width}/> : 
                                                     width < 991 ? <ModuloEmpresaPanelTablet proporcional={991 / width}/> : 
                                                                   <ModuloEmpresaPanel       proporcional={1920 / width} />}>

                          <Route index element={width < 500 ? <EmpresaDashboardCell   proporcional={499 / width}/> : 
                                                width < 991 ? <EmpresaDashboardTablet proporcional={991 / width}/> : 
                                                              <EmpresaDashboard       proporcional={1920 / width} />}/>

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
                          
                          <Route path='departamentos' element={width < 500 ? <DepartamentosEmpresaPanelCell   proporcional={499 / width}/> : 
                                                               width < 991 ? <DepartamentosEmpresaPanelTablet proporcional={991 / width}/> : 
                                                                             <DepartamentosEmpresaPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaDepartamentosEmpresaCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaDepartamentosEmpresaTablet proporcional={991 / width}/> : 
                                                                <ListaDepartamentosEmpresa       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevoDepartamentoCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevoDepartamentoTablet proporcional={991 / width}/> : 
                                                                       <NuevoDepartamento       proporcional={1920 / width} />}/>
                                                                      
                            <Route path='departamento/:departamento/:id' element={width < 500 ? <DetallesDepartamentoCell   proporcional={499 / width}/> : 
                                                                                  width < 991 ? <DetallesDepartamentoTablet proporcional={991 / width}/> : 
                                                                                                <DetallesDepartamento       proporcional={1920 / width} />}/>

                          </Route>
                          
                          <Route path='agenda' element={width < 500 ? <AgendaPanelEmpresaCell   proporcional={499 / width}/> : 
                                                        width < 991 ? <AgendaPanelEmpresaTablet proporcional={991 / width}/> : 
                                                                      <AgendaPanelEmpresa       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <CalendarioEmpresaCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <CalendarioEmpresaTablet proporcional={991 / width}/> : 
                                                                <CalendarioEmpresa       proporcional={1920 / width} />}/>

                            <Route path='reuniones' element={width < 500 ? <ListaReunionesAgendadasCell   proporcional={499 / width}/> : 
                                                             width < 991 ? <ListaReunionesAgendadasTablet proporcional={991 / width}/> : 
                                                                           <ListaReunionesAgendadas       proporcional={1920 / width} />}/>
                                                                      
                            <Route path='reunion/:reunion/:id' element={width < 500 ? <DetallesReunionAgendadaCell   proporcional={499 / width}/> : 
                                                                        width < 991 ? <DetallesReunionAgendadaTablet proporcional={991 / width}/> : 
                                                                                      <DetallesReunionAgendada       proporcional={1920 / width} />}/>

                          </Route>
                      </Route>
                      {/**---------------------------------------------------------------*/}

                      {/** Recursos humanos trabajadores (personal), nominas*/} 
                      <Route path='rrhh' element={width < 500 ? <ModuloRrHhPanelCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ModuloRrHhPanelTablet proporcional={991 / width}/> : 
                                                                <ModuloRrHhPanel       proporcional={1920 / width} />}>

                          <Route index element={width < 500 ? <RrHhDashboardCell   proporcional={499 / width}/> : 
                                                width < 991 ? <RrHhDashboardTablet proporcional={991 / width}/> : 
                                                              <RrHhDashboard       proporcional={1920 / width} />}/>

                          <Route path='personal' element={width < 500 ? <PersonalPanelCell proporcional={499 / width}/> : 
                                                          width < 991 ? <PersonalPanelTablet proporcional={991 / width}/> : 
                                                                        <PersonalPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaPersonalCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaPersonalTablet proporcional={991 / width}/> : 
                                                                <ListaPersonal       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevoPersonalCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevoPersonalTablet proporcional={991 / width}/> : 
                                                                       <NuevoPersonal       proporcional={1920 / width} />}/>
                                                                       
                            <Route path='trabajador/:trabajador/:id' element={width < 500 ? <DetallesPersonalCell   proporcional={499 / width}/> : 
                                                                              width < 991 ? <DetallesPersonalTablet proporcional={991 / width}/> : 
                                                                                            <DetallesPersonal       proporcional={1920 / width} />}/>

                          </Route>

                          <Route path='nominas' element={width < 500 ? <NominasPanelCell proporcional={499 / width}/> : 
                                                         width < 991 ? <NominasPanelTablet proporcional={991 / width}/> : 
                                                                       <NominasPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaNominasCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaNominasTablet proporcional={991 / width}/> : 
                                                                <ListaNominas       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevaNominaCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevaNominaTablet proporcional={991 / width}/> : 
                                                                       <NuevaNomina       proporcional={1920 / width} />}/>
                                                                      
                            <Route path='nomina/:trabajador/:id' element={width < 500 ? <DetallesNominaCell   proporcional={499 / width}/> : 
                                                                          width < 991 ? <DetallesNominaTablet proporcional={991 / width}/> : 
                                                                                        <DetallesNomina       proporcional={1920 / width} />}/>

                          </Route>

                          <Route path='estado-trabajo' element={width < 500 ? <EstadoTrabajoPanelCell proporcional={499 / width}/> : 
                                                                width < 991 ? <EstadoTrabajoPanelTablet proporcional={991 / width}/> : 
                                                                              <EstadoTrabajoPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaEstadoTrabajoCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaEstadoTrabajoTablet proporcional={991 / width}/> : 
                                                                <ListaEstadoTrabajo       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevoEstadoTrabajoCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevoEstadoTrabajoTablet proporcional={991 / width}/> : 
                                                                       <NuevoEstadoTrabajo       proporcional={1920 / width} />}/>
                                                                      
                            <Route path='trabajador/:id' element={width < 500 ? <DetallesEstadoTrabajoCell   proporcional={499 / width}/> : 
                                                                  width < 991 ? <DetallesEstadoTrabajoTablet proporcional={991 / width}/> : 
                                                                                <DetallesEstadoTrabajo       proporcional={1920 / width} />}/>
                          </Route>

                          <Route path='asistencias' element={width < 500 ? <AsistenciasPanelCell proporcional={499 / width}/> : 
                                                             width < 991 ? <AsistenciasPanelTablet proporcional={991 / width}/> : 
                                                                           <AsistenciasPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaAsistenciasCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaAsistenciasTablet proporcional={991 / width}/> : 
                                                                <ListaAsistencias       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevaAsistenciaCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevaAsistenciaTablet proporcional={991 / width}/> : 
                                                                       <NuevaAsistencia       proporcional={1920 / width} />}/>

                            <Route path='trabajador/:id' element={width < 500 ? <DetallesAsistenciaCell   proporcional={499 / width}/> : 
                                                                  width < 991 ? <DetallesAsistenciaTablet proporcional={991 / width}/> : 
                                                                                <DetallesAsistencia       proporcional={1920 / width} />}/>

                          </Route>

                          <Route path='cumpleanios' element={width < 500 ? <CumpleaniosPanelCell proporcional={499 / width}/> : 
                                                             width < 991 ? <CumpleaniosPanelTablet proporcional={991 / width}/> : 
                                                                           <CumpleaniosPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaCumpleaniosCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaCumpleaniosTablet proporcional={991 / width}/> : 
                                                                <ListaCumpleanios       proporcional={1920 / width} />}/>

                          </Route>
                      </Route>
                      {/**---------------------------------------------------------------*/}
                      
                      {/**Contabilidad Finanzas, facturación electrónica, facturas / boletas*/}
                      <Route path='contabilidad' element={width < 500 ? <ModuloContabilidadPanelCell   proporcional={499 / width}/> : 
                                                          width < 991 ? <ModuloContabilidadPanelTablet proporcional={991 / width}/> :  
                                                                        <ModuloContabilidadPanel       proporcional={1920 / width} />}>

                          <Route index element={width < 500 ? <ContabilidadDashboardCell   proporcional={499 / width}/> : 
                                                width < 991 ? <ContabilidadDashboardTablet proporcional={991 / width}/> : 
                                                              <ContabilidadDashboard       proporcional={1920 / width} />}/>

                          <Route path='facturacion' element={width < 500 ? <FacturacionPanelCell proporcional={499 / width}/> : 
                                                             width < 991 ? <FacturacionPanelTablet proporcional={991 / width}/> : 
                                                                           <FacturacionPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaFacturacionCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaFacturacionTablet proporcional={991 / width}/> : 
                                                                <ListaFacturacion       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevaFacturaCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevaFacturaTablet proporcional={991 / width}/> : 
                                                                       <NuevaFactura       proporcional={1920 / width} />}/>
                                                                      
                            <Route path='factura/:id' element={width < 500 ? <DetallesFacturaCell   proporcional={499 / width}/> : 
                                                               width < 991 ? <DetallesFacturaTablet proporcional={991 / width}/> : 
                                                                             <DetallesFactura       proporcional={1920 / width} />}/>

                          </Route>
                      </Route>
                      {/**---------------------------------------------------------------*/}

                      {/**Proyectos clientes tipos-proyectos, proyectos gestión de proyectos*/}
                      <Route path='proyectos' element={width < 500 ? <ModuloProjectsPanelCell   proporcional={499 / width}/> : 
                                                       width < 991 ? <ModuloProjectsPanelTablet proporcional={991 / width}/> :  
                                                                     <ModuloProjectsPanel       proporcional={1920 / width} />}>

                          <Route index element={width < 500 ? <ProjectsDashboardCell   proporcional={499 / width}/> : 
                                                width < 991 ? <ProjectsDashboardTablet proporcional={991 / width}/> : 
                                                              <ProjectsDashboard       proporcional={1920 / width} />}/>

                          <Route path='negocios' element={width < 500 ? <NegociosPanelCell   proporcional={499 / width}/> : 
                                                          width < 991 ? <NegociosPanelTablet proporcional={991 / width}/> : 
                                                                        <NegociosPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaNegociosCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaNegociosTablet proporcional={991 / width}/> : 
                                                                <ListaNegocios       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevoNegocioCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevoNegocioTablet proporcional={991 / width}/> : 
                                                                       <NuevoNegocio       proporcional={1920 / width} />}/>
                                                                      
                            <Route path='negocio/:negocio/:id' element={width < 500 ? <DetallesNegocioCell   proporcional={499 / width}/> : 
                                                                        width < 991 ? <DetallesNegocioTablet proporcional={991 / width}/> : 
                                                                                      <DetallesNegocio       proporcional={1920 / width} />}/>

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
                                                                      
                            <Route path='proyecto/:id' element={width < 500 ? <DetallesProyectoCell   proporcional={499 / width}/> : 
                                                                width < 991 ? <DetallesProyectoTablet proporcional={991 / width}/> : 
                                                                              <DetallesProyecto       proporcional={1920 / width} />}/>

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
                                                                      
                            <Route path='proyecto/:proyecto/:id' element={width < 500 ? <DetallesGestionProyectoCell   proporcional={499 / width}/> : 
                                                                          width < 991 ? <DetallesGestionProyectoTablet proporcional={991 / width}/> : 
                                                                                        <DetallesGestionProyecto       proporcional={1920 / width} />}/>
                          </Route>
                      </Route>
                      {/**---------------------------------------------------------------*/}

                      {/**Almacén productos, categorías, sub categorías, unidades*/}
                      <Route path='almacen' element={width < 500 ? <ModuloAlmacenPanelCell   proporcional={499 / width}/> : 
                                                     width < 991 ? <ModuloAlmacenPanelTablet proporcional={991 / width}/> :  
                                                                   <ModuloAlmacenPanel       proporcional={1920 / width} />}>

                          <Route index element={width < 500 ? <AlmacenDashboardCell   proporcional={499 / width}/> : 
                                                width < 991 ? <AlmacenDashboardTablet proporcional={991 / width}/> : 
                                                              <AlmacenDashboard       proporcional={1920 / width} />}/>

                          <Route path='proveedores' element={width < 500 ? <ProveedoresPanelCell   proporcional={499 / width}/> : 
                                                             width < 991 ? <ProveedoresPanelTablet proporcional={991 / width}/> : 
                                                                           <ProveedoresPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaProveedoresCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaProveedoresTablet proporcional={991 / width}/> : 
                                                                <ListaProveedores       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevoProveedorCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevoProveedorTablet proporcional={991 / width}/> : 
                                                                       <NuevoProveedor       proporcional={1920 / width} />}/>
                                                                      
                            <Route path='proveedor/:proveedor/:id' element={width < 500 ? <DetallesProveedorCell   proporcional={499 / width}/> : 
                                                                            width < 991 ? <DetallesProveedorTablet proporcional={991 / width}/> : 
                                                                                          <DetallesProveedor       proporcional={1920 / width} />}/>

                          </Route>
                          
                          <Route path='marcas' element={width < 500 ? <MarcasPanelCell   proporcional={499 / width}/> : 
                                                        width < 991 ? <MarcasPanelTablet proporcional={991 / width}/> : 
                                                                      <MarcasPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaMarcasCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaMarcasTablet proporcional={991 / width}/> : 
                                                                <ListaMarcas       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevaMarcaCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevaMarcaTablet proporcional={991 / width}/> : 
                                                                       <NuevaMarca       proporcional={1920 / width} />}/>
                                                                      
                            <Route path='marca/:marca/:id' element={width < 500 ? <DetallesMarcaCell   proporcional={499 / width}/> : 
                                                                    width < 991 ? <DetallesMarcaTablet proporcional={991 / width}/> : 
                                                                                  <DetallesMarca       proporcional={1920 / width} />}/>

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
                          
                          <Route path='sub-categorias' element={width < 500 ? <SubCategoriasPanelCell   proporcional={499 / width}/> : 
                                                                width < 991 ? <SubCategoriasPanelTablet proporcional={991 / width}/> : 
                                                                              <SubCategoriasPanel       proporcional={1920 / width} />}>

                            <Route index element={width < 500 ? <ListaSubCategoriasCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaSubCategoriasTablet proporcional={991 / width}/> : 
                                                                <ListaSubCategorias       proporcional={1920 / width} />}/>

                            <Route path='nuevo' element={width < 500 ? <NuevaSubCategoriaCell   proporcional={499 / width}/> : 
                                                         width < 991 ? <NuevaSubCategoriaTablet proporcional={991 / width}/> : 
                                                                       <NuevaSubCategoria       proporcional={1920 / width} />}/>
                                                                      
                            <Route path='sub-categoria/:subcategoria/:id' element={width < 500 ? <DetallesSubCategoriaCell   proporcional={499 / width}/> : 
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
                      </Route>
                      {/**---------------------------------------------------------------*/}

                      {/**Tienda compradores, compras*/}
                      <Route path='tienda' element={width < 500 ? <ModuloTiendaPanelCell   proporcional={499 / width}/> : 
                                                    width < 991 ? <ModuloTiendaPanelTablet proporcional={991 / width}/> :  
                                                                  <ModuloTiendaPanel       proporcional={1920 / width} />}>

                          <Route index element={width < 500 ? <TiendaDashboardCell   proporcional={499 / width}/> : 
                                                width < 991 ? <TiendaDashboardTablet proporcional={991 / width}/> : 
                                                              <TiendaDashboard       proporcional={1920 / width} />}/>

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
                      </Route>
                      {/**---------------------------------------------------------------*/}
                      
                      {/**Estdísticas favoritos, calificaciones, reportes*/}
                      <Route path='estadisticas' element={width < 500 ? <ModuloEstadisticasPanelCell   proporcional={499 / width}/> : 
                                                          width < 991 ? <ModuloEstadisticasPanelTablet proporcional={991 / width}/> :  
                                                                        <ModuloEstadisticasPanel       proporcional={1920 / width} />}>

                          <Route index element={width < 500 ? <EstadisticasDashboardCell   proporcional={499 / width}/> : 
                                                width < 991 ? <EstadisticasDashboardTablet proporcional={991 / width}/> : 
                                                              <EstadisticasDashboard       proporcional={1920 / width} />}/>
                                                                
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
                      </Route>
                      {/**---------------------------------------------------------------*/}
                      
                      {/**Otros Suscriptores, noticias, categorías noticias*/}
                      <Route path='otros' element={width < 500 ? <ModuloOtrosPanelCell   proporcional={499 / width}/> : 
                                                   width < 991 ? <ModuloOtrosPanelTablet proporcional={991 / width}/> :  
                                                                 <ModuloOtrosPanel       proporcional={1920 / width} />}>

                          <Route index element={width < 500 ? <OtrosDashboardCell   proporcional={499 / width}/> : 
                                                width < 991 ? <OtrosDashboardTablet proporcional={991 / width}/> : 
                                                              <OtrosDashboard       proporcional={1920 / width} />}/>

                          <Route path='suscriptores' element={<SuscriptoresPanel/>}>

                            <Route index element={width < 500 ? <ListaSuscriptoresCell   proporcional={499 / width}/> : 
                                                  width < 991 ? <ListaSuscriptoresTablet proporcional={991 / width}/> : 
                                                                <ListaSuscriptores       proporcional={1920 / width} />}/>

                            <Route path='suscriptor/:usuario' element={width < 500 ? <DetallesSuscriptorCell   proporcional={499 / width}/> : 
                                                                       width < 991 ? <DetallesSuscriptorTablet proporcional={991 / width}/> : 
                                                                                     <DetallesSuscriptor       proporcional={1920 / width} />}/>

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
                      </Route>
                      {/**---------------------------------------------------------------*/}
                      
                      {/**Menú superior Alertas de notificaciones, mensajes, reuniones, etc*/}
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
                      {/**---------------------------------------------------------------*/}

                  </Route>

              </Route>
          </Routes>
      </BrowserRouter>
    )
}
