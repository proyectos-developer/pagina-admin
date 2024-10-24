import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {proyectosdata} from '../../../redux/slice/proyectosdata'
import {proyectosConstants} from '../../../uri/proyectos-constants'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'
import { constantes } from '../../../uri/constantes'

export default function NuevoProyectoCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [file_imagen, setFileImagen] = useState (null)

    const selectTipoProyecto = useRef(null)
    const selectCliente = useRef(null)

    const [id_tipo_proyecto, setIdTipoProyecto] = useState('')
    const [tipo_proyecto, setTipoProyecto] = useState ('')
    const [nombre_proyecto, setNombreProyecto] = useState('')
    const [cliente, setCliente] = useState ('')
    const [descripcion, setDescripcion] = useState('')
    const [url_imagen, setUrlImagen] = useState('')
    const [url_contenido, setUrlContenido] = useState('')
    
    const [etipo_proyecto, setETipoProyecto] = useState (false)
    const [enombre_proyecto, setENombreProyecto] = useState(false)
    const [ecliente, setECliente] = useState (false)
    const [eurl_imagen, setEUrlImagen] = useState(false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const [lista_tipo_proyectos, setListaTipoProyectos] = useState([])
    const [lista_negocios, setListaNegocios] = useState([])

    const {new_proyecto, get_tipo_proyectos_negocios} = useSelector(({proyectos_data}) => proyectos_data)
    const {file_upload} = useSelector(({files_data}) => files_data)

    useEffect(() => {
        dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_tipo_proyectos_negocios))
    }, [])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlImagen(`${constantes().url_archivo[0].url}/proyectos/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_tipo_proyectos_negocios && get_tipo_proyectos_negocios.success === true && 
                get_tipo_proyectos_negocios.tipo_proyectos && get_tipo_proyectos_negocios.negocios){
            setListaTipoProyectos(get_tipo_proyectos_negocios.tipo_proyectos)
            setListaNegocios (get_tipo_proyectos_negocios.negocios)
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_tipo_proyectos_negocios))
        }
    }, [get_tipo_proyectos_negocios])

    useEffect(() => {
        if (new_proyecto && new_proyecto.success === true && new_proyecto.proyecto){
            setListaTipoProyectos(new_proyecto.tipo_proyectos)
            setListaNegocios (new_proyecto.negocios)
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).new_proyecto))
            resetear_data()
        }
    }, [new_proyecto])

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

    const resetear_data = () => {
        setIdTipoProyecto('')
        setTipoProyecto('')
        setNombreProyecto('')
        setCliente('')
        setDescripcion('')
        setUrlImagen('')
        setUrlContenido('')
        if (selectTipoProyecto.current){
            selectTipoProyecto.current.value = '0'
        }
        if (selectCliente.current){
            selectCliente.current.value = '0'
        }
    }

    const volver_a_lista = () => {
        resetear_data()
        navigate ('/panel/proyectos/proyectos')
    }

    const guardar_proyecto = () => {
        if (tipo_proyecto === '' || nombre_proyecto === '' || cliente === '' || url_imagen === '' ||
            (500 - descripcion.length <= 0)
        ){
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
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_proyecto))
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
                    nuevo
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-center' 
                            style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional
                            }}>
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
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Seleccionar tipo proyecto</strong></span>
                                <select 
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
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nombre proyecto</strong></span>
                                <input 
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
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <input 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eurl_imagen ? '1px solid red' : '1px solid #007BFF',
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
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Url contenido</strong></span>
                            <input 
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
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_proyecto()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar datos
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
