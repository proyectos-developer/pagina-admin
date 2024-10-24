import React, { useEffect, useRef, useState } from 'react'
import { set_data_facturacion_factura, set_datos_paso_factura, set_error_message } from '../../../../redux/actions/data'
import { useDispatch, useSelector } from 'react-redux'

export default function DatosFacturaTablet ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefEstadoFactura = useRef(null)

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
    const [etotal, setETotal] = useState(false)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_guardar, setBotonGuardar] = useState(false)

    const {data_facturacion_productos} = useSelector(({data_actions}) => data_actions)
    const {new_factura} = useSelector(({facturas_data}) => facturas_data)

    useEffect(() => {
        setTotalFacturas(data_facturacion_productos.nro_factura)
    }, [])

    const volver_datos_prodcutos = () => {
        dispatch (set_datos_paso_factura('productos'))
    }

    useEffect(() => {
        if (new_factura && new_factura.success === true && new_factura.factura){
            setCondicionesPago('')
            setTotalFacturas(0)
            setFechaEmision('')
            setFechaVencimiento('')
            setConceptos('')
            setDescuentos('')
            setRecargos('')
            setImpuestos('')
            setTotal('')
            setFormaPago('')
            setEstadoFactura('')
            selectRefEstadoFactura.current !== null ? selectRefEstadoFactura.current.value = '0' : null
        }else if (new_factura && new_factura.success === false && new_factura.error){
            dispatch (set_error_message(true))
        }
    }, [new_factura])

    const guardar_datos_personal = () => {
        if (fecha_emision === '' && fecha_vencimiento === '' && total === '' ||
            (500 - condiciones_pago.length <= 0) ||(500 - conceptos.length <= 0)
        ){
            setEFechaEmision (fecha_emision === '' ? true : false)
            setEFechaVencimiento (fecha_vencimiento === '' ? true : false)
            setETotal (total === '' ? true : false)
        }else{
            setEFechaEmision (false)
            setEFechaVencimiento (false)
            setETotal (false)
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
            dispatch (set_data_facturacion_factura(data_factura))
            dispatch (set_datos_paso_factura('guardar'))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Total factura</strong></span>
                        <input
                            type='number'
                            id='nro_factura'
                            value={total_facturas}
                            className='form-control rounded'
                            onChange={(event) => setTotalFacturas(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    background: 'white', border: '1px solid #007bff'}}
                            placeholder='Número de factura'/>
                    </div>   
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Estado factura</strong></span>
                        <select
                            id='estado_factura'
                            ref={selectRefEstadoFactura}
                            value={estado_factura}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setEstadoFactura(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    background: 'white', border: '1px solid #007bff'}}>
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
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Fecha emisión</strong></span>
                            <input
                                type='date'
                                id='fecha_emision'
                                value={fecha_emision}
                                className='form-control rounded'
                                onChange={(event) => setFechaEmision(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                        background: 'white', border: efecha_emision ? '1px solid red' : '1px solid #007bff'}}
                                placeholder='Fecha emisión'/>
                    </div>  
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Fecha vencimiento</strong></span>
                            <input
                                type='date'
                                id='fecha_vencimiento'
                                value={fecha_vencimiento}
                                className='form-control rounded'
                                onChange={(event) => setFechaVencimiento(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                        background: 'white', border: efecha_vencimiento ? '1px solid red' : '1px solid #007bff'}}
                                placeholder='Fecha vencimiento'/>
                    </div>  
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Descuentos</strong></span>
                        <input
                            type='number'
                            id='descuentos'
                            value={descuentos}
                            className='form-control rounded'
                            onChange={(event) => setDescuentos(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    background: 'white', border: '1px solid #007bff'}}
                            placeholder='Descuentos'/>
                    </div>  
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Recargos</strong></span>
                        <input
                            type='number'
                            id='recargos'
                            value={recargos}
                            className='form-control rounded'
                            onChange={(event) => setRecargos(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    background: 'white', border: '1px solid #007bff'}}
                            placeholder='Recargos'/>
                    </div>
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Impuestos</strong></span>
                        <input
                            type='number'
                            id='impuestos'
                            value={impuestos}
                            className='form-control rounded'
                            onChange={(event) => setImpuestos(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    background: 'white', border: '1px solid #007bff'}}
                            placeholder='Impuestos'/>
                    </div>  
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Forma de pago</strong></span>
                        <select
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
                    <div className='d-flex justify-content-between' style={{width: '32%', height: 'auto', 
                        marginBottom: 16 / proporcional}}>
                    </div>  
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Total</strong></span>
                        <input
                            type='number'
                            id='total'
                            value={total}
                            className='form-control rounded'
                            onChange={(event) => setTotal(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    background: 'white', border: '1px solid #007bff'}}
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
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - conceptos.length}</p>
                    </div>
                </div>
                <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Condiciones pago</strong></span>
                    <textarea
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
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - condiciones_pago.length}</p>
                    </div>
                </div>
            </div>  
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_prodcutos()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                    onClick={() => guardar_datos_personal()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Guardar datos
                    </p>
                </div>
            </div>
        </div>
    )
}
