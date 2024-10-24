import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import CardNegocioTablet from './card/negociotablet.jsx'
import { useNavigate } from 'react-router-dom'
import { negociosdata } from '../../../redux/slice/negociosdata.js'
import { negociosConstants } from '../../../uri/negocios-constants.js'
import { set_error_message } from '../../../redux/actions/data.js'

export default function ListaNegociosTablet ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [begin, setBegin] = useState(0)
    const amount = 16

    const [search_negocios, setSearchNegocios] = useState('')
    const [reset, setReset] = useState(false)

    const [lista_negocios, setListaNegocios] = useState ([])
    const [total_negocios, setTotalNegocios] = useState(0)

    const [boton_nuevo, setBotonNuevo] = useState (false)
    const [boton_reset, setBotonReset] = useState (false)

    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_negocios_filter, delete_negocio} = useSelector(({negocios_data}) => negocios_data)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(negociosdata(negociosConstants(0, 0, 0, 0, begin, amount, {}, false).get_negocios_filter))
    }, [])

    useEffect(() => {
        if (get_negocios_filter && get_negocios_filter.success === true && get_negocios_filter.negocios){
            setTotalNegocios(get_negocios_filter.total_negocios)
            setListaNegocios (get_negocios_filter.negocios)
        }else if (get_negocios_filter && get_negocios_filter.success === false && get_negocios_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_negocios_filter])

    useEffect(() => {
        if (delete_negocio && delete_negocio.success === true && delete_negocio.negocios){
            window.scrollTo(0, 0)
            setBegin(0)
            setTotalNegocios(delete_negocio.total_negocios)
            setListaNegocios (delete_negocio.negocios)
            dispatch (negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, true).delete_negocio))
        }else if (delete_negocio && delete_negocio.success === false && delete_negocio.error){
            dispatch (set_error_message(true))
        }
    }, [delete_negocio])

    const buscar_negocios = (value) => {
        if (value !== ''){
            setReset(true)
            dispatch(negociosdata(negociosConstants(0, value, 0, 0, 0, 16, {}, false).get_negocios_filter))
        }else{
            setReset(false)
            dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, false).get_negocios_filter))
        }
        setSearchNegocios(value)
    }

    const next_negocios = () => {
        if (begin + amount > total_negocios){

        }else{
            setBegin (begin + amount)
            dispatch (negociosdata(negociosConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_negocios_filter))
        }
    }

    const previous_negocios = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (negociosdata(negociosConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_negocios_filter))
        }
    }

    const resetear_data = () => {
        setBegin(0)
        setListaNegocios ([])
        setReset(false)
        setSearchNegocios('')
        dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, false).get_negocios_filter))
        dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, false).delete_negocio))
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
                    negocios
                </p>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', minHeight: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 24 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Negocios
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_negocios_filter && get_negocios_filter.negocios ? begin + get_negocios_filter.negocios.length : 0} de ${total_negocios}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 50 / proporcional}}>
                    <div className={boton_nuevo ? 'shadow rounded' : 'rounded'} 
                        style={{width: 200 / proporcional, height: 40 / proporcional, background: '#28A745',
                                cursor: 'pointer'}}
                            onClick={() => navigate('/panel/proyectos/negocios/nuevo')}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nueva
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='d-flex rounded' 
                    style={{width: reset ? 610 / proporcional : 400 / proporcional, height: 40 / proporcional}}>
                    <input 
                        id='search_negocios'
                        className='form-control rounded-0 border-0'
                        style={{width: 400 / proporcional, height: 40 / proporcional, fontSize: 16 / proporcional,
                                fontFamily: 'Poppins, sans-serif', fontWeight: 400,
                                marginRight: reset ? 10 / proporcional : 0}}
                        value={search_negocios}
                        onChange={(event) => buscar_negocios(event.target.value)}
                        placeholder='Buscar por nombre, código, apellidos...'
                    />
                    {
                        reset ? (
                            <div className={boton_reset ? 'shadow rounded' : 'rounded'} 
                                style={{width: 200 / proporcional, height: 40 / proporcional, background: '#28A745',
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
            <div className='d-flex justify-content-between' style={{width: '100%', height: 70 / proporcional,
                    padding: 5 / proporcional, background: 'white', borderBottom: '1px solid #4a4a4a'}}>
                <div className='d-flex justify-content-between' style={{width: '70%', height: 60 / proporcional}}>
                    <div className='' style={{width: '48%', height: 60 / proporcional}}>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Nombre negocio
                            </p>
                        </div>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Nombre contacto
                            </p>
                        </div>
                    </div>
                    <div className='' style={{width: '48%', height: 60 / proporcional}}>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Nro teléfono
                            </p>
                        </div>
                        <div className='' style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                                cursor: 'default'}}>
                                Correo
                            </p>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end' style={{width: '30%', height: 60 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60 / proporcional}}>
                        <p style={{fontSize: 14 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center',
                            cursor: 'default'}}>
                            Acciones
                        </p>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', minHeight: 500 / proporcional}}>
                {
                    lista_negocios && lista_negocios.length > 0 ? (
                        lista_negocios.map ((negocio, index) => {
                            return (
                                <CardNegocioTablet proporcional={proporcional} key={index} index={index} negocio={negocio}/>
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
                                onClick={() => {previous_negocios(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_negocios ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_negocios(); window.scrollTo(0, 0)}}>
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
