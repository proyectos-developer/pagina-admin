import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {departamentosdata} from '../../../../redux/slice/departamentosdata';
import { departamentosConstants } from '../../../../uri/departamentos-constants';

import save from '../../../../assets/iconos/comun/save_v2.png'
import save_select from '../../../../assets/iconos/comun/save_v1.png'
import cross from '../../../../assets/iconos/comun/cross_v2.png'
import cross_select from '../../../../assets/iconos/comun/cross_v1.png'

import {personaldata} from '../../../../redux/slice/personaldata';
import { personalConstants } from '../../../../uri/personal-constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { set_datos_paso_personal, set_error_message } from '../../../../redux/actions/data';

export default function DatosTrabajoTablet ({proporcional, personal}) {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectRefAreaEmpresa = useRef(null)
    const selectRefJefeInmediato = useRef(null)
    const selectRefEstadoTrabajo = useRef(null)
    const selectRefTipoContrato = useRef(null)

    const id_personal = location.pathname.split ('/')[6]
    const [codigo_personal, setCodigoPersonal] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [id_departamento, setIdDepartamento] = useState('')
    const [jefe_inmediato, setJefeInmediato] = useState('')
    const [id_jefe_inmediato, setIdJefeInmediato] = useState('')
    const [search_jefe_inmediato, setSearchJefeInmediato] = useState('')
    const [estado_trabajo, setEstadoTrabajo] = useState('')
    const [cargo, setCargo] = useState('')
    const [fecha_inicio, setFechaInicio] = useState('')
    const [tipo_contrato, setTipoContrato] = useState('')

    const [edepartamento, setEDepartamento] = useState(false)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)

    const [nuevo_departamento, setNuevoDepartamento] = useState(false)

    const [lista_departamentos, setListaDepartamentos] = useState([])
    const [lista_jefes, setListaJefes] = useState([])
    const [total_jefes, setTotalJefes] = useState(0)

    const {get_departamentos_filter, new_departamento} = useSelector(({departamentos_data}) => departamentos_data)
    const {get_personal_trabajo, update_personal_trabajo, get_personal_filter} = useSelector(({personal_data}) => personal_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (personal && personal.departamento){
            setCodigoPersonal(personal.codigo_personal)
            setDepartamento(personal.departamento)
            setIdDepartamento(personal.id_departamento)
            setJefeInmediato(personal.jefe_inmediato)
            setIdJefeInmediato(personal.id_jefe_inmediato)
            setSearchJefeInmediato(personal.jefe_inmediato)
            setEstadoTrabajo(personal.estado_trabajo)
            setCargo(personal.cargo)
            setFechaInicio(personal.fecha_inicio)
            setTipoContrato(personal.tipo_contrato)
            window.scrollTo(0, 0)
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 100, {}, false).get_departamentos_filter))
        }
    }, [])

    useEffect(() => {
        if (get_personal_trabajo && get_personal_trabajo.success === true && get_personal_trabajo.trabajador){
            setCodigoPersonal(get_personal_trabajo.trabajador.codigo_personal)
            setDepartamento(get_personal_trabajo.trabajador.departamento)
            setIdDepartamento(get_personal_trabajo.trabajador.id_departamento)
            setJefeInmediato(get_personal_trabajo.trabajador.jefe_inmediato)
            setIdJefeInmediato(get_personal_trabajo.trabajador.id_jefe_inmediato)
            setSearchJefeInmediato(get_personal_trabajo.trabajador.jefe_inmediato)
            setEstadoTrabajo(get_personal_trabajo.trabajador.estado_trabajo)
            setCargo(get_personal_trabajo.trabajador.cargo)
            setFechaInicio(get_personal_trabajo.trabajador.fecha_inicio)
            setTipoContrato(get_personal_trabajo.trabajador.tipo_contrato)
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_personal_trabajo))
        }else if (get_personal_trabajo && get_personal_trabajo.success === false && get_personal_trabajo.error){
            dispatch (set_error_message(true))
        }
    }, [get_personal_trabajo])

    useEffect(() => {
        if (update_personal_trabajo && update_personal_trabajo.success === true && update_personal_trabajo.trabajador){
            setCodigoPersonal(update_personal_trabajo.trabajador.codigo_personal)
            setDepartamento(update_personal_trabajo.trabajador.departamento)
            setIdDepartamento(update_personal_trabajo.trabajador.id_departamento)
            setJefeInmediato(update_personal_trabajo.trabajador.jefe_inmediato)
            setIdJefeInmediato(update_personal_trabajo.trabajador.id_jefe_inmediato)
            setSearchJefeInmediato(update_personal_trabajo.trabajador.jefe_inmediato)
            setEstadoTrabajo(update_personal_trabajo.trabajador.estado_trabajo)
            setCargo(update_personal_trabajo.trabajador.cargo)
            setFechaInicio(update_personal_trabajo.trabajador.fecha_inicio)
            setTipoContrato(update_personal_trabajo.trabajador.tipo_contrato)
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(personal.id, 0, 0, 0, 0, 0, 0, 0, {}, true).update_personal_trabajo))
        }else if (update_personal_trabajo && update_personal_trabajo.success === false && update_personal_trabajo.error){
            dispatch (set_error_message(true))
        }
    }, [update_personal_trabajo])

    useEffect(() => {
        if (get_departamentos_filter && get_departamentos_filter.success === true && get_departamentos_filter.departamentos){
            setListaDepartamentos(get_departamentos_filter.departamentos)
        }else if (get_departamentos_filter && get_departamentos_filter.success === false && get_departamentos_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_departamentos_filter])

    useEffect(() => {
        if (new_departamento && new_departamento.success === true && new_departamento.departamento){
            setIdDepartamento(new_departamento.departamento.id)
            setDepartamento(new_departamento.departamento.departamento)
            setNuevoDepartamento(false)
            dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 100, {}, false).new_departamento))
        }else if (new_departamento && new_departamento.success === false && new_departamento.error){
            dispatch (set_error_message(true))
        }
    }, [new_departamento])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            setListaJefes(get_personal_filter.personal)
            setTotalJefes(get_personal_filter.personal.length)
        }else if (get_personal_filter && get_personal_filter.success === false && get_personal_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_personal_filter])

    const buscar_jefe_inmediato = (value) => {
        if (value !== ''){
            dispatch(personaldata(personalConstants(0, value, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }
        setSearchJefeInmediato(value)
    }

    const seleccionar_departamento = (value) => {
        if (value !== '0' && value !== '1'){
            setIdDepartamento(value.split ('-')[0])
            setDepartamento(value.split ('-')[1])
        }else if (value === '1'){
            setNuevoDepartamento(true)
        }
    }

    const seleccionar_jefe_inmediato = (value) => {
        if (value !== '0'){
            setIdJefeInmediato(value.split ('*')[0])
            setJefeInmediato(value.split ('*')[1].replace ('-', ' '))
        }
    }

    const guardar_nuevo_departamento = () => {
        if (departamento === ''){
            setEDepartamento(departamento === '' ? true : false)
        }else{
            const data_dapartamento = {
                departamento: departamento,
                descripcion: '',
                id_jefe: 0,
                jefe: '',
                equipo: ''
            }
            dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, data_dapartamento, false).new_departamento))
        }
    }

    const actualizar_datos_personales = () => {
        if (nuevo_departamento && departamento === ''){
            setEDepartamento(nuevo_departamento && departamento === '' ? true : false)
        }else{
            const data_update = {
                codigo_personal: codigo_personal,
                departamento: departamento,
                id_departamento: id_departamento,
                jefe_inmediato: jefe_inmediato,
                id_jefe_inmediato: id_jefe_inmediato,
                estado_trabajo: estado_trabajo,
                cargo: cargo,
                fecha_inicio: fecha_inicio,
                tipo_contrato: tipo_contrato
            }
            dispatch (personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, data_update, false).update_personal_trabajo))
        }
    }

    const cancelar_actualizacion = () => {
        dispatch (personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, {}, false).get_personal_trabajo))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Código trabajador</strong></span>
                        <input
                            disabled={!editar_informacion} 
                            id='codigo_personal'
                            type='default'
                            className='form-control rounded'
                            value={codigo_personal}
                            onChange={(event) => setCodigoPersonal(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Código trabajador'/>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Departamento</strong></span>
                        {
                            nuevo_departamento ? (
                                <div className='d-flex' style={{width: '100%', height: 40 / proporcional, border: edepartamento ? '1px solid red' : '1px solid #007BFF'}}>
                                    <input
                                        disabled={!editar_informacion} 
                                        type='default'
                                        id='departamento'
                                        className='form-select border-0'
                                        value={departamento}
                                        onChange={(event) => setDepartamento(event.target.value)}
                                        style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                        placeholder='Nuevo departamento'/>
                                    <img src={boton_cancelar ? cross_select : cross} style={{width: 48 / proporcional, height: 48 / proporcional,
                                            padding: 12 / proporcional}} 
                                        onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                        onClick={() => {setNuevoDepartamento(false); setDepartamento('')}}/>
                                    <img src={boton_save ? save_select : save} style={{width: 48 / proporcional, height: 48 / proporcional,
                                            padding: 12 / proporcional}} 
                                        onMouseOver={() => setBotonSave(true)} onMouseLeave={() => setBotonSave(false)}
                                        onClick={() => guardar_nuevo_departamento()}/>
                                </div>
                            ) : (
                                <select
                                    disabled={!editar_informacion}
                                    id='departamento'
                                    ref={selectRefAreaEmpresa}
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_departamento (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: edepartamento ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{departamento === '' ? 'Seleccionar departamento' : departamento}</option>
                                    <option value='1'>Crear nueva departamento</option>
                                    {
                                        lista_departamentos && lista_departamentos.length > 0 ? (
                                            lista_departamentos.map ((departamento, index) => {
                                                return (
                                                    <option key={index} value={departamento.id + '-' + departamento.departamento}>{departamento.departamento}</option>
                                                )
                                            })
                                        ) : null
                                    }
                                </select>
                            )
                        }
                    </div>
                </div>
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Buscar jefe</strong></span>
                        <input
                            disabled={!editar_informacion} 
                            id='search_jefe_inmediato'
                            type='default'
                            className='form-control rounded'
                            value={search_jefe_inmediato}
                            onChange={(event) => buscar_jefe_inmediato(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre del jefe inmediato'/>
                    </div>
                    {
                        (lista_jefes && lista_jefes.length > 0) || search_jefe_inmediato !== '' ? (
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                    <span className='position-absolute'  
                                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                            <strong>Seleccionar jefe</strong></span>
                                <select
                                    disabled={!editar_informacion}
                                    id='jefe_inmediato'
                                    ref={selectRefJefeInmediato}
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_jefe_inmediato (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: edepartamento ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{total_jefes} inmediato(s)</option>
                                    {
                                        lista_jefes.map ((jefe, index) => {
                                            return (
                                                <option key={index} value={jefe.id + '*' + jefe.nombres + '-' + jefe.apellidos}>{jefe.nombres} {jefe.apellidos}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        ) : (
                            <div style={{width: '100%', height: 'auto'}}>
                            </div>
                        )
                    }
                </div>
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Estado de trabajo</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='estado_trabajo'
                            ref={selectRefEstadoTrabajo}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setEstadoTrabajo(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{estado_trabajo === '' ? 'Estado trabajo' : estado_trabajo}</option>
                            <option value='Trabajando'>Trabajando</option>
                            <option value='Vacaciones'>Vacaciones</option>
                            <option value='Descanso médico'>Descanso médico</option>
                            <option value='Maternidad'>Maternidad</option>
                            <option value='Despedido'>Despedido</option>
                            <option value='Renuncio'>Renuncio</option>
                            <option value='Otro'>Otro</option>
                        </select>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Cargo</strong></span>
                        <input
                            disabled={!editar_informacion} 
                            id='cargo'
                            type='default'
                            className='form-control rounded'
                            value={cargo}
                            onChange={(event) => setCargo(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Cargo empresa'/>
                    </div>
                </div>
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Tipo de contrato</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='tipo_contrato'
                            ref={selectRefTipoContrato}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setTipoContrato(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{tipo_contrato === '' ? 'Seleccionar tipo contrato' : tipo_contrato}</option>
                            <option value='Indefinido'>Indefinido</option>
                            <option value='Temporal'>Temporal</option>
                            <option value='Tiempo parcial'>Tiempo parcial</option>
                            <option value='Pro proyecto'>Por proyecto</option>
                            <option value='Otros'>Otros</option>
                        </select>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Fecha de inicio</strong></span>
                        <input
                            disabled={!editar_informacion} 
                            id='fecha_inicio'
                            type='date'
                            className='form-control rounded'
                            value={fecha_inicio}
                            onChange={(event) => setFechaInicio(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Fecha inicio'/>
                    </div>
                </div>
            </div>
            {
                editar_informacion ? (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => cancelar_actualizacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                            onClick={() => actualizar_datos_personales()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => {navigate ('/panel/rrhh/personal'); dispatch(set_datos_paso_personal('personal'));
                                setEditarInformacion(false)
                            }}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                        <div VolverlassName={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                            onClick={() => setEditarInformacion(true)}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Editar
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
