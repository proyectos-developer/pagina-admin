import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { set_datos_paso_factura, set_error_message} from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import {facturasdata} from '../../../../redux/slice/facturasdata'
import { facturasConstants } from '../../../../uri/facturas-constants'

export default function DatosFacturaCell ({proporcional, factura}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefEstadoFactura = useRef(null)

    const id_factura = location.pathname.split ('/')[5]
    const [condiciones_pago, setCondicionesPago] = useState('')
    const [total_facturas, setTotalFacturas] = useState(0)
    const [fecha_emision, setFechaEmision] = useState('')
    const [fecha_vencimiento, setFechaVencimiento] = useState('')
    const [conceptos, setConceptos] = useState('')
    const [descuentos, setDescuentos] = useState('')
    const [recargos, setRecargos] = useState('')
    const [impuestos, setImpuestos] = useState('')
    const [total, setTotal] = useState('')
    const [forma_pago, setFormaPago] = useState('')
    const [estado_factura, setEstadoFactura] = useState('')

    const [efecha_emision, setEFechaEmision] = useState(false)
    const [efecha_vencimiento, setEFechaVencimiento] = useState(false)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)

    const {get_datos_factura, update_datos_factura} = useSelector(({facturas_data}) => facturas_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (factura && factura.nro_factura){
            setCondicionesPago(factura.condiciones_pago)
            setTotalFacturas(factura.nro_factura)
            setFechaEmision(factura.fecha_emision)
            setFechaVencimiento(factura.fecha_vencimiento)
            setConceptos(factura.conceptos)
            setDescuentos(factura.descuentos)
            setRecargos(factura.recargo)
            setImpuestos(factura.impuestos)
            setTotal(factura.setTotal)
            setFormaPago(factura.forma_pago)
            setEstadoFactura(factura.estado_factura)
        }
    }, [])

    useEffect(() => {
        if (get_datos_factura && get_datos_factura.success === true && get_datos_factura.factura){
            setCondicionesPago(get_datos_factura.factura.condiciones_pago)
            setTotalFacturas(get_datos_factura.factura.nro_factura)
            setFechaEmision(get_datos_factura.factura.fecha_emision)
            setFechaVencimiento(get_datos_factura.factura.fecha_vencimiento)
            setConceptos(get_datos_factura.factura.conceptos)
            setDescuentos(get_datos_factura.factura.descuentos)
            setRecargos(get_datos_factura.factura.recargo)
            setImpuestos(get_datos_factura.factura.impuestos)
            setTotal(get_datos_factura.factura.setTotal)
            setFormaPago(get_datos_factura.factura.forma_pago)
            setEstadoFactura(get_datos_factura.factura.estado_factura)
            setEditarInformacion(false)
            dispatch(facturasdata(facturasConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_datos_factura))
        }else if (get_datos_factura && get_datos_factura.success === false && get_datos_factura.error){
            dispatch (set_error_message(true))
        }
    }, [get_datos_factura])

    useEffect(() => {
        if (update_datos_factura && update_datos_factura.success === true && update_datos_factura.factura){
            setCondicionesPago(update_datos_factura.factura.condiciones_pago)
            setTotalFacturas(update_datos_factura.factura.nro_factura)
            setFechaEmision(update_datos_factura.factura.fecha_emision)
            setFechaVencimiento(update_datos_factura.factura.fecha_vencimiento)
            setConceptos(update_datos_factura.factura.conceptos)
            setDescuentos(update_datos_factura.factura.descuentos)
            setRecargos(update_datos_factura.factura.recargo)
            setImpuestos(update_datos_factura.factura.impuestos)
            setTotal(update_datos_factura.factura.setTotal)
            setFormaPago(update_datos_factura.factura.forma_pago)
            setEstadoFactura(update_datos_factura.factura.estado_factura)
            setEditarInformacion(false)
            dispatch(facturasdata(facturasConstants(factura.id, 0, 0, 0, 0, 0, 0, 0, {}, true).update_datos_factura))
        }else if (update_datos_factura && update_datos_factura.success === false && update_datos_factura.error){
            dispatch (set_error_message(true))
        }
    }, [update_datos_factura])

    const actualizar_datos_factura = () => {
        if (fecha_emision === '' && fecha_vencimiento === '' && total === '' ||
            (500 - condiciones_pago.length <= 0) ||(500 - conceptos.length <= 0)
        ){
            setEFechaEmision (fecha_emision === '' ? true : false)
            setEFechaVencimiento (fecha_vencimiento === '' ? true : false)
        }else{
            setEFechaEmision (false)
            setEFechaVencimiento (false)
            const data_factura = {
                condiciones_pago: condiciones_pago,
                nro_factura: total_facturas,
                fecha_emision: fecha_emision,
                fecha_vencimiento: fecha_vencimiento,
                conceptos: conceptos,
                descuentos: descuentos,
                recargos: recargos,
                impuestos: impuestos,
                total: total,
                forma_pago: forma_pago,
                estado_factura: estado_factura
            }
            dispatch (facturasdata(facturasConstants(id_factura, 0, 0, 0, 0, 0, 0, 0, data_factura, false).update_datos_factura))
        }
    }

    const cancelar_actualizacion = () => {
        dispatch (facturasdata(facturasConstants(id_factura, 0, 0, 0, 0, 0, 0, 0, {}, false).get_datos_factura))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Total factura</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='nro_factura'
                            value={total_facturas}
                            className='form-control rounded'
                            onChange={(event) => setTotalFacturas(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
                            placeholder='Número de factura'/>
                    </div>   
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Estado factura</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='estado_factura'
                            ref={selectRefEstadoFactura}
                            value={estado_factura}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setEstadoFactura(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}>
                            <option value='0'>{estado_factura === '' ? 'Seleccionar estado factura' : estado_factura}</option>
                            <option value='Pendiente'>Pendiente</option>
                            <option value='Enviada'>Enviada</option>
                            <option value='Abierta'>Abierta</option>
                            <option value='Pagada'>Pagada</option>
                            <option value='Parcialmente pagada'>Parcialmente pagada</option>
                            <option value='Anulada'>Anulada</option>
                            <option value='Rechazada'>Rechazada</option>
                            <option value='Venciada'>Venciada</option>
                            <option value='Cobrada'>Cobrada</option>
                            <option value='Otro'>Otro</option>
                        </select>
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Fecha emisión</strong></span>
                            <input
                                disabled={!editar_informacion}
                                type='date'
                                id='fecha_emision'
                                value={fecha_emision}
                                className='form-control rounded'
                                onChange={(event) => setFechaEmision(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                        border: efecha_emision ? '1px solid red' : '1px solid #007bff'}}
                                placeholder='Fecha emisión'/>
                    </div>  
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Fecha vencimiento</strong></span>
                            <input
                                disabled={!editar_informacion}
                                type='date'
                                id='fecha_vencimiento'
                                value={fecha_vencimiento}
                                className='form-control rounded'
                                onChange={(event) => setFechaVencimiento(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                        border: efecha_vencimiento ? '1px solid red' : '1px solid #007bff'}}
                                placeholder='Fecha vencimiento'/>
                    </div>  
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Descuentos</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='descuentos'
                            value={descuentos}
                            className='form-control rounded'
                            onChange={(event) => setDescuentos(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
                            placeholder='Descuentos'/>
                    </div>  
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Recargos</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='recargos'
                            value={recargos}
                            className='form-control rounded'
                            onChange={(event) => setRecargos(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
                            placeholder='Recargos'/>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Impuestos</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='impuestos'
                            value={impuestos}
                            className='form-control rounded'
                            onChange={(event) => setImpuestos(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
                            placeholder='Impuestos'/>
                    </div>  
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Forma de pago</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='forma_pago'
                            value={forma_pago}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setFormaPago(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}>
                            <option value='0'>{forma_pago === '' ? 'Seleccionar forma de pogo' : forma_pago}</option>
                            <option value='Efectivo'>Efectivo</option>
                            <option value='Cheque'>Cheque</option>
                            <option value='Transferencia bancaria'>Transferencia bancaria</option>
                            <option value='Tarjeta de crédito/débito'>Tarjeta de crédito/débito</option>
                            <option value='Giro'>Giro</option>
                            <option value='Pago en línea'>Pago en línea</option>
                            <option value='Monedero electrónico'>Monedero electrónico</option>
                            <option value='Otro'>Otro</option>
                        </select>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Total</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='total'
                            value={total}
                            className='form-control rounded'
                            onChange={(event) => setTotal(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
                            placeholder='Total'/>
                    </div>  
                </div>
                <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Conceptos</strong></span>
                    <textarea
                        disabled={!editar_informacion}
                        type='default' 
                        rows={4}
                        id='conceptos'
                        value={conceptos}
                        className='form-control rounded'
                        onChange={(event) => setConceptos (event.target.value)}
                        style={{width: '100%', height: 120 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: 500 - conceptos.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='conceptos'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - conceptos.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 40, cursor: 'pointer'}}>{500 - conceptos.length}</p>
                    </div>
                </div>
                <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Condiciones pago</strong></span>
                    <textarea
                        disabled={!editar_informacion}
                        type='default' 
                        rows={4}
                        id='condiciones_pago'
                        value={condiciones_pago}
                        className='form-control rounded'
                        onChange={(event) => setCondicionesPago (event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: 500 - condiciones_pago.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Condiciones pago'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - condiciones_pago.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 40, cursor: 'pointer'}}>{500 - condiciones_pago.length}</p>
                    </div>
                </div>
            </div>  
            {
                editar_informacion ? (
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => cancelar_actualizacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                            onClick={() => actualizar_datos_factura()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
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
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                            onClick={() => setEditarInformacion(true)}>
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
