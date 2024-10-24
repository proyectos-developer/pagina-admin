import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_gestion_riesgos, set_datos_paso_gestion_proyectos}  from '../../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'

export default function DatosRiesgosProyectoCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefTarea = useRef(null)

    const id_proyecto = location.pathname.split('/')[6]
    const [id_riesgo, setIdRiesgo] = useState('')
    const [riesgo_proyecto, setRiesgoProyecto] = useState('')
    const [mitigacion_riesgo, setMitigacionRiesgo] = useState('')
    const [id_tarea, setIdTarea] = useState(0)
    const [tarea, setTarea] = useState('')

    const [lista_riesgos, setListaRiesgos] = useState([])
    const [lista_tareas, setListaTareas] = useState([])

    const [eriesgo_proyecto, setERiesgoProyecto] = useState(false)

    const [over_riesgo, setOverRiesgo] = useState(false)
    const [nuevo_riesgo, setNuevoRiesgo] = useState(false)

    const [boton_cancelar_edicion, setBotonCancelarEdicion] = useState(false)
    const [boton_actualizar, setBotonActaulizar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)

    const {new_riesgo_proyecto, update_riesgo_proyecto, get_riesgos_proyectos_filter,
        get_riesgo_proyecto, get_tareas_proyectos_filter} 
        =  useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_riesgos_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_riesgos_proyectos_filter && get_riesgos_proyectos_filter.success === true && get_riesgos_proyectos_filter.riesgo_proyectos){
            setListaRiesgos(get_riesgos_proyectos_filter.riesgo_proyectos)
        }
    }, [get_riesgos_proyectos_filter])

    useEffect(() => {
        if (get_riesgo_proyecto && get_riesgo_proyecto.success === true && get_riesgo_proyecto.riesgo_proyecto){
            setIdRiesgo(get_riesgo_proyecto.riesgo_proyecto.id)
            setRiesgoProyecto(get_riesgo_proyecto.riesgo_proyecto.riesgo)
            setMitigacionRiesgo(get_riesgo_proyecto.riesgo_proyecto.mitigacion)
            setIdTarea(get_riesgo_proyecto.riesgo_proyecto.tarea)
            setTarea(get_riesgo_proyecto.riesgo_proyecto.id_tarea)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_riesgo_proyecto))
        }
    }, [get_riesgo_proyecto])

    useEffect(() => {
        if (update_riesgo_proyecto && update_riesgo_proyecto.success === true && update_riesgo_proyecto.riesgo_proyecto){
            setIdRiesgo(update_riesgo_proyecto.riesgo_proyecto.id)
            setRiesgoProyecto(update_riesgo_proyecto.riesgo_proyecto.riesgo)
            setMitigacionRiesgo(update_riesgo_proyecto.riesgo_proyecto.mitigacion)
            setIdTarea(update_riesgo_proyecto.riesgo_proyecto.tarea)
            setTarea(update_riesgo_proyecto.riesgo_proyecto.id_tarea)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_riesgo_proyecto))
        }
    }, [update_riesgo_proyecto])

    useEffect(() => {
        if (new_riesgo_proyecto && new_riesgo_proyecto.success === true && new_riesgo_proyecto.riesgo_proyecto){
            setEditarInformacion(false)
            setNuevoRiesgo(false)
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_riesgo_proyecto))
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_riesgos_proyectos_filter))
        }
    }, [new_riesgo_proyecto])

    useEffect(() => {
        if (get_tareas_proyectos_filter && get_tareas_proyectos_filter.success === true && get_tareas_proyectos_filter.tareas_proyecto){
            setListaTareas(get_tareas_proyectos_filter.tareas_proyecto)
        }
    }, [get_tareas_proyectos_filter])

    const seleccionar_tarea_riesgo = (value) => {
        if (value !== '0' && value.split('*')[1] !== undefined){
            setIdTarea (value.split('*')[0])
            setTarea (value.split('*')[1])
        }else if (value !== '0' && value.split ('*')[1] === undefined){
            setIdTarea (0)
            setTarea (value)
        }
    }

    const agregar_nuevo_riesgo = () => {
        setIdRiesgo('')
        setRiesgoProyecto('')
        setMitigacionRiesgo('')
        setIdTarea('')
        setTarea('')
        setEditarInformacion(true)
        setNuevoRiesgo(true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }

    const guardar_nuevo_riesgo = () => {
        if (riesgo_proyecto === '' || (1000  - riesgo_proyecto.length <= 0) || (1000 - mitigacion_riesgo.length <= 0)){
            setERiesgoProyecto(riesgo_proyecto === '' ? true : false)
        }else{
            setERiesgoProyecto(false)
            const data_riesgos = {
                id_proyecto: id_proyecto,
                riesgo: riesgo_proyecto,
                mitigacion: mitigacion_riesgo,
                id_tarea: id_tarea,
                tarea: tarea
            }
            dispatch (set_data_gestion_riesgos(data_riesgos))
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_riesgos, false).new_riesgo_proyecto))
        }
    }

    const actualizar_datos_riesgo = () => {
        if (riesgo_proyecto === '' || (1000  - riesgo_proyecto.length <= 0) || (1000 - mitigacion_riesgo.length <= 0)){
            setERiesgoProyecto(riesgo_proyecto === '' ? true : false)
        }else{
            setERiesgoProyecto(false)
            const data_riesgos = {
                id_proyecto: id_proyecto,
                riesgo: riesgo_proyecto,
                mitigacion: mitigacion_riesgo,
                id_tarea: id_tarea,
                tarea: tarea
            }
            dispatch (set_data_gestion_riesgos(data_riesgos))
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_riesgos, false).new_riesgo_proyecto))
        }
    }

    const cancelar_edicion_riesgo = () => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(id_riesgo, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_riesgo_proyecto))
    }

    const volver_a_lista = () => {
        dispatch (set_datos_paso_gestion_proyectos('gestion'))
        navigate ('/panel/proyectos/gestion-proyectos')
    }

    const editar_informacion_riesgo = () => {
        setEditarInformacion(true)
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
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
                            lista_riesgos && lista_riesgos.length > 0 ? (
                                lista_riesgos.map ((riesgo, index) => {
                                    return (
                                        <div key={index} className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}
                                            onMouseOver={() => setOverRiesgo(riesgo.id)} onMouseLeave={() => setOverRiesgo('')}
                                            onClick={() => dispatch(gestionproyectosdata(gestionproyectosConstants(riesgo.id, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_riesgo_proyecto))}>
                                            <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: over_riesgo === riesgo.id ? 700 : 500, cursor: 'pointer'}}><strong>{index + 1}. </strong>{riesgo.tarea} - {riesgo.riesgo.slice(0, 20)}...</p>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}>
                                    <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>Aún no a agregado comunicaciones al proyecto</p>
                                </div>
                            )
                        }
                    </div>
                    <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                        onClick={() => agregar_nuevo_riesgo()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nuevo riesgo
                        </p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            ref={selectRefTarea}
                            id='tarea'
                            type='default'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_tarea_riesgo(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eriesgo_proyecto ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}>
                            <option value='0'>{tarea === '' ? 'Seleccionar tarea' : tarea}</option>
                            <option value='Riesgos del proyecto'>Riesgos del proyecto</option>
                            {
                                lista_tareas && lista_tareas.length > 0 ? (
                                    lista_tareas.map ((tarea, index) => {
                                        return (
                                            <option value={tarea.id + '*' + tarea.tarea}>Riesgos de {tarea.tarea}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <textarea 
                            disabled={!editar_informacion}
                            id='riesgo_proyecto'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={riesgo_proyecto}
                            onChange={(event) => setRiesgoProyecto(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eriesgo_proyecto ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='Riesgos del proyecto'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 1000 -  riesgo_proyecto.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{1000 -  riesgo_proyecto.length}</p>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <textarea 
                            disabled={!editar_informacion}
                            id='mitigacion_riesgo'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={mitigacion_riesgo}
                            onChange={(event) => setMitigacionRiesgo(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='Mitigaciones del proyecto'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 1000 -  mitigacion_riesgo.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{1000 -  mitigacion_riesgo.length}</p>
                        </div>
                    </div>
                    {
                        editar_informacion && !nuevo_riesgo ? ( 
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_edicion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonCancelarEdicion(true)} onMouseLeave={() => setBotonCancelarEdicion(false)}
                                    onClick={() => cancelar_edicion_riesgo()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActaulizar(true)} onMouseLeave={() => setBotonActaulizar(false)}
                                    onClick={() => actualizar_datos_riesgo()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : !editar_informacion && !nuevo_riesgo ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                    onClick={() => volver_a_lista()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Volver
                                    </p>
                                </div>
                                <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                    onClick={() => lista_riesgos && lista_riesgos.length > 0 ? editar_informacion_riesgo() : null}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Editar
                                    </p>
                                </div>
                            </div>
                        ) : nuevo_riesgo ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonCancelarNuevo(true)} onMouseLeave={() => setBotonCancelarNuevo(false)}
                                    onClick={() => {setEditarInformacion(false); setNuevoRiesgo(false)}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                                    onClick={() => guardar_nuevo_riesgo()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Guardar riesgo
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
