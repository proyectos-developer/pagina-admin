import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {facturasdata} from '../../../redux/slice/facturasdata'
import { facturasConstants } from '../../../uri/facturas-constants'

import DatosCliente from './nuevo/datoscliente.jsx'
import DatosFiscales from './nuevo/datosfiscales.jsx'
import DatosProductosServicios from './nuevo/datosproductosservicios.jsx'
import DatosFactura from './nuevo/datosfactura.jsx'

import { set_data_facturacion_cliente, set_data_facturacion_fiscal, set_data_facturacion_productos, 
         set_data_facturacion_factura, 
         set_datos_paso_factura,
         set_error_message} from '../../../redux/actions/data.js'
import { useNavigate } from 'react-router-dom'

export default function NuevaFactura ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {new_factura, update_productos_factura } = useSelector(({facturas_data}) => facturas_data)
    const {datos_paso_factura, data_facturacion_cliente, data_facturacion_fiscal,
           data_facturacion_factura} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch (set_datos_paso_factura('cliente'))
    }, [])
    
    useEffect(() => {
        if (new_factura && new_factura.success === true && new_factura.factura){
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_factura))
            const data_update = {
                id_factura: new_factura.factura.id
            }
            dispatch (facturasdata(facturasConstants(new_factura.factura.nro_factura, 0, 0, 0, 0, 0, 0, 0, data_update, false).update_productos_factura))
        }else if (new_factura && new_factura.success === false && new_factura.error){
            dispatch (set_error_message(true))
        }
    }, [new_factura])

    useEffect(() => {
        if (update_productos_factura && update_productos_factura.success === true && update_productos_factura.factura){
            dispatch (facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_productos_factura))
            dispatch (facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_factura))
            window.scrollTo(0, 0)
            resetear_data()
        }else if (update_productos_factura && update_productos_factura.success === false && update_productos_factura.error){
            dispatch (set_error_message(true))
        }
    }, [update_productos_factura])

    useEffect(() => {
        if (datos_paso_factura === 'guardar'){
            const data_nuevo = {
                /**datos cliente */
                id_cliente: data_facturacion_cliente.id_cliente,
                nombres: data_facturacion_cliente.nombres,
                apellidos: data_facturacion_cliente.apellidos,
                tipo_documento: data_facturacion_cliente.tipo_documento,
                nro_documento: data_facturacion_cliente.nro_documento,
                direccion_envio: data_facturacion_cliente.direccion_envio,
                nro_telefono: data_facturacion_cliente.nro_telefono,
                correo: data_facturacion_cliente.correo,

                /**datos fsicales */
                razon_social: data_facturacion_fiscal.razon_social,
                nro_ruc: data_facturacion_fiscal.nro_ruc,
                direccion_fiscal: data_facturacion_fiscal.direccion_fiscal,

                /**datos factura*/
                condiciones_pago: data_facturacion_factura.condiciones_pago,
                nro_factura: data_facturacion_factura.nro_factura,
                fecha_emision: data_facturacion_factura.fecha_emision,
                fecha_vencimiento: data_facturacion_factura.fecha_vencimiento,
                conceptos: data_facturacion_factura.conceptos,
                descuentos: data_facturacion_factura.descuentos,
                recargos: data_facturacion_factura.recargos,
                impuestos: data_facturacion_factura.impuestos,
                total: data_facturacion_factura.total,
                forma_pago: data_facturacion_factura.forma_pago,
                estado_factura: data_facturacion_factura.estado_factura
            } 
            dispatch (set_datos_paso_factura('cliente'))
            dispatch (facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_factura))
        }
    }, [datos_paso_factura])

    const resetear_data = () => {
        dispatch (set_data_facturacion_cliente({}))
        dispatch (set_data_facturacion_fiscal({}))
        dispatch (set_data_facturacion_productos({}))
        dispatch (set_data_facturacion_factura({}))
    }

    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
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
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    nueva
                </p>
            </div>
            <div className='shadow' 
                style={{width: '80%', height: 'auto', background: 'white', padding: 100 / proporcional}}>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                    <div className='' style={{width: '25%', height: 196 / proporcional }}>
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
                        }}>
                            <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                textAlign: 'center', color: datos_paso_factura === 'cliente' || 
                                    datos_paso_factura === 'guardar' ? 'white' : '#007bff', 
                                    fontWeight: datos_paso_factura === 'cliente' || datos_paso_factura === 'guardar' ? 
                                    700 : 500, marginBottom: 0}}>
                                Cliente
                            </p>
                        </div>
                    </div>
                    <div className='' style={{width: '25%', height: 166 / proporcional }}>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                            <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                border: '2px solid #007bff', background: datos_paso_factura === 'fiscales' ? '#007bff' : 'white'
                            }}>
                                <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                    textAlign: 'center',
                                    color: datos_paso_factura === 'fiscales' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                    2
                                </h4>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                            borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                            background: datos_paso_factura === 'fiscales' ? '#007bff' : 'white',
                            border: datos_paso_factura === 'fiscales' ? '1px solid #007bff' : '1px solid white',
                            borderBottom: datos_paso_factura === 'fiscales' ? '1px solid white' : '1px solid #007bff'
                        }}>
                            <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                textAlign: 'center', color: datos_paso_factura === 'fiscales' ? 'white' : '#007bff', 
                                    fontWeight: datos_paso_factura === 'fiscales' ? 
                                    700 : 500, marginBottom: 0}}>
                                Fiscales
                            </p>
                        </div>
                    </div>
                    <div className='' style={{width: '25%', height: 166 / proporcional }}>
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
                        }}>
                            <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                textAlign: 'center', color: datos_paso_factura === 'productos' ? 
                                    'white' : '#007bff', 
                                    fontWeight: datos_paso_factura === 'productos' ? 
                                    700 : 500, marginBottom: 0}}>
                                Productos / servicios
                            </p>
                        </div>
                    </div>
                    <div className='' style={{width: '25%', height: 166 / proporcional }}>
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
                        }}>
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
                        datos_paso_factura === 'cliente' || datos_paso_factura === 'guardar' ? ( 
                            <DatosCliente proporcional={proporcional}/>
                        ) : datos_paso_factura === 'fiscales' ? (
                            <DatosFiscales proporcional={proporcional}/>
                        ) : datos_paso_factura === 'productos' ? (
                            <DatosProductosServicios proporcional={proporcional}/>
                        ) : datos_paso_factura === 'factura' ? (
                            <DatosFactura proporcional={proporcional}/>
                        ) : null
                    }
                </div>    
            </div>
        </div>
    )
}
