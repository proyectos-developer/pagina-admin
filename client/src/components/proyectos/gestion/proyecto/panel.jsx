import React, { useEffect, useState } from 'react'

import NuevaGestion from './menu/nuevagestion.jsx'
import NuevaTarea from './menu/nuevatarea.jsx'
import NuevoTrabajador from './menu/nuevotrabajador.jsx'
import NuevoDocumento from './menu/nuevodocumento.jsx'
import NuevaComunicacion from './menu/nuevacomunicacion.jsx'
import NuevoRiesgo from './menu/nuevoriesgo.jsx'
import NuevoKpi from './menu/nuevokpi.jsx'

import UpdateGestion from './menu/updategestion.jsx'
import Confirmacion from '../../../comun/message/confirmacion.jsx'
import DeleteMessage from '../../../comun/message/deletemessage.jsx'
import ErrrorMessage from '../../../comun/message/error.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_confirmacion_eliminacion, set_datos_paso_gestion_proyectos, set_error_message } 
    from '../../../../redux/actions/data.js'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants.js'
import { gestionproyectosdata } from '../../../../redux/slice/gestionproyectosdata.js'

export default function GestionProyectosPanel ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_cerrar_guardado, setBotonCerrarGuardado] = useState(false)
    const [boton_cerrar_guardado_tarea, setBotonCerrarGuardadoTarea] = useState(false)
    const [boton_cerrar_guardado_miembro, setBotonCerrarGuardadoMiembro] = useState(false)
    const [boton_cerrar_guardado_documento, setBotonCerrarGuardadoDocumento] = useState(false)
    const [boton_cerrar_guardado_comunicacion, setBotonCerrarGuardadoComunicacion] = useState(false)
    const [boton_cerrar_guardado_riesgo, setBotonCerrarGuardadoRiesgo] = useState(false)
    const [boton_cerrar_guardado_kpi, setBotonCerrarGuardadoKpi] = useState(false)

    const [boton_error_message, setBotonErrorMessage] = useState(false)
    const [boton_cerrar_actualizado, setBotonCerrarActualizado] = useState(false)
    const [boton_cerrar_borrado, setBotonCerrarBorrado] = useState(false)
    const [boton_confirmacion_aceptar, setBotonConfirmacionAceptar] = useState(false)
    const [boton_confirmacion_cancelar, setBotonConfirmacionCancelar] = useState(false)

    const [show_proyecto_guardado, setShowProyectoGuardado] = useState(false)
    const [show_proyecto_guardado_tarea, setShowProyectoGuardadoTarea] = useState(false)
    const [show_proyecto_guardado_trabajador, setShowProyectoGuardadoMiembro] = useState(false)
    const [show_proyecto_guardado_documento, setShowProyectoGuardadoDocumento] = useState(false)
    const [show_proyecto_guardado_comunicacion, setShowProyectoGuardadoComunicacion] = useState(false)
    const [show_proyecto_guardado_riesgo, setShowProyectoGuardadoRiesgo] = useState(false)
    const [show_proyecto_guardado_kpi, setShowProyectoGuardadoKpi] = useState(false)

    const [show_proyecto_actualizado, setShowProyectoActualizado] = useState(false)
    const [show_proyecto_borrado, setShowProyectoBorrado] = useState(false)
    const [proyecto, setProyecto] = useState({})

    const {new_gestion_proyecto, update_gestion_proyecto, delete_gestion_proyecto} = useSelector(({proyectos_data}) => proyectos_data)
    const {confirmacion_eliminacion, error_message, datos_paso_gestion_proyecto} = useSelector(({data_actions}) => data_actions)
    
    useEffect(() => { 
        if (new_gestion_proyecto && new_gestion_proyecto.success === true && new_gestion_proyecto.proyecto){
            window.scrollTo(0, 0)
            setShowProyectoGuardado(true)
            setProyecto(new_gestion_proyecto.proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).new_gestion_proyecto))
        }else if (new_gestion_proyecto && new_gestion_proyecto.success === false && new_gestion_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [new_gestion_proyecto])
    
    useEffect(() => { 
        if (update_gestion_proyecto && update_gestion_proyecto.success === true && update_gestion_proyecto.proyecto){
            window.scrollTo(0, 0)
            setShowProyectoActualizado(true)
            setProyecto(update_gestion_proyecto.proyecto)
        }else if (update_gestion_proyecto && update_gestion_proyecto.success === false && update_gestion_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_gestion_proyecto])

    useEffect(() => {
        if (delete_gestion_proyecto && delete_gestion_proyecto.success === true && delete_gestion_proyecto.proyectos){
            window.scrollTo(0, 0)
            setShowProyectoBorrado(true)
        }else if (delete_gestion_proyecto && delete_gestion_proyecto.success === false && delete_gestion_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [delete_gestion_proyecto])

    const cerrar_mensaje_nuevo = () => {
        if (datos_paso_gestion_proyecto === 'gestion'){
            dispatch (set_datos_paso_gestion_proyectos('tareas'))
        }
        setShowProyectoGuardado(false)
    }

    const cerrar_mensaje_nuevo_tarea = () => {
        setShowProyectoGuardadoTarea(false)
    }

    const cerrar_mensaje_nuevo_miembro = () => {
        setShowProyectoGuardadoMiembro(false)
    }

    const cerrar_mensaje_nuevo_documento = () => {
        setShowProyectoGuardadoDocumento(false)
    }

    const cerrar_mensaje_nuevo_comunicacion = () => {
        setShowProyectoGuardadoComunicacion(false)
    }

    const cerrar_mensaje_nuevo_riesgo = () => {
        setShowProyectoGuardadoRiesgo(false)
    }

    const cerrar_mensaje_nuevo_kpi = () => {
        setShowProyectoGuardadoKpi(false)
    }



    const cerrar_mensaje_actualizado = () => {
        setShowProyectoActualizado(false)
    }

    const cerrar_mensaje_borrado = () => {
        setShowProyectoBorrado(false)
    }

    const cancelar_confirmacion_eliminacion = () => {
        dispatch (set_confirmacion_eliminacion({show: false, mensaje: '', confirmacion: false, id: 0}))
    }

    const aceptar_confirmacion_eliminacion = () => {
        dispatch (set_confirmacion_eliminacion({show: false, mensaje: '', confirmacion: true, id: confirmacion_eliminacion.id}))
    }

    const aceptar_error_message = () => {
        dispatch (set_error_message(false))
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_proyecto_guardado ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaGestion proporcional={proporcional} proyecto={proyecto}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar_guardado ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrarGuardado(true)} onMouseLeave={() => setBotonCerrarGuardado(false)}
                                onClick={() => cerrar_mensaje_nuevo()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_proyecto_guardado_tarea ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaTarea proporcional={proporcional} proyecto={proyecto}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar_guardado_tarea ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrarGuardadoTarea(true)} onMouseLeave={() => setBotonCerrarGuardadoTarea(false)}
                                onClick={() => cerrar_mensaje_nuevo_tarea()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_proyecto_guardado_trabajador ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevoTrabajador proporcional={proporcional} proyecto={proyecto}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar_guardado_miembro ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrarGuardadoMiembro(true)} onMouseLeave={() => setBotonCerrarGuardadoMiembro(false)}
                                onClick={() => cerrar_mensaje_nuevo_miembro()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_proyecto_guardado_documento ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevoDocumento proporcional={proporcional} proyecto={proyecto}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar_guardado_documento ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrarGuardadoDocumento(true)} onMouseLeave={() => setBotonCerrarGuardadoDocumento(false)}
                                onClick={() => cerrar_mensaje_nuevo_documento()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_proyecto_guardado_comunicacion ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaComunicacion proporcional={proporcional} proyecto={proyecto}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar_guardado_comunicacion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrarGuardadoComunicacion(true)} onMouseLeave={() => setBotonCerrarGuardadoComunicacion(false)}
                                onClick={() => cerrar_mensaje_nuevo_comunicacion()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_proyecto_guardado_riesgo ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevoRiesgo proporcional={proporcional} proyecto={proyecto}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar_guardado_riesgo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrarGuardadoRiesgo(true)} onMouseLeave={() => setBotonCerrarGuardadoRiesgo(false)}
                                onClick={() => cerrar_mensaje_nuevo_riesgo()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_proyecto_guardado_kpi ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevoKpi proporcional={proporcional} proyecto={proyecto}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar_guardado_kpi ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrarGuardadoKpi(true)} onMouseLeave={() => setBotonCerrarGuardadoKpi(false)}
                                onClick={() => cerrar_mensaje_nuevo_kpi()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }


            {
                show_proyecto_actualizado ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <UpdateGestion proporcional={proporcional} proyecto={proyecto}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar_actualizado ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrarActualizado(true)} onMouseLeave={() => setBotonCerrarActualizado(false)}
                                onClick={() => cerrar_mensaje_actualizado()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                show_proyecto_borrado ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <DeleteMessage proporcional={proporcional} />
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar_borrado ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrarBorrado(true)} onMouseLeave={() => setBotonCerrarBorrado(false)}
                                onClick={() => cerrar_mensaje_borrado()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                confirmacion_eliminacion.show ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <Confirmacion proporcional={proporcional} mensaje={confirmacion_eliminacion.mensaje}/>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_confirmacion_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonConfirmacionCancelar(true)} onMouseLeave={() => setBotonConfirmacionCancelar(false)}
                                onClick={() => cancelar_confirmacion_eliminacion()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                            <div className={boton_confirmacion_aceptar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonConfirmacionAceptar(true)} onMouseLeave={() => setBotonConfirmacionAceptar(false)}
                                onClick={() => aceptar_confirmacion_eliminacion()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Aceptar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                error_message ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <ErrrorMessage proporcional={proporcional}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_error_message ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonErrorMessage(true)} onMouseLeave={() => setBotonErrorMessage(false)}
                                onClick={() => aceptar_error_message()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Aceptar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            <Outlet/>
        </div>
    )
}
