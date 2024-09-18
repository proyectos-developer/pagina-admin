import React, { useEffect, useState } from 'react'

import menu_empresa_blue from '../../../assets/iconos/menu/lateral/menu_empresa_blue.png'
import menu_rrhh_blue from '../../../assets/iconos/menu/lateral/menu_rrhh_blue.png'
import menu_proyectos_blue from '../../../assets/iconos/menu/lateral/menu_proyectos_blue.png'
import menu_almacen_blue from '../../../assets/iconos/menu/lateral/menu_almacen_blue.png'
import menu_tienda_blue from '../../../assets/iconos/menu/lateral/menu_tienda_blue.png'
import menu_estadisticas_blue from '../../../assets/iconos/menu/lateral/menu_estadisticas_blue.png'
import menu_contabilidad_blue from '../../../assets/iconos/menu/lateral/menu_contabilidad_blue.png'
import menu_otros_blue from '../../../assets/iconos/menu/lateral/menu_otros_blue.png'

import menu_empresa_white from '../../../assets/iconos/menu/lateral/menu_empresa_white.png'
import menu_rrhh_white from '../../../assets/iconos/menu/lateral/menu_rrhh_white.png'
import menu_proyectos_white from '../../../assets/iconos/menu/lateral/menu_proyectos_white.png'
import menu_almacen_white from '../../../assets/iconos/menu/lateral/menu_almacen_white.png'
import menu_tienda_white from '../../../assets/iconos/menu/lateral/menu_tienda_white.png'
import menu_estadisticas_white from '../../../assets/iconos/menu/lateral/menu_estadisticas_white.png'
import menu_contabilidad_white from '../../../assets/iconos/menu/lateral/menu_contabilidad_white.png'
import menu_otros_white from '../../../assets/iconos/menu/lateral/menu_otros_white.png'
import { useLocation, useNavigate } from 'react-router-dom'

