import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../redux/slice/gestionproyectosdata.js'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants.js'

import CardTrabajador from '../card/trabajador.jsx'
import axios from 'axios'
import { constantes } from '../../../../uri/constantes.js'
import {trabajadoresdata} from '../../../../redux/slice/trabajadoresdata.js'
import { trabajadoresConstants } from '../../../../uri/trabajadores-constants.js'

import search_select from '../../../../assets/iconos/menu/superior/search_v1.png'
import search from '../../../../assets/iconos/menu/superior/search_v2.png'

export default function DetallesTrabajadorProyecto({proporcional, proyecto}) {

    const dispatch = useDispatch()

    const [id_proyecto, setIdProyecto] = useState(proyecto.id)
    const [id_tarea, setIdTarea] = useState('')
    const [tarea, setTarea] = useState('')
    const [disponibilidad, setDisponibilidad] = useState('')
    const [rol_asignado, setRolAsignado] = useState('')
    const [id_trabajador, setIdTrabajador] = useState('')
    const [data_trabajador, setDataTrabajador] = useState('')
    const [search_trabajador, setSearchTrabajador] = useState('')
    
    const [etarea, setETarea] = useState(false)
    const [etrabajador, setEtrabajador] = useState(false)

    const [lista_tareas, setListaTareas] = useState([])
    const [lista_equipo, setListaEquipo] = useState([])
    const [lista_trabajadores, setListaTrabajadores] = useState([])

    const [boton_search, setBotonSearch] = useState(false)

    const [nuevo_trabajador, setNuevoTrabajador] = useState (false)
    const [editar_informacion, setEditarInformacion] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)
    const [boton_nuevo_trabajador, setBotonNuevoTrabajador] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const {new_trabajador_proyecto, update_trabajador_proyecto, 
        get_trabajadores_proyecto_filter, get_trabajador_proyecto,
        get_actividades_proyecto_filter} = 
            useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {get_trabajadores_filter} = useSelector(({trabajadores_data}) => trabajadores_data)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', proyecto.id, 0, 0, 0, 0, 100, {}, false).get_trabajadores_proyecto_filter))
    }, [])

    useEffect(() => {
        if (get_trabajadores_proyecto_filter && get_trabajadores_proyecto_filter.success === true && get_trabajadores_proyecto_filter.trabajadores_proyecto){
            setListaEquipo(get_trabajadores_proyecto_filter.trabajadores_proyecto)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_trabajador_proyecto))
        }
    }, [get_trabajadores_proyecto_filter])

    const resetear_data = () => {
        setIdTarea('')
        setTarea('')
        setRolAsignado('')
        setIdTrabajador('')
        setDisponibilidad('')
        setEditarInformacion (false)
        setNuevoTrabajador(false)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', proyecto.id, 0, 0, 0, 0, 100, {}, false).get_trabajadores_proyecto_filter))
    }

    const agregar_nuevo_trabajador = () => {
        setIdTarea('')
        setTarea('')
        setRolAsignado('')
        setIdTrabajador('')
        setDisponibilidad('')
        setEditarInformacion(true)
        setNuevoTrabajador (true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_trabajador_proyecto))
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', proyecto.id, 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
    }

    useEffect(() => {
        if (get_trabajador_proyecto && get_trabajador_proyecto.success === true && get_trabajador_proyecto.trabajador_proyecto){
            setIdTrabajador(get_trabajador_proyecto.trabajador_proyecto.id_trabajador)
            setIdTarea(get_trabajador_proyecto.trabajador_proyecto.id_tarea)
            setRolAsignado(get_trabajador_proyecto.trabajador_proyecto.rol_asignado)
            setDisponibilidad(get_trabajador_proyecto.trabajador_proyecto.disponibilidad)
            axios.get(`${constantes().url_principal[0].url}/gestion/actividad/proyecto/${get_trabajador_proyecto.trabajador_proyecto.id_tarea}`)
                .then ((res) => {
                    setTarea(res.data.tarea_proyecto.tarea)
                }).catch ((err) => {

                })
        }
    }, [get_trabajador_proyecto])

    useEffect(() => {
        if (get_actividades_proyecto_filter && get_actividades_proyecto_filter.success === true && get_actividades_proyecto_filter.tareas_proyecto){
            setListaTareas(get_actividades_proyecto_filter.tareas_proyecto)
        }
    }, [get_actividades_proyecto_filter])

    useEffect(() => {
        if (update_trabajador_proyecto && update_trabajador_proyecto.success === true && update_trabajador_proyecto.trabajador_proyecto){
            window.scrollTo(0, 0)
            setEditarInformacion (false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', proyecto.id, 0, 0, 0, 0, 100, {}, false).get_trabajadores_proyecto_filter))
        }
    }, [update_trabajador_proyecto])

    useEffect(() => {
        if (new_trabajador_proyecto && new_trabajador_proyecto.success === true && new_trabajador_proyecto.trabajador_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_trabajador_proyecto])

    const buscar_trabajadores = () => {
        if (search_trabajador !== ''){
            dispatch(trabajadoresdata(trabajadoresConstants(0, search_trabajador, 0, 0, 0, 0, 0, 100, {}, false).get_trabajadores_filter))
        }
    }

    useEffect(() => {
        if (get_trabajadores_filter && get_trabajadores_filter.success === true && get_trabajadores_filter.trabajadores){
            setListaTrabajadores(get_trabajadores_filter.trabajadores)
        }
    }, [get_trabajadores_filter])

    const seleccionar_tarea = (value) => {
        if (value !== '0'){
            setIdTarea (value.split('-')[0])
            setTarea(value.split('-')[1])
        }
    }

    const seleccionar_trabajador = (value) => {
        if (value !== '0'){
            setIdTrabajador(value.split('*')[0])
            setDataTrabajador(value.split('*')[1].replace('-', ' '))
        }
    }

    const actualizar_trabajador = () => {
        if (tarea === '' && id_trabajador === ''){
            setETarea(tarea === '' ? true : false)
            setEtrabajador(id_trabajador === '' ? true : false)
        }else{
            setETarea(false)
            setEtrabajador(false)
            const data_trabajador = {
                id_proyecto: proyecto.id,
                id_trabajador: id_trabajador,
                id_tarea: id_tarea,
                rol_asignado: rol_asignado,
                disponibilidad: disponibilidad
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_trabajador, proyecto.id, 0, 0, 0, 0, 0, 0, 0, data_trabajador, false).update_trabajador_proyecto))
        }
    }

    const habilitar_campos_informacion = () => {
        setEditarInformacion(true)
        window.scrollTo(0, 0)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', proyecto.id, 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
    }

    const guardar_datos = () => {
        if (tarea === ''){
            setETarea(tarea === '' ? true : false)
        }else{
            setETarea(false)
            const data_trabajador = {
                id_proyecto: proyecto.id,
                id_trabajador: id_trabajador,
                id_tarea: id_tarea,
                rol_asignado: rol_asignado,
                disponibilidad: disponibilidad
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_trabajador, false).new_trabajador_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 50 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div style={{width: '23%', height: 'auto'}}>
                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: '#4a4a4a'}}>Miembros del equipo: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                        </h2>
                    </div>
                    <div className='' style={{width: '100%', height: '77%', marginBottom: 16 / proporcional}}>
                        {
                            lista_equipo && lista_equipo.length > 0 ? (
                                lista_equipo.map ((trabajador, index) => {
                                    return (
                                        <CardTrabajador proporcional={proporcional} key={index} index={index} trabajador={trabajador}/>
                                    )
                                })
                            ) : null
                        }
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => agregar_nuevo_trabajador()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Nuevo miembro
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{width: '73%', height: 'auto'}}>
                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: '#4a4a4a'}}>Tarea: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
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
                                        lista_tareas && lista_tareas.length > 0 ? (
                                            lista_tareas.map ((tarea, index) => {
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
                    {
                        nuevo_trabajador ? (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Trabajador
                                    </span>
                                    <div className='d-flex justify-content-between rounded' style={{width: '100%', height: 50 / proporcional,
                                        border: etrabajador ? '1px solid red' : '1px solid #007BFF'}}>
                                        <input
                                            type='default' 
                                            id='search_trabajador'
                                            value={search_trabajador}
                                            className='form-control rounded border-0'
                                            onChange={(event) => setSearchTrabajador (event.target.value)}
                                            style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                            placeholder='Buscar por nombre o área de empresa'/>
                                        <img src={boton_search ? search_select : search}
                                            style={{width: 50 / proporcional, height: 50 / proporcional,
                                                padding: 15 / proporcional}}
                                            onMouseOver={() => setBotonSearch(true)} onMouseLeave={() => setBotonSearch(false)}
                                            onClick={() => buscar_trabajadores()}/>
                                    </div>
                                </div>
                                {
                                    lista_trabajadores && lista_trabajadores.length > 0 ? (
                                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif'}}>
                                                Nombre trabajador
                                            </span>
                                            <select
                                                type='default' 
                                                id='trabajador'
                                                className='form-select rounded'
                                                onChange={(event) => seleccionar_trabajador (event.target.value)}
                                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', border: etarea ? '1px solid red' : '1px solid #007BFF',
                                                        padding: 10 / proporcional}}>
                                                <option value='0'>{data_trabajador === '' ? 'Seleccionar trabajador' : data_trabajador}</option>
                                                {
                                                    lista_trabajadores && lista_trabajadores.length > 0 ? (
                                                        lista_trabajadores.map ((trabajador, index) => {
                                                            return (
                                                                <option key={index} value={trabajador.id + '*' + trabajador.nombres + '-' + trabajador.apellidos}>
                                                                    {trabajador.nombres} {trabajador.apellidos}
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
                        ) : null
                    }
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Rol asignado
                            </span>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                id='rol_asignado'
                                value={rol_asignado}
                                className='form-control rounded'
                                onChange={(event) => setRolAsignado (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Rol asignado'/>
                        </div>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Disponibilidad
                            </span>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                id='disponibilidad'
                                value={disponibilidad}
                                className='form-control rounded'
                                onChange={(event) => setDisponibilidad (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Disponibilidad'/>
                        </div>
                    </div>
                    {
                        !nuevo_trabajador && editar_informacion ? (
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
                                    onClick={() => actualizar_trabajador()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : !nuevo_trabajador && !editar_informacion ? (
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
                                    onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0); setNuevoTrabajador(false)}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_nuevo_trabajador ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonNuevoTrabajador(true)} onMouseLeave={() => setBotonNuevoTrabajador(false)}
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
            </div>
        </div>
    )
}
