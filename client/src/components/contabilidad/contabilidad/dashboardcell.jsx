import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { facturasdata } from '../../../redux/slice/facturasdata'
import { facturasConstants } from '../../../uri/facturas-constants'

export default function ContabilidadDashboardCell({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_facturas, setBotonFacturas] = useState(false)

    const [lista_facturas, setListaFacturas] = useState([])

    const {get_facturas_filter} = useSelector(({facturas_data}) => facturas_data)

    useEffect(() => {
        dispatch (facturasdata(facturasConstants(0, 0, 0, 0, 'estado_factura', 'DESC', 0, 16, {}, false).get_facturas_filter))
    }, [])

    useEffect(() => {
        if (get_facturas_filter && get_facturas_filter.success === true && get_facturas_filter.facturas){
            setListaFacturas(get_facturas_filter.facturas)
        }else if (get_facturas_filter && get_facturas_filter.success === false && get_facturas_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_facturas_filter])

    return (
        <div className='position-relative' style={{width: '100%', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
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
                    marginRight: 10 / proporcional}}>
                    contabilidad
                </p>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                <div className='rounded shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                    background: 'white'
                }}>
                    <h6 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Estado de facturas
                    </h6>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional,
                        borderBottom: '1px solid #4a4a4a'
                    }}>
                        <div style={{width: '48%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: 'white'}}>0 </span>
                                Cliente / 
                            </p>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: 'white'}}>0 </span>
                                Razón social
                            </p>
                        </div>
                        <div style={{width: '48%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: 'white'}}>0 </span>
                                Estado factura
                            </p>
                        </div>
                    </div>
                    <div className='overflow-auto' style={{width: '100%', minHeight: 300 / proporcional, maxHeight: 450 / proporcional, marginBottom: 16 / proporcional}}>
                    {
                        lista_facturas && lista_facturas.length > 0 ? (
                            lista_facturas.map ((factura, index) => {
                                return (
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div style={{width: '48%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                                {factura.cliente} / 
                                            </p>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                {factura.razon_social}
                                            </p>
                                        </div>
                                        <div style={{width: '48%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                {factura.estado_factura}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : null
                    }
                    </div>
                    <div className='' style={{width: '100%', height: 40 / proporcional}}>
                        <div className={boton_facturas ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, cursor: 'pointer', background: '#28A745'}}
                            onMouseOver={() => setBotonFacturas(true)} onMouseLeave={() => setBotonFacturas(false)}
                            onClick={() => navigate ('/panel/contabilidad/facturacion')}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver todas las facturas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