export default function MenuSuperiorPanelCell ({proporcional}) {

    const location = useLocation()
    const navigate = useNavigate()

    const [pagina, setPagina] = useState('')
    const [seleccion_menu, setSeleccionMenu] = useState('')
    const [seleccion_sub_menu, setSeleccionSubMenu] = useState('')

    useEffect(() => {
        setPagina(location.pathname.split ('/')[2] === undefined ? '' : location.pathname.split ('/')[2])
    }, [location.pathname])

    return (
        <div style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional, marginBottom: 16 / proporcional}}>
                <div className={seleccion_menu === 'empresa' ? 'position-relative shadow-lg rounded' :
                        'shadow-sm rounded-pill'} 
                    style={{width: '48%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'empresa' ?
                        '#00b7ff' : 'white'}}
                    onMouseOver={() => setSeleccionMenu('empresa')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'empresa' ? menu_empresa_white : menu_empresa_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'empresa' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Empresa</p>
                    </div>
                    {
                        seleccion_menu === 'empresa' ? (
                            <div className='position-absolute start-0' 
                                style={{width: '100%', height: 'auto', padding: 20 / proporcional, background: '#007bff', zIndex: 99999, top: 60 / proporcional}}>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'panel-empresa' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('panel-empresa')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/empresa')}>Panel</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'servicios' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('servicios')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/empresa/servicios')}>Servicios</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'departamentos' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('departamentos')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/empresa/departamentos')}>Departamentos</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'calendario' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('calendario')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/empresa/calendario')}>Calendario</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'administradores' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('administradores')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/empresa/administradores')}>Administradores</p>
                            </div>
                        ) : null
                    }
                </div>
                <div className={seleccion_menu === 'rrhh' ? 'position-relative shadow-lg rounded' :
                        'shadow-sm rounded-pill'} 
                    style={{width: '48%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'rrhh' ?
                        '#00b7ff' : 'white'}}
                    onMouseOver={() => setSeleccionMenu('rrhh')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'rrhh' ? menu_rrhh_white : menu_rrhh_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'rrhh' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>R.R.H.H</p>
                    </div>
                    {
                        seleccion_menu === 'rrhh' ? (
                            <div className='position-absolute start-0' 
                                style={{width: '100%', height: 'auto', padding: 20 / proporcional, background: '#007bff', zIndex: 99999, top: 60 / proporcional}}>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'panel-rrhh' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('panel-rrhh')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/rrhh')}>Panel</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'personal' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('personal')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/rrhh/personal')}>Perosnal</p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional, marginBottom: 16 / proporcional}}>
                <div className={seleccion_menu === 'proyectos' ? 'position-relative shadow-lg rounded' :
                        'shadow-sm rounded-pill'} 
                    style={{width: '48%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'proyectos' ?
                        '#00b7ff' : 'white'}}
                    onMouseOver={() => setSeleccionMenu('proyectos')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'proyectos' ? menu_proyectos_white : menu_proyectos_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'proyectos' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Proyectos</p>
                    </div>
                    {
                        seleccion_menu === 'proyectos' ? (
                            <div className='position-absolute start-0' 
                                style={{width: '100%', height: 'auto', padding: 20 / proporcional, background: '#007bff', zIndex: 99999, top: 60 / proporcional}}>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'panel-proyectos' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('panel-proyectos')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/proyectos')}>Panel</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'clientes' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('clientes')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/proyectos/clientes')}>Clientes</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'tipos-proyectos' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('tipos-proyectos')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/proyectos/tipos-proyectos')}>Tipos proyectos</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'proyectos' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('proyectos')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/proyectos/proyectos')}>Proyectos</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'gestion-proyectos' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('gestion-proyectos')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/proyectos/gestion-proyectos')}>Gestión de proyectos</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'cotizaciones' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('cotizaciones')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/proyectos/cotizaciones')}>Cotizaciones</p>
                            </div>
                        ) : null
                    }
                </div>
                <div className={seleccion_menu === 'almacen' ? 'position-relative shadow-lg rounded' :
                        'shadow-sm rounded-pill'} 
                    style={{width: '48%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'almacen' ?
                        '#00b7ff' : 'white'}}
                    onMouseOver={() => setSeleccionMenu('almacen')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'almacen' ? menu_almacen_white : menu_almacen_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'almacen' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Almacén</p>
                    </div>
                    {
                        seleccion_menu === 'almacen' ? (
                            <div className='position-absolute start-0' 
                                style={{width: '100%', height: 'auto', padding: 20 / proporcional, background: '#007bff', zIndex: 99999, top: 60 / proporcional}}>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'panel-almacen' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('panel-almacen')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/almacen')}>Panel</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'productos' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('productos')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/almacen/productos')}>Productos</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'categorias' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('categorias')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/almacen/categorias')}>Categorías</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'sub-categorias' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('sub-categorias')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/almacen/sub-categorias')}>Sub categorías</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'unidades' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('unidades')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/almacen/unidades')}>Unidades</p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional, marginBottom: 16 / proporcional}}>
                <div className={seleccion_menu === 'tienda' ? 'position-relative shadow-lg rounded' :
                        'shadow-sm rounded-pill'} 
                    style={{width: '48%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'tienda' ?
                        '#00b7ff' : 'white'}}
                    onMouseOver={() => setSeleccionMenu('tienda')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'tienda' ? menu_tienda_white : menu_tienda_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'tienda' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Tienda</p>
                    </div>
                    {
                        seleccion_menu === 'tienda' ? (
                            <div className='position-absolute start-0' 
                                style={{width: '100%', height: 'auto', padding: 20 / proporcional, background: '#007bff', zIndex: 99999, top: 60 / proporcional}}>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'panel-tienda' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('panel-tienda')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/tienda')}>Panel</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'compradores' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('compradores')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/tienda/compradores')}>Compradores</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'compras' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('compras')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/tienda/compras')}>Compras</p>
                            </div>
                        ) : null
                    }
                </div>
                <div className={seleccion_menu === 'estadisticas' ? 'position-relative shadow-lg rounded' :
                        'shadow-sm rounded-pill'} 
                    style={{width: '48%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'estadisticas' ?
                        '#00b7ff' : 'white'}}
                    onMouseOver={() => setSeleccionMenu('estadisticas')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'estadisticas' ? menu_estadisticas_white : menu_estadisticas_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'estadisticas' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Estadísticas</p>
                    </div>
                    {
                        seleccion_menu === 'estadisticas' ? (
                            <div className='position-absolute start-0' 
                                style={{width: '100%', height: 'auto', padding: 20 / proporcional, background: '#007bff', zIndex: 99999, top: 60 / proporcional}}>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'panel-estadisticas' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('panel-estadisticas')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/estadisticas')}>Panel</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'favoritos' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('favoritos')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/estadisticas/favoritos')}>Favoritos</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'calificaciones' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('calificaciones')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/estadisticas/calificaciones')}>Calificaciones</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'reportes' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('reportes')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/estadisticas/reportes')}>Reportes</p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                <div className={seleccion_menu === 'contabilidad' ? 'position-relative shadow-lg rounded' :
                        'shadow-sm rounded-pill'} 
                    style={{width: '48%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'contabilidad' ?
                        '#00b7ff' : 'white'}}
                    onMouseOver={() => setSeleccionMenu('contabilidad')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'contabilidad' ? menu_contabilidad_white : menu_contabilidad_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'contabilidad' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Contabilidad</p>
                    </div>
                    {
                        seleccion_menu === 'contabilidad' ? (
                            <div className='position-absolute start-0' 
                                style={{width: '100%', height: 'auto', padding: 20 / proporcional, background: '#007bff', zIndex: 99999, top: 60 / proporcional}}>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'panel-contabilidad' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('panel-contabilidad')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/contabilidad')}>Panel</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'facturacion' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('facturacion')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/contabilidad/facturacion')}>Facturación electrónica</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'facturas' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('facturas')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/contabilidad/facturas')}>Facturas / boletas</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'finanzas' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('finanzas')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/contabilidad/finanzas')}>Finanzas</p>
                            </div>
                        ) : null
                    }
                </div>
                <div className={seleccion_menu === 'otros' ? 'position-relative shadow-lg rounded' :
                        'shadow-sm rounded-pill'} 
                    style={{width: '48%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'otros' ?
                        '#00b7ff' : 'white'}}
                    onMouseOver={() => setSeleccionMenu('otros')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'otros' ? menu_otros_white : menu_otros_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'otros' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Otros</p>
                    </div>
                    {
                        seleccion_menu === 'otros' ? (
                            <div className='position-absolute start-0' 
                                style={{width: '100%', height: 'auto', padding: 20 / proporcional, background: '#007bff', zIndex: 99999, top: 60 / proporcional}}>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'panel-otros' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('panel-otros')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/otros')}>Panel</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'suscriptores' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('suscriptores')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/otros/suscriptores')}>Suscriptores</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'categorias-noticias' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('categorias-noticias')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/otros/categorias-noticias')}>Categorías noticias</p>
                                <p style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                                    color: seleccion_sub_menu === 'noticias' ? '#4a4a4a' : 'white', fontFamily: 'Poppins, sans-serif'}}
                                    onMouseOver={() => setSeleccionSubMenu('noticias')} onMouseLeave={() => setSeleccionSubMenu('')}
                                    onClick={() => navigate('/panel/otros/noticias')}>Noticias</p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}
