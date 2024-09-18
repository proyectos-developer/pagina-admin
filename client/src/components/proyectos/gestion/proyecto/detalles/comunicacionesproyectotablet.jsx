import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata.js'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants.js'

import axios from 'axios'
import { constantes } from '../../../../../uri/constantes.js'
import {personaldata} from '../../../../../redux/slice/personaldata.js'
import { personalConstants } from '../../../../../uri/personal-constants.js'

import search_select from '../../../../../assets/iconos/menu/superior/search_v1.png'
import search from '../../../../../assets/iconos/menu/superior/search_v2.png'
import { useLocation } from 'react-router-dom'

import CardComunicacionTablet from '../card/comunicacion.jsx'

export default function DetallesComunicacionesProyectoTablet({proporcional}) {

    const location = useLocation()
    const dispatch = useDispatch()
    
    const [id_comunicacion, setIdComunicaion] = useState('')
    const [tipo_comunicacion, setTipoComunicacion] = useState('')
    const [id_usuario_comunica, setIdUsuarioComunica] = useState('')
    const [id_usuarios_receptores, setIdUsuariosReceptores] = useState('')
    const [notas, setNotas] = useState('')

    const [usuario_comunica, setUsuarioComunica] = useState('')
    const [usuario_receptor, setUsuarioReceptor] = useState('')

    const [lista_comunicaciones, setListaComunicaciones] = useState([])
    
    const [etipo_comunicacion, setETipoComuniacion] = useState(false)
    const [enotas, setENotas] = useState('')
    const [eid_usuario_comunica, setEIdUsuarioComunica] = useState('')
    const [eid_usuario_receptores, setEIdUsuarioReceptores] = useState('')

    const [nueva_comunicacion, setNuevaComunicacion] = useState (false)
    const [editar_informacion, setEditarInformacion] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)
    const [boton_nuevo_trabajador, setBotonNuevoTrabajador] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const [seleccionar_tipo_usuario, setSeleccionarTipoUsuario] = useState(false)

    const [search_remitente, setSearchRemitente] = useState('')
    const [search_receptor, setSearchReceptor] = useState('')

    const [lista_usuarios_receptores, setListaUsuariosReceptores] = useState([])
    const [lista_usuarios_remitentes, setListaUsuariosRemitentes] = useState([])

    const [boton_search_remitente, setBotonSearchRemitente] = useState(false)
    const [boton_search_receptor, setBotonSearchReceptor] = useState(false)

    const {new_comunicacion_proyecto, update_comunicacion_proyecto,
            get_comunicaciones_proyecto_filter, get_comunicacion_proyecto} = 
            useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split ('/')[6], 0, 0, 0, 0, 100, {}, false).get_comunicaciones_proyecto_filter))
    }, [])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.trabajadores){
            if (seleccionar_tipo_usuario) {
                setListaUsuariosReceptores(get_personal_filter.trabajadores)
            }else{
                setListaUsuariosRemitentes(get_personal_filter.trabajadores)
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
            setIdUsuariosReceptores(value.split('*')[0])
            setUsuarioReceptor(value.split('*')[1].replace('-', ' '))
        }
    }

    useEffect(() => {
        if (get_comunicaciones_proyecto_filter && get_comunicaciones_proyecto_filter.success === true && get_comunicaciones_proyecto_filter.comunicaciones_proyecto){
            setListaComunicaciones(get_comunicaciones_proyecto_filter.comunicaciones_proyecto)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_comunicacion_proyecto))
        }
    }, [get_comunicaciones_proyecto_filter])

    const resetear_data = () => {
        setIdUsuarioComunica('')
        setIdUsuariosReceptores('')
        setNotas('')
        setTipoComunicacion('')
        setUsuarioComunica('')
        setUsuarioReceptor('')
        setEditarInformacion (false)
        setNuevaComunicacion(false)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_comunicaciones_proyecto_filter))
    }

    const agregar_nueva_comunicacion = () => {
        setIdUsuarioComunica('')
        setIdUsuariosReceptores('')
        setNotas('')
        setTipoComunicacion('')
        setEditarInformacion(true)
        setNuevaComunicacion (true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_comunicacion_proyecto))
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
    }

    useEffect(() => {
        if (update_comunicacion_proyecto && update_comunicacion_proyecto.success === true && update_comunicacion_proyecto.comunicacion_proyecto){
            window.scrollTo(0, 0)
            setEditarInformacion (false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_comunicaciones_proyecto_filter))
        }
    }, [update_comunicacion_proyecto])

    useEffect(() => {
        if (new_comunicacion_proyecto && new_comunicacion_proyecto.success === true && new_comunicacion_proyecto.comunicacion_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_comunicacion_proyecto])

    useEffect(() => {
        if (get_comunicacion_proyecto && get_comunicacion_proyecto.success === true && get_comunicacion_proyecto.comunicacion_proyecto){
            setIdComunicaion(get_comunicacion_proyecto.comunicacion_proyecto.id)
            setIdUsuarioComunica(get_comunicacion_proyecto.comunicacion_proyecto.usuario_comunica)
            setIdUsuariosReceptores(get_comunicacion_proyecto.comunicacion_proyecto.usuarios_receptores)
            setNotas(get_comunicacion_proyecto.comunicacion_proyecto.notas)
            setTipoComunicacion(get_comunicacion_proyecto.comunicacion_proyecto.tipo_comunicacion)
            axios.get (`${constantes().url_principal[0].url}/trabajador/${get_comunicacion_proyecto.comunicacion_proyecto.usuario_comunica}`)
                .then ((res) => {
                    setUsuarioComunica (res.data.trabajador.nombres + ' ' + res.data.trabajador.apellidos)
                    axios.get(`${constantes().url_principal[0].url}/trabajador/${get_comunicacion_proyecto.comunicacion_proyecto.usuarios_receptores}`)
                        .then ((res) => {
                            setUsuarioReceptor (res.data.trabajador.nombres + ' ' + res.data.trabajador.apellidos)
                        }).catch ((err) => {

                        })
                }).catch ((err) => {
                            
                })
        }
    }, [get_comunicacion_proyecto])

    const actualizar_comunicacion = () => {
        if (tipo_comunicacion === '' && notas === ''){
            setETipoComuniacion(tipo_comunicacion === '' ? true : false)
            setENotas(notas === '' ? true : false)
        }else{
            setETipoComuniacion(false)
            setENotas(false)
            const data_comunica = {
                id_proyecto: location.pathname.split ('/')[6],
                usuario_comunica: id_usuario_comunica,
                usuarios_receptores: id_usuarios_receptores,
                tipo_comunicacion: tipo_comunicacion,
                notas: notas
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_comunicacion, 0, 0, 0, 0, 0, 0, 0, 0, data_comunica, false).update_comunicacion_proyecto))
        }
    }

    const habilitar_campos_informacion = () => {
        window.scrollTo(0, 0)
        setEditarInformacion(true)
    }

    const guardar_datos = () => {
        if (tipo_comunicacion === '' && notas === '' && id_usuario_comunica === '' && id_usuarios_receptores === ''){
            setETipoComuniacion(tipo_comunicacion === '' ? true : false)
            setENotas(notas === '' ? true : false)
            setEIdUsuarioComunica(id_usuario_comunica === '' ? true : false)
            setEIdUsuarioReceptores(id_usuarios_receptores === '' ? true : false)
        }else{
            setETipoComuniacion(false)
            setENotas(false)
            setEIdUsuarioComunica(false)
            setEIdUsuarioReceptores(false)
            const data_comunicacion = {
                id_proyecto: location.pathname.split ('/')[6],
                usuario_comunica: id_usuario_comunica,
                usuarios_receptores: id_usuarios_receptores,
                tipo_comunicacion: tipo_comunicacion,
                notas: notas
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_comunicacion, false).new_comunicacion_proyecto))
        }
    }

    const seleccionar_tipo_comunicacion = (value) => {
        if (value !== '0'){
            setTipoComunicacion(value)
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: '#4a4a4a'}}>Comunicaciones del equipo: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                        </h2>
                    </div>
                    <div className='' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                        {
                            lista_comunicaciones && lista_comunicaciones.length > 0 ? (
                                lista_comunicaciones.map ((comunicacion, index) => {
                                    return (
                                        <CardComunicacionTablet proporcional={proporcional} index={index} key={index} comunicacion={comunicacion}/>
                                    )
                                })
                            ) : null
                        }
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => agregar_nueva_comunicacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Nueva comunicación
                            </p>
                        </div>
                    </div>
                </div>
                {
                    (get_comunicacion_proyecto && get_comunicacion_proyecto.comunicacion_proyecto) || nueva_comunicacion ? (
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                                    color: '#4a4a4a'}}>Tipo comunicación: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                                </h2>
                            </div>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Tipo comunicación
                                </span>
                                <select 
                                    disabled={!editar_informacion}
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
                            {
                                nueva_comunicacion ? (
                                    <div style={{width: '100%', height: 'auto'}}>
                                        <div className='' style={{width: '100%', height: 'auto'}}>
                                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                                    fontFamily: 'Poppins, sans-serif'}}>
                                                    Buscar trabajador remitente
                                                </span>
                                                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                        border: eid_usuario_comunica ? '1px solid red' : '1px solid #007BFF'
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
                                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                                                    fontFamily: 'Poppins, sans-serif', border: eid_usuario_comunica ? '1px solid red' : '1px solid #007BFF',
                                                                    padding: 10 / proporcional}}>
                                                            <option value='0'>{usuario_comunica === '' ? 'Seleccionar trabajador' : usuario_comunica}</option>
                                                            {
                                                                lista_usuarios_remitentes && lista_usuarios_remitentes.length > 0 ? (
                                                                    lista_usuarios_remitentes.map ((trabajador, index) => {
                                                                        return (
                                                                            <option key={index} value={trabajador.id + '*' + trabajador.nombres + '-' + trabajador.apellidos}>
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
                                        <div className='' style={{width: '100%', height: 'auto'}}>
                                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                                    fontFamily: 'Poppins, sans-serif'}}>
                                                    Buscar trabajador receptor
                                                </span>
                                                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                        border:  eid_usuario_receptores ? '1px solid red' : '1px solid #007BFF'
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
                                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                                                    fontFamily: 'Poppins, sans-serif', border: eid_usuario_receptores ? '1px solid red' : '1px solid #007BFF',
                                                                    padding: 10 / proporcional}}>
                                                            <option value='0'>{usuario_receptor === '' ? 'Seleccionar trabajador' : usuario_receptor}</option>
                                                            {
                                                                lista_usuarios_receptores && lista_usuarios_receptores.length > 0 ? (
                                                                    lista_usuarios_receptores.map ((trabajador, index) => {
                                                                        return (
                                                                            <option key={index} value={trabajador.id + '*' + trabajador.nombres + '-' + trabajador.apellidos}>
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
                                    </div>
                                ) : (
                                    <div className='' style={{width: '100%', height: 'auto'}}>
                                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif'}}>
                                                Usuario remitente
                                            </span>
                                            <div className='d-flex justify-content-between rounded' style={{width: '100%', height: 50 / proporcional,
                                                border: eid_usuario_comunica ? '1px solid red' : '1px solid #007BFF'}}>
                                                <input
                                                    disabled={true}
                                                    type='default' 
                                                    id='usuario_comunica'
                                                    value={usuario_comunica}
                                                    className='form-control rounded border-0'
                                                    onChange={(event) => setUsuarioComunica (event.target.value)}
                                                    style={{width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                                    placeholder='Buscar por nombre o área de empresa'/>
                                            </div>
                                        </div>
                                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif'}}>
                                                Usuario receptor
                                            </span>
                                            <div className='d-flex justify-content-between rounded' style={{width: '100%', height: 50 / proporcional,
                                                border: eid_usuario_receptores ? '1px solid red' : '1px solid #007BFF'}}>
                                                <input
                                                    disabled={true}
                                                    type='default' 
                                                    id='usuario_receptor'
                                                    value={usuario_receptor}
                                                    className='form-control rounded border-0'
                                                    onChange={(event) => setUsuarioReceptor (event.target.value)}
                                                    style={{width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                                    placeholder='Buscar por nombre o área de empresa'/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Notas
                                </span>
                                <textarea
                                    disabled={!editar_informacion}
                                    type='default' 
                                    id='notas'
                                    rows={3}
                                    value={notas}
                                    className='form-control rounded'
                                    onChange={(event) => setNotas (event.target.value)}
                                    style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enotas ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Notas'/>
                            </div>
                            {
                                !nueva_comunicacion && editar_informacion ? (
                                    <div className='' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                            onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0)}}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Cancelar edición
                                            </p>
                                        </div>
                                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                            onClick={() => actualizar_comunicacion()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Actualizar datos
                                            </p>
                                        </div>
                                    </div>
                                ) : !nueva_comunicacion && !editar_informacion ? (
                                    <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                            onClick={() => habilitar_campos_informacion()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Editar información
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_cancelar_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                            onMouseOver={() => setBotonCancelarNuevo(true)} onMouseLeave={() => setBotonCancelarNuevo(false)}
                                            onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0); setNuevaComunicacion(false)}}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Cancelar
                                            </p>
                                        </div>
                                        <div className={boton_nuevo_trabajador ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonNuevoTrabajador(true)} onMouseLeave={() => setBotonNuevoTrabajador(false)}
                                            onClick={() => guardar_datos()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Guardar datos
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}
