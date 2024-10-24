import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_datos_paso_factura, set_error_message} from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import {facturasdata} from '../../../../redux/slice/facturasdata'
import { facturasConstants } from '../../../../uri/facturas-constants'

export default function DatosClienteTablet ({proporcional, factura}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefTipoDocumento = useRef(null)

    const id_factura = location.pathname.split ('/')[5]
    const [id_cliente, setIdClient] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [tipo_documento, setTipoDocumento] = useState('')
    const [nro_documento, setNroDocumento] = useState('')
    const [direccion_envio, setDireccionEnvio] = useState('')
    const [nro_telefono, setNroTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    
    const [enombres, setENombres] = useState(false)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)

    const {get_factura_cliente, update_factura_cliente} = useSelector(({facturas_data}) => facturas_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        window.scrollTo(0,0)
        if (factura && factura.nombres){
            setIdClient(factura.id_cliente)
            setNombres(factura.nombres)
            setApellidos(factura.apellidos)
            setTipoDocumento(factura.tipo_documento)
            setNroDocumento(factura.nro_documento)
            setDireccionEnvio(factura.direccion_envio)
            setNroTelefono(factura.nro_telefono)
            setCorreo(factura.correo)
        }
    }, [])

    useEffect(() => {
        if (get_factura_cliente && get_factura_cliente.success === true && get_factura_cliente.factura){
            setIdClient(get_factura_cliente.factura.id_cliente)
            setNombres(get_factura_cliente.factura.nombres)
            setApellidos(get_factura_cliente.factura.apellidos)
            setTipoDocumento(get_factura_cliente.factura.tipo_documento)
            setNroDocumento(get_factura_cliente.factura.nro_documento)
            setDireccionEnvio(get_factura_cliente.factura.direccion_envio)
            setNroTelefono(get_factura_cliente.factura.nro_telefono)
            setCorreo(get_factura_cliente.factura.correo)
            setEditarInformacion(false)
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_factura_cliente))
        }else if (get_factura_cliente && get_factura_cliente.success === false && get_factura_cliente.error){
            dispatch(set_error_message(true))
        }
    }, [get_factura_cliente])

    useEffect(() => {
        if (update_factura_cliente && update_factura_cliente.success === true && update_factura_cliente.factura){
            setIdClient(update_factura_cliente.factura.id_cliente)
            setNombres(update_factura_cliente.factura.nombres)
            setApellidos(update_factura_cliente.factura.apellidos)
            setTipoDocumento(update_factura_cliente.factura.tipo_documento)
            setNroDocumento(update_factura_cliente.factura.nro_documento)
            setDireccionEnvio(update_factura_cliente.factura.direccion_envio)
            setNroTelefono(update_factura_cliente.factura.nro_telefono)
            setCorreo(update_factura_cliente.factura.correo)
            setEditarInformacion(false)
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_factura_cliente))
        }else if (update_factura_cliente && update_factura_cliente.success === false && update_factura_cliente.error){
            dispatch(set_error_message(true))
        }
    }, [update_factura_cliente])

    const actualizar_datos_cliente = () => {
        if (nombres === ''){
            setENombres (nombres === '' ? true : false)
        }else{
            setENombres (false)
            const data_factura = {
                id_cliente: id_cliente === '' ? 0 : id_cliente,
                nombres: nombres,
                apellidos: apellidos,
                tipo_documento: tipo_documento,
                nro_documento: nro_documento,
                direccion_envio: direccion_envio,
                nro_telefono: nro_telefono,
                correo: correo
            }
            dispatch (facturasdata(facturasConstants(id_factura, 0, 0, 0, 0, 0, 0, 0, data_factura, false).update_factura_cliente))
        }
    }

    const cancelar_actualizacion = () => {
        dispatch (facturasdata(facturasConstants(id_factura, 0, 0, 0, 0, 0, 0, 0, {}, false).get_factura_cliente))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Nombres</strong></span>
                    <input
                        disabled={!editar_informacion}
                        type='default'
                        id='nombres'
                        value={nombres}
                        className='form-control rounded'
                        onChange={(event) => setNombres(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: enombres ? '1px solid red' : '1px solid #007bff'}}
                        placeholder='Nombres'/>
                </div>  
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Apellidos</strong></span>
                    <input
                        disabled={!editar_informacion}
                        type='default'
                        id='apellidos'
                        value={apellidos}
                        className='form-control rounded'
                        onChange={(event) => setApellidos(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: '1px solid #007bff'}}
                        placeholder='Apellidos'/>
                </div>  
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Tipo documento</strong></span>
                    <select
                        disabled={!editar_informacion}
                        id='tipo_documento'
                        ref={selectRefTipoDocumento}
                        className='form-select rounded'
                        onChange={(event) => event.target.value !== '0' ? setTipoDocumento(event.target.value) : null}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: '1px solid #007bff'}}>
                        <option value='0'>{tipo_documento === '' ? 'Seleccionar documento' : tipo_documento}</option>
                        <option value='D.N.I'>D.N.I</option>
                        <option value='Pasaporte'>Pasaporte</option>
                        <option value='L.E'>L.E</option>
                        <option value='C.E'>C.E</option>
                        <option value='Otro'>Otro</option>
                    </select>
                </div>  
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Nro documento</strong></span>
                    <input
                        disabled={!editar_informacion}
                        type='number'
                        id='nro_documento'
                        value={nro_documento}
                        className='form-control rounded'
                        onChange={(event) => setNroDocumento(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: '1px solid #007bff'}}
                        placeholder='Número de documento'/>
                </div>  
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Nro teléfono</strong></span>
                    <input
                        disabled={!editar_informacion}
                        type='number'
                        id='nro_telefono'
                        value={nro_telefono}
                        className='form-control rounded'
                        onChange={(event) => setNroTelefono(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: '1px solid #007bff'}}
                        placeholder='Número de teléfono'/>
                </div>  
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Correo</strong></span>
                    <input
                        disabled={!editar_informacion}
                        type='e-mail'
                        id='correo'
                        value={correo}
                        className='form-control rounded'
                        onChange={(event) => setCorreo(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: '1px solid #007bff'}}
                        placeholder='Correo'/>
                </div>  
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Dirección</strong></span>
                    <input
                        disabled={!editar_informacion}
                        type='default'
                        id='direccion_envio'
                        value={direccion_envio}
                        className='form-control rounded'
                        onChange={(event) => setDireccionEnvio(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: '1px solid #007bff'}}
                        placeholder='Dirección de envío'/>
                </div>  
            </div>
            {
                editar_informacion ? (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => cancelar_actualizacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                            onClick={() => actualizar_datos_cliente()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => {navigate ('/panel/contabilidad/facturacion'); dispatch(set_datos_paso_factura('cliente'));
                                    setEditarInformacion(false)
                            }}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                        <div VolverlassName={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                            onClick={() => {setEditarInformacion(true); window.scrollTo(0,0)}}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Editar
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
