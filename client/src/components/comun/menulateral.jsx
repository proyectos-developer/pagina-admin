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
import blog from '../../assets/iconos/menu/lateral/blog.png'
import suscriptores from '../../assets/iconos/menu/lateral/suscripciones.png'

import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {begindata} from '../../redux/slice/begindata'
import { beginConstants } from '../../uri/begin-constants'
import { set_authenticated } from '../../redux/actions/data'

export default function MenuLateral ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [menu, setMenu] = useState('dashboard')
    const [seleccion_menu, setSeleccionMenu] = useState ('')

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
                                                    onClick={() => {navigate ('/panel/clientes'); setSubMenu('lista-clientes')}}
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
                                                    onClick={() => {navigate ('/panel/clientes/nuevo'); setSubMenu('nuevo-cliente')}}
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
                                                    onClick={() => {navigate ('/panel/suscriptores'); setSubMenu('lista-suscriptores')}}
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
                                                    onClick={() => {navigate ('/panel/tipos-proyectos'); setSubMenu('lista-tipos-proyectos')}}
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
                                                    onClick={() => {navigate ('/panel/tipos-proyectos/nuevo'); setSubMenu('nuevo-tipo-proyecto')}}
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
                                                    onClick={() => {navigate ('/panel/proyectos'); setSubMenu('lista-proyectos')}}
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
                                                    onClick={() => {navigate ('/panel/proyectos/nuevo'); setSubMenu('nuevo-proyecto')}}
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
                                                    onClick={() => {navigate ('/panel/productos'); setSubMenu('lista-productos')}}
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
                                                    onClick={() => {navigate ('/panel/productos/nuevo'); setSubMenu('nuevo-producto')}}
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
                                                    onClick={() => {navigate ('/panel/categorias'); setSubMenu('lista-categorias')}}
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
                                                    onClick={() => {navigate ('/panel/categorias/nuevo'); setSubMenu('nuevo-categoria')}}
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
                                                    onClick={() => {navigate ('/panel/subcategorias'); setSubMenu('lista-subcategorias')}}
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
                                                    onClick={() => {navigate ('/panel/subcategorias/nuevo'); setSubMenu('nuevo-subcategoria')}}
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
                                                    onClick={() => {navigate ('/panel/unidades'); setSubMenu('lista-unidades')}}
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
                                                    onClick={() => {navigate ('/panel/unidades/nuevo'); setSubMenu('nuevo-unidad')}}
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
                                                    onClick={() => {navigate ('/panel/servicios'); setSubMenu('lista-servicios')}}
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
                                                    onClick={() => {navigate ('/panel/servicios/nuevo'); setSubMenu('nuevo-servicio')}}
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
                                                    onClick={() => {navigate ('/panel/favoritos'); setSubMenu('lista-favoritos')}}
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
                                                    onClick={() => {navigate ('/panel/calificaciones'); setSubMenu('lista-calificaciones')}}
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
                                                    onClick={() => {navigate ('/panel/compradores'); setSubMenu('lista-compradores')}}
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
                                                    onClick={() => {navigate ('/panel/compras'); setSubMenu('lista-compras')}}
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
                                                    onClick={() => {navigate ('/panel/presupuestos'); setSubMenu('lista-presupuestos')}}
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
                                                    onClick={() => {navigate ('/panel/presupuestos/nuevo'); setSubMenu('nuevo-presupuesto')}}
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
                                        Noticias
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
                                                    onClick={() => {navigate ('/panel/noticias'); setSubMenu('lista-blog')}}>
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
                                                    onClick={() => {navigate ('/panel/noticias/nuevo'); setSubMenu('nuevo-blog')}}>
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
