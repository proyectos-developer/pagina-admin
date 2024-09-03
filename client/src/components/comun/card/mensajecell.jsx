import React, { useState } from 'react'

import options from '../../../assets/iconos/notificaciones/options_menu_v1.png'
import options_select from '../../../assets/iconos/notificaciones/options_menu_v2.png'
import { useDispatch } from 'react-redux'
import {mensajesdata} from '../../../redux/slice/mensajesdata'
import { mensajesConstants } from '../../../uri/mensajes-constantes'

export default function CardMensajeCell ({proporcional, index, mensaje, cantidad}) {

    const dispatch = useDispatch()

    const [mouse_options, setMouseOptions] = useState(false)

    const marcar_leido = () => {
        const data_update = {
            leido: !mensaje.leido
        }
        dispatch (mensajesdata(mensajesConstants(mensaje.id, 0, 0, 0, 0, 0, 10, data_update, false).update_mensaje_leida))
    }

    return (
        <div key={index} style={{width: '100%', height: 'auto', borderBottom: '1px solid rgba(89, 89, 89, 0.6)',
            marginTop: index === 0 ? 0 : 10 / proporcional, 
            marginBottom: index === cantidad.length - 1 ? 0 : 10 / proporcional,
            paddingBottom: 10 / proporcional, cursor: 'pointer'
        }}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                <div className='d-flex' style={{width: 'auto', height: 40 / proporcional}}>
                    <div className='rounded-circle' 
                        style={{width: 40 / proporcional, height: 40 / proporcional, marginRight: 8 / proporcional, border: '1px solid rgb(89, 89, 89)'}}>
                        {
                            mensaje.url_foto !== '' ? (
                                <img className='rounded-circle' src={mensaje.url_foto} 
                                    style={{width: 38 / proporcional, height: 38 / proporcional}}/>
                            ) : null
                        }
                    </div>
                    <div style={{width: 'auto', height: 40 / proporcional, paddingTop: 4 / proporcional, paddingBottom: 4 / proporcional}}>
                        <p style={{fontSize: 12 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0,
                            color: '#007bff', fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'default'}}>
                            <span style={{fontSize: 14 / proporcional, color: '#007bff'}}> {(new Date(mensaje.created_at)).toDateString()}</span>
                        </p>
                        <p style={{fontSize: 12 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0,
                            color: '#007bff', fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'default'}}>
                            <span style={{fontSize: 14 / proporcional, color: 'rgb(89, 89, 89)'}}> {mensaje.titulo}</span>
                        </p>
                    </div>
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
