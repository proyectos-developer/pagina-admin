import React, { useEffect, useState } from 'react'

import menu from '../../assets/iconos/menu/superior/menu_v1.png'
import menu_select from '../../assets/iconos/menu/superior/menu_v2.png'
import settings_select from '../../assets/iconos/menu/superior/settings_v2.png'
import settings from '../../assets/iconos/menu/superior/settings_v1.png'
import chat_select from '../../assets/iconos/menu/superior/chat_v1.png'
import chat from '../../assets/iconos/menu/superior/chat_v2.png'
import notifications_select from '../../assets/iconos/menu/superior/notifications_v1.png'
import notifications from '../../assets/iconos/menu/superior/notifications_v2.png'
import agenda_select from '../../assets/iconos/menu/superior/agenda_v1.png'
import agenda from '../../assets/iconos/menu/superior/agenda_v2.png'
import logout_select from '../../assets/iconos/menu/superior/logout_v2.png'
import logout from '../../assets/iconos/menu/superior/logout_v1.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_authenticated, set_open_menu_lateral } from '../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import {begindata} from '../../redux/slice/begindata'
import { beginConstants } from '../../uri/begin-constants'

import {notificacionesdata} from '../../redux/slice/notificacionesdata'
import {notificacionesConstants} from '../../uri/notificaciones-constants'
import {mensajesdata} from '../../redux/slice/mensajesdata'
import {mensajesConstants} from '../../uri/mensajes-constantes'
import {reunionesdata} from '../../redux/slice/reunionesdata'
import {reunionesConstants} from '../../uri/reuniones-constants'

import CardNotificacionCell from './card/notificacioncell.jsx'
import CardMensajeCell from './card/mensajecell.jsx'
import CardAgendaCell from './card/agendacell.jsx'

