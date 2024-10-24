import React, { useEffect, useState } from 'react'

import NuevaNominaTablet from './menu/nuevanominatablet.jsx'
import UpdateNominaTablet from './menu/updatenominatablet.jsx'
import ConfirmacionTablet from '../../comun/message/confirmaciontablet.jsx'
import DeleteMessageTablet from '../../comun/message/deletemessagetablet.jsx'
import ErrrorMessageTablet from '../../comun/message/errortablet.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_confirmacion_eliminacion, set_error_message } from '../../../redux/actions/data.js'

export default function NominasPanelTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_cerrar_guardado, setBotonCerrarGuardado] = useState(false)
    const [boton_error_message, setBotonErrorMessage] = useState(false)
    const [boton_cerrar_actualizado, setBotonCerrarActualizado] = useState(false)
    const [boton_cerrar_borrado, setBotonCerrarBorrado] = useState(false)
    const [boton_confirmacion_aceptar, setBotonConfirmacionAceptar] = useState(false)
    const [boton_confirmacion_cancelar, setBotonConfirmacionCancelar] = useState(false)
    const [show_nomina_guardada, setShowNominaGuardada] = useState(false)
    const [show_nomina_actualizada, setShowNominaActualizada] = useState(false)
    const [show_nomina_borrada, setShowNominaBorrada] = useState(false)
    const [nomina, setNomina] = useState({})

    const {new_nomina, update_nomina, delete_nomina} = useSelector(({servicios_data}) => servicios_data)
    const {confirmacion_eliminacion, error_message} = useSelector(({data_actions}) => data_actions)
    
    useEffect(() => { 
        if (new_nomina && new_nomina.success === true && new_nomina.nomina){
            window.scrollTo(0, 0)
            setShowNominaGuardada(true)
            setNomina(new_nomina.nomina)
        }else if (new_nomina && new_nomina.success === false && new_nomina.error){
            dispatch (set_error_message(true))
        }
    }, [new_nomina])
    
    useEffect(() => { 
        if (update_nomina && update_nomina.success === true && update_nomina.nomina){
            window.scrollTo(0, 0)
            setShowNominaActualizada(true)
            setNomina(update_nomina.nomina)
        }else if (update_nomina && update_nomina.success === false && update_nomina.error){
            dispatch (set_error_message(true))
        }
    }, [update_nomina])

    useEffect(() => {
        if (delete_nomina && delete_nomina.success === true && delete_nomina.servicios){
            window.scrollTo(0, 0)
            setShowNominaBorrada(true)
        }else if (delete_nomina && delete_nomina.success === false && delete_nomina.error){
            dispatch (set_error_message(true))
        }
    }, [delete_nomina])

    const cerrar_mensaje_nuevo = () => {
        setShowNominaGuardada(false)
        setNomina({})
    }

    const cerrar_mensaje_actualizado = () => {
        setShowNominaActualizada(false)
        setNomina({})
    }

    const cerrar_mensaje_borrado = () => {
        setShowNominaBorrada(false)
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
                show_nomina_guardada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaNominaTablet proporcional={proporcional} nomina={nomina}/>
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
                show_nomina_actualizada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <UpdateNominaTablet proporcional={proporcional} nomina={nomina}/>
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
                show_nomina_borrada ? (
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
