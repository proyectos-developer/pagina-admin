import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_gestion_tareas, set_datos_paso_gestion_proyectos}  from '../../../../../redux/actions/data'
import { negociosdata } from '../../../../../redux/slice/negociosdata'
import { negociosConstants } from '../../../../../uri/negocios-constants'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'

export default function DatosTareasProyecto ({proporcional, id}) {

    const dispatch = useDispatch()

    const selectRefEstado = useRef(null)
    const selectRefTarea = useRef(null)

    const id_proyecto = id
    const [tarea, setTarea] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha_inicio, setFechaInicio] = useState('')
    const [fecha_finalizacion, setFechaFinalizacion] = useState('')
    const [estado, setEstado] = useState ('')
    const [dependencias, setDependencias] = useState('')

    const [lista_dependencias, setListaDependencias] = useState([])
    
    const [etarea, setETarea] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {data_gestion_tareas} = useSelector(({data_actions}) => data_actions)
    const {get_tareas_proyectos_filter} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        if (data_gestion_tareas && data_gestion_tareas.tarea){
            setTarea(data_gestion_tareas.tarea)
            setDescripcion(data_gestion_tareas.descripcion)
            setFechaInicio(data_gestion_tareas.fecha_inicio)
            setFechaFinalizacion(data_gestion_tareas.fecha_finalizacion)
            setEstado(data_gestion_tareas.estado)
            setDependencias(data_gestion_tareas.dependencia)
        }else{
            setTarea('')
            setDescripcion('')
            setFechaInicio('')
            setFechaFinalizacion('')
            setEstado('')
            setDependencias('')
            selectRefEstado.current !== null ? selectRefEstado.current.value = '0' : null
            selectRefTarea.current !== null ? selectRefTarea.current.value = '0' : null
        }
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_tareas_proyectos_filter && get_tareas_proyectos_filter.success === true && get_tareas_proyectos_filter.tarea_proyectos){
            setListaDependencias(get_tareas_proyectos_filter.tarea_proyectos)
            dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, true).get_tareas_proyectos_filter))
        }
    }, [get_tareas_proyectos_filter])

    const seleccionar_dependencia = (value) => {
        if (value !== '0' && value !== '1'){
            setDependencias (value)
        }else if (value === '1'){
            setDependencias ('Ninguna')
        }
    }

    const continuar_datos_equipo = () => {
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
            dispatch (set_data_gestion_tareas(data_tarea))
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_tarea, false).new_tarea_proyecto))      
        }
    }

    const volver_datos_gestion = () => {
        const data_tarea = {
            id_proyecto: id_proyecto,
            tarea: tarea,
            descripcion: descripcion,
            fecha_inicio: fecha_inicio,
            fecha_finalizacion: fecha_finalizacion,
            estado: estado,
            dependencias: dependencias
        }
        dispatch (set_data_gestion_tareas(data_tarea))
        dispatch (set_datos_paso_gestion_proyectos('gestion'))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input
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
                        <input
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
                        <input
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
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
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
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
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
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_datos_gestion()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Volver
                        </p>
                    </div>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => continuar_datos_equipo()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar datos
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
