import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_facturacion_productos, set_datos_paso_factura, set_error_message } from '../../../../redux/actions/data'
import { productosdata } from '../../../../redux/slice/productosdata'
import { productosConstants } from '../../../../uri/productos-constants'
import { facturasdata } from '../../../../redux/slice/facturasdata'
import { facturasConstants } from '../../../../uri/facturas-constants'

import CardProductoFactura from '../card/productofactura'

export default function DatosProductosServicios ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefProducto = useRef(null)

    const [search_producto, setSearchProducto] = useState('')
    const [total_productos, setTotalProductos] = useState(0)
    const [lista_productos, setListaProductos] = useState([])
    const [lista_productos_factura, setListaProductosFactura] = useState([])
    const [total_facturas, setTotalFacturas] = useState(0)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_siguiente, setBotonSiguiente] = useState(false)

    const {new_producto_factura, get_nro_facturas,
            update_producto_factura, delete_producto_factura,
    } = useSelector(({facturas_data}) => facturas_data)
    const {get_productos_filter} = useSelector(({productos_data}) => productos_data)
    const {new_factura} = useSelector(({facturas_data}) => facturas_data)

    useEffect(() => {
        dispatch (facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_nro_facturas))
    }, [])

    useEffect(() => {
        if (new_factura && new_factura.success === true && new_factura.factura){
            setListaProductos([])
            setListaProductosFactura([])
            selectRefProducto.current !== null ? selectRefProducto.current.value = '0' : null
            setSearchProducto('')
            setTotalProductos(0)
            setTotalFacturas(0)
        }else if (new_factura && new_factura.success === false && new_factura.error){
            dispatch (set_error_message(true))
        }
    }, [new_factura])

    useEffect(() => {
        if (get_nro_facturas && get_nro_facturas.success === true && get_nro_facturas.facturas){
            const nrofacturas = 
                `${get_nro_facturas.facturas.length + 1 < 10 ? `000000${get_nro_facturas.facturas.length + 1}` : 
                   get_nro_facturas.facturas.length + 1 < 100 ? `00000${get_nro_facturas.facturas.length + 1}` :
                   get_nro_facturas.facturas.length + 1 < 1000 ? `0000${get_nro_facturas.facturas.length + 1}` : 
                   get_nro_facturas.facturas.length + 1 < 10000 ? `000${get_nro_facturas.facturas.length + 1}` :
                   get_nro_facturas.facturas.length + 1 < 100000 ? `00${get_nro_facturas.facturas.length + 1}` : 
                   get_nro_facturas.facturas.length + 1 < 1000000 ? `0${get_nro_facturas.facturas.length + 1}` :
                   get_nro_facturas.facturas.length + 1}`
            setTotalFacturas(nrofacturas)
        }else if (get_nro_facturas && get_nro_facturas.success === false && get_nro_facturas.error){
            dispatch (set_error_message(true))
        }
    }, [get_nro_facturas])

    useEffect(() => {
        if (get_productos_filter && get_productos_filter.success === true && get_productos_filter.productos){
            setListaProductos(get_productos_filter.productos)
            setTotalProductos (get_productos_filter.total_productos)
        }else if (get_productos_filter && get_productos_filter.success === false && get_productos_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_productos_filter])

    useEffect(() => {
        if (new_producto_factura && new_producto_factura.success === true && new_producto_factura.productos_factura){
            selectRefProducto.current === null ? null : selectRefProducto.current.value = '0'
            setListaProductosFactura (new_producto_factura.productos_factura)
            dispatch (facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_producto_factura))
        }else if (new_producto_factura && new_producto_factura.success === false && new_producto_factura.error){
            dispatch (set_error_message(true))
        }
    }, [new_producto_factura])

    useEffect(() => {
        if (update_producto_factura && update_producto_factura.success === true && update_producto_factura.productos_factura){
            setListaProductosFactura (update_producto_factura.productos_factura)
            dispatch (facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_producto_factura))
        }else if (update_producto_factura && update_producto_factura.success === false && update_producto_factura.error){
            dispatch (set_error_message(true))
        }
    }, [update_producto_factura])

    useEffect(() => {
        if (delete_producto_factura && delete_producto_factura.success === true && delete_producto_factura.productos_factura){
            setListaProductosFactura (delete_producto_factura.productos_factura)
            dispatch (facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).delete_producto_factura))
        }else if (delete_producto_factura && delete_producto_factura.success === false && delete_producto_factura.error){
            dispatch (set_error_message(true))
        }
    }, [delete_producto_factura])

    const buscar_producto_venta = (value) => {
        if (value !== ''){
            dispatch (productosdata(productosConstants(0, value, 0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_productos_filter))
        }else{
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_productos_filter))
        }
        setSearchProducto(value)
    }

    const agregar_producto_vendido = (value) => {
        const producto_factura = {
            id_factura: 0, 
            descripcion: '', 
            precio_unitario: '', 
            impuestos: '', 
            cantidad: '', 
            nro_factura: total_facturas,
            id_producto: parseInt(value.split('*')[0]),
            producto: value.split('*')[1]
        }
        setListaProductosFactura([])
        dispatch (facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, producto_factura, false).new_producto_factura))
    }

    const continuar_datos_factura = () => {
        dispatch (set_data_facturacion_productos({nro_factura: total_facturas}))
        dispatch (set_datos_paso_factura('factura'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <span className='position-absolute'  
                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                        <strong>Buscar productos</strong></span>
                <input
                    type='default'
                    id='search_producto'
                    value={search_producto}
                    className='form-control rounded'
                    onChange={(event) => buscar_producto_venta(event.target.value)}
                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                            background: 'white', border: '1px solid #007bff'}}
                    placeholder='Buscar por nombre producto, categoría, subcategoría'/>
            </div>   
            <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <span className='position-absolute'  
                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                        <strong>Seleccionar producto</strong></span>
                <select
                    ref={selectRefProducto}
                    className='form-select rounded'
                    onChange={(event) => event.target.value !== '0' ? agregar_producto_vendido(event.target.value) : null}
                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                            background: 'white', border: '1px solid #007bff'}}>
                    <option value='0'>{`${total_productos} encontrado(s)`}</option>
                    {
                        lista_productos && lista_productos.length > 0 ? (
                            lista_productos.map ((producto, index) => {
                                return (
                                    <option key={index} value={producto.id + '*' + producto.producto}>{producto.producto} - {producto.categoria} - {producto.subcategoria}</option>
                                )
                            })
                        ) : null
                    }
                </select>
            </div>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                {
                    lista_productos_factura && lista_productos_factura.length > 0 ? (
                        lista_productos_factura.map ((producto, index) => {
                            return (
                                <CardProductoFactura producto={producto} index={index} key={index} proporcional={proporcional}/>
                            )
                        })
                    ) : null
                }
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => dispatch(set_datos_paso_factura('fiscales'))}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                    onClick={() => continuar_datos_factura()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Continuar
                    </p>
                </div>
            </div>
        </div>
    )
}
