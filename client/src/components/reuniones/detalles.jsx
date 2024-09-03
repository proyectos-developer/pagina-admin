import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_reuniones } from '../../redux/actions/data'
import {reunionesdata} from '../../redux/slice/reunionesdata'
import {reunionesConstants} from '../../uri/reuniones-constants'

export default function DetallesReunion ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [id_reunion, setIdReunion] = useState('')
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha_reunion, setFechaReunion] = useState('')
    const [id_organizador, setIdOrganizador] = useState('')
    const [lugar, setLugar] = useState('')
    const [modo, setModo] = useState('')
    const [direccion, setDireccion] = useState('')
    const [hora, setHora] = useState('')
    const [nombres_apellidos, setNombresApellidos] = useState('')
    const [url_foto, setUrlFoto] = useState('')
    const [leido, setLeido] = useState('')

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_agenda, setBotonAgenda] = useState(false)

    const {get_reunion, update_reunion_leido} = useSelector(({reuniones_data}) => reuniones_data)
    const {data_reuniones, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_reuniones.nombres === undefined){
            dispatch(reunionesdata(reunionesConstants(location.pathname.split ('/')[4], 0, 0, 0, 0, 0, 16, {}, false).get_reunion))
        }else{
            setIdReunion(data_reuniones.id_reunion)
            setTitulo(data_reuniones.titulo)
            setDescripcion(data_reuniones.descripcion)
            setFechaReunion(data_reuniones.fecha_reunion)
            setIdOrganizador(data_reuniones.id_organizador)
            setLugar(data_reuniones.lugar)
            setModo(data_reuniones.modo)
            setDireccion(data_reuniones.direccion)
            setHora(data_reuniones.hora)
            setNombresApellidos(data_reuniones.nombres + ' ' + data_reuniones.apellidos)
            setUrlFoto(data_reuniones.url_foto)
            setLeido(data_reuniones.leido)
            if (!data_reuniones.leido){
                const update_data = {
                    leido: !data_reuniones.leido
                }
                dispatch (reunionesdata(reunionesConstants(data_reuniones.id, 0, 0, 0, 0, 0, 16, update_data, false).update_reunion_leido))
            }
        }
    }, [data_reuniones])

    useEffect(() => {
        if (get_reunion && get_reunion.success === true && get_reunion.reunion){
            setIdReunion(get_reunion.reunion.id_reunion)
            setTitulo(get_reunion.reunion.titulo)
            setDescripcion(get_reunion.reunion.descripcion)
            setFechaReunion(get_reunion.reunion.fecha_reunion)
            setIdOrganizador(get_reunion.reunion.id_organizador)
            setLugar(get_reunion.reunion.lugar)
            setModo(get_reunion.reunion.modo)
            setDireccion(get_reunion.reunion.direccion)
            setHora(get_reunion.reunion.hora)
            setNombresApellidos(get_reunion.reunion.nombres + ' ' + get_reunion.reunion.apellidos)
            setUrlFoto(get_reunion.reunion.url_foto)
            setLeido(get_reunion.reunion.leido)
            dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_reunion))
            if (!get_reunion.reunion.leido){
                const update_data = {
                    leido: !get_reunion.reunion.leido
                }
                dispatch (reunionesdata(reunionesConstants(get_reunion.reunion.id, 0, 0, 0, 0, 0, 16, update_data, false).update_reunion_leido))
            }
        }
    }, [get_reunion])

    useEffect(() => {
        if (update_reunion_leido && update_reunion_leido.success === true && update_reunion_leido.reuniones){
            dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, 0, 10, {}, false).get_nro_reuniones))
        }
    }, [update_reunion_leido])

    const volver_a_lista = () => {
        dispatch(set_data_reuniones({}))
        navigate ('/panel/reuniones')
    }

    const ir_a_agenda = () => {

    }
    
    useEffect(() => {
        return (() => {
            dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, 0, 0, {}, true).update_reunion_leido))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#00b7ff'}}>Reunion: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '80%', height: '100%'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Fecha reunión
                        </span>
                        <input
                            disabled={true}
                            type='default' 
                            id='fecha_reunion'
                            className='form-control rounded'
                            value={(new Date(fecha_reunion)).toDateString()}
                            onChange={(event) => setFechaReunion (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Fecha descripcion'/>
                    </div>
                    <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            {
                                url_foto !== '' ? (
                                    <img className='rounded-circle' src={url_foto} 
                                        style={{width: 71 / proporcional, height: 71 / proporcional, marginRight: 10 / proporcional,
                                            padding: 3.5 / proporcional}}/>
                                ) : (
                                    <div className='rounded-circle' style={{width: 71 / proporcional, height: 71 / proporcional,
                                        margin: 3.5 / proporcional, marginRight: 13.5 / proporcional, border: '1px solid #4a4a4a'}}/>
                                )
                            }
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Organizador
                                </span>
                                <input
                                    disabled={true}
                                    type='default' 
                                    id='nombres'
                                    className='form-control rounded'
                                    value={nombres_apellidos}
                                    onChange={(event) => setNombresApellidos (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Fecha'/>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Título
                        </span>
                        <input
                            disabled={true}
                            type='default' 
                            id='titulo'
                            className='form-control rounded'
                            value={titulo}
                            onChange={(event) => setTitulo (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Título'/>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Descripción
                        </span>
                        <textarea
                            disabled={true}
                            id='descripcion'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Descripción'/>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Modo
                        </span>
                        <input
                            disabled={true}
                            type='default' 
                            id='modo'
                            className='form-control rounded'
                            value={modo}
                            onChange={(event) => setModo (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Modo'/>
                    </div>
                    {
                        modo === 'presencial' ? (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Lugar
                                    </span>
                                    <input
                                        disabled={true}
                                        type='default' 
                                        id='lugar'
                                        className='form-control rounded'
                                        value={lugar}
                                        onChange={(event) => setLugar (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Lugar'/>
                                </div>
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Dirección
                                    </span>
                                    <input
                                        disabled={true}
                                        type='default' 
                                        id='direccion'
                                        className='form-control rounded'
                                        value={direccion}
                                        onChange={(event) => setDireccion (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Dirección'/>
                                </div>
                            </div>
                        ) : null
                    }
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_agenda ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonAgenda(true)} onMouseLeave={() => setBotonAgenda(false)}
                            onClick={() => ir_a_agenda()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver Agenda
                            </p>
                        </div>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => volver_a_lista()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
