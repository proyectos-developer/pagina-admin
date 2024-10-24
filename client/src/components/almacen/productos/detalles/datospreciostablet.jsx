import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { productosdata } from '../../../../redux/slice/productosdata'
import { productosConstants } from '../../../../uri/productos-constants'
import { useLocation, useNavigate } from 'react-router-dom'

export default function DatosPreciosTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefMoneda = useRef(null)
    const selectRefMonedaAnual = useRef(null)
    const selectRefMonedaMensual = useRef(null)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCasncelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const id_producto = location.pathname.split('/')[6]
    const [precio, setPrecio] = useState('')
    const [unidad, setUnidad] = useState('')
    const [moneda_precio, setMonedaPrecio] = useState('')
    const [descuento, setDescuento] = useState('')
    const [oferta, estOferta] = useState('')
    const [precio_mensual, setPrecioMensual] = useState('')
    const [moneda_precio_mensual, setMonedaPrecioMensual] = useState('')
    const [precio_anual, setPrecioAnual] = useState('')
    const [moneda_precio_anual, setMonedaPrecioAnual] = useState('')
    const [comentarios, setComentarios] = useState('')
    const [stock, setStock] = useState('')

    const {data_productos, data_editable} = useSelector(({data_actions}) => data_actions)
    const {update_producto_precios, get_producto_precios} = useSelector(({productos_data}) => productos_data)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_productos && data_productos.precio){
            setPrecio(data_productos.precio)
            setUnidad(data_productos.unidad)
            setMonedaPrecio(data_productos.moneda_precio)
            setDescuento(data_productos.descuento)
            estOferta(data_productos.oferta)
            setPrecioMensual(data_productos.precio_mensual)
            setMonedaPrecioMensual(data_productos.moneda_precio_mensual)
            setPrecioAnual(data_productos.precio_anual)
            setMonedaPrecioAnual(data_productos.moneda_precio_anual)
            setComentarios(data_productos.comentarios)
            setStock(data_productos.stock)
        }else{
            dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_producto_precios))
        }
    }, [])

    useEffect(() => {
        if (get_producto_precios && get_producto_precios.success === true && get_producto_precios.producto){
            setPrecio(get_producto_precios.producto.precio)
            setUnidad(get_producto_precios.producto.unidad)
            setMonedaPrecio(get_producto_precios.producto.moneda_precio)
            setDescuento(get_producto_precios.producto.descuento)
            estOferta(get_producto_precios.producto.oferta)
            setPrecioMensual(get_producto_precios.producto.precio_mensual)
            setMonedaPrecioMensual(get_producto_precios.producto.moneda_precio_mensual)
            setPrecioAnual(get_producto_precios.producto.precio_anual)
            setMonedaPrecioAnual(get_producto_precios.producto.moneda_precio_anual)
            setComentarios(get_producto_precios.producto.comentarios)
            setStock(get_producto_precios.producto.stock)
            setEditarInformacion(false)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_producto_precios))
        }
    }, [get_producto_precios])

    useEffect(() => {
        if (update_producto_precios && update_producto_precios.success === true && update_producto_precios.producto){
            setPrecio(update_producto_precios.producto.precio)
            setUnidad(update_producto_precios.producto.unidad)
            setMonedaPrecio(update_producto_precios.producto.moneda_precio)
            setDescuento(update_producto_precios.producto.descuento)
            estOferta(update_producto_precios.producto.oferta)
            setPrecioMensual(update_producto_precios.producto.precio_mensual)
            setMonedaPrecioMensual(update_producto_precios.producto.moneda_precio_mensual)
            setPrecioAnual(update_producto_precios.producto.precio_anual)
            setMonedaPrecioAnual(update_producto_precios.producto.moneda_precio_anual)
            setComentarios(update_producto_precios.producto.comentarios)
            setStock(update_producto_precios.producto.stock)
            setEditarInformacion(false)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_producto_precios))
        }
    }, [update_producto_precios])

    const actualizar_datos_producto = () => {
        const data_update ={
            precio: precio,
            unidad: unidad,
            moneda_precio: moneda_precio,
            descuento: descuento,
            oferta: oferta,
            precio_mensual: precio_mensual,
            moneda_precio_mensual: moneda_precio_mensual,
            precio_anual: precio_anual,
            moneda_precio_anual: moneda_precio_anual,
            comentarios: comentarios,
            stock: stock
        }
        dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, data_update, false).update_producto_precios))
    }

    const cancelar_edicion_datos = () => {
        dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_producto_precios))
    }

    const volver_a_lista = () => {
        navigate ('/panel/almacen/productos')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion} 
                                id='stock'
                                type='number'
                                className='form-control rounded'
                                value={stock}
                                onChange={(event) => setStock(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='En stock'/>
                        </div>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={true}
                                id='unidad'
                                type='default'
                                className='form-control rounded'
                                value={unidad}
                                onChange={(event) => setUnidad(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='No selecciono unidad'/>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion} 
                                id='precio'
                                type='number'
                                className='form-control rounded'
                                value={precio}
                                onChange={(event) => setPrecio(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional, textAlign: 'center'}}
                                placeholder='Precio'/>
                        </div>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <select
                                disabled={!editar_informacion} 
                                ref={selectRefMoneda}
                                id='moneda_precio'
                                className='form-select rounded'
                                value={moneda_precio}
                                onChange={(event) => setMonedaPrecio(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>{moneda_precio === '' ? 'Seleccionar moneda' : moneda_precio}</option>
                                <option value='S/.'>Sol peruano (S/.)</option>
                                <option value='$'>Dólares americanos ($)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='descuento'
                            type='number'
                            className='form-control rounded'
                            value={descuento}
                            onChange={(event) => setDescuento(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Descuento'/>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='oferta'
                            type='number'
                            className='form-control rounded'
                            value={oferta}
                            onChange={(event) => setOferta(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='oferta'/>
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion} 
                                id='precio_mensual'
                                type='number'
                                className='form-control rounded'
                                value={precio_mensual}
                                onChange={(event) => setPrecioMensual(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional, textAlign: 'center'}}
                                placeholder='Precio mensual'/>
                        </div>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <select
                                disabled={!editar_informacion}
                                ref={selectRefMonedaMensual} 
                                id='moneda_precio_mensual'
                                className='form-select rounded'
                                value={moneda_precio_mensual}
                                onChange={(event) => setMonedaPrecioMensual(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>{moneda_precio_mensual === '' ? 'Seleccionar moneda' : moneda_precio_mensual}</option>
                                <option value='S/.'>Sol peruano (S/.)</option>
                                <option value='$'>Dólares americanos ($)</option>
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion} 
                                id='precio_anual'
                                type='number'
                                className='form-control rounded'
                                value={precio_anual}
                                onChange={(event) => setPrecioAnual(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional, textAlign: 'center'}}
                                placeholder='Precio anual'/>
                        </div>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <select
                                disabled={!editar_informacion} 
                                ref={selectRefMonedaAnual}
                                id='moneda_precio_anual'
                                type='default'
                                className='form-select rounded'
                                value={moneda_precio_anual}
                                onChange={(event) => setMonedaPrecioAnual(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>{moneda_precio_anual === '' ? 'Seleccionar moneda' : moneda_precio_anual}</option>
                                <option value='S/.'>Sol peruano (S/.)</option>
                                <option value='$'>Dólares americanos ($)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea 
                        disabled={!editar_informacion}
                        id='comentarios'
                        type='default'
                        rows={4}
                        className='form-control rounded'
                        value={comentarios}
                        onChange={(event) => setComentarios(event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Descripción'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - comentarios.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - comentarios.length}</p>
                    </div>
                </div>
                
                {
                    editar_informacion ? ( 
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCasncelar(true)} onMouseLeave={() => setBotonCasncelar(false)}
                                onClick={() => cancelar_edicion_datos()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_datos_producto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                onClick={() => volver_a_lista()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                onClick={() => {setEditarInformacion(true); window.scrollTo(0, 0)}}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Editar
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
