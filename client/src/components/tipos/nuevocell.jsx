import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {tipoproyectosdata} from '../../redux/slice/tipoproyectosdata'
import {tipoproyectoConstants} from '../../uri/tipoproyecto-constants'

export default function NuevoTipoProyectoCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [url_tipo, setUrlTipo] = useState ('')

    const [enombre, setENombre] = useState(false)
    const [edescripcion, setEDescripcion] = useState(false)
    const [eurl_tipo, setEUrlTipo] = useState (false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [show_lista, setShowLista] = useState(false)

    const [lista_tipo_proyectos, setListaTipoProyectos] = useState([])

    const {new_tipo_proyecto, get_tipo_proyectos} = useSelector(({tipoproyectos_data}) => tipoproyectos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, {}, false).get_tipo_proyectos))
    }, [])

    useEffect(() => {
        if (get_tipo_proyectos && get_tipo_proyectos.success === true && get_tipo_proyectos.tipo_proyectos){
            setListaTipoProyectos(get_tipo_proyectos.tipo_proyectos)
            dispatch(tipoproyectosdata(tipoproyectoConstants(0, {}, true).get_tipo_proyectos))
        }
    }, [get_tipo_proyectos])

    useEffect(() => {
        if (new_tipo_proyecto && new_tipo_proyecto.success === true && new_tipo_proyecto.tipo_proyectos){
            setListaTipoProyectos(new_tipo_proyecto.tipo_proyectos)
            dispatch(tipoproyectosdata(tipoproyectoConstants(0, {}, true).new_tipo_proyecto))
            resetear_data()
        }
    }, [new_tipo_proyecto])

    const resetear_data = () => {
        setNombre('')
        setDescripcion('')
        setUrlTipo('')
    }

    const volver_a_lista = () => {
        resetear_data()
        navigate ('/panel/tipos-proyectos')
    }

    const guardar_tipo_proyecto = () => {
        if (nombre === ''){
            setENombre(nombre === '' ? true : false)
        }else{
            setENombre(false)
            const data_nuevo = {
                nombre: nombre,
                descripcion: descripcion,
                url_tipo: url_tipo
            }
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, data_nuevo, false).new_tipo_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: '100%'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <h3 style={{fontSize: 20 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16 / proporcional, fontWeight: 500,
                        fontFamily: 'Poppins, sans-serif', color: 'rgb (89, 89, 89)', textAlign: 'center'}}>
                        Tipo proyectos ya agregados
                    </h3>
                    <div className={show_lista ? 'rounded overflow-auto' : 'rounded overflow-hidden'} style={{width: '100%', height: 400 / proporcional,
                            border: '1px solid #f2f2f2', padding: 5 / proporcional}}
                        onMouseOver={() => setShowLista(true)} onMouseLeave={() => setShowLista(false)}>
                        {
                            lista_tipo_proyectos && lista_tipo_proyectos.length > 0 ? (
                                lista_tipo_proyectos.map ((negocio, index) => {
                                    return (
                                        <p style={{color: '#4a4a4a', marginBottom: 8 / proporcional, fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', fontWeight: 500}}>
                                            <strong>{index + 1}.</strong> {negocio.nombre}
                                        </p>
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
                <div style={{width: '100%', height: '100%'}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 174 / proporcional,
                        marginBottom: 32 / proporcional }}>
                        <div className='rounded-circle' style={{width:  174 / proporcional, height: 174 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_tipo !== '' ? (
                                    <img className='rounded-circle' src={url_tipo} 
                                        style={{width: 172 / proporcional, height: 172 / proporcional}}/>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '100%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Tipo proyecto
                            </span>
                            <input 
                                id='nombre'
                                type='default'
                                className='form-control rounded'
                                value={nombre}
                                onChange={(event) => setNombre(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enombre ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Tipo de proyecto'/>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Descripcion
                        </span>
                        <textarea 
                            id='descripcion'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: edescripcion ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Descripción'/>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            URL Tipo proyecto
                        </span>
                        <input 
                            id='url_tipo'
                            type='web'
                            className='form-control rounded'
                            value={url_tipo}
                            onChange={(event) => setUrlTipo(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_tipo ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='URL Tipo proyecto'/>
                    </div>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                            onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                            onClick={() => guardar_tipo_proyecto()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Guardar datos
                            </p>
                        </div>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
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
