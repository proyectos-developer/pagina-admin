import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {personaldata} from '../../../redux/slice/personaldata'
import {personalConstants} from '../../../uri/personal-constants'
import { set_datos_paso_estado, set_error_message } from '../../../redux/actions/data'

import DatosTrabajador from './detalles/datostrabajador.jsx'
import DatosReemplazo from './detalles/datosreemplazo.jsx'

export default function DetallesEstadoTrabajo ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const id_estado = location.pathname.split('/')[5]
    const [estado, setEstado] = useState({})

    const {get_estado, update_estado_reemplazo, update_estado_trabajador} = useSelector(({personal_data}) => personal_data)
    const {datos_paso_estado, data_estado_trabajo} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch (set_datos_paso_estado('trabajador'))
        if (data_estado_trabajo.nombres === undefined){
            dispatch(personaldata(personalConstants(id_estado, 0, 0, 0, 0, 0, 0, 16, {}, false).get_estado))
        }else{
            setEstado(data_estado_trabajo)
        }
    }, [])

    useEffect(() => {
        if (get_estado && get_estado.success === true && get_estado.estado){
            setEstado(get_estado.estado)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).get_estado))
        }else if (get_estado && get_estado.success === false && get_estado.error){
            dispatch (set_error_message(true))
        }
    }, [get_estado])

    useEffect(() => {
        if (update_estado_reemplazo && update_estado_reemplazo.success === true && update_estado_reemplazo.estado){
            setEstado(update_estado_reemplazo.estado)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).update_estado_reemplazo))
        }else if (update_estado_reemplazo && update_estado_reemplazo.success === false && update_estado_reemplazo.error){
            dispatch (set_error_message(true))
        }
    }, [update_estado_reemplazo])

    useEffect(() => {
        if (update_estado_trabajador && update_estado_trabajador.success === true && update_estado_trabajador.estado){
            setEstado(update_estado_trabajador.estado)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).update_estado_trabajador))
        }else if (update_estado_trabajador && update_estado_trabajador.success === false && update_estado_trabajador.error){
            dispatch (set_error_message(true))
        }
    }, [update_estado_trabajador])

    useEffect(() => {
        return (() => {
            
        })
    }, [])
    
    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
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
                        R.R.H.H
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / 
                    </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/rrhh/estado-trabajo')}>
                    estados de trabajo
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    trabajador / {estado.nombres} {estado.apellidos}
                </p>
            </div>
            <div className='shadow' 
                style={{width: '80%', height: 'auto', background: 'white', padding: 100 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '50%', height: 196 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_estado === 'trabajador' || 
                                        datos_paso_estado === 'guardar' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_estado === 'trabajador' || 
                                            datos_paso_estado === 'guardar' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        1
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_estado === 'trabajador' || datos_paso_estado === 'guardar' ? '#007bff' : 'white',
                                border: datos_paso_estado === 'trabajador' || datos_paso_estado === 'guardar' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_estado === 'trabajador' || datos_paso_estado === 'guardar' ? '1px solid white' : '1px solid #007bff'
                                }} onClick={() => dispatch(set_datos_paso_estado('trabajador'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_estado === 'trabajador' || 
                                        datos_paso_estado === 'guardar' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_estado === 'trabajador' || datos_paso_estado === 'guardar' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Trabajador
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '50%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_estado === 'reemplazo' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_estado === 'reemplazo' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        2
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_estado === 'reemplazo' ? '#007bff' : 'white',
                                border: datos_paso_estado === 'reemplazo' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_estado === 'reemplazo' ? '1px solid white' : '1px solid #007bff'
                                }} onClick={() => dispatch(set_datos_paso_estado('reemplazo'))}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_estado === 'reemplazo' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_estado === 'reemplazo' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Reemplazo
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        {
                            datos_paso_estado === 'trabajador' && estado.nombres ? ( 
                                <DatosTrabajador proporcional={proporcional} estado={estado}/>
                            ) : datos_paso_estado === 'reemplazo' && estado.nombres ? (
                                <DatosReemplazo proporcional={proporcional} estado={estado}/>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
