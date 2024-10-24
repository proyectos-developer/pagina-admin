import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_proveedor_adicional, set_datos_paso_proveedor} from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import { proveedoresdata } from '../../../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../../../uri/proveedores-constants'

export default function DatosAdicional ({proporcional}) {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectRefTamanioEmpresa = useRef(null)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCasncelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    
    const id_proveedor = location.pathname.split ('/')[6]    
    const [certificaciones, setCertificaciones] = useState('')
    const [referencias, setReferencias] = useState('')
    const [segmentos_mercado, setSegmentosMercado] = useState('')
    const [tamanio_empresa, setTamanioEmpressa] = useState('')
    const [redes_sociales, setRedesSociales] = useState('')

    const {data_proveedor, data_editable} = useSelector(({data_actions}) => data_actions)
    const {get_proveedor_adicional, update_proveedor_adicional} = 
        useSelector(({proveedores_data}) => proveedores_data)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_proveedor && data_proveedor.calificacion){
            setCertificaciones(data_proveedor.certificaciones)
            setReferencias(data_proveedor.referencias)
            setSegmentosMercado(data_proveedor.segmentos_mercado)
            setTamanioEmpressa(data_proveedor.tamanio_empresa)
            setRedesSociales(data_proveedor.redes_sociales)
        }else{
            setCertificaciones('')
            setReferencias('')
            setSegmentosMercado('')
            setTamanioEmpressa('')
            setRedesSociales('')
        }
    }, [])
    
    useEffect(() => {
        if (get_proveedor_adicional && get_proveedor_adicional.success === true && get_proveedor_adicional.proveedor_adicional){
            setCertificaciones(get_proveedor_adicional.proveedor_adicional.certificaciones)
            setReferencias(get_proveedor_adicional.proveedor_adicional.referencias)
            setSegmentosMercado(get_proveedor_adicional.proveedor_adicional.segmentos_mercado)
            setTamanioEmpressa(get_proveedor_adicional.proveedor_adicional.tamanio_empresa)
            setRedesSociales(get_proveedor_adicional.proveedor_adicional.redes_sociales)
            setEditarInformacion(false)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).get_proveedor_adicional))
        }
    }, [get_proveedor_adicional])
    
    useEffect(() => {
        if (update_proveedor_adicional && update_proveedor_adicional.success === true && update_proveedor_adicional.proveedor_adicional){
            setCertificaciones(update_proveedor_adicional.proveedor_adicional.certificaciones)
            setReferencias(update_proveedor_adicional.proveedor_adicional.referencias)
            setSegmentosMercado(update_proveedor_adicional.proveedor_adicional.segmentos_mercado)
            setTamanioEmpressa(update_proveedor_adicional.proveedor_adicional.tamanio_empresa)
            setRedesSociales(update_proveedor_adicional.proveedor_adicional.redes_sociales)
            setEditarInformacion(false)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).update_proveedor_adicional))
        }
    }, [update_proveedor_adicional])

    const actualizar_datos_proveedor = () => {
        const data_update = {
            certificaciones: certificaciones,
            referencias: referencias,
            segmentos_mercado: segmentos_mercado,
            tamanio_empresa: tamanio_empresa,
            redes_sociales: redes_sociales
        }
        dispatch (proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, data_update, false).update_proveedor_adicional))
    }

    const cancelar_edicion_datos = () => {
        dispatch(proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_adicional))
    }

    const volver_a_lista = () => {
        navigate ('/panel/almacen/proveedores')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea
                        disabled={!editar_informacion} 
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
                        disabled={!editar_informacion} 
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
                            disabled={!editar_informacion} 
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
                            disabled={!editar_informacion} 
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
                        disabled={!editar_informacion} 
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
                                onClick={() => actualizar_datos_proveedor()}>
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
