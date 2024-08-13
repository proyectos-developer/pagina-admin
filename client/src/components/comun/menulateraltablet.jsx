import React, { useEffect, useState } from 'react'

import admin from '../../assets/iconos/menu/lateral/avatar_admin.png'
import logout from '../../assets/iconos/menu/lateral/logout.png'
import settings from '../../assets/iconos/menu/lateral/settings.png'

import right from '../../assets/iconos/menu/lateral/right.png'
import down from '../../assets/iconos/menu/lateral/down.png'
import dash from '../../assets/iconos/menu/lateral/dash.png'

import dashboard from '../../assets/iconos/menu/lateral/dashboard.png'
import clientes from '../../assets/iconos/menu/lateral/clientes.png'
import categorias from '../../assets/iconos/menu/lateral/categorias.png'
import proyectos from '../../assets/iconos/menu/lateral/proyectos.png'
import productos from '../../assets/iconos/menu/lateral/productos.png'
import favoritos from '../../assets/iconos/menu/lateral/favoritos.png'
import calificaciones from '../../assets/iconos/menu/lateral/calificaciones.png'
import compradores from '../../assets/iconos/menu/lateral/compradores.png'
import compras from '../../assets/iconos/menu/lateral/compras.png'
import presupuestos from '../../assets/iconos/menu/lateral/presupuestos.png'
import blog from '../../assets/iconos/menu/lateral/blog.png'
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

    const [sub_menu, setSubMenu] = useState('')
    const [seleccion_sub_menu, setSeleccionSubMenu] = useState ('')

    const {local_logout} = useSelector(({begin_data}) => begin_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

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
        <div style={{width: '100%', height: '100%'}}>
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
            <div style={{width: '100%', height: '100%', padding: 40 / proporcional, paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional}}>
                <div style={{width: '100%', height: '100%'}}>
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
                                                        dispatch(set_open_menu_lateral(!open_menu_lateral))
                                                    }}
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
                                                        dispatch(set_open_menu_lateral(!open_menu_lateral))
                                                    }}
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
                                    <img src={categorias} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
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
                                                        dispatch(set_open_menu_lateral(!open_menu_lateral))
                                                    }}
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
                                                        dispatch(set_open_menu_lateral(!open_menu_lateral))
                                                    }}
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
                                                        dispatch(set_open_menu_lateral(!open_menu_lateral))
                                                    }}
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
                                                        dispatch(set_open_menu_lateral(!open_menu_lateral))
                                                    }}
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
                                                        dispatch(set_open_menu_lateral(!open_menu_lateral))
                                                    }}
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
                                                        dispatch(set_open_menu_lateral(!open_menu_lateral))
                                                    }}
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
                            <div className={seleccion_menu === 'favoritos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('favoritos')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'favoritos' ? '' : 'favoritos')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={favoritos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'favoritos' || seleccion_menu === 'favoritos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        favoritos
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
                                                            dispatch (set_open_menu_lateral(!open_menu_lateral))}}
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
                                        calificaciones
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
                                                            dispatch (set_open_menu_lateral(!open_menu_lateral))}}
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
                                                        dispatch (set_open_menu_lateral(!open_menu_lateral))
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
                                                        dispatch (set_open_menu_lateral(!open_menu_lateral))}}
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
                            <div className={seleccion_menu === 'presupuestos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('presupuestos')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'presupuestos' ? '' : 'presupuestos')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={presupuestos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'presupuestos' || seleccion_menu === 'presupuestos' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Presupuestos
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
                                                        dispatch (set_open_menu_lateral(!open_menu_lateral))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista-presupuestos')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-presupuestos' || sub_menu === 'lista-presupuestos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de presupuestos
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/presupuestos/nuevo'); setSubMenu('nuevo-presupuesto');
                                                        dispatch (set_open_menu_lateral(!open_menu_lateral))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-presupuesto')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-presupuesto' || sub_menu === 'nuevo-presupuesto' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nuevo presupuesto
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional,  paddingBottom: 5 / proporcional}}>
                            <div className={seleccion_menu === 'blog' ? 'd-flex justify-content-between rounded shadow-sm' :
                                    'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setSeleccionMenu('blog')} onMouseLeave={() => setSeleccionMenu('')}
                                onClick={() => setMenu(menu === 'blog' ? '' : 'blog')}>
                                <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                    <img src={blog} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                            paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                    <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                        marginBottom: 0 / proporcional, color: menu === 'blog' || seleccion_menu === 'blog' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                        Nuestro blog
                                    </p>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                    <img src={menu === 'blog' ? down : right} style={{width: 30 / proporcional, 
                                        height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                        {
                            menu === 'blog' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onMouseOver={() => setSeleccionSubMenu('lista-blog')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}
                                                    onClick={() => {navigate ('/panel/noticias'); setSubMenu('lista-blog');
                                                        dispatch (set_open_menu_lateral(!open_menu_lateral))}}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-blog' || sub_menu === 'lista-blog' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de noticias
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-blog')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}
                                                    onClick={() => {navigate ('/panel/panel/noticias/nuevo'); setSubMenu('nuevo-blog');
                                                        dispatch (set_open_menu_lateral(!open_menu_lateral))}}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-blog' || sub_menu === 'nuevo-blog' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nueva noticia
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className='rounded-pill' style={{width: '100%', height: 2 / proporcional, background: '#007BFF',
                        marginTop: 5 / proporcional, marginBottom: 5 / proporcional}}/>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, 
                            marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingTop: 5 / proporcional, 
                            paddingBottom: 5 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setSeleccionMenu('settings')} onMouseLeave={() => setSeleccionMenu('')}>
                        <div className={seleccion_menu === 'settings' ? 'd-flex shadow-sm rounded' : 'd-flex'} 
                                style={{width: '100%', height: 30 / proporcional}} onClick={() => navigate ('/panel/settings')}>
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
