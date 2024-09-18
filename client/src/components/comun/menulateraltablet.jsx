import React, { useEffect, useState } from 'react'

import admin from '../../assets/iconos/menu/lateral/avatar_admin.png'
import logout from '../../assets/iconos/menu/lateral/logout.png'
import settings from '../../assets/iconos/menu/lateral/settings.png'

import CardMenuEmpresaTablet from './card/menu/empresatablet.jsx'
import CardMenuRrHhTablet from './card/menu/rrhhtablet.jsx'
import CardMenuProyectosTablet from './card/menu/proyectostablet.jsx'
import CardMenuAlmacenTablet from './card/menu/almacentablet.jsx'
import CardMenuTiendaTablet from './card/menu/tiendatablet.jsx'
import CardMenuEstadisticasTablet from './card/menu/estadisticastablet.jsx'
import CardMenuContabilidadTablet from './card/menu/contabilidadtablet.jsx'
import CardMenuOtrosTablet from './card/menu/otrostablet.jsx'

import dashboard from '../../assets/iconos/menu/lateral/dashboard.png'

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
    const [sector, setSector] = useState('')
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
                                style={{width: '100%', height: 30 / proporcional}} onClick={() => {navigate ('/panel');
                                    dispatch(set_open_menu_lateral(false))}}>
                            <img src={dashboard} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                marginBottom: 0 / proporcional, color: menu === 'dashboard' || seleccion_menu === 'dashboard' ?  '#28a745' : '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                Panel principal
                            </p>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 1.5, borderBottom: '1.5px dashed rgba(89, 89, 89, 0.8)'}}/>
                    <CardMenuEmpresaTablet proporcional={proporcional}/>
                    <div style={{width: '100%', height: 1.5, borderBottom: '1.5px dashed rgba(89, 89, 89, 0.8)'}}/>
                    <CardMenuRrHhTablet proporcional={proporcional}/>
                    <div style={{width: '100%', height: 1.5, borderBottom: '1.5px dashed rgba(89, 89, 89, 0.8)'}}/>
                    <CardMenuProyectosTablet proporcional={proporcional}/>
                    <div style={{width: '100%', height: 1.5, borderBottom: '1.5px dashed rgba(89, 89, 89, 0.8)'}}/>
                    <CardMenuAlmacenTablet proporcional={proporcional}/>
                    <div style={{width: '100%', height: 1.5, borderBottom: '1.5px dashed rgba(89, 89, 89, 0.8)'}}/>
                    <CardMenuTiendaTablet proporcional={proporcional}/>
                    <div style={{width: '100%', height: 1.5, borderBottom: '1.5px dashed rgba(89, 89, 89, 0.8)'}}/>
                    <CardMenuEstadisticasTablet proporcional={proporcional}/>
                    <div style={{width: '100%', height: 1.5, borderBottom: '1.5px dashed rgba(89, 89, 89, 0.8)'}}/>
                    <CardMenuContabilidadTablet proporcional={proporcional}/>
                    <div style={{width: '100%', height: 1.5, borderBottom: '1.5px dashed rgba(89, 89, 89, 0.8)'}}/>
                    <CardMenuOtrosTablet proporcional={proporcional}/>
                </div>
                <div style={{width: '100%', height: 'auto', padding: 40 / proporcional, paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional}}>
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
