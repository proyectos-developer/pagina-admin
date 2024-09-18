import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { constantes } from '../../../../../uri/constantes'

import show from '../../../../../assets/iconos/comun/show_v1.png'
import show_select from '../../../../../assets/iconos/comun/show_v2.png'
import hide from '../../../../../assets/iconos/comun/hide_v1.png'
import hide_select from '../../../../../assets/iconos/comun/hide_v2.png'

export default function DatosGestionProyectoPanelCell({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [nombre_proyecto, setNombreProyecto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha_inicio, setFechaInicio] = useState('')
    const [fecha_finalizacion, setFechaFinalizacion] = useState('')
    const [estado_proyecto, setEstadoProyecto] = useState('')
    const [prioridad, setPrioridad] = useState('')
    const [presupuesto_proyecto, setPresupuestProyecto] = useState('')
    const [moneda, setMoneda] = useState('')
    const [id_cliente, setIdCliente] = useState('')

    const [nombre_negocio, setNombreNegocio] = useState('')
    const [nro_ruc, setNroRuc] = useState('')
    const [correo, setCorreo] = useState('')
    const [nro_telefono, setNroTelefono] = useState('')
    const [url_logo, setUrlLogo] = useState('')
    const [nombre_contacto, setNombreContacto] = useState('')

    const [boton_show_info_proyecto, setBotonShowInfoProyecto] = useState(false)
    const [boton_hide_info_proyecto, setBotonHideInfoProyecto] = useState(false)
    const [boton_show_info_cliente, setBotonShowInfoCliente] = useState(false)
    const [boton_hide_info_cliente, setBotonHideInfoCliente] = useState(false)

    const [show_proyecto, setShowProyecto] = useState(true)
    const [show_cliente, setShowCliente] = useState(true)

    const [show_tarea_proyecto, setShowTareaProyecto] = useState(false)
    const [show_trabajador_proyecto, setShowTrabajadorProyecto] = useState(false)
    const [show_documento_proyecto, setShowDocumentoProyecto] = useState(false)
    const [show_comunicacion_proyecto, setShowComunicacionProyecto] = useState(false)
    const [show_riesgo_proyecto, setShowRiesgoProyecto] = useState(false)
    const [show_kpi_proyecto, setShowKpiProyecto] = useState(false)

    const [tarea_proyecto, setTareaProyecto] = useState({})
    const [trabajador_proyecto, setTrabajadorProyecto] = useState({})
    const [documento_proyecto, setDocumentoProyecto] = useState({})
    const [comunicacion_proyecto, setComunicacionProyecto] = useState({})
    const [riesgo_proyecto, setRiesgoProyecto] = useState({})
    const [kpi_proyecto, setKpiProyecto] = useState({})

    const [boton_tarea, setBotonTarea] = useState(false)
    const [boton_trabajador, setBotonTrabajador] = useState(false)
    const [boton_documento, setBotonDocumento] = useState(false)
    const [boton_comunicacion, setBotonComunicacion] = useState(false)
    const [boton_riesgo, setBotonRiesgo] = useState(false)
    const [boton_kpi, setBotonKpi] = useState(false)
    const [boton_cerrar_menu, setBotonCerrarMenu] = useState(false)

    const [menu_agregar, setMenuAgregar] = useState('')
    const [seleccion_menu_agregar, setSeleccionarMenuAgregar] = useState('')

    const {data_gestion_proyectos, open_menu_lateral} = useSelector(({data_actions}) => data_actions)
    const {get_informe_proyecto, new_actividad_proyecto, new_trabajador_proyecto, new_comunicacion_proyecto,
            new_documento_proyecto, new_riesgo_proyecto, new_kpi_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        if (data_gestion_proyectos.nombre_proyecto === undefined){
            dispatch(gestionproyectosdata(gestionproyectosConstants(location.pathname.split ('/')[6], 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_informe_proyecto))
        }else{
            obtener_datos_proyecto(data_gestion_proyectos)
        }
    }, [data_gestion_proyectos])

    useEffect(() => {
        if (get_informe_proyecto && get_informe_proyecto.success === true && get_informe_proyecto.gestion_proyecto){
            obtener_datos_proyecto(get_informe_proyecto.gestion_proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_informe_proyecto))
        }
    }, [get_informe_proyecto])

    const obtener_datos_proyecto = (datos_proyecto) => {
        setNombreProyecto(datos_proyecto.nombre_proyecto)
        setDescripcion(datos_proyecto.descripcion)
        setFechaInicio(datos_proyecto.fecha_inicio)
        setFechaFinalizacion(datos_proyecto.fecha_finalizacion)
        setEstadoProyecto(datos_proyecto.estado_proyecto)
        setPrioridad(datos_proyecto.prioridad)
        setPresupuestProyecto(datos_proyecto.presupuesto_proyecto)
        setMoneda(datos_proyecto.moneda)
        setIdCliente(datos_proyecto.id_cliente)
        axios.get (`${constantes().url_principal[0].url}/negocio/${datos_proyecto.id_cliente}`)
            .then ((res) => {
                setNombreNegocio(res.data.negocio.nombre_negocio)
                setNroRuc(res.data.negocio.nro_ruc)
                setCorreo(res.data.negocio.correo)
                setNroTelefono(res.data.negocio.nro_telefono)
                setUrlLogo(res.data.negocio.url_logo)
                setNombreContacto(res.data.negocio.nombre_contacto)
                dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_informe_proyecto))
            }).catch ((err) => {

            })
    }
    
    useEffect(() => { 
        if (new_actividad_proyecto && new_actividad_proyecto.success === true && new_actividad_proyecto.tarea_proyecto){
            window.scrollTo(0, 0)
            setShowTareaProyecto(true)
            setTareaProyecto(new_actividad_proyecto.tarea_proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_actividad_proyecto))
        }
    }, [new_actividad_proyecto])
    
    useEffect(() => { 
        if (new_trabajador_proyecto && new_trabajador_proyecto.success === true && new_trabajador_proyecto.trabajador_proyecto){
            window.scrollTo(0, 0)
            setShowTrabajadorProyecto(true)
            setTrabajadorProyecto(new_trabajador_proyecto.trabajador_proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_trabajador_proyecto))
        }
    }, [new_trabajador_proyecto])
    
    useEffect(() => { 
        if (new_comunicacion_proyecto && new_comunicacion_proyecto.success === true && new_comunicacion_proyecto.comunicacion_proyecto){
            window.scrollTo(0, 0)
            setShowComunicacionProyecto(true)
            setComunicacionProyecto(new_comunicacion_proyecto.comunicacion_proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_comunicacion_proyecto))
        }
    }, [new_comunicacion_proyecto])
    
    useEffect(() => { 
        if (new_documento_proyecto && new_documento_proyecto.success === true && new_documento_proyecto.documento_proyecto){
            window.scrollTo(0, 0)
            setShowDocumentoProyecto(true)
            setDocumentoProyecto(new_documento_proyecto.documento_proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_documento_proyecto))
        }
    }, [new_documento_proyecto])
    
    useEffect(() => { 
        if (new_riesgo_proyecto && new_riesgo_proyecto.success === true && new_riesgo_proyecto.riesgo_proyecto){
            window.scrollTo(0, 0)
            setShowRiesgoProyecto(true)
            setRiesgoProyecto(new_riesgo_proyecto.riesgo_proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_riesgo_proyecto))
        }
    }, [new_riesgo_proyecto])
    
    useEffect(() => { 
        if (new_kpi_proyecto && new_kpi_proyecto.success === true && new_kpi_proyecto.kpi_proyecto){
            window.scrollTo(0, 0)
            setShowKpiProyecto(true)
            setKpiProyecto(new_kpi_proyecto.kpi_proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_kpi_proyecto))
        }
    }, [new_kpi_proyecto])

    return (
        <div className='position-relative' style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4a4a4a'}}>Proyecto: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}>{nombre_proyecto}</span>
                    </h2>
                </div>
            </div>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                <div className='rounded shadow' style={{width: '100%', height: '100%', padding: 20 / proporcional,
                        border: '1px solid #4a4a4a', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 30 / proporcional}}>
                        <div style={{width: '90%', height: 30 / proporcional}}>
                            <h4 style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                color: '#4a4a4a'}}>Información del proyecto<span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                            </h4>
                        </div>
                        <div className='d-flex justify-content-end' style={{width: '10%', height: 30 / proporcional}}>
                            {
                                show_proyecto ? (
                                    <img src={boton_hide_info_proyecto ? hide_select : hide} 
                                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional, cursor: 'pointer'}}
                                        onMouseOver={() => setBotonHideInfoProyecto(true)} onMouseLeave={() => setBotonHideInfoProyecto(false)}
                                        onClick={() => setShowProyecto(false)}/>
                                ) : (
                                    <img src={boton_show_info_proyecto ? show_select : show} 
                                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional, cursor: 'pointer'}}
                                        onMouseOver={() => setBotonShowInfoProyecto(true)} onMouseLeave={() => setBotonShowInfoProyecto(false)}
                                        onClick={() => setShowProyecto(true)}/>
                                )
                            }
                        </div>
                    </div>
                    {
                        show_proyecto ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                    color: '#4a4a4a'}}>Descripción: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{descripcion}</span>
                                </h4>
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto'}}>
                                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                            color: '#4a4a4a'}}>Inicio: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{(new Date (fecha_inicio)).toDateString()}</span>
                                        </h4>
                                    </div>
                                    
                                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto'}}>
                                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                            color: '#4a4a4a'}}>Finalización: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{(new Date (fecha_finalizacion)).toDateString()}</span>
                                        </h4>
                                    </div>
                                </div>
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto'}}>
                                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                            color: '#4a4a4a'}}>Estado: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{estado_proyecto}</span>
                                        </h4>
                                    </div>
                                    
                                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto'}}>
                                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                            color: '#4a4a4a'}}>Prioridad: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}># {prioridad}</span>
                                        </h4>
                                    </div>
                                </div>
                                <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                    color: '#4a4a4a'}}>Presupuesto: <span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{moneda}{presupuesto_proyecto}</span>
                                </h4>
                            </div>
                        ) : null
                    }
                </div>
                <div className='rounded shadow' style={{width: '100%', height: '100%', padding: 20 / proporcional,
                        border: '1px solid #4a4a4a', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 30 / proporcional}}>
                        <div style={{width: '90%', height: 30 / proporcional}}>
                            <h4 style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                color: '#4a4a4a'}}>Información del cliente<span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                            </h4>
                        </div>
                        <div className='d-flex justify-content-end' style={{width: '10%', height: 30 / proporcional}}>
                            {
                                show_cliente ? (
                                    <img src={boton_hide_info_cliente ? hide_select : hide} 
                                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional, cursor: 'pointer'}}
                                        onMouseOver={() => setBotonHideInfoCliente(true)} onMouseLeave={() => setBotonHideInfoCliente(false)}
                                        onClick={() => setShowCliente(false)}/>
                                ) : (
                                    <img src={boton_show_info_cliente ? show_select : show} 
                                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional, cursor: 'pointer'}}
                                        onMouseOver={() => setBotonShowInfoCliente(true)} onMouseLeave={() => setBotonShowInfoCliente(false)}
                                        onClick={() => setShowCliente(true)}/>
                                )
                            }
                        </div>
                    </div>
                    {
                        show_cliente ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                    <div style={{width: 76 / proporcional, height: 'auto', marginTop: 12 / proporcional, marginBottom: 12 / proporcional, marginRight: 8 / proporcional}}>
                                        <div className='rounded-circle' style={{width: 76 / proporcional, height: 76 / proporcional, border: '1px solid #4a4a4a'}}>
                                            {
                                                url_logo !== '' ? (
                                                    <img className='rounded-circle' src={url_logo} 
                                                        style={{width: 74 / proporcional, height: 74 / proporcional}}/>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                    <div style={{width: '100%', height: 'auto'}}>
                                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 8 / proporcional,
                                            color: '#4a4a4a'}}>Cliente: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{nombre_negocio}</span>
                                        </h4>
                                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                            color: '#4a4a4a'}}>Nro R.U.C: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{nro_ruc}</span>
                                        </h4>
                                    </div>
                                </div>
                                <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                    color: '#4a4a4a'}}>Contacto: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{nombre_contacto}</span>
                                </h4>
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto'}}>
                                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                            color: '#4a4a4a'}}>Correo: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{correo}</span>
                                        </h4>
                                    </div>
                                    
                                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto'}}>
                                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                                            color: '#4a4a4a'}}>Teléfono: <br/><span style={{fontSize: 18 / proporcional, color: '#007bff'}}>{nro_telefono}</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div styl={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional, borderBottom: '2px solid #00b7ff', marginBottom: 16 / proporcional}}>
                    <div style={{width: '33.33%', height: 60 / proporcional, border: menu_agregar === 'tareas' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'tareas' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'tareas' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'tareas' || 
                            menu_agregar === 'tareas' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('tareas')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => {setMenuAgregar('tareas'); window.scrollTo(0, 0); navigate ('tarea'); setShowCliente(false); setShowProyecto(false)}}>Agregar <br/>tareas</p>
                    </div>
                    <div style={{width: '33.33%', height: 60 / proporcional, border: menu_agregar === 'trabajadores' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'trabajadores' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'trabajadores' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'trabajadores' || 
                            menu_agregar === 'trabajadores' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('trabajadores')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => {setMenuAgregar('trabajadores'); window.scrollTo(0, 0); navigate ('trabajador'); setShowCliente(false); setShowProyecto(false)}}>Agregar <br/>trabajadores</p>
                    </div>
                    <div style={{width: '33.33%', height: 60 / proporcional, border: menu_agregar === 'documentos' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'documentos' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'documentos' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'documentos' || 
                            menu_agregar === 'documentos' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('documentos')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => {setMenuAgregar('documentos'); window.scrollTo(0, 0); navigate ('documento'); setShowCliente(false); setShowProyecto(false)}}>Agregar <br/>documentos</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional, borderBottom: '2px solid #00b7ff'}}>
                    <div style={{width: '33.33%', height: 60 / proporcional, border: menu_agregar === 'comunicaciones' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'comunicaciones' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'comunicaciones' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'comunicaciones' || 
                            menu_agregar === 'comunicaciones' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('comunicaciones')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => {setMenuAgregar('comunicaciones'); window.scrollTo(0, 0); navigate ('comunicacion'); setShowCliente(false); setShowProyecto(false)}}>Agregar <br/>comunicaciones</p>
                    </div>
                    <div style={{width: '33.33%', height: 60 / proporcional, border: menu_agregar === 'riesgos' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'riesgos' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'riesgos' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'riesgos' || 
                            menu_agregar === 'riesgos' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('riesgos')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => {setMenuAgregar('riesgos'); window.scrollTo(0, 0); navigate ('riesgo'); setShowCliente(false); setShowProyecto(false)}}>Agregar <br/>riesgos</p>
                    </div>
                    <div style={{width: '33.33%', height: 60 / proporcional, border: menu_agregar === 'kpis' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'kpis' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'kpis' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'kpis' || 
                            menu_agregar === 'kpis' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('kpis')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => {setMenuAgregar('kpis'); window.scrollTo(0, 0); navigate ('kpi'); setShowCliente(false); setShowProyecto(false)}}>Agregar <br/>kpis</p>
                    </div>
                </div>
            </div>
            <div styl={{width: '100%', height: 'auto'}}>
                <Outlet/>
            </div>
            {
                show_tarea_proyecto || show_trabajador_proyecto || show_documento_proyecto || show_comunicacion_proyecto
                    || show_riesgo_proyecto || show_kpi_proyecto ? (
                        <div className='position-fixed end-0 shadow overflow-auto' 
                            style={{width: '60%', height: '92%', background: 'white', zIndex: 9999, top: 100 / proporcional}}>
                            {
                                show_tarea_proyecto ? (
                                    <NuevaTareaTablet proporcional={proporcional} tarea_proyecto={tarea_proyecto}/>
                                ) : null
                            }
                            {
                                show_trabajador_proyecto ? (
                                    <NuevoTrabajadorTablet proporcional={proporcional} trabajador_proyecto={trabajador_proyecto}/>
                                ) : null
                            }
                            {
                                show_documento_proyecto ? (
                                    <NuevoDocumentoTablet proporcional={proporcional} documento_proyecto={documento_proyecto}/>
                                ) : null
                            }
                            {/**
                                show_comunicacion_proyecto ? (
                                    <NuevoComunicacionTablet proporcional={proporcional} comunicacion_proyecto={comunicacion_proyecto}/>
                                ) : null
                             */}
                            {
                                show_riesgo_proyecto ? (
                                    <NuevoRiesgoTablet proporcional={proporcional} riesgo_proyecto={riesgo_proyecto}/>
                                ) : null
                            }
                            {
                                show_kpi_proyecto ? (
                                    <NuevoKpiTablet proporcional={proporcional} kpi_proyecto={kpi_proyecto}/>
                                ) : null
                            }
                            <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                                <div className={boton_tarea ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                            marginBottom: 16 / proporcional
                                    }}
                                    onMouseOver={() => setBotonTarea(true)} onMouseLeave={() => setBotonTarea(false)}
                                    onClick={() => {navigate(`/panel/proyectos/gestion-proyectos/datos/proyecto/${location.pathname.split ('/')[6]}/tarea`);
                                            setShowTareaProyecto(false); setShowTrabajadorProyecto(false); setShowDocumentoProyecto(false);
                                            setShowComunicacionProyecto(false); setShowRiesgoProyecto(false); setShowKpiProyecto(false);
                                            setMenuAgregar('tareas')}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Agregar nueva tarea
                                    </p>
                                </div>
                                <div className={boton_trabajador ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                            marginBottom: 16 / proporcional
                                    }}
                                    onMouseOver={() => setBotonTrabajador(true)} onMouseLeave={() => setBotonTrabajador(false)}
                                    onClick={() => {navigate(`/panel/proyectos/gestion-proyectos/datos/proyecto/${location.pathname.split ('/')[6]}/trabajador`);
                                            setShowTareaProyecto(false); setShowTrabajadorProyecto(false); setShowDocumentoProyecto(false);
                                            setShowComunicacionProyecto(false); setShowRiesgoProyecto(false); setShowKpiProyecto(false);
                                            setMenuAgregar('trabajadores')}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Agregar nuevo trabajador
                                    </p>
                                </div>
                                <div className={boton_documento ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                            marginBottom: 16 / proporcional
                                    }}
                                    onMouseOver={() => setBotonDocumento(true)} onMouseLeave={() => setBotonDocumento(false)}
                                    onClick={() => {navigate(`/panel/proyectos/gestion-proyectos/datos/proyecto/${location.pathname.split ('/')[6]}/documento`);
                                            setShowTareaProyecto(false); setShowTrabajadorProyecto(false); setShowDocumentoProyecto(false);
                                            setShowComunicacionProyecto(false); setShowRiesgoProyecto(false); setShowKpiProyecto(false);
                                            setMenuAgregar('documentos')}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Agregar nuevo documento
                                    </p>
                                </div>
                                <div className={boton_comunicacion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                            marginBottom: 16 / proporcional
                                    }}
                                    onMouseOver={() => setBotonComunicacion(true)} onMouseLeave={() => setBotonComunicacion(false)}
                                    onClick={() => {navigate(`/panel/proyectos/gestion-proyectos/datos/proyecto/${location.pathname.split ('/')[6]}/comunicacion`);
                                            setShowTareaProyecto(false); setShowTrabajadorProyecto(false); setShowDocumentoProyecto(false);
                                            setShowComunicacionProyecto(false); setShowRiesgoProyecto(false); setShowKpiProyecto(false);
                                            setMenuAgregar('comunicaciones')}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Agregar nueva comunicación
                                    </p>
                                </div>
                                <div className={boton_riesgo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                            marginBottom: 16 / proporcional
                                    }}
                                    onMouseOver={() => setBotonRiesgo(true)} onMouseLeave={() => setBotonRiesgo(false)}
                                    onClick={() => {navigate(`/panel/proyectos/gestion-proyectos/datos/proyecto/${location.pathname.split ('/')[6]}/riesgo`);
                                            setShowTareaProyecto(false); setShowTrabajadorProyecto(false); setShowDocumentoProyecto(false);
                                            setShowComunicacionProyecto(false); setShowRiesgoProyecto(false); setShowKpiProyecto(false);
                                            setMenuAgregar('riesgos')}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Agregar nuevo riesgo
                                    </p>
                                </div>
                                <div className={boton_kpi ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                            marginBottom: 16 / proporcional
                                    }}
                                    onMouseOver={() => setBotonKpi(true)} onMouseLeave={() => setBotonKpi(false)}
                                    onClick={() => {navigate(`/panel/proyectos/gestion-proyectos/datos/proyecto/${location.pathname.split ('/')[6]}/kpi`);
                                            setShowTareaProyecto(false); setShowTrabajadorProyecto(false); setShowDocumentoProyecto(false);
                                            setShowComunicacionProyecto(false); setShowRiesgoProyecto(false); setShowKpiProyecto(false);
                                            setMenuAgregar('kpis')}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Agregar nuevo kpi
                                    </p>
                                </div>
                                <div className={boton_cerrar_menu ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                            marginBottom: 16 / proporcional
                                    }}
                                    onMouseOver={() => setBotonCerrarMenu(true)} onMouseLeave={() => setBotonCerrarMenu(false)}
                                    onClick={() => {navigate(`/panel/proyectos/gestion-proyectos`);
                                            setShowTareaProyecto(false); setShowTrabajadorProyecto(false); setShowDocumentoProyecto(false);
                                            setShowComunicacionProyecto(false); setShowRiesgoProyecto(false); setShowKpiProyecto(false);
                                            setMenuAgregar('')}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cerrar y volver a lista
                                    </p>
                                </div>
                            </div>
                        </div>
                ) : null
            }
        </div>
    )
}
