import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_producto_precios, set_datos_paso_producto} from '../../../../redux/actions/data'

export default function DatosPreciosTablet ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefMoneda = useRef(null)
    const selectRefMonedaAnual = useRef(null)
    const selectRefMonedaMensual = useRef(null)

    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

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
    
    const {data_producto_precios, data_producto_detalles} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_producto_precios && data_producto_precios.precio){
            setPrecio(data_producto_precios.precio)
            setDescuento(data_producto_precios.descuento)
            estOferta(data_producto_precios.oferta)
            setPrecioMensual(data_producto_precios.precio_mensual)
            setPrecioAnual(data_producto_precios.precio_anual)
            setComentarios(data_producto_precios.comentarios)
            setStock(data_producto_precios.stock)
            setUnidad(data_producto_detalles.unidad)
        }else{
            setPrecio('')
            setDescuento('')
            estOferta('')
            setPrecioMensual('')
            setPrecioAnual('')
            setComentarios('')
            setStock('')
            selectRefMoneda.current !== null ? selectRefMoneda.current.value = '0' : null
            selectRefMonedaAnual.current !== null ? selectRefMonedaAnual.current.value = '0' : null
            selectRefMonedaMensual.current !== null ? selectRefMonedaMensual.current.value = '0' : null
        }
    }, [])

    const continuar_datos_caracteristicas = () => {
        dispatch (set_data_producto_precios({
            precio: precio,
            moneda_precio: moneda_precio,
            descuento: descuento,
            oferta: oferta,
            precio_mensual: precio_mensual,
            moneda_precio_mensual: moneda_precio_mensual,
            precio_anual: precio_anual,
            moneda_precio_anual: moneda_precio_anual,
            comentarios: comentarios,
            stock: stock
        }))
        dispatch (set_datos_paso_producto('caracteristicas'))
    }

    const volver_a_lista = () => {
        dispatch (set_data_producto_precios({
            precio: precio,
            moneda_precio: moneda_precio,
            descuento: descuento,
            oferta: oferta,
            precio_mensual: precio_mensual,
            moneda_precio_mensual: moneda_precio_mensual,
            precio_anual: precio_anual,
            moneda_precio_anual: moneda_precio_anual,
            comentarios: comentarios,
            stock: stock
        }))
        dispatch (set_datos_paso_producto('detalles'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea 
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
                    <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                        onClick={() => continuar_datos_caracteristicas()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Continuar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
