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

import CardNotificacionCell from './card/notificacioncell.jsx'
import {notificacionesdata} from '../../redux/slice/notificacionesdata.js'
import { notificacionesConstants } from '../../uri/notificaciones-constants.js'

export default function ListaNotificacionesCell ({proporcional}) {

    const dispatch = useDispatch()

    const [view_notificacion, setViewNotificacion] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_notificaciones, setListaGridNotificaciones] = useState ([])
    const [lista_notificaciones, setListaNotificaciones] = useState ([])
    const [total_notificaciones, setTotalNotificaciones] = useState(0)

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_notificaciones_filter} = useSelector(({notificaciones_data}) => notificaciones_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, begin, amount, {}, false).get_notificaciones_filter))
    }, [])

    useEffect(() => {
        if (get_notificaciones_filter && get_notificaciones_filter.success === true && get_notificaciones_filter.notificaciones){
            dividir_nro_columnas(get_notificaciones_filter)
        }
    }, [get_notificaciones_filter])

    const next_notificaciones = () => {
        if (begin + amount > total_notificaciones){

        }else{
            setBegin (begin + amount)
            dispatch (notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_notificaciones_filter))
        }
    }

    const previous_notificaciones = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_notificaciones_filter))
        }
    }

    const dividir_nro_columnas = (data_notificaciones) => {
        if (data_notificaciones.total_notificaciones){setTotalNotificaciones(data_notificaciones.total_notificaciones)}
        setListaGridNotificaciones (data_notificaciones.notificaciones)
        setListaNotificaciones (data_notificaciones.notificaciones)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridNotificaciones([])
        setListaNotificaciones ([])
        dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_notificaciones_filter))
    }

    useEffect(() => {
        return () => {
            setListaGridNotificaciones([])
            setListaNotificaciones ([])
            dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, 0, 0, {}, true).get_notificaciones_filter))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Notificaciones
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_notificaciones_filter && get_notificaciones_filter.notificaciones ? begin + get_notificaciones_filter.notificaciones.length : 0} de ${total_notificaciones}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_notificacion === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewNotificacion('lista')}/>
                    <img src={view_notificacion === 'grid' || view_notificacion === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewNotificacion('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_notificaciones && lista_grid_notificaciones.length > 0 && view_notificacion === 'grid' ? (
                    lista_grid_notificaciones.map ((notificacion, numnot) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardNotificacionCell notificacion={notificacion} key={numnot} index={numnot} proporcional={proporcional} view_notificacion={view_notificacion}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_notificaciones && lista_notificaciones.length > 0 && view_notificacion === 'lista' ? (
                        lista_notificaciones.map ((notificacion, numnot) => {
                            return (
                                <CardNotificacionCell notificacion={notificacion} key={numnot} index={numnot} proporcional={proporcional} view_notificacion={view_notificacion}/>
                            )
                        })
                ) : null
            }                   
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_notificacion === 'grid' || view_notificacion === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_notificaciones(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_notificaciones ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_notificaciones(); window.scrollTo(0, 0)}}>
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
