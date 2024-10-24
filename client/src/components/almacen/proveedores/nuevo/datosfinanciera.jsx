import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_proveedor_financiera, set_datos_paso_proveedor} from '../../../../redux/actions/data'

export default function DatosFinanciera ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefMoneda = useRef(null)
    const selectRefFormaPago = useRef(null)

    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    
    const [cuenta_interbancaria, setCuentaInterBancaria] = useState('')
    const [cuenta_iban, setCuentaIban] = useState('')
    const [cuenta_bancaria, setCuentaBancaria] = useState('')
    const [moneda, setMoneda] = useState('')
    const [limite_credito, setLimiteCredito] = useState('')
    const [forma_pago, setFormaPago] = useState('')    

    const {data_proveedor_financiera} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_proveedor_financiera && data_proveedor_financiera.cuenta_interbancaria){
            setCuentaInterBancaria(data_proveedor_financiera.cuenta_interbancaria)
            setCuentaIban(data_proveedor_financiera.cuenta_iban)
            setCuentaBancaria(data_proveedor_financiera.cuenta_bancaria)
            setMoneda(data_proveedor_financiera.moneda)
            setLimiteCredito(data_proveedor_financiera.limite_credito)
            setFormaPago(data_proveedor_financiera.forma_pago)
        }else{
            setCuentaInterBancaria('')
            setCuentaIban('')
            setCuentaBancaria('')
            setMoneda('')
            setLimiteCredito('')
            setFormaPago('')
            selectRefMoneda.current !== null ? selectRefMoneda.current.value = '0' : null
            selectRefFormaPago.current !== null ? selectRefFormaPago.current.value = '0' : null
        }
    }, [])

    const continuar_datos_financiera = () => {
        dispatch (set_data_proveedor_financiera({
            cuenta_interbancaria: cuenta_interbancaria,
            cuenta_iban: cuenta_iban,
            cuenta_bancaria: cuenta_bancaria,
            moneda: moneda,
            limite_credito: limite_credito,
            forma_pago: forma_pago
        }))
        dispatch (set_datos_paso_proveedor('evaluacion'))
    }

    const volver_a_lista = () => {
        dispatch (set_data_proveedor_financiera({
            cuenta_interbancaria: cuenta_interbancaria,
            cuenta_iban: cuenta_iban,
            cuenta_bancaria: cuenta_bancaria,
            moneda: moneda,
            limite_credito: limite_credito,
            forma_pago: forma_pago
        }))
        dispatch (set_datos_paso_proveedor('comercial'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Volver
                        </p>
                    </div>
                    <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
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
