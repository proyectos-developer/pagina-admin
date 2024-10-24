import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { facturasdata } from '../../../../redux/slice/facturasdata'
import { facturasConstants } from '../../../../uri/facturas-constants'
import axios from 'axios'
import { constantes } from '../../../../uri/constantes'

export default function CardDetalesProductoFacturaCell ({proporcional, index, producto, editar}) {

    const dispatch = useDispatch()

    const [precio_unitario, setPrecioUnitario] = useState(0)
    const [impuestos, setImpuestos] = useState(0)
    const [cantidad, setCantidad] = useState(0)
    const [descripcion, setDescripcion] = useState('')
    const [unidad, setUnidad] = useState('')

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_eliminar, setBotonEliminar] = useState(false)

    useEffect(() => {
        axios.get (`${constantes().url_principal[0].url}/producto/${producto.id_producto}`)
            .then ((res) => {
                setUnidad(res.data.producto.unidad)
                setPrecioUnitario(res.data.producto.precio)
            }).catch ((err) => {
                dispatch (set_error_message(true))
            })
    }, [])

    const actualizar_producto = () => {
        const data_udpate = {
            id_factura: producto.id_factura,
            descripcion: descripcion,
            precio_unitario: precio_unitario,
            impuestos: impuestos,
            cantidad: cantidad,
            producto: producto.producto
        }
        dispatch(facturasdata(facturasConstants(producto.id_producto, producto.nro_factura, 0, 0, 0, 0, 0, 0, data_udpate, false).update_producto_factura))
    }

    const eliminar_producto = () => {
        dispatch(facturasdata(facturasConstants(producto.id_producto, producto.nro_factura, 0, 0, 0, 0, 0, 0, {}, false).delete_producto_factura))
    }
    
    return (
        <div className='d-flex justify-content-between' key={index} 
            style={{width: '100%', height: 'auto', paddingBottom: 5 / proporcional, 
                    paddingTop: 5 / proporcional, marginBottom: 16 / proporcional, borderBottom: '1px dashed #4a4a4a'}}>

            <div className='d-flex jsutify-content-between' 
                style={{width: '5%', height: 152 / proporcional}}>   
                <div className='d-flex justify-content-center' style={{width: '100%', height: 152 / proporcional}}>
                    <p style={{lineHeight: `${152 / proporcional}px`, fontSize: 14 / proporcional, 
                            color: 'rgb(89, 89, 89)', cursor: 'pointer',
                            fontFamily: 'Poppins, sans-serif', background: 'white'}}><strong>{index + 1}.</strong></p>
                </div> 
            </div>
            <div className='' key={index} 
                style={{width: '78%', height: 'auto'}}>
                <div className='d-flex justify-content-between' key={index} 
                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <div className='position-relative' style={{width: '58%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Producto</strong></span>
                        <input  
                            disabled={true}
                            type='default'
                            value={producto.producto}
                            className='form-control rounded'
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}/>
                    </div>
                    
                    <div className='position-relative' style={{width: '40%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Precio (S/.)</strong></span>
                        <input  
                            disabled={true}
                            type='number'
                            value={precio_unitario}
                            onChange={(event) => setPrecioUnitario(event.target.value)}
                            className='form-control rounded'
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}/>
                    </div>
                </div>

                <div className='d-flex justify-content-between' key={index} 
                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                            
                    <div className='position-relative d-flex justify-content-between' style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Cantidad</strong></span>
                        <input  
                            disabled={!editar}
                            type='number'
                            value={cantidad}
                            onChange={(event) => setCantidad(event.target.value)}
                            className='form-control rounded'
                            style={{width: '46%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, textAlign: 'center',
                                    border: '1px solid #007bff'}}/>
                        <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                            <p style={{lineHeight: `${40 / proporcional}px`, fontSize: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', background: 'white'}}>{unidad}</p>
                        </div>
                    </div>
                            
                    <div className='position-relative' style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>IGV (%)</strong></span>
                        <input  
                            disabled={!editar}
                            type='number'
                            value={impuestos}
                            onChange={(event) => setImpuestos(event.target.value)}
                            className='form-control rounded'
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, textAlign: 'center',
                                    border: '1px solid #007bff'}}/>
                    </div>
                </div>
                   
                <div className='position-relative' style={{width: '100%', height: 'auto'}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Descripción</strong></span>
                    <input  
                        disabled={!editar}
                        type='default'
                        value={descripcion}
                        onChange={(event) => setDescripcion(event.target.value)}
                        className='form-control rounded'
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: '1px solid #007bff'}}
                        placeholder='Descripción'/>
                </div>
            </div> 

            <div className='' 
                style={{width: '22%', height: 152 / proporcional
                }}>   
                <div className='d-flex justify-content-center' style={{width: '100%', height: 76 / proporcional}}>
                    <p style={{lineHeight: `${76 / proporcional}px`, fontSize: 14 / proporcional, 
                            color: 'rgb(89, 89, 89)', cursor: 'pointer',
                            fontWeight: boton_actualizar ? 700 : 500,
                            fontFamily: 'Poppins, sans-serif', background: 'white'}}
                    onClick={() => editar ? actualizar_producto() : null}
                    onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}>Actualizar</p>
                </div> 
                <div className='d-flex justify-content-center' style={{width: '100%', height: 76 / proporcional}}>
                    <p style={{lineHeight: `${76 / proporcional}px`, fontSize: 14 / proporcional, 
                            color: 'rgb(89, 89, 89)', cursor: 'pointer',
                            fontWeight: boton_eliminar ? 700 : 500,
                            fontFamily: 'Poppins, sans-serif', background: 'white'}}
                    onClick={() => editar ? eliminar_producto() : null}
                    onMouseOver={() => setBotonEliminar(true)} onMouseLeave={() => setBotonEliminar(false)}>Borrar</p>
                </div> 
            </div>
        </div>
    )
}
