import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {serviciosdata} from '../../redux/slice/serviciosdata'
import { serviciosConstants } from '../../uri/servicios-constants'
import {departamentosdata} from '../../redux/slice/departamentosdata'
import { departamentosConstants } from '../../uri/departamentos-constants'

export default function EmpresaDashboardCell ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [boton_servicios, setBotonServicios] = useState(false)
    const [boton_departamentos, setBotonDepartamentos] = useState(false)
    const [boton_agenda, setBotonAgenda] = useState(false)
    const [boton_administradores, setBotonAdministradores] = useState(false)

    const [lista_servicios, setListaServicios] = useState([])
    const [lista_departamentos, setListaDepartamentos] = useState([])
    const [lista_agenda, setListaAgenda] = useState([])
    const [lista_administradores, setListaAdministradores] = useState([])

    const {get_servicios_filter} = useSelector(({servicios_data}) => servicios_data)
    const {get_departamentos_filter} = useSelector(({departamentos_data}) => departamentos_data)

    useEffect(() => {
        dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 10, {}, false).get_servicios_filter))
    }, [])

    useEffect(() => {
        if (get_servicios_filter && get_servicios_filter.success === true && get_servicios_filter.servicios){
            setListaServicios(get_servicios_filter.servicios)
            dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 10, {}, false).get_departamentos_filter))
        }
    }, [get_servicios_filter])

    useEffect(() => {
        if (get_departamentos_filter && get_departamentos_filter.success === true && get_departamentos_filter.departamentos){
            setListaDepartamentos(get_departamentos_filter.departamentos)
        }
    }, [get_departamentos_filter])

    useEffect(() => {
        return (() => {

        })
    }, [])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='rounded shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                    background: 'white'
                }}>
                    <h6 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Servicios que brindamos
                    </h6>
                    <div style={{width: '100%', height: 300 / proporcional}}>
                    {
                        lista_servicios && lista_servicios.length > 0 ? (
                            lista_servicios.map ((servicio, index) => {
                                return (
                                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto'}}>
                                        <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, color: '#007bff',
                                            marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                            <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                            {servicio.servicio}
                                        </p>
                                    </div>
                                )
                            })
                        ) : null
                    }
                    </div>
                    <div style={{width: '100%', height: 50 / proporcional}}>
                        <div className={boton_servicios ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, cursor: 'pointer', background: '#28A745'}}
                            onMouseOver={() => setBotonServicios(true)} onMouseLeave={() => setBotonServicios(false)}
                            onClick={() => navigate ('servicios')}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver servicios
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='rounded shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                    background: 'white'
                }}>
                    <h6 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Departamentos / áreas
                    </h6>
                    <div style={{width: '100%', height: 300 / proporcional}}>
                    {
                        lista_departamentos && lista_departamentos.length > 0 ? (
                            lista_departamentos.map ((departamento, index) => {
                                return (
                                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto'}}>
                                        <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, color: '#007bff',
                                            marginBottom: 0 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer'}}>
                                            <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                            {departamento.departamento}
                                        </p>
                                    </div>
                                )
                            })
                        ) : null
                    }
                    </div>
                    <div style={{width: '100%', height: 50 / proporcional}}>
                        <div className={boton_departamentos ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, cursor: 'pointer', background: '#28A745'}}
                            onMouseOver={() => setBotonDepartamentos(true)} onMouseLeave={() => setBotonDepartamentos(false)}
                            onClick={() => navigate ('departamentos')}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver departamentos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='rounded shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                    background: 'white'
                }}>
                    <h6 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Agenda
                    </h6>
                    <div style={{width: '100%', height: 300 / proporcional}}>
                    </div>
                    <div style={{width: '100%', height: 50 / proporcional}}>
                        <div className={boton_agenda ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, cursor: 'pointer', background: '#28A745'}}
                            onMouseOver={() => setBotonAgenda(true)} onMouseLeave={() => setBotonAgenda(false)}
                            onClick={() => navigate ('agenda')}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver agenda
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='rounded shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                    background: 'white'
                }}>
                    <h6 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Admins página
                    </h6>
                    <div style={{width: '100%', height: 300 / proporcional}}>
                    </div>
                    <div style={{width: '100%', height: 50 / proporcional}}>
                        <div className={boton_administradores ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, cursor: 'pointer', background: '#28A745'}}
                            onMouseOver={() => setBotonAdministradores(true)} onMouseLeave={() => setBotonAdministradores(false)}
                            onClick={() => navigate ('administradores')}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver administradores
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
