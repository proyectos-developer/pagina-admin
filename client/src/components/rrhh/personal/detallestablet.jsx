import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {personaldata} from '../../../redux/slice/personaldata'
import {personalConstants} from '../../../uri/personal-constants'
import { set_datos_paso_personal, set_error_message } from '../../../redux/actions/data'

import DatosPersonalesTablet from './detalles/datospersonalestablet.jsx'
import DatosComunicacionUbicacionTablet from './detalles/datoscomunicacionubicaciontablet.jsx'
import DatosEstudiosTablet from './detalles/datosestudiostablet.jsx'
import DatosTrabajoTablet from './detalles/datostrabajotablet.jsx'
import DatosSueldoTablet from './detalles/datossueldotablet.jsx'
import DatosEvaluacionesTablet from './detalles/datosevaluacionestablet.jsx'

export default function DetallesPersonalTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const id_trabajador = location.pathname.split ('/')[6]
    const [trabajador, setTrabajador] = useState({})

    const {get_personal, update_personal_personal, update_personal_comunicacion,
            update_personal_estudios, update_personal_trabajo, update_personal_sueldo,
            update_personal_evaluacion
    } = useSelector(({personal_data}) => personal_data)
    const {datos_paso_personal, data_personal} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_personal.nombres === undefined){
            dispatch(personaldata(personalConstants(id_trabajador, 0, 0, 0, 0, 0, 0, 16, {}, false).get_personal))
        }else{
            setTrabajador(data_personal)
        }
    }, [])

    useEffect(() => {
        if (get_personal && get_personal.success === true && get_personal.trabajador){
            setTrabajador(get_personal.trabajador)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).get_personal))
        }else if (get_personal && get_personal.success === false && get_personal.error){
            dispatch(set_error_message(true))
        }
    }, [get_personal])

    useEffect(() => {
        if (update_personal_personal && update_personal_personal.success === true && update_personal_personal.trabajador){
            setTrabajador(update_personal_personal.trabajador)
            dispatch(personaldata(personalConstants(id_trabajador, 0, 0, 0, 0, 0, 0, 16, {}, true).update_personal_personal))
        }else if (update_personal_personal && update_personal_personal.success === false && update_personal_personal.error){
            dispatch(set_error_message(true))
        }
    }, [update_personal_personal])

    useEffect(() => {
        if (update_personal_comunicacion && update_personal_comunicacion.success === true && update_personal_comunicacion.trabajador){
            setTrabajador(update_personal_comunicacion.trabajador)
            dispatch(personaldata(personalConstants(id_trabajador, 0, 0, 0, 0, 0, 0, 16, {}, true).update_personal_comunicacion))
        }else if (update_personal_comunicacion && update_personal_comunicacion.success === false && update_personal_comunicacion.error){
            dispatch(set_error_message(true))
        }
    }, [update_personal_comunicacion])

    useEffect(() => {
        if (update_personal_estudios && update_personal_estudios.success === true && update_personal_estudios.trabajador){
            setTrabajador(update_personal_estudios.trabajador)
            dispatch(personaldata(personalConstants(id_trabajador, 0, 0, 0, 0, 0, 0, 16, {}, true).update_personal_estudios))
        }else if (update_personal_estudios && update_personal_estudios.success === false && update_personal_estudios.error){
            dispatch(set_error_message(true))
        }
    }, [update_personal_estudios])

    useEffect(() => {
        if (update_personal_trabajo && update_personal_trabajo.success === true && update_personal_trabajo.trabajador){
            setTrabajador(update_personal_trabajo.trabajador)
            dispatch(personaldata(personalConstants(id_trabajador, 0, 0, 0, 0, 0, 0, 16, {}, true).update_personal_trabajo))
        }else if (update_personal_trabajo && update_personal_trabajo.success === false && update_personal_trabajo.error){
            dispatch(set_error_message(true))
        }
    }, [update_personal_trabajo])

    useEffect(() => {
        if (update_personal_sueldo && update_personal_sueldo.success === true && update_personal_sueldo.trabajador){
            setTrabajador(update_personal_sueldo.trabajador)
            dispatch(personaldata(personalConstants(id_trabajador, 0, 0, 0, 0, 0, 0, 16, {}, true).update_personal_sueldo))
        }else if (update_personal_sueldo && update_personal_sueldo.success === false && update_personal_sueldo.error){
            dispatch(set_error_message(true))
        }
    }, [update_personal_sueldo])

    useEffect(() => {
        if (update_personal_evaluacion && update_personal_evaluacion.success === true && update_personal_evaluacion.trabajador){
            setTrabajador(update_personal_evaluacion.trabajador)
            dispatch(personaldata(personalConstants(id_trabajador, 0, 0, 0, 0, 0, 0, 16, {}, true).update_personal_evaluacion))
        }else if (update_personal_evaluacion && update_personal_evaluacion.success === false && update_personal_evaluacion.error){
            dispatch(set_error_message(true))
        }
    }, [update_personal_evaluacion])

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
                onClick={() => navigate ('/panel/rrhh/personal')}>
                personal
            </p>
            <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                    fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                / 
            </p>
            <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                    fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                marginRight: 10 / proporcional}}>
                trabajador / {trabajador.nombres} {trabajador.apellidos}
            </p>
        </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 172 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '32%', height: 172 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 96 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 96 / proporcional, height: 96 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'personal' || 
                                        datos_paso_personal === 'guardar' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 50 / proporcional, lineHeight: `${96 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_personal === 'personal' || 
                                            datos_paso_personal === 'guardar' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        1
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_personal === 'personal' || datos_paso_personal === 'guardar' ? '#007bff' : 'white',
                                border: datos_paso_personal === 'personal' || datos_paso_personal === 'guardar' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_personal === 'personal' || datos_paso_personal === 'guardar' ? '1px solid white' : '1px solid #007bff'
                            }} onClick={() => dispatch(set_datos_paso_personal('personal'))}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'personal' || 
                                        datos_paso_personal === 'guardar' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'personal' || datos_paso_personal === 'guardar' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Personales
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '32%', height: 172 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 96 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 96 / proporcional, height: 96 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'ubicacion' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 50 / proporcional, lineHeight: `${96 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_personal === 'ubicacion' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        2
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_personal === 'ubicacion' ? '#007bff' : 'white',
                                border: datos_paso_personal === 'ubicacion' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_personal === 'ubicacion' ? '1px solid white' : '1px solid #007bff'
                            }} onClick={() => dispatch(set_datos_paso_personal('ubicacion'))}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'ubicacion' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'ubicacion' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Comunicación
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '32%', height: 172 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 96 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 96 / proporcional, height: 96 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'estudios' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 50 / proporcional, lineHeight: `${96 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_personal === 'estudios' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        3
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_personal === 'estudios' ? '#007bff' : 'white',
                                border: datos_paso_personal === 'estudios' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_personal === 'estudios' ? '1px solid white' : '1px solid #007bff'
                            }} onClick={() => dispatch(set_datos_paso_personal('estudios'))}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'estudios' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'estudios' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Estudios
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 172 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '32%', height: 172 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 96 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 96 / proporcional, height: 96 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'trabajo' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 50 / proporcional, lineHeight: `${96 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_personal === 'trabajo' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        4
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_personal === 'trabajo' ? '#007bff' : 'white',
                                border: datos_paso_personal === 'trabajo' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_personal === 'trabajo' ? '1px solid white' : '1px solid #007bff'
                            }} onClick={() => dispatch(set_datos_paso_personal('trabajo'))}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'trabajo' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'trabajo' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Trabajo
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '32%', height: 172 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 96 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 96 / proporcional, height: 96 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'sueldo' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 50 / proporcional, lineHeight: `${96 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_personal === 'sueldo' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        5
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_personal === 'sueldo' ? '#007bff' : 'white',
                                border: datos_paso_personal === 'sueldo' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_personal === 'sueldo' ? '1px solid white' : '1px solid #007bff'
                            }} onClick={() => dispatch(set_datos_paso_personal('sueldo'))}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'sueldo' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'sueldo' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Sueldo
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '32%', height: 172 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 96 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 96 / proporcional, height: 96 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'evaluacion' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 50 / proporcional, lineHeight: `${96 / proporcional}px`,
                                        textAlign: 'center',
                                        color: datos_paso_personal === 'evaluacion' ? 'white' : '#007bff', fontWeight: 700, marginBottom: 0}}>
                                        6
                                    </h4>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 60 / proporcional, cursor: 'pointer',
                                borderTopRightRadius: 8 / proporcional, borderTopLeftRadius: 8 / proporcional,
                                background: datos_paso_personal === 'evaluacion' ? '#007bff' : 'white',
                                border: datos_paso_personal === 'evaluacion' ? '1px solid #007bff' : '1px solid white',
                                borderBottom: datos_paso_personal === 'evaluacion' ? '1px solid white' : '1px solid #007bff'
                            }} onClick={() => dispatch(set_datos_paso_personal('evaluacion'))}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'evaluacion' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'evaluacion' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Evaluaciones
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        {
                            datos_paso_personal === 'personal' && trabajador.nombres ? ( 
                                <DatosPersonalesTablet proporcional={proporcional} personal={trabajador}/>
                            ) : datos_paso_personal === 'ubicacion' && trabajador.nombres ? (
                                <DatosComunicacionUbicacionTablet proporcional={proporcional} personal={trabajador}/>
                            ) : datos_paso_personal === 'estudios' && trabajador.nombres ? (
                                <DatosEstudiosTablet proporcional={proporcional} personal={trabajador}/>
                            ) : datos_paso_personal === 'trabajo' && trabajador.nombres ? (
                                <DatosTrabajoTablet proporcional={proporcional} personal={trabajador}/>
                            ) : datos_paso_personal === 'sueldo' && trabajador.nombres ? (
                                <DatosSueldoTablet proporcional={proporcional} personal={trabajador}/>
                            ) : datos_paso_personal === 'evaluacion' && trabajador.nombres ? (
                                <DatosEvaluacionesTablet proporcional={proporcional} personal={trabajador}/>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
