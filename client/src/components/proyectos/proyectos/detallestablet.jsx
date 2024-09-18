import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {proyectosdata} from '../../../redux/slice/proyectosdata'
import {proyectosConstants} from '../../../uri/proyectos-constants'
import { set_data_proyecto } from '../../../redux/actions/data'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'

export default function DetallesProyecto ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectTipoProyecto = useRef(null)
    const selectCliente = useRef(null)

    const [file_imagen, setFileImagen] = useState (null)
    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_proyecto, setIdProyecto] = useState('')
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
    const {data_proyecto, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_proyecto.nombre_proyecto === undefined){
            dispatch(proyectosdata(proyectosConstants(location.pathname.split ('/')[6], 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_proyecto))
        }else{
            setIdProyecto(data_proyecto.id)
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
            setUrlImagen(`https://api.developer-ideas.com/proyectos/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_proyecto && get_proyecto.success === true && get_proyecto.proyecto){
            setIdProyecto(get_proyecto.proyecto.id)
            setIdTipoProyecto(get_proyecto.proyecto.id_tipo_proyecto)
            setTipoProyecto(get_proyecto.proyecto.tipo_proyecto)
            setNombreProyecto (get_proyecto.proyecto.nombre_proyecto)
            setDescripcion(get_proyecto.proyecto.descripcion)
            setCliente(get_proyecto.proyecto.cliente)
            setUrlImagen(get_proyecto.proyecto.url_imagen)
            setUrlContenido(get_proyecto.proyecto.url_contenido)
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_proyecto))
        }
    }, [get_proyecto])

    useEffect(() => {
        if (update_proyecto && update_proyecto.success === true && update_proyecto.proyecto){
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).update_proyecto))
            setEditarInformacion(false)
        }
    }, [update_proyecto])

    useEffect(() => {
        if (get_tipo_proyectos_negocios && get_tipo_proyectos_negocios.success === true && 
            get_tipo_proyectos_negocios.tipo_proyectos && get_tipo_proyectos_negocios.negocios){
            setListaTipoProyectos(get_tipo_proyectos_negocios.tipo_proyectos)
            setListaNegocios(get_tipo_proyectos_negocios.negocios)
            setEditarInformacion(true)
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

    useEffect(() => {
        return (() => {
            setListaTipoProyectos([])
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).update_proyecto))
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_proyecto))
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_tipo_proyectos_negocios))
            dispatch(filesdata(filesConstants(0, {}, true).file_upload))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Proyecto: <span style={{fontSize: 28 / proporcional, color: '#007BFF'}}>{nombre_proyecto}</span>
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '80%', height: '100%'}}>
                    <div className='d-flex justify-content-center' 
                            style={{width: '100%', height: 'auto', paddingTop: 26.5 / proporcional,
                                paddingBottom: 26.5 / proporcional, marginBottom: 16 / proporcional}}>
                        <div className='rounded-circle' style={{width:  292 / proporcional, height: 292 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_imagen !== '' ? (
                                    <img className='rounded-circle' src={url_imagen} 
                                        style={{width: 290 / proporcional, height: 290 / proporcional}}/>
                                ) : null
                            }
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Tipo proyecto
                        </span>
                        <select 
                            disabled={!editar_informacion}
                            ref={selectTipoProyecto}
                            id='tipo_proyecto'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_tipo_proyecto (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: etipo_proyecto ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{tipo_proyecto}</option>     
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
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Nombre proyecto
                        </span>
                        <input 
                            disabled={!editar_informacion}
                            id='nombre_proyecto'
                            type='default'
                            className='form-control rounded'
                            value={nombre_proyecto}
                            onChange={(event) => setNombreProyecto(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: enombre_proyecto ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre proyecto'/>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Descripcion
                        </span>
                        <textarea 
                            disabled={!editar_informacion}
                            id='descripcion'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Descripción'/>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Cliente
                        </span>
                        <select 
                            disabled={!editar_informacion}
                            ref={selectCliente}
                            id='cliente'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_cliente (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecliente ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{cliente}</option>     
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
                    <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url imagen
                        </span>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                            <input 
                                disabled={!editar_informacion}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_imagen ? '1px solid red' : '1px solid #007BFF',
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
                    <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <div style={{width: '100%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Url contenido
                            </span>
                            <input 
                                disabled={!editar_informacion}
                                id='url_contenido'
                                type='web'
                                className='form-control rounded'
                                value={url_contenido}
                                onChange={(event) => setUrlContenido(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Correo electrónico'/>
                        </div>
                    </div>
                    {
                        editar_informacion ? (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                    onClick={() => actualizar_datos_proyecto()}>
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
                                    onClick={() => actualizar_informacion()}>
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
