import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_proveedor_comercial, set_datos_paso_proveedor} from '../../../../redux/actions/data'

export default function DatosComercialCell ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefTipoProveedor = useRef(null)

    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const [fecha_registro, setFechaRegistro] = useState('')  
    const [tipo_proveedor, setTipoProveedor] = useState('')  
    const [productos_servicios, setProductosServicios] = useState('')  
    const [condiciones_comerciales, setCondicionesComerciales] = useState('')  
    const [historial_pedidos, setHistorialPedidos] = useState('')  
    const [facturas, setFacturas] = useState('')  
    const [notas, setNotas] = useState('') 

    const [etipo_proveedor, setETipoProveedor] = useState(false) 

    const {data_proveedor_comercial} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_proveedor_comercial && data_proveedor_comercial.fecha_registro){
            setFechaRegistro(data_proveedor_comercial.fecha_registro)
            setTipoProveedor(data_proveedor_comercial.tipo_proveedor)
            setProductosServicios(data_proveedor_comercial.productos_servicios)
            setCondicionesComerciales(data_proveedor_comercial.condiciones_comerciales)
            setHistorialPedidos(data_proveedor_comercial.historial_pedidos)
            setFacturas(data_proveedor_comercial.facturas)
            setNotas(data_proveedor_comercial.notas)
        }else{
            setFechaRegistro('')
            setTipoProveedor('')
            setProductosServicios('')
            setCondicionesComerciales('')
            setHistorialPedidos('')
            setFacturas('')
            setNotas('')
            selectRefTipoProveedor.current !== null ? selectRefTipoProveedor.current.value = '0' : null
        }
    }, [])

    const continuar_datos_financiera = () => {
        if (tipo_proveedor === ''){
            setETipoProveedor(tipo_proveedor === '' ? true : false)
        }else{
            setETipoProveedor(false)
            dispatch (set_data_proveedor_comercial({
                fecha_registro: fecha_registro,
                tipo_proveedor: tipo_proveedor,
                productos_servicios: productos_servicios,
                condiciones_comerciales: condiciones_comerciales,
                historial_pedidos: historial_pedidos,
                facturas: facturas,
                notas: notas,
            }))
            dispatch (set_datos_paso_proveedor('financiera'))
        }
    }

    const volver_a_lista = () => {
        dispatch (set_data_proveedor_comercial({
            fecha_registro: fecha_registro,
            tipo_proveedor: tipo_proveedor,
            productos_servicios: productos_servicios,
            condiciones_comerciales: condiciones_comerciales,
            historial_pedidos: historial_pedidos,
            facturas: facturas,
            notas: notas
        }))
        dispatch (set_datos_paso_proveedor('general'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
                            id='fecha_registro'
                            type='date'
                            className='form-control rounded'
                            value={fecha_registro}
                            onChange={(event) => setFechaRegistro(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Fecha registro'/>
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select 
                            ref={selectRefTipoProveedor}
                            id='tipo_proveedor'
                            type='default'
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setTipoProveedor(event.target.value) : null}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: etipo_proveedor ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{tipo_proveedor === '' ? 'Seleccionar tipo proveedor' : tipo_proveedor}</option>
                            <option value='Materia prima'>Materia prima</option>
                            <option value='Componentes'>Componentes</option>
                            <option value='Bienes de equipo'>Bienes de equipo</option>
                            <option value='Servicios'>Servicios</option>
                            <option value='Estratéticos'>Estratéticos</option>
                            <option value='Tácticos'>Tácticos</option>
                            <option value='Oportunistas'>Oportunistas</option>
                        </select>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
                            id='productos_servicios'
                            type='default'
                            className='form-control rounded'
                            value={productos_servicios}
                            onChange={(event) => setProductosServicios(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Productos, servicios'/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea 
                        id='condiciones_comerciales'
                        type='default'
                        rows={3}
                        className='form-control rounded'
                        value={condiciones_comerciales}
                        onChange={(event) => setCondicionesComerciales(event.target.value)}
                        style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Condiciones comerciales'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 1000 - condiciones_comerciales.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{1000 - condiciones_comerciales.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea 
                        id='historial_pedidos'
                        type='default'
                        rows={3}
                        className='form-control rounded'
                        value={historial_pedidos}
                        onChange={(event) => setHistorialPedidos(event.target.value)}
                        style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Historial pedidos'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - historial_pedidos.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - historial_pedidos.length}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '100%', height: 'auto'}}>
                        <input 
                            id='facturas'
                            type='e-mail'
                            className='form-control rounded'
                            value={facturas}
                            onChange={(event) => setFacturas(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Facturas'/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea 
                        id='notas'
                        type='default'
                        rows={3}
                        className='form-control rounded'
                        value={notas}
                        onChange={(event) => setNotas(event.target.value)}
                        style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Notas evaluación'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - notas.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - notas.length}</p>
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Volver
                        </p>
                    </div>
                    <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                        onClick={() => continuar_datos_financiera()}>
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
