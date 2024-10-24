import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { set_data_estado_trabajador, set_data_estado_reemplazo, set_datos_paso_estado, set_error_message } from '../../../../redux/actions/data'
import { useDispatch, useSelector } from 'react-redux'
import { filesdata } from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'
import { personaldata } from '../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../uri/personal-constants'
import axios from 'axios'
import { constantes } from '../../../../uri/constantes'

export default function DatosTrabajadorCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectRefTrabajador = useRef(null)
    
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
    const [boton_guardar, setBotonGuardar] = useState(false)

    const {get_personal_filter, new_estado} = useSelector(({personal_data}) => personal_data)
    const {file_upload_estado_trabajo} = useSelector(({files_data}) => files_data)
    const {data_estado_trabajador} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_estado_trabajador && data_estado_trabajador.nombres){
            setIdPersonal(data_estado_trabajador.id_personal)
            setCodigoPersonal(data_estado_trabajador.codigo_personal)
            setNombres(data_estado_trabajador.nombres)
            setApellidos(data_estado_trabajador.apellidos)
            setEstadoTrabajo(data_estado_trabajador.estado_trabajo)
            setFechaInicio(data_estado_trabajador.fecha_inicio)
            setFechaRetorno(data_estado_trabajador.fecha_retorno)
            setNroTelefono(data_estado_trabajador.nro_telefono)
            setCorreo(data_estado_trabajador.correo)
            setNotasTrabajador(data_estado_trabajador.notas_trabajador)
            setUrlDocumento(data_estado_trabajador.url_documento)
        }else{
            setIdPersonal('')
            setNombres('')
            setCodigoPersonal('')
            setApellidos('')
            setEstadoTrabajo('')
            setFechaInicio('')
            setFechaRetorno('')
            setNroTelefono('')
            setCorreo('')
            setNotasTrabajador('')
            setUrlDocumento('')
            selectRefTrabajador.current === null ? null : selectRefTrabajador.current.value = '0'
        }
    }, [])

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

    useEffect(() => {
        if (new_estado && new_estado.success === true && new_estado.estado){
            setIdPersonal('')
            setCodigoPersonal('')
            setNombres('')
            setApellidos('')
            setEstadoTrabajo('')
            setFechaInicio('')
            setFechaRetorno('')
            setNroTelefono('')
            setCorreo('')
            setNotasTrabajador('')
            setUrlDocumento('')
        }else if (new_estado && new_estado.success === false && new_estado.error){
            dispatch (set_error_message(true))
        }
    }, [new_estado])
    
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
                    setCodigoPersonal(res.data.trabajador.codigo_personal)
                    setNombres(res.data.trabajador.nombres)
                    setApellidos(res.data.trabajador.apellidos)
                    setNroTelefono(res.data.trabajador.nro_telefono)
                    setCorreo(res.data.trabajador.correo_personal)
                    selectRefTrabajador.current ? selectRefTrabajador.current.value = '0' : null
                    setSearchTrabajador(res.data.trabajador.nombres + ' ' + res.data.trabajador.apellidos)
                }).catch ((err) => {
                    dispatch (set_error_message(true))
                })
        }
    }

    const volver_a_lista = () => {
        dispatch (set_data_estado_trabajador({}))
        dispatch (set_data_estado_reemplazo({}))
        selectRefTrabajador.current === null ? null : selectRefTrabajador.current.value = '0'
        navigate ('/panel/rrhh/estado-trabajo')
    }

    const continuar_datos_reemplazo = () => {
        if (nombres === ''  && fecha_inicio === '' && (500 - notas_trabajador.length <= 0)){
          setENombres(nombres === '' ? true : false)
          setEFechaInicio(fecha_inicio === '' ? true : false)
        }else{
            setENombres(false)
            setEFechaInicio(false)
            const data_nuevo = {
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
            dispatch (set_data_estado_trabajador(data_nuevo))
            dispatch (set_datos_paso_estado('reemplazo'))
        }
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
                                    lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
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
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_a_lista()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Cancelar
                    </p>
                </div>
                <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                    onClick={() => continuar_datos_reemplazo()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Continuar
                    </p>
                </div>
            </div>
        </div>
    )
}
