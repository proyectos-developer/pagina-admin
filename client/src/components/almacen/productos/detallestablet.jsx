import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {productosdata} from '../../../redux/slice/productosdata'
import {productosConstants} from '../../../uri/productos-constants'

import DatosDetallesTablet from './detalles/datosdetallestablet.jsx'
import DatosPreciosTablet from './detalles/datospreciostablet.jsx'
import DatosCaracteristicasTablet from './detalles/datoscaraceristicastablet.jsx'
import DatosFotosTablet from './detalles/datosfotostablet.jsx'
import { set_datos_paso_producto } from '../../../redux/actions/data.js'
import { useLocation, useNavigate } from 'react-router-dom'

export default function DetallesProductoTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const id_producto = location.pathname.split ('/')[6]
    const [producto, setProducto] = useState({})

    const {get_producto_detalles} = useSelector(({productos_data}) => productos_data)
    const {datos_paso_producto, data_producto_detalles} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_producto_detalles))
    }, [])

    useEffect(() => {
        if (get_producto_detalles && get_producto_detalles.success === true && get_producto_detalles.producto){
            setProducto(get_producto_detalles.producto)
        }
    }, [get_producto_detalles])

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
                    onClick={() => navigate ('/panel/almacen/productos')}>
                    productos
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    producto / {producto.producto}
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '50%', height: 196 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_producto === 'detalles' || 
                                        datos_paso_producto === 'guardar' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_producto === 'detalles' || 
                                            datos_paso_producto === 'guardar' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        1
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_producto === 'detalles' || datos_paso_producto === 'detalles' ? '#007bff' : 'white',
                                border: datos_paso_producto === 'detalles' || datos_paso_producto === 'detalles' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_producto === 'detalles' || datos_paso_producto === 'detalles' ? '1px solid white' : '1px solid #007bff'
                            }}
                                onClick={() => dispatch (set_datos_paso_producto('detalles'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_producto === 'detalles' || 
                                        datos_paso_producto === 'detalles' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_producto === 'detalles' || datos_paso_producto === 'detalles' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Detalles
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '50%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_producto === 'precios' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_producto === 'precios' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        2
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_producto === 'precios' ? '#007bff' : 'white',
                                border: datos_paso_producto === 'precios' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_producto === 'precios' ? '1px solid white' : '1px solid #007bff'
                            }}
                                onClick={() => dispatch (set_datos_paso_producto('precios'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_producto === 'precios' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_producto === 'precios' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Precios
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '50%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_producto === 'caracteristicas' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_producto === 'caracteristicas' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        3
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_producto === 'caracteristicas' ? '#007bff' : 'white',
                                border: datos_paso_producto === 'caracteristicas' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_producto === 'caracteristicas' ? '1px solid white' : '1px solid #007bff'
                            }}
                                onClick={() => dispatch (set_datos_paso_producto('caracteristicas'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_producto === 'caracteristicas' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_producto === 'caracteristicas' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Características
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '50%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_producto === 'fotos' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_producto === 'fotos' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        4
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_producto === 'fotos' ? '#007bff' : 'white',
                                border: datos_paso_producto === 'fotos' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_producto === 'fotos' ? '1px solid white' : '1px solid #007bff'
                            }}
                                onClick={() => dispatch (set_datos_paso_producto('fotos'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_producto === 'fotos' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_producto === 'fotos' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Fotos
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        {
                            datos_paso_producto === 'detalles' ? (
                                <DatosDetallesTablet proporcional={proporcional}/>
                            ) : datos_paso_producto === 'precios' ? (
                                <DatosPreciosTablet proporcional={proporcional}/>
                            ) : datos_paso_producto === 'caracteristicas' ? (
                                <DatosCaracteristicasTablet proporcional={proporcional}/>
                            ) : datos_paso_producto === 'fotos' ? (
                                <DatosFotosTablet proporcional={proporcional}/>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
