import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {productosdata} from '../../../redux/slice/productosdata'
import {productosConstants} from '../../../uri/productos-constants'

import DatosDetalles from './nuevo/datosdetalles.jsx'
import DatosPrecios from './nuevo/datosprecios.jsx'
import DatosCaracteristicas from './nuevo/datoscaraceristicas.jsx'
import DatosFotos from './nuevo/datosfotos.jsx'
import { set_data_producto_detalles, set_data_producto_precios, set_data_producto_caracteristicas, 
         set_data_producto_fotos, set_datos_paso_producto } from '../../../redux/actions/data.js'
import { useNavigate } from 'react-router-dom'

export default function NuevoProducto ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {new_producto} = useSelector(({productos_data}) => productos_data)
    const {datos_paso_producto, data_producto_detalles, data_producto_precios, data_producto_caracteristicas,
           data_producto_fotos} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (new_producto && new_producto.success === true && new_producto.producto){
            dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 16, {}, true).new_producto))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_producto])

    useEffect(() => {
        if (datos_paso_producto === 'guardar'){
            const data_nuevo = {
                /**datos detalles */
                producto: data_producto_detalles.producto, 
                descripcion: data_producto_detalles.descripcion, 
                categoria: data_producto_detalles.categoria, 
                id_categoria: data_producto_detalles.id_categoria, 
                subcategoria: data_producto_detalles.subcategoria, 
                id_subcategoria: data_producto_detalles.id_subcategoria, 
                id_servicio: data_producto_detalles.id_servicio, 
                servicio: data_producto_detalles.servicio, 
                proveedor: data_producto_detalles.proveedor, 
                id_proveedor: data_producto_detalles.id_proveedor, 
                marca: data_producto_detalles.marca, 
                id_marca: data_producto_detalles.id_marca, 
                stock: data_producto_detalles.stock, 
                id_unidad: data_producto_detalles.id_unidad, 
                unidad: data_producto_detalles.unidad,

                /**datos precios*/
                precio: data_producto_precios.precio,
                moneda_precio: data_producto_precios.moneda_precio,
                descuento: data_producto_precios.descuento,
                oferta: data_producto_precios.oferta,
                precio_mensual: data_producto_precios.precio_mensual,
                moneda_precio_mensual: data_producto_precios.moneda_precio_mensual,
                precio_anual: data_producto_precios.precio_anual,
                moneda_precio_anual: data_producto_precios.moneda_precio_anual,
                comentarios: data_producto_precios.comentarios,
                stock: data_producto_precios.stock,

                /**datos caracteristicas*/
                caracteristica_1: data_producto_caracteristicas.caracteristica_1, 
                caracteristica_2: data_producto_caracteristicas.caracteristica_2, 
                caracteristica_3: data_producto_caracteristicas.caracteristica_3, 
                caracteristica_4: data_producto_caracteristicas.caracteristica_4, 
                caracteristica_5: data_producto_caracteristicas.caracteristica_5, 
                caracteristica_6: data_producto_caracteristicas.caracteristica_6, 
                caracteristica_7: data_producto_caracteristicas.caracteristica_7, 
                caracteristica_8: data_producto_caracteristicas.caracteristica_8, 
                caracteristica_9: data_producto_caracteristicas.caracteristica_9, 
                caracteristica_10: data_producto_caracteristicas.caracteristica_10, 
                caracteristica_11: data_producto_caracteristicas.caracteristica_11, 
                caracteristica_12: data_producto_caracteristicas.caracteristica_12, 
                caracteristica_13: data_producto_caracteristicas.caracteristica_13, 
                caracteristica_14: data_producto_caracteristicas.caracteristica_14, 
                caracteristica_15: data_producto_caracteristicas.caracteristica_15, 
                caracteristica_16: data_producto_caracteristicas.caracteristica_16, 
                caracteristica_17: data_producto_caracteristicas.caracteristica_17, 
                caracteristica_18: data_producto_caracteristicas.caracteristica_18, 
                caracteristica_19: data_producto_caracteristicas.caracteristica_19, 
                caracteristica_20: data_producto_caracteristicas.caracteristica_20,

                /**datos fotos*/
                url_foto_principal: data_producto_fotos.url_foto_principal,
                url_foto_uno: data_producto_fotos.url_foto_uno,
                url_foto_dos: data_producto_fotos.url_foto_dos,
                url_foto_tres: data_producto_fotos.url_foto_tres,
                url_foto_cuatro: data_producto_fotos.url_foto_cuatro,
                url_foto_cinco: data_producto_fotos.url_foto_cinco
            } 
            dispatch (set_datos_paso_producto('detalles'))
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_producto))
        }
    }, [datos_paso_producto])

    const resetear_data = () => {
        dispatch (set_data_producto_caracteristicas({}))
        dispatch (set_data_producto_detalles({}))
        dispatch (set_data_producto_fotos({}))
        dispatch (set_data_producto_precios({}))
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
                    nuevo
                </p>
            </div>
            <div className='shadow' 
                style={{width: '80%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '25%', height: 196 / proporcional }}>
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
                                background: datos_paso_producto === 'detalles' || datos_paso_producto === 'guardar' ? '#007bff' : 'white',
                                border: datos_paso_producto === 'detalles' || datos_paso_producto === 'guardar' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_producto === 'detalles' || datos_paso_producto === 'guardar' ? '1px solid white' : '1px solid #007bff'
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_producto === 'detalles' || 
                                        datos_paso_producto === 'guardar' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_producto === 'detalles' || datos_paso_producto === 'guardar' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Detalles
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '25%', height: 166 / proporcional }}>
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
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_producto === 'precios' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_producto === 'precios' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Precios y descuentos
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '25%', height: 166 / proporcional }}>
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
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_producto === 'caracteristicas' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_producto === 'caracteristicas' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Características
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '25%', height: 166 / proporcional }}>
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
                            }}>
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
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto'}}>
                            {
                                datos_paso_producto === 'detalles' || datos_paso_producto === 'guardar' ? ( 
                                    <DatosDetalles proporcional={proporcional}/>
                                ) : datos_paso_producto === 'precios' ? (
                                    <DatosPrecios proporcional={proporcional}/>
                                ) : datos_paso_producto === 'caracteristicas' ? (
                                    <DatosCaracteristicas proporcional={proporcional}/>
                                ) : datos_paso_producto === 'fotos' ? (
                                    <DatosFotos proporcional={proporcional}/>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
