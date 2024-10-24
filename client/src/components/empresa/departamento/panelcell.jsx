import React, { useEffect, useState } from 'react'

import NuevoDepartamentoCell from './menu/nuevodepartamentocell.jsx'
import UpdateDepartamentoCell from './menu/updatedepartamentocell.jsx'
import ConfirmacionCell from '../../comun/message/confirmacioncell.jsx'
import DeleteMessageCell from '../../comun/message/deletemessagecell.jsx'
import ErrrorMessageCell from '../../comun/message/errorcell.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_confirmacion_eliminacion, set_error_message } from '../../../redux/actions/data.js'

export default function DepartamentosEmpresaPanelCell ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_cerrar_guardado, setBotonCerrarGuardado] = useState(false)
    const [boton_error_message, setBotonErrorMessage] = useState(false)
    const [boton_cerrar_actualizado, setBotonCerrarActualizado] = useState(false)
    const [boton_cerrar_borrado, setBotonCerrarBorrado] = useState(false)
    const [boton_confirmacion_aceptar, setBotonConfirmacionAceptar] = useState(false)
    const [boton_confirmacion_cancelar, setBotonConfirmacionCancelar] = useState(false)
    const [show_departamento_guardado, setShowDepartamentoGuardado] = useState(false)
    const [show_departamento_actualizado, setShowDepartamentoActualizado] = useState(false)
    const [show_departamento_borrado, setShowDepartamentoBorrado] = useState(false)
    const [departamento, setDepartamento] = useState({})

    const {new_departamento, update_departamento, delete_departamento} = useSelector(({departamentos_data}) => departamentos_data)
    const {confirmacion_eliminacion, error_message} = useSelector(({data_actions}) => data_actions)
    
    useEffect(() => { 
        if (new_departamento && new_departamento.success === true && new_departamento.departamento){
            window.scrollTo(0, 0)
            setShowDepartamentoGuardado(true)
            setDepartamento(new_departamento.departamento)
        }else if (new_departamento && new_departamento.success === false && new_departamento.error){
            dispatch (set_error_message(true))
        }
    }, [new_departamento])
    
    useEffect(() => { 
        if (update_departamento && update_departamento.success === true && update_departamento.departamento){
            window.scrollTo(0, 0)
            setShowDepartamentoActualizado(true)
            setDepartamento(update_departamento.departamento)
        }else if (update_departamento && update_departamento.success === false && update_departamento.error){
            dispatch (set_error_message(true))
        }
    }, [update_departamento])

    useEffect(() => {
        if (delete_departamento && delete_departamento.success === true && delete_departamento.departamentos){
            window.scrollTo(0, 0)
            setShowDepartamentoBorrado(true)
        }else if (delete_departamento && delete_departamento.success === false && delete_departamento.error){
            dispatch (set_error_message(true))
        }
    }, [delete_departamento])

    const cerrar_mensaje_nuevo = () => {
        setShowDepartamentoGuardado(false)
        setDepartamento({})
    }

    const cerrar_mensaje_actualizado = () => {
        setShowDepartamentoActualizado(false)
        setDepartamento({})
    }

    const cerrar_mensaje_borrado = () => {
        setShowDepartamentoBorrado(false)
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
                show_departamento_guardado ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '90%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevoDepartamentoCell proporcional={proporcional} departamento={departamento}/>
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
                show_departamento_actualizado ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '90%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <UpdateDepartamentoCell proporcional={proporcional} departamento={departamento}/>
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
                show_departamento_borrado ? (
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
