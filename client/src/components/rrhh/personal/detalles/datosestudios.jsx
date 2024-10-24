import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {institutosConstants} from '../../../../uri/institutos-constants'
import {institutosdata} from '../../../../redux/slice/institutosdata'
import {filesdata} from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'
import { constantes } from '../../../../uri/constantes'
import {personaldata} from '../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../uri/personal-constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { set_datos_paso_personal, set_error_message } from '../../../../redux/actions/data'

export default function DatosEstudios ({proporcional, personal}) {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectRefColegio = useRef(null)
    const selectRefUniversidad = useRef(null)
    const selectRefTitulo = useRef(null)

    const id_personal = location.pathname.split('/')[6]
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [colegio, setColegio] = useState('')
    const [estudios, setEstudios] = useState('')
    const [titulo, setTitulo] = useState('')
    const [universidad, setUniversidad] = useState('')
    const [file_documento, setFileDocumento] = useState('')
    const [url_documento, setUrlDocumento] = useState('')
    const [lista_files_documentos, setListaFilesDocumentos] = useState([])

    const [search_colegio, setSearchColegio] = useState('')
    const [search_universidad, setSearchUniversidad] = useState('')

    const [lista_colegios, setListaColegios] = useState([])
    const [total_colegios, setTotalColegios] = useState(0)
    const [lista_universidades, setListaUniversidades] = useState([])
    const [total_universidades, setTotalUniversidades] = useState(0)

    const [boton_subir_documento, setBotonSubirDocumento] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)

    const {get_colegios_filter, get_universidades_filter} = useSelector(({institutos_data}) => institutos_data)
    const {get_personal_estudios, update_personal_estudios} = useSelector(({personal_data}) => personal_data)
    const {file_upload_documento} = useSelector(({files_data}) => files_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (personal && personal.colegio){
            setColegio(personal.colegio)
            setSearchColegio(personal.colegio)
            setEstudios(personal.estudios)
            setTitulo(personal.titulo)
            setUniversidad(personal.universidad)
            setSearchUniversidad(personal.universidad)
            setUrlDocumento(personal.url_documento)
            setListaFilesDocumentos(personal.url_documento === null ? '' : personal.url_documento.split(';'))
            window.scrollTo(0, 0)
        }
    }, [])

    useEffect(() => {
        if (get_personal_estudios && get_personal_estudios.success === true && get_personal_estudios.trabajador){
            setNombres(get_personal_estudios.trabajador.nombres)
            setApellidos(get_personal_estudios.trabajador.apellidos)
            setColegio(get_personal_estudios.trabajador.colegio)
            setSearchColegio(get_personal_estudios.trabajador.colegio)
            setEstudios(get_personal_estudios.trabajador.estudios)
            setTitulo(get_personal_estudios.trabajador.titulo)
            setUniversidad(get_personal_estudios.trabajador.universidad)
            setSearchUniversidad(get_personal_estudios.trabajador.universidad)
            setUrlDocumento(get_personal_estudios.trabajador.url_documento)
            setListaFilesDocumentos(get_personal_estudios.trabajador.url_documento === null ? '' : get_personal_estudios.trabajador.url_documento.split(';'))
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_personal_estudios))
        }else if (get_personal_estudios && get_personal_estudios.success === false && get_personal_estudios.error){
            dispatch(set_error_message(true))
        }
    }, [get_personal_estudios])

    useEffect(() => {
        if (update_personal_estudios && update_personal_estudios.success === true && update_personal_estudios.trabajador){
            setNombres(update_personal_estudios.trabajador.nombres)
            setApellidos(update_personal_estudios.trabajador.apellidos)
            setColegio(update_personal_estudios.trabajador.colegio)
            setSearchColegio(update_personal_estudios.trabajador.colegio)
            setEstudios(update_personal_estudios.trabajador.estudios)
            setTitulo(update_personal_estudios.trabajador.titulo)
            setUniversidad(update_personal_estudios.trabajador.universidad)
            setSearchUniversidad(update_personal_estudios.trabajador.universidad)
            setUrlDocumento(update_personal_estudios.trabajador.url_documento)
            setListaFilesDocumentos(update_personal_estudios.trabajador.url_documento === null ? '' : update_personal_estudios.trabajador.url_documento.split(';'))
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(personal.id, 0, 0, 0, 0, 0, 0, 0, {}, true).update_personal_estudios))
        }else if (update_personal_estudios && update_personal_estudios.success === false && update_personal_estudios.error){
            dispatch(set_error_message(true))
        }
    }, [update_personal_estudios])

    useEffect(() => {
        if (file_upload_documento && file_upload_documento.success === true && file_upload_documento.message === true){
            let file = url_documento
            file = file === '' ? `${constantes().url_archivo[0].url}/personal/documentos/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_documento.name}` : 
                   file + '; ' + `${constantes().url_archivo[0].url}/personal/documentos/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_documento.name}`
            setListaFilesDocumentos(file.split (';'))
            setUrlDocumento(`${constantes().url_archivo[0].url}/personal/documentos/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_documento.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_documento))
        }else if (file_upload_documento && file_upload_documento.success === false && file_upload_documento.error){
            dispatch(set_error_message(true))
        }
    }, [file_upload_documento])

    const buscar_colegio = (value) => {
        if (value !== ''){
            dispatch(institutosdata(institutosConstants(0, value, 0, 0, 0, 0, false).get_colegios_filter))
        }
        setSearchColegio(value)
    }

    const buscar_universidad = (value) => {
        if (value !== ''){
            dispatch(institutosdata(institutosConstants(0, value, 0, 0, 0, 0, false).get_universidades_filter))
        }
        setSearchUniversidad(value)
    }

    useEffect(() => {
        if (get_colegios_filter && get_colegios_filter.success === true && get_colegios_filter.colegios){
            setListaColegios (get_colegios_filter.colegios)
            setTotalColegios (get_colegios_filter.colegios.length)
        }
    }, [get_colegios_filter])

    useEffect(() => {
        if (get_universidades_filter && get_universidades_filter.success === true && get_universidades_filter.universidades){
            setListaUniversidades (get_universidades_filter.universidades)
            setTotalUniversidades (get_universidades_filter.universidades.length)
        }
    }, [get_universidades_filter])

    const seleccionar_colegio = (value) => {
        if (value !== '0'){
            setColegio(value)
        }
    }

    const seleccionar_universidad = (value) => {
        if (value !== '0'){
            setUniversidad(value)
        }
    }

    const actualizar_datos_personales = () => {
        const data_update = {
            colegio: colegio,
            estudios: estudios,
            titulo: titulo,
            universidad: universidad,
            url_documento: url_documento
        }
        dispatch (personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, data_update, false).update_personal_estudios))
    }
    
    const handleFileChangeDocumento = (event) => {
        setFileDocumento(event.target.files[0])
    }

    const handleUploadDocumento = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_documento, file_documento.name)
        dispatch(filesdata(filesConstants(`${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}`, data, false).file_upload_documento))
    }

    const cancelar_actualizacion = () => {
        dispatch (personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, {}, false).get_personal_estudios))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Buscar colegio</strong></span>
                        <input
                            autoComplete={false}
                            disabled={!editar_informacion}
                            type='default'
                            id='search_colegio'
                            value={search_colegio}
                            className='form-control rounded'
                            onChange={(event) => buscar_colegio(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre del colegio'/>
                    </div>
                    {
                        (lista_colegios && lista_colegios.length > 0) || search_colegio !== '' ? (
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                    <span className='position-absolute'  
                                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                            <strong>Seleccionar colegio</strong></span>
                                <select
                                    disabled={!editar_informacion}
                                    id='estudios'
                                    ref={selectRefColegio}
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_colegio(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{colegio === '' ? `${total_colegios} encontrado(s)` : colegio}</option>
                                    {
                                        lista_colegios.map ((colegio, index) => {
                                            return (
                                                <option value={colegio.nombre_institucion}>{colegio.nombre_institucion}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        ) : null
                    }
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Buscar universidad</strong></span>
                        <input
                            autoComplete={false}
                            disabled={!editar_informacion}
                            type='default'
                            id='search_universidad'
                            value={search_universidad}
                            className='form-control rounded'
                            onChange={(event) => buscar_universidad(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre de la universidad'/>
                    </div>
                    {
                        (lista_universidades && lista_universidades.length > 0) || search_universidad !== '' ? (
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                    <span className='position-absolute'  
                                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                            <strong>Seleccionar universidad</strong></span>
                                <select
                                    disabled={!editar_informacion}
                                    id='estudios'
                                    ref={selectRefUniversidad}
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_universidad(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{total_universidades} encontrada(s)</option>
                                    {
                                        lista_universidades.map ((universidad, index) => {
                                            return (
                                                <option value={universidad.universidad}>{universidad.universidad}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        ) : null
                    }
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Título obtenido</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='titulo'
                            ref={selectRefTitulo}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setTitulo(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{titulo === '' ? 'Seleccionar titulo obtenido' : titulo}</option>
                            <option value='Colegio sin concluir'>Colegio sin concluir</option>
                            <option value='Colegio concluido'>Colegio concluido</option>
                            <option value='Bachiller'>Bachiller</option>
                            <option value='Grado o licenciatura'>Grado o licenciatura</option>
                            <option value='Maestría'>Maestría</option>
                            <option value='Doctorado'>Doctorado</option>
                            <option value='Técnico superior'>Técnico superior</option>
                            <option value='Postgrado'>Postgrado</option>
                        </select>
                    </div>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Estudios realizados</strong></span>
                        <input
                            autoComplete={false}
                            disabled={!editar_informacion}
                            id='estudios'
                            value={estudios}
                            className='form-control rounded'
                            onChange={(event) => setEstudios(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Estudios realizados (carrera)'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginBottom: 16 / proporcional
                }}>
                    <input
                            autoComplete={false}
                        disabled={!editar_informacion} 
                        class="form-control" 
                        type="file" 
                        id="formFile" 
                        falue={file_documento}
                        style={{width: '65%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                            padding: 10 / proporcional}}
                        onChange={handleFileChangeDocumento}/>
                        <div className={boton_subir_documento ? 'shadow-lg rounded' : 'rounded'} 
                            style={{width: '30%', heihgt: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                            <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadDocumento}
                                onMouseOver={() => setBotonSubirDocumento(true)} onMouseLeave={() => setBotonSubirDocumento(false)}>Subir título / diploma</p>
                        </div>
                </div>
                    {
                        lista_files_documentos && lista_files_documentos.length > 0 ? (
                            lista_files_documentos.map((archivo, index) => {
                                return (
                                    archivo === '' ? (
                                        null
                                    ) : (
                                        <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`,
                                            color: '#007bff', fontWeight: 500, fontFamily: 'Poppins, sans-serif',
                                            marginBottom: 16 / proporcional}}><strong>{index + 1}.</strong> {archivo}<br/>
                                        </p>
                                    )
                                )
                            })                            
                        ) : null
                    }
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
