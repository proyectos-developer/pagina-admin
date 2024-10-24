import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {proveedoresdata} from '../../../redux/slice/proveedoresdata'
import {proveedoresConstants} from '../../../uri/proveedores-constants'

import DatosGeneralCell from './nuevo/datosgeneralcell.jsx'
import DatosComercialCell from './nuevo/datoscomercialcell.jsx'
import DatosFinanieraCell from './nuevo/datosfinancieracell.jsx'
import DatosEvaluacionCell from './nuevo/datosevaluacioncell.jsx'
import DatosAdicionalCell from './nuevo/datosadicionalcell.jsx'
import { set_data_proveedor_general, set_data_proveedor_comercial, set_data_proveedor_financiera, 
         set_data_proveedor_evaluacion, set_data_proveedor_adicional,  
         set_datos_paso_proveedor } from '../../../redux/actions/data.js'
import { useNavigate } from 'react-router-dom'

export default function NuevoProveedorCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {new_proveedor} = useSelector(({proveedores_data}) => proveedores_data)
    const {datos_paso_proveedor, data_proveedor_general, data_proveedor_comercial, data_proveedor_financiera,
           data_proveedor_evaluacion, data_proveedor_adicional} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (new_proveedor && new_proveedor.success === true && new_proveedor.proveedor){
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 16, {}, true).new_proveedor))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_proveedor])

    useEffect(() => {
        if (datos_paso_proveedor === 'guardar'){
            const data_nuevo = {
                /**datos generales */
                nombre_empresa: data_proveedor_general.nombre_empresa,
                nombre_contacto: data_proveedor_general.nombre_contacto,
                cargo: data_proveedor_general.cargo,
                telefono: data_proveedor_general.telefono,
                correo: data_proveedor_general.correo,
                direccion: data_proveedor_general.direccion,
                sitio_web: data_proveedor_general.sitio_web,
                logo: data_proveedor_general.logo,

                /**datos comerciales*/
                fecha_registro: data_proveedor_comercial.fecha_registro,
                tipo_proveedor: data_proveedor_comercial.tipo_proveedor,
                productos_servicios: data_proveedor_comercial.productos_servicios,
                condiciones_comerciales: data_proveedor_comercial.condiciones_comerciales,
                historial_pedidos: data_proveedor_comercial.historial_pedidos,
                facturas: data_proveedor_comercial.facturas,
                notas: data_proveedor_comercial.notas,

                /**datos financiera*/
                cuenta_bancaria: data_proveedor_financiera.cuenta_bancaria,
                cuenta_interbancaria: data_proveedor_financiera.cuenta_interbancaria,
                cuenta_iban: data_proveedor_financiera.cuenta_iban,
                moneda: data_proveedor_financiera.moneda,
                limite_credito: data_proveedor_financiera.limite_credito,
                forma_pago: data_proveedor_financiera.forma_pago,

                /**datos evaluacion*/
                calificacion: data_proveedor_evaluacion.calificacion,
                comentarios: data_proveedor_evaluacion.comentarios,
                ultima_revision: data_proveedor_evaluacion.ultima_revision,

                /**datos adicional*/
                certificaciones: data_proveedor_adicional.certificaciones,
                referencias: data_proveedor_adicional.referencias,
                segmentos_mercado: data_proveedor_adicional.segmentos_mercado,
                tamanio_empresa: data_proveedor_adicional.tamanio_empresa,
                redes_sociales: data_proveedor_adicional.redes_sociales,
            } 
            dispatch (set_datos_paso_proveedor('general'))
            dispatch (proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 16, data_nuevo, false).new_proveedor))
        }
    }, [datos_paso_proveedor])

    const resetear_data = () => {
        dispatch (set_data_proveedor_financiera({}))
        dispatch (set_data_proveedor_general({}))
        dispatch (set_data_proveedor_adicional({}))
        dispatch (set_data_proveedor_evaluacion({}))
        dispatch (set_data_proveedor_comercial({}))
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
                    onClick={() => navigate ('/panel/almacen')}>
                    almacén
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/almacen/proveedores')}>
                    proveedores
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    nuevo
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '48%', height: 196 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_proveedor === 'general' || 
                                        datos_paso_proveedor === 'guardar' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_proveedor === 'general' || 
                                            datos_paso_proveedor === 'guardar' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        1
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_proveedor === 'general' || datos_paso_proveedor === 'guardar' ? '#007bff' : 'white',
                                border: datos_paso_proveedor === 'general' || datos_paso_proveedor === 'guardar' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_proveedor === 'general' || datos_paso_proveedor === 'guardar' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_proveedor === 'general' || 
                                        datos_paso_proveedor === 'guardar' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_proveedor === 'general' || datos_paso_proveedor === 'guardar' ? 
                                        700 : 500, marginBottom: 0}}>
                                    General
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '48%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_proveedor === 'comercial' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_proveedor === 'comercial' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        2
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_proveedor === 'comercial' ? '#007bff' : 'white',
                                border: datos_paso_proveedor === 'comercial' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_proveedor === 'comercial' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_proveedor === 'comercial' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_proveedor === 'comercial' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Comercial
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '48%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_proveedor === 'financiera' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_proveedor === 'financiera' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        3
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_proveedor === 'financiera' ? '#007bff' : 'white',
                                border: datos_paso_proveedor === 'financiera' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_proveedor === 'financiera' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_proveedor === 'financiera' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_proveedor === 'financiera' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Financiera
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '48%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_proveedor === 'evaluacion' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_proveedor === 'evaluacion' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        4
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_proveedor === 'evaluacion' ? '#007bff' : 'white',
                                border: datos_paso_proveedor === 'evaluacion' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_proveedor === 'evaluacion' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_proveedor === 'evaluacion' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_proveedor === 'evaluacion' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Evaluación
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '48%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_proveedor === 'adicional' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_proveedor === 'adicional' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        5
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_proveedor === 'adicional' ? '#007bff' : 'white',
                                border: datos_paso_proveedor === 'adicional' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_proveedor === 'adicional' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_proveedor === 'adicional' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_proveedor === 'adicional' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Adicional
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        {
                           data_proveedor_general && data_proveedor_general.logo ? (
                                <div className='d-flex justify-content-center' style={{width: '25%', height: 'auto'}}> 
                                    <div style={{width: 182 / proporcional, height: 'auto'}}>
                                        <div className='rounded-circle' style={{width:  182 / proporcional, height: 182 / proporcional,
                                            border: '1px solid #4a4a4a', marginRight: 0 / proporcional, marginBottom: 16 / proporcional}}>
                                                    <img className='rounded-circle' src={data_proveedor_general.logo} 
                                                    style={{width: 180 / proporcional, height: 180 / proporcional}}/>
                                        </div>
                                        <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`,
                                            color: '#007bff', marginBottom: 16 / proporcional, fontWeight: 600, textAlign: 'center'}}>
                                            {data_proveedor_general.nombre_contacto}
                                        </h2>
                                    </div>
                                </div>
                            ) : null
                        }
                        <div style={{width: data_proveedor_general && data_proveedor_general.foto ? '73%' : '100%', height: 'auto'}}>
                            {
                                datos_paso_proveedor === 'general' || datos_paso_proveedor === 'guardar' ? ( 
                                    <DatosGeneralCell proporcional={proporcional}/>
                                ) : datos_paso_proveedor === 'comercial' ? (
                                    <DatosComercialCell proporcional={proporcional}/>
                                ) : datos_paso_proveedor === 'financiera' ? (
                                    <DatosFinanieraCell proporcional={proporcional}/>
                                ) : datos_paso_proveedor === 'evaluacion' ? (
                                    <DatosEvaluacionCell proporcional={proporcional}/>
                                ) : datos_paso_proveedor === 'adicional' ? (
                                    <DatosAdicionalCell proporcional={proporcional}/>
                                ): null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
