import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {personaldata} from '../../../redux/slice/personaldata'
import {personalConstants} from '../../../uri/personal-constants'

import DatosPersonales from './nuevo/datospersonales.jsx'
import DatosComunicacionUbicacion from './nuevo/datoscomunicacionubicacion.jsx'
import DatosEstudios from './nuevo/datosestudios.jsx'
import DatosTrabajo from './nuevo/datostrabajo.jsx'
import DatosSueldo from './nuevo/datossueldo.jsx'
import DatosEvaluaciones from './nuevo/datosevaluaciones.jsx'
import { set_data_personal_estudios, set_data_personal_evaluacion, set_data_personal_personal, 
         set_data_personal_sueldo, set_data_personal_trabajo, set_data_personal_ubicacion, 
         set_datos_paso_personal, 
         set_error_message} from '../../../redux/actions/data.js'
import { useNavigate } from 'react-router-dom'

export default function NuevoPersonal ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {new_personal} = useSelector(({personal_data}) => personal_data)
    const {datos_paso_personal, data_personal_personal, data_personal_ubicacion, data_personal_estudios,
           data_personal_trabajo, data_personal_sueldo, data_personal_evaluacion} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch (set_datos_paso_personal('personal'))
    }, [])

    useEffect(() => {
        if (new_personal && new_personal.success === true && new_personal.trabajador){
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_personal))
            window.scrollTo(0, 0)
            resetear_data()
        }else if (new_personal && new_personal.success === false && new_personal.error){
            dispatch(set_error_message(true))
        }
    }, [new_personal])

    useEffect(() => {
        if (datos_paso_personal === 'guardar'){
            const data_nuevo = {
                /**datos personales */
                url_foto: data_personal_personal.url_foto === null ? '' : data_personal_personal.url_foto,
                nombres: data_personal_personal.nombres,
                apellidos: data_personal_personal.apellidos,
                fecha_nacimiento: data_personal_personal.fecha_nacimiento,
                cumpleanios: data_personal_personal.fecha_nacimiento.split('-')[1] + '-' + data_personal_personal.fecha_nacimiento.split('-')[2],
                genero: data_personal_personal.genero,
                estado_civil: data_personal_personal.estado_civil,
                hijos: data_personal_personal.nro_hijos,
                tipo_documento: data_personal_personal.tipo_documento,
                nro_documento: data_personal_personal.nro_documento,

                /**datos comunicación y ubicación */
                nro_telefono: data_personal_ubicacion.nro_telefono,
                correo_personal: data_personal_ubicacion.correo_personal,
                correo_empresa: data_personal_ubicacion.correo_empresa,
                pais: data_personal_ubicacion.pais,
                provincia: data_personal_ubicacion.provincia,
                distrito: data_personal_ubicacion.distrito,
                direccion: data_personal_ubicacion.direccion,

                /**datos estudios*/
                colegio: data_personal_estudios.colegio,
                universidad: data_personal_estudios.universidad,
                titulo: data_personal_estudios.titulo,
                estudios: data_personal_estudios.estudios,
                url_documento: data_personal_estudios.url_documento === null ? '' : data_personal_estudios.url_documento,

                /**datos trabajo*/
                codigo_personal: data_personal_trabajo.codigo_personal,
                departamento: data_personal_trabajo.departamento,
                id_departamento: data_personal_trabajo.id_departamento,
                jefe_inmediato: data_personal_trabajo.jefe_inmediato,
                id_jefe_inmediato: data_personal_trabajo.id_jefe_inmediato,
                cargo: data_personal_trabajo.cargo,
                fecha_inicio: data_personal_trabajo.fecha_inicio,
                tipo_contrato: data_personal_trabajo.tipo_contrato,
                estado_trabajo: data_personal_trabajo.estado_trabajo,

                /**datos sueldo*/
                afp: data_personal_sueldo.afp,
                seguro: data_personal_sueldo.seguro,
                bonos: data_personal_sueldo.bonos,
                comisiones: data_personal_sueldo.comisiones,
                sueldo_bruto: data_personal_sueldo.sueldo_bruto,
                sueldo_neto: data_personal_sueldo.sueldo_neto,
                cuarta_categoria: data_personal_sueldo.cuarta_categoria,
                url_cuarta_categoria: data_personal_sueldo.url_cuarta_categoria === null ? '' : data_personal_sueldo.url_cuarta_categoria,
                banco: data_personal_sueldo.banco,
                nro_cuenta_bancaria: data_personal_sueldo.nro_cuenta_bancaria,
                nro_cuenta_interbancaria: data_personal_sueldo.nro_cuenta_interbancaria,

                /**datos evaluacion*/
                evaluacion: data_personal_evaluacion.evaluacion === null ? '' : data_personal_evaluacion.evaluacion,
                notas_evaluacion: data_personal_evaluacion.notas_evaluacion
            } 
            dispatch (set_datos_paso_personal('personal'))
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_personal))
        }
    }, [datos_paso_personal])

    const resetear_data = () => {
        dispatch (set_data_personal_personal({}))
        dispatch (set_data_personal_ubicacion({}))
        dispatch (set_data_personal_estudios({}))
        dispatch (set_data_personal_trabajo({}))
        dispatch (set_data_personal_sueldo({}))
        dispatch (set_data_personal_evaluacion({}))
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
                    nuevo
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 100 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 196 / proporcional, marginBottom: 32 / proporcional}}>
                        <div className='' style={{width: '16%', height: 196 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'personal' || 
                                        datos_paso_personal === 'guardar' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
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
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'personal' || 
                                        datos_paso_personal === 'guardar' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'personal' || datos_paso_personal === 'guardar' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Personales
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '16%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'ubicacion' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
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
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'ubicacion' ? 'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'ubicacion' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Comunicación <br/> ubicación
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '16%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'estudios' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
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
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'estudios' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'estudios' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Estudios
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '16%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'trabajo' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
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
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'trabajo' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'trabajo' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Trabajo
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '16%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'sueldo' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
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
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
                                    textAlign: 'center', color: datos_paso_personal === 'sueldo' ? 
                                        'white' : '#007bff', 
                                        fontWeight: datos_paso_personal === 'sueldo' ? 
                                        700 : 500, marginBottom: 0}}>
                                    Sueldo
                                </p>
                            </div>
                        </div>
                        <div className='' style={{width: '16%', height: 166 / proporcional }}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional, marginBottom: 16 / proporcional}}>
                                <div className='rounded-circle' style={{width: 120 / proporcional, height: 120 / proporcional,
                                    border: '2px solid #007bff', background: datos_paso_personal === 'evaluacion' ? '#007bff' : 'white'
                                }}>
                                    <h4 style={{fontSize: 64 / proporcional, lineHeight: `${120 / proporcional}px`,
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
                            }}>
                                <p style={{fontSize: 20 / proporcional, lineHeight: `${60 / proporcional}px`,
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
                            datos_paso_personal === 'personal' || datos_paso_personal === 'guardar' ? ( 
                                <DatosPersonales proporcional={proporcional}/>
                            ) : datos_paso_personal === 'ubicacion' ? (
                                <DatosComunicacionUbicacion proporcional={proporcional}/>
                            ) : datos_paso_personal === 'estudios' ? (
                                <DatosEstudios proporcional={proporcional}/>
                            ) : datos_paso_personal === 'trabajo' ? (
                                <DatosTrabajo proporcional={proporcional}/>
                            ) : datos_paso_personal === 'sueldo' ? (
                                <DatosSueldo proporcional={proporcional}/>
                            ) : datos_paso_personal === 'evaluacion' ? (
                                <DatosEvaluaciones proporcional={proporcional}/>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
