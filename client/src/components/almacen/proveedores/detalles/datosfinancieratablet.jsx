import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation, useNavigate } from 'react-router-dom'
import { proveedoresdata } from '../../../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../../../uri/proveedores-constants'

export default function DatosFinancieraTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefMoneda = useRef(null)
    const selectRefFormaPago = useRef(null)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCasncelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    
    const id_proveedor = location.pathname.split ('/')[6]
    const [cuenta_interbancaria, setCuentaInterBancaria] = useState('')
    const [cuenta_iban, setCuentaIban] = useState('')
    const [cuenta_bancaria, setCuentaBancaria] = useState('')
    const [moneda, setMoneda] = useState('')
    const [limite_credito, setLimiteCredito] = useState('')
    const [forma_pago, setFormaPago] = useState('')    

    const {data_proveedor, data_editable} = useSelector(({data_actions}) => data_actions)
    const {get_proveedor_financiera, update_proveedor_financiera} = 
        useSelector(({proveedores_data}) => proveedores_data)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_proveedor && data_proveedor.cuenta_interbancaria){
            setCuentaInterBancaria(data_proveedor.cuenta_interbancaria)
            setCuentaIban(data_proveedor.cuenta_iban)
            setCuentaBancaria(data_proveedor.cuenta_bancaria)
            setMoneda(data_proveedor.moneda)
            setLimiteCredito(data_proveedor.limite_credito)
            setFormaPago(data_proveedor.forma_pago)
        }else{
            dispatch(proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_financiera))
        }
    }, [])
    
    useEffect(() => {
        if (get_proveedor_financiera && get_proveedor_financiera.success === true && get_proveedor_financiera.proveedor_financiera){
            setCuentaInterBancaria(get_proveedor_financiera.proveedor_financiera.cuenta_interbancaria)
            setCuentaIban(get_proveedor_financiera.proveedor_financiera.cuenta_iban)
            setCuentaBancaria(get_proveedor_financiera.proveedor_financiera.cuenta_bancaria)
            setMoneda(get_proveedor_financiera.proveedor_financiera.moneda)
            setLimiteCredito(get_proveedor_financiera.proveedor_financiera.limite_credito)
            setFormaPago(get_proveedor_financiera.proveedor_financiera.forma_pago)
            setEditarInformacion(false)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).get_proveedor_financiera))
        }
    }, [get_proveedor_financiera])
    
    useEffect(() => {
        if (update_proveedor_financiera && update_proveedor_financiera.success === true && update_proveedor_financiera.proveedor_financiera){
            setCuentaInterBancaria(update_proveedor_financiera.proveedor_financiera.cuenta_interbancaria)
            setCuentaIban(update_proveedor_financiera.proveedor_financiera.cuenta_iban)
            setCuentaBancaria(update_proveedor_financiera.proveedor_financiera.cuenta_bancaria)
            setMoneda(update_proveedor_financiera.proveedor_financiera.moneda)
            setLimiteCredito(update_proveedor_financiera.proveedor_financiera.limite_credito)
            setFormaPago(update_proveedor_financiera.proveedor_financiera.forma_pago)
            setEditarInformacion(false)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).update_proveedor_financiera))
        }
    }, [update_proveedor_financiera])

    const actualiar_datos_proveedor = () => {
        const data_update = {
            cuenta_interbancaria: cuenta_interbancaria,
            cuenta_iban: cuenta_iban,
            cuenta_bancaria: cuenta_bancaria,
            moneda: moneda,
            limite_credito: limite_credito,
            forma_pago: forma_pago,
        }
        dispatch(proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, data_update, false).update_proveedor_financiera))
    }

    const cancelar_edicion_datos = () => {
        dispatch(proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_financiera))
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
                            id='cuenta_bancaria'
                            type='number'
                            className='form-control rounded'
                            value={cuenta_bancaria}
                            onChange={(event) => setCuentaBancaria(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Número cuenta bancaria'/>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='cuenta_interbancaria'
                            type='number'
                            className='form-control rounded'
                            value={cuenta_interbancaria}
                            onChange={(event) => setCuentaInterBancaria(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Número cuenta inter bancaria'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='cuenta_iban'
                            type='number'
                            className='form-control rounded'
                            value={cuenta_iban}
                            onChange={(event) => setCuentaIban(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Número cuenta iban'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            ref={selectRefMoneda}
                            id='moneda'
                            type='default'
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setMoneda(event.target.value) : null}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{moneda === '' ? 'Seleccionar moneda' : moneda}</option>
                            <option value='Sol peruano'>Sol peruano</option>
                            <option value='Dólar americano'>Dólar americano</option>
                        </select>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            ref={selectRefFormaPago}
                            id='forma_pago'
                            type='default'
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setFormaPago(event.target.value) : null}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{forma_pago === '' ? 'Seleccionar forma de pago' : forma_pago}</option>
                            <option value='Transferencia'>Transferencia</option>
                            <option value='Cheque'>Cheque</option>
                            <option value='Plin'>Plin</option>
                            <option value='Yape'>Yape</option>
                            <option value='Depósito'>Depósito</option>
                            <option value='Contra entrega'>Contra entrega</option>
                            <option value='Otro'>Otro</option>
                        </select>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea
                        disabled={!editar_informacion} 
                        id='limite_credito'
                        type='default'
                        rows={3}
                        className='form-control rounded'
                        value={limite_credito}
                        onChange={(event) => setLimiteCredito(event.target.value)}
                        style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Notas evaluación'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - limite_credito.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - limite_credito.length}</p>
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
