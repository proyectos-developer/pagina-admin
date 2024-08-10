import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {proyectosdata} from '../../redux/slice/proyectosdata'
import {proyectosConstants} from '../../uri/proyectos-constants'

export default function NuevoProyecto ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

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
    const [edescripcion, setEDescripcion] = useState(false)
    const [eurl_imagen, setEUrlImagen] = useState(false)
    const [eurl_contenido, setEUrlContenido] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [show_lista, setShowLista] = useState(false)

    const [lista_proyectos, setListaProyectos] = useState([])
    const [lista_tipo_proyectos, setListaTipoProyectos] = useState([])
    const [lista_negocios, setListaNegocios] = useState([])

    const {new_proyecto, get_proyectos_todo} = useSelector(({proyectos_data}) => proyectos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(proyectosdata(proyectosConstants(0, 0, 0, {}, false).get_proyectos_todo))
    }, [])

    useEffect(() => {
        if (get_proyectos_todo && get_proyectos_todo.success === true && get_proyectos_todo.proyectos && 
                get_proyectos_todo.tipo_proyectos && get_proyectos_todo.negocios){
            setListaProyectos(get_proyectos_todo.proyectos)
            setListaTipoProyectos(get_proyectos_todo.tipo_proyectos)
            setListaNegocios (get_proyectos_todo.negocios)
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, {}, true).get_proyectos_todo))
        }
    }, [get_proyectos_todo])

    useEffect(() => {
        if (new_proyecto && new_proyecto.success === true && new_proyecto.proyectos){
            setListaProyectos(new_proyecto.proyectos)
            setListaTipoProyectos(new_proyecto.tipo_proyectos)
            setListaNegocios (new_proyecto.negocios)
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, {}, true).new_proyecto))
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
        navigate ('/proyectos')
    }

    const guardar_proyecto = () => {
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
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, data_nuevo, false).new_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: '100%'}}>
                <div style={{width: '25%', height: '100%'}}>
                    <h3 style={{fontSize: 20 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16 / proporcional, fontWeight: 500,
                        fontFamily: 'Poppins, sans-serif', color: 'rgb (89, 89, 89)'}}>
                        Proyectos ya agregados
                    </h3>
                    <div className={show_lista ? 'rounded overflow-auto' : 'rounded overflow-hidden'} 
                        style={{width: '100%', height: 670 / proporcional,
                            border: '1px solid #f2f2f2', padding: 5 / proporcional}}
                        onMouseOver={() => setShowLista(true)} onMouseLeave={() => setShowLista(false)}>
                        {
                            lista_proyectos && lista_proyectos.length > 0 ? (
                                lista_proyectos.map ((proyecto, index) => {
                                    return (
                                        <p style={{color: '#4a4a4a', marginBottom: 8 / proporcional, fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', fontWeight: 500}}>
                                            <strong>{index + 1}.</strong> {proyecto.nombre_proyecto}
                                        </p>
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
                <div style={{width: '68%', height: '100%'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <div className='d-flex justify-content-center' 
                              style={{width: '48%', height: 292 / proporcional, paddingTop: 26.5 / proporcional,
                                  paddingBottom: 26.5 / proporcional}}>
                          <div className='rounded-circle' style={{width:  292 / proporcional, height: 292 / proporcional,
                              border: '1px solid #4a4a4a'}}>
                              {
                                  url_imagen !== '' ? (
                                      <img className='rounded-circle' src={url_imagen} 
                                          style={{width: 292 / proporcional, height: 292 / proporcional}}/>
                                  ) : null
                              }
                          </div>
                        </div>
                        <div className='' style={{width: '48%', height: 'auto'}}>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Tipo proyecto
                                </span>
                                <select 
                                    ref={selectTipoProyecto}
                                    id='tipo_proyecto'
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_tipo_proyecto (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: etipo_proyecto ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>Seleccionar tipo proyecto</option>     
                                    {
                                      lista_tipo_proyectos && lista_tipo_proyectos.length > 0 ? (
                                        lista_tipo_proyectos.map ((tipo_proyecto, index) => {
                                          return (
                                            <option value={`${tipo_proyecto.id}-${tipo_proyecto.nombre}`}>{tipo_proyecto.nombre}</option>     
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
                                    id='descripcion'
                                    type='default'
                                    rows={3}
                                    className='form-control rounded'
                                    value={descripcion}
                                    onChange={(event) => setDescripcion(event.target.value)}
                                    style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: edescripcion ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Descripción'/>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Cliente
                        </span>
                        <select 
                            ref={selectCliente}
                            id='cliente'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_cliente (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecliente ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>Seleccionar cliente</option>     
                            {
                                lista_negocios && lista_negocios.length > 0 ? (
                                    lista_negocios.map ((negocio, index) => {
                                        return (
                                        <option value={`${negocio.nombre_negocio}`}>{negocio.nombre_negocio}</option>     
                                        )
                                    })
                                ) : null
                            }    
                            </select>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url imagen
                        </span>
                        <input 
                            id='url_imagen'
                            type='default'
                            className='form-control rounded'
                            value={url_imagen}
                            onChange={(event) => setUrlImagen(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_imagen ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Url imagen'/>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url contenido
                        </span>
                        <input 
                            id='url_contenido'
                            type='default'
                            className='form-control rounded'
                            value={url_contenido}
                            onChange={(event) => setUrlContenido(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_contenido ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre url_contenido'/>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                            onClick={() => guardar_proyecto()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Guardar datos
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
                </div>
            </div>
        </div>
    )
}
