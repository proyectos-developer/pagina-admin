import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { set_datos_paso_gestion_proyectos}  from '../../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'

export default function DatosRiesgosProyecto ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefTarea = useRef(null)

    const id_proyecto = location.pathname.split('/')[6]
    const [id_kpi, setIdKpi] = useState(0)
    const [id_tarea, setIdTarea] = useState('')
    const [nombre_tarea, setNombreTarea] = useState('')
    const [porcentaje_tarea_completada, setPorcentajeTareaCompletada] = useState('')
    const [desviacion_presupuesto, setDesviacionPresupuesto] = useState('')

    const [lista_tareas, setListaTareas] = useState([])
    const [lista_kpis, setListaKpis] = useState([])

    const [enombre_tarea, setENombreTarea] = useState(false)
    const [eporcentaje_tarea_completada, setEPorcentajeTareaCompletada] = useState(false)
    const [edesviacion_presupuesto, setEDesviacionPresupuesto] = useState(false)

    const [over_kpi, setOverKpi] = useState(false)
    const [nuevo_kpi, setNuevoKpi] = useState(false)

    const [boton_cancelar_edicion, setBotonCancelarEdicion] = useState(false)
    const [boton_actualizar, setBotonActaulizar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)

    const {new_kpi_proyecto, update_kpi_proyecto, get_kpis_proyectos_filter,
        get_kpi_proyecto, get_tareas_proyectos_filter} 
        =  useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(false)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_kpis_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_tareas_proyectos_filter && get_tareas_proyectos_filter.success === true && get_tareas_proyectos_filter.tareas_proyecto){
            setListaTareas(get_tareas_proyectos_filter.tareas_proyecto)
        }
    }, [get_tareas_proyectos_filter])

    useEffect(() => {
        if (get_kpis_proyectos_filter && get_kpis_proyectos_filter.success === true && get_kpis_proyectos_filter.kpis_proyecto){
            setListaKpis(get_kpis_proyectos_filter.kpis_proyecto)
        }
    }, [get_kpis_proyectos_filter])

    useEffect(() => {
        if (get_kpi_proyecto && get_kpi_proyecto.success === true && get_kpi_proyecto.kpi_proyecto){
            setIdKpi(get_kpi_proyecto.kpi_proyecto.id)
            setIdTarea(get_kpi_proyecto.kpi_proyecto.id_tarea)
            setNombreTarea(get_kpi_proyecto.kpi_proyecto.tarea)
            setPorcentajeTareaCompletada(get_kpi_proyecto.kpi_proyecto.porcentaje_tarea_completada)
            setDesviacionPresupuesto(get_kpi_proyecto.kpi_proyecto.desviacion_presupuesto)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_kpi_proyecto))
        }
    }, [get_kpi_proyecto])

    useEffect(() => {
        if (update_kpi_proyecto && update_kpi_proyecto.success === true && update_kpi_proyecto.kpi_proyecto){
            setIdKpi(update_kpi_proyecto.kpi_proyecto.id)
            setIdTarea(update_kpi_proyecto.kpi_proyecto.id_tarea)
            setNombreTarea(update_kpi_proyecto.kpi_proyecto.tarea)
            setPorcentajeTareaCompletada(update_kpi_proyecto.kpi_proyecto.porcentaje_tarea_completada)
            setDesviacionPresupuesto(update_kpi_proyecto.kpi_proyecto.desviacion_presupuesto)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_kpi_proyecto))
        }
    }, [nuevo_kpi])

    useEffect(() => {
        if (new_kpi_proyecto && new_kpi_proyecto.success === true && new_kpi_proyecto.kpi_proyecto){
            setEditarInformacion(false)
            setNuevoKpi(false)
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_kpi_proyecto))
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_kpis_proyectos_filter))
        }
    }, [new_kpi_proyecto])

    const seleccionar_tarea = (value) => {
        if (value !== '0' && value.split('*')[1] !== undefined){
            setIdTarea (value.split('*')[0])
            setNombreTarea (value.split('*')[1])
        }else if (value !== '0' && value.split ('*')[1] === undefined){
            setIdTarea (0)
            setNombreTarea (value)
        }
    }

    const agregar_nuevo_kpi = () => {
        setIdKpi('')
        setIdTarea('')
        setNombreTarea('')
        setPorcentajeTareaCompletada('')
        setDesviacionPresupuesto('')
        setEditarInformacion(true)
        setNuevoKpi(true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }

    const guardar_nuevo_kpi = () => {
        if (nombre_tarea === '' && porcentaje_tarea_completada === '' && desviacion_presupuesto === ''){
            setENombreTarea(nombre_tarea === '' ? true : false)
            setEPorcentajeTareaCompletada(porcentaje_tarea_completada === '' ? true : false)
            setEDesviacionPresupuesto(desviacion_presupuesto === '' ? true : false)
        }else{
            setENombreTarea(false)
            setEPorcentajeTareaCompletada(false)
            setEDesviacionPresupuesto(false)
            const data_kpi = {
                id_proyecto: id_proyecto,
                id_tarea: id_tarea,
                tarea: nombre_tarea,
                porcentaje_tarea_completada: porcentaje_tarea_completada,
                desviacion_presupuesto: desviacion_presupuesto
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_kpi, false).new_kpi_proyecto))
        }
    }

    const actualizar_datos_kpi = () => {
        if (nombre_tarea === '' && porcentaje_tarea_completada === '' && desviacion_presupuesto === ''){
            setENombreTarea(nombre_tarea === '' ? true : false)
            setEPorcentajeTareaCompletada(porcentaje_tarea_completada === '' ? true : false)
            setEDesviacionPresupuesto(desviacion_presupuesto === '' ? true : false)
        }else{
            setENombreTarea(false)
            setEPorcentajeTareaCompletada(false)
            setEDesviacionPresupuesto(false)
            const data_kpi = {
                id_proyecto: id_proyecto,
                id_tarea: id_tarea,
                tarea: nombre_tarea,
                porcentaje_tarea_completada: porcentaje_tarea_completada,
                desviacion_presupuesto: desviacion_presupuesto
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(id_kpi, 0, 0, 0, 0, 0, 0, 0, 0, data_kpi, false).update_kpi_proyecto))
        }
    }

    const cancelar_edicion_kpi = () => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(id_kpi, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_kpi_proyecto))
    }

    const volver_a_lista = () => {
        dispatch (set_datos_paso_gestion_proyectos('gestion'))
        navigate ('/panel/proyectos/gestion-proyectos')
    }

    const editar_informacion_kpi = () => {
        setEditarInformacion(true)
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '24%', minHeight: '100%'}}>
                    <div className='overflow-auto' style={{width: '100%', minHeight: '85.6%', marginBottom: 16 / proporcional}}>
                        {
                            lista_kpis && lista_kpis.length > 0 ? (
                                lista_kpis.map ((kpi, index) => {
                                    return (
                                        <div key={index} className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}
                                            onMouseOver={() => setOverKpi(kpi.id)} onMouseLeave={() => setOverKpi('')}
                                            onClick={() => dispatch(gestionproyectosdata(gestionproyectosConstants(kpi.id, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_kpi_proyecto))}>
                                            <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: over_kpi === kpi.id ? 700 : 500, cursor: 'pointer'}}><strong>{index + 1}. </strong>{kpi.tarea} - {kpi.porcentaje_tarea_completada}%</p>
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
                        onClick={() => agregar_nuevo_kpi()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nuevo kpi
                        </p>
                    </div>
                </div>
                <div style={{width: '75%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion}
                            ref={selectRefTarea}
                            type='default' 
                            id='nombre_tarea'
                            value={nombre_tarea}
                            className='form-select rounded'
                            onChange={(event) => seleccionar_tarea (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: enombre_tarea ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{nombre_tarea === '' ? 'Seleccionar tarea' : nombre_tarea}</option>
                            <option value='Kpi del proyecto'>Kpi del proyecto</option>
                            {
                                lista_tareas && lista_tareas.length > 0 ? (
                                    lista_tareas.map ((tarea, index) => {
                                        return (
                                            <option key={index} value={tarea.id + '*' + tarea.tarea}>
                                                {tarea.tarea}
                                            </option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <textarea
                                disabled={!editar_informacion} 
                                id='porcentaje_tarea_completada'
                                type='number'
                                className='form-control rounded'
                                value={porcentaje_tarea_completada}
                                onChange={(event) => setPorcentajeTareaCompletada(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eporcentaje_tarea_completada ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Porcentaje tarea completada'/>
                        </div>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <textarea 
                                disabled={!editar_informacion}
                                id='desviacion_presupuesto'
                                type='number'
                                className='form-control rounded'
                                value={desviacion_presupuesto}
                                onChange={(event) => setDesviacionPresupuesto(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edesviacion_presupuesto ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Desviación presupuesto'/>
                        </div>
                    </div>
                    {
                        editar_informacion && !nuevo_kpi ? ( 
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_edicion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelarEdicion(true)} onMouseLeave={() => setBotonCancelarEdicion(false)}
                                    onClick={() => cancelar_edicion_kpi()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActaulizar(true)} onMouseLeave={() => setBotonActaulizar(false)}
                                    onClick={() => actualizar_datos_kpi()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : !editar_informacion && !nuevo_kpi ? (
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
                                    onClick={() => lista_kpis && lista_kpis.length > 0 ? editar_informacion_kpi() : null}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Editar
                                    </p>
                                </div>
                            </div>
                        ) : nuevo_kpi ? (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelarNuevo(true)} onMouseLeave={() => setBotonCancelarNuevo(false)}
                                    onClick={() => {setEditarInformacion(false); setNuevoKpi(false)}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                                    onClick={() => guardar_nuevo_kpi()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Guardar kpi
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
