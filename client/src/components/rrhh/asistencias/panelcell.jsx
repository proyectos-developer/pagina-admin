import React, { useEffect, useState } from 'react'

import NuevaAsistenciaCell from './menu/nuevaasistenciacell.jsx'
import UpdateAsistenciaCell from './menu/updateasistenciacell.jsx'
import ConfirmacionCell from '../../comun/message/confirmacioncell.jsx'
import DeleteMessageCell from '../../comun/message/deletemessagecell.jsx'
import ErrrorMessageCell from '../../comun/message/errorcell.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_confirmacion_eliminacion, set_error_message } from '../../../redux/actions/data.js'

export default function AsistenciasPanelCell ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_cerrar_guardado, setBotonCerrarGuardado] = useState(false)
    const [boton_error_message, setBotonErrorMessage] = useState(false)
    const [boton_cerrar_actualizado, setBotonCerrarActualizado] = useState(false)
    const [boton_cerrar_borrado, setBotonCerrarBorrado] = useState(false)
    const [boton_confirmacion_aceptar, setBotonConfirmacionAceptar] = useState(false)
    const [boton_confirmacion_cancelar, setBotonConfirmacionCancelar] = useState(false)
    const [show_asistencia_guardada, setShowAsistenciaGuardada] = useState(false)
    const [show_asistencia_actualizada, setShowAsistenciaActualizada] = useState(false)
    const [show_asistencia_borrada, setShowAsistenciaBorrada] = useState(false)
    const [asistencia, setAsistencia] = useState({})

    const {new_asistencia, update_asistencia, delete_asistencia} = useSelector(({asistencias_data}) => asistencias_data)
    const {confirmacion_eliminacion, error_message} = useSelector(({data_actions}) => data_actions)
    
    useEffect(() => { 
        if (new_asistencia && new_asistencia.success === true && new_asistencia.asistencia){
            window.scrollTo(0, 0)
            setShowAsistenciaGuardada(true)
            setAsistencia(new_asistencia.asistencia)
        }else if (new_asistencia && new_asistencia.success === false && new_asistencia.error){
            dispatch (set_error_message(true))
        }
    }, [new_asistencia])
    
    useEffect(() => { 
        if (update_asistencia && update_asistencia.success === true && update_asistencia.asistencia){
            window.scrollTo(0, 0)
            setShowAsistenciaActualizada(true)
            setAsistencia(update_asistencia.asistencia)
        }else if (update_asistencia && update_asistencia.success === false && update_asistencia.error){
            dispatch (set_error_message(true))
        }
    }, [update_asistencia])

    useEffect(() => {
        if (delete_asistencia && delete_asistencia.success === true && delete_asistencia.asistencias){
            window.scrollTo(0, 0)
            setShowAsistenciaBorrada(true)
        }else if (delete_asistencia && delete_asistencia.success === false && delete_asistencia.error){
            dispatch (set_error_message(true))
        }
    }, [delete_asistencia])

    const cerrar_mensaje_nuevo = () => {
        setShowAsistenciaGuardada(false)
        setAsistencia({})
    }

    const cerrar_mensaje_actualizado = () => {
        setShowAsistenciaActualizada(false)
        setAsistencia({})
    }

    const cerrar_mensaje_borrado = () => {
        setShowAsistenciaBorrada(false)
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
                show_asistencia_guardada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '90%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaAsistenciaCell proporcional={proporcional} asistencia={asistencia}/>
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
                show_asistencia_actualizada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '90%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <UpdateAsistenciaCell proporcional={proporcional} asistencia={asistencia}/>
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
                show_asistencia_borrada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '90%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <DeleteMessageCell proporcional={proporcional} />
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
                        style={{width: '90%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <ConfirmacionCell proporcional={proporcional} mensaje={confirmacion_eliminacion.mensaje}/>
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
                        style={{width: '90%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <ErrrorMessageCell proporcional={proporcional}/>
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
