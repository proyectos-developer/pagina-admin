import React, { useEffect, useState } from 'react'

import NuevoPersonal from './menu/nuevopersonal.jsx'
import UpdatePersonal from './menu/updatepersonal.jsx'
import Confirmacion from '../../comun/message/confirmacion.jsx'
import DeleteMessage from '../../comun/message/deletemessage.jsx'
import ErrrorMessage from '../../comun/message/error.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_confirmacion_eliminacion, set_error_message } from '../../../redux/actions/data.js'

export default function PersonalPanel ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_cerrar_guardado, setBotonCerrarGuardado] = useState(false)
    const [boton_error_message, setBotonErrorMessage] = useState(false)
    const [boton_cerrar_actualizado, setBotonCerrarActualizado] = useState(false)
    const [boton_cerrar_borrado, setBotonCerrarBorrado] = useState(false)
    const [boton_confirmacion_aceptar, setBotonConfirmacionAceptar] = useState(false)
    const [boton_confirmacion_cancelar, setBotonConfirmacionCancelar] = useState(false)
    const [show_personal_guardado, setShowPersonalGuardado] = useState(false)
    const [show_personal_actualizado, setShowPersonalActualizado] = useState(false)
    const [show_personal_borrado, setShowPersonalBorrado] = useState(false)
    const [personal, setPersonal] = useState({})

    const {new_personal, update_personal_personal, update_personal_comunicacion, update_personal_estudios,
        update_personal_trabajo, update_personal_sueldo, update_personal_evaluacion, delete_personal} = useSelector(({personal_data}) => personal_data)
    const {confirmacion_eliminacion, error_message} = useSelector(({data_actions}) => data_actions)
    
    useEffect(() => { 
        if (new_personal && new_personal.success === true && new_personal.trabajador){
            window.scrollTo(0, 0)
            setShowPersonalGuardado(true)
            setPersonal(new_personal.trabajador)
        }else if (new_personal && new_personal.success === false && new_personal.error){
            dispatch (set_error_message(true))
        }
    }, [new_personal])
    
    useEffect(() => { 
        if (update_personal_personal && update_personal_personal.success === true && update_personal_personal.trabajador){
            window.scrollTo(0, 0)
            setShowPersonalActualizado(true)
            setPersonal(update_personal_personal.trabajador)
        }else if (update_personal_personal && update_personal_personal.success === false && update_personal_personal.error){
            dispatch (set_error_message(true))
        }
    }, [update_personal_personal])
    
    useEffect(() => { 
        if (update_personal_comunicacion && update_personal_comunicacion.success === true && update_personal_comunicacion.trabajador){
            window.scrollTo(0, 0)
            setShowPersonalActualizado(true)
            setPersonal(update_personal_comunicacion.trabajador)
        }else if (update_personal_comunicacion && update_personal_comunicacion.success === false && update_personal_comunicacion.error){
            dispatch (set_error_message(true))
        }
    }, [update_personal_comunicacion])
    
    useEffect(() => { 
        if (update_personal_trabajo && update_personal_trabajo.success === true && update_personal_trabajo.trabajador){
            window.scrollTo(0, 0)
            setShowPersonalActualizado(true)
            setPersonal(update_personal_trabajo.trabajador)
        }else if (update_personal_trabajo && update_personal_trabajo.success === false && update_personal_trabajo.error){
            dispatch (set_error_message(true))
        }
    }, [update_personal_trabajo])
    
    useEffect(() => { 
        if (update_personal_estudios && update_personal_estudios.success === true && update_personal_estudios.trabajador){
            window.scrollTo(0, 0)
            setShowPersonalActualizado(true)
            setPersonal(update_personal_estudios.trabajador)
        }else if (update_personal_estudios && update_personal_estudios.success === false && update_personal_estudios.error){
            dispatch (set_error_message(true))
        }
    }, [update_personal_estudios])
    
    useEffect(() => { 
        if (update_personal_sueldo && update_personal_sueldo.success === true && update_personal_sueldo.trabajador){
            window.scrollTo(0, 0)
            setShowPersonalActualizado(true)
            setPersonal(update_personal_sueldo.trabajador)
        }else if (update_personal_sueldo && update_personal_sueldo.success === false && update_personal_sueldo.error){
            dispatch (set_error_message(true))
        }
    }, [update_personal_sueldo])
    
    useEffect(() => { 
        if (update_personal_evaluacion && update_personal_evaluacion.success === true && update_personal_evaluacion.trabajador){
            window.scrollTo(0, 0)
            setShowPersonalActualizado(true)
            setPersonal(update_personal_evaluacion.trabajador)
        }else if (update_personal_evaluacion && update_personal_evaluacion.success === false && update_personal_evaluacion.error){
            dispatch (set_error_message(true))
        }
    }, [update_personal_evaluacion])

    useEffect(() => {
        if (delete_personal && delete_personal.success === true && delete_personal.trabajadors){
            window.scrollTo(0, 0)
            setShowPersonalBorrado(true)
        }else if (delete_personal && delete_personal.success === false && delete_personal.error){
            dispatch (set_error_message(true))
        }
    }, [delete_personal])

    const cerrar_mensaje_nuevo = () => {
        setShowPersonalGuardado(false)
        setPersonal({})
    }

    const cerrar_mensaje_actualizado = () => {
        setShowPersonalActualizado(false)
        setPersonal({})
    }

    const cerrar_mensaje_borrado = () => {
        setShowPersonalBorrado(false)
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
                show_personal_guardado ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevoPersonal proporcional={proporcional} personal={personal}/>
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
                show_personal_actualizado ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <UpdatePersonal proporcional={proporcional} personal={personal}/>
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
                show_personal_borrado ? (
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
