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

import CardCompraTablet from './card/compratablet.jsx'
import {comprasdata} from '../../redux/slice/comprasdata.js'
import { comprasConstants } from '../../uri/compras-constants.js'

export default function ListaComprasTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [view_compra, setViewUnidad] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_compras, setListaGridCompras] = useState ([])
    const [lista_compras, setListaCompras] = useState ([])
    const [total_compras, setTotalCompras] = useState(0)
    const [compras, setCompras] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreview] = useState(false)

    const {get_compras_filter} = useSelector(({compras_data}) => compras_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(comprasdata(comprasConstants(0, 0, 0, 0, 0, begin, amount, {}, false).get_compras_filter))
    }, [])

    useEffect(() => {
        if (get_compras_filter && get_compras_filter.success === true && get_compras_filter.compras){
            dividir_nro_columnas(get_compras_filter)
        }
    }, [get_compras_filter])

    const next_compras = () => {
        if (begin + amount > total_compras){

        }else{
            setBegin (begin + amount)
            dispatch (comprasdata(comprasConstants(0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_compras_filter))
        }
    }

    const previous_compras = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (comprasdata(comprasConstants(0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_compras_filter))
        }
    }

    const dividir_nro_columnas = (data_compras) => {
        if (data_compras.total_compras){setTotalCompras(data_compras.total_compras)}
        let data = data_compras.compras.length
        let lista = []
        let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setCompras (data_compras.compras)
        setListaGridCompras (lista)
        setListaCompras (data_compras.compras)
    }

    const resetear_data = () => {
        setListaGridCompras([])
        setListaCompras ([])
        setCompras([])
        dispatch(comprasdata(comprasConstants(0, 0, 0, 0, 0, 0, 0, {}, false).get_compras_filter))
    }

    useEffect(() => {
        return () => {
            setListaGridCompras([])
            setListaCompras ([])
            setCompras([])
            dispatch(comprasdata(comprasConstants(0, 0, 0, 0, 0, 0, 0, {}, false).get_compras_filter))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '80%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Compras a través de tu web
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_compras_filter && get_compras_filter.compras ? begin + get_compras_filter.compras.length : 0} de ${total_compras}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '20%', height: 'auto'}}>
                    <img src={view_compra === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewUnidad('lista')}/>
                    <img src={view_compra === 'grid' ? view_grid_v1 : view_grid_v2} 
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
                lista_grid_compras && lista_grid_compras.length > 0 && view_compra === 'grid' ? (
                    lista_grid_compras.map ((compra, numcom) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    compras [(4 * numcom)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardCompraTablet compra={compras[(4 * numcom)]} key={(4 * numcom)} index={(4 * numcom)} proporcional={proporcional} view_compra={view_compra}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    compras [((4 * numcom) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardCompraTablet compra={compras[((4 * numcom) + 1)]} key={((4 * numcom) + 1)} index={((4 * numcom) + 1)} proporcional={proporcional} view_compra={view_compra}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_compras && lista_compras.length > 0 && view_compra === 'lista' ? (
                        lista_compras.map ((compra, numcom) => {
                            return (
                                <CardCompraTablet compra={compra} key={numcom} index={numcom} proporcional={proporcional} view_compra={view_compra}/>
                            )
                        })
                ) : null
            }    
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_compra === 'grid' || view_compra === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreview(true)} onMouseLeave={() => setMousePreview(false)}
                                onClick={() => {previous_compras(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_compras ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_compras(); window.scrollTo(0, 0)}}>
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
