import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import CardTipoProyectoCell from './card/tipoproyectocell.jsx'
import { useNavigate } from 'react-router-dom'
import { set_error_message } from '../../../redux/actions/data.js'
import { tipoproyectosdata } from '../../../redux/slice/tipoproyectosdata.js'
import { tipoproyectoConstants } from '../../../uri/tipoproyecto-constants.js'

export default function ListaTiposProyectosCell ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [begin, setBegin] = useState(0)
    const amount = 16

    const [search_tipo_proyectos, setSearchTipoProyectos] = useState('')
    const [reset, setReset] = useState(false)

    const [lista_tipos_proyectos, setListaTiposProyectos] = useState ([])
    const [total_tipos_proyectos, setTotalTipoProyectos] = useState(0)

    const [boton_nuevo, setBotonNuevo] = useState (false)
    const [boton_reset, setBotonReset] = useState (false)

    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_tipo_proyectos_filter, delete_tipo_proyecto} = useSelector(({tipoproyectos_data}) => tipoproyectos_data)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, begin, amount, {}, false).get_tipo_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_tipo_proyectos_filter && get_tipo_proyectos_filter.success === true && get_tipo_proyectos_filter.tipos_proyectos){
            setTotalTipoProyectos(get_tipo_proyectos_filter.total_tipos_proyectos)
            setListaTiposProyectos (get_tipo_proyectos_filter.tipos_proyectos)
        }else if (get_tipo_proyectos_filter && get_tipo_proyectos_filter.success === false && get_tipo_proyectos_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_tipo_proyectos_filter])

    useEffect(() => {
        if (delete_tipo_proyecto && delete_tipo_proyecto.success === true && delete_tipo_proyecto.tipos_proyectos){
            window.scrollTo(0, 0)
            setBegin(0)
            setTotalTipoProyectos(delete_tipo_proyecto.total_tipos_proyectos)
            setListaTiposProyectos (delete_tipo_proyecto.tipos_proyectos)
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, true).delete_tipo_proyecto))
        }else if (delete_tipo_proyecto && delete_tipo_proyecto.success === false && delete_tipo_proyecto.error){
            dispatch (set_error_message(true))
        }
    }, [delete_tipo_proyecto])

    const buscar_tipos_proyectos = (value) => {
        if (value !== ''){
            setReset(true)
            dispatch(tipoproyectosdata(tipoproyectoConstants(0, value, 0, 0, 0, 16, {}, false).get_tipo_proyectos_filter))
        }else{
            setReset(false)
            dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, false).get_tipo_proyectos_filter))
        }
        setSearchTipoProyectos(value)
    }

    const next_tipos_proyectos = () => {
        if (begin + amount > total_tipos_proyectos){

        }else{
            setBegin (begin + amount)
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_tipo_proyectos_filter))
        }
    }

    const previous_tipos_proyectos = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_tipo_proyectos_filter))
        }
    }

    const resetear_data = () => {
        setBegin(0)
        setListaTiposProyectos ([])
        setReset(false)
        setSearchTipoProyectos('')
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, false).get_tipo_proyectos_filter))
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, false).delete_tipo_proyecto))
    }

    useEffect(() => {
        return () => {
            
        }
    },[])

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
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/proyectos')}>
                    proyectos
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    tipos_proyectos
                </p>
            </div>
            <div className='' style={{width: '100%', minHeight: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 24 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Tipos de proyecto
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_tipo_proyectos_filter && get_tipo_proyectos_filter.tipos_proyectos ? begin + get_tipo_proyectos_filter.tipos_proyectos.length : 0} de ${total_tipos_proyectos}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 50 / proporcional}}>
                    <div className={boton_nuevo ? 'shadow rounded' : 'rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#28A745',
                                cursor: 'pointer'}}
                                onClick={() => navigate('/panel/proyectos/tipos-proyectos/nuevo')}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nuevo
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='d-flex rounded' 
                    style={{width: '100%', height: 'auto'}}>
                    <input 
                        id='search_tipo_proyectos'
                        className='form-control rounded-0 border-0'
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional,
                                fontFamily: 'Poppins, sans-serif', fontWeight: 400,
                                marginBottom: 16 / proporcional}}
                        value={search_tipo_proyectos}
                        onChange={(event) => buscar_tipos_proyectos(event.target.value)}
                        placeholder='Buscar por nombre, código, apellidos...'
                    />
                    {
                        reset ? (
                            <div className={boton_reset ? 'shadow rounded' : 'rounded'} 
                                style={{width: '100%', height: 40 / proporcional, background: '#28A745',
                                        cursor: 'pointer'}}
                                    onClick={() => resetear_data()}
                                    onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    resetear
                                </p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    padding: 5 / proporcional, background: 'white', borderBottom: '1px solid #4a4a4a'}}>
                <div className='d-flex justify-content-between' style={{width: '70%', height: 30 / proporcional}}>
                    <div className='' style={{width: '100%', height: 30 / proporcional}}>
                        <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Nombre tipo proyecto
                        </p>
                    </div>
                </div>
                <div className='d-flex justify-content-end' style={{width: '30%', height: 30 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 30 / proporcional}}>
                        <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center',
                            cursor: 'default'}}>
                            Acciones
                        </p>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', minHeight: 500 / proporcional}}>
                {
                    lista_tipos_proyectos && lista_tipos_proyectos.length > 0 ? (
                        lista_tipos_proyectos.map ((tipo_proyecto, index) => {
                            return (
                                <CardTipoProyectoCell proporcional={proporcional} key={index} index={index} tipo_proyecto={tipo_proyecto}/>
                            )
                        })
                    ) : null
                }
            </div>              
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_tipos_proyectos(); window.scrollTo(0, 0)}}>
                                <img src={mouse_preview ? preview_select : preview} 
                                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                                <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                    marginLeft: 5 / proporcional, color: mouse_preview ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                        Anteriores
                                </span>
                            </div>
                        ) : null
                    }
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin + 16 >= total_tipos_proyectos ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_tipos_proyectos(); window.scrollTo(0, 0)}}>
                                <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                    marginRight: 5 / proporcional, color: mouse_next ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                        Siguientes
                                </span>
                                <img src={mouse_next ? next_select : next} 
                                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
