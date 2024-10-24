import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation, useNavigate } from 'react-router-dom'
import { proveedoresdata } from '../../../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../../../uri/proveedores-constants'

export default function DatosComercial ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefTipoProveedor = useRef(null)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCasncelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const id_proveedor = location.pathname.split ('/')[6]
    const [fecha_registro, setFechaRegistro] = useState('')  
    const [tipo_proveedor, setTipoProveedor] = useState('')  
    const [productos_servicios, setProductosServicios] = useState('')  
    const [condiciones_comerciales, setCondicionesComerciales] = useState('')  
    const [historial_pedidos, setHistorialPedidos] = useState('')  
    const [facturas, setFacturas] = useState('')  
    const [notas, setNotas] = useState('') 

    const [etipo_proveedor, setETipoProveedor] = useState(false) 

    const {get_proveedor_comercial, update_proveedor_comercial} = useSelector(({proveedores_data}) => proveedores_data)
    const {data_proveedor, data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_proveedor && data_proveedor.fecha_registro){
            setFechaRegistro(data_proveedor.fecha_registro)
            setTipoProveedor(data_proveedor.tipo_proveedor)
            setProductosServicios(data_proveedor.productos_servicios)
            setCondicionesComerciales(data_proveedor.condiciones_comerciales)
            setHistorialPedidos(data_proveedor.historial_pedidos)
            setFacturas(data_proveedor.facturas)
            setNotas(data_proveedor.notas)
        }else{
            dispatch(proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_comercial))
        }
    }, [])

    useEffect(() => {
        if (get_proveedor_comercial && get_proveedor_comercial.success === true && get_proveedor_comercial.proveedor_comercial){
            setFechaRegistro(get_proveedor_comercial.proveedor_comercial.fecha_registro)
            setTipoProveedor(get_proveedor_comercial.proveedor_comercial.tipo_proveedor)
            setProductosServicios(get_proveedor_comercial.proveedor_comercial.productos_servicios)
            setCondicionesComerciales(get_proveedor_comercial.proveedor_comercial.condiciones_comerciales)
            setHistorialPedidos(get_proveedor_comercial.proveedor_comercial.historial_pedidos)
            setFacturas(get_proveedor_comercial.proveedor_comercial.facturas)
            setNotas(get_proveedor_comercial.proveedor_comercial.notas)
            setEditarInformacion(false)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).get_proveedor_comercial))
        }
    }, [get_proveedor_comercial])

    useEffect(() => {
        if (update_proveedor_comercial && update_proveedor_comercial.success === true && update_proveedor_comercial.proveedor_comercial){
            setFechaRegistro(update_proveedor_comercial.proveedor_comercial.fecha_registro)
            setTipoProveedor(update_proveedor_comercial.proveedor_comercial.tipo_proveedor)
            setProductosServicios(update_proveedor_comercial.proveedor_comercial.productos_servicios)
            setCondicionesComerciales(update_proveedor_comercial.proveedor_comercial.condiciones_comerciales)
            setHistorialPedidos(update_proveedor_comercial.proveedor_comercial.historial_pedidos)
            setFacturas(update_proveedor_comercial.proveedor_comercial.facturas)
            setNotas(update_proveedor_comercial.proveedor_comercial.notas)
            setEditarInformacion(false)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).update_proveedor_comercial))
        }
    }, [update_proveedor_comercial])

    const actualiar_datos_proveedor = () => {
        if (tipo_proveedor === ''){
            setETipoProveedor(tipo_proveedor === '' ? true : false)
        }else{
            setETipoProveedor(false)
            const data_update = {
                fecha_registro: fecha_registro,
                tipo_proveedor: tipo_proveedor,
                productos_servicios: productos_servicios,
                condiciones_comerciales: condiciones_comerciales,
                historial_pedidos: historial_pedidos,
                facturas: facturas,
                notas: notas,
            }
            dispatch(proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, data_update, false).update_proveedor_comercial))
        }
    }

    const cancelar_datos_edicion = () => {
        dispatch(proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_comercial))
    }

    const volver_a_lista = () => {
        navigate ('/panel/almacen/proveedores')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
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
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
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
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
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
                        disabled={!editar_informacion} 
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
                        disabled={!editar_informacion} 
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
                            disabled={!editar_informacion} 
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
                        disabled={!editar_informacion} 
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
                {
                    editar_informacion ? ( 
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCasncelar(true)} onMouseLeave={() => setBotonCasncelar(false)}
                                onClick={() => cancelar_datos_edicion()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualiar_datos_proveedor()}>
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
