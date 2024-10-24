import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_personal_estudios, set_datos_paso_personal, set_error_message } from '../../../../redux/actions/data'

import {institutosConstants} from '../../../../uri/institutos-constants'
import {institutosdata} from '../../../../redux/slice/institutosdata'
import {filesdata} from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'
import { constantes } from '../../../../uri/constantes'

export default function DatosEstudiosCell ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefColegio = useRef(null)
    const selectRefUniversidad = useRef(null)
    const selectRefTitulo = useRef(null)

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
    const [boton_siguiente, setBotonSiguiente] = useState(false)

    const {get_colegios_filter, get_universidades_filter} = useSelector(({institutos_data}) => institutos_data)
    const {data_personal_personal, data_personal_estudios} = useSelector(({data_actions}) => data_actions)
    const {file_upload_documento} = useSelector(({files_data}) => files_data)
    const {new_personal} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (data_personal_estudios && data_personal_estudios.colegio){
            setColegio(data_personal_estudios.colegio)
            setEstudios(data_personal_estudios.estudios)
            setTitulo(data_personal_estudios.titulo)
            setUniversidad(data_personal_estudios.universidad)
            setUrlDocumento(data_personal_estudios.url_documento)
            setSearchColegio(data_personal_estudios.colegio)
            setSearchUniversidad(data_personal_estudios.universidad)
            if (data_personal_estudios.url_documento.split(';').length > 0){
                setListaFilesDocumentos(data_personal_estudios.url_documento.split(';'))
            }
        }else{
            setColegio('')
            setEstudios('')
            setTitulo('')
            setUniversidad('')
            setUrlDocumento('')
            setSearchColegio('')
            setSearchUniversidad('')
            setListaFilesDocumentos([])
            selectRefColegio.current === null ? null : selectRefColegio.current.value = '0'
            selectRefUniversidad.current === null ? null : selectRefUniversidad.current.value = '0'
            selectRefTitulo.current === null ? null : selectRefTitulo.current.value = '0'
        }
    }, [])

    useEffect(() => {
        if (new_personal && new_personal.success === true && new_personal.trabajador){
            setColegio('')
            setEstudios('')
            setTitulo('')
            setUniversidad('')
            setFileDocumento('')
            setUrlDocumento('')
            setListaFilesDocumentos('')
            selectRefColegio.current !== null ? selectRefColegio.current.value = '0' : null
            selectRefUniversidad.current !== null ? selectRefUniversidad.current.value = '0' : null
            selectRefTitulo.current !== null ? selectRefTitulo.current.value = '0' : null
        }else if (new_personal && new_personal.success === false && new_personal.error){
            dispatch (set_error_message(true))
        }
    }, [new_personal])

    useEffect(() => {
        if (file_upload_documento && file_upload_documento.success === true && file_upload_documento.message === true){
            let file = url_documento
            file = file === '' ? `${constantes().url_archivo[0].url}/personal/documentos/${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}/${file_documento.name}` : 
                   file + '; ' + `${constantes().url_archivo[0].url}/personal/documentos/${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}/${file_documento.name}`
            setListaFilesDocumentos(file.split (';'))
            setUrlDocumento(`${constantes().url_archivo[0].url}/personal/documentos/${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}/${file_documento.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_documento))
        }else if (file_upload_documento && file_upload_documento.success === false && file_upload_documento.error){
            dispatch (set_error_message(true))
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
        }else if (get_colegios_filter && get_colegios_filter.success === false && get_colegios_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_colegios_filter])

    useEffect(() => {
        if (get_universidades_filter && get_universidades_filter.success === true && get_universidades_filter.universidades){
            setListaUniversidades (get_universidades_filter.universidades)
            setTotalUniversidades (get_universidades_filter.universidades.length)
        }else if (get_universidades_filter && get_universidades_filter.success === false && get_universidades_filter.error){
            dispatch (set_error_message(true))
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

    const volver_datos_comunicacion = () => {
        dispatch (set_data_personal_estudios({
            colegio: colegio,
            estudios: estudios,
            titulo: titulo,
            universidad: universidad,
            url_documento: url_documento
        }))
        dispatch (set_datos_paso_personal('ubicacion'))
    }

    const continuar_datos_trabajo = () => {
        dispatch (set_data_personal_estudios({
            colegio: colegio,
            estudios: estudios,
            titulo: titulo,
            universidad: universidad,
            url_documento: url_documento
        }))
        dispatch (set_datos_paso_personal('trabajo'))
    }
    
    const handleFileChangeDocumento = (event) => {
        setFileDocumento(event.target.files[0])
    }

    const handleUploadDocumento = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_documento, file_documento.name)
        dispatch(filesdata(filesConstants(`${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}`, data, false).file_upload_documento))
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
                                    <strong>Buscar colegio</strong></span>
                        <input
                            autoComplete={false}
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
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                    <span className='position-absolute'  
                                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                            <strong>Seleccionar colegio</strong></span>
                                <select
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
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Buscar universidad</strong></span>
                        <input
                            autoComplete={false}
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
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                    <span className='position-absolute'  
                                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                            <strong>Seleccionar universidad</strong></span>
                                <select
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
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Título obtenido</strong></span>
                        <select
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
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Estudios realizados</strong></span>
                        <input
                            autoComplete={false}
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
                <div className='' style={{width: '100%', height: 'auto',
                    marginBottom: 16 / proporcional
                }}>
                    <input 
                            autoComplete={false}
                        class="form-control" 
                        type="file" 
                        id="formFile" 
                        falue={file_documento}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                            padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                        onChange={handleFileChangeDocumento}/>
                        <div className={boton_subir_documento ? 'shadow-lg rounded' : 'rounded'} 
                            style={{width: '100%', heihgt: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}>
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
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_comunicacion()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                    onClick={() => continuar_datos_trabajo()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Continuar
                    </p>
                </div>
            </div>
        </div>
    )
}
