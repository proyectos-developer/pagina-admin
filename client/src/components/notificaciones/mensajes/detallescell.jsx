import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_mensajes } from '../../../redux/actions/data'
import {mensajesdata} from '../../../redux/slice/mensajesdata'
import {mensajesConstants} from '../../../uri/mensajes-constantes'

export default function DetallesMensajeCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [id_mensaje, setIdMensaje] = useState('')
    const [titulo, setTitulo] = useState('')
    const [fecha_mensaje, setFechaMensaje] = useState('')
    const [usuario_mensaje, setUsuarioMensaje] = useState('')
    const [usuario_remitente, setUsuarioRemitente] = useState('')
    const [nombres_apellidos, setNombresApellidos] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [url_foto, setUrlFoto] = useState('')
    const [leido, setLeido] = useState('')

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_chat, setBotonChat] = useState(false)

    const {get_mensaje, update_mensaje_leido} = useSelector(({mensajes_data}) => mensajes_data)
    const {data_mensajes, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_mensajes.nombres === undefined){
            dispatch(mensajesdata(mensajesConstants(location.pathname.split ('/')[4], 0, 0, 0, 0, 0, 16, {}, false).get_mensaje))
        }else{
            setIdMensaje(data_mensajes.id)
            setTitulo(data_mensajes.titulo)
            setMensaje(data_mensajes.mensaje)
            setFechaMensaje((new Date(data_mensajes.fecha_mensaje)).toDateString())
            setUsuarioMensaje(data_mensajes.usuario_mensaje)
            setUsuarioRemitente(data_mensajes.usuario_remitente)
            setNombresApellidos(data_mensajes.nombres + ' ' + data_mensajes.apellidos)
            setUrlFoto(data_mensajes.url_foto)
            setLeido (data_mensajes.leido)
            if (!data_mensajes.leido){
                const update_data = {
                    leido: !data_mensajes.leido
                }
                dispatch (mensajesdata(mensajesConstants(data_mensajes.id, 0, 0, 0, 0, 0, 16, update_data, false).update_mensaje_leido))
            }
        }
    }, [data_mensajes])

    useEffect(() => {
        if (get_mensaje && get_mensaje.success === true && get_mensaje.mensaje){
            setIdMensaje(get_mensaje.mensaje.id)
            setTitulo(get_mensaje.mensaje.titulo)
            setMensaje(get_mensaje.mensaje.mensaje)
            setFechaMensaje((new Date(get_mensaje.mensaje.fecha_mensaje)).toDateString())
            setUsuarioMensaje(get_mensaje.mensaje.usuario_mensaje)
            setUsuarioRemitente(get_mensaje.mensaje.usuario_remitente)
            setNombresApellidos(get_mensaje.mensaje.nombres + ' ' + get_mensaje.mensaje.apellidos)
            setUrlFoto(get_mensaje.mensaje.url_foto)
            setLeido (get_mensaje.mensaje.leido)
            dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_mensaje))
            if (!get_mensaje.mensaje.leido){
                const update_data = {
                    leido: !get_mensaje.mensaje.leido
                }
                dispatch (mensajesdata(mensajesConstants(get_mensaje.mensaje.id, 0, 0, 0, 0, 0, 16, update_data, false).update_mensaje_leido))
            }
        }
    }, [get_mensaje])

    useEffect(() => {
        if (update_mensaje_leido && update_mensaje_leido.success === true && update_mensaje_leido.mensajes){
            dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, 0, 10, {}, false).get_nro_mensajes))
        }
    }, [update_mensaje_leido])

    const volver_a_lista = () => {
        dispatch(set_data_mensajes({}))
        navigate ('/panel/mensajes')
    }

    const ir_al_chat = () => {
        
    }
    
    useEffect(() => {
        return (() => {
            dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, 0, 0, {}, true).update_mensaje_leido))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#00b7ff'}}>Mensaje: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '100%', height: '100%'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Fecha
                        </span>
                        <input
                            disabled={true}
                            type='default' 
                            id='fecha_mensaje'
                            className='form-control rounded'
                            value={fecha_mensaje}
                            onChange={(event) => setFechaMensaje (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Fecha mensaje'/>
                    </div>
                    <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                    Autor mensaje
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
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Mensaje
                        </span>
                        <textarea
                            disabled={true}
                            id='mensaje'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={mensaje}
                            onChange={(event) => setMensaje(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Mensaje'/>
                    </div>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_chat ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                marginBottom: 16 / proporcional
                            }}
                            onMouseOver={() => setBotonChat(true)} onMouseLeave={() => setBotonChat(false)}
                            onClick={() => ir_al_chat()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver chat
                            </p>
                        </div>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
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
