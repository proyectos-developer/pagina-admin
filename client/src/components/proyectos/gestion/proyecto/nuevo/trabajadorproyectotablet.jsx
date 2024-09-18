import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import {personaldata} from '../../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../../uri/personal-constants'

import search_select from '../../../../../assets/iconos/menu/superior/search_v1.png'
import search from '../../../../../assets/iconos/menu/superior/search_v2.png'
import { useLocation } from 'react-router-dom'

export default function TrabajadorProyectoTablet({proporcional}) {

    const location = useLocation()
    const dispatch = useDispatch()

    const [id_proyecto, setIdProyecto] = useState(location.pathname.split('/')[6])
    const [id_trabajador, setIdTrabajador] = useState('')
    const [nombres_trabajador, setNombresTrabajador] = useState('')
    const [search_trabajador, setSearchTrabajador] = useState('')
    const [rol_asignado, setRolAsignado] = useState('')
    const [id_tarea, setIdTarea] = useState('')
    const [nombre_tarea, setNombreTarea] = useState ('')
    const [disponibilidad, setDisponibilidad] = useState('')

    const [lista_personal, setListaPersonal] = useState([])
    const [lista_tareas, setListaTareas] = useState([])
    
    const [enombres_trabajador, setENombresTrabajador] = useState(false)
    const [enombre_tarea, setENombreTarea] = useState(false)
    const [erol_asignado, setERolAsignado] = useState(false)

    const [boton_search, setBotonSearch] = useState (false)
    const [boton_guardar, setBotonGuardar] = useState(false)

    const {new_trabajador_proyecto, get_actividades_proyecto_filter} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_actividades_proyecto_filter))
    }, [])

    useEffect(() => {
        if (get_actividades_proyecto_filter && get_actividades_proyecto_filter.success === true && get_actividades_proyecto_filter.tareas_proyecto){
            setListaTareas(get_actividades_proyecto_filter.tareas_proyecto)
        }
    }, [get_actividades_proyecto_filter])

    const buscar_trabajador = () => {
        if (search_trabajador !== ''){
            dispatch (personaldata(personalConstants(0, search_trabajador, 0, 0, 0, 0, 0, 20, {}, false).get_personal_filter))
        }else{
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_personal_filter))
        }
    }

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            setListaPersonal(get_personal_filter.personal)
        }
    }, [get_personal_filter])


    useEffect(() => {
        if (new_trabajador_proyecto && new_trabajador_proyecto.success === true && new_trabajador_proyecto.trabajador_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_trabajador_proyecto])

    const resetear_data = () => {
        setIdTarea('')
        setIdTrabajador('')
        setRolAsignado('')
        setDisponibilidad('')
        dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
    }

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

    const guardar_trabajador = () => {
        if (nombres_trabajador === '' && nombre_tarea === '' && rol_asignado === ''){
            setENombresTrabajador(nombres_trabajador === '' ? true : false)
            setENombreTarea(nombre_tarea === '' ? true : false)
            setERolAsignado(rol_asignado === '' ? true : false)
        }else{
            setENombresTrabajador(false)
            setENombreTarea(false)
            setERolAsignado(false)
            const data_trabajador = {
                id_proyecto: location.pathname.split('/')[6],
                id_tarea: id_tarea,
                id_trabajador: id_trabajador,
                rol_asignado: rol_asignado,
                disponibilidad: disponibilidad,
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_trabajador, false).new_trabajador_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4a4a4a'}}>Nuevo miembro: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                    </h2>
                </div>
            </div>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Buscar trabajador
                        </span>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                border: '1px solid #007BFF'
                        }}>
                            <input
                                type='default' 
                                value={search_trabajador}
                                className='form-control rounded border-0'
                                onChange={(event) => setSearchTrabajador (event.target.value)}
                                style={{width: '90%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', 
                                        padding: 10 / proporcional}}
                                placeholder='Buscar trabajador'/>
                            <div className='d-flex justify-content-center' 
                                style={{width: '10%', height: 50 / proporcional}}>
                                <img src={boton_search ? search_select : search} style={{width: 50 / proporcional,
                                    height: 50 / proporcional, padding: 15 / proporcional}}
                                    onMouseOver={() => setBotonSearch(true)} onMouseLeave={() => setBotonSearch(false)}
                                    onClick={() => buscar_trabajador()}/>
                            </div>
                        </div>
                    </div>
                    {
                        lista_personal && lista_personal.length > 0 ? (
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Trabajador
                                </span>
                                <select
                                    type='default' 
                                    id='trabajador'
                                    value={nombres_trabajador}
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
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Tarea asignada
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
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Rol asignado
                        </span>
                        <input 
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
                    {/**<div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                    </div>**/}
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Disponibilidad
                    </span>
                    <input 
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
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_trabajador()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar trabajador
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
