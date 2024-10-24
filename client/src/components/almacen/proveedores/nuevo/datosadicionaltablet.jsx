import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_proveedor_adicional, set_datos_paso_proveedor} from '../../../../redux/actions/data'

export default function DatosAdicionalTablet ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefTamanioEmpresa = useRef(null)

    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    
    const [certificaciones, setCertificaciones] = useState('')
    const [referencias, setReferencias] = useState('')
    const [segmentos_mercado, setSegmentosMercado] = useState('')
    const [tamanio_empresa, setTamanioEmpressa] = useState('')
    const [redes_sociales, setRedesSociales] = useState('')

    const {data_proveedor_adicional} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_proveedor_adicional && data_proveedor_adicional.calificacion){
            setCertificaciones(data_proveedor_adicional.certificaciones)
            setReferencias(data_proveedor_adicional.referencias)
            setSegmentosMercado(data_proveedor_adicional.segmentos_mercado)
            setTamanioEmpressa(data_proveedor_adicional.tamanio_empresa)
            setRedesSociales(data_proveedor_adicional.redes_sociales)
        }else{
            setCertificaciones('')
            setReferencias('')
            setSegmentosMercado('')
            setTamanioEmpressa('')
            setRedesSociales('')
            selectRefTamanioEmpresa.current !== null ? selectRefTamanioEmpresa.current.value = '0' : null
        }
    }, [])

    const continuar_datos_financiera = () => {
        dispatch (set_data_proveedor_adicional({
            certificaciones: certificaciones,
            referencias: referencias,
            segmentos_mercado: segmentos_mercado,
            tamanio_empresa: tamanio_empresa,
            redes_sociales: redes_sociales
        }))
        dispatch (set_datos_paso_proveedor('guardar'))
    }

    const volver_a_lista = () => {
        dispatch (set_data_proveedor_adicional({
            certificaciones: certificaciones,
            referencias: referencias,
            segmentos_mercado: segmentos_mercado,
            tamanio_empresa: tamanio_empresa,
            redes_sociales: redes_sociales
        }))
        dispatch (set_datos_paso_proveedor('evaluacion'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea 
                        id='certificaciones'
                        type='default'
                        rows={4}
                        className='form-control rounded'
                        value={certificaciones}
                        onChange={(event) => setCertificaciones(event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Certificaciones'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - certificaciones.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - certificaciones.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea 
                        id='referencias'
                        type='default'
                        rows={4}
                        className='form-control rounded'
                        value={referencias}
                        onChange={(event) => setReferencias(event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Referencias'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - referencias.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - referencias.length}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
                            id='segmentos_mercado'
                            type='default'
                            className='form-control rounded'
                            value={segmentos_mercado}
                            onChange={(event) => setSegmentosMercado(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Segmentos mercado'/>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select 
                            ref={selectRefTamanioEmpresa}
                            id='tamanio_empresa'
                            type='default'
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setTamanioEmpressa(event.target.value) : null}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{tamanio_empresa === '' ? 'Seleccionar tamanio empresa' : tamanio_empresa}</option>
                            <option value='1 - 10'>1 - 10</option>
                            <option value='10 - 20'>10 - 20</option>
                            <option value='20 - 100'>20 - 100</option>
                            <option value='Más'>Más</option>
                        </select>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea 
                        id='redes_sociales'
                        type='default'
                        rows={4}
                        className='form-control rounded'
                        value={redes_sociales}
                        onChange={(event) => setRedesSociales(event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Redes sociales'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - redes_sociales.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - redes_sociales.length}</p>
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
