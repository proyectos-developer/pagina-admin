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

import CardTipoProyectoCell from './card/tipoproyectocell.jsx'
import {tipoproyectosdata} from '../../redux/slice/tipoproyectosdata.js'
import { tipoproyectoConstants } from '../../uri/tipoproyecto-constants.js'

export default function ListaTiposProyectosCell ({proporcional}) {

    const dispatch = useDispatch()

    const [view_tipo_proyecto, setViewTipoProyecto] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_tipos_proyectos, setListaGridTiposProyectos] = useState ([])
    const [lista_tipos_proyectos, setListaTipoProyectos] = useState ([])
    const [total_tipos_proyectos, setTotalTiposProyectos] = useState(0)

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_tipo_proyectos_filter, delete_tipo_proyecto} = useSelector(({tipoproyectos_data}) => tipoproyectos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, begin, amount, {}, false).get_tipo_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_tipo_proyectos_filter && get_tipo_proyectos_filter.success === true && get_tipo_proyectos_filter.tipos_proyectos){
            dividir_nro_columnas(get_tipo_proyectos_filter)
        }
    }, [get_tipo_proyectos_filter])

    useEffect(() => {
        if (delete_tipo_proyecto && delete_tipo_proyecto.success === true && delete_tipo_proyecto.tipos_proyectos){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_tipo_proyecto)
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, true).delete_tipo_proyecto))
        }
    }, [delete_tipo_proyecto])

    const next_tipo_proyectos = () => {
        if (begin + amount > total_tipos_proyectos){

        }else{
            setBegin (begin + amount)
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_tipo_proyectos_filter))
        }
    }

    const previous_tipos_proyectos = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_tipo_proyectos_filter))
        }
    }

    const dividir_nro_columnas = (data_tipos_proyectos) => {
        if (data_tipos_proyectos.total_tipos_proyectos){setTotalTiposProyectos(data_tipos_proyectos.total_tipos_proyectos)}
        setListaGridTiposProyectos (data_tipos_proyectos.tipos_proyectos)
        setListaTipoProyectos (data_tipos_proyectos.tipos_proyectos)
    }

    const resetear_data = () => {
        setBegin (0)
        setListaGridTiposProyectos([])
        setListaTipoProyectos ([])
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, false).get_tipo_proyectos_filter))
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, false).delete_tipo_proyecto))
    }

    useEffect(() => {
        return () => {
            setListaGridTiposProyectos([])
            setListaTipoProyectos ([])
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 0, {}, true).get_tipo_proyectos_filter))
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 0, {}, true).delete_tipo_proyecto))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Tipos de proyectos
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_tipo_proyectos_filter && get_tipo_proyectos_filter.tipos_proyectos ? begin + get_tipo_proyectos_filter.tipos_proyectos.length : 0} de ${total_tipos_proyectos}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_tipo_proyecto === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewTipoProyecto('lista')}/>
                    <img src={view_tipo_proyecto === 'grid' || view_tipo_proyecto === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewTipoProyecto('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_tipos_proyectos && lista_grid_tipos_proyectos.length > 0 && view_tipo_proyecto === 'grid' || view_tipo_proyecto === '' ? (
                    lista_grid_tipos_proyectos.map ((tipo_proyecto, numneg) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardTipoProyectoCell tipo_proyecto={tipo_proyecto} key={numneg} index={numneg} proporcional={proporcional} view_tipo_proyecto={view_tipo_proyecto}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_tipos_proyectos && lista_tipos_proyectos.length > 0 && view_tipo_proyecto === 'lista' ? (
                        lista_tipos_proyectos.map ((tipo_proyecto, numneg) => {
                            return (
                                <CardTipoProyectoCell tipo_proyecto={tipo_proyecto} key={numneg} index={numneg} proporcional={proporcional} view_tipo_proyecto={view_tipo_proyecto}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_tipo_proyecto === 'grid' || view_tipo_proyecto === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_tipos_proyectos(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_tipos_proyectos ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_tipo_proyectos(); window.scrollTo(0, 0)}}>
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
