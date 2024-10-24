import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_datos_paso_factura, set_error_message} from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import {facturasdata} from '../../../../redux/slice/facturasdata'
import { facturasConstants } from '../../../../uri/facturas-constants'

export default function DatosFiscalesCell ({proporcional, factura}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const id_factura = location.pathname.split ('/')[5]
    const [id_cliente, setIdCliente] = useState('')
    const [razon_social, setRazonSocial] = useState('')
    const [nro_ruc, setNroRuc] = useState('')
    const [direccion_fiscal, setDireccionFiscal] = useState('')
    
    const [erazon_social, setERazonSocial] = useState(false)
    const [enro_ruc, setENroRuc] = useState(false)
    const [edireccion_fiscal, setEDireccionFiscal] = useState(false)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)

    const {get_factura_fiscal, update_factura_fiscal} = useSelector(({facturas_data}) => facturas_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (factura && factura.razon_social){
            setIdCliente(factura.id_cliente)
            setRazonSocial(factura.razon_social)
            setNroRuc(factura.nro_ruc)
            setDireccionFiscal(factura.direccion_fiscal)
        }
    }, [])

    useEffect(() => {
        if (get_factura_fiscal && get_factura_fiscal.success === true && get_factura_fiscal.factura){
            setIdCliente(get_factura_fiscal.factura.id_cliente)
            setRazonSocial(get_factura_fiscal.factura.razon_social)
            setNroRuc(get_factura_fiscal.factura.nro_ruc)
            setDireccionFiscal(get_factura_fiscal.factura.direccion_fiscal)
            setEditarInformacion(false)
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_factura_fiscal))
        }else if (get_factura_fiscal && get_factura_fiscal.success === false && get_factura_fiscal.error){
            dispatch (set_error_message(true))
        }
    }, [get_factura_fiscal])

    useEffect(() => {
        if (update_factura_fiscal && update_factura_fiscal.success === true && update_factura_fiscal.factura){
            setIdCliente(update_factura_fiscal.factura.id_cliente)
            setRazonSocial(update_factura_fiscal.factura.razon_social)
            setNroRuc(update_factura_fiscal.factura.nro_ruc)
            setDireccionFiscal(update_factura_fiscal.factura.direccion_fiscal)
            setEditarInformacion(false)
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_factura_fiscal))
        }else if (update_factura_fiscal && update_factura_fiscal.success === false && update_factura_fiscal.error){
            dispatch (set_error_message(true))
        }
    }, [update_factura_fiscal])

    const actualizar_datos_fiscales = () => {
        if (razon_social === '' && nro_ruc === '' && direccion_fiscal === ''){
            setERazonSocial (razon_social === '' ? true : false)
            setENroRuc (nro_ruc === '' ? true : false)
            setEDireccionFiscal (total === '' ? true : false)
        }else{
            setERazonSocial (false)
            setENroRuc (false)
            setEDireccionFiscal (false)
            const data_factura = {
                id_cliente: id_cliente === '' ? 0 : id_cliente,
                razon_social: razon_social,
                nro_ruc: nro_ruc,
                direccion_fiscal: direccion_fiscal,
            }
            dispatch (facturasdata(facturasConstants(id_factura, 0, 0, 0, 0, 0, 0, 0, data_factura, false).update_factura_fiscal))
        }
    }

    const cancelar_actualizacion = () => {
        dispatch (facturasdata(facturasConstants(id_factura, 0, 0, 0, 0, 0, 0, 0, {}, false).get_factura_fiscal))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Razón social</strong></span>
                    <input
                        disabled={!editar_informacion}
                        type='default'
                        id='razon_social'
                        value={razon_social}
                        className='form-control rounded'
                        onChange={(event) => setRazonSocial(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: erazon_social ? '1px solid red': '1px solid #007bff'}}
                        placeholder='Razón social'/>
                </div>  
                <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Nro R.U.C</strong></span>
                    <input
                        disabled={!editar_informacion}
                        type='number'
                        id='nro_ruc'
                        value={nro_ruc}
                        className='form-control rounded'
                        onChange={(event) => setNroRuc(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: enro_ruc ? '1px solid red': '1px solid #007bff'}}
                        placeholder='Número de R.U.C'/>
                </div>  
            </div>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Dirección fiscal</strong></span>
                    <input
                        disabled={!editar_informacion}
                        type='default'
                        id='direccion_fiscal'
                        value={direccion_fiscal}
                        className='form-control rounded'
                        onChange={(event) => setDireccionFiscal(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: edireccion_fiscal ? '1px solid red': '1px solid #007bff'}}
                        placeholder='Dirección de fiscal'/>
                </div>  
            </div>
            {
                editar_informacion ? (
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => cancelar_actualizacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                            onClick={() => actualizar_datos_fiscales()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
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
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                            onClick={() => {setEditarInformacion(true);window.scrollTo(0, 0)}}>
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
