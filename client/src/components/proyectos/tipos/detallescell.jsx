import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {tipoproyectosdata} from '../../../redux/slice/tipoproyectosdata'
import {tipoproyectoConstants} from '../../../uri/tipoproyecto-constants'
import { set_data_tipo_proyecto, set_error_message } from '../../../redux/actions/data'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'
import { constantes } from '../../../uri/constantes'

export default function DetallesTipoProyectoCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [file_imagen, setFileImagen] = useState (null)

    const [id_tipo, setIdTipo] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [url_tipo, setUrlTipo] = useState ('')

    const [enombre, setENombre] = useState(false)
    const [edescripcion, setEDescripcion] = useState(false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_tipo_proyecto, get_tipo_proyecto} = useSelector(({tipoproyectos_data}) => tipoproyectos_data)
    const {file_upload} = useSelector(({files_data}) => files_data) 
    const {data_tipo_proyecto, data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_tipo_proyecto.nombre === undefined){
            dispatch(tipoproyectosdata(tipoproyectoConstants(location.pathname.split ('/')[6], 0, 0, 0, 0, 16, {}, false).get_tipo_proyecto))
        }else{
            setIdTipo(data_tipo_proyecto.id)
            setNombre(data_tipo_proyecto.nombre)
            setDescripcion(data_tipo_proyecto.descripcion)
            setUrlTipo(data_tipo_proyecto.url_tipo)   
        }
    }, [])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlTipo(`${constantes().url_archivo[0].url}/tipo_proyectos/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }else if (file_upload && file_upload.success === false && file_upload.error){
            dispatch (set_error_message(true))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_tipo_proyecto && get_tipo_proyecto.success === true && get_tipo_proyecto.tipo_proyecto){
            setIdTipo(get_tipo_proyecto.tipo_proyecto.id)
            setNombre(get_tipo_proyecto.tipo_proyecto.nombre)
            setDescripcion(get_tipo_proyecto.tipo_proyecto.descripcion)
            setUrlTipo(get_tipo_proyecto.tipo_proyecto.url_tipo)   
            setEditarInformacion(false)
            dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, false).get_tipo_proyecto))
        }else if (get_tipo_proyecto && get_tipo_proyecto.success === false && get_tipo_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [get_tipo_proyecto])

    useEffect(() => {
        if (update_tipo_proyecto && update_tipo_proyecto.success === true && update_tipo_proyecto.tipo_proyecto){
            setIdTipo(update_tipo_proyecto.tipo_proyecto.id)
            setNombre(update_tipo_proyecto.tipo_proyecto.nombre)
            setDescripcion(update_tipo_proyecto.tipo_proyecto.descripcion)
            setUrlTipo(update_tipo_proyecto.tipo_proyecto.url_tipo)   
            dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, true).update_tipo_proyecto))
            setEditarInformacion(false)
        }else if (update_tipo_proyecto && update_tipo_proyecto.success === false && update_tipo_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_tipo_proyecto])

    const volver_a_lista = () => {
        dispatch(set_data_tipo_proyecto({}))
        navigate ('/panel/proyectos/tipos-proyectos')
    }

    const actualizar_datos_negocio = () => {
        if (nombre === '' || (500 - descripcion.length <= 0)){
            setENombre(nombre === '' ? true : false)
            setEDescripcion(500 - descripcion.length <= 0 ? true : false)
        }else{
            setENombre(false)
            setEDescripcion(false)
            const data_nuevo = {
                nombre: nombre,
                descripcion: descripcion,
                url_tipo: url_tipo
            }
            dispatch (tipoproyectosdata(tipoproyectoConstants(id_tipo, 0, 0, 0, 0, 16, data_nuevo, false).update_tipo_proyecto))
        }
    }
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('tipo_proyectos', data, false).file_upload))
    }

    const cancelar_edicion_datos = () => {
        dispatch(tipoproyectosdata(tipoproyectoConstants(id_tipo, 0, 0, 0, 0, 0, {}, false).get_tipo_proyecto))
    }

    useEffect(() => {
        return (() => {
        })
    }, [])


    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
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
                        onClick={() => navigate ('/panel/proyectos')}>
                        proyectos
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/proyectos/tipos-proyectos')}>
                        tipos de proyecto
                    </p>
                </div>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}>
                        / tipo proyecto
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}>
                        / {nombre}
                    </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto',
                        marginBottom: 16 / proporcional }}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 174 / proporcional,
                        marginBottom: 16 / proporcional
                    }}>
                        <div className='rounded-circle' style={{width:  174 / proporcional, height: 174 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_tipo !== '' ? (
                                    <img className='rounded-circle' src={url_tipo} 
                                        style={{width: 172 / proporcional, height: 172 / proporcional}}/>
                                ) : null
                            }
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nombre</strong></span>
                            <input 
                                disabled={!editar_informacion}
                                id='nombre'
                                type='default'
                                className='form-control rounded'
                                value={nombre}
                                onChange={(event) => setNombre(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enombre ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Tipo de proyecto'/>
                        </div>
                        <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Descripción</strong></span>
                            <textarea 
                                disabled={!editar_informacion}
                                id='descripcion'
                                type='default'
                                rows={3}
                                className='form-control rounded'
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                                style={{width: '100%', height: 120 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: 500 - descripcion.length <= 0 ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                                placeholder='Descripción del servicio'/>
                            <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                                <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                    fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <input 
                                disabled={!editar_informacion}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                                onChange={handleFileChange}/>
                            <div className={boton_subif_foto ? 'shadow-lg rounded' : 'rounded'} 
                                style={{width: '100%', heihgt: 40 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                    lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                    fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                    onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    editar_informacion ? (
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                onClick={() => cancelar_edicion_datos()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_datos_negocio()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                onClick={() => volver_a_lista()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Volver
                                </p>
                            </div>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                onClick={() => setEditarInformacion(true)}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Editar datos
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
