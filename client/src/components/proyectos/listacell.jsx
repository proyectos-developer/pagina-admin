import React, { useEffect, useRef, useState } from 'react'
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

import CardProyectoCell from './card/proyectocell.jsx'
import {proyectosdata} from '../../redux/slice/proyectosdata.js'
import { proyectosConstants } from '../../uri/proyectos-constants.js'
import {tipoproyectosdata} from '../../redux/slice/tipoproyectosdata.js'
import { tipoproyectoConstants } from '../../uri/tipoproyecto-constants.js'

export default function ListaProyectosCell ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefTipoProyecto = useRef(null)

    const [view_proyecto, setViewProyecto] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [id_tipo_proyecto, setIdTipoProyecto] = useState('')
    const [tipo_proyecto, setTipoProyecto] = useState('')
    const [lista_tipos_proyectos, setListaTiposProyectos] = useState([])
    
    const [lista_grid_proyectos, setListaGridProyectos] = useState ([])
    const [lista_proyectos, setListaProyectos] = useState ([])
    const [total_proyectos, setTotalProyectos] = useState(0)

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_proyectos_filter, delete_proyecto} = useSelector(({proyectos_data}) => proyectos_data)
    const {get_tipo_proyectos_filter} = useSelector(({tipoproyectos_data}) => tipoproyectos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 100, {}, false).get_tipo_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_tipo_proyectos_filter && get_tipo_proyectos_filter.success === true && get_tipo_proyectos_filter.tipos_proyectos){
            setListaTiposProyectos(get_tipo_proyectos_filter.tipos_proyectos)
            dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, begin, amount, {}, false).get_proyectos_filter))
        }
    }, [get_tipo_proyectos_filter])

    useEffect(() => {
        if (get_proyectos_filter && get_proyectos_filter.success === true && get_proyectos_filter.proyectos){
            dividir_nro_columnas(get_proyectos_filter)
        }
    }, [get_proyectos_filter])

    useEffect(() => {
        if (delete_proyecto && delete_proyecto.success === true && delete_proyecto.proyectos){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_proyecto)
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).delete_proyecto))
        }
    }, [delete_proyecto])

    const next_proyectos = () => {
        if (begin + amount > total_proyectos){

        }else{
            setBegin (begin + amount)
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_proyectos_filter))
        }
    }

    const previous_proyectos = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_proyectos_filter))
        }
    }

    const dividir_nro_columnas = (data_proyectos) => {
        if (data_proyectos.total_proyectos){setTotalProyectos(data_proyectos.total_proyectos)}
        setListaGridProyectos (data_proyectos.proyectos)
        setListaProyectos (data_proyectos.proyectos)
    }

    const seleccionar_tipo_proyecto = (value) => {
        if (value !== '0'){
            setBegin(0)
            setListaGridProyectos([])
            setListaProyectos([])
            setIdTipoProyecto(value.split ('-')[0])
            setTipoProyecto(value.split ('-')[1])
            dispatch(proyectosdata(proyectosConstants(0, 0, value.split('-')[0], 0, 0, 0, 16, {}, false).get_proyectos_filter))
        }
    }

    const resetear_data = () => {
        setBegin (0)
        if (selectRefTipoProyecto.current){
            selectRefTipoProyecto.current.value = '0'
        }
        setTipoProyecto('Tipo de proyecto')
        setListaGridProyectos([])
        setListaProyectos ([])
        dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_proyectos_filter))
        dispatch(proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, false).delete_proyecto))
    }

    useEffect(() => {
        return () => {
            setListaGridProyectos([])
            setListaProyectos ([])
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_proyectos_filter))
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, true).delete_proyecto))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Proyectos
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_proyectos_filter && get_proyectos_filter.proyectos ? begin + get_proyectos_filter.proyectos.length : 0} de ${total_proyectos}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_proyecto === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewProyecto('lista')}/>
                    <img src={view_proyecto === 'grid' || view_proyecto === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewProyecto('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional,
                    marginBottom: 16 / proporcional
            }}>
                <p style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                    marginRight: 10 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500,
                    cursor: 'default', fontWeight: 500}}>Filtrar por:</p>
                <select
                    ref={selectRefTipoProyecto}
                    className='rounded form-select'
                    id='tipo_proyecto'
                    style={{width: 300 / proporcional, height: 40 / proporcional, border: '1px solid #007bff',
                            fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif'}}
                    onChange={(event) => seleccionar_tipo_proyecto(event.target.value)}>
                    <option value='0'>{tipo_proyecto === '' ? 'Tipo de proyecto' : tipo_proyecto}</option>
                    {
                        lista_tipos_proyectos && lista_tipos_proyectos.length > 0 ? (
                            lista_tipos_proyectos.map ((tipo_proyecto, index) => {
                                return (
                                    <option key={index} value={tipo_proyecto.id + '-' + tipo_proyecto.nombre}>{tipo_proyecto.nombre}</option>
                                )
                            })
                        ) : null
                    }
                </select>
            </div>
            {
                lista_grid_proyectos && lista_grid_proyectos.length > 0 && view_proyecto === 'grid' ? (
                    lista_grid_proyectos.map ((proyecto, numpro) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardProyectoCell proyecto={proyecto} key={numpro} index={numpro} proporcional={proporcional} view_proyecto={view_proyecto}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_proyectos && lista_proyectos.length > 0 && view_proyecto === 'lista' ? (
                        lista_proyectos.map ((proyecto, numpro) => {
                            return (
                                <CardProyectoCell proyecto={proyecto} key={numpro} index={numpro} proporcional={proporcional} view_proyecto={view_proyecto}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_proyecto === 'grid' || view_proyecto === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_proyectos(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_proyectos ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_proyectos(); window.scrollTo(0, 0)}}>
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
