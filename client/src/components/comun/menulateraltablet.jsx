import React, { useEffect, useState } from 'react'

import admin from '../../assets/iconos/menu/lateral/avatar_admin.png'
import logout from '../../assets/iconos/menu/lateral/logout.png'
import settings from '../../assets/iconos/menu/lateral/settings.png'

import right from '../../assets/iconos/menu/lateral/right.png'
import down from '../../assets/iconos/menu/lateral/down.png'
import dash from '../../assets/iconos/menu/lateral/dash.png'

import dashboard from '../../assets/iconos/menu/lateral/dashboard.png'
import clientes from '../../assets/iconos/menu/lateral/clientes.png'
import tipo_proyectos from '../../assets/iconos/menu/lateral/tipo_proyectos.png'
import proyectos from '../../assets/iconos/menu/lateral/proyectos.png'
import favoritos from '../../assets/iconos/menu/lateral/favoritos.png'
import calificaciones from '../../assets/iconos/menu/lateral/calificaciones.png'
import productos from '../../assets/iconos/menu/lateral/productos.png'
import categorias from '../../assets/iconos/menu/lateral/categorias.png'
import subcategorias from '../../assets/iconos/menu/lateral/subcategorias.png'
import medida from '../../assets/iconos/menu/lateral/medida.png'
import servicios from '../../assets/iconos/menu/lateral/servicios.png'
import compradores from '../../assets/iconos/menu/lateral/compradores.png'
import compras from '../../assets/iconos/menu/lateral/compras.png'
import presupuestos from '../../assets/iconos/menu/lateral/presupuestos.png'
import noticia from '../../assets/iconos/menu/lateral/noticia.png'
import suscriptores from '../../assets/iconos/menu/lateral/suscripciones.png'
import agenda from '../../assets/iconos/menu/lateral/agenda.png'
import facturacion from '../../assets/iconos/menu/lateral/facturacion.png'
import facturas from '../../assets/iconos/menu/lateral/facturas.png'
import finanzas from '../../assets/iconos/menu/lateral/finanzas.png'
import reportes from '../../assets/iconos/menu/lateral/reportes.png'
import trabajadores from '../../assets/iconos/menu/lateral/trabajadores.png'
import administradores from '../../assets/iconos/menu/lateral/administradores.png'
import empresa from '../..//assets/iconos/menu/lateral/area_empresa.png'

import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {begindata} from '../../redux/slice/begindata'
import { beginConstants } from '../../uri/begin-constants'
import { set_authenticated, set_open_menu_lateral } from '../../redux/actions/data'

