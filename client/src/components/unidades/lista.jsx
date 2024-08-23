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

import CardUnidad from './card/unidad.jsx'
import {unidadesdata} from '../../redux/slice/unidadesdata.js'
import { unidadesConstants } from '../../uri/unidades-constants.js'

export default function ListaUnidades ({proporcional}) {

    const dispatch = useDispatch()

    const [view_unidad, setViewUnidad] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_unidades, setListaGridUnidades] = useState ([])
    const [lista_unidades, setListaUnidades] = useState ([])
    const [total_unidades, setTotalUnidades] = useState(0)
    const [unidades, setUnidades] = useState ([])

    const [mouse_next_up, setMouseNextUp] = useState(false)
    const [mouse_preview_up, setMousePreviewUp] = useState(false)
    const [mouse_next_down, setMouseNextDown] = useState(false)
    const [mouse_preview_down, setMousePreviewDown] = useState(false)

    const {get_unidades_filter, delete_unidad} = useSelector(({unidades_data}) => unidades_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(unidadesdata(unidadesConstants(0, 0, 0, 0, begin, amount, {}, false).get_unidades_filter))
    }, [])

    useEffect(() => {
        if (get_unidades_filter && get_unidades_filter.success === true && get_unidades_filter.unidades){
            dividir_nro_columnas(get_unidades_filter)
        }
    }, [get_unidades_filter])

    useEffect(() => {
        if (delete_unidad && delete_unidad.success === true && delete_unidad.unidades){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_unidad)
            dispatch (unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 16, {}, true).delete_unidad))
        }
    }, [delete_unidad])

    const next_unidades = () => {
        if (begin + amount > total_unidades){

        }else{
            setBegin (begin + amount)
            dispatch (unidadesdata(unidadesConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_unidades_filter))
        }
    }

    const previous_unidades = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (unidadesdata(unidadesConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_unidades_filter))
        }
    }

    const dividir_nro_columnas = (data_unidades) => {
        if (data_unidades.total_unidades){setTotalUnidades(data_unidades.total_unidades)}
        let data = data_unidades.unidades.length
        let lista = []
        let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setUnidades (data_unidades.unidades)
        setListaGridUnidades (lista)
        setListaUnidades (data_unidades.unidades)
    }

    useEffect(() => {
        return () => {
            setListaGridUnidades([])
            setListaUnidades ([])
            setUnidades([])
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Tus unidades
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_unidades_filter && get_unidades_filter.unidades ? begin + get_unidades_filter.unidades.length : 0} de ${total_unidades}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                    <img src={view_unidad === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewUnidad('lista')}/>
                    <img src={view_unidad === 'grid' ? view_grid_v1 : view_grid_v2} 
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
                        onClick={() => previous_unidades()}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_up ? next_select : next} 
                        onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => next_unidades()}/>
                </div>
            </div>
            {
                lista_grid_unidades && lista_grid_unidades.length > 0 && view_unidad === 'grid' ? (
                    lista_grid_unidades.map ((unidad, numuni) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    unidades [(4 * numuni)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardUnidad unidad={unidades[(4 * numuni)]} key={(4 * numuni)} index={(4 * numuni)} proporcional={proporcional} view_unidad={view_unidad}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    unidades [((4 * numuni) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardUnidad unidad={unidades[((4 * numuni) + 1)]} key={((4 * numuni) + 1)} index={((4 * numuni) + 1)} proporcional={proporcional} view_unidad={view_unidad}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    unidades [((4 * numuni) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardUnidad unidad={unidades[((4 * numuni) + 2)]} key={((4 * numuni) + 2)} index={((4 * numuni) + 2)} proporcional={proporcional} view_unidad={view_unidad}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    unidades [((4 * numuni) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardUnidad unidad={unidades[((4 * numuni) + 3)]} key={((4 * numuni) + 3)} index={((4 * numuni) + 3)} proporcional={proporcional} view_unidad={view_unidad}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_unidades && lista_unidades.length > 0 && view_unidad === 'lista' ? (
                        lista_unidades.map ((unidad, numuni) => {
                            return (
                                <CardUnidad unidad={unidad} key={numuni} index={numuni} proporcional={proporcional} view_unidad={view_unidad}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_unidad === 'grid' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_down ? preview_select : preview} 
                        onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {previous_unidades(); window.scrollTo(0, 0)}}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_down ? next_select : next} 
                        onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {next_unidades(); window.scrollTo(0, 0)}}/>
                </div>
            </div>
        </div>
    )
}
