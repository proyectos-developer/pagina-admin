import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import CardTrabjadorCell from './card/trabajadorcell.jsx'
import {personaldata} from '../../../redux/slice/personaldata.js'
import { personalConstants } from '../../../uri/personal-constants.js'
import { useNavigate } from 'react-router-dom'
import { set_error_message } from '../../../redux/actions/data.js'

export default function ListaPersonalCell ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [begin, setBegin] = useState(0)
    const amount = 16

    const [search_personal, setSearchPersonal] = useState('')
    const [reset, setReset] = useState(false)

    const [lista_personal, setListaPersonal] = useState ([])
    const [total_personal, setTotalPersonal] = useState(0)

    const [boton_nuevo, setBotonNuevo] = useState (false)
    const [boton_reset, setBotonReset] = useState (false)

    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_personal_filter, delete_personal} = useSelector(({personal_data}) => personal_data)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, begin, amount, {}, false).get_personal_filter))
    }, [])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            setTotalPersonal(get_personal_filter.total_personal)
            setListaPersonal (get_personal_filter.personal)
        }else if (get_personal_filter && get_personal_filter.success === false && get_personal_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_personal_filter])

    useEffect(() => {
        if (delete_personal && delete_personal.success === true && delete_personal.personal){
            window.scrollTo(0, 0)
            setBegin(0)
            setTotalPersonal(delete_personal.total_personal)
            setListaPersonal (delete_personal.personal)
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).delete_personal))
        }else if (delete_personal && delete_personal.success === false && delete_personal.error){
            dispatch (set_error_message(true))
        }
    }, [delete_personal])

    const buscar_personal = (value) => {
        if (value !== ''){
            setReset(true)
            dispatch(personaldata(personalConstants(0, 0, value, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
        }else{
            setReset(false)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
        }
        setSearchPersonal(value)
    }

    const next_personal = () => {
        if (begin + amount > total_personal){

        }else{
            setBegin (begin + amount)
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_personal_filter))
        }
    }

    const previous_personal = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_personal_filter))
        }
    }

    const resetear_data = () => {
        setBegin(0)
        setListaPersonal ([])
        setReset(false)
        setSearchPersonal('')
        dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
        dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).delete_personal))
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
                        onClick={() => navigate ('/panel/rrhh')}>
                    rrhh
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    personal
                </p>
            </div>
            <div className='' style={{width: '100%', minHeight: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 24 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Personal
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_personal_filter && get_personal_filter.personal ? begin + get_personal_filter.personal.length : 0} de ${total_personal}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 50 / proporcional}}>
                    <div className={boton_nuevo ? 'shadow rounded' : 'rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#28A745',
                                cursor: 'pointer'}}
                            onClick={() => navigate('/panel/rrhh/personal/nuevo')}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nuevo
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='rounded' 
                    style={{width: '100%', height: 'auto'}}>
                    <input 
                        id='search_personal'
                        className='form-control rounded-0 border-0'
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional,
                                fontFamily: 'Poppins, sans-serif', fontWeight: 400,
                                marginBottom: 16 / proporcional}}
                        value={search_personal}
                        onChange={(event) => buscar_personal(event.target.value)}
                        placeholder='Buscar por nombre, código, apellidos, documento...'
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
            <div className='d-flex justify-content-between' style={{width: '100%', height: 130 / proporcional,
                    padding: 5 / proporcional, background: 'white', borderBottom: '1px solid #4a4a4a'}}>
                <div className='d-flex justify-content-between' style={{width: '70%', height: 120 / proporcional}}>
                    <div className='' style={{width: '100%', height: 120 / proporcional}}>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Nombre
                            </p>
                        </div>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Departamento
                            </p>
                        </div>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Cargo
                            </p>
                        </div>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Estado trabajo
                            </p>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end' style={{width: '30%', height: 120 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 120 / proporcional}}>
                        <p style={{fontSize: 14 / proporcional, lineHeight: `${120 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center',
                            cursor: 'default'}}>
                            Acciones
                        </p>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', minHeight: 500 / proporcional}}>
                {
                    lista_personal && lista_personal.length > 0 ? (
                        lista_personal.map ((trabajador, index) => {
                            return (
                                <CardTrabjadorCell proporcional={proporcional} key={index} index={index} trabajador={trabajador}/>
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
                                onClick={() => {previous_personal(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_personal ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_personal(); window.scrollTo(0, 0)}}>
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
