import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {tipoproyectosdata} from '../../redux/slice/tipoproyectosdata'
import {tipoproyectoConstants} from '../../uri/tipoproyecto-constants'
import { set_data_tipo_proyecto } from '../../redux/actions/data'
import {filesdata} from '../../redux/slice/filesdata'
import {filesConstants} from '../../uri/files-constants'

export default function DetallesTipoProyectoTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [file_imagen, setFileImagen] = useState (null)
    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_tipo, setIdTipo] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [url_tipo, setUrlTipo] = useState ('')

    const [enombre, setENombre] = useState(false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_tipo_proyecto, get_tipo_proyecto} = useSelector(({tipoproyectos_data}) => tipoproyectos_data)
    const {file_upload} = useSelector(({files_data}) => files_data) 
    const {data_tipo_proyecto, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_tipo_proyecto.nombre === undefined){
            dispatch(tipoproyectosdata(tipoproyectoConstants(location.pathname.split ('/')[5], 0, 0, 0, 0, 16, {}, false).get_tipo_proyecto))
        }else{
            setIdTipo(data_tipo_proyecto.id)
            setNombre(data_tipo_proyecto.nombre)
            setDescripcion(data_tipo_proyecto.descripcion)
            setUrlTipo(data_tipo_proyecto.url_tipo)   
        }
    }, [])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlTipo(`https://api.developer-ideas.com/tipo_proyectos/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_tipo_proyecto && get_tipo_proyecto.success === true && get_tipo_proyecto.tipo_proyecto){
            setIdTipo(get_tipo_proyecto.tipo_proyecto.id)
            setNombre(get_tipo_proyecto.tipo_proyecto.nombre)
            setDescripcion(get_tipo_proyecto.tipo_proyecto.descripcion)
            setUrlTipo(get_tipo_proyecto.tipo_proyecto.url_tipo)   
            dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, false).get_tipo_proyecto))
        }
    }, [get_tipo_proyecto])

    useEffect(() => {
        if (update_tipo_proyecto && update_tipo_proyecto.success === true && update_tipo_proyecto.tipo_proyecto){
            dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, true).update_tipo_proyecto))
            setEditarInformacion(false)
        }
    }, [update_tipo_proyecto])

    const volver_a_lista = () => {
        dispatch(set_data_tipo_proyecto({}))
        navigate ('/panel/tipos-proyectos')
    }

    const actualizar_datos_negocio = () => {
        if (nombre === ''){
            setENombre(nombre === '' ? true : false)
        }else{
            setENombre(false)
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

    useEffect(() => {
        return (() => {
            dispatch(filesdata(filesConstants(0, {}, true).file_upload))
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 0, {}, true).update_tipo_proyecto))
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 0, {}, true).get_tipo_proyecto))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Tipo proyecto: <span style={{fontSize: 28 / proporcional, color: '#007BFF'}}>{nombre}</span>
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '80%', height: '100%'}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 174 / proporcional, marginBottom: 16 / proporcional}}>
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
                    <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Tipo proyecto
                            </span>
                            <input 
                                disabled={!editar_informacion}
                                id='nombre'
                                type='default'
                                className='form-control rounded'
                                value={nombre}
                                onChange={(event) => setNombre(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enombre ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Tipo de proyecto'/>
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Descripción
                            </span>
                            <textarea 
                                disabled={!editar_informacion}
                                id='descripcion'
                                rows={3}
                                type='default'
                                className='form-control rounded'
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                                style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional, lineHeight: `${20 / proporcional}px`}}
                                placeholder='Descripción'/>
                        </div>
                    </div>
                    <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url foto tipo proyecto
                        </span>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                            <input 
                                disabled={!editar_informacion}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChange}/>
                            <div className={boton_subif_foto ? 'shadow-lg rounded' : 'rounded'} 
                                style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                    lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                    fontWeight: 500, cursor: 'pointer'}} onClick={editar_informacion ? handleUpload : null}
                                    onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                            </div>
                        </div>
                    </div>
                    {
                        editar_informacion ? (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                    onClick={() => actualizar_datos_negocio()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                                <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                    onClick={() => setEditarInformacion(false)}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                    onClick={() => setEditarInformacion(true)}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Editar datos
                                    </p>
                                </div>
                                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                    onClick={() => volver_a_lista()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Volver
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
