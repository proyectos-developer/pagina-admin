import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import CardAsistenciaTablet from './card/asistenciatablet.jsx'
import {asistenciasdata} from '../../../redux/slice/asistenciasdata.js'
import { asistenciasConstants } from '../../../uri/asistencias-constants.js'
import { useNavigate } from 'react-router-dom'
import { set_error_message } from '../../../redux/actions/data.js'

export default function ListaAsistenciasTablet ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [begin, setBegin] = useState(0)
    const amount = 16

    const [search_asistencias, setSearchAsistencias] = useState('')
    const [reset, setReset] = useState(false)

    const [lista_asistencias, setListaAsistencias] = useState ([])
    const [total_asistencias, setTotalAsistencias] = useState(0)

    const [boton_nuevo, setBotonNuevo] = useState (false)
    const [boton_reset, setBotonReset] = useState (false)

    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_asistencias_filter, delete_asistencia} = useSelector(({asistencias_data}) => asistencias_data)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, begin, amount, {}, false).get_asistencias_filter))
    }, [])

    useEffect(() => {
        if (get_asistencias_filter && get_asistencias_filter.success === true && get_asistencias_filter.asistencias){
            setTotalAsistencias(get_asistencias_filter.total_asistencias)
            setListaAsistencias (get_asistencias_filter.asistencias)
        }else if (get_asistencias_filter && get_asistencias_filter.success === false && get_asistencias_filter.error){
            dispatch (set_error_message(trie))
        }
    }, [get_asistencias_filter])

    useEffect(() => {
        if (delete_asistencia && delete_asistencia.success === true && delete_asistencia.asistencias){
            window.scrollTo(0, 0)
            setBegin(0)
            setTotalAsistencias(delete_asistencia.total_asistencias)
            setListaAsistencias (delete_asistencia.asistencias)
            dispatch (asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, 0, 16, {}, true).delete_asistencia))
        }else if (delete_asistencia && delete_asistencia.success === false && delete_asistencia.error){
            dispatch (set_error_message(trie))
        }
    }, [delete_asistencia])

    const buscar_estados = (value) => {
        if (value !== ''){
            setReset(true)
            dispatch(asistenciasdata(asistenciasConstants(0, 0, value, 0, 0, 0, 16, {}, false).get_asistencias_filter))
        }else{
            setReset(false)
            dispatch(asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_asistencias_filter))
        }
        setSearchAsistencias(value)
    }

    const next_estados = () => {
        if (begin + amount > total_asistencias){

        }else{
            setBegin (begin + amount)
            dispatch (asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_asistencias_filter))
        }
    }

    const previous_estados = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_asistencias_filter))
        }
    }

    const resetear_data = () => {
        setBegin(0)
        setListaAsistencias ([])
        setReset(false)
        setSearchAsistencias('')
        dispatch(asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_asistencias_filter))
        dispatch(asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).delete_asistencia))
    }

    useEffect(() => {
        return () => {
            
        }
    },[])

    return (
        <div className='position-relative' style={{width: '100%', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel')}>
                    Inicio 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/rrhh')}>
                    rrhh
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    asistencias
                </p>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', minHeight: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 24 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Asistencias
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_asistencias_filter && get_asistencias_filter.asistencias ? begin + get_asistencias_filter.asistencias.length : 0} de ${total_asistencias}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 50 / proporcional}}>
                    <div className={boton_nuevo ? 'shadow rounded' : 'rounded'} 
                        style={{width: 200 / proporcional, height: 40 / proporcional, background: '#28A745',
                                cursor: 'pointer'}}
                            onClick={() => navigate('/panel/rrhh/asistencias/nuevo')}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nuevo
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='d-flex rounded' 
                    style={{width: reset ? 610 / proporcional : 400 / proporcional, height: 40 / proporcional}}>
                    <input 
                        id='search_asistencias'
                        className='form-control rounded-0 border-0'
                        style={{width: 400 / proporcional, height: 40 / proporcional, fontSize: 16 / proporcional,
                                fontFamily: 'Poppins, sans-serif', fontWeight: 400,
                                marginRight: reset ? 10 / proporcional : 0}}
                        value={search_asistencias}
                        onChange={(event) => buscar_estados(event.target.value)}
                        placeholder='Buscar por nombre, código, apellidos...'
                    />
                    {
                        reset ? (
                            <div className={boton_reset ? 'shadow rounded' : 'rounded'} 
                                style={{width: 200 / proporcional, height: 40 / proporcional, background: '#28A745',
                                        cursor: 'pointer'}}
                                    onClick={() => resetear_data()}
                                    onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    resetear
                                </p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 70 / proporcional,
                    padding: 5 / proporcional, background: 'white', borderBottom: '1px solid #4a4a4a'}}>
                <div className='d-flex justify-content-between' style={{width: '70%', height: 60 / proporcional}}>
                    <div className='' style={{width: '48%', height: 60 / proporcional}}>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Código / apellido
                            </p>
                        </div>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Fecha
                            </p>
                        </div>
                    </div>
                    <div className='' style={{width: '48%', height: 60 / proporcional}}>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Hora entrada
                            </p>
                        </div>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Hora salida
                            </p>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end' style={{width: '30%', height: 60 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60 / proporcional}}>
                        <p style={{fontSize: 14 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center',
                            cursor: 'default'}}>
                            Acciones
                        </p>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', minHeight: 500 / proporcional}}>
                {
                    lista_asistencias && lista_asistencias.length > 0 ? (
                        lista_asistencias.map ((asistencia, index) => {
                            return (
                                <CardAsistenciaTablet proporcional={proporcional} key={index} index={index} asistencia={asistencia}/>
                            )
                        })
                    ) : null
                }
            </div>              
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_estados(); window.scrollTo(0, 0)}}>
                                <img src={mouse_preview ? preview_select : preview} 
                                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                                <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                    marginLeft: 5 / proporcional, color: mouse_preview ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                        Anteriores
                                </span>
                            </div>
                        ) : null
                    }
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin + 16 >= total_asistencias ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_estados(); window.scrollTo(0, 0)}}>
                                <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                    marginRight: 5 / proporcional, color: mouse_next ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                        Siguientes
                                </span>
                                <img src={mouse_next ? next_select : next} 
                                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
