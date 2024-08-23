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

import CardServicioCell from './card/serviciocell.jsx'
import {serviciosdata} from '../../redux/slice/serviciosdata.js'
import { serviciosConstants } from '../../uri/servicios-constants.js'

export default function ListaServiciosCell ({proporcional}) {

    const dispatch = useDispatch()

    const [view_servicio, setViewServicio] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_servicios, setListaGridServicios] = useState ([])
    const [lista_servicios, setListaServicios] = useState ([])
    const [total_servicios, setTotalServicios] = useState(0)

    const [mouse_next_up, setMouseNextUp] = useState(false)
    const [mouse_preview_up, setMousePreviewUp] = useState(false)
    const [mouse_next_down, setMouseNextDown] = useState(false)
    const [mouse_preview_down, setMousePreviewDown] = useState(false)

    const {get_servicios_filter, delete_servicio} = useSelector(({servicios_data}) => servicios_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, begin, amount, {}, false).get_servicios_filter))
    }, [])

    useEffect(() => {
        if (get_servicios_filter && get_servicios_filter.success === true && get_servicios_filter.servicios){
            dividir_nro_columnas(get_servicios_filter)
        }
    }, [get_servicios_filter])

    useEffect(() => {
        if (delete_servicio && delete_servicio.success === true && delete_servicio.servicios){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_servicio)
            dispatch (serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 16, {}, true).delete_servicio))
        }
    }, [delete_servicio])

    const next_servicios = () => {
        if (begin + amount > total_servicios){

        }else{
            setBegin (begin + amount)
            dispatch (serviciosdata(serviciosConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_servicios_filter))
        }
    }

    const previous_servicios = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (serviciosdata(serviciosConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_servicios_filter))
        }
    }

    const dividir_nro_columnas = (data_servicios) => {
        if (data_servicios.total_servicios){setTotalServicios(data_servicios.total_servicios)}
        setListaGridServicios (data_servicios.servicios)
        setListaServicios (data_servicios.servicios)
    }

    useEffect(() => {
        return () => {
            setListaGridServicios([])
            setListaServicios ([])
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Tus servicios
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_servicios_filter && get_servicios_filter.servicios ? begin + get_servicios_filter.servicios.length : 0} de ${total_servicios}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_servicio === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewServicio('lista')}/>
                    <img src={view_servicio === 'grid' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => setViewServicio('grid')}/>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_up ? preview_select : preview}
                        onMouseOver={() => setMousePreviewUp(true)} onMouseLeave={() => setMousePreviewUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => previous_servicios()}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_up ? next_select : next} 
                        onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => next_servicios()}/>
                </div>
            </div>
            {
                lista_grid_servicios && lista_grid_servicios.length > 0 && view_servicio === 'grid' ? (
                    lista_grid_servicios.map ((servicio, numserv) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardServicioCell servicio={servicio} key={numserv} index={numserv} proporcional={proporcional} view_servicio={view_servicio}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_servicios && lista_servicios.length > 0 && view_servicio === 'lista' ? (
                        lista_servicios.map ((servicio, numserv) => {
                            return (
                                <CardServicioCell servicio={servicio} key={numserv} index={numserv} proporcional={proporcional} view_servicio={view_servicio}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_servicio === 'grid' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_down ? preview_select : preview} 
                        onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {previous_servicios(); window.scrollTo(0, 0)}}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_down ? next_select : next} 
                        onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {next_servicios(); window.scrollTo(0, 0)}}/>
                </div>
            </div>
        </div>
    )
}
