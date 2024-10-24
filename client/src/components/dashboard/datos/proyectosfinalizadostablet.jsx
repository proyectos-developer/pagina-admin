import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {proyectosdata} from '../../../redux/slice/proyectosdata'
import { proyectosConstants } from '../../../uri/proyectos-constants'
import {gestionproyectosdata} from '../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../uri/gestionproyectos-constants'
import { set_data_gestion_proyectos, set_data_proyecto } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

export default function ProyectosFinalizadosTablet ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [lista_proyectos_finalizados, setListaProyectosFinalizados] = useState([])
    const [lista_proyectos_ejecucion, setListaProyectosEjecucion] = useState([])

    const [overflow_finalizados, setOverflowFinalizados] = useState(false)
    const [overflow_ejecucion, setOverflowEjecucion] = useState(false)

    const [boton_finalizados, setBotonFinalizados] = useState(false)
    const [boton_ejecucion, setBotonEjecucion] = useState(false)

    const [select_finalizado, setSelectFinalizado] = useState('')
    const [select_ejecucion, setSelectEjecucion] = useState('')

    const {get_proyectos_filter, get_proyecto} = useSelector(({proyectos_data}) => proyectos_data)
    const {get_gestion_proyectos_filter, get_gestion_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_proyectos_filter && get_proyectos_filter.success === true && get_proyectos_filter.proyectos){
            setListaProyectosFinalizados(get_proyectos_filter.proyectos)
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_gestion_proyectos_filter))
        }
    }, [get_proyectos_filter])

    useEffect(() => {
        if (get_gestion_proyectos_filter && get_gestion_proyectos_filter.success === true && get_gestion_proyectos_filter.gestion_proyectos){
            setListaProyectosEjecucion(get_gestion_proyectos_filter.gestion_proyectos)
        }
    }, [get_gestion_proyectos_filter])

    useEffect(() => {
        if (get_proyecto && get_proyecto.success === true && get_proyecto.proyecto){
            dispatch (set_data_proyecto(get_proyecto.proyecto))
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 0, {}, true).get_proyecto))
            window.scrollTo(0,0)
            navigate (`/panel/proyectos/proyectos/proyecto/${get_proyecto.proyecto.nombre_proyecto}/${get_proyecto.proyecto.id}`)
        }
    }, [get_proyecto])

    const ver_proyecto_finalizado = (id) => {
        dispatch (proyectosdata(proyectosConstants(id, 0, 0, 0, 0, 0, 0, {}, false).get_proyecto))
    }

    const ver_lista_proyectos_finalizados = () => {
        window.scrollTo(0,0)
        navigate ('/panel/proyectos/proyectos')
    }

    useEffect(() => {
        if (get_gestion_proyecto && get_gestion_proyecto.success === true && get_gestion_proyecto.gestion_proyecto){
            dispatch (set_data_gestion_proyectos(get_gestion_proyecto.gestion_proyecto))
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 0, {}, true).get_gestion_proyecto))
            window.scrollTo(0,0)
            navigate (`/panel/proyectos/gestion-proyectos/proyecto/${get_gestion_proyecto.gestion_proyecto.nombre_proyecto}/${get_gestion_proyecto.gestion_proyecto.id}`)
        }
    }, [get_gestion_proyecto])
    
    const ver_proyectos_ejecucion = (id) => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(id, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_gestion_proyecto))
    }

    const ver_lista_proyectos_ejecucion = () => {
        window.scrollTo(0,0)
        navigate ('/panel/proyectos/gestion-proyectos')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '49%', height: 'auto', padding: 10 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16,
                        fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                        Proyectos finalizados
                    </h4>
                    <div className={overflow_finalizados ? 'overflow-auto' : 'overflow-hidden'} 
                        style={{width: '100%', height: 300 / proporcional, padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                        onMouseOver={() => setOverflowFinalizados(true)} onMouseLeave={() => setOverflowFinalizados(false)}>
                        {
                            lista_proyectos_finalizados && lista_proyectos_finalizados.length > 0 ? (
                                lista_proyectos_finalizados.map ((proyecto, index) => {
                                    return (
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}
                                            onMouseOver={() => setSelectFinalizado(proyecto.id)} onMouseLeave={() => setSelectFinalizado('')}
                                            onClick={() => ver_proyecto_finalizado(proyecto.id)}>
                                            <div className='d-flex justify-content-start' style={{width: '48%', height: 'auto'}}>
                                                <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                    marginBottom: select_finalizado === proyecto.id ? 16 / proporcional : 0, fontFamily: 'Poppins, sans-serif', fontWeight: select_finalizado === proyecto.id ? 600 : 400, cursor: 'pointer'}}>
                                                    <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                                    {proyecto.cliente}
                                                </p>
                                            </div>
                                            <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                                                <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                                    marginBottom: select_finalizado === proyecto.id ? 16 / proporcional : 0, fontFamily: 'Poppins, sans-serif', fontWeight: select_finalizado === proyecto.id ? 600 : 400, cursor: 'pointer'}}>
                                                    <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}></span>
                                                    {(new Date(proyecto.created_at)).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : null
                        }
                    </div>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_finalizados ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '80%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonFinalizados(true)} onMouseLeave={() => setBotonFinalizados(false)}
                            onClick={() => ver_lista_proyectos_finalizados()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver todos los proyectos finalizados
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{width: '2%', height: 360 / proporcional, paddingTop: 50 / proporcional}}>
                    <div style={{width: 2 / proporcional, height: 310 / proporcional, background: '#28A745'}}/>
                </div>
                <div className='' style={{width: '49%', height: 'auto', padding: 10 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16,
                        fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                        Proyectos en ejecución
                    </h4>
                    <div className={overflow_ejecucion ? 'overflow-auto' : 'overflow-hidden'} 
                        style={{width: '100%', height: 300 / proporcional, padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                        onMouseOver={() => setOverflowEjecucion(true)} onMouseLeave={() => setOverflowEjecucion(false)}>
                        {
                            lista_proyectos_ejecucion && lista_proyectos_ejecucion.length > 0 ? (
                                lista_proyectos_ejecucion.map ((proyecto, index) => {
                                    return (
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}
                                            onMouseOver={() => setSelectEjecucion(proyecto.id)} onMouseLeave={() => setSelectEjecucion('')}
                                            onClick={() => ver_proyectos_ejecucion(proyecto.id)}>
                                            <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto'}}>
                                                <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                    marginBottom: select_ejecucion === proyecto.id ? 16 / proporcional : 0, fontFamily: 'Poppins, sans-serif', fontWeight: select_ejecucion === proyecto.id ? 600 : 400, cursor: 'pointer'}}>
                                                    <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                                    {proyecto.nombre_proyecto}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : null
                        }
                    </div>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_ejecucion ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '80%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEjecucion(true)} onMouseLeave={() => setBotonEjecucion(false)}
                            onClick={() => ver_lista_proyectos_ejecucion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver todos los proyectos ejecución
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
