import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants'

export default function TareasProyectoTablet({proporcional, proyecto}) {
    
    const dispatch = useDispatch()

    const [id_proyecto, setIdProyecto] = useState(proyecto.id)
    const [tarea, setTarea] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha_inicio, setFechaInicio] = useState('')
    const [fecha_finalizacion, setFechaFinalizacion] = useState('')
    const [estado, setEstado] = useState ('')
    const [dependencias, setDependencias] = useState('')

    const [lista_dependencias, setListaDependencias] = useState([])
    
    const [etarea, setETarea] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)

    const {new_actividad_proyecto, get_actividades_proyecto_filter} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', proyecto.id, 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
    }, [])

    useEffect(() => {
        if (get_actividades_proyecto_filter && get_actividades_proyecto_filter.success === true && get_actividades_proyecto_filter.tareas_proyecto){
            setListaDependencias(get_actividades_proyecto_filter.tareas_proyecto)
        }
    }, [get_actividades_proyecto_filter])

    useEffect(() => {
        if (new_actividad_proyecto && new_actividad_proyecto.success === true && new_actividad_proyecto.tarea_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_actividad_proyecto])

    const resetear_data = () => {
        setTarea('')
        setDescripcion('')
        setFechaInicio('')
        setFechaFinalizacion('')
        setEstado('')
        setDependencias('')
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', proyecto.id, 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
    }

    const seleccionar_dependencia = (value) => {
        if (value !== '0' && value !== '1'){
            setDependencias (value)
        }else if (value === '1'){
            setDependencias ('Ninguna')
        }
    }

    const guradar_tarea = () => {
        if (tarea === ''){
            setETarea(tarea === '' ? true : false)
        }else{
            setETarea(false)
            const data_tarea = {
                id_proyecto: proyecto.id,
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
        <div style={{width: '100%', height: 'auto', padding: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4a4a4a'}}>Nueva tarea: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                    </h2>
                </div>
            </div>
            <div style={{width: '100%', height: 'auto'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Nombre tarea
                    </span>
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
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Fecha inicio
                    </span>
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
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Fecha finalización
                    </span>
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
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Descripción del área
                    </span>
                    <textarea 
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
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Estado
                    </span>
                    <select
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
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guradar_tarea()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar tarea
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
