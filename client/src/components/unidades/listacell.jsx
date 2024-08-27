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

import CardUnidadCell from './card/unidadcell.jsx'
import {unidadesdata} from '../../redux/slice/unidadesdata.js'
import { unidadesConstants } from '../../uri/unidades-constants.js'

export default function ListaUnidadesCell ({proporcional}) {

    const dispatch = useDispatch()

    const [view_unidad, setViewUnidad] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_unidades, setListaGridUnidades] = useState ([])
    const [lista_unidades, setListaUnidades] = useState ([])
    const [total_unidades, setTotalUnidades] = useState(0)

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

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
        setListaGridUnidades (data_unidades.unidades)
        setListaUnidades (data_unidades.unidades)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridUnidades([])
        setListaUnidades ([])
        dispatch(unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 16, {}, true).get_unidades_filter))
        dispatch(unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 16, {}, true).delete_unidad))
    }

    useEffect(() => {
        return () => {
            setListaGridUnidades([])
            setListaUnidades ([])
            dispatch(unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 0, {}, true).get_unidades_filter))
            dispatch(unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 0, {}, true).delete_unidad))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Unidades
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_unidades_filter && get_unidades_filter.unidades ? begin + get_unidades_filter.unidades.length : 0} de ${total_unidades}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_unidad === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewUnidad('lista')}/>
                    <img src={view_unidad === 'grid' || view_unidad === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewUnidad('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_unidades && lista_grid_unidades.length > 0 && view_unidad === 'grid' ? (
                    lista_grid_unidades.map ((unidad, numuni) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardUnidadCell unidad={unidad} key={numuni} index={numuni} proporcional={proporcional} view_unidad={view_unidad}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_unidades && lista_unidades.length > 0 && view_unidad === 'lista' ? (
                        lista_unidades.map ((unidad, numuni) => {
                            return (
                                <CardUnidadCell unidad={unidad} key={numuni} index={numuni} proporcional={proporcional} view_unidad={view_unidad}/>
                            )
                        })
                ) : null
            }              
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_unidad === 'grid' || view_unidad === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_unidades(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_unidades ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_unidades(); window.scrollTo(0, 0)}}>
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
