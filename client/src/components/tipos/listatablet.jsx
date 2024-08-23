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

import CardTipoProyectoTablet from './card/tipoproyectotablet.jsx'
import {tipoproyectosdata} from '../../redux/slice/tipoproyectosdata.js'
import { tipoproyectoConstants } from '../../uri/tipoproyecto-constants.js'

export default function ListaTiposProyectosTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [view_tipo_proyecto, setViewTipoProyecto] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_tipos_proyectos, setListaGridTiposProyectos] = useState ([])
    const [lista_tipos_proyectos, setListaTipoProyectos] = useState ([])
    const [total_tipos_proyectos, setTotalTiposProyectos] = useState(0)
    const [tipos_proyectos, setTiposProyectos] = useState ([])

    const [mouse_next_up, setMouseNextUp] = useState(false)
    const [mouse_preview_up, setMousePreviewUp] = useState(false)
    const [mouse_next_down, setMouseNextDown] = useState(false)
    const [mouse_preview_down, setMousePreviewDown] = useState(false)

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
        let data = data_tipos_proyectos.tipos_proyectos.length
        let lista = []
        let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setTiposProyectos (data_tipos_proyectos.tipos_proyectos)
        setListaGridTiposProyectos (lista)
        setListaTipoProyectos (data_tipos_proyectos.tipos_proyectos)
    }

    useEffect(() => {
        return () => {
            setListaGridTiposProyectos([])
            setListaTipoProyectos ([])
            setTiposProyectos([])
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '68%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Tipos de proyectos
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_tipo_proyectos_filter && get_tipo_proyectos_filter.tipos_proyectos ? begin + get_tipo_proyectos_filter.tipos_proyectos.length : 0} de ${total_tipos_proyectos}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '28%', height: 'auto'}}>
                    <img src={view_tipo_proyecto === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewTipoProyecto('lista')}/>
                    <img src={view_tipo_proyecto === 'grid' || view_tipo_proyecto === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => setViewTipoProyecto('grid')}/>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_up ? preview_select : preview}
                        onMouseOver={() => setMousePreviewUp(true)} onMouseLeave={() => setMousePreviewUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => previous_tipos_proyectos()}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_up ? next_select : next} 
                        onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => next_tipo_proyectos()}/>
                </div>
            </div>
            {
                lista_grid_tipos_proyectos && lista_grid_tipos_proyectos.length > 0 && view_tipo_proyecto === 'grid' || view_tipo_proyecto === '' ? (
                    lista_grid_tipos_proyectos.map ((tipo_proyecto, numneg) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    tipos_proyectos [(2 * numneg)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardTipoProyectoTablet tipo_proyecto={tipos_proyectos[(2 * numneg)]} key={(2 * numneg)} index={(2 * numneg)} proporcional={proporcional} view_tipo_proyecto={view_tipo_proyecto}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    tipos_proyectos [((2 * numneg) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardTipoProyectoTablet tipo_proyecto={tipos_proyectos[((2 * numneg) + 1)]} key={((2 * numneg) + 1)} index={((2 * numneg) + 1)} proporcional={proporcional} view_tipo_proyecto={view_tipo_proyecto}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_tipos_proyectos && lista_tipos_proyectos.length > 0 && view_tipo_proyecto === 'lista' ? (
                        lista_tipos_proyectos.map ((tipo_proyecto, numneg) => {
                            return (
                                <CardTipoProyectoTablet tipo_proyecto={tipo_proyecto} key={numneg} index={numneg} proporcional={proporcional} view_tipo_proyecto={view_tipo_proyecto}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_tipo_proyecto === 'grid' || view_tipo_proyecto === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_down ? preview_select : preview} 
                        onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {previous_tipos_proyectos(); window.scrollTo(0, 0)}}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_down ? next_select : next} 
                        onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {next_tipo_proyectos(); window.scrollTo(0, 0)}}/>
                </div>
            </div>
        </div>
    )
}
