import React, { useEffect, useState } from 'react'

import NuevaGestionTablet from './menu/nuevagestiontablet.jsx'
import UpdateGestionTablet from './menu/updategestiontablet.jsx'
import DeleteMessageTablet from '../../../comun/message/deletemessagetablet.jsx'
import ConfirmacionTablet from '../../../comun/message/confirmaciontablet.jsx'
import ErrrorMessageTablet from '../../../comun/message/errortablet.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_confirmacion_eliminacion, set_error_message } from '../../../../redux/actions/data.js'
import { gestionproyectosdata } from '../../../../redux/slice/gestionproyectosdata.js'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants.js'

export default function GestionProyectosPanelTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_cerrar_guardado, setBotonCerrarGuardado] = useState(false)
    const [boton_error_message, setBotonErrorMessage] = useState(false)
    const [boton_cerrar_actualizado, setBotonCerrarActualizado] = useState(false)
    const [boton_cerrar_borrado, setBotonCerrarBorrado] = useState(false)
    const [boton_confirmacion_aceptar, setBotonConfirmacionAceptar] = useState(false)
    const [boton_confirmacion_cancelar, setBotonConfirmacionCancelar] = useState(false)
    const [show_gestion_guardada, setShowGestionGuardada] = useState(false)
    const [show_gestion_actualizada, setShowGestionActualizada] = useState(false)
    const [show_gestion_borrada, setShowGestionBorrada] = useState(false)
    const [gestion_proyecto, setGestionProyecto] = useState({})

    const {new_gestion_proyecto, new_tarea_proyecto, new_equipo_proyecto, new_documento_proyecto, new_comunicacion_proyecto,
            new_riesgo_proyecto, new_kpi_proyecto,
            update_gestion_proyecto, update_tarea_proyecto, update_equipo_proyecto, update_documento_proyecto, update_comunicacion_proyecto,
            update_riesgo_proyecto, update_kpi_proyecto,
            delete_gestion_proyecto} 
        = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {confirmacion_eliminacion, error_message} = useSelector(({data_actions}) => data_actions)
    
    useEffect(() => { 
        if (new_gestion_proyecto && new_gestion_proyecto.success === true && new_gestion_proyecto.gestion_proyecto){
            window.scrollTo(0, 0)
            setShowGestionGuardada(true)
            setGestionProyecto(new_gestion_proyecto.gestion_proyecto)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_gestion_proyecto))
        }else if (new_gestion_proyecto && new_gestion_proyecto.success === false && new_gestion_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [new_gestion_proyecto])
    
    useEffect(() => { 
        if (new_tarea_proyecto && new_tarea_proyecto.success === true && new_tarea_proyecto.tarea_proyecto){
            window.scrollTo(0, 0)
            setShowGestionGuardada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_tarea_proyecto))
        }else if (new_tarea_proyecto && new_tarea_proyecto.success === false && new_tarea_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [new_tarea_proyecto])
    
    useEffect(() => { 
        if (new_equipo_proyecto && new_equipo_proyecto.success === true && new_equipo_proyecto.equipo_proyecto){
            window.scrollTo(0, 0)
            setShowTrabajadorProyecto(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_equipo_proyecto))
        }else if (new_equipo_proyecto && new_equipo_proyecto.success === false && new_equipo_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [new_equipo_proyecto])
    
    useEffect(() => { 
        if (new_documento_proyecto && new_documento_proyecto.success === true && new_documento_proyecto.documento_proyecto){
            window.scrollTo(0, 0)
            setShowGestionGuardada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_documento_proyecto))
        }else if (new_documento_proyecto && new_documento_proyecto.success === false && new_documento_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [new_documento_proyecto])
    
    useEffect(() => { 
        if (new_comunicacion_proyecto && new_comunicacion_proyecto.success === true && new_comunicacion_proyecto.comunicacion_proyecto){
            window.scrollTo(0, 0)
            setShowGestionGuardada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_comunicacion_proyecto))
        }else if (new_comunicacion_proyecto && new_comunicacion_proyecto.success === false && new_comunicacion_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [new_comunicacion_proyecto])
    
    useEffect(() => { 
        if (new_riesgo_proyecto && new_riesgo_proyecto.success === true && new_riesgo_proyecto.riesgo_proyecto){
            window.scrollTo(0, 0)
            setShowGestionGuardada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_riesgo_proyecto))
        }else if (new_riesgo_proyecto && new_riesgo_proyecto.success === false && new_riesgo_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [new_riesgo_proyecto])
    
    useEffect(() => { 
        if (new_kpi_proyecto && new_kpi_proyecto.success === true && new_kpi_proyecto.kpi_proyecto){
            window.scrollTo(0, 0)
            setShowGestionGuardada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_kpi_proyecto))
        }else if (new_kpi_proyecto && new_kpi_proyecto.success === false && new_kpi_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [new_kpi_proyecto])

    
    
    useEffect(() => { 
        if (update_gestion_proyecto && update_gestion_proyecto.success === true && update_gestion_proyecto.gestion_proyecto){
            window.scrollTo(0, 0)
            setShowGestionActualizada(true)
            setGestionProyecto(update_gestion_proyecto.gestion_proyecto)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_gestion_proyecto))
        }else if (update_gestion_proyecto && update_gestion_proyecto.success === false && update_gestion_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_gestion_proyecto])
    
    useEffect(() => { 
        if (update_tarea_proyecto && update_tarea_proyecto.success === true && update_tarea_proyecto.tarea_proyecto){
            window.scrollTo(0, 0)
            setShowGestionActualizada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_tarea_proyecto))
        }else if (update_tarea_proyecto && update_tarea_proyecto.success === false && update_tarea_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_tarea_proyecto])
    
    useEffect(() => { 
        if (update_equipo_proyecto && update_equipo_proyecto.success === true && update_equipo_proyecto.equipo_proyecto){
            window.scrollTo(0, 0)
            setShowTrabajadorProyecto(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_equipo_proyecto))
        }else if (update_equipo_proyecto && update_equipo_proyecto.success === false && update_equipo_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_equipo_proyecto])
    
    useEffect(() => { 
        if (update_documento_proyecto && update_documento_proyecto.success === true && update_documento_proyecto.documento_proyecto){
            window.scrollTo(0, 0)
            setShowGestionActualizada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_documento_proyecto))
        }else if (update_documento_proyecto && update_documento_proyecto.success === false && update_documento_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_documento_proyecto])
    
    useEffect(() => { 
        if (update_comunicacion_proyecto && update_comunicacion_proyecto.success === true && update_comunicacion_proyecto.comunicacion_proyecto){
            window.scrollTo(0, 0)
            setShowGestionActualizada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_comunicacion_proyecto))
        }else if (update_comunicacion_proyecto && update_comunicacion_proyecto.success === false && update_comunicacion_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_comunicacion_proyecto])
    
    useEffect(() => { 
        if (update_riesgo_proyecto && update_riesgo_proyecto.success === true && update_riesgo_proyecto.riesgo_proyecto){
            window.scrollTo(0, 0)
            setShowGestionActualizada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_riesgo_proyecto))
        }else if (update_riesgo_proyecto && update_riesgo_proyecto.success === false && update_riesgo_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_riesgo_proyecto])
    
    useEffect(() => { 
        if (update_kpi_proyecto && update_kpi_proyecto.success === true && update_kpi_proyecto.kpi_proyecto){
            window.scrollTo(0, 0)
            setShowGestionActualizada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_kpi_proyecto))
        }else if (update_kpi_proyecto && update_kpi_proyecto.success === false && update_kpi_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_kpi_proyecto])

    
    
    useEffect(() => { 
        if (delete_gestion_proyecto && delete_gestion_proyecto.success === true && delete_gestion_proyecto.gestion_proyectos){
            window.scrollTo(0, 0)
            setShowGestionActualizada(true)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).delete_gestion_proyecto))
        }else if (delete_gestion_proyecto && delete_gestion_proyecto.success === false && delete_gestion_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [delete_gestion_proyecto])

    const cerrar_mensaje_nuevo = () => {
        setShowGestionGuardada(false)
    }

    const cerrar_mensaje_actualizado = () => {
        setShowGestionGuardada(false)
    }

    const cerrar_mensaje_borrado = () => {
        setShowGestionBorrada(false)
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
                show_gestion_guardada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaGestionTablet proporcional={proporcional} gestion_proyecto={gestion_proyecto}/>
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
                show_gestion_actualizada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <UpdateGestionTablet proporcional={proporcional} gestion_proyecto={gestion_proyecto}/>
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
                show_gestion_borrada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <DeleteMessageTablet proporcional={proporcional} />
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
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <ConfirmacionTablet proporcional={proporcional} mensaje={confirmacion_eliminacion.mensaje}/>
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
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <ErrrorMessageTablet proporcional={proporcional}/>
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
