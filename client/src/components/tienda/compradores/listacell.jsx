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

import CardClienteCell from './card/clientecell.jsx'
import {clientesdata} from '../../../redux/slice/clientesdata.js'
import { clientesConstants } from '../../../uri/clientes-constants.js'

export default function ListaCompradoresCell ({proporcional}) {

    const dispatch = useDispatch()

    const [view_cliente, setViewUnidad] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_clientes, setListaGridClientes] = useState ([])
    const [lista_clientes, setListaClientes] = useState ([])
    const [total_clientes, setTotalClientes] = useState(0)

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreview] = useState(false)

    const {get_clientes_filter, update_estado_cliente} = useSelector(({clientes_data}) => clientes_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(clientesdata(clientesConstants(0, 0, 0, 0, begin, amount, {}, false).get_clientes_filter))
    }, [])

    useEffect(() => {
        if (get_clientes_filter && get_clientes_filter.success === true && get_clientes_filter.clientes){
            dividir_nro_columnas(get_clientes_filter)
        }
    }, [get_clientes_filter])

    useEffect(() => {
        if (update_estado_cliente && update_estado_cliente.success === true && update_estado_cliente.clientes){
            dividir_nro_columnas(update_estado_cliente)
        }
    }, [update_estado_cliente])

    const next_clientes = () => {
        if (begin + amount > total_clientes){

        }else{
            setBegin (begin + amount)
            dispatch (clientesdata(clientesConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_clientes_filter))
        }
    }

    const previous_clientes = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (clientesdata(clientesConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_clientes_filter))
        }
    }

    const dividir_nro_columnas = (data_clientes) => {
        if (data_clientes.total_clientes){setTotalClientes(data_clientes.total_clientes)}
        setListaGridClientes (data_clientes.clientes)
        setListaClientes (data_clientes.clientes)
    }

    const resetear_data = () => {
        setBegin (0)
        setListaClientes([])
        setListaGridClientes([])
        dispatch(clientesdata(clientesConstants(0, 0, 0, 0, 0, 16, {}, false).get_clientes_filter))
    }

    useEffect(() => {
        return () => {
            setListaClientes([])
            setListaGridClientes([])
            dispatch(clientesdata(clientesConstants(0, 0, 0, 0, 0, 0, {}, false).get_clientes_filter))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Compradores de tu página
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_clientes_filter && get_clientes_filter.clientes ? begin + get_clientes_filter.clientes.length : 0} de ${total_clientes}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_cliente === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewUnidad('lista')}/>
                    <img src={view_cliente === 'grid' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => setViewUnidad('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_clientes && lista_grid_clientes.length > 0 && view_cliente === 'grid' ? (
                    lista_grid_clientes.map ((cliente, numcli) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardClienteCell cliente={cliente} key={numcli} index={numcli} proporcional={proporcional} view_cliente={view_cliente}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_clientes && lista_clientes.length > 0 && view_cliente === 'lista' ? (
                        lista_clientes.map ((cliente, numcli) => {
                            return (
                                <CardClienteCell cliente={cliente} key={numcli} index={numcli} proporcional={proporcional} view_cliente={view_cliente}/>
                            )
                        })
                ) : null
            }   
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_cliente === 'grid' || view_cliente === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreview(true)} onMouseLeave={() => setMousePreview(false)}
                                onClick={() => {previous_clientes(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_clientes ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_clientes(); window.scrollTo(0, 0)}}>
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
