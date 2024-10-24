import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CardTrabajadorTablet from './card/trabajadortablet.jsx'

import { negociosdata } from '../../../../../redux/slice/negociosdata'
import { negociosConstants } from '../../../../../uri/negocios-constants'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { personaldata } from '../../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../../uri/personal-constants'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { constantes } from '../../../../../uri/constantes.js'
import { set_datos_paso_gestion_proyectos } from '../../../../../redux/actions/data.js'

export default function DatosEquipoProyectoTablet ({proporcional}) {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectRefTarea = useRef(null)

    const id_proyecto = location.pathname.split ('/')[6]
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

    const [lista_equipos_proyecto, setListaEquiposProyecto] = useState([])
    const [lista_personal, setListaPersonal] = useState([])
    const [lista_tareas, setListaTareas] = useState([])
    
    const [enombres_trabajador, setENombresTrabajador] = useState(false)
    const [enombre_tarea, setENombreTarea] = useState(false)
    const [erol_asignado, setERolAsignado] = useState(false)
    const [efecha_inicio, setEFechaInicio] = useState(false)

    const [nuevo_equipo, setNuevoEquipo] = useState(false)

    const [boton_cancelar_edicion, setBotonCancelarEdicion] = useState(false)
    const [boton_actualizar, setBotonActaulizar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)

    const {data_editable} = useSelector(({data_actions}) => data_actions)
    const {get_tareas_proyectos_filter, get_trabajador_equipo_proyecto, update_equipo_proyecto, new_equipo_proyecto,
            get_equipos_proyectos_filter } = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_equipos_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_equipos_proyectos_filter && get_equipos_proyectos_filter.success === true && get_equipos_proyectos_filter.equipo_proyectos){
            setListaEquiposProyecto(get_equipos_proyectos_filter.equipo_proyectos)
        }
    }, [get_equipos_proyectos_filter])

    useEffect(() => {
        if (get_trabajador_equipo_proyecto && get_trabajador_equipo_proyecto.success === true && get_trabajador_equipo_proyecto.equipo_proyecto){
            setIdTrabajador(get_trabajador_equipo_proyecto.equipo_proyecto.id_trabajador)
            setRolAsignado(get_trabajador_equipo_proyecto.equipo_proyecto.rol_asignado)
            setIdTarea(get_trabajador_equipo_proyecto.equipo_proyecto.id_tarea)
            setDisponibilidad(get_trabajador_equipo_proyecto.equipo_proyecto.disponibilidad)
            setFechaInicio(get_trabajador_equipo_proyecto.equipo_proyecto.fecha_inicio)
            setFechaFinalizacion(get_trabajador_equipo_proyecto.equipo_proyecto.fecha_finalizacion)
            setDescripcion(get_trabajador_equipo_proyecto.equipo_proyecto.descripcion)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_trabajador_equipo_proyecto))
            obtener_tarea_trabajador (get_trabajador_equipo_proyecto.equipo_proyecto.id_tarea, get_trabajador_equipo_proyecto.equipo_proyecto.id_trabajador)
        }
    }, [get_trabajador_equipo_proyecto])

    useEffect(() => {
        if (update_equipo_proyecto && update_equipo_proyecto.success === true && update_equipo_proyecto.equipo_proyecto){
            setIdTrabajador(update_equipo_proyecto.equipo_proyecto.id_trabajador)
            setRolAsignado(update_equipo_proyecto.equipo_proyecto.rol_asignado)
            setIdTarea(update_equipo_proyecto.equipo_proyecto.id_tarea)
            setDisponibilidad(update_equipo_proyecto.equipo_proyecto.disponibilidad)
            setFechaInicio(update_equipo_proyecto.equipo_proyecto.fecha_inicio)
            setFechaFinalizacion(update_equipo_proyecto.equipo_proyecto.fecha_finalizacion)
            setDescripcion(update_equipo_proyecto.equipo_proyecto.descripcion)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_equipo_proyecto))
            obtener_tarea_trabajador (update_equipo_proyecto.equipo_proyecto.id_tarea, update_equipo_proyecto.equipo_proyecto.id_trabajador)
        }
    }, [update_equipo_proyecto])

    useEffect(() => {
        if (new_equipo_proyecto && new_equipo_proyecto.success === true && new_equipo_proyecto.equipo_proyecto){
            setEditarInformacion(false)
            setNuevoEquipo(false)
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_trabajador_equipo_proyecto))
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_equipos_proyectos_filter))
        }
    }, [new_equipo_proyecto])

    const obtener_tarea_trabajador = (tarea_id, trabajador_id) => {
        axios.get (`${constantes().url_principal[0].url}/personal/${trabajador_id}`)
            .then ((res) => {
                setNombresTrabajador(res.data.trabajador.nombres + ' ' + res.data.trabajador.apellidos)
                setSearchTrabajador(res.data.trabajador.nombres + ' ' + res.data.trabajador.apellidos)
                axios.get (`${constantes().url_principal[0].url}/gestion/tarea/proyecto/${tarea_id}`)
                    .then ((res) => {
                        setNombreTarea(res.data.tarea_proyecto.tarea)
                    }).catch ((err) => {
                        
                    })
            }).catch ((err) => {

            })
    }

    useEffect(() => {
        if (get_tareas_proyectos_filter && get_tareas_proyectos_filter.success === true && get_tareas_proyectos_filter.tareas_proyecto){
            setListaTareas(get_tareas_proyectos_filter.tareas_proyecto)
            dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, true).get_tareas_proyectos_filter))
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

    const agregar_nuevo_equipo = () => {
        setIdTrabajador('')
        setNombresTrabajador('')
        setSearchTrabajador('')
        setRolAsignado('')
        setIdTarea('')
        setNombreTarea('')
        setDisponibilidad('')
        setFechaInicio('')
        setFechaFinalizacion('')
        setDescripcion('')
        setEditarInformacion(true)
        setNuevoEquipo(true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
    }

    const guardar_nuevo_equipo = () => {
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
                id_proyecto: parseInt(id_proyecto),
                id_tarea: id_tarea,
                id_trabajador: parseInt(id_trabajador),
                rol_asignado: rol_asignado,
                fecha_inicio: fecha_inicio,
                fecha_finalizacion: fecha_finalizacion,
                descripcion: descripcion,
                disponibilidad: disponibilidad
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_equipo, false).new_equipo_proyecto))      
        }
    }

    const actualizar_datos_equipo = () => {
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
            dispatch (gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, data_equipo, false).update_equipo_proyecto))      
        }
    }

    const cancelar_edicion_equipo = () => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(id_proyecto, id_trabajador, 0, 0, 0, 0, 0, 0, 0, {}, false).get_trabajador_equipo_proyecto))
    }

    const volver_a_lista = () => {
        dispatch (set_datos_paso_gestion_proyectos('gestion'))
        navigate ('/panel/proyectos/gestion-proyectos')
    }

    const editar_informacion_equipo = () => {
        setEditarInformacion(true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_tareas_proyectos_filter))
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
                            lista_equipos_proyecto && lista_equipos_proyecto.length > 0 ? (
                                lista_equipos_proyecto.map ((equipo, index) => {
                                    return (
                                        <CardTrabajadorTablet proporcional={proporcional} equipo={equipo} key={index} index={index}/>
                                    )
                                })
                            ) : (
                                <div className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}>
                                    <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>Aún no a agregado miembros al equipo</p>
                                </div>
                            )
                        }
                    </div>
                    <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                        onClick={() => agregar_nuevo_equipo()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nuevo miembro
                        </p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', border: '1px solid #007bff', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                value={search_trabajador}
                                className='form-control rounded border-0'
                                onChange={(event) => buscar_trabajador (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', 
                                        padding: 10 / proporcional}}
                                placeholder='Buscar trabajador'/>
                        </div>
                        {
                            lista_personal && lista_personal.length > 0 ? (
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <select
                                        disabled={!editar_informacion}
                                        type='default' 
                                        id='trabajador'
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_trabajador (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: enombres_trabajador ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{nombres_trabajador === '' ? 'Seleccionar trabajador' : nombres_trabajador}</option>
                                        {
                                            lista_personal && lista_personal.length > 0 ? (
                                                lista_personal.map ((trabajador, index) => {
                                                    return (
                                                        <option key={index} value={trabajador.id + '*' + trabajador.nombres + '-' + trabajador.apellidos}>
                                                            {trabajador.nombres + ' ' + trabajador.apellidos}
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
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion} 
                                id='rol_asignado'
                                type='default'
                                className='form-control rounded'
                                value={rol_asignado}
                                onChange={(event) => setRolAsignado(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: erol_asignado ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Rol asignado'/>
                        </div>
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
                                        fontFamily: 'Poppins, sans-serif', border: efecha_inicio ? '1px solid red' : '1px solid #007BFF',
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
                            placeholder='Descripción de de funciones'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                        </div>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='disponibilidad'
                            type='default'
                            className='form-control rounded'
                            value={disponibilidad}
                            onChange={(event) => setDisponibilidad(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Disponibilidad'/>
                    </div>
                    {
                        editar_informacion && !nuevo_equipo ? ( 
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_edicion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelarEdicion(true)} onMouseLeave={() => setBotonCancelarEdicion(false)}
                                    onClick={() => cancelar_edicion_equipo()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActaulizar(true)} onMouseLeave={() => setBotonActaulizar(false)}
                                    onClick={() => actualizar_datos_equipo()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : !editar_informacion && !nuevo_equipo ? (
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
                                    onClick={() => lista_equipos_proyecto && lista_equipos_proyecto.length > 0 ? editar_informacion_equipo() : null}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Editar
                                    </p>
                                </div>
                            </div>
                        ) : nuevo_equipo ? (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelarNuevo(true)} onMouseLeave={() => setBotonCancelarNuevo(false)}
                                    onClick={() => {setEditarInformacion(false); setNuevoEquipo(false)}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                                    onClick={() => guardar_nuevo_equipo()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Guardar miembro
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
