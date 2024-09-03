import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants'
import { useLocation } from 'react-router-dom'

import TareasProyecto from './tareasproyecto.jsx'
import TrabajadorProyecto from './trabajadorproyecto.jsx'
import DocumentosProyecto from './documentosproyecto.jsx'
import ComunicacionesProyecto from './comunicacionesproyecto.jsx'
import RiesgosProyecto from './riesgosproyecto.jsx'
import KpisProyecto from './kpisproyecto.jsx'

import NuevaTarea from '../menu/nuevatarea.jsx'
import NuevoTrabajador from '../menu/nuevotrabajador.jsx'
import NuevoDocumento from '../menu/nuevodocumento.jsx'
import NuevoRiesgo from '../menu/nuevoriesgo.jsx'
import NuevoKpi from '../menu/nuevokpi.jsx'

export default function DatosGestionProyecto({proporcional}) {

    const dispatch = useDispatch()
    const location = useLocation()

    const [show_tarea_proyecto, setShowTareaProyecto] = useState(false)
    const [tarea_proyecto, setTareaProyecto] = useState({})

    const [show_trabajador_proyecto, setShowTrabajadorProyecto] = useState(false)
    const [trabajador_proyecto, setTrabajadorProyecto] = useState({})

    const [show_documento_proyecto, setShowDocumentoProyecto] = useState(false)
    const [documento_proyecto, setDocumentoProyecto] = useState({})

    const [show_comunicacion_proyecto, setShowComunicacionProyecto] = useState(false)
    const [comunicacion_proyecto, setComunicacionProyecto] = useState({})

    const [show_riesgo_proyecto, setShowRiesgoProyecto] = useState(false)
    const [riesgo_proyecto, setRiesgoProyecto] = useState({})

    const [show_kpi_proyecto, setShowKpiProyecto] = useState(false)
    const [kpi_proyecto, setKpiProyecto] = useState({})

    const [datos_proyecto, setDatosProyecto] = useState({})

    const [boton_tarea, setBotonTarea] = useState(false)
    const [boton_trabajador, setBotonTrabajador] = useState(false)
    const [boton_documento, setBotonDocumento] = useState(false)
    const [boton_comunicacion, setBotonComunicacion] = useState(false)
    const [boton_riesgos, setBotonRiesgos] = useState(false)
    const [boton_kpis, setBotonKpis] = useState(false)
    const [boton_cerrar_menu, setBotonCerrarMenu] = useState(false)

    const [menu_agregar, setMenuAgregar] = useState('tareas')
    const [seleccion_menu_agregar, setSeleccionarMenuAgregar] = useState('')

    const {data_gestion_proyectos, open_menu_lateral} = useSelector(({data_actions}) => data_actions)
    const {get_informe_proyecto, new_actividad_proyecto, new_trabajador_proyecto,
            new_documento_proyecto, new_riesgo_proyecto, new_kpi_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        if (data_gestion_proyectos.nombre_proyecto === undefined){
            dispatch(gestionproyectosdata(gestionproyectosConstants(location.pathname.split ('/')[5], 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_informe_proyecto))
        }else{
            setDatosProyecto(data_gestion_proyectos)
        }
    }, [data_gestion_proyectos])

    useEffect(() => {
        if (get_informe_proyecto && get_informe_proyecto.success === true && get_informe_proyecto.gestion_proyecto){
            setDatosProyecto(get_informe_proyecto.gestion_proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_informe_proyecto))
        }
    }, [get_informe_proyecto])
    
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

    const agregar_tareas_proyecto = () => {
        setShowTareaProyecto(false)
        setMenuAgregar('tareas')
    }

    const agregar_trabajador_proyecto = () => {
        setShowTrabajadorProyecto(false)
        setMenuAgregar('trabajadores')
    }

    const agregar_documento_proyecto = () => {
        setShowDocumentoProyecto(false)
        setMenuAgregar('documentos')
    }

    const agregar_comunicacion_proyecto = () => {
        setShowComunicacionProyecto(false)
        setMenuAgregar('comunicaciones')
    }

    const agregar_riesgo_proyecto = () => {
        setShowRiesgoProyecto(false)
        setMenuAgregar('riesgos')
    }

    const agregar_kpis_proyecto = () => {
        setShowKpiProyecto(false)
        setMenuAgregar('kpis')
    }

    const cerrar_menu_lateral = () => {
        setShowKpiProyecto(false)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4a4a4a'}}>Proyecto: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}>{datos_proyecto.nombre_proyecto}</span>
                    </h2>
                </div>
            </div>
            <div styl={{width: '100%', height: 60 / proporcional, marginBottom: 32 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional, borderBottom: '2px solid #00b7ff'}}>
                    <div style={{width: '16.66%', height: 60 / proporcional, border: menu_agregar === 'tareas' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'tareas' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'tareas' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'tareas' || 
                            menu_agregar === 'tareas' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('tareas')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => setMenuAgregar('tareas')}>Agregar <br/>tareas</p>
                    </div>
                    <div style={{width: '16.66%', height: 60 / proporcional, border: menu_agregar === 'trabajadores' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'trabajadores' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'trabajadores' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'trabajadores' || 
                            menu_agregar === 'trabajadores' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('trabajadores')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => setMenuAgregar('trabajadores')}>Agregar <br/>trabajadores</p>
                    </div>
                    <div style={{width: '16.66%', height: 60 / proporcional, border: menu_agregar === 'documentos' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'documentos' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'documentos' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'documentos' || 
                            menu_agregar === 'documentos' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('documentos')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => setMenuAgregar('documentos')}>Agregar <br/>documentos</p>
                    </div>
                    <div style={{width: '16.66%', height: 60 / proporcional, border: menu_agregar === 'comunicaciones' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'comunicaciones' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'comunicaciones' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'comunicaciones' || 
                            menu_agregar === 'comunicaciones' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('comunicaciones')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => setMenuAgregar('comunicaciones')}>Agregar <br/>comunicaciones</p>
                    </div>
                    <div style={{width: '16.66%', height: 60 / proporcional, border: menu_agregar === 'riesgos' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'riesgos' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'riesgos' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'riesgos' || 
                            menu_agregar === 'riesgos' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('riesgos')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => setMenuAgregar('riesgos')}>Agregar <br/>riesgos</p>
                    </div>
                    <div style={{width: '16.66%', height: 60 / proporcional, border: menu_agregar === 'kpis' ? '2px solid #00b7ff' : '2px solid white',
                            borderTopLeftRadius: 16 / proporcional, borderTopRightRadius: 16 / proporcional,
                            borderBottom: menu_agregar !== 'kpis' ? '2px solid #00b7ff' : '2px solid white'}}>
                        <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: menu_agregar === 'kpis' ? '#007bff' : '#4a4a4a',
                            marginBottom: 10 / proporcional, textAlign: 'center', cursor: 'pointer', fontWeight: seleccion_menu_agregar === 'kpis' || 
                            menu_agregar === 'kpis' ? 700 : 500}}
                            onMouseOver={() => setSeleccionarMenuAgregar('kpis')} onMouseLeave={() => setSeleccionarMenuAgregar('')}
                            onClick={() => setMenuAgregar('kpis')}>Agregar <br/>kpis</p>
                    </div>
                </div>
            </div>
            <div styl={{width: '100%', height: 'auto'}}>
                {
                    menu_agregar === 'tareas' && datos_proyecto.id !== undefined ? (
                        <TareasProyecto proporcional={proporcional} proyecto={datos_proyecto}/>
                    ) : null
                }
                {
                    menu_agregar === 'trabajadores' && datos_proyecto.id !== undefined ? (
                        <TrabajadorProyecto proporcional={proporcional} proyecto={datos_proyecto}/>
                    ) : null
                }
                {
                    menu_agregar === 'documentos' && datos_proyecto.id !== undefined ? (
                        <DocumentosProyecto proporcional={proporcional} proyecto={datos_proyecto}/>
                    ) : null
                }
                {
                    menu_agregar === 'comunicaciones' && datos_proyecto.id !== undefined ? (
                        <ComunicacionesProyecto proporcional={proporcional} proyecto={datos_proyecto}/>
                    ) : null
                }
                {
                    menu_agregar === 'riesgos' && datos_proyecto.id !== undefined ? (
                        <RiesgosProyecto proporcional={proporcional} proyecto={datos_proyecto}/>
                    ) : null
                }
                {
                    menu_agregar === 'kpis' && datos_proyecto.id !== undefined ? (
                        <KpisProyecto proporcional={proporcional} proyecto={datos_proyecto}/>
                    ) : null
                }
            </div>
            {
                show_tarea_proyecto ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '30%', height: '89%', background: 'white', zIndex: 9999, top: 100 / proporcional}}>
                        <NuevaTarea proporcional={proporcional} tarea_proyecto={tarea_proyecto}/>
                        <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_tarea ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonTarea(true)} onMouseLeave={() => setBotonTarea(false)}
                                onClick={() => agregar_tareas_proyecto()}>
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
                                onClick={() => agregar_trabajador_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar trabajador al proyecto
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_trabajador_proyecto ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '30%', height: '89%', background: 'white', zIndex: 9999, top: 100 / proporcional}}>
                        <NuevoTrabajador proporcional={proporcional} trabajador={trabajador_proyecto} id_proyecto={location.pathname.split('/')[5]}/>
                        <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_tarea ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonTarea(true)} onMouseLeave={() => setBotonTarea(false)}
                                onClick={() => agregar_tareas_proyecto()}>
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
                                onClick={() => agregar_trabajador_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar trabajador al proyecto
                                </p>
                            </div>
                            <div className={boton_documento ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonDocumento(true)} onMouseLeave={() => setBotonDocumento(false)}
                                onClick={() => agregar_documento_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar documento al proyecto
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_documento_proyecto ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '30%', height: '89%', background: 'white', zIndex: 9999, top: 100 / proporcional}}>
                        <NuevoDocumento proporcional={proporcional} documento={documento_proyecto}/>
                        <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_tarea ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonTarea(true)} onMouseLeave={() => setBotonTarea(false)}
                                onClick={() => agregar_tareas_proyecto()}>
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
                                onClick={() => agregar_trabajador_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar trabajador al proyecto
                                </p>
                            </div>
                            <div className={boton_documento ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonDocumento(true)} onMouseLeave={() => setBotonDocumento(false)}
                                onClick={() => agregar_documento_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar documento al proyecto
                                </p>
                            </div>
                            <div className={boton_comunicacion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonComunicacion(true)} onMouseLeave={() => setBotonComunicacion(false)}
                                onClick={() => agregar_comunicacion_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar comunicación miembros del equipo
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_riesgo_proyecto ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '30%', height: '89%', background: 'white', zIndex: 9999, top: 100 / proporcional}}>
                        <NuevoRiesgo proporcional={proporcional} riesgo={riesgo_proyecto}/>
                        <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_tarea ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonTarea(true)} onMouseLeave={() => setBotonTarea(false)}
                                onClick={() => agregar_tareas_proyecto()}>
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
                                onClick={() => agregar_trabajador_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar trabajador al proyecto
                                </p>
                            </div>
                            <div className={boton_documento ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonDocumento(true)} onMouseLeave={() => setBotonDocumento(false)}
                                onClick={() => agregar_documento_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar documento al proyecto
                                </p>
                            </div>
                            <div className={boton_comunicacion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonComunicacion(true)} onMouseLeave={() => setBotonComunicacion(false)}
                                onClick={() => agregar_comunicacion_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar comunicación miembros del equipo
                                </p>
                            </div>
                            <div className={boton_riesgos ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonRiesgos(true)} onMouseLeave={() => setBotonRiesgos(false)}
                                onClick={() => agregar_riesgo_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar riesgos del proyecto
                                </p>
                            </div>
                            <div className={boton_kpis ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonKpis(true)} onMouseLeave={() => setBotonKpis(false)}
                                onClick={() => agregar_kpis_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar kpis del equipo
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_kpi_proyecto ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '30%', height: '89%', background: 'white', zIndex: 9999, top: 100 / proporcional}}>
                        <NuevoKpi proporcional={proporcional} kpi={kpi_proyecto}/>
                        <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_tarea ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonTarea(true)} onMouseLeave={() => setBotonTarea(false)}
                                onClick={() => agregar_tareas_proyecto()}>
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
                                onClick={() => agregar_trabajador_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar trabajador al proyecto
                                </p>
                            </div>
                            <div className={boton_documento ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonDocumento(true)} onMouseLeave={() => setBotonDocumento(false)}
                                onClick={() => agregar_documento_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar documento al proyecto
                                </p>
                            </div>
                            <div className={boton_comunicacion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonComunicacion(true)} onMouseLeave={() => setBotonComunicacion(false)}
                                onClick={() => agregar_comunicacion_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar comunicación miembros del equipo
                                </p>
                            </div>
                            <div className={boton_riesgos ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonRiesgos(true)} onMouseLeave={() => setBotonRiesgos(false)}
                                onClick={() => agregar_riesgo_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar riesgos del proyecto
                                </p>
                            </div>
                            <div className={boton_kpis ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonKpis(true)} onMouseLeave={() => setBotonKpis(false)}
                                onClick={() => agregar_kpis_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar kpis del equipo
                                </p>
                            </div>
                            <div className={boton_cerrar_menu ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonCerrarMenu(true)} onMouseLeave={() => setBotonCerrarMenu(false)}
                                onClick={() => cerrar_menu_lateral()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}
