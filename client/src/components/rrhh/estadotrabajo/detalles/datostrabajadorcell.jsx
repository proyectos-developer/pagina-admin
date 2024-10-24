import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_datos_paso_estado, set_error_message} from '../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'
import {personaldata} from '../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../uri/personal-constants'
import { filesdata } from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'
import axios from 'axios'

export default function DatosTrabajadorCell ({proporcional, estado}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectRefTrabajador = useRef(null)

    const id_estado = estado.id
    const [codigo_personal, setCodigoPersonal] = useState('')
    const [file_documento, setFileDocumento] = useState (null)
    const [id_personal, setIdPersonal] = useState('') 
    const [nombres, setNombres] = useState('') 
    const [apellidos, setApellidos] = useState('') 
    const [estado_trabajo, setEstadoTrabajo] = useState('') 
    const [fecha_inicio, setFechaInicio] = useState('') 
    const [fecha_retorno, setFechaRetorno] = useState('') 
    const [nro_telefono, setNroTelefono] = useState('') 
    const [correo, setCorreo] = useState('') 
    const [notas_trabajador, setNotasTrabajador] = useState('')
    const [url_documento, setUrlDocumento] = useState('')

    const [search_trabajador, setSearchTrabajador] = useState('')
    const [lista_trabajador, setListaTrabajador] = useState([])

    const [enombres, setENombres] = useState (false)
    const [efecha_inicio, setEFechaInicio] = useState(false)

    const [boton_subir_foto, setBotonSubirFoto] = useState(false)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)

    const {get_estado_trabajador, update_estado_trabajador, get_personal_filter} = useSelector(({personal_data}) => personal_data)
    const {file_upload_estado_trabajo} = useSelector(({files_data}) => files_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (estado && estado.nombres){
            setCodigoPersonal(estado.codigo_personal)
            setIdPersonal(estado.id_personal)
            setNombres(estado.nombres)
            setApellidos(estado.apellidos)
            setEstadoTrabajo(estado.estado_trabajo)
            setFechaInicio(estado.fecha_inicio)
            setFechaRetorno(estado.fecha_retorno)
            setNroTelefono(estado.nro_telefono)
            setCorreo(estado.correo)
            setNotasTrabajador(estado.notas_trabajador)
            setUrlDocumento(estado.url_documento)
        }
    }, [])

    useEffect(() => {
        if (get_estado_trabajador && get_estado_trabajador.success === true && get_estado_trabajador.estado){
            setCodigoPersonal(get_estado_trabajador.estado.codigo_personal)
            setIdPersonal(get_estado_trabajador.estado.id_personal)
            setNombres(get_estado_trabajador.estado.nombres)
            setApellidos(get_estado_trabajador.estado.apellidos)
            setEstadoTrabajo(get_estado_trabajador.estado.estado_trabajo)
            setFechaInicio(get_estado_trabajador.estado.fecha_inicio)
            setFechaRetorno(get_estado_trabajador.estado.fecha_retorno)
            setNroTelefono(get_estado_trabajador.estado.nro_telefono)
            setCorreo(get_estado_trabajador.estado.correo)
            setNotasTrabajador(get_estado_trabajador.estado.notas_trabajador)
            setUrlDocumento(get_estado_trabajador.estado.url_documento)
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_estado_trabajador))
        }else if (get_estado_trabajador && get_estado_trabajador.success === false && get_estado_trabajador.error){
            dispatch (set_error_message(true))
        }
    }, [get_estado_trabajador])

    useEffect(() => {
        if (update_estado_trabajador && update_estado_trabajador.success === true && update_estado_trabajador.estado){
            setCodigoPersonal(update_estado_trabajador.estado.codigo_personal)
            setIdPersonal(update_estado_trabajador.estado.id_personal)
            setNombres(update_estado_trabajador.estado.nombres)
            setApellidos(update_estado_trabajador.estado.apellidos)
            setEstadoTrabajo(update_estado_trabajador.estado.estado_trabajo)
            setFechaInicio(update_estado_trabajador.estado.fecha_inicio)
            setFechaRetorno(update_estado_trabajador.estado.fecha_retorno)
            setNroTelefono(update_estado_trabajador.estado.nro_telefono)
            setCorreo(update_estado_trabajador.estado.correo)
            setNotasTrabajador(update_estado_trabajador.estado.notas_trabajador)
            setUrlDocumento(update_estado_trabajador.estado.url_documento)
            setEditarInformacion(false)
            window.scrollTo(0, 0)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_estado_trabajador))
        }else if (update_estado_trabajador && update_estado_trabajador.success === false && update_estado_trabajador.error){
            dispatch (set_error_message(true))
        }
    }, [update_estado_trabajador])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            setListaTrabajador(get_personal_filter.personal)
        }else if (get_personal_filter && get_personal_filter.success === false && get_personal_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_personal_filter])

    useEffect(() => {
        if (file_upload_estado_trabajo && file_upload_estado_trabajo.success === true && file_upload_estado_trabajo.message === true){
            setUrlDocumento(`${constantes().url_archivo[0].url}/personal/estadotrabajo/${nombres.split(' ', '-') + '_' + apellidos.split(' ', '-')}/${file_documento.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_estado_trabajo))
        }else if (file_upload_estado_trabajo && file_upload_estado_trabajo.success === false && file_upload_estado_trabajo.error){
            dispatch (set_error_message(true))
        }
    }, [file_upload_estado_trabajo])
    
    const handleFileChange = (event) => {
        setFileDocumento(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_documento, file_documento.name)
        dispatch(filesdata(filesConstants(`${nombres.replace(' ', '-') + '_' + apellidos.replace(' ', '-')}`, data, false).file_upload_estado_trabajo))
    }

    const buscar_trabajador_cambio_estado = (value) => {
        if (value !== ''){
            dispatch (personaldata(personalConstants(0, value, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }else{
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }
        setSearchTrabajador(value)
    }

    const seleccionar_trabajador = (value) => {
        if (value !== '0'){
            axios.get (`${constantes().url_principal[0].url}/personal/${value}`)
                .then ((res) => {
                    setIdPersonal(res.data.trabajador.id)
                    setNombres(res.data.trabajador.nombres)
                    setCodigoPersonal(res.data.trabajador.codigo_personal)
                    setApellidos(res.data.trabajador.apellidos)
                    setNroTelefono(res.data.trabajador.nro_telefono)
                    setCorreo(res.data.trabajador.correo_personal)
                    selectRefTrabajador.current ? selectRefTrabajador.current.value = '0' : null
                    setSearchTrabajador(res.data.trabajador.nombres + ' ' + res.data.trabajador.apellidos)
                }).catch ((err) => {

                })
        }
    }

    const actualizar_datos_estado_trabajador = () => {
        if (nombres === '' || fecha_inicio === ''){
            setENombres (nombres === '' ? true : false)
            setEFechaInicio (fecha_inicio === '' ? true : false)
        }else{
            setENombres (false)
            setEFechaInicio(false)
            const data_estado = {
                id_personal: id_personal,
                codigo_personal: codigo_personal,
                nombres: nombres,
                apellidos: apellidos,
                estado_trabajo: estado_trabajo,
                fecha_inicio: fecha_inicio,
                fecha_retorno: fecha_retorno,
                nro_telefono: nro_telefono,
                correo: correo,
                url_documento: url_documento,
                notas_trabajador: notas_trabajador
            }
            dispatch (personaldata(personalConstants(id_estado, 0, 0, 0, 0, 0, 0, 0, data_estado, false).update_estado_trabajador))
        }
    }

    const cancelar_actualizacion = () => {
        dispatch (personaldata(personalConstants(id_estado, 0, 0, 0, 0, 0, 0, 0, {}, false).get_estado_trabajador))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Buscar trabajador</strong></span>
                    <input
                        disabled={!editar_informacion}
                        autoComplete={false}
                        type='default' 
                        id='search_trabajador'
                        value={search_trabajador}
                        className='form-control rounded'
                        onChange={(event) => buscar_trabajador_cambio_estado (event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Nombre del trabajador'/>
                </div>
                {
                    lista_trabajador && lista_trabajador.length > 0 ? (
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Seleccionar trabajador</strong></span>
                            <select
                        disabled={!editar_informacion}
                                ref={selectRefTrabajador}
                                id='search_trabajador'
                                className='form-select rounded'
                                onChange={(event) => seleccionar_trabajador (event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>{nombres === '' ? 'Seleccionar trabajador' : nombres + apellidos}</option>
                                {
                                    lista_trabajador && lista_trabajador.map ((trabajador, index) => {
                                        return (
                                            <option value={trabajador.id}>{trabajador.nombres} {trabajador.apellidos}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    ) : null
                }
            </div>
            {
                nombres !== '' ? (
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Código trabajador</strong></span>
                            <input
                                autoComplete={false}
                                disabled={true}
                                type='default'
                                id='codigo_personal'
                                value={codigo_personal}
                                className='form-control rounded'
                                onChange={(event) => setCodigoPersonal(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enombres ? '1px solid red' :  '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Código personal'/>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nombres</strong></span>
                                <input
                                    autoComplete={false}
                                    disabled={true}
                                    type='default' 
                                    id='nombres'
                                    value={nombres}
                                    className='form-control rounded'
                                    onChange={(event) => setNombres (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enombres ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nombres del trabajador'/>
                            </div>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Apellidos</strong></span>
                                <input
                                    autoComplete={false}
                                    disabled={true}
                                    type='default' 
                                    id='apellidos'
                                    value={apellidos}
                                    className='form-control rounded'
                                    onChange={(event) => setApellidos (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Apellidos del trabajador'/>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nro teléfono</strong></span>
                                <input
                                    autoComplete={false}
                                    disabled={true}
                                    type='number' 
                                    id='nro_telefono'
                                    value={nro_telefono}
                                    className='form-control rounded'
                                    onChange={(event) => setNroTelefono (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Número de teléfono'/>
                            </div>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Correo</strong></span>
                                <input
                                    autoComplete={false}
                                    disabled={true}
                                    type='e-mail' 
                                    id='correo'
                                    value={correo}
                                    className='form-control rounded'
                                    onChange={(event) => setCorreo (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Correo personal'/>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Estado trabajo</strong></span>
                                <select
                        disabled={!editar_informacion}
                                    type='default' 
                                    id='estado_trabajo'
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setEstadoTrabajo (event.target.value) : null}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{estado_trabajo === '' ? 'Seleccionar nuevo estado' : estado_trabajo}</option>
                                    <option value='Trabajando'>Trabajando</option>
                                    <option value='Vacaciones'>Vacaciones</option>
                                    <option value='Descanso médico'>Descanso médico</option>
                                    <option value='Maternidad'>Maternidad</option>
                                    <option value='Despedido'>Despedido</option>
                                    <option value='Renuncio'>Renuncio</option>
                                    <option value='Otro'>Otro</option>
                                </select>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Fecha inicio</strong></span>
                                <input
                        disabled={!editar_informacion}
                                    autoComplete={false}
                                    type='date' 
                                    id='fecha_inicio'
                                    value={fecha_inicio}
                                    className='form-control rounded'
                                    onChange={(event) => setFechaInicio (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif',
                                            padding: 10 / proporcional, border: efecha_inicio ? '1px solid red': '1px solid #007bff'}}
                                    placeholder='Fecha inicio'/>
                            </div>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Fecha retorno</strong></span>
                                <input
                        disabled={!editar_informacion}
                                    autoComplete={false}
                                    type='date' 
                                    id='fecha_retorno'
                                    value={fecha_retorno}
                                    className='form-control rounded'
                                    onChange={(event) => setFechaRetorno (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif',
                                            padding: 10 / proporcional, border: '1px solid #007bff'}}
                                    placeholder='Fecha retorno'/>
                            </div>
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
                                id='notas_trabajador'
                                value={notas_trabajador}
                                className='form-control rounded'
                                onChange={(event) => setNotasTrabajador (event.target.value)}
                                style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: 500 - notas_trabajador.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                        padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                                placeholder='Notas'/>
                            <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                                <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - notas_trabajador.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                    fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - notas_trabajador.length}</p>
                            </div>
                        </div>
                        <div className='justify-content-between' 
                            style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                autoComplete={false} 
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                                onChange={handleFileChange}/>
                            <div className={boton_subir_foto ? 'shadow-lg rounded' : 'rounded'} 
                                style={{width: '100%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                    lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                    fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                    onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir documento</p>
                            </div>
                        </div>
                        {
                            url_documento !== '' ? (
                                <div className='d-flex justify-content-start' style={{width: '100%', height: 30 / proporcional}}>
                                    <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 16 / proporcional, 
                                        background: 'white', cursor: 'default'
                                        }}><strong>{url_documento}</strong></p>
                                </div>
                            ) : null
                        }
                    </div>
                ) : null
            }
            {
                editar_informacion ? (
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => cancelar_actualizacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                            onClick={() => actualizar_datos_estado_trabajador()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => {navigate ('/panel/rrhh/estado-trabajo'); dispatch(set_datos_paso_estado('trabajador'));
                                    setEditarInformacion(false)
                            }}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                        <div VolverlassName={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
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
