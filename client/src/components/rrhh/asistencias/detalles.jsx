import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {asistenciasdata} from '../../../redux/slice/asistenciasdata'
import { set_data_asistencia, set_error_message } from '../../../redux/actions/data'
import { asistenciasConstants } from '../../../uri/asistencias-constants'

import check_box from '../../../assets/iconos/comun/check_box.png'
import box from '../../../assets/iconos/comun/box.png'

export default function DetallesAsistencia ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const id_asistencia = location.pathname.split ('/')[5]
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

    const [efecha_asistencia, setEFechaAsistencia] = useState (false)
    const [ehora_entrada, setEHoraEntrada] = useState(false)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_actualizar, setBotonactualizar] = useState(false)

    const {get_asistencia, update_asistencia} = useSelector(({asistencias_data}) => asistencias_data)
    const {data_asistencia, data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        if (data_asistencia.nombres === undefined){
            dispatch(asistenciasdata(asistenciasConstants(id_asistencia, 0, 0, 0, 0, 0, 16, {}, false).get_asistencia))
        }else{
            setIdPersonal(data_asistencia.id_personal)
            setNombres(data_asistencia.nombres)
            setApellidos(data_asistencia.apellidos)
            setTipoDocumento(data_asistencia.tipo_documento)
            setNroDocumento(data_asistencia.nro_documento)
            setNroTelefono (data_asistencia.nro_telefono)
            setCorreo (data_asistencia.correo)
            setCodigoPersonal(data_asistencia.codigo_personal)
            setIdDepartamento(data_asistencia.id_departamento)
            setDepartamento(data_asistencia.departamento)
            setFechaInasistencia(data_asistencia.fecha_inasistencia)
            setFechaAsistencia(data_asistencia.fecha_asistencia)
            setHoraEntrada(data_asistencia.hora_entrada)
            setHoraSalida(data_asistencia.hora_salida)
            setHorasTrabajadas(data_asistencia.horas_trabajadas)
            setHorasExtras(data_asistencia.horas_extras)
            setPermiso(data_asistencia.permiso)
            setNotas(data_asistencia.notas)
        }
    }, [])

    useEffect(() => {
        if (get_asistencia && get_asistencia.success === true && get_asistencia.asistencia){
            setIdPersonal(get_asistencia.asistencia.id_personal)
            setNombres(get_asistencia.asistencia.nombres)
            setApellidos(get_asistencia.asistencia.apellidos)
            setTipoDocumento(get_asistencia.asistencia.tipo_documento)
            setNroDocumento(get_asistencia.asistencia.nro_documento)
            setNroTelefono (get_asistencia.asistencia.nro_telefono)
            setCorreo (get_asistencia.asistencia.correo)
            setCodigoPersonal(get_asistencia.asistencia.codigo_personal)
            setIdDepartamento(get_asistencia.asistencia.id_departamento)
            setDepartamento(get_asistencia.asistencia.departamento)
            setFechaInasistencia(get_asistencia.asistencia.fecha_inasistencia)
            setFechaAsistencia(get_asistencia.asistencia.fecha_asistencia)
            setHoraEntrada(get_asistencia.asistencia.hora_entrada)
            setHoraSalida(get_asistencia.asistencia.hora_salida)
            setHorasTrabajadas(get_asistencia.asistencia.horas_trabajadas)
            setHorasExtras(get_asistencia.asistencia.horas_extras)
            setPermiso(get_asistencia.asistencia.permiso)
            setNotas(get_asistencia.asistencia.notas)
            window.scrollTo(0, 0)
            setEditarInformacion(false)
            dispatch(asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_asistencia))
        }else if (get_asistencia && get_asistencia.success === false && get_asistencia.error){
            dispatch (set_error_message(true))
        }
    }, [get_asistencia])

    useEffect(() => {
        if (update_asistencia && update_asistencia.success === true && update_asistencia.asistencia){
            setIdPersonal(update_asistencia.asistencia.id_personal)
            setNombres(update_asistencia.asistencia.nombres)
            setApellidos(update_asistencia.asistencia.apellidos)
            setTipoDocumento(update_asistencia.asistencia.tipo_documento)
            setNroDocumento(update_asistencia.asistencia.nro_documento)
            setNroTelefono (update_asistencia.asistencia.nro_telefono)
            setCorreo (update_asistencia.asistencia.correo)
            setCodigoPersonal(update_asistencia.asistencia.codigo_personal)
            setIdDepartamento(update_asistencia.asistencia.id_departamento)
            setDepartamento(update_asistencia.asistencia.departamento)
            setFechaInasistencia(update_asistencia.asistencia.fecha_inasistencia)
            setFechaAsistencia(update_asistencia.asistencia.fecha_asistencia)
            setHoraEntrada(update_asistencia.asistencia.hora_entrada)
            setHoraSalida(update_asistencia.asistencia.hora_salida)
            setHorasTrabajadas(update_asistencia.asistencia.horas_trabajadas)
            setHorasExtras(update_asistencia.asistencia.horas_extras)
            setPermiso(update_asistencia.asistencia.permiso)
            setNotas(update_asistencia.asistencia.notas)
            window.scrollTo(0, 0)
            setEditarInformacion(false)
            dispatch(asistenciasdata(asistenciasConstants(0, 0, 0, 0, 0, 0, 16, {}, true).update_asistencia))
        }else if (update_asistencia && update_asistencia.success === false && update_asistencia.error){
            dispatch (set_error_message(true))
        }
    }, [update_asistencia])

    const volver_a_lista = () => {
        window.scrollTo(0, 0)
        dispatch(set_data_asistencia({}))
        navigate ('/panel/rrhh/asistencias')
    }

    const cancelar_edicion = () => {
        dispatch (asistenciasdata(asistenciasConstants(location.pathname.split('/')[5], 0, 0, 0, 0, 0, 16, {}, false).get_asistencia))
    }

    const actuarliar_datos_asitencia = () => {
        if (fecha_asistencia === '' || hora_entrada === '' || 
                (permiso && fecha_inasistencia === '' || (500 - notas.length <= 0))){
            setEFechaAsistencia(fecha_asistencia === '' ? true :false)
            setEHoraEntrada(hora_entrada === '' ? true :false)
        }else{
            setEFechaAsistencia(false)
            setEHoraEntrada(false)
            const data_update = {
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
            window.scrollTo(0, 0)
            dispatch (asistenciasdata(asistenciasConstants(location.pathname.split('/')[5], 0, 0, 0, 0, 0, 16, data_update, false).update_asistencia))
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
                    trabajador / {nombres} {apellidos}
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
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
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
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
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
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
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
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
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
                            placeholder='Apellidos'/>
                    </div>  
                </div>  
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>{tipo_documento}</strong></span>
                        <input
                            disabled={true}
                            type='number'
                            id='nro_documento'
                            value={nro_documento}
                            className='form-control rounded'
                            onChange={(event) => setNroDocumento(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    border: '1px solid #007bff'}}
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
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: '1px solid #007bff'}}
                        placeholder='Nro teléfono'/>
                </div>
                <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Correo</strong></span>
                    <input
                        disabled={true}
                        type='e-mail'
                        id='correo'
                        value={correo}
                        className='form-control rounded'
                        onChange={(event) => setCorreo(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: '1px solid #007bff'}}
                        placeholder='Correo electrónico'/>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Fecha asistencia</strong></span>
                                <input
                                    disabled={!editar_informacion}
                                    type='date'
                                    id='fecha_asistencia'
                                    value={fecha_asistencia}
                                    className='form-control rounded'
                                    onChange={(event) => setFechaAsistencia(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                            border: efecha_asistencia ? '1px solid red' : '1px solid #007bff'}}
                                    placeholder='Fecha asistencia'/>
                    </div>  
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Hora entrada</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='hora_entrada'
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setHoraEntrada(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    border: ehora_entrada ? '1px solid red' : '1px solid #007bff', fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}>
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
                                disabled={!editar_informacion}
                                id='hora_salida'
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? setHoraSalida(event.target.value) : null}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        border: '1px solid #007bff', fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}>
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
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Horas trabajadas</strong></span>
                            <input
                                disabled={!editar_informacion}
                                type='number'
                                id='horas_trabajadas'
                                value={horas_trabajadas}
                                className='form-control rounded'
                                onChange={(event) => setHorasTrabajadas(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                        border: '1px solid #007bff'}}
                                placeholder='Horas trabajadas'/>
                    </div>  
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Hora extras</strong></span>
                            <input
                                disabled={!editar_informacion}
                                type='number'
                                id='horas_extras'
                                value={horas_extras}
                                className='form-control rounded'
                                onChange={(event) => setHorasExtras(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                        border: '1px solid #007bff'}}
                                placeholder='Horas extras'/>
                    </div> 
                    <div className='d-flex justify-content-between' style={{width: '32%', height: 'auto'}}/>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='position-relative' style={{width: '32%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Fecha inasistencia</strong></span>
                            <input
                                disabled={!editar_informacion}
                                type='date'
                                id='fecha_inasistencia'
                                value={fecha_inasistencia}
                                className='form-control rounded'
                                onChange={(event) => setFechaInasistencia(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                        border: '1px solid #007bff'}}
                                placeholder='Fecha inasistencia'/>
                    </div>    
                    <div className='d-flex' style={{width: '69%', height: 'auto'}}>
                        <img src={permiso ? check_box : box} style={{width: 40 / proporcional, height: 40 / proporcional,
                            padding: 15 / proporcional, marginRight: 10 / proporcional, cursor: 'pointer'}}
                            onClick={() => editar_informacion ? setPermiso(!permiso) : null}/>
                        <div className='d-flex justify-content-start' style={{width: 'auto', height: 40 / proporcional}}>
                            <p  style={{lineHeight: `${40 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, cursor: 'pointer'}}>
                                    {permiso ? 'Tiene permiso inasistenci' : 'No tiene permiso inasistencia'}</p>
                        </div>
                    </div> 
                    <div className='d-flex' style={{width: '32%', height: 'auto'}}/>
                </div>
                <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Notas</strong></span>
                    <textarea
                        disabled={!editar_informacion}
                        type='default' 
                        rows={4}
                        id='notas'
                        value={notas}
                        className='form-control rounded'
                        onChange={(event) => setNotasTrabajador (event.target.value)}
                        style={{width: '100%', height: 160 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: 500 - notas.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                border: '1px solid #007bff', padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Notas'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - notas.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - notas.length}</p>
                    </div>
                </div>
                    
                {
                    editar_informacion ? (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                onClick={() => cancelar_edicion()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonactualizar(true)} onMouseLeave={() => setBotonactualizar(false)}
                                onClick={() => actuarliar_datos_asitencia()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar
                                </p>
                            </div>
                        </div>
                    ) : (
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
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                onClick={() => {setEditarInformacion(true); window.scrollTo(0, 0)}}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Editar informacion
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
