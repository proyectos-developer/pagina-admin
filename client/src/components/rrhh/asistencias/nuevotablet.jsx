import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {asistenciasdata} from '../../../redux/slice/asistenciasdata'
import {asistenciasConstants} from '../../../uri/asistencias-constants'
import { departamentosdata } from '../../../redux/slice/departamentosdata'
import { departamentosConstants } from '../../../uri/departamentos-constants'
import { personaldata } from '../../../redux/slice/personaldata'
import { personalConstants } from '../../../uri/personal-constants'
import axios from 'axios'
import { constantes } from '../../../uri/constantes'

import check_box from '../../../assets/iconos/comun/check_box.png'
import box from '../../../assets/iconos/comun/box.png'
import { set_error_message } from '../../../redux/actions/data'

export default function NuevaAsistenciaTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const selectRefDepartamento = useRef(null)
    const selectRefTrabajador = useRef(null)

    const [id_personal, setIdPersonal] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [tipo_documento, setTipoDocumento] = useState('')
    const [nro_documento, setNroDocumento] = useState('')
    const [nro_telefono, setNroTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [codigo_personal, setCodigoPersonal] = useState('')
    const [id_departamento, setIdDepartamento] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [fecha_asistencia, setFechaAsistencia] = useState('')
    const [fecha_inasistencia, setFechaInasistencia] = useState('')
    const [hora_entrada, setHoraEntrada] = useState('')
    const [hora_salida, setHoraSalida] = useState('')
    const [horas_trabajadas, setHorasTrabajadas] = useState('')
    const [horas_extras, setHorasExtras] = useState('')
    const [permiso, setPermiso] = useState(false)
    const [notas, setNotas] = useState('')

    const [search_personal, setSearchPersonal] = useState('')
    const [lista_personal, setListaPersonal] = useState([])
    const [lista_departamentos, setListaDepartamentos] = useState([])

    const [edepartamento, setEDepartamento] = useState(false)
    const [enombres, setENombre] = useState (false)
    const [efecha_asistencia, setEFechaAsistencia] = useState (false)
    const [ehora_entrada, setEHoraEntrada] = useState(false)
    const [efecha_inasistencia, setEFechaInasistencia] = useState (false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_asistencia} = useSelector(({asistencias_data}) => asistencias_data)
    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)
    const {get_departamentos_filter} = useSelector(({departamentos_data}) => departamentos_data)

    useEffect(() => {
        dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 100, {}, false).get_departamentos_filter))
    }, [])

    useEffect(() => {
        if (get_departamentos_filter && get_departamentos_filter.success === true && get_departamentos_filter.departamentos){
            setListaDepartamentos(get_departamentos_filter.departamentos)
        }else if (get_departamentos_filter && get_departamentos_filter.success === false && get_departamentos_filter.error){
            dispatch(set_error_message(true))
        }
    }, [get_departamentos_filter])

    const seleccionar_departamento = (value) => {
        if (value !== '0'){
            setNombres('')
            setApellidos('')
            setDepartamento(value.split ('*')[1])
            setIdDepartamento(value.split ('*')[0])
            dispatch (personaldata(personalConstants(0, 0, value.split('*')[0], 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }
    }

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            setListaPersonal(get_personal_filter.personal)
        }else if (get_personal_filter && get_personal_filter.success === false && get_personal_filter.error){
            dispatch(set_error_message(true))
        }
    }, [get_personal_filter])

    const buscar_trabajador = (value) => {
        setSearchPersonal(value)
        dispatch (personaldata(personalConstants(0, value, id_departamento, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
    }

    const seleccionar_trabajador = (value) => {
        if (value !== '0'){
            setIdPersonal(value)
            axios.get (`${constantes().url_principal[0].url}/personal/data/personal/${value}`)
                .then ((res) => {
                    setNombres(res.data.trabajador.nombres)
                    setApellidos(res.data.trabajador.apellidos)
                    setTipoDocumento(res.data.trabajador.tipo_documento)
                    setNroDocumento(res.data.trabajador.nro_documento)
                    setCorreo(res.data.trabajador.correo_personal)
                    axios.get (`${constantes().url_principal[0].url}/personal/data/trabajo/${value}`)
                        .then ((res) => {
                            setCodigoPersonal(res.data.trabajador.codigo_personal)
                            axios.get (`${constantes().url_principal[0].url}/personal/data/comunicacion/${value}`)
                                .then ((res) => {
                                    setNroTelefono(res.data.trabajador.nro_telefono)
                                    setCorreo(res.data.trabajador.correo_personal)
                                }).catch ((err) => {
                                    dispatch (set_error_message(true))
                                })
                        }).catch ((err) => {
                            dispatch (set_error_message(true))
                        })
                }).catch ((err) => {
                    dispatch (set_error_message(true))
                })
        }
    }

    useEffect(() => {
        if (new_asistencia && new_asistencia.success === true && new_asistencia.asistencia){
            dispatch(asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).new_asistencia))
            resetear_data()
        }else if (new_asistencia && new_asistencia.success === false && new_asistencia.error){
            dispatch (set_error_message(true))
        }
    }, [new_asistencia])


    const resetear_data = () => {
        setIdPersonal('')
        setNombres('')
        setApellidos('')
        setTipoDocumento('')
        setNroDocumento('')
        setNroTelefono('')
        setCorreo('')
        setCodigoPersonal('')
        setIdDepartamento('')
        setDepartamento('')
        setFechaAsistencia('')
        setFechaInasistencia('')
        setHoraEntrada('')
        setHoraSalida('')
        setHorasTrabajadas('')
        setHorasExtras('')
        setPermiso(false)
        setNotas('')
        setSearchPersonal('')
        setListaPersonal('')
        setListaDepartamentos('')
    }

    const volver_a_lista = () => {
        resetear_data()
        window.scrollTo(0, 0)
        navigate ('/panel/rrhh/asistencias')
    }

    const guardar_asistencia = () => {
        if (departamento === '' || nombres === '' || fecha_asistencia === '' || hora_entrada === '' || 
                (permiso && fecha_inasistencia === '' || (500 - notas.length <= 0))){
            setEDepartamento(departamento === '' ? true :false)
            setENombre(nombres === '' ? true :false)
            setEFechaAsistencia(fecha_asistencia === '' ? true :false)
            setEHoraEntrada(hora_entrada === '' ? true :false)
            setEFechaInasistencia(permiso && fecha_inasistencia === '' ? true :false)
        }else{
            setEDepartamento(false)
            setENombre(false)
            setEFechaAsistencia(false)
            setEHoraEntrada(false)
            setEFechaInasistencia(false)
            const data_nuevo = {
                id_personal: id_personal,
                nombres: nombres,
                apellidos: apellidos,
                tipo_documento: tipo_documento,
                nro_documento: nro_documento,
                nro_telefono: nro_telefono,
                correo: correo,
                codigo_personal: codigo_personal,
                id_departamento: id_departamento,
                departamento: departamento,
                fecha_asistencia: fecha_asistencia,
                fecha_inasistencia: fecha_inasistencia,
                hora_entrada: hora_entrada,
                hora_salida: hora_salida,
                horas_trabajadas: horas_trabajadas,
                horas_extras: horas_extras,
                permiso: permiso,
                notas: notas
            }
            dispatch (asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_asistencia))
        }
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
                    onClick={() => navigate ('/panel/rrhh/asistencias')}>
                    asistencias
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    nueva
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Departamento</strong></span>
                    <select
                        ref={selectRefDepartamento}
                        id='departamento'
                        className='form-select rounded'
                        onChange={(event) => seleccionar_departamento(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: edepartamento ? '1px solid red' : '1px solid #007bff'}}>
                        <option value='0'>{departamento === '' ? 'Seleccionar departamento' : departamento}</option>
                        {
                            lista_departamentos && lista_departamentos.length > 0 ? (
                                lista_departamentos.map ((departamento, index) => {
                                    return (
                                        <option value={departamento.id + '*' + departamento.departamento}>{departamento.departamento}</option>
                                    )
                                })
                            ) : null
                        }
                    </select>
                </div>
                {
                    departamento !== '' ? (
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Buscar trabajador</strong></span>
                                <input
                                    id='search_personal'
                                    value={search_personal}
                                    className='form-control rounded'
                                    onChange={(event) => buscar_trabajador(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional,
                                        border: enombres ? '1px solid red' : '1px solid #007bff'}}
                                    placeholder='Buscar por documento, nombres, apellidos, departamento...'/>
                            </div>  
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Seleccionar trabajador</strong></span>
                                <select
                                    ref={selectRefTrabajador}
                                    id='trabajador'
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_trabajador(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional,
                                            border: enombres ? '1px solid red' : '1px solid #007bff'}}>
                                    <option value='0'>{nombres === '' ? 'Seleccionar trabajador' : nombres + ' ' + apellidos}</option>
                                    {
                                        lista_personal && lista_personal.length > 0 ? (
                                            lista_personal.map ((personal, index) => {
                                                return (
                                                    <option value={personal.id}>{personal.nombres} {personal.apellidos}</option>
                                                )
                                            })
                                        ) : null
                                    }
                                </select>
                            </div>  
                        </div>
                    ) : null
                }  

                {
                    nombres !== '' ? (
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Código trabajador</strong></span>
                                    <input
                                        disabled={true}
                                        type='default'
                                        id='codigo_personal'
                                        value={codigo_personal}
                                        className='form-control rounded'
                                        onChange={(event) => setCodigoPersonal(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional,  border: '1px solid #007bff'
                                                }}
                                        placeholder='Código trabajador'/>
                                </div>  
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Departamento</strong></span>
                                    <input
                                        disabled={true}
                                        type='default'
                                        id='departamento'
                                        value={departamento}
                                        className='form-control rounded'
                                        onChange={(event) => setDepartamento(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff'
                                                }}
                                        placeholder='Departamento empresa'/>
                                </div>  
                            </div>  
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nombres</strong></span>
                                    <input
                                        disabled={true}
                                        type='default'
                                        id='nombres'
                                        value={nombres}
                                        className='form-control rounded'
                                        onChange={(event) => setNombres(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff'
                                                }}
                                        placeholder='Nombres'/>
                                </div>  
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Apellidos</strong></span>
                                    <input
                                        disabled={true}
                                        type='default'
                                        id='apellidos'
                                        value={apellidos}
                                        className='form-control rounded'
                                        onChange={(event) => setApellidos(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff'
                                                }}
                                        placeholder='Apellidos'/>
                                </div>  
                            </div>  
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                    <span className='position-absolute'  
                                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                            <strong>Nro documento</strong></span>
                                        <input
                                            disabled={true}
                                            type='number'
                                            id='nro_documento'
                                            value={nro_documento}
                                            className='form-control rounded'
                                            onChange={(event) => setNroDocumento(event.target.value)}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff'
                                                    }}
                                            placeholder='Nro documento'/>
                                </div>   
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nro teléfono</strong></span>
                                    <input
                                        disabled={true}
                                        type='number'
                                        id='nro_telefono'
                                        value={nro_telefono}
                                        className='form-control rounded'
                                        onChange={(event) => setNroTelefono(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff'
                                                }}
                                        placeholder='Nro teléfono'/>
                                </div>
                            </div>   
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Dirección</strong></span>
                                <input
                                    disabled={true}
                                    type='e-mail'
                                    id='correo'
                                    value={correo}
                                    className='form-control rounded'
                                    onChange={(event) => setCorreo(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff'
                                            }}
                                    placeholder='Correo electrónico'/>
                            </div>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Fecha asistencia</strong></span>
                                        <input
                                            type='date'
                                            id='fecha_asistencia'
                                            value={fecha_asistencia}
                                            className='form-control rounded'
                                            onChange={(event) => setFechaAsistencia(event.target.value)}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff'
                                                    }}
                                            placeholder='Fecha asistencia'/>
                                </div>  
                            <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Hora entrada</strong></span>
                                        <select
                                            id='hora_entrada'
                                            className='form-select rounded'
                                            onChange={(event) => event.target.value !== '0' ? setHoraEntrada(event.target.value) : null}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional,  border: '1px solid #007bff'}}>
                                            <option value='0'>{hora_entrada === '' ? 'Seleccionar' : hora_entrada}</option>
                                            <option value='08:00'>08:00</option>
                                            <option value='09:00'>09:00</option>
                                            <option value='10:00'>10:00</option>
                                            <option value='11:00'>11:00</option>
                                            <option value='12:00'>12:00</option>
                                            <option value='13:00'>13:00</option>
                                            <option value='14:00'>14:00</option>
                                            <option value='15:00'>15:00</option>
                                            <option value='16:00'>16:00</option>
                                            <option value='17:00'>17:00</option>
                                            <option value='18:00'>18:00</option>
                                            <option value='19:00'>19:00</option>
                                            <option value='20:00'>20:00</option>
                                            <option value='21:00'>21:00</option>
                                            <option value='22:00'>22:00</option>
                                        </select>
                                </div>  
                            <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Hora salida</strong></span>
                                        <select
                                            id='hora_salida'
                                            className='form-select rounded'
                                            onChange={(event) => event.target.value !== '0' ? setHoraSalida(event.target.value) : null}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional,  border: '1px solid #007bff'}}>
                                            <option value='0'>{hora_salida === '' ? 'Seleccionar' : hora_salida}</option>
                                            <option value='08:00'>08:00</option>
                                            <option value='09:00'>09:00</option>
                                            <option value='10:00'>10:00</option>
                                            <option value='11:00'>11:00</option>
                                            <option value='12:00'>12:00</option>
                                            <option value='13:00'>13:00</option>
                                            <option value='14:00'>14:00</option>
                                            <option value='15:00'>15:00</option>
                                            <option value='16:00'>16:00</option>
                                            <option value='17:00'>17:00</option>
                                            <option value='18:00'>18:00</option>
                                            <option value='19:00'>19:00</option>
                                            <option value='20:00'>20:00</option>
                                            <option value='21:00'>21:00</option>
                                            <option value='22:00'>22:00</option>
                                        </select>
                                </div>  
                            </div>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Horas trabajadas</strong></span>
                                        <input
                                            type='number'
                                            id='horas_trabajadas'
                                            value={horas_trabajadas}
                                            className='form-control rounded'
                                            onChange={(event) => setHorasTrabajadas(event.target.value)}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional,  border: '1px solid #007bff'
                                                    }}
                                            placeholder='Horas trabajadas'/>
                                    </div>  
                            <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Horas extras</strong></span>
                                        <input
                                            type='number'
                                            id='horas_extras'
                                            value={horas_extras}
                                            className='form-control rounded'
                                            onChange={(event) => setHorasExtras(event.target.value)}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff' 
                                                    }}
                                            placeholder='Horas extras'/>
                                    </div>  
                                <div className='d-flex justify-content-between' style={{width: '32%', height: 'auto'}}/>
                            </div>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Fecha inasistencia</strong></span>
                                        <input
                                            type='date'
                                            id='fecha_inasistencia'
                                            value={fecha_inasistencia}
                                            className='form-control rounded'
                                            onChange={(event) => setFechaInasistencia(event.target.value)}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff'
                                                    }}
                                            placeholder='Fecha inasistencia'/>
                                </div>    
                                <div className='d-flex' style={{width: '48%', height: 'auto'}}>
                                    <img src={permiso ? check_box : box} style={{width: 40 / proporcional, height: 40 / proporcional,
                                        padding: 15 / proporcional, marginRight: 10 / proporcional, cursor: 'pointer'}}
                                        onClick={() => setPermiso(!permiso)}/>
                                    <div className='d-flex justify-content-start' style={{width: 'auto', height: 40 / proporcional}}>
                                        <p  style={{lineHeight: `${40 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, cursor: 'pointer'}}>
                                                {permiso ? 'Tiene permiso inasistenci' : 'No tiene permiso inasistencia'}</p>
                                    </div>
                                </div> 
                            </div>
                            <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Notas</strong></span>
                                <textarea
                                    type='default' 
                                    rows={4}
                                    id='notas'
                                    value={notas}
                                    className='form-control rounded'
                                    onChange={(event) => setNotasTrabajador (event.target.value)}
                                    style={{width: '100%', height: 160 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: 500 - notas.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                            padding: 10 / proporcional, marginBottom: 5 / proporcional, border: '1px solid #007bff'}}
                                    placeholder='Notas'/>
                                <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                                    <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - notas.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - notas.length}</p>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Volver
                        </p>
                    </div>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_asistencia()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar datos
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
