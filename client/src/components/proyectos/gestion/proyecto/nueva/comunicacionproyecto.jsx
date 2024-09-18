import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { useLocation } from 'react-router-dom'

import search_select from '../../../../../assets/iconos/menu/superior/search_v1.png'
import search from '../../../../../assets/iconos/menu/superior/search_v2.png'
import {personaldata} from '../../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../../uri/personal-constants'

export default function ComunicacionProyecto({proporcional}) {

    const location = useLocation()
    const dispatch = useDispatch()

    const [id_proyecto, setIdProyecto] = useState(location.pathname.split ('/')[6])
    const [id_usuario_comunica, setIdUsuarioComunica] = useState('')
    const [usuario_comunica, setUsuarioComunica] = useState('')
    const [id_usuario_receptor, setIdUsuarioReceptor] = useState('')
    const [usuario_receptor, setUsuarioReceptor] = useState('')
    const [tipo_comunicacion, setTipoComunicacion] = useState('')
    const [notas, setNotas] = useState('')

    const [eusuario_comunica, setEUsuarioComunica] = useState(false)
    const [eusuario_receptor, setEUsuarioReceptor] = useState(false)
    const [etipo_comunicacion, setETipoComunicacion] = useState(false)
    const [enotas, setENotas] = useState(false)

    const [seleccionar_tipo_usuario, setSeleccionarTipoUsuario] = useState(false)

    const [search_remitente, setSearchRemitente] = useState('')
    const [search_receptor, setSearchReceptor] = useState('')

    const [lista_usuarios_receptores, setListaUsuariosReceptores] = useState([])
    const [lista_usuarios_remitentes, setListaUsuariosRemitentes] = useState([])

    const [boton_search_remitente, setBotonSearchRemitente] = useState(false)
    const [boton_search_receptor, setBotonSearchReceptor] = useState(false)
    const [boton_guardar, setBotonGuardar] = useState(false)

    const {new_comunicacion_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        if (new_comunicacion_proyecto && new_comunicacion_proyecto.success === true && new_comunicacion_proyecto.comunicacion_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_comunicacion_proyecto])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            if (seleccionar_tipo_usuario) {
                setListaUsuariosReceptores(get_personal_filter.personal)
            }else{
                setListaUsuariosRemitentes(get_personal_filter.personal)
            }
        }
    }, [get_personal_filter])

    const buscar_usuario_remitente = () => {
        setSeleccionarTipoUsuario(false)
        dispatch(personaldata(personalConstants(0, search_remitente, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
    }

    const seleccionar_usuario_remitente = (value) => {
        if (value !== '0'){
            setIdUsuarioComunica(value.split('*')[0])
            setUsuarioComunica(value.split('*')[1].replace('-', ' '))
        }
    }

    const buscar_usuario_receptor = () => {
        setSeleccionarTipoUsuario(true)
        dispatch(personaldata(personalConstants(0, search_receptor, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
    }

    const seleccionar_usuario_receptor = (value) => {
        if (value !== '0'){
            setIdUsuarioReceptor(value.split('*')[0])
            setUsuarioReceptor(value.split('*')[1].replace('-', ' '))
        }
    }

    const seleccionar_tipo_comunicacion = (value) => {
        if (value !== '0'){
            setTipoComunicacion(value)
        }
    }

    const resetear_data = () => {
        setIdProyecto('')
        setUsuarioComunica('')
        setSearchReceptor('')
        setUsuarioReceptor('')
        setSearchRemitente('')
        setSeleccionarTipoUsuario(false)
        setTipoComunicacion('')
        setNotas('')
    }

    const guardar_comunicacion = () => {
        if (tipo_comunicacion === '' || notas === '' || usuario_comunica === '' || usuario_receptor === ''){
            setEUsuarioComunica(tipo_comunicacion === '' ? true : false)
            setEUsuarioReceptor(notas === '' ? true : false)
            setETipoComunicacion(usuario_comunica === '' ? true : false)
            setENotas(usuario_receptor === '' ? true : false)
        }else{
            setEUsuarioComunica(false)
            setEUsuarioReceptor(false)
            setETipoComunicacion(false)
            setENotas(false)
            const data_comunicacion = {
                id_proyecto: location.pathname.split ('/')[6],
                usuario_comunica: id_usuario_comunica,
                usuarios_receptores: id_usuario_receptor,
                tipo_comunicacion: tipo_comunicacion,
                notas: notas
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_comunicacion, false).new_comunicacion_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4a4a4a'}}>Nueva comunicacion: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                    </h2>
                </div>
            </div>
            <div style={{width: '100%', height: 'auto'}}>
                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Tipo comunicación
                    </span>
                    <select 
                        id='tipo_comunicacion'
                        type='default'
                        className='form-select rounded'
                        value={tipo_comunicacion}
                        onChange={(event) => seleccionar_tipo_comunicacion(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: etipo_comunicacion ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}>
                        <option value='0'>{tipo_comunicacion === '' ? 'Seleccionar tipo comunicación' : tipo_comunicacion}</option>
                        <option value='Advertencia'>Advertencia</option>
                        <option value='Error'>Error</option>
                        <option value='Corrección'>Corrección</option>
                        <option value='Informativa'>Informativa</option>
                        <option value='Notificación'>Notificación</option>
                        <option value='Reunión'>Reunión</option>
                    </select>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Buscar trabajador remitente
                        </span>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                border: eusuario_comunica ? '1px solid red' : '1px solid #007BFF'
                        }}>
                            <input
                                type='default' 
                                value={search_remitente}
                                className='form-control rounded border-0'
                                onChange={(event) => setSearchRemitente (event.target.value)}
                                style={{width: '90%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', 
                                        padding: 10 / proporcional}}
                                placeholder='Buscar trabajador'/>
                            <div className='d-flex justify-content-center' 
                                style={{width: '10%', height: 50 / proporcional}}>
                                <img src={boton_search_remitente ? search_select : search} style={{width: 50 / proporcional,
                                    height: 50 / proporcional, padding: 15 / proporcional}}
                                    onMouseOver={() => setBotonSearchRemitente(true)} onMouseLeave={() => setBotonSearchRemitente(false)}
                                    onClick={() => buscar_usuario_remitente()}/>
                            </div>
                        </div>
                    </div>
                    {
                        lista_usuarios_remitentes && lista_usuarios_remitentes.length > 0 ? (
                            <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Trabajador
                                </span>
                                <select
                                    type='default' 
                                    id='trabajador'
                                    value={usuario_comunica}
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_usuario_remitente (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: eusuario_comunica ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{usuario_comunica === '' ? 'Seleccionar trabajador' : usuario_comunica}</option>
                                    {
                                        lista_usuarios_remitentes && lista_usuarios_remitentes.length > 0 ? (
                                            lista_usuarios_remitentes.map ((trabajador, index) => {
                                                return (
                                                    <option key={index} value={trabajador.id + '*' + trabajador.nombres + ' ' + trabajador.apellidos}>
                                                        {trabajador.nombres + ' ' + trabajador.apellidos}
                                                    </option>
                                                )
                                            })
                                        ) : null
                                    }
                                </select>
                            </div>
                        ) : null
                    }
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Buscar trabajador receptor
                        </span>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                border:  eusuario_receptor ? '1px solid red' : '1px solid #007BFF'
                        }}>
                            <input
                                type='default' 
                                value={search_receptor}
                                className='form-control rounded border-0'
                                onChange={(event) => setSearchReceptor (event.target.value)}
                                style={{width: '90%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', 
                                        padding: 10 / proporcional}}
                                placeholder='Buscar trabajador'/>
                            <div className='d-flex justify-content-center' 
                                style={{width: '10%', height: 50 / proporcional}}>
                                <img src={boton_search_receptor ? search_select : search} style={{width: 50 / proporcional,
                                    height: 50 / proporcional, padding: 15 / proporcional}}
                                    onMouseOver={() => setBotonSearchReceptor(true)} onMouseLeave={() => setBotonSearchReceptor(false)}
                                    onClick={() => buscar_usuario_receptor()}/>
                            </div>
                        </div>
                    </div>
                    {
                        lista_usuarios_receptores && lista_usuarios_receptores.length > 0 ? (
                            <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Trabajador
                                </span>
                                <select
                                    type='default' 
                                    id='trabajador'
                                    value={usuario_receptor}
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_usuario_receptor (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: eusuario_receptor ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{usuario_receptor === '' ? 'Seleccionar trabajador' : usuario_receptor}</option>
                                    {
                                        lista_usuarios_receptores && lista_usuarios_receptores.length > 0 ? (
                                            lista_usuarios_receptores.map ((trabajador, index) => {
                                                return (
                                                    <option key={index} value={trabajador.id + '*' + trabajador.nombres + ' ' + trabajador.apellidos}>
                                                        {trabajador.nombres + ' ' + trabajador.apellidos}
                                                    </option>
                                                )
                                            })
                                        ) : null
                                    }
                                </select>
                            </div>
                        ) : null
                    }
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Notas
                    </span>
                    <textarea 
                        id='notas'
                        type='default'
                        className='form-control rounded'
                        rows={3}
                        value={notas}
                        onChange={(event) => setNotas(event.target.value)}
                        style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: enotas ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Notas sobre la comunicación'/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_comunicacion()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar comunicación
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