export default function MenuSuperiorCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [boton_menu, setBotonMenu] = useState(false)
    const [boton_notifications, setBotonNotifications] = useState(false)
    const [boton_chat, setBotonChat] = useState(false)
    const [boton_agenda, setBotonAgenda] = useState(false)
    const [boton_settings, setBotonSettings] = useState(false)
    const [boton_logout, setBotonLogout] = useState(false)

    const [show_notificaciones, setShowNotificaciones] = useState(false)
    const [show_mensajes, setShowMensajes] = useState(false)
    const [show_reuniones, setShowReuniones] = useState(false)
    
    const [lista_notificaciones, setListaNotificaciones] = useState([])
    const [lista_mensajes, setListaMensajes] = useState([])
    const [lista_reuniones, setListaReuniones] = useState([])

    const [nro_notificaciones, setNroNotificaciones] = useState(0)
    const [nro_reuniones, setNroReuniones] = useState(0)
    const [nro_mensajes, setNroMensajes] = useState(0)

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)
    const {local_logout} = useSelector(({begin_data}) => begin_data)
    const {get_notificaciones_filter, update_notificacion_leida, get_nro_notificaciones} = useSelector(({notificaciones_data}) => notificaciones_data)
    const {get_mensajes_filter, update_mensaje_leida, get_nro_mensajes} = useSelector(({mensajes_data}) => mensajes_data)
    const {get_reuniones_filter, get_nro_reuniones} = useSelector(({reuniones_data}) => reuniones_data)

    useEffect(() => {
        dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_nro_notificaciones))
    }, [])

    useEffect(() => {
        if (get_nro_notificaciones && get_nro_notificaciones.success === true && get_nro_notificaciones.total_notificaciones){
            setNroNotificaciones(get_nro_notificaciones.total_notificaciones.length)
            dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_nro_mensajes))
        }
    }, [get_nro_notificaciones])

    useEffect(() => {
        if (get_nro_mensajes && get_nro_mensajes.success === true && get_nro_mensajes.total_mensajes){
            setNroMensajes(get_nro_mensajes.total_mensajes.length)
            dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_nro_reuniones))
        }
    }, [get_nro_mensajes])

    useEffect(() => {
        if (get_nro_reuniones && get_nro_reuniones.success === true && get_nro_reuniones.total_reuniones){
            setNroReuniones(get_nro_reuniones.total_reuniones.length)
        }
    }, [get_nro_reuniones])

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
        if (get_notificaciones_filter && get_notificaciones_filter.success === true && get_notificaciones_filter.notificaciones){
            setListaNotificaciones(get_notificaciones_filter.notificaciones)
        }
    }, [get_notificaciones_filter])

    useEffect(() => {
        if (update_notificacion_leida && update_notificacion_leida.success === true && update_notificacion_leida.notificaciones){
            setListaNotificaciones(update_notificacion_leida.notificaciones)
        }
    }, [update_notificacion_leida])

    useEffect(() => {
        if (get_mensajes_filter && get_mensajes_filter.success === true && get_mensajes_filter.mensajes){
            setListaMensajes(get_mensajes_filter.mensajes)
        }
    }, [get_mensajes_filter])

    useEffect(() => {
        if (update_mensaje_leida && update_mensaje_leida.success === true && update_mensaje_leida.notificaciones){
            setListaMensajes(update_mensaje_leida.mensajes)
        }
    }, [update_mensaje_leida])

    useEffect(() => {
        if (get_reuniones_filter && get_reuniones_filter.success === true && get_reuniones_filter.reuniones){
            setListaReuniones(get_reuniones_filter.reuniones)
        }
    }, [get_reuniones_filter])

    const cerrar_sesion = () => {
        dispatch(begindata(beginConstants(0, {}, false).local_logout))
    }

    return (
        <div style={{width: '100%', height: 160 / proporcional, paddingTop: 20 / proporcional, paddingBottom: 20 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                    {
                        !open_menu_lateral ? (
                            <div style={{width: 60 / proporcional, height: 60 / proporcional, marginRight: 10 / proporcional}}>
                                <img src={boton_menu ? menu_select : menu} style={{width: 60 / proporcional, height: 60 / proporcional, cursor: 'pointer', 
                                    padding: 15 / proporcional}} onMouseOver={() => setBotonMenu(true)}
                                    onMouseLeave={() => setBotonMenu(false)}
                                    onClick={() => dispatch (set_open_menu_lateral(true))}/>
                            </div>
                        ) : null
                    }
                </div>
                <div style={{width: 'auto', height: 60 / proporcional}}>
                    <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                        <div className='position-relative' style={{width: 60 / proporcional, height: 60 / proporcional}}
                            onMouseOver={() => {setBotonNotifications(true)}} 
                            onMouseLeave={() => {setBotonNotifications(false)}}
                            onClick={() => {setShowNotificaciones(!show_notificaciones); dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, 0, 10, {}, false).get_notificaciones_filter))}}>
                            <img src={boton_notifications ? notifications_select : notifications} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional,
                                    cursor: 'pointer'}} />
                            <div className='position-absolute top-0 end-0 rounded-circle shadow-lg' 
                                style={{width: 20 / proporcional, height: 20 / proporcional, background: 'white'}}>
                                <p className='rounded-circle' style={{lineHeight: `${20 / proporcional}px`, color: '#007bff', textAlign: 'center',
                                    fontSize: 12 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 700
                                }}>{nro_notificaciones}</p>
                            </div> 
                            {
                                show_notificaciones ? (
                                    <div className='shadow-lg position-absolute top-100 overflow-auto' 
                                        style={{width: 400 / proporcional, minHeight: 'auto', maxHeight: 240 / proporcional, padding: 20 / proporcional, left: -200 / proporcional,
                                            background: 'white'}}>
                                        {
                                            lista_notificaciones && lista_notificaciones.length > 0 ? (
                                                lista_notificaciones.map ((notificacion, index) => {
                                                    return (
                                                        <CardNotificacionCell notificacion={notificacion} index={index} key={index} proporcional={proporcional} cantidad={lista_notificaciones.length}/>
                                                    )
                                                })
                                            ) : null
                                        }
                                        <div className='d-flex justify-content-center' style={{width: '100%', height: 50 / proporcional}}>
                                            <div className='rounded shadow-sm' style={{width: '100%', height: 50 / proporcional, border: '1px solid white',
                                                    background: 'white', cursor: 'pointer'}} onClick={() => navigate('/panel/notificaciones')}>
                                                <p style={{lineHeight: `${50 / proporcional}px`, color: 'white', textAlign: 'center', fontWeight: 600, 
                                                    fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0
                                                }}>VER TODAS LAS NOTIFICACIONES</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className='position-relative' style={{width: 60 / proporcional, height: 60 / proporcional}}
                            onMouseOver={() => {setBotonChat(true)}} 
                            onMouseLeave={() => {setBotonChat(false)}}
                            onClick={() => {setShowMensajes(!show_mensajes); dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, 0, 10, {}, false).get_mensajes_filter))}}>
                            <img src={boton_chat ? chat_select : chat} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional,
                                    cursor: 'pointer'}} />
                            <div className='position-absolute top-0 end-0 rounded-circle shadow-lg' 
                                style={{width: 20 / proporcional, height: 20 / proporcional, background: 'white'}}>
                                <p className='rounded-circle' style={{lineHeight: `${20 / proporcional}px`, color: '#007bff', textAlign: 'center',
                                    fontSize: 12 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 700
                                }}>{nro_mensajes}</p>
                            </div> 
                            {
                                show_mensajes ? (
                                    <div className='shadow-lg position-absolute top-100 overflow-auto' 
                                        style={{width: 400 / proporcional, minHeight: 'auto', maxHeight: 240 / proporcional, padding: 20 / proporcional, left: -200 / proporcional,
                                            background: 'white'}}>
                                        {
                                            lista_mensajes && lista_mensajes.length > 0 ? (
                                                lista_mensajes.map ((mensaje, index) => {
                                                    return (
                                                        <CardMensajeCell mensaje={mensaje} index={index} key={index} proporcional={proporcional} cantidad={lista_mensajes.length}/>
                                                    )
                                                })
                                            ) : null
                                        }
                                        <div className='d-flex justify-content-center' style={{width: '100%', height: 50 / proporcional}}>
                                            <div className='rounded shadow-sm' style={{width: '100%', height: 50 / proporcional, border: '1px solid white',
                                                    background: 'white', cursor: 'pointer'}}  onClick={() => navigate('/panel/mensajes')}>
                                                <p style={{lineHeight: `${50 / proporcional}px`, color: 'white', textAlign: 'center', fontWeight: 600, 
                                                    fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0
                                                }}>VER TODAS LOS MENSAJES</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className='position-relative' style={{width: 60 / proporcional, height: 60 / proporcional}}
                            onMouseOver={() => {setBotonAgenda(true)}} 
                            onMouseLeave={() => {setBotonAgenda(false)}}
                            onClick={() => {setShowReuniones(!show_reuniones); dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, 0, 10, {}, false).get_reuniones_filter))}}>
                            <img src={boton_agenda ? agenda_select : agenda} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional,
                                    cursor: 'pointer'}} />
                            <div className='position-absolute top-0 end-0 rounded-circle shadow-lg' 
                                style={{width: 20 / proporcional, height: 20 / proporcional, background: 'white'}}>
                                <p className='rounded-circle' style={{lineHeight: `${20 / proporcional}px`, color: '#007bff', textAlign: 'center',
                                    fontSize: 12 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 700
                                }}>{nro_reuniones}</p>
                            </div> 
                            {
                                show_reuniones ? (
                                    <div className='shadow-lg position-absolute top-100 overflow-auto' 
                                        style={{width: 400 / proporcional, minHeight: 'auto', maxHeight: 240 / proporcional, padding: 20 / proporcional, left: -250 / proporcional,
                                            background: 'white'}}>
                                        {
                                            lista_reuniones && lista_reuniones.length > 0 ? (
                                                lista_reuniones.map ((reunion, index) => {
                                                    return (
                                                        <CardAgendaCell reunion={reunion} index={index} key={index} proporcional={proporcional} cantidad={lista_reuniones.length}/>
                                                    )
                                                })
                                            ) : null
                                        }
                                        <div className='d-flex justify-content-center' style={{width: '100%', height: 50 / proporcional}}>
                                            <div className='rounded shadow-sm' style={{width: '100%', height: 50 / proporcional, border: '1px solid white',
                                                    background: 'white', cursor: 'pointer'}} onClick={() => navigate('/panel/reuniones')}>
                                                <p style={{lineHeight: `${50 / proporcional}px`, color: 'white', textAlign: 'center', fontWeight: 600, 
                                                    fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0
                                                }}>VER TODAS LAS REUNIONES</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <img src={boton_settings ? settings_select : settings} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional,
                                cursor: 'pointer'}} onMouseOver={() => setBotonSettings(true)} onMouseLeave={() => setBotonSettings(false)}/>
                        <img src={boton_logout ? logout_select : logout} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional,
                                cursor: 'pointer'}} onMouseOver={() => setBotonLogout(true)} onMouseLeave={() => setBotonLogout(false)}
                                onClick={() => cerrar_sesion()}/>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 60 / proporcional, paddingTop: 0 / proporcional, paddingBottom: 0 / proporcional}}>
                <h1 style={{fontSize: 32 / proporcional, lineHeight: `${60 / proporcional}px`, fontFamily: 'Merriweather',
                    marginBottom: 0, color: 'white', fontWeight: 600, cursor: 'pointer'}}
                    onClick={() => {navigate ('/panel')}}>Administrativa</h1>
            </div>
        </div>
    )
}
