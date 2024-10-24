import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_gestion_equipo, set_datos_paso_gestion_proyectos,
    set_error_message
}  from '../../../../../redux/actions/data'
import { negociosdata } from '../../../../../redux/slice/negociosdata'
import { negociosConstants } from '../../../../../uri/negocios-constants'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { personaldata } from '../../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../../uri/personal-constants'
import { useNavigate } from 'react-router-dom'

export default function DatosEquipoProyecto ({proporcional, id}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectRefTarea = useRef(null)

    const id_proyecto = id
    const [id_trabajador, setIdTrabajador] = useState('')
    const [nombres_trabajador, setNombresTrabajador] = useState('')
    const [search_trabajador, setSearchTrabajador] = useState('')
    const [rol_asignado, setRolAsignado] = useState('')
    const [id_tarea, setIdTarea] = useState('')
    const [nombre_tarea, setNombreTarea] = useState ('')
    const [disponibilidad, setDisponibilidad] = useState('')
    const [fecha_inicio, setFechaInicio] = useState('')
    const [fecha_finalizacion, setFechaFinalizacion] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const [lista_personal, setListaPersonal] = useState([])
    const [lista_tareas, setListaTareas] = useState([])
    
    const [enombres_trabajador, setENombresTrabajador] = useState(false)
    const [enombre_tarea, setENombreTarea] = useState(false)
    const [erol_asignado, setERolAsignado] = useState(false)
    const [efecha_inicio, setEFechaInicio] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {data_gestion_equipo, datos_paso_gestion_proyectos} = useSelector(({data_actions}) => data_actions)
    const {get_tareas_proyectos_filter, new_equipo_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        if (data_gestion_equipo && data_gestion_equipo.nombres_trabajador){
            setIdTrabajador(data_gestion_equipo.id_trabajador)
            setNombresTrabajador(data_gestion_equipo.nombres_trabajador)
            setSearchTrabajador(data_gestion_equipo.nombres_trabajador)
            setRolAsignado(data_gestion_equipo.rol_asignado)
            setIdTarea(data_gestion_equipo.id_tarea)
            setNombreTarea(data_gestion_equipo.nombre_tarea)
            setDisponibilidad(data_gestion_equipo.disponibilidad)
        }else{
            setIdTrabajador('')
            setNombresTrabajador('')
            setSearchTrabajador('')
            setRolAsignado('')
            setIdTarea('')
            setNombreTarea('')
            setDisponibilidad('')
            selectRefTarea.current !== null ? selectRefTarea.current.value = '0' : null
        }
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }, [])

    useEffect(() => {
        if (datos_paso_gestion_proyectos === 'guardado'){
            setIdTrabajador('')
            setNombresTrabajador('')
            setSearchTrabajador('')
            setRolAsignado('')
            setIdTarea('')
            setNombreTarea('')
            setDisponibilidad('')
        }
    }, [datos_paso_gestion_proyectos])

    useEffect(() => {
        if (get_tareas_proyectos_filter && get_tareas_proyectos_filter.success === true && get_tareas_proyectos_filter.tareas_proyecto){
            setListaTareas(get_tareas_proyectos_filter.tareas_proyecto)
            dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, true).get_tareas_proyectos_filter))
        }else if (get_tareas_proyectos_filter && get_tareas_proyectos_filter.success === false && get_tareas_proyectos_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_tareas_proyectos_filter])

    const buscar_trabajador = (value) => {
        setSearchTrabajador(value)
        if (value !== ''){
            dispatch (personaldata(personalConstants(0, value, 0, 0, 0, 0, 0, 20, {}, false).get_personal_filter))
        }else{
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_personal_filter))
        }
    }

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            setListaPersonal(get_personal_filter.personal)
        }else if (get_personal_filter && get_personal_filter.success === false && get_personal_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_personal_filter])

    const seleccionar_trabajador = (value) => {
        if (value !== '0'){
            setIdTrabajador (value.split('*')[0])
            setNombresTrabajador (value.split('*')[1].replace('-' + ' '))
        }
    }

    const seleccionar_tarea = (value) => {
        if (value !== '0'){
            setIdTarea (value.split('-')[0])
            setNombreTarea (value.split('-')[1])
        }
    }

    const continuar_datos_documentos = () => {
        if (nombres_trabajador === '' && nombre_tarea === '' && rol_asignado === '' || fecha_inicio === '' || 
            (500 - descripcion.length <= 0)
        ){
            setENombresTrabajador(nombres_trabajador === '' ? true : false)
            setENombreTarea(nombre_tarea === '' ? true : false)
            setERolAsignado(rol_asignado === '' ? true : false)
            setEFechaInicio(fecha_inicio === '' ? true : false)
        }else{
            setENombresTrabajador(false)
            setENombreTarea(false)
            setERolAsignado(false)
            setEFechaInicio(false)
            const data_equipo = {
                id_proyecto: id_proyecto,
                id_tarea: id_tarea,
                id_trabajador: id_trabajador,
                rol_asignado: rol_asignado,
                fecha_inicio: fecha_inicio,
                fecha_finalizacion: fecha_finalizacion,
                descripcion: descripcion,
                disponibilidad: disponibilidad
            }
            dispatch (set_data_gestion_equipo(data_equipo))
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_equipo, false).new_equipo_proyecto))      
        }
    }

    useEffect(() => {
        if (new_equipo_proyecto && new_equipo_proyecto.success === true && new_equipo_proyecto.equipo_proyecto){

        }else if (new_equipo_proyecto && new_equipo_proyecto.success === false && new_equipo_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [new_equipo_proyecto])

    const volver_lista_proyectos = () => {
        dispatch (set_datos_paso_gestion_proyectos('guardado'))
        navigate ('/panel/proyectos/gestion-proyectos')
    }

    const continuar_sin_guardar = () => {
        dispatch (set_datos_paso_gestion_proyectos('documentos'))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Buscar trabajador</strong></span>
                        <input
                            type='default' 
                            value={search_trabajador}
                            className='form-control rounded'
                            onChange={(event) => buscar_trabajador (event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', 
                                    padding: 10 / proporcional, border: '1px solid #007bff'}}
                            placeholder='Buscar trabajador'/>
                    </div>
                    {
                        lista_personal && lista_personal.length > 0 ? (
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Seleccionar trabajador</strong></span>
                                <select
                                    type='default' 
                                    id='trabajador'
                                    className='form-select rounded'
                                    onChange={(event) => seleccionar_trabajador (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enombres_trabajador ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{nombres_trabajador === '' ? 'Seleccionar trabajador' : nombres_trabajador}</option>
                                    {
                                        lista_personal && lista_personal.length > 0 ? (
                                            lista_personal.map ((trabajador, index) => {
                                                return (
                                                    <option key={index} value={trabajador.id + '*' + trabajador.nombres + '-' + trabajador.apellidos}>
                                                        {trabajador.nombres + trabajador.apellidos}
                                                    </option>
                                                )
                                            })
                                        ) : null
                                    }
                                </select>
                            </div>
                        ) : null
                    }
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Seleccionar tarea</strong></span>
                        <select
                            ref={selectRefTarea}
                            type='default' 
                            id='nombre_tarea'
                            value={nombre_tarea}
                            className='form-select rounded'
                            onChange={(event) => seleccionar_tarea (event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
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
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Rol asignado</strong></span>
                        <input 
                            id='rol_asignado'
                            type='default'
                            className='form-control rounded'
                            value={rol_asignado}
                            onChange={(event) => setRolAsignado(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: erol_asignado ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Rol asignado'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Fecha inicio</strong></span>
                        <input
                            type='date' 
                            id='fecha_inicio'
                            value={fecha_inicio}
                            className='form-control rounded'
                            onChange={(event) => setFechaInicio (event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: efecha_inicio ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Fecha inicio'/>
                    </div>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Fecha finalización</strong></span>
                        <input
                            type='date' 
                            id='fecha_finalizacion'
                            value={fecha_finalizacion}
                            className='form-control rounded'
                            onChange={(event) => setFechaFinalizacion (event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Fecha finalización'/>
                    </div>
                </div>
                <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Descripción de funciones</strong></span>
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
                        placeholder='Descripción de de funciones'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                    </div>
                </div>
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Disponibilidad</strong></span>
                    <input 
                        id='disponibilidad'
                        type='default'
                        className='form-control rounded'
                        value={disponibilidad}
                        onChange={(event) => setDisponibilidad(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Disponibilidad'/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => continuar_datos_documentos()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar datos
                        </p>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_lista_proyectos()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Volver a lista proyectos
                        </p>
                    </div>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => continuar_sin_guardar()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Continuar sin guardar (documentos)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
