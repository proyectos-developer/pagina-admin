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

import CardTrabajador from './card/trabajador.jsx'
import {trabajadoresdata} from '../../redux/slice/trabajadoresdata.js'
import { trabajadoresConstants } from '../../uri/trabajadores-constants.js'
import {areasempresadata} from '../../redux/slice/areasempresadata.js'
import { areasempresaConstants } from '../../uri/areasempresa-constants.js'

export default function ListaTrabajadores ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefAreaEmpresa = useRef(null)
    const selectRefEstadoTrabajo = useRef(null)

    const [view_trabajador, setViewTrabajador] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [id_area_empresa, setIdAreaEmpresa] = useState('')
    const [area_empresa, setAreaEmpresa] = useState('')
    const [estado_trabajo, setEstadoTrabajo] = useState('')

    const [lista_grid_trabajadores, setListaGridTrabajadores] = useState ([])
    const [lista_trabajadores, setListaTrabajadores] = useState ([])
    const [total_trabajadores, setTotalTrabajadores] = useState(0)
    const [trabajadores, setTrabajadores] = useState ([])

    const [lista_areas_empresa, setListaAreasEmpresa] = useState([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_trabajadores_filter, delete_trabajador} = useSelector(({trabajadores_data}) => trabajadores_data)
    const {get_areas_empresa_filter} = useSelector(({areasempresa_data}) => areasempresa_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch (areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 100, {}, false).get_areas_empresa_filter))
    }, [])

    useEffect(() => {
        if (get_areas_empresa_filter && get_areas_empresa_filter.success === true && get_areas_empresa_filter.areas_empresa){
            setListaAreasEmpresa(get_areas_empresa_filter.areas_empresa)
            dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, begin, amount, {}, false).get_trabajadores_filter))
        }
    }, [])

    useEffect(() => {
        if (get_trabajadores_filter && get_trabajadores_filter.success === true && get_trabajadores_filter.trabajadores){
            dividir_nro_columnas(get_trabajadores_filter)
        }
    }, [get_trabajadores_filter])

    useEffect(() => {
        if (delete_trabajador && delete_trabajador.success === true && delete_trabajador.trabajadores){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_trabajador)
            dispatch (trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).delete_trabajador))
        }
    }, [delete_trabajador])

    const next_trabajadores = () => {
        if (begin + amount > total_trabajadores){

        }else{
            setBegin (begin + amount)
            dispatch (trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_trabajadores_filter))
        }
    }

    const previous_trabajadores = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_trabajadores_filter))
        }
    }

    const seleccionar_area_empresa = (value) => {
        if (value !== '0'){
            setIdAreaEmpresa(value.split('-')[0])
            setAreaEmpresa(value.split('-')[1])
            dispatch(trabajadoresdata(trabajadoresConstants(0, 0, value.split('-')[0], 0, 0, 0, 0, 16, {}, false).get_trabajadores_filter))
        }
    }

    const seleccionar_estado_trabajo = (value) => {
        if (value !== '0'){
            setEstadoTrabajo(value)
            dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, value, 0, 0, 0, 16, {}, false).get_trabajadores_filter))
        }
    }

    const dividir_nro_columnas = (data_trabajadores) => {
        if (data_trabajadores.total_trabajadores){setTotalTrabajadores(data_trabajadores.total_trabajadores)}
        let data = data_trabajadores.trabajadores.length
        let lista = []
        let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setTrabajadores (data_trabajadores.trabajadores)
        setListaGridTrabajadores (lista)
        setListaTrabajadores (data_trabajadores.trabajadores)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridTrabajadores([])
        setListaTrabajadores ([])
        setTrabajadores([])
        dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_trabajadores_filter))
        dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).delete_trabajador))
    }

    useEffect(() => {
        return () => {
            setListaGridTrabajadores([])
            setListaTrabajadores ([])
            setTrabajadores([])
            setListaAreasEmpresa([])
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Trabajadores
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_trabajadores_filter && get_trabajadores_filter.trabajadores ? begin + get_trabajadores_filter.trabajadores.length : 0} de ${total_trabajadores}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                    <img src={view_trabajador === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewTrabajador('lista')}/>
                    <img src={view_trabajador === 'grid' || view_trabajador === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewTrabajador('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                <p style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                    marginRight: 10 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500,
                    cursor: 'default', fontWeight: 500}}>Filtrar por:</p>
                <select
                    ref={selectRefAreaEmpresa}
                    className='rounded form-select'
                    id='area_empresa'
                    style={{width: 200 / proporcional, height: 40 / proporcional, border: '1px solid #007bff',
                            fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginRight: 10 / proporcional}}
                    onChange={(event) => seleccionar_area_empresa(event.target.value)}>
                    <option value='0'>{area_empresa === '' ? 'Área empresa' : area_empresa}</option>
                    {
                        lista_areas_empresa && lista_areas_empresa.length > 0 ? (
                            lista_areas_empresa.map ((area_empresa, index) => {
                                return (
                                    <option key={index} value={area_empresa.id + '-' + area_empresa.nombre_area}>{area_empresa.nombre_area}</option>
                                )
                            })
                        ) : null
                    }
                </select>
                <select
                    ref={selectRefEstadoTrabajo}
                    className='rounded form-select'
                    id='estado_trabajo'
                    style={{width: 200 / proporcional, height: 40 / proporcional, border: '1px solid #007bff',
                            fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginRight: 10 / proporcional}}
                    onChange={(event) => seleccionar_estado_trabajo(event.target.value)}>
                    <option value='0'>{estado_trabajo === '' ? 'Estado trabajo' : estado_trabajo}</option>
                </select>
            </div>
            {
                lista_grid_trabajadores && lista_grid_trabajadores.length > 0 && view_trabajador === 'grid' ? (
                    lista_grid_trabajadores.map ((trabajador, numtrab) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    trabajadores [(4 * numtrab)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={trabajadores[(4 * numtrab)]} key={(4 * numtrab)} index={(4 * numtrab)} proporcional={proporcional} view_trabajador={view_trabajador}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    trabajadores [((4 * numtrab) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={trabajadores[((4 * numtrab) + 1)]} key={((4 * numtrab) + 1)} index={((4 * numtrab) + 1)} proporcional={proporcional} view_trabajador={view_trabajador}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    trabajadores [((4 * numtrab) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={trabajadores[((4 * numtrab) + 2)]} key={((4 * numtrab) + 2)} index={((4 * numtrab) + 2)} proporcional={proporcional} view_trabajador={view_trabajador}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    trabajadores [((4 * numtrab) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={trabajadores[((4 * numtrab) + 3)]} key={((4 * numtrab) + 3)} index={((4 * numtrab) + 3)} proporcional={proporcional} view_trabajador={view_trabajador}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_trabajadores && lista_trabajadores.length > 0 && view_trabajador === 'lista' ? (
                        lista_trabajadores.map ((trabajador, numtrab) => {
                            return (
                                <CardTrabajador trabajador={trabajador} key={numtrab} index={numtrab} proporcional={proporcional} view_trabajador={view_trabajador}/>
                            )
                        })
                ) : null
            }                  
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_trabajador === 'grid' || view_trabajador === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_trabajadores(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_trabajadores ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_trabajadores(); window.scrollTo(0, 0)}}>
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
