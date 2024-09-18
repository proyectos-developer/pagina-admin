import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../../assets/iconos/comun/view_grid_v2.png'
import reset_v2 from '../../../assets/iconos/comun/reset_v2.png'
import reset_v1 from '../../../assets/iconos/comun/reset_v1.png'

import agregar_nuevo from '../../../assets/iconos/comun/agregar_nuevo.png'

import CardServicioTablet from './card/serviciotablet.jsx'
import {serviciosdata} from '../../../redux/slice/serviciosdata.js'
import { serviciosConstants } from '../../../uri/servicios-constants.js'
import { useNavigate } from 'react-router-dom'

export default function ListaServiciosTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [view_servicio, setViewServicio] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_servicios, setListaGridServicios] = useState ([])
    const [lista_servicios, setListaServicios] = useState ([])
    const [total_servicios, setTotalServicios] = useState(0)
    const [servicios, setServicios] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

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
        let data = data_servicios.servicios.length
        let lista = []
        let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setServicios (data_servicios.servicios)
        setListaGridServicios (lista)
        setListaServicios (data_servicios.servicios)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridServicios([])
        setListaServicios ([])
        setServicios([])
        dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 16, {}, false).get_servicios_filter))
        dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 16, {}, false).delete_servicio))
    }

    useEffect(() => {
        return () => {
            setListaGridServicios([])
            setListaServicios ([])
            setServicios([])
            dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 0, {}, true).get_servicios_filter))
            dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 0, {}, true).delete_servicio))
        }
    },[])

    return (
        <div className='position-relative' style={{width: '100%', minHeight: 720 / proporcional, paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Servicios
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_servicios_filter && get_servicios_filter.servicios ? begin + get_servicios_filter.servicios.length : 0} de ${total_servicios}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                    <img src={view_servicio === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewServicio('lista')}/>
                    <img src={view_servicio === 'grid' || view_servicio === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewServicio('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_servicios && lista_grid_servicios.length > 0 && view_servicio === 'grid' ? (
                    lista_grid_servicios.map ((servicio, numserv) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    servicios [(2 * numserv)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardServicioTablet servicio={servicios[(2 * numserv)]} key={(2 * numserv)} index={(2 * numserv)} proporcional={proporcional} view_servicio={view_servicio}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    servicios [((2 * numserv) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardServicioTablet servicio={servicios[((2 * numserv) + 1)]} key={((2 * numserv) + 1)} index={((2 * numserv) + 1)} proporcional={proporcional} view_servicio={view_servicio}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_servicios && lista_servicios.length > 0 && view_servicio === 'lista' ? (
                        lista_servicios.map ((servicio, numserv) => {
                            return (
                                <CardServicioTablet servicio={servicio} key={numserv} index={numserv} proporcional={proporcional} view_servicio={view_servicio}/>
                            )
                        })
                ) : null
            }                    
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_servicio === 'grid' || view_servicio === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_servicios(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_servicios ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_servicios(); window.scrollTo(0, 0)}}>
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
            <div className='position-fixed rounded-circle shadow-lg' style={{width: 64 / proporcional, height: 64 / proporcional, 
                bottom: 50 / proporcional, right: 50 / proporcional, background: 'white', cursor: 'pointer'}}
                onClick={() => navigate ('/panel/empresa/servicios/nuevo')}>
                <img src={agregar_nuevo} style={{width: 64 / proporcional, height: 64 / proporcional, padding: 16 / proporcional}}/>
            </div>
        </div>
    )
}
