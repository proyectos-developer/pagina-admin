import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {personaldata} from '../../../redux/slice/personaldata'
import {personalConstants} from '../../../uri/personal-constants'

import DatosTrabajador from './nuevo/datostrabajador.jsx'
import DatosReemplazo from './nuevo/datosreemplazo.jsx'

import { set_data_estado_trabajador, set_data_estado_reemplazo, set_datos_paso_estado, set_error_message} from '../../../redux/actions/data.js'

export default function NuevoEstadoTrabajo ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {new_estado} = useSelector(({personal_data}) => personal_data)
    const {datos_paso_estado, data_estado_trabajador, data_estado_reemplazo
        } = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (new_estado && new_estado.success === true && new_estado.estado){
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_estado))
            window.scrollTo(0, 0)
            resetear_data()
        }else if (new_estado && new_estado.success === false && new_estado.error){
            dispatch (set_error_message(true))
        }
    }, [new_estado])

    useEffect(() => {
        if (datos_paso_estado === 'guardar'){
            const data_nuevo = {
                /**datos trabajador */
                id_personal: data_estado_trabajador.id_personal,
                codigo_personal: data_estado_trabajador.codigo_personal,
                nombres: data_estado_trabajador.nombres,
                apellidos: data_estado_trabajador.apellidos,
                estado_trabajo: data_estado_trabajador.estado_trabajo,
                fecha_inicio: data_estado_trabajador.fecha_inicio,
                fecha_retorno: data_estado_trabajador.fecha_retorno,
                nro_telefono: data_estado_trabajador.nro_telefono,
                correo: data_estado_trabajador.correo,
                url_documento: data_estado_trabajador.url_documento,
                notas_trabajador: data_estado_trabajador.notas_trabajador,

                /**datos reemplazo */
                id_reemplazo: data_estado_reemplazo.id_reemplazo,
                reemplazo_nombres: data_estado_reemplazo.reemplazo_nombres,
                codigo_personal_reemplazo: data_estado_reemplazo.codigo_personal_reemplazo,
                reemplazo_apellidos: data_estado_reemplazo.reemplazo_apellidos,
                reemplazo_nro_telefono: data_estado_reemplazo.reemplazo_nro_telefono,
                reemplazo_correo: data_estado_reemplazo.reemplazo_correo,
                reemplazo_fecha_ingreso: data_estado_reemplazo.reemplazo_fecha_ingreso,
                reemplazo_fecha_salida: data_estado_reemplazo.reemplazo_fecha_salida,
                reemplazo: data_estado_reemplazo.reemplazo,
                notas_reemplazo: data_estado_reemplazo.notas_reemplazo
            } 
            
            dispatch (set_datos_paso_estado('trabajador'))
            dispatch (personaldata(personalConstants(0, 0,  0, 0, 0, 0, 0, 16, data_nuevo, false).new_estado))
        }
    }, [datos_paso_estado])

    const resetear_data = () => {
        dispatch (set_data_estado_reemplazo())
        dispatch (set_data_estado_trabajador())
    }

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
                    nuevo 
                </p>
            </div>
            <div className='shadow' 
                style={{width: '80%', height: 'auto', background: 'white', padding: 100 / proporcional}}>
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
                        }}>
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
                        }}>
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
                        datos_paso_estado === 'trabajador' || datos_paso_estado === 'guardar' ? ( 
                            <DatosTrabajador proporcional={proporcional}/>
                        ) : datos_paso_estado === 'reemplazo' ? (
                            <DatosReemplazo proporcional={proporcional}/>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}
