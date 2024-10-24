import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_datos_paso_factura, set_error_message} from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import {facturasdata} from '../../../../redux/slice/facturasdata'
import { facturasConstants } from '../../../../uri/facturas-constants'
import {productosdata} from '../../../../redux/slice/productosdata'
import { productosConstants } from '../../../../uri/productos-constants'

import CardDetallesProductoFacturaTablet from '../card/detallesproductofacturatablet'

export default function DatosProductosServiciosTablet ({proporcional, factura}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefProducto = useRef(null)

    const id_factura = location.pathname.split ('/')[5]
    const [search_producto, setSearchProducto] = useState('')
    const [total_productos, setTotalProductos] = useState(0)
    const [lista_productos, setListaProductos] = useState([])
    const [lista_productos_factura, setListaProductosFactura] = useState([])
    const [total_facturas, setTotalFacturas] = useState(0)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)

    const {new_producto_factura, get_productos_factura_filter, update_producto_factura, delete_producto_factura,
    } = useSelector(({facturas_data}) => facturas_data)
    const {get_productos_filter} = useSelector(({productos_data}) => productos_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (factura.nro_factura){
            setTotalFacturas(factura.nro_factura)
            dispatch (facturasdata(facturasConstants(factura.nro_factura, 0, 0, 0, 0, 0, 0, 16, {}, false).get_productos_factura_filter))
        }
    }, [])

    useEffect(() => {
        if (get_productos_factura_filter && get_productos_factura_filter.success === true && get_productos_factura_filter.productos_factura){
            setListaProductosFactura(get_productos_factura_filter.productos_factura)
            setEditarInformacion(false)
        }else if (get_productos_factura_filter && get_productos_factura_filter.success === false && get_productos_factura_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_productos_factura_filter])

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
        }else if (new_producto_factura && new_producto_factura.success === false && new_producto_factura.error){
            dispatch (set_error_message(true))
        }
    }, [new_producto_factura])

    useEffect(() => {
        if (update_producto_factura && update_producto_factura.success === true && update_producto_factura.productos_factura){
            setListaProductosFactura (update_producto_factura.productos_factura)
        }else if (update_producto_factura && update_producto_factura.success === false && update_producto_factura.error){
            dispatch (set_error_message(true))
        }
    }, [update_producto_factura])

    useEffect(() => {
        if (delete_producto_factura && delete_producto_factura.success === true && delete_producto_factura.productos_factura){
            setListaProductosFactura (delete_producto_factura.productos_factura)
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
            id_factura: id_factura, 
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

    const cancelar_edicion = () => {
        dispatch(facturasdata(facturasConstants(id_factura, 0, 0, 0, 0, 0, 0, 0, {}, false).get_productos_factura_filter))
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
                    disabled={!editar_informacion}
                    type='default'
                    id='search_producto'
                    value={search_producto}
                    className='form-control rounded'
                    onChange={(event) => buscar_producto_venta(event.target.value)}
                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                            border: '1px solid #007bff'}}
                    placeholder='Buscar por nombre producto, categoría, subcategoría'/>
            </div>   
            <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <span className='position-absolute'  
                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                        <strong>Seleccionar producto</strong></span>
                <select
                    disabled={!editar_informacion}
                    ref={selectRefProducto}
                    className='form-select rounded'
                    onChange={(event) => event.target.value !== '0' ? agregar_producto_vendido(event.target.value) : null}
                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                            border: '1px solid #007bff'}}>
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
                                <CardDetallesProductoFacturaTablet producto={producto} index={index} key={index} proporcional={proporcional} editar={editar_informacion}/>
                            )
                        })
                    ) : null
                }
            </div> 
            {
                editar_informacion ? (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => cancelar_edicion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                            onClick={() => setEditarInformacion(false)}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
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
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                            onClick={() => {setEditarInformacion(true); window.scrollTo(0, 0)}}>
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
