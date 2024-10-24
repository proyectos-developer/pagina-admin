import React, { useEffect, useState } from 'react'

import NuevaFacturaTablet from './menu/nuevafacturatablet.jsx'
import UpdateFacturaTablet from './menu/updatefacturatablet.jsx'
import ConfirmacionTablet from '../../comun/message/confirmaciontablet.jsx'
import DeleteMessageTablet from '../../comun/message/deletemessagetablet.jsx'
import ErrrorMessageTablet from '../../comun/message/errortablet.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_confirmacion_eliminacion, set_error_message } from '../../../redux/actions/data.js'

export default function FacturacionPanelTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_cerrar_guardado, setBotonCerrarGuardado] = useState(false)
    const [boton_error_message, setBotonErrorMessage] = useState(false)
    const [boton_cerrar_actualizado, setBotonCerrarActualizado] = useState(false)
    const [boton_cerrar_borrado, setBotonCerrarBorrado] = useState(false)
    const [boton_confirmacion_aceptar, setBotonConfirmacionAceptar] = useState(false)
    const [boton_confirmacion_cancelar, setBotonConfirmacionCancelar] = useState(false)
    const [show_factura_guardada, setShowFacturaGuardada] = useState(false)
    const [show_factura_actualizada, setShowFacturaActualizada] = useState(false)
    const [show_factura_borrada, setShowFacturaBorrada] = useState(false)
    const [factura, setfactura] = useState({})

    const {new_factura, update_factura_cliente, update_factura_fiscales, update_factura_productos,
        update_datos_factura, delete_factura} = useSelector(({facturas_data}) => facturas_data)
    const {confirmacion_eliminacion, error_message} = useSelector(({data_actions}) => data_actions)
    
    useEffect(() => { 
        if (new_factura && new_factura.success === true && new_factura.factura){
            window.scrollTo(0, 0)
            setShowFacturaGuardada(true)
            setfactura(new_factura.factura)
        }else if (new_factura && new_factura.success === false && new_factura.error){
            dispatch (set_error_message(true))
        }
    }, [new_factura])
    
    useEffect(() => { 
        if (update_factura_cliente && update_factura_cliente.success === true && update_factura_cliente.factura){
            window.scrollTo(0, 0)
            setShowFacturaActualizada(true)
            setfactura(update_factura_cliente.factura)
        }else if (update_factura_cliente && update_factura_cliente.success === false && update_factura_cliente.error){
            dispatch (set_error_message(true))
        }
    }, [update_factura_cliente])
    
    useEffect(() => { 
        if (update_factura_fiscales && update_factura_fiscales.success === true && update_factura_fiscales.factura){
            window.scrollTo(0, 0)
            setShowFacturaActualizada(true)
            setfactura(update_factura_fiscales.factura)
        }else if (update_factura_fiscales && update_factura_fiscales.success === false && update_factura_fiscales.error){
            dispatch (set_error_message(true))
        }
    }, [update_factura_fiscales])
    
    useEffect(() => { 
        if (update_factura_productos && update_factura_productos.success === true && update_factura_productos.factura){
            window.scrollTo(0, 0)
            setShowFacturaActualizada(true)
            setfactura(update_factura_productos.factura)
        }else if (update_factura_productos && update_factura_productos.success === false && update_factura_productos.error){
            dispatch (set_error_message(true))
        }
    }, [update_factura_productos])
    
    useEffect(() => { 
        if (update_datos_factura && update_datos_factura.success === true && update_datos_factura.factura){
            window.scrollTo(0, 0)
            setShowFacturaActualizada(true)
            setfactura(update_datos_factura.factura)
        }else if (update_datos_factura && update_datos_factura.success === false && update_datos_factura.error){
            dispatch (set_error_message(true))
        }
    }, [update_datos_factura])

    useEffect(() => {
        if (delete_factura && delete_factura.success === true && delete_factura.facturas){
            window.scrollTo(0, 0)
            setShowFacturaBorrada(true)
        }else if (delete_factura && delete_factura.success === false && delete_factura.error){
            dispatch (set_error_message(true))
        }
    }, [delete_factura])

    const cerrar_mensaje_nuevo = () => {
        setShowFacturaGuardada(false)
        setfactura({})
    }

    const cerrar_mensaje_actualizado = () => {
        setShowFacturaActualizada(false)
        setfactura({})
    }

    const cerrar_mensaje_borrado = () => {
        setShowFacturaBorrada(false)
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
                show_factura_guardada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaFacturaTablet proporcional={proporcional} factura={factura}/>
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
                show_factura_actualizada ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <UpdateFacturaTablet proporcional={proporcional} factura={factura}/>
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
                show_factura_borrada ? (
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
