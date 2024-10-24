import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_gestion_riesgos, set_datos_paso_gestion_proyectos}  from '../../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'

export default function DatosRiesgosProyecto ({proporcional, id}) {

    const dispatch = useDispatch()

    const selectRefTarea = useRef(null)

    const id_proyecto = id
    const [riesgo_proyecto, setRiesgoProyecto] = useState('')
    const [mitigacion_riesgo, setMitigacionRiesgo] = useState('')
    const [id_tarea, setIdTarea] = useState(0)
    const [tarea, setTarea] = useState('')

    const [lista_tareas, setListaTareas] = useState([])

    const [eriesgo_proyecto, setERiesgoProyecto] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const { get_tareas_proyectos_filter} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {data_gestion_riesgos} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_tareas_proyectos_filter && get_tareas_proyectos_filter.success === true && get_tareas_proyectos_filter.tarea_proyectos){
            setListaTareas(get_tareas_proyectos_filter.tarea_proyectos)
        }
    }, [get_tareas_proyectos_filter])

    useEffect(() => {
        if (data_gestion_riesgos && data_gestion_riesgos.riesgo_proyecto){
            setRiesgoProyecto(data_gestion_riesgos.riesgo_proyecto)
            setMitigacionRiesgo(data_gestion_riesgos.mitigacion_riesgo)
            setIdTarea(data_gestion_riesgos.id_tarea)
            setMitigacionRiesgo(data_gestion_riesgos.tarea)
        }else{
            setRiesgoProyecto('')
            setMitigacionRiesgo('')
            setIdTarea('')
            setMitigacionRiesgo('')
            selectRefTarea.current !== null ? selectRefTarea.current.value = '0' : null
        }
    }, [])

    const seleccionar_tarea_riesgo = (value) => {
        if (value !== '0' && value.split('*')[1] !== undefined){
            setIdTarea (value.split('*')[0])
            setTarea (value.split('*')[1])
        }else if (value !== '0' && value.split ('*')[1] === undefined){
            setIdTarea (0)
            setTarea (value)
        }
    }

    const continuar_datos_riesgos = () => {
        if (riesgo_proyecto === '' || (1000  - riesgo_proyecto.length <= 0) || (1000 - mitigacion_riesgo.length <= 0)){
            setERiesgoProyecto(riesgo_proyecto === '' ? true : false)
        }else{
            setERiesgoProyecto(false)
            const data_riesgos = {
                id_proyecto: id,
                riesgo: riesgo_proyecto,
                mitigacion: mitigacion_riesgo,
                id_tarea: id_tarea,
                tarea: tarea
            }
            dispatch (set_data_gestion_riesgos(data_riesgos))
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_riesgos, false).new_riesgo_proyecto))
        }
    }

    const volver_datos_documentos = () => {
        const data_riesgos = {
            id_proyecto: id,
            riesgo: riesgo_proyecto,
            mitigacion: mitigacion_riesgo,
            id_tarea: id_tarea,
            tarea: tarea
        }
        dispatch (set_data_gestion_riesgos(data_riesgos))
        dispatch (set_datos_paso_gestion_proyectos('comunicaciones'))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <select 
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
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_documentos()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                    onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                    onClick={() => continuar_datos_riesgos()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Guardar datos
                    </p>
                </div>
            </div>
        </div>
    )
}
