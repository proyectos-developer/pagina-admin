import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {negociosdata} from '../../redux/slice/negociosdata'
import { negociosConstants } from '../../uri/negocios-constants'
import next from '../../assets/iconos/comun/next_v2.png'
import next_select from '../../assets/iconos/comun/next_v1.png'
import preview from '../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../assets/iconos/comun/view_grid_v2.png'

import CardNegocio from './card/negocio.jsx'

export default function ListaClientes ({proporcional}) {

    const dispatch = useDispatch()

    const [view_clientes, setViewClientes] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_negocios, setListaGridNegocios] = useState ([])
    const [lista_negocios, setListaNegocios] = useState ([])
    const [total_negocios, setTotalNegocios] = useState(0)
    const [negocios, setNegocios] = useState ([])

    const [mouse_next_up, setMouseNextUp] = useState(false)
    const [mouse_preview_up, setMousePreviewUp] = useState(false)
    const [mouse_next_down, setMouseNextDown] = useState(false)
    const [mouse_preview_down, setMousePreviewDown] = useState(false)

    const {get_negocios_filter, delete_negocio} = useSelector(({negocios_data}) => negocios_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(negociosdata(negociosConstants(0, 0, 0, 0, begin, amount, {}, false).get_negocios_filter))
    }, [])

    useEffect(() => {
        if (get_negocios_filter && get_negocios_filter.success === true && get_negocios_filter.negocios){
            dividir_nro_columnas(get_negocios_filter)
        }
    }, [get_negocios_filter])

    useEffect(() => {
        if (delete_negocio && delete_negocio.success === true && delete_negocio.negocios){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_negocio)
            dispatch (negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, true).delete_negocio))
        }
    }, [delete_negocio])

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

    const dividir_nro_columnas = (data_negocios) => {
        if (data_negocios.total_negocios){setTotalNegocios(data_negocios.total_negocios)}
        let data = data_negocios.negocios.length
        let lista = []
        let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setNegocios (data_negocios.negocios)
        setListaGridNegocios (lista)
        setListaNegocios (data_negocios.negocios)
    }

    useEffect(() => {
        return () => {
            setListaGridNegocios([])
            setListaNegocios ([])
            setNegocios([])
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Nuestros clientes 
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_negocios_filter && get_negocios_filter.negocios ? begin + get_negocios_filter.negocios.length : 0} de ${total_negocios}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                    <img src={view_clientes === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewClientes('lista')}/>
                    <img src={view_clientes === 'grid' || view_clientes === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => setViewClientes('grid')}/>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_up ? preview_select : preview}
                        onMouseOver={() => setMousePreviewUp(true)} onMouseLeave={() => setMousePreviewUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => previous_negocios()}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_up ? next_select : next} 
                        onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => next_negocios()}/>
                </div>
            </div>
            {
                lista_grid_negocios && lista_grid_negocios.length > 0 && view_clientes === 'grid' || view_clientes === '' ? (
                    lista_grid_negocios.map ((negocio, numneg) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    negocios [(4 * numneg)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNegocio negocio={negocios[(4 * numneg)]} key={(4 * numneg)} index={(4 * numneg)} proporcional={proporcional} view_clientes={view_clientes}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    negocios [((4 * numneg) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNegocio negocio={negocios[((4 * numneg) + 1)]} key={((4 * numneg) + 1)} index={((4 * numneg) + 1)} proporcional={proporcional} view_clientes={view_clientes}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    negocios [((4 * numneg) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNegocio negocio={negocios[((4 * numneg) + 2)]} key={((4 * numneg) + 2)} index={((4 * numneg) + 2)} proporcional={proporcional} view_clientes={view_clientes}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    negocios [((4 * numneg) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNegocio negocio={negocios[((4 * numneg) + 3)]} key={((4 * numneg) + 3)} index={((4 * numneg) + 3)} proporcional={proporcional} view_clientes={view_clientes}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_negocios && lista_negocios.length > 0 && view_clientes === 'lista' ? (
                        lista_negocios.map ((negocio, numneg) => {
                            return (
                                <CardNegocio negocio={negocio} key={numneg} index={numneg} proporcional={proporcional} view_clientes={view_clientes}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_clientes === 'grid' || view_clientes === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_down ? preview_select : preview} 
                        onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {previous_negocios(); window.scrollTo(0, 0)}}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_down ? next_select : next} 
                        onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {next_negocios(); window.scrollTo(0, 0)}}/>
                </div>
            </div>
        </div>
    )
}
