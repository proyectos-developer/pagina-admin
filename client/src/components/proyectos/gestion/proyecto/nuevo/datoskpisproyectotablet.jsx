import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_gestion_kpis, set_data_gestion_riesgos, set_datos_paso_gestion_proyectos}  from '../../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'

export default function DatosRiesgosProyecto ({proporcional, id}) {

    const dispatch = useDispatch()

    const selectRefTarea = useRef(null)

    const id_proyecto = id
    const [id_tarea, setIdTarea] = useState('')
    const [nombre_tarea, setNombreTarea] = useState('')
    const [porcentaje_tarea_completada, setPorcentajeTareaCompletada] = useState('')
    const [desviacion_presupuesto, setDesviacionPresupuesto] = useState('')

    const [lista_tareas, setListaTareas] = useState([])

    const [enombre_tarea, setENombreTarea] = useState(false)
    const [eporcentaje_tarea_completada, setEPorcentajeTareaCompletada] = useState(false)
    const [edesviacion_presupuesto, setEDesviacionPresupuesto] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {get_tareas_proyectos_filter} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {data_gestion_kpis} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_tareas_proyectos_filter && get_tareas_proyectos_filter.success === true && get_tareas_proyectos_filter.tarea_proyectos){
            setListaTareas(get_tareas_proyectos_filter.tarea_proyectos)
        }
    }, [get_tareas_proyectos_filter])

    useEffect(() => {
        if (data_gestion_kpis && data_gestion_kpis.nombre_tarea){
            setIdTarea(data_gestion_kpis.id_tarea)
            setNombreTarea(data_gestion_kpis.nombre_tarea)
            setPorcentajeTareaCompletada(data_gestion_kpis.porcentaje_tarea_completada)
            setDesviacionPresupuesto(data_gestion_kpis.desviacion_presupuesto)
        }else{
            setIdTarea('')
            setNombreTarea('')
            setPorcentajeTareaCompletada('')
            setDesviacionPresupuesto('')
            selectRefTarea.current !== null ? selectRefTarea.current.value = '0' : null
        }
    }, [])

    const seleccionar_tarea = (value) => {
        if (value !== '0' && value.split('*')[1] !== undefined){
            setIdTarea (value.split('*')[0])
            setNombreTarea (value.split('*')[1])
        }else if (value !== '0' && value.split ('*')[1] === undefined){
            setIdTarea (0)
            setNombreTarea (value)
        }
    }

    const finalizar_guardado_datos_proyecto = () => {
        if (nombre_tarea === '' && porcentaje_tarea_completada === '' && desviacion_presupuesto === ''){
            setENombreTarea(nombre_tarea === '' ? true : false)
            setEPorcentajeTareaCompletada(porcentaje_tarea_completada === '' ? true : false)
            setEDesviacionPresupuesto(desviacion_presupuesto === '' ? true : false)
        }else{
            setENombreTarea(false)
            setEPorcentajeTareaCompletada(false)
            setEDesviacionPresupuesto(false)
            const data_kpi = {
                id_proyecto: id,
                id_tarea: id_tarea,
                tarea: nombre_tarea,
                porcentaje_tarea_completada: porcentaje_tarea_completada,
                desviacion_presupuesto: desviacion_presupuesto
            }
            dispatch (set_data_gestion_kpis(data_kpi))
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_kpi, false).new_kpi_proyecto))
        }
    }

    const volver_datos_documentos = () => {
        const data_kpi = {
            id_proyecto: id,
            id_tarea: id_tarea,
            tarea: nombre_tarea,
            porcentaje_tarea_completada: porcentaje_tarea_completada,
            desviacion_presupuesto: desviacion_presupuesto
        }
        dispatch (set_data_gestion_riesgos(data_kpi))
        dispatch (set_datos_paso_gestion_proyectos('riesgos'))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                <select
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
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_documentos()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                    onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                    onClick={() => finalizar_guardado_datos_proyecto()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Guardar datos
                    </p>
                </div>
            </div>
        </div>
    )
}
