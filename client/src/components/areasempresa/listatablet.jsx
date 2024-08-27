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

import CardAreaEmpresaTablet from './card/areaempresatablet.jsx'
import {areasempresadata} from '../../redux/slice/areasempresadata.js'
import { areasempresaConstants } from '../../uri/areasempresa-constants.js'

export default function ListaAreasEmpresaTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [view_area_empresa, setViewAreaEmpresa] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_areas_empresa, setListaGridAreasEmpresa] = useState ([])
    const [lista_areas_empresa, setListaAreasEmpresa] = useState ([])
    const [total_areas_empresa, setTotalAreasEmpresa] = useState(0)
    const [areas_empresa, setAreasEmpresa] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_areas_empresa_filter, delete_area_empresa} = useSelector(({areasempresa_data}) => areasempresa_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(areasempresadata(areasempresaConstants(0, 0, 0, 0, begin, amount, {}, false).get_areas_empresa_filter))
    }, [])

    useEffect(() => {
        if (get_areas_empresa_filter && get_areas_empresa_filter.success === true && get_areas_empresa_filter.areas_empresa){
            dividir_nro_columnas(get_areas_empresa_filter)
        }
    }, [get_areas_empresa_filter])

    useEffect(() => {
        if (delete_area_empresa && delete_area_empresa.success === true && delete_area_empresa.areas_empresa){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_area_empresa)
            dispatch (areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 16, {}, true).delete_area_empresa))
        }
    }, [delete_area_empresa])

    const next_areas_empresa = () => {
        if (begin + amount > total_areas_empresa){

        }else{
            setBegin (begin + amount)
            dispatch (areasempresadata(areasempresaConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_areas_empresa_filter))
        }
    }

    const previous_areas_empresa = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (areasempresadata(areasempresaConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_areas_empresa_filter))
        }
    }

    const dividir_nro_columnas = (data_areas_empresa) => {
        if (data_areas_empresa.total_areas_empresa){setTotalAreasEmpresa(data_areas_empresa.total_areas_empresa)}
        let data = data_areas_empresa.areas_empresa.length
        let lista = []
        let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setAreasEmpresa (data_areas_empresa.areas_empresa)
        setListaGridAreasEmpresa (lista)
        setListaAreasEmpresa (data_areas_empresa.areas_empresa)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridAreasEmpresa([])
        setListaAreasEmpresa ([])
        setAreasEmpresa([])
        dispatch(areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 16, {}, false).get_areas_empresa_filter))
        dispatch(areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 16, {}, false).delete_area_empresa))
    }

    useEffect(() => {
        return () => {
            setListaGridAreasEmpresa([])
            setListaAreasEmpresa ([])
            setAreasEmpresa([])
            dispatch(areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 0, {}, true).get_areas_empresa_filter))
            dispatch(areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 0, {}, true).delete_area_empresa))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '80%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Áreas de la empresa
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_areas_empresa_filter && get_areas_empresa_filter.areas_empresa ? begin + get_areas_empresa_filter.areas_empresa.length : 0} de ${total_areas_empresa}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '20%', height: 'auto'}}>
                    <img src={view_area_empresa === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewAreaEmpresa('lista')}/>
                    <img src={view_area_empresa === 'grid' || view_area_empresa === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewAreaEmpresa('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_areas_empresa && lista_grid_areas_empresa.length > 0 && view_area_empresa === 'grid' ? (
                    lista_grid_areas_empresa.map ((area_empresa, numarea) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    areas_empresa [(2 * numarea)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardAreaEmpresaTablet area_empresa={areas_empresa[(2 * numarea)]} key={(2 * numarea)} index={(2 * numarea)} proporcional={proporcional} view_area_empresa={view_area_empresa}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    areas_empresa [((2 * numarea) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardAreaEmpresaTablet area_empresa={areas_empresa[((2 * numarea) + 1)]} key={((2 * numarea) + 1)} index={((2 * numarea) + 1)} proporcional={proporcional} view_area_empresa={view_area_empresa}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_areas_empresa && lista_areas_empresa.length > 0 && view_area_empresa === 'lista' ? (
                        lista_areas_empresa.map ((area_empresa, numarea) => {
                            return (
                                <CardAreaEmpresaTablet area_empresa={area_empresa} key={numarea} index={numarea} proporcional={proporcional} view_area_empresa={view_area_empresa}/>
                            )
                        })
                ) : null
            }                  
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_area_empresa === 'grid' || view_area_empresa === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_areas_empresa(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_areas_empresa ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_areas_empresa(); window.scrollTo(0, 0)}}>
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
