import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DatosGestionProyectoTablet from './nuevo/datosgestionproyectotablet.jsx'
import DatosTareasProyectoTablet from './nuevo/datostareasproyectotablet.jsx'
import DatosEquipoProyectoTablet from './nuevo/datosequipoproyectotablet.jsx'
import DatosDocumentosProyectoTablet from './nuevo/datosdocumentosproyectotablet.jsx'
import DatosComunicacionesProyectoTablet from './nuevo/datoscomunicacionesproyectotablet.jsx'
import DatosRiesgosProyectoTablet from './nuevo/datosriesgosproyectotablet.jsx'
import DatosKpisProyectoTablet from './nuevo/datoskpisproyectotablet.jsx'
import { set_data_gestion_informacion, set_data_gestion_tareas, set_data_gestion_equipo, 
    set_data_gestion_documentos, set_data_gestion_comunicaciones, set_data_gestion_riesgos,
    set_data_gestion_kpis, set_datos_paso_gestion_proyectos } from '../../../../redux/actions/data.js'
import { useNavigate } from 'react-router-dom'
import { gestionproyectosdata } from '../../../../redux/slice/gestionproyectosdata.js'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants.js'

export default function NuevaGestionProyectoTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [id_proyecto, setIdProyecto] = useState(0)

    const {new_gestion_proyecto, new_equipo_proyecto, new_tarea_proyecto, new_documento_proyecto, new_comunicacion_proyecto,
            new_riesgo_proyecto, new_kpi_proyecto } = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {datos_paso_gestion_proyectos} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (new_gestion_proyecto && new_gestion_proyecto.success === true && new_gestion_proyecto.gestion_proyecto){
            setIdProyecto(new_gestion_proyecto.gestion_proyecto.id)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_gestion_proyecto))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_gestion_proyecto])

    useEffect(() => {
        if (new_equipo_proyecto && new_equipo_proyecto.success === true && new_equipo_proyecto.equipo_proyecto){
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_equipo_proyecto))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_equipo_proyecto])

    useEffect(() => {
        if (new_tarea_proyecto && new_tarea_proyecto.success === true && new_tarea_proyecto.tarea_proyecto){
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_tarea_proyecto))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_tarea_proyecto])

    useEffect(() => {
        if (new_documento_proyecto && new_documento_proyecto.success === true && new_documento_proyecto.documento_proyecto){
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_documento_proyecto))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_documento_proyecto])

    useEffect(() => {
        if (new_riesgo_proyecto && new_riesgo_proyecto.success === true && new_riesgo_proyecto.riesgo_proyecto){
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_riesgo_proyecto))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_riesgo_proyecto])

    useEffect(() => {
        if (new_kpi_proyecto && new_kpi_proyecto.success === true && new_kpi_proyecto.kpi_proyecto){
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_kpi_proyecto))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_kpi_proyecto])

    useEffect(() => {
        if (datos_paso_gestion_proyectos === 'gestion'){
            
        }
    }, [datos_paso_gestion_proyectos])

    const resetear_data = () => {
        dispatch (set_data_gestion_informacion({}))
        dispatch (set_data_gestion_tareas({}))
        dispatch (set_data_gestion_equipo({}))
        dispatch (set_data_gestion_documentos({}))
        dispatch (set_data_gestion_comunicaciones({}))
        dispatch (set_data_gestion_riesgos({}))
        dispatch (set_data_gestion_kpis({}))
    }

    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel')}>
                    Inicio 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/proyectos')}>
                    proyectos
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/proyectos/gestion-proyectos')}>
                    gestión proyectos
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    nuevo
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 16 / proporcional}}>
                        <div className='' style={{width: '25%', height: 196 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_gestion_proyectos === 'gestion' || 
                                        datos_paso_gestion_proyectos === 'guardar' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_gestion_proyectos === 'gestion' || 
                                            datos_paso_gestion_proyectos === 'guardar' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        1
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_gestion_proyectos === 'gestion' || datos_paso_gestion_proyectos === 'guardar' ? '#007bff' : 'white',
                                border: datos_paso_gestion_proyectos === 'gestion' || datos_paso_gestion_proyectos === 'guardar' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_gestion_proyectos === 'gestion' || datos_paso_gestion_proyectos === 'guardar' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_gestion_proyectos === 'gestion' || 
                                        datos_paso_gestion_proyectos === 'guardar' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_gestion_proyectos === 'gestion' || datos_paso_gestion_proyectos === 'guardar' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Nueva gestión
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '25%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_gestion_proyectos === 'tareas' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_gestion_proyectos === 'tareas' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        2
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_gestion_proyectos === 'tareas' ? '#007bff' : 'white',
                                border: datos_paso_gestion_proyectos === 'tareas' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_gestion_proyectos === 'tareas' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_gestion_proyectos === 'tareas' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_gestion_proyectos === 'tareas' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Tareas
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '25%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_gestion_proyectos === 'equipo' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_gestion_proyectos === 'equipo' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        3
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_gestion_proyectos === 'equipo' ? '#007bff' : 'white',
                                border: datos_paso_gestion_proyectos === 'equipo' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_gestion_proyectos === 'equipo' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_gestion_proyectos === 'equipo' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_gestion_proyectos === 'equipo' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Equipo
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '25%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_gestion_proyectos === 'documentos' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_gestion_proyectos === 'documentos' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        4
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_gestion_proyectos === 'documentos' ? '#007bff' : 'white',
                                border: datos_paso_gestion_proyectos === 'documentos' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_gestion_proyectos === 'documentos' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_gestion_proyectos === 'documentos' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_gestion_proyectos === 'documentos' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Documentos
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 16 / proporcional}}>
                        <div className='' style={{width: '32%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_gestion_proyectos === 'comunicaciones' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_gestion_proyectos === 'comunicaciones' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        5
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_gestion_proyectos === 'comunicaciones' ? '#007bff' : 'white',
                                border: datos_paso_gestion_proyectos === 'comunicaciones' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_gestion_proyectos === 'comunicaciones' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_gestion_proyectos === 'comunicaciones' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_gestion_proyectos === 'comunicaciones' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Comunicaciones
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '32%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_gestion_proyectos === 'riesgos' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_gestion_proyectos === 'riesgos' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        6
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_gestion_proyectos === 'riesgos' ? '#007bff' : 'white',
                                border: datos_paso_gestion_proyectos === 'riesgos' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_gestion_proyectos === 'riesgos' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_gestion_proyectos === 'riesgos' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_gestion_proyectos === 'riesgos' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Riesgos
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '32%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_gestion_proyectos === 'kpis' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_gestion_proyectos === 'kpis' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        7
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_gestion_proyectos === 'kpis' ? '#007bff' : 'white',
                                border: datos_paso_gestion_proyectos === 'kpis' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_gestion_proyectos === 'kpis' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_gestion_proyectos === 'kpis' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_gestion_proyectos === 'kpis' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Kpis
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        {
                            datos_paso_gestion_proyectos === 'gestion'  ? ( 
                                <DatosGestionProyectoTablet proporcional={proporcional}/>
                            ) : datos_paso_gestion_proyectos === 'tareas' ? (
                                <DatosTareasProyectoTablet proporcional={proporcional} id={id_proyecto}/>
                            ) : datos_paso_gestion_proyectos === 'equipo' ? (
                                <DatosEquipoProyectoTablet proporcional={proporcional} id={id_proyecto}/>
                            ) : datos_paso_gestion_proyectos === 'documentos' ? (
                                <DatosDocumentosProyectoTablet proporcional={proporcional} id={id_proyecto}/>
                            ) : datos_paso_gestion_proyectos === 'comunicaciones' ? (
                                <DatosComunicacionesProyectoTablet proporcional={proporcional} id={id_proyecto}/>
                            ) : datos_paso_gestion_proyectos === 'riesgos' ? (
                                <DatosRiesgosProyectoTablet proporcional={proporcional} id={id_proyecto}/>
                            ) : datos_paso_gestion_proyectos === 'kpis' ? (
                                <DatosKpisProyectoTablet proporcional={proporcional} id={id_proyecto}/>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

