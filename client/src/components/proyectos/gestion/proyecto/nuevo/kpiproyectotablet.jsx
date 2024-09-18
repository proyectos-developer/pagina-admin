import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { useLocation } from 'react-router-dom'

export default function KpisProyectoTablet({proporcional}) {

    const location = useLocation()
    const dispatch = useDispatch()

    const [id_proyecto, setIdProyecto] = useState(location.pathname.split('/')[6])
    const [id_tarea, setIdTarea] = useState('')
    const [nombre_tarea, setNombreTarea] = useState('')
    const [porcentaje_tarea_completada, setPorcentajeTareaCompletada] = useState('')
    const [desviacion_presupuesto, setDesviacionPresupuesto] = useState('')

    const [lista_tareas, setListaTareas] = useState([])

    const [enombre_tarea, setENombreTarea] = useState(false)
    const [eporcentaje_tarea_completada, setEPorcentajeTareaCompletada] = useState(false)
    const [edesviacion_presupuesto, setEDesviacionPresupuesto] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)

    const {new_kpi_proyecto, get_actividades_proyecto_filter} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
    }, [])

    useEffect(() => {
        if (get_actividades_proyecto_filter && get_actividades_proyecto_filter.success === true && get_actividades_proyecto_filter.tareas_proyecto){
            setListaTareas(get_actividades_proyecto_filter.tareas_proyecto)
        }
    }, [get_actividades_proyecto_filter])

    useEffect(() => {
        if (new_kpi_proyecto && new_kpi_proyecto.success === true && new_kpi_proyecto.kpi_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_kpi_proyecto])

    const resetear_data = () => {
        setNombreTarea('')
        setPorcentajeTareaCompletada('')
        setDesviacionPresupuesto('')
    }

    const seleccionar_tarea = (value) => {
        if(value !== '0'){
            setIdTarea(value.split('-')[0])
            setNombreTarea(value.split('-')[1])
        }
    }

    const guardar_kpi = () => {
        if (nombre_tarea === '' && porcentaje_tarea_completada === '' && desviacion_presupuesto === ''){
            setENombreTarea(nombre_tarea === '' ? true : false)
            setEPorcentajeTareaCompletada(porcentaje_tarea_completada === '' ? true : false)
            setEDesviacionPresupuesto(desviacion_presupuesto === '' ? true : false)
        }else{
            setENombreTarea(false)
            setEPorcentajeTareaCompletada(false)
            setEDesviacionPresupuesto(false)
            const data_kpi = {
                id_proyecto: location.pathname.split('/')[6],
                id_tarea: id_tarea,
                porcentaje_tarea_completada: porcentaje_tarea_completada,
                desviacion_presupuesto: desviacion_presupuesto
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_kpi, false).new_kpi_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4a4a4a'}}>Nuevo kpi: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                    </h2>
                </div>
            </div>
            <div style={{width: '100%', height: 'auto'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Tarea
                    </span>
                    <select
                        type='default' 
                        id='nombre_tarea'
                        value={nombre_tarea}
                        className='form-select rounded'
                        onChange={(event) => seleccionar_tarea (event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: enombre_tarea ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}>
                        <option value='0'>{nombre_tarea === '' ? 'Seleccionar tarea' : nombre_tarea}</option>
                        {
                            lista_tareas && lista_tareas.length > 0 ? (
                                lista_tareas.map ((tarea, index) => {
                                    return (
                                        <option key={index} value={tarea.id + '-' + tarea.tarea}>
                                            {tarea.tarea}
                                        </option>
                                    )
                                })
                            ) : null
                        }
                    </select>
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Porcentaje tarea completada (%)
                        </span>
                        <textarea 
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
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Desviación presupuesto
                        </span>
                        <textarea 
                            id='desviacion_presupuesto'
                            type='number'
                            className='form-control rounded'
                            value={desviacion_presupuesto}
                            onChange={(event) => setDesviacionPresupuesto(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eporcentaje_tarea_completada ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Desviación presupuesto'/>
                    </div>
                </div>
                <div className='d' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_kpi()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar kpi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
