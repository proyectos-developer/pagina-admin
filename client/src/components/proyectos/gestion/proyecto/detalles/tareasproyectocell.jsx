import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { useLocation } from 'react-router-dom'

import CardDependenciaCell from '../card/dependenciacell.jsx'

export default function DetallesTareasProyectoCell({proporcional}) {
    
    const location = useLocation()
    const dispatch = useDispatch()

    const [id_tarea, setIdTarea] = useState()
    const [tarea, setTarea] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha_inicio, setFechaInicio] = useState('')
    const [fecha_finalizacion, setFechaFinalizacion] = useState('')
    const [estado, setEstado] = useState ('')
    const [dependencias, setDependencias] = useState('')

    const [lista_dependencias, setListaDependencias] = useState([])
    
    const [etarea, setETarea] = useState(false)

    const [nueva_tarea, setNuevaTarea] = useState (false)
    const [editar_informacion, setEditarInformacion] = useState(false)
    const [boton_cancelar_nueva, setBotonCancelarNueva] = useState(false)
    const [boton_nueva_tarea, setBotonNuevaTarea] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const {new_actividad_proyecto, update_actividad_proyecto, get_actividades_proyecto_filter,
        get_actividad_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 16, {}, false).get_actividades_proyecto_filter))
    }, [])

    useEffect(() => {
      console.log ('get', get_actividad_proyecto)
        if (get_actividades_proyecto_filter && get_actividades_proyecto_filter.success === true && get_actividades_proyecto_filter.tareas_proyecto){
            setListaDependencias(get_actividades_proyecto_filter.tareas_proyecto)
        }
    }, [get_actividades_proyecto_filter])

    const resetear_data = () => {
        setIdTarea('')
        setTarea('')
        setDescripcion('')
        setFechaInicio('')
        setFechaFinalizacion('')
        setEstado('')
        setDependencias('')
        setEditarInformacion(true)
        setNuevaTarea (true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
    }

    useEffect(() => {
        if (get_actividad_proyecto && get_actividad_proyecto.success === true && get_actividad_proyecto.tarea_proyecto){
            setIdTarea(get_actividad_proyecto.tarea_proyecto.id)
            setTarea(get_actividad_proyecto.tarea_proyecto.tarea)
            setDescripcion(get_actividad_proyecto.tarea_proyecto.descripcion)
            setFechaInicio(get_actividad_proyecto.tarea_proyecto.fecha_inicio)
            setFechaFinalizacion(get_actividad_proyecto.tarea_proyecto.fecha_finalizacion)
            setEstado(get_actividad_proyecto.tarea_proyecto.estado)
            setDependencias(get_actividad_proyecto.tarea_proyecto.dependencias)
        }
    }, [get_actividad_proyecto])

    useEffect(() => {
        if (update_actividad_proyecto && update_actividad_proyecto.success === true && update_actividad_proyecto.tarea_proyecto){
            window.scrollTo(0, 0)
            setEditarInformacion (false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
        }
    }, [update_actividad_proyecto])

    useEffect(() => {
        if (new_actividad_proyecto && new_actividad_proyecto.success === true && new_actividad_proyecto.tarea_proyecto){
            window.scrollTo(0, 0)
            setEditarInformacion (false)
            setNuevaTarea(false)
            resetear_data()
        }
    }, [new_actividad_proyecto])

    const seleccionar_dependencia = (value) => {
        if (value !== '0' && value !== '1'){
            setDependencias (value)
        }else if (value === '1'){
            setDependencias ('Ninguna')
        }
    }

    const actualizar_tarea = () => {
        if (tarea === ''){
            setETarea(tarea === '' ? true : false)
        }else{
            setETarea(false)
            const data_tarea = {
                id_proyecto: location.pathname.split('/')[6],
                tarea: tarea,
                descripcion: descripcion,
                fecha_inicio: fecha_inicio,
                fecha_finalizacion: fecha_finalizacion,
                estado: estado,
                dependencias: dependencias
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_tarea, 0, 0, 0, 0, 0, 0, 0, 0, data_tarea, false).update_actividad_proyecto))
        }
    }

    const guardar_datos = () => {
        if (tarea === ''){
            setETarea(tarea === '' ? true : false)
        }else{
            setETarea(false)
            const data_tarea = {
                id_proyecto: location.pathname.split('/')[6],
                tarea: tarea,
                descripcion: descripcion,
                fecha_inicio: fecha_inicio,
                fecha_finalizacion: fecha_finalizacion,
                estado: estado,
                dependencias: dependencias
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_tarea, false).new_actividad_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: '#4a4a4a'}}>Tareas del proyecto: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                        </h2>
                    </div>
                    <div className='' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                        {
                            lista_dependencias && lista_dependencias.length > 0 ? (
                                lista_dependencias.map ((tarea, index) => {
                                    return (
                                        <CardDependenciaCell proporcional={proporcional} key={index} index={index} tarea={tarea}/>
                                    )
                                })
                            ) : null
                        }
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => resetear_data()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Nueva tarea                            </p>
                        </div>
                    </div>
                </div>
                {
                    (get_actividad_proyecto && get_actividad_proyecto.tarea_proyecto) || nueva_tarea ? (
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                                    color: '#4a4a4a'}}>Tarea: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                                </h2>
                            </div>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Nombre tarea
                                </span>
                                <input
                                    disabled={!editar_informacion}
                                    type='default' 
                                    id='tarea'
                                    value={tarea}
                                    className='form-control rounded'
                                    onChange={(event) => setTarea (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: etarea ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nombre tarea'/>
                            </div>
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Fecha inicio
                                    </span>
                                    <input
                                        disabled={!editar_informacion}
                                        type='date' 
                                        id='fecha_inicio'
                                        value={fecha_inicio}
                                        className='form-control rounded'
                                        onChange={(event) => setFechaInicio (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Fecha inicio'/>
                                </div>
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Fecha finalización
                                    </span>
                                    <input
                                        disabled={!editar_informacion}
                                        type='date' 
                                        id='fecha_finalizacion'
                                        value={fecha_finalizacion}
                                        className='form-control rounded'
                                        onChange={(event) => setFechaFinalizacion (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Fecha finalización'/>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Descripción del área
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
                                    placeholder='Descripción del área'/>
                            </div>
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Estado
                                    </span>
                                    <select
                                        disabled={!editar_informacion}
                                        type='default' 
                                        id='fecha_inicio'
                                        value={fecha_inicio}
                                        className='form-select rounded'
                                        onChange={(event) => setEstado (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{estado === '' ? 'Seleccionar estado' : estado}</option>
                                    </select>
                                </div>
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Dependencias
                                    </span>
                                    <select
                                        disabled={!editar_informacion}
                                        type='default' 
                                        id='dependencias'
                                        value={dependencias}
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_dependencia (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{dependencias === '' ? 'Seleccionar dependencias' : dependencias}</option>
                                        <option value='1'>Ninguna</option>
                                        {
                                            lista_dependencias && lista_dependencias.length > 0 ? (
                                                lista_dependencias.map((tarea, index) => {
                                                    return (
                                                        <option key={index} value={tarea.tarea}>{tarea.tarea}</option>
                                                    )
                                                })
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>
                            {
                                !nueva_tarea && editar_informacion ? (
                                    <div className='' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                            onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0)}}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Cancelar edición
                                            </p>
                                        </div>
                                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                            onClick={() => actualizar_tarea()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Actualizar datos
                                            </p>
                                        </div>
                                    </div>
                                ) : !nueva_tarea && !editar_informacion ? (
                                    <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                            onClick={() => {setEditarInformacion(true); window.scrollTo(0, 0)}}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Editar información
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_cancelar_nueva ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                            onMouseOver={() => setBotonCancelarNueva(true)} onMouseLeave={() => setBotonCancelarNueva(false)}
                                            onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0); setNuevaTarea(false)}}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Cancelar
                                            </p>
                                        </div>
                                        <div className={boton_nueva_tarea ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonNuevaTarea(true)} onMouseLeave={() => setBotonNuevaTarea(false)}
                                            onClick={() => guardar_datos()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Guardar datos
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}
