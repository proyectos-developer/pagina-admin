import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { set_data_facturacion_cliente, set_data_facturacion_factura, set_data_facturacion_fiscal, set_data_facturacion_productos, set_datos_paso_factura, set_error_message } from '../../../../redux/actions/data'
import { useDispatch, useSelector } from 'react-redux'

export default function DatosCliente ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectRefTipoDocumento = useRef(null)

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
    const [boton_siguiente, setBotonSiguiente] = useState(false)

    const {data_facturacion_cliente} = useSelector(({data_actions}) => data_actions)
    const {new_factura} = useSelector(({facturas_data}) => facturas_data)

    useEffect(() => {
        if (data_facturacion_cliente && data_facturacion_cliente.nombres){
            setIdClient(data_facturacion_cliente.id_cliente)
            setNombres(data_facturacion_cliente.nombres)
            setApellidos(data_facturacion_cliente.apellidos)
            setTipoDocumento(data_facturacion_cliente.tipo_documento)
            setNroDocumento(data_facturacion_cliente.nro_documento)
            setDireccionEnvio(data_facturacion_cliente.direccion_envio)
            setNroTelefono(data_facturacion_cliente.nro_telefono)
            setCorreo(data_facturacion_cliente.correo)
        }else{
            setIdClient('')
            setNombres('')
            setApellidos('')
            setTipoDocumento('')
            setNroDocumento('')
            setDireccionEnvio('')
            setNroTelefono('')
            setCorreo('')
            selectRefTipoDocumento.current === null ? null : selectRefTipoDocumento.current.value = '0'
        }
    }, [])

    useEffect(() => {
        if (new_factura && new_factura.success === true && new_factura.factura){
            setIdClient('')
            setNombres('')
            setApellidos('')
            setTipoDocumento('')
            setNroDocumento('')
            setDireccionEnvio('')
            setNroTelefono('')
            setCorreo('')
            selectRefTipoDocumento.current === null ? null : selectRefTipoDocumento.current.value = '0'
        }else if (new_factura && new_factura.success === false && new_factura.factura){
            dispatch (set_error_message(true))
        }
    }, [new_factura])

    const volver_a_lista = () => {
        dispatch (set_data_facturacion_cliente({}))
        dispatch (set_data_facturacion_fiscal({}))
        dispatch (set_data_facturacion_productos({}))
        dispatch (set_data_facturacion_factura({}))
        selectRefTipoDocumento.current.value = '0'
        navigate ('/panel/contabilidad/facturacion')
    }

    const continuar_datos_fiscales = () => {
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
            dispatch (set_data_facturacion_cliente(data_factura))
            dispatch (set_datos_paso_factura('fiscales'))
        }
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
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_a_lista()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Cancelar
                    </p>
                </div>
                <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                    onClick={() => continuar_datos_fiscales()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Continuar
                    </p>
                </div>
            </div>
        </div>
    )
}
