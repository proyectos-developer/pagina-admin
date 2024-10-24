import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {proyectosdata} from '../../../redux/slice/proyectosdata'
import {proyectosConstants} from '../../../uri/proyectos-constants'
import { set_data_proyecto, set_error_message } from '../../../redux/actions/data'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'
import { constantes } from '../../../uri/constantes'

export default function DetallesProyecto ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectTipoProyecto = useRef(null)
    const selectCliente = useRef(null)

    const [file_imagen, setFileImagen] = useState (null)

    const id_proyecto = location.pathname.split ('/')[6]
    const [id_tipo_proyecto, setIdTipoProyecto] = useState('')
    const [tipo_proyecto, setTipoProyecto] = useState('')
    const [nombre_proyecto, setNombreProyecto] = useState('')
    const [descripcion, setDescripcion] = useState ('')
    const [cliente, setCliente] = useState ('')
    const [url_imagen, setUrlImagen] = useState ('')
    const [url_contenido, setUrlContenido] = useState ('')

    const [etipo_proyecto, setETipoProyecto] = useState(false)
    const [enombre_proyecto, setENombreProyecto] = useState(false)
    const [ecliente, setECliente] = useState (false)
    const [eurl_imagen, setEUrlImagen] = useState (false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const [lista_tipo_proyectos, setListaTipoProyectos] = useState([])
    const [lista_negocios, setListaNegocios] = useState([])

    const {update_proyecto, get_proyecto, get_tipo_proyectos_negocios} = useSelector(({proyectos_data}) => proyectos_data)
    const {file_upload} = useSelector(({files_data}) => files_data)
    const {data_proyecto, data_editable} = useSelector(({data_actions}) => data_actions)
    
    const [editar_informacion, setEditarInformacion] = useState(data_editable)
    useEffect(() => {
        window.scrollTo(0, 0)
        if (data_proyecto.nombre_proyecto === undefined){
            dispatch(proyectosdata(proyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 16, {}, false).get_proyecto))
        }else{
            setIdTipoProyecto(data_proyecto.id_tipo_proyecto)
            setTipoProyecto(data_proyecto.tipo_proyecto)
            setNombreProyecto (data_proyecto.nombre_proyecto)
            setDescripcion(data_proyecto.descripcion)
            setCliente(data_proyecto.cliente)
            setUrlImagen(data_proyecto.url_imagen)
            setUrlContenido(data_proyecto.url_contenido)
        }
    }, [])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlImagen(`${constantes().url_archivo[0].url}/proyectos/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }else if (file_upload && file_upload.success === false && file_upload.error){
            dispatch (set_error_message(true))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_proyecto && get_proyecto.success === true && get_proyecto.proyecto){
            setIdTipoProyecto(get_proyecto.proyecto.id_tipo_proyecto)
            setTipoProyecto(get_proyecto.proyecto.tipo_proyecto)
            setNombreProyecto (get_proyecto.proyecto.nombre_proyecto)
            setDescripcion(get_proyecto.proyecto.descripcion)
            setCliente(get_proyecto.proyecto.cliente)
            setUrlImagen(get_proyecto.proyecto.url_imagen)
            setUrlContenido(get_proyecto.proyecto.url_contenido)
            setEditarInformacion(false)
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_proyecto))
        }else if (get_proyecto && get_proyecto.success === false && get_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [get_proyecto])

    useEffect(() => {
        if (update_proyecto && update_proyecto.success === true && update_proyecto.proyecto){
            setIdTipoProyecto(update_proyecto.proyecto.id_tipo_proyecto)
            setTipoProyecto(update_proyecto.proyecto.tipo_proyecto)
            setNombreProyecto (update_proyecto.proyecto.nombre_proyecto)
            setDescripcion(update_proyecto.proyecto.descripcion)
            setCliente(update_proyecto.proyecto.cliente)
            setUrlImagen(update_proyecto.proyecto.url_imagen)
            setUrlContenido(update_proyecto.proyecto.url_contenido)
            setEditarInformacion(false)
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).update_proyecto))
        }else if (update_proyecto && update_proyecto.success === false && update_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [update_proyecto])

    useEffect(() => {
        if (get_tipo_proyectos_negocios && get_tipo_proyectos_negocios.success === true && 
            get_tipo_proyectos_negocios.tipo_proyectos && get_tipo_proyectos_negocios.negocios){
            setListaTipoProyectos(get_tipo_proyectos_negocios.tipo_proyectos)
            setListaNegocios(get_tipo_proyectos_negocios.negocios)
            setEditarInformacion(true)
        }else if (get_tipo_proyectos_negocios && get_tipo_proyectos_negocios.success === false && get_tipo_proyectos_negocios.error){
            dispatch (set_error_message(true))
        }
    }, [get_tipo_proyectos_negocios])

    const seleccionar_tipo_proyecto = (value) => {
      if (value !== '0'){
        setIdTipoProyecto(value.split('-')[0])
        setTipoProyecto(value.split('-')[1])
      }else{  

      }
    }

    const seleccionar_cliente = (value) => {
        if (value !== '0'){
            setCliente(value)
        }else{

        }
    }

    const volver_a_lista = () => {
        dispatch(set_data_proyecto({}))
        navigate ('/panel/proyectos/proyectos')
    }
    
    const actualizar_informacion = () => {
        dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_tipo_proyectos_negocios))
    }

    const actualizar_datos_proyecto = () => {
        if (tipo_proyecto === '' || nombre_proyecto === '' || cliente === '' || url_imagen === ''){
          setETipoProyecto(tipo_proyecto === '' ? true : false)
          setENombreProyecto(nombre_proyecto === '' ? true : false)
          setECliente(cliente === '' ? true : false)
          setEUrlImagen(url_imagen === '' ? true : false)
        }else{
          setETipoProyecto(false)
          setENombreProyecto(false)
          setECliente(false)
          setEUrlImagen(false)
            const data_nuevo = {
              id_tipo_proyecto: id_tipo_proyecto,
              tipo_proyecto: tipo_proyecto,
              nombre_proyecto: nombre_proyecto,
              cliente: cliente,
              descripcion: descripcion,
              url_imagen: url_imagen,
              url_contenido: url_contenido
            }
            dispatch (proyectosdata(proyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 16, data_nuevo, false).update_proyecto))
        }
    }
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('proyectos', data, false).file_upload))
    }

    const cancelar_edicion_datos = () => {
        dispatch (proyectosdata(proyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, {}, false).get_proyecto))
    }

    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
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
                    onClick={() => navigate ('/panel/proyectos/proyectos')}>
                    proyectos
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    proyecto / {nombre_proyecto}
                </p>
            </div>
            <div className='shadow' 
                style={{width: '80%', height: 'auto', background: 'white', padding: 100 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-center' 
                            style={{width: '28%', height: 'auto', paddingTop: 88.5 / proporcional,
                                paddingBottom: 88.5 / proporcional, marginBottom: 16 / proporcional}}>
                        <div className='rounded-circle' style={{width:  192 / proporcional, height: 192 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_imagen !== '' ? (
                                    <img className='rounded-circle' src={url_imagen} 
                                        style={{width: 190 / proporcional, height: 190 / proporcional}}/>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className='' style={{width: '68%', height: 'auto'}}>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Seleccionar tipo proyecto</strong></span>
                                <select
                                    disabled={!editar_informacion} 
                                    ref={selectTipoProyecto}
                                    id='tipo_proyecto'
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_tipo_proyecto (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: etipo_proyecto ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{tipo_proyecto === '' ? 'Seleccionar tipo proyecto' : tipo_proyecto}</option>     
                                    {
                                        lista_tipo_proyectos && lista_tipo_proyectos.length > 0 ? (
                                            lista_tipo_proyectos.map ((tipo_proyecto, index) => {
                                                return (
                                                <option key={index} value={`${tipo_proyecto.id}-${tipo_proyecto.nombre}`}>{tipo_proyecto.nombre}</option>     
                                                )
                                            })
                                        ) : null
                                    }    
                                    </select>
                            </div>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nombre proyecto</strong></span>
                                <input
                                    disabled={!editar_informacion} 
                                    id='nombre_proyecto'
                                    type='default'
                                    className='form-control rounded'
                                    value={nombre_proyecto}
                                    onChange={(event) => setNombreProyecto(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enombre_proyecto ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nombre proyecto'/>
                            </div>
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
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                                placeholder='Descripción del proyecto'/>
                            <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                                <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                    fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                            </div>
                        </div>
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Seleccionar cliente</strong></span>
                            <select
                                disabled={!editar_informacion} 
                                ref={selectCliente}
                                id='cliente'
                                className='form-select rounded'
                                onChange={(event) => seleccionar_cliente (event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: ecliente ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Seleccionar cliente</option>     
                                {
                                    lista_negocios && lista_negocios.length > 0 ? (
                                        lista_negocios.map ((negocio, index) => {
                                            return (
                                            <option key={index} value={`${negocio.nombre_negocio}`}>{negocio.nombre_negocio}</option>     
                                            )
                                        })
                                    ) : null
                                }    
                                </select>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                                <input
                                    disabled={!editar_informacion} 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '65%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eurl_imagen ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    onChange={editar_informacion ? handleFileChange : null}/>
                                <div className={boton_subif_foto ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 40 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                        onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                                </div>
                            </div>
                        </div>
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Url contenido</strong></span>
                            <input
                                disabled={!editar_informacion} 
                                id='url_contenido'
                                type='default'
                                className='form-control rounded'
                                value={url_contenido}
                                onChange={(event) => setUrlContenido(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    placeholder='Url contenido'/>
                        </div>
                    </div>
                </div>
                {
                    editar_informacion ? (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                onClick={() => cancelar_edicion_datos()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_datos_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                onClick={() => volver_a_lista()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Volver
                                </p>
                            </div>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                onClick={() => actualizar_informacion()}>
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
