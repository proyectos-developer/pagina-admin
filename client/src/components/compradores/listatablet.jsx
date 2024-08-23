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

import CardClienteTablet from './card/clientetablet.jsx'
import {clientesdata} from '../../redux/slice/clientesdata.js'
import { clientesConstants } from '../../uri/clientes-constants.js'

export default function ListaCompradoresTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [view_cliente, setViewUnidad] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_clientes, setListaGridClientes] = useState ([])
    const [lista_clientes, setListaClientes] = useState ([])
    const [total_clientes, setTotalClientes] = useState(0)
    const [clientes, setClientes] = useState ([])

    const [mouse_next_up, setMouseNextUp] = useState(false)
    const [mouse_preview_up, setMousePreviewUp] = useState(false)
    const [mouse_next_down, setMouseNextDown] = useState(false)
    const [mouse_preview_down, setMousePreviewDown] = useState(false)

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
        let data = data_clientes.clientes.length
        let lista = []
        let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setClientes (data_clientes.clientes)
        setListaGridClientes (lista)
        setListaClientes (data_clientes.clientes)
    }

    useEffect(() => {
        return () => {
            setListaGridClientes([])
            setListaClientes ([])
            setClientes([])
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '80%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Compradores de tu página
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_clientes_filter && get_clientes_filter.clientes ? begin + get_clientes_filter.clientes.length : 0} de ${total_clientes}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '20%', height: 'auto'}}>
                    <img src={view_cliente === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewUnidad('lista')}/>
                    <img src={view_cliente === 'grid' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => setViewUnidad('grid')}/>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_up ? preview_select : preview}
                        onMouseOver={() => setMousePreviewUp(true)} onMouseLeave={() => setMousePreviewUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => previous_clientes()}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_up ? next_select : next} 
                        onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => next_clientes()}/>
                </div>
            </div>
            {
                lista_grid_clientes && lista_grid_clientes.length > 0 && view_cliente === 'grid' ? (
                    lista_grid_clientes.map ((cliente, numcli) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    clientes [(2 * numcli)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardClienteTablet cliente={clientes[(2 * numcli)]} key={(2 * numcli)} index={(2 * numcli)} proporcional={proporcional} view_cliente={view_cliente}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    clientes [((2 * numcli) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardClienteTablet cliente={clientes[((2 * numcli) + 1)]} key={((2 * numcli) + 1)} index={((2 * numcli) + 1)} proporcional={proporcional} view_cliente={view_cliente}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_clientes && lista_clientes.length > 0 && view_cliente === 'lista' ? (
                        lista_clientes.map ((cliente, numcli) => {
                            return (
                                <CardClienteTablet cliente={cliente} key={numcli} index={numcli} proporcional={proporcional} view_cliente={view_cliente}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_cliente === 'grid' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_down ? preview_select : preview} 
                        onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {previous_clientes(); window.scrollTo(0, 0)}}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_down ? next_select : next} 
                        onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {next_clientes(); window.scrollTo(0, 0)}}/>
                </div>
            </div>
        </div>
    )
}