export default function MenuLateralTablet ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [menu, setMenu] = useState('dashboard')
    const [seleccion_menu, setSeleccionMenu] = useState ('')

    const [over_menu, setOverMenu] = useState (false)

    const [sub_menu, setSubMenu] = useState('')
    const [seleccion_sub_menu, setSeleccionSubMenu] = useState ('')

    const {local_logout} = useSelector(({begin_data}) => begin_data)

    useEffect(() => {
        if (local_logout && local_logout.success === true){
            window.localStorage.removeItem('session_id')
            window.localStorage.removeItem('correo')
            window.localStorage.removeItem('user')
            dispatch (set_authenticated(false))
            dispatch (begindata(beginConstants(0, {}, true).local_logout))
            navigate ('/')
        }
    }, [local_logout])

    useEffect(() => {
        setMenu(location.pathname.split ('/')[2] === '' ? 'dashboard' : location.pathname.split ('/')[2])
    }, [location.pathname.split('/')[2]])

    useEffect(() => {
        const ruta = location.pathname.split ('/')[3] === undefined ? 'lista' : location.pathname.split('/')[3]
        const ruta_menu = location.pathname.split ('/')[2]
        setSubMenu(ruta === 'lista' ? `lista-${ruta_menu}` : ruta === 'nuevo' ? `nuevo-${ruta_menu.replace('s', '')}` : '')
    }, [location.pathname.split('/')[3]])

    const cerrar_sesion = () => {
        dispatch(begindata(beginConstants(0, {}, false).local_logout))
    }

    return (
        <div className='vh-100' style={{width: '100%', background: 'white'}}>
            <div style={{width: '100%', height: 'auto', padding: 40 / proporcional, background: '#007BFF'}}>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional, 
                            border: '1px solid #4a4a4a', background: 'white'}}>
                        <img src={admin} className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional,
                            padding: 32 / proporcional}}/>
                    </div>
                </div>
                <p style={{fontSize: 12 / proporcional, fontFamily: 'Merriweather', lineHeight: `${18 / proporcional}px`, 
                    marginBottom: 8 / proporcional, color: 'white', fontWeight: 500, textAlign: 'center'}}>
                    Nombre administrador
                </p>
            </div>
            <div className='' style={{width: '100%', height: '100%'}}>
                <div className={over_menu ? 'overflow-auto' : 'overflow-hidden'} 
                    style={{width: '100%', height: '55%', paddingTop: 40 / proporcional, paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional}}
                    onMouseOver={() => setOverMenu(true)} onMouseLeave={() => setOverMenu(false)}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, 
                        marginBottom: 5 / proporcional, paddingTop: 5 / proporcional, 
                            paddingBottom: 5 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setSeleccionMenu('dashboard')} onMouseLeave={() => setSeleccionMenu('')}>
                        <div className={seleccion_menu === 'dashboard' ? 'd-flex shadow-sm rounded' : 'd-flex'} 
                                style={{width: '100%', height: 30 / proporcional}} onClick={() => navigate ('/panel')}>
                            <img src={dashboard} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                marginBottom: 0 / proporcional, color: menu === 'dashboard' || seleccion_menu === 'dashboard' ?  '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                Panel principal
                            </p>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'clientes' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('clientes')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'clientes' ? '' : 'clientes')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={clientes} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'clientes' || seleccion_menu === 'clientes' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Nuestros clientes
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'clientes' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'clientes' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/clientes'); setSubMenu('lista-clientes');
                                                            dispatch (set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-clientes')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-clientes' || sub_menu === 'lista-clientes' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista clientes
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/clientes/nuevo'); setSubMenu('nuevo-cliente');
                                                        dispatch (set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-cliente')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-cliente' || sub_menu === 'nuevo-cliente' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nuevo cliente
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'tipo-proyectos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('tipo-proyectos')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'tipos-proyectos' ? '' : 'tipos-proyectos')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={tipo_proyectos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'tipo-proyectos' || seleccion_menu === 'tipo-proyectos' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Tipo proyectos
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'tipo-proyectos' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'tipos-proyectos' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/tipos-proyectos'); setSubMenu('lista-tipos-proyectos');
                                                        dispatch (set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-tipos-proyectos')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-tipos-proyectos' || sub_menu === 'lista-tipos-proyectos' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista tipo de proyectos
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/tipos-proyectos/nuevo'); setSubMenu('nuevo-tipo-proyecto');
                                                        dispatch (set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-tipo-proyecto')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-tipo-proyecto' || sub_menu === 'nuevo-tipo-proyecto' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nuevo tipo de proyecto
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'proyectos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('proyectos')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'proyectos' ? '' : 'proyectos')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={proyectos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'proyectos' || seleccion_menu === 'proyectos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Proyectos
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'proyectos' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'proyectos' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/proyectos'); setSubMenu('lista-proyectos');
                                                        dispatch (set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-proyectos')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-proyectos' || sub_menu === 'lista-proyectos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de proyectos
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/proyectos/nuevo'); setSubMenu('nuevo-proyecto');
                                                        dispatch (set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-proyecto')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-proyecto' || sub_menu === 'nuevo-proyecto' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nuevo proyecto
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'productos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('productos')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'productos' ? '' : 'productos')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={productos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'productos' || seleccion_menu === 'productos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Productos
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'productos' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'productos' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/productos'); setSubMenu('lista-productos');
                                                        dispatch (set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-productos')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-productos' || sub_menu === 'lista-productos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de productos
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/productos/nuevo'); setSubMenu('nuevo-producto');
                                                        dispatch (set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-producto')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-producto' || sub_menu === 'nuevo-producto' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nuevo producto
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'categorias' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('categorias')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'categorias' ? '' : 'categorias')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={categorias} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'categorias' || seleccion_menu === 'categorias' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Categorías
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'categorias' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'categorias' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/categorias'); setSubMenu('lista-categorias');
                                                        dispatch(set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-categorias')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-categorias' || sub_menu === 'lista-categorias' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de categorías
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/categorias/nuevo'); setSubMenu('nuevo-categoria');
                                                        dispatch(set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-categoria')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-categoria' || sub_menu === 'nuevo-categoria' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva categoría
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'subcategorias' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('subcategorias')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'subcategorias' ? '' : 'subcategorias')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={subcategorias} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'subcategorias' || seleccion_menu === 'subcategorias' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Sub categorías
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'subcategorias' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'subcategorias' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/subcategorias'); setSubMenu('lista-subcategorias');
                                                            dispatch(set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-subcategorias')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-subcategorias' || sub_menu === 'lista-subcategorias' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de sub categorías
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/subcategorias/nuevo'); setSubMenu('nuevo-subcategoria');
                                                            dispatch(set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-subcategoria')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-subcategoria' || sub_menu === 'nuevo-subcategoria' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva sub categoría
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'unidades' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('unidades')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'unidades' ? '' : 'unidades')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={medida} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'unidades' || seleccion_menu === 'unidades' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Unidades
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'unidades' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'unidades' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/unidades'); setSubMenu('lista-unidades');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-unidades')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-unidades' || sub_menu === 'lista-unidades' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista unidades
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/unidades/nuevo'); setSubMenu('nuevo-unidad');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-unidad')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-unidad' || sub_menu === 'nuevo-unidad' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva unidad
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'servicios' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('servicios')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'servicios' ? '' : 'servicios')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={servicios} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'servicios' || seleccion_menu === 'servicios' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Servicios
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'servicios' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'servicios' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/servicios'); setSubMenu('lista-servicios');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-servicios')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-servicios' || sub_menu === 'lista-servicios' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de servicios
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/servicios/nuevo'); setSubMenu('nuevo-servicio');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-servicio')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-servicio' || sub_menu === 'nuevo-servicio' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nuevo servicio
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'favoritos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('favoritos')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'favoritos' ? '' : 'favoritos')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={favoritos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'favoritos' || seleccion_menu === 'favoritos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Favoritos
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'favoritos' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'favoritos' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/favoritos'); setSubMenu('lista-favoritos');
                                                        dispatch(set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-favoritos')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-favoritos' || sub_menu === 'lista-favoritos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de favoritos
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'calificaciones' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('calificaciones')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'calificaciones' ? '' : 'calificaciones')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={calificaciones} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'calificaciones' || seleccion_menu === 'calificaciones' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Calificaciones
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'calificaciones' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'calificaciones' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/calificaciones'); setSubMenu('lista-calificaciones');
                                                        dispatch(set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-calificaciones')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-calificaciones' || sub_menu === 'lista-calificaciones' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de calificaciones
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'compradores' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('compradores')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'compradores' ? '' : 'compradores')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={compradores} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'compradores' || seleccion_menu === 'compradores' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Compradores
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'compradores' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'compradores' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/compradores'); setSubMenu('lista-compradores');
                                                        dispatch(set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-compradores')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-compradores' || sub_menu === 'lista-compradores' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de compradores
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'compras' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('compras')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'compras' ? '' : 'compras')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={compras} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'compras' || seleccion_menu === 'compras' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Compras
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'compras' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'compras' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/compras'); setSubMenu('lista-compras');
                                                        dispatch(set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-compras')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-compras' || sub_menu === 'lista-compras' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de compras
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'suscriptores' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('suscriptores')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'suscriptores' ? '' : 'suscriptores')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={suscriptores} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'suscriptores' || seleccion_menu === 'suscriptores' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Nuestros suscriptores
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'suscriptores' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'suscriptores' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/suscriptores'); setSubMenu('lista-suscriptores');
                                                        dispatch (set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-suscriptores')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-suscriptores' || sub_menu === 'lista-suscriptores' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista suscriptores
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional,  paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'noticia' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('noticia')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'noticia' ? '' : 'noticia')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={noticia} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'noticia' || seleccion_menu === 'noticia' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Noticias
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'noticia' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'noticia' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onMouseOver={() => setSeleccionSubMenu('lista-noticias')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}
                                                    onClick={() => {navigate ('/panel/noticias'); setSubMenu('lista-noticias');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-noticias' || sub_menu === 'lista-noticias' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de noticias
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-noticia')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}
                                                    onClick={() => {navigate ('/panel/noticias/nuevo'); setSubMenu('nuevo-noticia');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-noticia' || sub_menu === 'nuevo-noticia' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva noticia
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'categorias-noticias' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('categorias-noticias')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'categorias-noticias' ? '' : 'categorias-noticias')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={categorias} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'categorias-noticias' || seleccion_menu === 'categorias-noticias' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Categorías noticias
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'categorias-noticias' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'categorias-noticias' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/categorias-noticias'); setSubMenu('lista-categorias-noticias');
                                                        dispatch(set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-categorias-noticias')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-categorias-noticias' || sub_menu === 'lista-categorias-noticias' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de categorías
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/categorias-noticias/nuevo'); setSubMenu('nuevo-categoria-noticia');
                                                        dispatch(set_open_menu_lateral(true))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-categoria-noticia')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-categoria-noticia' || sub_menu === 'nuevo-categoria-noticia' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva categoría
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'empresa' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('empresa')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'empresa' ? '' : 'empresa')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={empresa} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'empresa' || seleccion_menu === 'empresa' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Áreas de la empresa
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'empresa' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'empresa' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/areas-empresa'); setSubMenu('lista-empresa');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-empresa')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-empresa' || sub_menu === 'lista-empresa' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista áreas empresa
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/areas-empresa/nuevo'); setSubMenu('nuevo-empresa');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-empresa')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-empresa' || sub_menu === 'nuevo-empresa' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva área empresa
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'trabajadores' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('trabajadores')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'trabajadores' ? '' : 'trabajadores')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={trabajadores} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'trabajadores' || seleccion_menu === 'trabajadores' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Trabajadores
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'trabajadores' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'trabajadores' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/trabajadores'); setSubMenu('lista-trabajadores');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-trabajadores')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-trabajadores' || sub_menu === 'lista-trabajadores' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista trabajadores
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/trabajadores/nuevo'); setSubMenu('nuevo-trabajador');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-trabajador')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-trabajador' || sub_menu === 'nuevo-trabajador' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nuevo trabajador
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'agenda' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('agenda')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'agenda' ? '' : 'agenda')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={agenda} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'agenda' || seleccion_menu === 'agenda' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Agenda
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'agenda' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'agenda' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/agenda'); setSubMenu('lista-agenda');
                                                        dispatch(set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-agenda')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-agenda' || sub_menu === 'lista-agenda' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Citas / reuniones
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/agenda/nuevo'); setSubMenu('nuevo-agenda');
                                                        dispatch(set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-agenda')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-agenda' || sub_menu === 'nuevo-agenda' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva cita / reunión
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'presupuestos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('presupuestos')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'presupuestos' ? '' : 'presupuestos')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={presupuestos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'presupuestos' || seleccion_menu === 'presupuestos' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Cotizaciones
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'presupuestos' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'presupuestos' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/presupuestos'); setSubMenu('lista-presupuestos');
                                                        dispatch(set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-presupuestos')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-presupuestos' || sub_menu === 'lista-presupuestos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de cotizaciones
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/presupuestos/nuevo'); setSubMenu('nuevo-presupuesto');
                                                        dispatch(set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-presupuesto')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-presupuesto' || sub_menu === 'nuevo-presupuesto' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva cotización
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'administradores' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('administradores')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'administradores' ? '' : 'administradores')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={administradores} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'administradores' || seleccion_menu === 'administradores' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Administradores
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'administradores' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'administradores' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/administradores'); setSubMenu('lista-administradores');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-administradores')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-administradores' || sub_menu === 'lista-administradores' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista administradores
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/administradores/nuevo'); setSubMenu('nuevo-admnistrador');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-admnistrador')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-admnistrador' || sub_menu === 'nuevo-admnistrador' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nuevo administrador
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'facturaciones' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('facturaciones')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'facturaciones' ? '' : 'facturaciones')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={facturacion} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'facturaciones' || seleccion_menu === 'facturaciones' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Facturación electrónica
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'facturaciones' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'facturaciones' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/facturacion-electronica'); setSubMenu('lista-facturaciones');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-facturaciones')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-facturaciones' || sub_menu === 'lista-facturaciones' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista facturación electrónica
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/facturacion-electronica/nuevo'); setSubMenu('nuevo-facturacion');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-facturacion')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-facturacion' || sub_menu === 'nuevo-facturacion' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva facturación
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'facturas' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('facturas')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'facturas' ? '' : 'facturas')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={facturas} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'facturas' || seleccion_menu === 'facturas' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Facturas / boletas
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'facturas' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'facturas' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/facturas'); setSubMenu('lista-facturas');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-facturas')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-facturas' || sub_menu === 'lista-facturas' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista facturas / boletas
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/factura/nuevo'); setSubMenu('nuevo-factura');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-factura')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-factura' || sub_menu === 'nuevo-factura' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva factura / boleta
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'finanzas' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('finanzas')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'finanzas' ? '' : 'finanzas')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={finanzas} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'finanzas' || seleccion_menu === 'finanzas' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Finanzas
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'reportes' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('reportes')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'reportes' ? '' : 'reportes')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={reportes} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'reportes' || seleccion_menu === 'reportes' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Reportes
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'reportes' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'reportes' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/reportes'); setSubMenu('lista-reportes');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-reportes')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-reportes' || sub_menu === 'lista-reportes' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista reportes
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/reporte/nuevo'); setSubMenu('nuevo-reporte');
                                                            dispatch (set_open_menu_lateral(true))
                                                    }}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-reporte')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-reporte' || sub_menu === 'nuevo-reporte' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nuevo reporte
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', padding: 40 / proporcional, paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional}}>
                    <div className='rounded-pill' style={{width: '100%', height: 2 / proporcional, background: '#007BFF',
                        marginTop: 5 / proporcional, marginBottom: 5 / proporcional}}/>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingTop: 5 / proporcional, 
                            paddingBottom: 5 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setSeleccionMenu('settings')} onMouseLeave={() => setSeleccionMenu('')}>
                        <div className={seleccion_menu === 'settings' ? 'd-flex shadow-sm rounded' : 'd-flex'} 
                                style={{width: '100%', height: 30 / proporcional}} 
                                onClick={() => {navigate ('/panel/settings'); dispatch (set_open_menu_lateral(true))}}>
                            <img src={settings} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                marginBottom: 0 / proporcional, color: menu === 'settings' || seleccion_menu === 'settings' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                Configuraciones
                            </p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingTop: 5 / proporcional, 
                            paddingBottom: 5 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setSeleccionMenu('logout')} onMouseLeave={() => setSeleccionMenu('')}>
                        <div className={seleccion_menu === 'logout' ? 'd-flex shadow-sm rounded' : 'd-flex'} 
                                style={{width: '100%', height: 30 / proporcional}} onClick={() => cerrar_sesion ()}>
                            <img src={logout} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                marginBottom: 0 / proporcional, color: menu === 'logout' || seleccion_menu === 'logout' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                Cerrar sesión
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
