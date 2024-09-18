import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata.js'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants.js'

import { useLocation } from 'react-router-dom'

import CardKpi from '../card/kpi.jsx'
import axios from 'axios'
import { constantes } from '../../../../../uri/constantes.js'

export default function DetallesKpisProyecto({proporcional}) {

    const location = useLocation()
    const dispatch = useDispatch()

    const [id_kpi, setIdKpi] = useState('')
    const [id_proyecto, setIdProyecto] = useState('')
    const [id_tarea, setIdTarea] = useState('')
    const [tarea, setTarea] = useState('')
    const [porcentaje_tarea_completada, setPorcentajeTareaCompletada] = useState('')
    const [desviacion_presupuesto, setDesviacionPresupuesto] = useState('')
    
    const [etarea, setETarea] = useState(false)
    const [eporcentaje_tarea_completada, setEPorcentajeTareaCompletada] = useState(false)
    const [edesviacion_presupuesto, setEDesviacionPresupuesto] = useState(false)

    const [lista_kpis, setListaKpis] = useState([])
    const [lsita_actividades, setListaActividades] = useState([])

    const [nuevo_kpi, setNuevoKpi] = useState (false)
    const [editar_informacion, setEditarInformacion] = useState(false)
    const [boton_nuevo_kpi, setBotonNuevoKpi] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const {new_kpi_proyecto, update_kpi_proyecto, get_actividades_proyecto_filter,
            get_kpis_proyecto_filter, get_kpi_proyecto} = 
            useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split ('/')[6], 0, 0, 0, 0, 100, {}, false).get_kpis_proyecto_filter))
    }, [])

    useEffect(() => {
        if (get_kpis_proyecto_filter && get_kpis_proyecto_filter.success === true && get_kpis_proyecto_filter.kpis_proyecto){
            setListaKpis(get_kpis_proyecto_filter.kpis_proyecto)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_kpi_proyecto))
        }
    }, [get_kpis_proyecto_filter])

    const resetear_data = () => {
        setIdTarea('')
        setTarea('')
        setPorcentajeTareaCompletada('')
        setDesviacionPresupuesto('')
        setEditarInformacion (false)
        setNuevoKpi(false)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_kpis_proyecto_filter))
    }

    const agregar_nuevo_kpi = () => {
        setIdTarea('')
        setTarea('')
        setIdProyecto('')
        setPorcentajeTareaCompletada('')
        setDesviacionPresupuesto('')
        setEditarInformacion(true)
        setNuevoKpi (true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_kpi_proyecto))
    }

    useEffect(() => {
        if (get_kpi_proyecto && get_kpi_proyecto.success === true && get_kpi_proyecto.kpi_proyecto){
            setIdKpi(get_kpi_proyecto.kpi_proyecto.id_kpi)
            setIdProyecto (get_kpi_proyecto.kpi_proyecto.id_proyecto)
            setIdTarea(get_kpi_proyecto.kpi_proyecto.id_tarea)
            setTarea (get_kpi_proyecto.kpi_proyecto.tarea)
            setPorcentajeTareaCompletada(get_kpi_proyecto.kpi_proyecto.porcentaje_tarea_completada)
            setDesviacionPresupuesto(get_kpi_proyecto.kpi_proyecto.desviacion_presupuesto)
            axios.get (`${constantes().url_principal[0].url}/gestion/actividad/proyecto/${get_kpi_proyecto.kpi_proyecto.id_tarea}`)
                .then ((res) => {
                    setIdTarea(res.data.tarea_proyecto.id_tarea)
                    setTarea (res.data.tarea_proyecto.tarea)
                }).catch ((err) => {
    
                })
        }
    }, [get_kpi_proyecto])

    useEffect(() => {
        if (update_kpi_proyecto && update_kpi_proyecto.success === true && update_kpi_proyecto.kpi_proyecto){
            window.scrollTo(0, 0)
            setEditarInformacion (false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_kpis_proyecto_filter))
        }
    }, [update_kpi_proyecto])

    useEffect(() => {
        if (get_actividades_proyecto_filter && get_actividades_proyecto_filter.success === true &&
                get_actividades_proyecto_filter.tareas_proyecto){
            setListaActividades(get_actividades_proyecto_filter.tareas_proyecto)
        }
    }, [get_actividades_proyecto_filter])

    useEffect(() => {
        if (new_kpi_proyecto && new_kpi_proyecto.success === true && new_kpi_proyecto.kpi_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_kpi_proyecto])

    const seleccionar_tarea = (value) => {
        if (value !== '0'){
            setIdTarea(value.split ('-')[0])
            setTarea(value.split ('-')[1])
        }
    }

    const actualizar_kpi = () => {
        if (tarea === '' || porcentaje_tarea_completada === '' || desviacion_presupuesto === ''){
            setETarea(tarea === '' ? true : false)
            setEPorcentajeTareaCompletada(porcentaje_tarea_completada === '' ? true : false)
            setEDesviacionPresupuesto(desviacion_presupuesto === '' ? true : false)
        }else{
            setETarea(false)
            setEPorcentajeTareaCompletada(false)
            setEDesviacionPresupuesto(false)
            const data_kpi = {
                id_proyecto: location.pathname.split('/')[6],
                id_tarea: id_tarea,
                desviacion_presupuesto: desviacion_presupuesto,
                porcentaje_tarea_completada: porcentaje_tarea_completada
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_kpi, location.pathname.split('/')[6], 0, 0, 0, 0, 0, 0, 0, data_kpi, false).update_kpi_proyecto))
        }
    }

    const habilitar_campos_informacion = () => {
        setEditarInformacion(true)
        window.scrollTo(0, 0)
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split ('/')[6], 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
    }

    const guardar_datos = () => {
        if (tarea === '' || desviacion_presupuesto === '' || porcentaje_tarea_completada === ''){
            setETarea(tarea === '' ? true : false)
            setEPorcentajeTareaCompletada(porcentaje_tarea_completada === '' ? true : false)
            setEDesviacionPresupuesto(desviacion_presupuesto === '' ? true : false)
        }else{
            setETarea(false)
            setEPorcentajeTareaCompletada(false)
            setEDesviacionPresupuesto(false)
            const data_kpi = {
                id_proyecto: location.pathname.split('/')[6],
                porcentaje_tarea_completada: porcentaje_tarea_completada,
                id_tarea: id_tarea, 
                desviacion_presupuesto: desviacion_presupuesto
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_kpi, false).new_kpi_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 50 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div style={{width: '23%', height: 'auto'}}>
                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: '#4a4a4a'}}>Kpi del proyecto: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                        </h2>
                    </div>
                    <div className='' style={{width: '100%', height: '77%', marginBottom: 16 / proporcional}}>
                        {
                            lista_kpis && lista_kpis.length > 0 ? (
                                lista_kpis.map ((kpi, index) => {
                                    return (
                                        <CardKpi proporcional={proporcional} key={index} index={index} kpi={kpi}/>
                                    )
                                })
                            ) : null
                        }
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
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
                </div>
                {
                    (get_kpi_proyecto && get_kpi_proyecto.kpi_proyecto) || nuevo_kpi ? (
                        <div style={{width: '73%', height: 'auto'}}>
                            <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                                    color: '#4a4a4a'}}>KPI: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                                </h2>
                            </div>
                            {
                                editar_informacion ? (
                                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif'}}>
                                            Nombre tarea
                                        </span>
                                        <select
                                            disabled={!editar_informacion}
                                            type='default' 
                                            id='tarea'
                                            value={tarea}
                                            className='form-select rounded'
                                            onChange={(event) => seleccionar_tarea (event.target.value)}
                                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: etarea ? '1px solid red' : '1px solid #007BFF',
                                                    padding: 10 / proporcional}}>
                                            <option value='0'>{tarea === '' ? 'Seleccionar tarea' : tarea}</option>
                                            {
                                                lsita_actividades && lsita_actividades.length > 0 ? (
                                                    lsita_actividades.map ((tarea, index) => {
                                                        return (
                                                            <option value={tarea.id + '-' + tarea.tarea}>{tarea.tarea}</option>
                                                        )
                                                    })
                                                ) : null
                                            }
                                        </select>
                                    </div>
                                ) : (
                                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                )
                            }
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Porcentaje tarea completada
                                    </span>
                                    <input
                                        disabled={!editar_informacion}
                                        type='number' 
                                        id='porcentaje_tarea_completada'
                                        value={porcentaje_tarea_completada}
                                        className='form-control rounded'
                                        onChange={(event) => setPorcentajeTareaCompletada (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: eporcentaje_tarea_completada ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Porcentaje tarea completada'/>
                                </div>
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Desviación presupuesto
                                    </span>
                                    <input
                                        disabled={!editar_informacion}
                                        type='number' 
                                        id='desviacion_presupuesto'
                                        value={desviacion_presupuesto}
                                        className='form-control rounded'
                                        onChange={(event) => setDesviacionPresupuesto (event.target.value)}
                                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: edesviacion_presupuesto ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Desviación del presupuesto'/>
                                </div>
                            </div>
                            {
                                !nuevo_kpi && editar_informacion ? (
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                            onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0)}}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Cancelar edición
                                            </p>
                                        </div>
                                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                            onClick={() => actualizar_kpi()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Actualizar datos
                                            </p>
                                        </div>
                                    </div>
                                ) : !nuevo_kpi && !editar_informacion ? (
                                    <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                            onClick={() => habilitar_campos_informacion()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Editar información
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_cancelar_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonCancelarNuevo(true)} onMouseLeave={() => setBotonCancelarNuevo(false)}
                                            onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0); setNuevoKpi(false)}}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Cancelar
                                            </p>
                                        </div>
                                        <div className={boton_nuevo_kpi ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonNuevoKpi(true)} onMouseLeave={() => setBotonNuevoKpi(false)}
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
