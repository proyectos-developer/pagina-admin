import React, { useEffect, useState } from 'react'

import NuevoServicio from './menu/nuevoservicio.jsx'
import UpdateServicio from './menu/updateservicio.jsx'
import Confirmacion from '../../comun/message/confirmacion.jsx'
import DeleteMessage from '../../comun/message/deletemessage.jsx'
import ErrrorMessage from '../../comun/message/error.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_confirmacion_eliminacion, set_error_message } from '../../../redux/actions/data.js'

export default function ServiciosPanel ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_cerrar_guardado, setBotonCerrarGuardado] = useState(false)
    const [boton_error_message, setBotonErrorMessage] = useState(false)
    const [boton_cerrar_actualizado, setBotonCerrarActualizado] = useState(false)
    const [boton_cerrar_borrado, setBotonCerrarBorrado] = useState(false)
    const [boton_confirmacion_aceptar, setBotonConfirmacionAceptar] = useState(false)
    const [boton_confirmacion_cancelar, setBotonConfirmacionCancelar] = useState(false)
    const [show_servicio_guardado, setShowServicioGuardado] = useState(false)
    const [show_servicio_actualizado, setShowServicioActualizado] = useState(false)
    const [show_servicio_borrado, setShowServicioBorrado] = useState(false)
    const [servicio, setServicio] = useState({})

    const {new_servicio, update_servicio, delete_servicio} = useSelector(({servicios_data}) => servicios_data)
    const {confirmacion_eliminacion, error_message} = useSelector(({data_actions}) => data_actions)
    
    useEffect(() => { 
        if (new_servicio && new_servicio.success === true && new_servicio.servicio){
            window.scrollTo(0, 0)
            setShowServicioGuardado(true)
            setServicio(new_servicio.servicio)
        }else if (new_servicio && new_servicio.success === false && new_servicio.error){
            dispatch (set_error_message(true))
        }
    }, [new_servicio])
    
    useEffect(() => { 
        if (update_servicio && update_servicio.success === true && update_servicio.servicio){
            window.scrollTo(0, 0)
            setShowServicioActualizado(true)
            setServicio(update_servicio.servicio)
        }else if (update_servicio && update_servicio.success === false && update_servicio.error){
            dispatch (set_error_message(true))
        }
    }, [update_servicio])

    useEffect(() => {
        if (delete_servicio && delete_servicio.success === true && delete_servicio.servicios){
            window.scrollTo(0, 0)
            setShowServicioBorrado(true)
        }else if (delete_servicio && delete_servicio.success === false && delete_servicio.error){
            dispatch (set_error_message(true))
        }
    }, [delete_servicio])

    const cerrar_mensaje_nuevo = () => {
        setShowServicioGuardado(false)
        setServicio({})
    }

    const cerrar_mensaje_actualizado = () => {
        setShowServicioActualizado(false)
        setServicio({})
    }

    const cerrar_mensaje_borrado = () => {
        setShowServicioBorrado(false)
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
                show_servicio_guardado ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevoServicio proporcional={proporcional} servicio={servicio}/>
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
                show_servicio_actualizado ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <UpdateServicio proporcional={proporcional} servicio={servicio}/>
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
                show_servicio_borrado ? (
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
