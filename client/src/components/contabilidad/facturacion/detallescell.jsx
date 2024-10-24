import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {facturasdata} from '../../../redux/slice/facturasdata'
import {facturasConstants} from '../../../uri/facturas-constants'
import { set_datos_paso_factura, set_error_message } from '../../../redux/actions/data'

import DatosClienteCell from './detalles/datosclientecell.jsx'
import DatosFiscalesCell from './detalles/datosfiscalescell.jsx'
import DatosProductosServiciosCell from './detalles/datosproductosservicioscell.jsx'
import DatosFacturaCell from './detalles/datosfacturacell.jsx'

export default function DetallesFacturaCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const id_factura = location.pathname.split ('/')[5]
    const [factura, setFactura] = useState({})

    const {get_factura, update_factura_cliente, update_factura_fiscal, update_datos_factura} = useSelector(({facturas_data}) => facturas_data)
    const {datos_paso_factura, data_facturacion} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch (set_datos_paso_factura('cliente'))
        if (data_facturacion.nombres === undefined){
            dispatch(facturasdata(facturasConstants(id_factura, 0, 0, 0, 0, 0, 0, 16, {}, false).get_factura))
        }else{
            setFactura(data_facturacion)
        }
    }, [])

    useEffect(() => {
        if (get_factura && get_factura.success === true && get_factura.factura){
            setFactura(get_factura.factura)
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).get_factura))
        }else if (get_factura && get_factura.success === false && get_factura.error){
            dispatch (set_error_message(true))
        }
    }, [get_factura])

    useEffect(() => {
        if (update_factura_cliente && update_factura_cliente.success === true && update_factura_cliente.factura){
            setFactura(update_factura_cliente.factura)
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).update_factura_cliente))
        }else if (update_factura_cliente && update_factura_cliente.success === false && update_factura_cliente.error){
            dispatch (set_error_message(true))
        }
    }, [update_factura_cliente])

    useEffect(() => {
        if (update_factura_fiscal && update_factura_fiscal.success === true && update_factura_fiscal.factura){
            setFactura(update_factura_fiscal.factura)
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).update_factura_fiscal))
        }else if (update_factura_fiscal && update_factura_fiscal.success === false && update_factura_fiscal.error){
            dispatch (set_error_message(true))
        }
    }, [update_factura_fiscal])

    useEffect(() => {
        if (update_datos_factura && update_datos_factura.success === true && update_datos_factura.factura){
            setFactura(update_datos_factura.factura)
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).update_datos_factura))
        }else if (update_datos_factura && update_datos_factura.success === false && update_datos_factura.error){
            dispatch (set_error_message(true))
        }
    }, [update_datos_factura])

    useEffect(() => {
        return (() => {
            
        })
    }, [])
    
    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                            onClick={() => navigate ('/panel')}>
                        Inicio 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/contabilidad')}>
                        contabilidad
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/contabilidad/facturacion')}>
                        facturación
                    </p>
                </div>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / factura
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}>
                        / {factura.nro_factura}
                    </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '50%', height: 196 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_factura === 'cliente' || 
                                        datos_paso_factura === 'guardar' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_factura === 'cliente' || 
                                            datos_paso_factura === 'guardar' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        1
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_factura === 'cliente' || datos_paso_factura === 'guardar' ? '#007bff' : 'white',
                                border: datos_paso_factura === 'cliente' || datos_paso_factura === 'guardar' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_factura === 'cliente' || datos_paso_factura === 'guardar' ? '1px solid white' : '1px solid #007bff'
                                }} onClick={() => dispatch(set_datos_paso_factura('cliente'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_factura === 'cliente' || 
                                        datos_paso_factura === 'guardar' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_factura === 'cliente' || datos_paso_factura === 'guardar' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Cliente
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '50%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_factura === 'fiscal' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_factura === 'fiscal' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        2
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_factura === 'fiscal' ? '#007bff' : 'white',
                                border: datos_paso_factura === 'fiscal' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_factura === 'fiscal' ? '1px solid white' : '1px solid #007bff'
                                }} onClick={() => dispatch(set_datos_paso_factura('fiscal'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_factura === 'fiscal' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_factura === 'fiscal' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Fiscales
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '50%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_factura === 'productos' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_factura === 'productos' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        3
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_factura === 'productos' ? '#007bff' : 'white',
                                border: datos_paso_factura === 'productos' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_factura === 'productos' ? '1px solid white' : '1px solid #007bff'
                                }} onClick={() => dispatch(set_datos_paso_factura('productos'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_factura === 'productos' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_factura === 'productos' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Productos / servicios
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '50%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_factura === 'factura' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_factura === 'factura' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        4
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_factura === 'factura' ? '#007bff' : 'white',
                                border: datos_paso_factura === 'factura' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_factura === 'factura' ? '1px solid white' : '1px solid #007bff'
                                }} onClick={() => dispatch(set_datos_paso_factura('factura'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_factura === 'factura' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_factura === 'factura' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Factura
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        {
                            datos_paso_factura === 'cliente' && factura.nombres ? ( 
                                <DatosClienteCell proporcional={proporcional} factura={factura}/>
                            ) : datos_paso_factura === 'fiscal' && factura.nombres ? (
                                <DatosFiscalesCell proporcional={proporcional} factura={factura}/>
                            ) : datos_paso_factura === 'productos' && factura.nombres ? (
                                <DatosProductosServiciosCell proporcional={proporcional} factura={factura}/>
                            ) : datos_paso_factura === 'factura' && factura.nombres ? (
                                <DatosFacturaCell proporcional={proporcional} factura={factura}/>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
