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
import compradores from '../../assets/iconos/menu/lateral/compradores.png'
import compras from '../../assets/iconos/menu/lateral/compras.png'
import presupuestos from '../../assets/iconos/menu/lateral/presupuestos.png'
import blog from '../../assets/iconos/menu/lateral/blog.png'
import { useLocation, useNavigate } from 'react-router-dom'

import {set_open_menu_lateral} from '../../redux/actions/data.js'
import { useDispatch } from 'react-redux'

export default function MenuLateralCell ({proporcional}) {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const [menu, setMenu] = useState('dashboard')
    const [seleccion_menu, setSeleccionMenu] = useState ('')

    const [sub_menu, setSubMenu] = useState('lista')
    const [seleccion_sub_menu, setSeleccionSubMenu] = useState ('')

    useEffect(() => {
        setMenu(location.pathname.split ('/')[1] === '' ? 'dashboard' : location.pathname.split ('/')[1])
    }, [location.pathname.split('/')[1]])

    useEffect(() => {
        setSubMenu(location.pathname.split ('/')[2] === '' ? 'lista' : location.pathname.split ('/')[2])
        console.log (location.pathname.split ('/')[2] === '' ? 'lista' : location.pathname.split ('/')[2])
    }, [location.pathname.split('/')[2]])

    const cerrar_sesion = () => {
        dispatch (set_open_menu_lateral(false))
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
                <div style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, 
                        marginBottom: 5 / proporcional, paddingTop: 5 / proporcional, 
                            paddingBottom: 5 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setSeleccionMenu('dashboard')} onMouseLeave={() => setSeleccionMenu('')}>
                        <div className={seleccion_menu === 'dashboard' ? 'd-flex shadow-sm rounded' : 'd-flex'} 
                                style={{width: '100%', height: 30 / proporcional}} 
                                onClick={() => {navigate ('/'); dispatch(set_open_menu_lateral (false))}}>
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
                                                    onClick={() => {navigate ('/clientes'); setSubMenu('lista'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista clientes
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/clientes/nuevo'); setSubMenu('nuevo'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo' || sub_menu === 'nuevo' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
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
                                onClick={() => setMenu(menu === 'tipo-proyectos' ? '' : 'tipo-proyectos')}>
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
                            menu === 'tipo-proyectos' ? (
                                <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/tipos-proyectos'); setSubMenu('lista'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista tipo de proyectos
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/tipos-proyectos/nuevo'); setSubMenu('nuevo'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo' || sub_menu === 'nuevo' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
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
                                                    onClick={() => {navigate ('/proyectos'); setSubMenu('lista'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de proyectos
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/proyectos/nuevo'); setSubMenu('nuevo'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo' || sub_menu === 'nuevo' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
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
                                                    onClick={() => {navigate ('/compradores'); setSubMenu('lista'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
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
                                                    onClick={() => {navigate ('/compras'); setSubMenu('lista'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
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
                                                    onClick={() => {navigate ('/presupuestos'); setSubMenu('lista'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('lista')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de presupuestos
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/presupuestos/nuevo'); setSubMenu('nuevo'); dispatch(set_open_menu_lateral (false))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo' || sub_menu === 'nuevo' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
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
                                                    onMouseOver={() => setSeleccionSubMenu('lista')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}
                                                    onClick={() => {navigate ('/noticias'); setSubMenu('lista'); dispatch(set_open_menu_lateral (false))}}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Lista de noticias
                                        </p>
                                    </div>
                                    <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}
                                                    onClick={() => {navigate ('/noticias/nuevo'); setSubMenu('nuevo'); dispatch(set_open_menu_lateral (false))}}>
                                        <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo' || sub_menu === 'nuevo' ? '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
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
                                style={{width: '100%', height: 30 / proporcional}} 
                                onClick={() => {navigate ('/settings'); setSubMenu('lista'); dispatch(set_open_menu_lateral (false))}}>
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
                                style={{width: '100%', height: 30 / proporcional}} 
                                onClick={() => cerrar_sesion ()}>
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
