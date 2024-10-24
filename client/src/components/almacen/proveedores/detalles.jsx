import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {proveedoresdata} from '../../../redux/slice/proveedoresdata'
import {proveedoresConstants} from '../../../uri/proveedores-constants'

import DatosGeneral from './detalles/datosgeneral.jsx'
import DatosComercial from './detalles/datoscomercial.jsx'
import DatosFinaniera from './detalles/datosfinanciera.jsx'
import DatosEvaluacion from './detalles/datosevaluacion.jsx'
import DatosAdicional from './detalles/datosadicional.jsx'
import { set_datos_paso_proveedor } from '../../../redux/actions/data.js'
import { useLocation, useNavigate } from 'react-router-dom'

export default function DetallesProveedor ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const id_proveedor = location.pathname.split ('/')[6]
    const [proveedor, setProveedor] = useState({})

    const { get_proveedor_general} = useSelector(({proveedores_data}) => proveedores_data)
    const {datos_paso_proveedor, data_proveedor_general} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch (proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_general))
    }, [])

    useEffect(() => {
        if (get_proveedor_general && get_proveedor_general.success === true && get_proveedor_general.proveedor_general){
            setProveedor(get_proveedor_general.proveedor_general)
        }
    }, [get_proveedor_general])

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
                proveedor / {proveedor.nombre_empresa}
            </p>
        </div>
            <div className='shadow' 
                style={{width: '90%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '20%', height: 196 / proporcional }}>
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
                            }}
                                onClick={() => dispatch (set_datos_paso_proveedor('general'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_proveedor === 'general' || 
                                        datos_paso_proveedor === 'guardar' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_proveedor === 'general' || datos_paso_proveedor === 'guardar' ? 
                                        700 : 500, marginBottom: 0}}>
                                    General
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '20%', height: 166 / proporcional }}>
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
                            }}
                                onClick={() => dispatch (set_datos_paso_proveedor('comercial'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_proveedor === 'comercial' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_proveedor === 'comercial' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Comercial
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '20%', height: 166 / proporcional }}>
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
                            }}
                                onClick={() => dispatch (set_datos_paso_proveedor('financiera'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_proveedor === 'financiera' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_proveedor === 'financiera' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Financiera
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '20%', height: 166 / proporcional }}>
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
                            }}
                                onClick={() => dispatch (set_datos_paso_proveedor('evaluacion'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_proveedor === 'evaluacion' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_proveedor === 'evaluacion' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Evaluación
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '20%', height: 166 / proporcional }}>
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
                            }}
                                onClick={() => dispatch (set_datos_paso_proveedor('adicional'))}>
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
                                    <DatosGeneral proporcional={proporcional}/>
                                ) : datos_paso_proveedor === 'comercial' ? (
                                    <DatosComercial proporcional={proporcional}/>
                                ) : datos_paso_proveedor === 'financiera' ? (
                                    <DatosFinaniera proporcional={proporcional}/>
                                ) : datos_paso_proveedor === 'evaluacion' ? (
                                    <DatosEvaluacion proporcional={proporcional}/>
                                ) : datos_paso_proveedor === 'adicional' ? (
                                    <DatosAdicional proporcional={proporcional}/>
                                ): null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
