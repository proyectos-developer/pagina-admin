import React, { useState } from 'react'

import options from '../../../assets/iconos/notificaciones/options_menu_v1.png'
import options_select from '../../../assets/iconos/notificaciones/options_menu_v2.png'
import warning from '../../../assets/iconos/notificaciones/tipo_warning_v2.png'
import warning_leido from '../../../assets/iconos/notificaciones/tipo_warning_v1.png'
import notification from '../../../assets/iconos/notificaciones/tipo_notificacion_v2.png'
import notificacion_leido from '../../../assets/iconos/notificaciones/tipo_notificacion_v1.png'
import correo from '../../../assets/iconos/notificaciones/tipo_correo_v2.png'
import correo_leido from '../../../assets/iconos/notificaciones/tipo_correo_v1.png'
import error from '../../../assets/iconos/notificaciones/tipo_error_v2.png'
import error_leido from '../../../assets/iconos/notificaciones/tipo_error_v1.png'
import calendar from '../../../assets/iconos/notificaciones/tipo_calendar_v2.png'
import calendar_leido from '../../../assets/iconos/notificaciones/tipo_calendar_v1.png'
import chat from '../../../assets/iconos/notificaciones/tipo_chat_v2.png'
import chat_leido from '../../../assets/iconos/notificaciones/tipo_chat_v1.png'
import admin from '../../../assets/iconos/notificaciones/tipo_admin_v2.png'
import admin_leido from '../../../assets/iconos/notificaciones/tipo_admin_v1.png'
import { useDispatch } from 'react-redux'
import {notificacionesdata} from '../../../redux/slice/notificacionesdata'
import { notificacionesConstants } from '../../../uri/notificaciones-constants'
import { set_data_notificaciones } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

export default function CardNotificacionTablet ({proporcional, index, notificacion, cantidad}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [mouse_options, setMouseOptions] = useState(false)

    const marcar_leido = () => {
        const data_update = {
            leido: !notificacion.leido
        }
        dispatch (notificacionesdata(notificacionesConstants(notificacion.id, 0, 0, 0, 0, 0, 10, data_update, false).update_notificacion_leida))
    }

    const ver_notificacion = () => {
        dispatch(set_data_notificaciones(notificacion))
        navigate (`/panel/notificaciones/notificacion/${notificacion.id}`)
    }

    return (
        <div key={index} style={{width: '100%', height: 'auto', borderBottom: '1px solid rgba(89, 89, 89, 0.6)',
            marginTop: index === 0 ? 0 : 10 / proporcional, 
            marginBottom: index === cantidad.length - 1 ? 0 : 10 / proporcional,
            paddingBottom: 10 / proporcional
        }}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                <div className='d-flex' style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                    onClick={() => ver_notificacion()}>
                    <div className='rounded-circle' 
                        style={{width: 40 / proporcional, height: 40 / proporcional, marginRight: 8 / proporcional, border: '1px solid rgb(89, 89, 89)'}}>
                        {
                            notificacion.url_foto !== '' ? (
                                <img className='rounded-circle' src={notificacion.url_foto} 
                                    style={{width: 38 / proporcional, height: 38 / proporcional}}/>
                            ) : null
                        }
                    </div>
                    <div style={{width: 'auto', height: 40 / proporcional, paddingTop: 4 / proporcional, paddingBottom: 4 / proporcional}}>
                        <p style={{fontSize: 12 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0,
                            color: '#007bff', fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'default'}}>
                            <span style={{fontSize: 14 / proporcional, color: '#007bff'}}> {(new Date(notificacion.created_at)).toDateString()}</span>
                        </p>
                        <p style={{fontSize: 12 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0,
                            color: '#007bff', fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'default'}}>
                            <span style={{fontSize: 14 / proporcional, color: 'rgb(89, 89, 89)'}}> {notificacion.titulo}</span>
                        </p>
                    </div>
                </div>
                <div style={{width: 40 / proporcional, height: 40 / proporcional}}>
                    {
                        notificacion.tipo_notificacion === 'warning' ? (
                            <img src={!notificacion.leido ? warning : warning_leido} style={{width: 40 / proporcional, height: 40 / proporcional,
                                    padding: 8 / proporcional, cursor: 'pointer'}}/>
                        ) : notificacion.tipo_notificacion === 'error' ? (
                            <img src={!notificacion.leido ? error : error_leido} style={{width: 40 / proporcional, height: 40 / proporcional,
                                    padding: 8 / proporcional, cursor: 'pointer'}}/>
                        ) : notificacion.tipo_notificacion === 'notificacion' ? (
                            <img src={!notificacion.leido ? notification : notificacion_leido} style={{width: 40 / proporcional, height: 40 / proporcional,
                                    padding: 8 / proporcional, cursor: 'pointer'}}/> 
                        ) : notificacion.tipo_notificacion === 'correo' ? (
                            <img src={!notificacion.leido ? correo : correo_leido} style={{width: 40 / proporcional, height: 40 / proporcional,
                                    padding: 8 / proporcional, cursor: 'pointer'}}/> 
                        ) : notificacion.tipo_notificacion === 'calendar' ? (
                            <img src={!notificacion.leido ? calendar : calendar_leido} style={{width: 40 / proporcional, height: 40 / proporcional,
                                    padding: 8 / proporcional, cursor: 'pointer'}}/> 
                        ) : notificacion.tipo_notificacion === 'chat' ? (
                            <img src={!notificacion.leido ? chat : chat_leido} style={{width: 40 / proporcional, height: 40 / proporcional,
                                    padding: 8 / proporcional, cursor: 'pointer'}}/> 
                        ) : notificacion.tipo_notificacion === 'admin' ? (
                            <img src={!notificacion.leido ? admin : admin_leido} style={{width: 40 / proporcional, height: 40 / proporcional,
                                    padding: 8 / proporcional, cursor: 'pointer'}}/> 
                        ) : null
                    }
                    
                </div>
                <div style={{width: 40 / proporcional, height: 40 / proporcional}}>
                    <img src={mouse_options ? options_select : options} style={{width: 40 / proporcional, height: 40 / proporcional,
                        padding: 8 / proporcional, cursor: 'pointer'}}
                        onMouseOver={() => setMouseOptions(true)} onMouseLeave={() => setMouseOptions(false)}
                        onClick={() => marcar_leido()}/>
                </div>
            </div>
        </div>
    )
}
