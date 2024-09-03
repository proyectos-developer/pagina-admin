import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../assets/iconos/comun/next_v2.png'
import next_select from '../../assets/iconos/comun/next_v1.png'
import preview from '../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../assets/iconos/comun/view_grid_v2.png'
import reset_v2 from '../../assets/iconos/comun/reset_v2.png'
import reset_v1 from '../../assets/iconos/comun/reset_v1.png'

import CardMensaje from './card/mensaje.jsx'
import {mensajesdata} from '../../redux/slice/mensajesdata.js'
import { mensajesConstants } from '../../uri/mensajes-constantes.js'

export default function ListaMensajes ({proporcional}) {

    const dispatch = useDispatch()

    const [view_mensaje, setViewMensaje] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_mensajes, setListaGridMensajes] = useState ([])
    const [lista_mensajes, setListaMensajes] = useState ([])
    const [total_mensajes, setTotalMensajes] = useState(0)
    const [mensajes, setMensajes] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_mensajes_filter} = useSelector(({mensajes_data}) => mensajes_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, begin, amount, {}, false).get_mensajes_filter))
    }, [])

    useEffect(() => {
        if (get_mensajes_filter && get_mensajes_filter.success === true && get_mensajes_filter.mensajes){
            dividir_nro_columnas(get_mensajes_filter)
        }
    }, [get_mensajes_filter])

    const next_mensajes = () => {
        if (begin + amount > total_mensajes){

        }else{
            setBegin (begin + amount)
            dispatch (mensajesdata(mensajesConstants(0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_mensajes_filter))
        }
    }

    const previous_mensajes = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (mensajesdata(mensajesConstants(0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_mensajes_filter))
        }
    }

    const dividir_nro_columnas = (data_mensajes) => {
        if (data_mensajes.total_mensajes){setTotalMensajes(data_mensajes.total_mensajes)}
        let data = data_mensajes.mensajes.length
        let lista = []
        let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setMensajes (data_mensajes.mensajes)
        setListaGridMensajes (lista)
        setListaMensajes (data_mensajes.mensajes)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridMensajes([])
        setListaMensajes ([])
        setMensajes([])
        dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_mensajes_filter))
    }

    useEffect(() => {
        return () => {
            setListaGridMensajes([])
            setListaMensajes ([])
            setMensajes([])
            dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, 0, 0, {}, true).get_mensajes_filter))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Mensajes
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_mensajes_filter && get_mensajes_filter.mensajes ? begin + get_mensajes_filter.mensajes.length : 0} de ${total_mensajes}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                    <img src={view_mensaje === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewMensaje('lista')}/>
                    <img src={view_mensaje === 'grid' || view_mensaje === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewMensaje('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_mensajes && lista_grid_mensajes.length > 0 && view_mensaje === 'grid' ? (
                    lista_grid_mensajes.map ((mensaje, nummen) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    mensajes [(4 * nummen)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardMensaje mensaje={mensajes[(4 * nummen)]} key={(4 * nummen)} index={(4 * nummen)} proporcional={proporcional} view_mensaje={view_mensaje}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    mensajes [((4 * nummen) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardMensaje mensaje={mensajes[((4 * nummen) + 1)]} key={((4 * nummen) + 1)} index={((4 * nummen) + 1)} proporcional={proporcional} view_mensaje={view_mensaje}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    mensajes [((4 * nummen) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardMensaje mensaje={mensajes[((4 * nummen) + 2)]} key={((4 * nummen) + 2)} index={((4 * nummen) + 2)} proporcional={proporcional} view_mensaje={view_mensaje}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    mensajes [((4 * nummen) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardMensaje mensaje={mensajes[((4 * nummen) + 3)]} key={((4 * nummen) + 3)} index={((4 * nummen) + 3)} proporcional={proporcional} view_mensaje={view_mensaje}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_mensajes && lista_mensajes.length > 0 && view_mensaje === 'lista' ? (
                        lista_mensajes.map ((mensaje, nummen) => {
                            return (
                                <CardMensaje mensaje={mensaje} key={nummen} index={nummen} proporcional={proporcional} view_mensaje={view_mensaje}/>
                            )
                        })
                ) : null
            }                   
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_mensaje === 'grid' || view_mensaje === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_mensajes(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_mensajes ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_mensajes(); window.scrollTo(0, 0)}}>
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
