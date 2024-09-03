import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_notificaciones } from '../../redux/actions/data'
import {notificacionesdata} from '../../redux/slice/notificacionesdata'
import {notificacionesConstants} from '../../uri/notificaciones-constants'

import warning from '../../assets/iconos/notificaciones/tipo_warning_v1.png'
import correo from '../../assets/iconos/notificaciones/tipo_correo_v1.png'
import error from '../../assets/iconos/notificaciones/tipo_error_v1.png'
import calendar from '../../assets/iconos/notificaciones/tipo_calendar_v1.png'
import chat from '../../assets/iconos/notificaciones/tipo_chat_v1.png'
import admin from '../../assets/iconos/notificaciones/tipo_admin_v1.png'
import notification from '../../assets/iconos/notificaciones/tipo_notificacion_v1.png'

export default function DetallesNotificacionTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [id_notificacion, setIdNotificacion] = useState('')
    const [id_tipo_notificacion, setIdTipoNotificacion] = useState ('')
    const [tipo_notificacion, setTipoNotificacion] = useState ('')
    const [titulo, setTitulo] = useState('')
    const [fecha, setFecha] = useState('')
    const [usuario, setUsuario] = useState('')
    const [nombres_apellidos, setNombresApellidos] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [url_foto, setUrlFoto] = useState('')
    const [leido, setLeido] = useState('')

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_chat, setBotonChat] = useState(false)

    const {get_notificacion, update_notificacion_leida} = useSelector(({notificaciones_data}) => notificaciones_data)
    const {data_notificaciones, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_notificaciones.tipo_notificacion === undefined){
            dispatch(notificacionesdata(notificacionesConstants(location.pathname.split ('/')[4], 0, 0, 0, 0, 0, 16, {}, false).get_notificacion))
        }else{
            setIdNotificacion(data_notificaciones.id)
            setTipoNotificacion(data_notificaciones.id_tipo_notificacion)
            setTipoNotificacion(data_notificaciones.tipo_notificacion)
            setTitulo(data_notificaciones.titulo)
            setDescripcion(data_notificaciones.descripcion)
            setFecha((new Date(data_notificaciones.created_at)).toDateString())
            setUsuario(data_notificaciones.usuario)
            setNombresApellidos(data_notificaciones.nombres + ' ' + data_notificaciones.apellidos)
            setUrlFoto(data_notificaciones.url_foto)
            setLeido (data_notificaciones.leido)
            if (!data_notificaciones.leido){
                const update_data = {
                    leido: !data_notificaciones.leido
                }
                dispatch (notificacionesdata(notificacionesConstants(data_notificaciones.id, 0, 0, 0, 0, 0, 16, update_data, false).update_notificacion_leida))
            }
        }
    }, [data_notificaciones])

    useEffect(() => {
        if (get_notificacion && get_notificacion.success === true && get_notificacion.notificacion){
            setIdNotificacion(get_notificacion.notificacion.id)
            setTipoNotificacion(get_notificacion.notificacion.id_tipo_notificacion)
            setTipoNotificacion(get_notificacion.notificacion.tipo_notificacion)
            setTitulo(get_notificacion.notificacion.titulo)
            setDescripcion(get_notificacion.notificacion.descripcion)
            setFecha((new Date(get_notificacion.notificacion.created_at)).toDateString())
            setUsuario(get_notificacion.notificacion.usuario)
            setNombresApellidos(get_notificacion.notificacion.nombres + ' ' + get_notificacion.notificacion.apellidos)
            setUrlFoto(get_notificacion.notificacion.url_foto)
            setLeido (get_notificacion.notificacion.leido)
            dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_notificacion))
            if (!get_notificacion.notificacion.leido){
                const update_data = {
                    leido: !get_notificacion.notificacion.leido
                }
                dispatch (notificacionesdata(notificacionesConstants(get_notificacion.notificacion.id, 0, 0, 0, 0, 0, 16, update_data, false).update_notificacion_leida))
            }
        }
    }, [get_notificacion])

    useEffect(() => {
        if (update_notificacion_leida && update_notificacion_leida.success === true && update_notificacion_leida.notificaciones){
            dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, 0, 10, {}, false).get_nro_notificaciones))
        }
    }, [update_notificacion_leida])

    const volver_a_lista = () => {
        dispatch(set_data_notificaciones({}))
        navigate ('/panel/notificaciones')
    }

    const ir_al_chat = () => {
        
    }
    
    useEffect(() => {
        return (() => {
            dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, 0, 0, {}, true).update_notificacion_leida))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#00b7ff'}}>Notificación: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '80%', height: '100%'}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '28%', height: 174 / proporcional, padding: 23 / proporcional}}>
                            {
                                tipo_notificacion === 'warning' ? (
                                    <img src={warning} style={{width: 128 / proporcional, height: 128 / proporcional,
                                            padding: 0 / proporcional, cursor: 'pointer'}}/>
                                ) : tipo_notificacion === 'error' ? (
                                    <img src={error} style={{width: 128 / proporcional, height: 128 / proporcional,
                                            padding: 0 / proporcional, cursor: 'pointer'}}/>
                                ) : tipo_notificacion === 'notificacion' ? (
                                    <img src={notification} style={{width: 128 / proporcional, height: 128 / proporcional,
                                            padding: 0 / proporcional, cursor: 'pointer'}}/> 
                                ) : tipo_notificacion === 'correo' ? (
                                    <img src={correo} style={{width: 128 / proporcional, height: 128 / proporcional,
                                            padding: 0 / proporcional, cursor: 'pointer'}}/> 
                                ) : tipo_notificacion === 'calendar' ? (
                                    <img src={calendar} style={{width: 128 / proporcional, height: 128 / proporcional,
                                            padding: 0 / proporcional, cursor: 'pointer'}}/> 
                                ) : tipo_notificacion === 'chat' ? (
                                    <img src={chat} style={{width: 128 / proporcional, height: 128 / proporcional,
                                            padding: 0 / proporcional, cursor: 'pointer'}}/> 
                                ) : tipo_notificacion === 'admin' ? (
                                    <img src={admin} style={{width: 128 / proporcional, height: 128 / proporcional,
                                            padding: 0 / proporcional, cursor: 'pointer'}}/> 
                                ) : null
                            }
                        </div>
                        <div style={{width: '68%', height: 174 / proporcional}}>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Fecha
                                </span>
                                <input
                                    disabled={true}
                                    type='default' 
                                    id='fecha'
                                    className='form-control rounded'
                                    value={fecha}
                                    onChange={(event) => setFecha (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Fecha'/>
                            </div>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Título
                                </span>
                                <input
                                    disabled={true}
                                    type='default' 
                                    id='titulo'
                                    className='form-control rounded'
                                    value={titulo}
                                    onChange={(event) => setTitulo (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Título'/>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Descripción
                        </span>
                        <textarea
                            disabled={true}
                            id='descripcion'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Descripción'/>
                    </div>
                    {
                        tipo_notificacion !== 'admin' ? (
                            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                    {
                                        url_foto !== '' ? (
                                            <img className='rounded-circle' src={url_foto} 
                                                style={{width: 71 / proporcional, height: 71 / proporcional, marginRight: 10 / proporcional,
                                                    padding: 3.5 / proporcional}}/>
                                        ) : (
                                            <div className='rounded-circle' style={{width: 71 / proporcional, height: 71 / proporcional,
                                                margin: 3.5 / proporcional, marginRight: 13.5 / proporcional, border: '1px solid #4a4a4a'}}/>
                                        )
                                    }
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif'}}>
                                            Autor notificacion
                                        </span>
                                        <input
                                            disabled={true}
                                            type='default' 
                                            id='nombres'
                                            className='form-control rounded'
                                            value={nombres_apellidos}
                                            onChange={(event) => setNombresApellidos (event.target.value)}
                                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                    padding: 10 / proporcional}}
                                            placeholder='Fecha'/>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                            </div>
                        )
                    }
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        {
                            tipo_notificacion === 'chat' ? (
                                <div className={boton_chat ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonChat(true)} onMouseLeave={() => setBotonChat(false)}
                                    onClick={() => ir_al_chat()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Ver chat
                                    </p>
                                </div>
                            ) : (
                                <div style={{width: '48%', height: 50 / proporcional}}/>
                            )
                        }
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => volver_a_lista()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
