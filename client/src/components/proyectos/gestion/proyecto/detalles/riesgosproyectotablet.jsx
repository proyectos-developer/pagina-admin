import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata.js'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants.js'

import { useLocation } from 'react-router-dom'

import CardRiesgoTablet from '../card/riesgotablet.jsx'

export default function DetallesRiesgosProyectoTablet({proporcional}) {

    const location = useLocation()
    const dispatch = useDispatch()

    const [id_riesgo, setIdRiesgo] = useState('')
    const [riesgo, setRiesgo] = useState('')
    const [mitigacion, setMitigacion] = useState('')
    
    const [eriesgo, setERiesgo] = useState(false)
    const [emitigacion, setEMitigacion] = useState(false)

    const [lista_riesgos, setListaRiesgos] = useState([])

    const [nuevo_riesgo, setNuevoRiesgo] = useState (false)
    const [editar_informacion, setEditarInformacion] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)
    const [boton_nuevo_trabajador, setBotonNuevoTrabajador] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const {new_riesgo_proyecto, update_riesgo_proyecto, 
            get_riesgos_proyecto_filter, get_riesgo_proyecto} = 
            useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split ('/')[6], 0, 0, 0, 0, 100, {}, false).get_riesgos_proyecto_filter))
    }, [])

    useEffect(() => {
        if (get_riesgos_proyecto_filter && get_riesgos_proyecto_filter.success === true && get_riesgos_proyecto_filter.riesgos_proyecto){
            setListaRiesgos(get_riesgos_proyecto_filter.riesgos_proyecto)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_riesgo_proyecto))
        }
    }, [get_riesgos_proyecto_filter])

    const resetear_data = () => {
        setRiesgo('')
        setMitigacion('')
        setEditarInformacion (false)
        setNuevoRiesgo(false)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_riesgos_proyecto_filter))
    }

    const agregar_nuevo_riesgo = () => {
        setMitigacion('')
        setRiesgo('')
        setEditarInformacion(true)
        setNuevoRiesgo (true)
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_riesgo_proyecto))
    }

    const obtener_riesgo_proyecto = (id) => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(id, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_riesgo_proyecto))
    }

    useEffect(() => {
        if (get_riesgo_proyecto && get_riesgo_proyecto.success === true && get_riesgo_proyecto.riesgo_proyecto){
            setIdRiesgo(get_riesgo_proyecto.riesgo_proyecto.id_trabajador)
            setMitigacion(get_riesgo_proyecto.riesgo_proyecto.mitigacion)
            setRiesgo(get_riesgo_proyecto.riesgo_proyecto.riesgo)
        }
    }, [get_riesgo_proyecto])

    useEffect(() => {
        if (update_riesgo_proyecto && update_riesgo_proyecto.success === true && update_riesgo_proyecto.riesgo_proyecto){
            window.scrollTo(0, 0)
            setEditarInformacion (false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', location.pathname.split('/')[6], 0, 0, 0, 0, 100, {}, false).get_riesgos_proyecto_filter))
        }
    }, [update_riesgo_proyecto])

    useEffect(() => {
        if (new_riesgo_proyecto && new_riesgo_proyecto.success === true && new_riesgo_proyecto.riesgo_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_riesgo_proyecto])

    const actualizar_riesgo = () => {
        if (riesgo === ''){
            setERiesgo(riesgo === '' ? true : false)
            setEMitigacion(mitigacion === '' ? true : false)
        }else{
            setERiesgo(false)
            setEMitigacion(false)
            const data_riesgo = {
                id_proyecto: location.pathname.split('/')[6],
                mitigacion: mitigacion,
                riesgo: riesgo
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_riesgo, location.pathname.split('/')[6], 0, 0, 0, 0, 0, 0, 0, data_riesgo, false).update_riesgo_proyecto))
        }
    }

    const habilitar_campos_informacion = () => {
        setEditarInformacion(true)
        window.scrollTo(0, 0)
    }

    const guardar_datos = () => {
        if (riesgo === ''){
            setERiesgo(riesgo === '' ? true : false)
        }else{
            setERiesgo(false)
            const data_riesgo = {
                id_proyecto: location.pathname.split('/')[6],
                mitigacion: mitigacion,
                riesgo: riesgo
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_riesgo, false).new_riesgo_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: '#4a4a4a'}}>Riesgos del proyecto: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                        </h2>
                    </div>
                    <div className='' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                        {
                            lista_riesgos && lista_riesgos.length > 0 ? (
                                lista_riesgos.map ((riesgo, index) => {
                                    return (
                                        <CardRiesgoTablet proporcional={proporcional} key={index} index={index} riesgo={riesgo}/>
                                    )
                                })
                            ) : null
                        }
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                            onClick={() => agregar_nuevo_riesgo()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Nuevo riesgo
                            </p>
                        </div>
                    </div>
                </div>
                {
                    (get_riesgo_proyecto && get_riesgo_proyecto.riesgo_proyecto) || nuevo_riesgo ? (
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                                    color: '#4a4a4a'}}>Riesgo: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                                </h2>
                            </div>
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Riesgo
                                    </span>
                                    <input
                                        disabled={!editar_informacion}
                                        type='default' 
                                        id='riesgo'
                                        value={riesgo}
                                        className='form-control rounded'
                                        onChange={(event) => setRiesgo (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: eriesgo ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Riesgo'/>
                                </div>
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Mitigacion
                                    </span>
                                    <textarea
                                        disabled={!editar_informacion}
                                        type='default' 
                                        id='mitigacion'
                                        rows={4}
                                        value={mitigacion}
                                        className='form-control rounded'
                                        onChange={(event) => setMitigacion (event.target.value)}
                                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: emitigacion ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Mitigacion'/>
                                </div>
                            </div>
                            {
                                !nuevo_riesgo && editar_informacion ? (
                                    <div className='' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                            onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0)}}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Cancelar edición
                                            </p>
                                        </div>
                                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                            onClick={() => actualizar_riesgo()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Actualizar datos
                                            </p>
                                        </div>
                                    </div>
                                ) : !nuevo_riesgo && !editar_informacion ? (
                                    <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                            onClick={() => habilitar_campos_informacion()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Editar información
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_cancelar_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                            onMouseOver={() => setBotonCancelarNuevo(true)} onMouseLeave={() => setBotonCancelarNuevo(false)}
                                            onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0); setNuevoRiesgo(false)}}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                                Cancelar
                                            </p>
                                        </div>
                                        <div className={boton_nuevo_trabajador ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
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
                    ) : null
                }
            </div>
        </div>
    )
}
