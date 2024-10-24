import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { personaldata } from '../../redux/slice/personaldata'
import { personalConstants } from '../../uri/personal-constants'
import { asistenciasdata } from '../../redux/slice/asistenciasdata'
import { asistenciasConstants } from '../../uri/asistencias-constants'

export default function RrHhDashboardTablet({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [fecha_hoy, setFechaHoy] = useState('')

    const [boton_asistencias, setBotonAsistencias] = useState(false)
    const [boton_estado_trabajo, setBotonEstadoTrabajo] = useState(false)
    const [boton_cumpleanios, setBotonCumpleanios] = useState(false)

    const [lista_cumpleanios, setListaCumpleanios] = useState([])
    const [lista_estados, setListaEstados] = useState([])
    const [lista_asistencias, setListaAsistencias] = useState([])
    
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const {get_cumpleanios_hoy, get_estados_filter,
            get_asistencias_filter} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        let hoy = (new Date()).toLocaleDateString().toString()
        setFechaHoy((new Date(hoy.split('/')[2] + '-' + hoy.split('/')[1] + '-' + hoy.split('/')[0])).toLocaleDateString('es-ES', opciones))
        dispatch (personaldata(personalConstants('05-09', 0, 0, 0, 0, 0, 0, 16, {}, false).get_cumpleanios_hoy))
    }, [])

    useEffect(() => {
        if (get_cumpleanios_hoy && get_cumpleanios_hoy.success === true && get_cumpleanios_hoy.cumpleanios){
            setListaCumpleanios(get_cumpleanios_hoy.cumpleanios)
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_estados_filter))
        }else if (get_cumpleanios_hoy && get_cumpleanios_hoy.success === false && get_cumpleanios_hoy.error){
            dispatch(set_error_message(true))
        }
    }, [get_cumpleanios_hoy])

    useEffect(() => {
        if (get_estados_filter && get_estados_filter.success === true && get_estados_filter.estados){
            setListaEstados (get_estados_filter.estados)
            let fecha = (new Date()).toLocaleDateString()
            fecha = fecha.split ('/')[2] + '-' + fecha.split('/')[1] + '-' + fecha.split('/')[0]
            dispatch (asistenciasdata(asistenciasConstants(0, 0, fecha, 0, 0, 0, 0, {}, false).get_asistencias_filter))
        }else if (get_estados_filter && get_estados_filter.success === false && get_estados_filter.error){
            dispatch(set_error_message(true))
        }
    }, [get_estados_filter])

    useEffect(() => {
        if (get_asistencias_filter && get_asistencias_filter.success === true && get_asistencias_filter.asistencias){
            setListaAsistencias (get_asistencias_filter.asistencias)
        }else if (get_asistencias_filter && get_asistencias_filter.success === false && get_asistencias_filter.error){
            dispatch(set_error_message(true))
        }
    }, [get_asistencias_filter])

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
                    marginRight: 10 / proporcional}}>
                    R.R.H.H
                </p>
            </div>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='rounded shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                    background: 'white', marginBottom: 16 / proporcional
                }}>
                    <h6 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16 / proporcional,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Cumpleaños hoy: <strong style={{color: '#007bff'}}>{fecha_hoy}</strong>
                    </h6>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional,
                        borderBottom: '1px solid #4a4a4a'
                    }}>
                        <div style={{width: '48%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: 'white'}}>0 </span>
                                Nombres       
                            </p>
                        </div>
                        <div className='d-flex justify-content-end' style={{width: '48%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                Edad
                            </p>
                        </div>
                    </div>
                    <div className='overflow-auto' style={{width: '100%', minHeight: 300 / proporcional, maxHeight: 450 / proporcional, marginBottom: 16 / proporcional}}>
                    {
                        lista_cumpleanios && lista_cumpleanios.length > 0 ? (
                            lista_cumpleanios.map ((cumpleanios, index) => {
                                return (
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div style={{width: '48%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                                {cumpleanios.nombres} {cumpleanios.apellidos}       
                                            </p>
                                        </div>
                                        <div className='d-flex justify-content-end' style={{width: '48%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <strong>({cumpleanios.edad} años)</strong>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : null
                    }
                    </div>
                    <div style={{width: '100%', height: 40 / proporcional}}>
                        <div className={boton_cumpleanios ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, cursor: 'pointer', background: '#28A745'}}
                            onMouseOver={() => setBotonCumpleanios(true)} onMouseLeave={() => setBotonCumpleanios(false)}
                            onClick={() => navigate ('/panel/rrhh/cumpleanios')}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver próximos cumpleaños
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className='rounded shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                    background: 'white'
                }}>
                    <h6 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16 / proporcional,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Estado trabajo: 
                    </h6>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional,
                        borderBottom: '1px solid #4a4a4a'
                    }}>
                        <div style={{width: '25%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: 'white'}}>0. </span>
                                Nombres       
                            </p>
                        </div>
                        <div style={{width: '25%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                Estado
                            </p>
                        </div>
                        <div style={{width: '17.5%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                Inicio
                            </p>
                        </div>
                        <div style={{width: '17.5%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                Retorno
                            </p>
                        </div>
                        <div style={{width: '15%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                Reemplazo
                            </p>
                        </div>
                    </div>
                    <div className='overflow-auto' style={{width: '100%', minHeight: 300 / proporcional, maxHeight: 450 / proporcional, marginBottom: 16 / proporcional}}>
                    {
                        lista_estados && lista_estados.length > 0 ? (
                            lista_estados.map ((estado, index) => {
                                return (
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div style={{width: '25%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                                {estado.nombres.slice(0, 1)}. {estado.apellidos}       
                                            </p>
                                        </div>
                                        <div style={{width: '25%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <strong>{estado.estado_trabajo}</strong>
                                            </p>
                                        </div>
                                        <div style={{width: '17.5%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <strong>{estado.fecha_inicio}</strong>
                                            </p>
                                        </div>
                                        <div style={{width: '17.5%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <strong>{estado.fecha_retorno}</strong>
                                            </p>
                                        </div>
                                        <div style={{width: '15%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <strong>{estado.reemplazo ? 'Si' : 'No'}</strong>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : null
                    }
                    </div>
                    <div style={{width: '100%', height: 40 / proporcional}}>
                        <div className={boton_estado_trabajo ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, cursor: 'pointer', background: '#28A745'}}
                            onMouseOver={() => setBotonEstadoTrabajo(true)} onMouseLeave={() => setBotonEstadoTrabajo(false)}
                            onClick={() => navigate ('/panel/rrhh/estado-trabajo')}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver Todos
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='rounded shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                    background: 'white'
                }}>
                    <h6 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16 / proporcional,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Asistencias de hoy: <strong style={{color: '#007bff'}}>{fecha_hoy}</strong>
                    </h6>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional,
                        borderBottom: '1px solid #4a4a4a'
                    }}>
                        <div style={{width: '48%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: 'white'}}>0 </span>
                                Nombres       
                            </p>
                        </div>
                        <div className='d-flex justify-content-end' style={{width: '48%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                Hora entrada
                            </p>
                        </div>
                    </div>
                    <div className='overflow-auto' style={{width: '100%', minHeight: 300 / proporcional, maxHeight: 450 / proporcional, marginBottom: 16 / proporcional}}>
                    {
                        lista_asistencias && lista_asistencias.length > 0 ? (
                            lista_asistencias.map ((asistencia, index) => {
                                return (
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div style={{width: '48%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                                {asistencia.nombres} {asistencia.apellidos}       
                                            </p>
                                        </div>
                                        <div className='d-flex justify-content-end' style={{width: '48%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <strong>({asistencia.hora_entrada} años)</strong>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : null
                    }
                    </div>
                    <div style={{width: '100%', height: 40 / proporcional}}>
                        <div className={boton_asistencias ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, cursor: 'pointer', background: '#28A745'}}
                            onMouseOver={() => setBotonAsistencias(true)} onMouseLeave={() => setBotonAsistencias(false)}
                            onClick={() => navigate ('/panel/rrhh/asistencias')}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver asistencias
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
