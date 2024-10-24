import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { set_datos_paso_estado } from '../../../../../redux/actions/data'

export default function DatosTareasProyecto ({proporcional}) {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const selectRefEstado = useRef(null)
    const selectRefTarea = useRef(null)

    const id_proyecto = location.pathname.split ('/')[6]
    const [id_tarea, setIdTarea] = useState(0)
    const [tarea, setTarea] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha_inicio, setFechaInicio] = useState('')
    const [fecha_finalizacion, setFechaFinalizacion] = useState('')
    const [estado, setEstado] = useState ('')
    const [dependencias, setDependencias] = useState('')

    const [lista_tareas, setListaTareas] = useState([])
    const [over_tarea, setOverTarea] = useState('')
    const [lista_dependencias, setListaDependencias] = useState([])
    
    const [etarea, setETarea] = useState(false)

    const [nueva_tarea, setNuevaTarea] = useState(false)

    const [boton_cancelar_edicion, setBotonCancelarEdicion] = useState(false)
    const [boton_actualizar, setBotonActaulizar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)

    const {data_editable} = useSelector(({data_actions}) => data_actions)
    const {get_tareas_proyectos_filter, get_tarea_proyecto, update_tarea_proyecto, new_tarea_proyecto} = 
        useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_tareas_proyectos_filter && get_tareas_proyectos_filter.success === true && get_tareas_proyectos_filter.tareas_proyecto){
            setListaTareas(get_tareas_proyectos_filter.tareas_proyecto)
            setListaDependencias(get_tareas_proyectos_filter.tareas_proyecto)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 16, {}, true).get_tareas_proyectos_filter))
        }
    }, [get_tareas_proyectos_filter])

    useEffect(() => {
        if (new_tarea_proyecto && new_tarea_proyecto.success === true && new_tarea_proyecto.tarea_proyecto){
            setEditarInformacion(false)
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_tarea_proyecto))
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
        }
    }, [new_tarea_proyecto])

    useEffect(() => {
        if (get_tarea_proyecto && get_tarea_proyecto.success === true && get_tarea_proyecto.tarea_proyecto){
            setIdTarea(get_tarea_proyecto.tarea_proyecto.id)
            setTarea(get_tarea_proyecto.tarea_proyecto.tarea)
            setDescripcion(get_tarea_proyecto.tarea_proyecto.descripcion)
            setFechaInicio(get_tarea_proyecto.tarea_proyecto.fecha_inicio)
            setFechaFinalizacion(get_tarea_proyecto.tarea_proyecto.fecha_finalizacion)
            setEstado(get_tarea_proyecto.tarea_proyecto.estado)
            setDependencias(get_tarea_proyecto.tarea_proyecto.dependencia)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_tarea_proyecto))
        }
    }, [get_tarea_proyecto])

    useEffect(() => {
        if (update_tarea_proyecto && update_tarea_proyecto.success === true && update_tarea_proyecto.tarea_proyecto){
            setIdTarea(update_tarea_proyecto.tarea_proyecto.id)
            setTarea(update_tarea_proyecto.tarea_proyecto.tarea)
            setDescripcion(update_tarea_proyecto.tarea_proyecto.descripcion)
            setFechaInicio(update_tarea_proyecto.tarea_proyecto.fecha_inicio)
            setFechaFinalizacion(update_tarea_proyecto.tarea_proyecto.fecha_finalizacion)
            setEstado(update_tarea_proyecto.tarea_proyecto.estado)
            setDependencias(update_tarea_proyecto.tarea_proyecto.dependencia)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_tarea_proyecto))
        }
    }, [update_tarea_proyecto])

    const seleccionar_dependencia = (value) => {
        if (value !== '0' && value !== '1'){
            setDependencias (value)
        }else if (value === '1'){
            setDependencias ('Ninguna')
        }
    }

    const agregar_nueva_tarea = () => {
        setTarea('')
        setDescripcion('')
        setFechaInicio('')
        setFechaFinalizacion('')
        setEstado('')
        setDependencias('')
        setEditarInformacion(true)
        setNuevaTarea(true)
    }

    const guardar_nueva_tarea = () => {
        if (tarea === '' || (500 - descripcion.length <= 0)){
            setETarea(tarea === '' ? true : false)
        }else{
            setETarea(false)
            const data_tarea = {
                id_proyecto: id_proyecto,
                tarea: tarea,
                descripcion: descripcion,
                fecha_inicio: fecha_inicio,
                fecha_finalizacion: fecha_finalizacion,
                estado: estado,
                dependencias: dependencias
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_tarea, false).new_tarea_proyecto))      
        }
    }

    const actualizar_datos_tarea = () => {
        if (tarea === '' || (500 - descripcion.length <= 0)){
            setETarea(tarea === '' ? true : false)
        }else{
            setETarea(false)
            const data_tarea = {
                id_proyecto: id_proyecto,
                tarea: tarea,
                descripcion: descripcion,
                fecha_inicio: fecha_inicio,
                fecha_finalizacion: fecha_finalizacion,
                estado: estado,
                dependencias: dependencias
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, data_tarea, false).update_tarea_proyecto))      
        }
    }

    const cancelar_edicion_tarea = () => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(id_tarea, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_tarea_proyecto))
    }

    const volver_a_lista = () => {
        dispatch (set_datos_paso_estado('gestion'))
        navigate ('/panel/proyectos/gestion-proyectos')
    }

    const editar_informacion_tarea = () => {
        setEditarInformacion(true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '24%', minHeight: '100%'}}>
                    <div className='overflow-auto' style={{width: '100%', minHeight: '85.3%', marginBottom: 16 / proporcional}}>
                        {
                            lista_tareas && lista_tareas.length > 0 ? (
                                lista_tareas.map ((tarea, index) => {
                                    return (
                                        <div key={index} className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}
                                            onMouseOver={() => setOverTarea(tarea.id)} onMouseLeave={() => setOverTarea('')}
                                            onClick={() => dispatch(gestionproyectosdata(gestionproyectosConstants(tarea.id, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_tarea_proyecto))}>
                                            <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: over_tarea === tarea.id ? 700 : 500, cursor: 'pointer'}}><strong>{index + 1}. </strong>{tarea.tarea}</p>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}>
                                    <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>Aún no a agregado tareas al proyecto</p>
                                </div>
                            )
                        }
                    </div>
                    <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                        onClick={() => agregar_nueva_tarea()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nueva tarea
                        </p>
                    </div>
                </div>
                <div style={{width: '75%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='Descripción de la tarea'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <select
                                disabled={!editar_informacion}
                                ref={selectRefEstado}
                                type='default' 
                                id='estado'
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? setEstado (event.target.value) : null}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>{estado === '' ? 'Seleccionar estado' : estado}</option>
                                <option value='Pendiente'>Pendiente</option>
                                <option value='En progreso'>En progreso</option>
                                <option value='En revisión'>En revisión</option>
                                <option value='Completada'>Completada</option>
                                <option value='Bloqueada'>Bloqueada</option>
                                <option value='Asignada'>Asignada</option>
                                <option value='Autorizada'>Autorizada</option>
                                <option value='Priorizada'>Priorizada</option>
                                <option value='Delegada'>Delegada</option>
                                <option value='Pospuesta'>Pospuesta</option>
                                <option value='Retrasada'>Retrasada</option>
                            </select>
                        </div>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <select
                                disabled={!editar_informacion}
                                ref={selectRefTarea}
                                type='default' 
                                id='dependencias'
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? seleccionar_dependencia (event.target.value) : null}
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
                        editar_informacion && !nueva_tarea ? ( 
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_edicion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelarEdicion(true)} onMouseLeave={() => setBotonCancelarEdicion(false)}
                                    onClick={() => cancelar_edicion_tarea()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActaulizar(true)} onMouseLeave={() => setBotonActaulizar(false)}
                                    onClick={() => actualizar_datos_tarea()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : !editar_informacion && !nueva_tarea ? (
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
                                    onClick={() => lista_tareas && lista_tareas.length > 0 ? editar_informacion_tarea() : null}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Editar
                                    </p>
                                </div>
                            </div>
                        ) : nueva_tarea ? (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelarNuevo(true)} onMouseLeave={() => setBotonCancelarNuevo(false)}
                                    onClick={() => {setEditarInformacion(false); setNuevaTarea(false)}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                                    onClick={() => guardar_nueva_tarea()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Guardar tarea
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
