import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants'
import {filesdata} from '../../../../redux/slice/filesdata'
import {filesConstants} from '../../../../uri/files-constants'

export default function DocumentosProyectoTablet({proporcional, proyecto}) {

    const dispatch = useDispatch()

    const [file_imagen, setFileImagen] = useState (null)

    const [id_proyecto, setIdProyecto] = useState(proyecto.id)
    const [descripcion_documento, setDescripcionDocumento] = useState('')
    const [nombre_carpeta, setNombreCarpeta] = useState('')
    const [version_documento, setVersionDocumento] = useState('')

    const [lista_carpetas, setListaCarpetas] = useState([])
    const [nuevo_nombre_carpeta, setNuevoNombreCarpeta] = useState('')

    const [enombre_carpeta, setENombreCarpeta] = useState(false)
    const [edescripcion_documento, setEDescripcionDocumento] = useState(false)
    const [eversion_documento, setEVersionDocumento] = useState(false)

    const [boton_subir_documento, setBotonSubirDocumento] = useState(false)
    const [boton_guardar, setBotonGuardar] = useState(false)

    const {file_upload} = useSelector(({files_data}) => files_data)
    const {new_documento_proyecto, get_documentos_proyecto_filter} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', proyecto.id, 0, 0, 0, 0, 100, {}, false).get_documentos_proyecto_filter))
    }, [])

    useEffect(() => {
        if (get_documentos_proyecto_filter && get_documentos_proyecto_filter.success === true && get_documentos_proyecto_filter.documentos_proyecto){
            setListaCarpetas(get_documentos_proyecto_filter.documentos_proyecto)
        }
    }, [get_documentos_proyecto_filter])

    useEffect(() => {
        if (new_documento_proyecto && new_documento_proyecto.success === true && new_documento_proyecto.documento_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_documento_proyecto])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name.split('.')[0] + '-' + version_documento + '.' + file_imagen.name.split('.')[1])
        dispatch(filesdata(filesConstants(nombre_carpeta, data, false).file_upload))
    }

    const resetear_data = () => {
        setDescripcionDocumento('')
        setNombreCarpeta('')
        setVersionDocumento('')
        setNuevoNombreCarpeta(false)
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', proyecto.id, 0, 0, 0, 0, 100, {}, false).get_documentos_proyecto_filter))
    }

    const seleccionar_carpeta = (value) => {
        if (value !== '0' && value !== '1'){
            setNombreCarpeta (value)
        }else if (value === '1'){
            setNuevoNombreCarpeta(true)
        }
    }

    const guardar_documento = () => {
        if (descripcion_documento === '' && nombre_carpeta === '' && version_documento === ''){
            setENombreCarpeta(nombre_carpeta === '' ? true : false)
            setEVersionDocumento(version_documento === '' ? true : false)
            setEDescripcionDocumento(descripcion_documento === '' ? true : false)
        }else{
            setENombreCarpeta(false)
            setEDescripcionDocumento(false)
            setEVersionDocumento(false)
            const data_documento = {
                id_proyecto: proyecto.id,
                descripcion: descripcion_documento,
                carpeta: nombre_carpeta,
                versiones: version_documento,
                archivo: file_imagen.name.split('.')[0] + '-' + version_documento + '.' + file_imagen.name.split('.')[1]
            }
            console.log (data_documento)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_documento, false).new_documento_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4a4a4a'}}>Nuevo documento: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                    </h2>
                </div>
            </div>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    {
                        lista_carpetas && lista_carpetas.length > 0 ? (
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Carpeta
                                </span>
                                <select
                                    type='default' 
                                    id='nombre_carpeta'
                                    value={nombre_carpeta}
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_carpeta (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enombre_carpeta ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{nombre_carpeta === '' ? 'Seleccionar carpeta' : nombre_carpeta}</option>
                                    <option value='1'>Nueva carpeta</option>
                                    {
                                        lista_carpetas && lista_carpetas.length > 0 ? (
                                            lista_carpetas.map ((carpeta, index) => {
                                                return (
                                                    <option key={index} value={carpeta.carpeta}>
                                                        {carpeta.carpeta}
                                                    </option>
                                                )
                                            })
                                        ) : null
                                    }
                                </select>
                            </div>
                        ) : null
                    }
                    {
                        nuevo_nombre_carpeta ? ( 
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Carpeta
                                </span>
                                <input 
                                    id='nombre_carpeta'
                                    type='default'
                                    className='form-control rounded'
                                    value={nombre_carpeta}
                                    onChange={(event) => setNombreCarpeta(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enombre_carpeta ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nombre carpeta'/>
                            </div>
                        ) : null
                    }
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Descripción
                    </span>
                    <textarea 
                        id='descripcion_documento'
                        type='default'
                        rows={3}
                        className='form-control rounded'
                        value={descripcion_documento}
                        onChange={(event) => setDescripcionDocumento(event.target.value)}
                        style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: edescripcion_documento ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Nombre carpeta'/>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Número de versión
                    </span>
                    <input 
                        id='version_documento'
                        type='default'
                        className='form-control rounded'
                        value={version_documento}
                        onChange={(event) => setVersionDocumento(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: eversion_documento ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Número de versión'/>
                </div>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Documento
                    </span>
                    <input 
                        class="form-control" 
                        type="file" 
                        id="formFile" 
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                            padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                        onChange={handleFileChange}/>
                    <div className={boton_subir_documento ? 'shadow-lg rounded' : 'rounded'} 
                        style={{width: '100%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                        <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                            lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                            fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                            onMouseOver={() => setBotonSubirDocumento(true)} onMouseLeave={() => setBotonSubirDocumento(false)}>Subir documento</p>
                    </div>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_documento()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar documento
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
