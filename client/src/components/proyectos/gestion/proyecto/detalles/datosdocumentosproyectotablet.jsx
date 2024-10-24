import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { set_datos_paso_gestion_proyectos}  from '../../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { filesdata } from '../../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../../uri/files-constants'

export default function DatosDocumentosProyectoTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefCarpeta = useRef(null)

    const [file_imagen, setFileImagen] = useState (null)

    const id_proyecto = location.pathname.split ('/')[6]
    const [id_documento, setIdDocumento] = useState(0)
    const [descripcion_documento, setDescripcionDocumento] = useState('')
    const [nombre_carpeta, setNombreCarpeta] = useState('')
    const [version_documento, setVersionDocumento] = useState('')

    const [lista_documentos_proyecto, setListaDocumentosProyecto] = useState([])
    const [lista_carpetas, setListaCarpetas] = useState([])
    const [nuevo_nombre_carpeta, setNuevoNombreCarpeta] = useState('')

    const [enombre_carpeta, setENombreCarpeta] = useState(false)
    const [eversion_documento, setEVersionDocumento] = useState(false)

    const [over_documento, setOverDocumento] = useState(false)
    const [nuevo_documento, setNuevoDocumento] = useState(false)

    const [boton_subir_documento, setBotonSubirDocumento] = useState(false)
    const [boton_cancelar_edicion, setBotonCancelarEdicion] = useState(false)
    const [boton_actualizar, setBotonActaulizar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)

    const {file_upload} = useSelector(({files_data}) => files_data)
    const {get_documentos_proyectos_filter, get_documento_proyecto, update_documento_proyecto,
            new_documento_proyecto, get_carpetas_documentos_proyecto
    } = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_documentos_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_documentos_proyectos_filter && get_documentos_proyectos_filter.success === true && get_documentos_proyectos_filter.documento_proyectos){
            setListaDocumentosProyecto(get_documentos_proyectos_filter.documento_proyectos)
        }
    }, [get_documentos_proyectos_filter])

    useEffect(() => {
        if (get_carpetas_documentos_proyecto && get_carpetas_documentos_proyecto.success === true && get_carpetas_documentos_proyecto.carpetas){
            setListaCarpetas(get_carpetas_documentos_proyecto.carpetas)
        }
    }, [get_carpetas_documentos_proyecto])

    useEffect(() => {
        if (get_documento_proyecto && get_documento_proyecto.success === true && get_documento_proyecto.documento_proyecto){
            setIdDocumento(get_documento_proyecto.documento_proyecto.id)
            setDescripcionDocumento(get_documento_proyecto.documento_proyecto.descripcion)
            setNombreCarpeta(get_documento_proyecto.documento_proyecto.carpeta)
            setVersionDocumento(get_documento_proyecto.documento_proyecto.versiones)
            setFileImagen(get_documento_proyecto.documento_proyecto.archivo)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_documento_proyecto))
        }
    }, [get_documento_proyecto])

    useEffect(() => {
        if (update_documento_proyecto && update_documento_proyecto.success === true && update_documento_proyecto.documento_proyecto){
            setIdDocumento(update_documento_proyecto.documento_proyecto.id)
            setDescripcionDocumento(update_documento_proyecto.documento_proyecto.descripcion)
            setNombreCarpeta(update_documento_proyecto.documento_proyecto.carpeta)
            setVersionDocumento(update_documento_proyecto.documento_proyecto.versiones)
            setFileImagen(update_documento_proyecto.documento_proyecto.archivo)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_documento_proyecto))
        }
    }, [update_documento_proyecto])

    useEffect(() => {
        if (new_documento_proyecto && new_documento_proyecto.success === true && new_documento_proyecto.documento_proyecto){
            setEditarInformacion(false)
            setNuevoDocumento(false)
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_documento_proyecto))
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_documentos_proyectos_filter))
        }
    }, [new_documento_proyecto])

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

    const agregar_nuevo_documento = () => {
        setFileImagen('')
        setDescripcionDocumento('')
        setNombreCarpeta('')
        setVersionDocumento('')
        setEditarInformacion(true)
        setNuevoDocumento(true)
        selectRefCarpeta.current !== null ? selectRefCarpeta.current.value = '0' : null
        dispatch (gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_carpetas_documentos_proyecto))
    }

    const guardar_nuevo_documento = () => {
        if (descripcion_documento === '' && nombre_carpeta === '' && version_documento === '' || 
            (500 - descripcion_documento.length <= 0)
        ){
            setENombreCarpeta(nombre_carpeta === '' ? true : false)
            setEVersionDocumento(version_documento === '' ? true : false)
        }else{
            setENombreCarpeta(false)
            setEVersionDocumento(false)
            const data_documento = {
                id_proyecto: id_proyecto,
                descripcion: descripcion_documento,
                carpeta: nombre_carpeta,
                versiones: version_documento,
                archivo: file_imagen.name.split('.')[0] + '-' + version_documento + '.' + file_imagen.name.split('.')[1]
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_documento, false).new_documento_proyecto))
        }
    }

    const actualizar_datos_documento = () => {
        if (descripcion_documento === '' && nombre_carpeta === '' && version_documento === '' || 
            (500 - descripcion_documento.length <= 0)
        ){
            setENombreCarpeta(nombre_carpeta === '' ? true : false)
            setEVersionDocumento(version_documento === '' ? true : false)
        }else{
            setENombreCarpeta(false)
            setEVersionDocumento(false)
            const data_documento = {
                id_proyecto: id_proyecto,
                descripcion: descripcion_documento,
                carpeta: nombre_carpeta,
                versiones: version_documento,
                archivo: file_imagen.name.split('.')[0] + '-' + version_documento + '.' + file_imagen.name.split('.')[1]
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, data_documento, false).update_documento_proyecto))
        }
    }

    const cancelar_edicion_documento = () => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(id_documento, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_documento_proyecto))
    }

    const volver_a_lista = () => {
        dispatch (set_datos_paso_gestion_proyectos('gestion'))
        navigate ('/panel/proyectos/gestion-proyectos')
    }

    const editar_informacion_documento = () => {
        setEditarInformacion(true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_carpetas_documentos_proyecto))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='overflow-auto' style={{width: '100%', height: 'auto', maxHeight: 300 / proporcional, marginBottom: 16 / proporcional}}>
                        {
                            lista_documentos_proyecto && lista_documentos_proyecto.length > 0 ? (
                                lista_documentos_proyecto.map ((documento, index) => {
                                    return (
                                        <div key={index} className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}
                                            onMouseOver={() => setOverDocumento(documento.id)} onMouseLeave={() => setOverDocumento('')}
                                            onClick={() => dispatch(gestionproyectosdata(gestionproyectosConstants(documento.id, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_documento_proyecto))}>
                                            <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: over_documento === documento.id ? 700 : 500, cursor: 'pointer'}}><strong>{index + 1}. </strong>{documento.carpeta}/{documento.archivo}</p>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}>
                                    <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>Aún no a agregado documentos al proyecto</p>
                                </div>
                            )
                        }
                    </div>
                    <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                        onClick={() => agregar_nuevo_documento()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nuevo documento
                        </p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <select
                                disabled={!editar_informacion}
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
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <input
                                        disabled={!editar_informacion} 
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
                            disabled={!editar_informacion}
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
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                        disabled={!editar_informacion} 
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
                    </div>
                    <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                            <input
                                        disabled={!editar_informacion} 
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                value={file_imagen}
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={editar_informacion ? handleFileChange : null}/>
                            <div className={boton_subir_documento ? 'shadow-lg rounded' : 'rounded'} 
                                style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                    lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                    fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                    onMouseOver={() => setBotonSubirDocumento(true)} onMouseLeave={() => setBotonSubirDocumento(false)}>Subir documento</p>
                            </div>
                        </div>
                    </div>
                    {
                        editar_informacion && !nuevo_documento ? ( 
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_edicion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelarEdicion(true)} onMouseLeave={() => setBotonCancelarEdicion(false)}
                                    onClick={() => cancelar_edicion_documento()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActaulizar(true)} onMouseLeave={() => setBotonActaulizar(false)}
                                    onClick={() => actualizar_datos_documento()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : !editar_informacion && !nuevo_documento ? (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                    onClick={() => volver_a_lista()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Volver
                                    </p>
                                </div>
                                <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                    onClick={() => lista_documentos_proyecto && lista_documentos_proyecto.length > 0 ? editar_informacion_documento() : null}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Editar
                                    </p>
                                </div>
                            </div>
                        ) : nuevo_documento ? (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelarNuevo(true)} onMouseLeave={() => setBotonCancelarNuevo(false)}
                                    onClick={() => {setEditarInformacion(false); setNuevoDocumento(false)}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                                    onClick={() => guardar_nuevo_documento()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Guardar documento
                                    </p>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}
