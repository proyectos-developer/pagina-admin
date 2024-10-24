import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gestionproyectosdata } from '../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../uri/gestionproyectos-constants'
import { useNavigate } from 'react-router-dom'

export default function ProjectsDashboardPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_proyectos, setBotonProyectos] = useState(false)

    const [lista_proyectos, setListaProyectos] = useState([])
    
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const {get_gestion_proyectos_filter} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_gestion_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_gestion_proyectos_filter && get_gestion_proyectos_filter.success === true && get_gestion_proyectos_filter.gestion_proyectos){
            setListaProyectos (get_gestion_proyectos_filter.gestion_proyectos)
        }
    }, [get_gestion_proyectos_filter])

    return ( 
        <div className='position-relative' style={{width: '100%', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel')}>
                    Inicio 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    Proyectos
                </p>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                <div className='rounded shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                    background: 'white'
                }}>
                    <h6 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16 / proporcional,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Proyectos: 
                    </h6>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional,
                        borderBottom: '1px solid #4a4a4a'
                    }}>
                        <div style={{width: '60%',  height: 'auto'}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: 'white'}}>0 </span>
                                Nombre       
                            </p>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                Estado
                            </p>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                Fecha inicio - fecha finalizacion
                            </p>
                        </div>
                    </div>
                    <div className='overflow-auto' style={{width: '100%', minHeight: 300 / proporcional, maxHeight: 450 / proporcional, marginBottom: 16 / proporcional}}>
                    {
                        lista_proyectos && lista_proyectos.length > 0 ? (
                            lista_proyectos.map ((proyecto, index) => {
                                return (
                                    <div className='d' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div style={{width: '60%',  height: 'auto'}}>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                                {proyecto.nombre_proyecto}
                                            </p>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                <strong>{proyecto.estado_proyecto}</strong>
                                            </p>
                                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                                {proyecto.fecha_inicio} - {proyecto.fecha_finalizacion}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : null
                    }
                    </div>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 40 / proporcional}}>
                        <div className={boton_proyectos ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, cursor: 'pointer', background: '#28A745'}}
                            onMouseOver={() => setBotonProyectos(true)} onMouseLeave={() => setBotonProyectos(false)}
                            onClick={() => navigate ('/panel/proyectos/gestion-proyectos')}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver proyectos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
