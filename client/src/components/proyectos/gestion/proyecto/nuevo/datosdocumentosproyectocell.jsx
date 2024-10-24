import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_gestion_documentos, set_datos_paso_gestion_proyectos}  from '../../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { filesdata } from '../../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../../uri/files-constants'

export default function DatosDocumentosProyecto ({proporcional, id}) {

    const dispatch = useDispatch()

    const selectRefCarpeta = useRef(null)

    const [file_imagen, setFileImagen] = useState (null)

    const id_proyecto = id
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
    const [boton_volver, setBotonVolver] = useState(false)

    const {file_upload} = useSelector(({files_data}) => files_data)
    const {get_documentos_proyectos_filter} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {data_gestion_documentos} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_gestion_documentos && data_gestion_documentos.nombre_carpeta){
            setDescripcionDocumento(data_gestion_documentos.descripcion_documento)
            setNombreCarpeta(data_gestion_documentos.nombre_carpeta)
            setVersionDocumento(data_gestion_documentos.version_documento)
        }else{
            setDescripcionDocumento('')
            setNombreCarpeta('')
            setVersionDocumento('')
            selectRefCarpeta.current !== null ? selectRefCarpeta.current.value = '0' : null
        }
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_documentos_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_documentos_proyectos_filter && get_documentos_proyectos_filter.success === true && get_documentos_proyectos_filter.documentos_proyecto){
            setListaCarpetas(get_documentos_proyectos_filter.documentos_proyecto)
        }
    }, [get_documentos_proyectos_filter])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    const seleccionar_carpeta = (value) => {
        if (value !== '0' && value !== '1'){
            setNombreCarpeta (value)
        }else if (value === '1'){
            setNuevoNombreCarpeta(true)
        }
    }
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name.split('.')[0] + '-' + version_documento + '.' + file_imagen.name.split('.')[1])
        dispatch(filesdata(filesConstants(nombre_carpeta, data, false).file_upload))
    }

    const continuar_datos_documentos = () => {
        if (descripcion_documento === '' && nombre_carpeta === '' && version_documento === '' || 
            (500 - descripcion_documento.length <= 0)
        ){
            setENombreCarpeta(nombre_carpeta === '' ? true : false)
            setEVersionDocumento(version_documento === '' ? true : false)
            setEDescripcionDocumento(descripcion_documento === '' ? true : false)
        }else{
            setENombreCarpeta(false)
            setEDescripcionDocumento(false)
            setEVersionDocumento(false)
            const data_documento = {
                id_proyecto: id_proyecto,
                descripcion: descripcion_documento,
                carpeta: nombre_carpeta,
                versiones: version_documento,
                archivo: file_imagen.name.split('.')[0] + '-' + version_documento + '.' + file_imagen.name.split('.')[1]
            }
            dispatch (set_data_gestion_documentos(data_documento))
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_documento, false).new_documento_proyecto))
        }
    }

    const volver_datos_tareas = () => {
        const data_equipo = {
            id_proyecto: id_proyecto,
            descripcion: descripcion_documento,
            carpeta: nombre_carpeta,
            versiones: version_documento,
            archivo: file_imagen ? file_imagen.name.split('.')[0] + '-' + version_documento + '.' + file_imagen.name.split('.')[1] : null
        }
        dispatch (set_data_gestion_documentos(data_equipo))
        dispatch (set_datos_paso_gestion_proyectos('equipo'))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <select
                        ref={selectRefCarpeta}
                        type='default' 
                        id='nombre_carpeta'
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
                {
                    nuevo_nombre_carpeta ? ( 
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                <textarea 
                    id='descripcion_documento'
                    type='default'
                    rows={3}
                    className='form-control rounded'
                    value={descripcion_documento}
                    onChange={(event) => setDescripcionDocumento(event.target.value)}
                    style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                            padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                    placeholder='Descripción de de funciones'/>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                    <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion_documento.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion_documento.length}</p>
                </div>
            </div>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_tareas()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                    onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                    onClick={() => continuar_datos_documentos()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Guardar datos
                    </p>
                </div>
            </div>
        </div>
    )
}
