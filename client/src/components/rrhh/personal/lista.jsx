import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../../assets/iconos/comun/view_grid_v2.png'
import reset_v2 from '../../../assets/iconos/comun/reset_v2.png'
import reset_v1 from '../../../assets/iconos/comun/reset_v1.png'

import agregar_nuevo from '../../../assets/iconos/comun/agregar_nuevo.png'

import CardTrabajador from './card/trabajador.jsx'
import {personaldata} from '../../../redux/slice/personaldata.js'
import { personalConstants } from '../../../uri/personal-constants.js'
import {departamentosdata} from '../../../redux/slice/departamentosdata.js'
import { departamentosConstants } from '../../../uri/departamentos-constants.js'
import { useNavigate } from 'react-router-dom'

export default function ListaPersonal ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectRefDepartamento = useRef(null)
    const selectRefEstadoTrabajo = useRef(null)

    const [view_trabajador, setViewTrabajador] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [id_departamento, setIdDepartamento] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [estado_trabajo, setEstadoTrabajo] = useState('')

    const [lista_grid_personal, setListaGridPersonal] = useState ([])
    const [lista_personal, setListaPersonal] = useState ([])
    const [total_personal, setTotalPersonal] = useState(0)
    const [personal, setPersonal] = useState ([])

    const [lista_departamentos, setListaDepartamentos] = useState([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_personal_filter, delete_personal} = useSelector(({personal_data}) => personal_data)
    const {get_departamentos_filter} = useSelector(({departamentos_data}) => departamentos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, begin, amount, {}, false).get_personal_filter))
    }, [])

    useEffect(() => {
        if (get_departamentos_filter && get_departamentos_filter.success === true && get_departamentos_filter.departamentos){
            setListaDepartamentos(get_departamentos_filter.departamentos)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, begin, amount, {}, false).get_personal_filter))
        }
    }, [])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            dividir_nro_columnas(get_personal_filter)
        }
    }, [get_personal_filter])

    useEffect(() => {
        if (delete_personal && delete_personal.success === true && delete_personal.personal){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_personal)
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).delete_personal))
        }
    }, [delete_personal])

    const next_personal = () => {
        if (begin + amount > total_personal){

        }else{
            setBegin (begin + amount)
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_personal_filter))
        }
    }

    const previous_personal = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_personal_filter))
        }
    }

    const seleccionar_departamento = (value) => {
        if (value !== '0'){
            setIdDepartamento(value.split('-')[0])
            setDepartamento(value.split('-')[1])
            dispatch(personaldata(personalConstants(0, 0, value.split('-')[0], 0, 0, 0, 0, 16, {}, false).get_personal_filter))
        }
    }

    const seleccionar_estado_trabajo = (value) => {
        if (value !== '0'){
            setEstadoTrabajo(value)
            dispatch(personaldata(personalConstants(0, 0, 0, value, 0, 0, 0, 16, {}, false).get_personal_filter))
        }
    }

    const dividir_nro_columnas = (data_personal) => {
        if (data_personal.total_personal){setTotalPersonal(data_personal.total_personal)}
        let data = data_personal.personal.length
        let lista = []
        let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setPersonal (data_personal.personal)
        setListaGridPersonal (lista)
        setListaPersonal (data_personal.personal)
        dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 100, {}, false).get_departamentos_filter))
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridPersonal([])
        setListaPersonal ([])
        setPersonal([])
        dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
        dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).delete_personal))
    }

    useEffect(() => {
        return () => {
            setListaGridPersonal([])
            setListaPersonal ([])
            setPersonal([])
            setListaDepartamentos([])
        }
    },[])

    return (
        <div className='position-relative' style={{width: '100%', minHeight: 720 / proporcional, paddingLeft: open_menu_lateral ? 80 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 80 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Personal
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_personal_filter && get_personal_filter.personal ? begin + get_personal_filter.personal.length : 0} de ${total_personal}`}
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
                    ref={selectRefDepartamento}
                    className='rounded form-select'
                    id='departamento'
                    style={{width: 200 / proporcional, height: 40 / proporcional, border: '1px solid #007bff',
                            fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginRight: 10 / proporcional}}
                    onChange={(event) => seleccionar_departamento(event.target.value)}>
                    <option value='0'>{departamento === '' ? 'Departamento' : departamento}</option>
                    {
                        lista_departamentos && lista_departamentos.length > 0 ? (
                            lista_departamentos.map ((departamento, index) => {
                                return (
                                    <option key={index} value={departamento.id + '-' + departamento.nombre_area}>{departamento.nombre_area}</option>
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
                lista_grid_personal && lista_grid_personal.length > 0 && view_trabajador === 'grid' ? (
                    lista_grid_personal.map ((trabajador, numtrab) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    personal [(4 * numtrab)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={personal[(4 * numtrab)]} key={(4 * numtrab)} index={(4 * numtrab)} proporcional={proporcional} view_trabajador={view_trabajador}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    personal [((4 * numtrab) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={personal[((4 * numtrab) + 1)]} key={((4 * numtrab) + 1)} index={((4 * numtrab) + 1)} proporcional={proporcional} view_trabajador={view_trabajador}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    personal [((4 * numtrab) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={personal[((4 * numtrab) + 2)]} key={((4 * numtrab) + 2)} index={((4 * numtrab) + 2)} proporcional={proporcional} view_trabajador={view_trabajador}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    personal [((4 * numtrab) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={personal[((4 * numtrab) + 3)]} key={((4 * numtrab) + 3)} index={((4 * numtrab) + 3)} proporcional={proporcional} view_trabajador={view_trabajador}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_personal && lista_personal.length > 0 && view_trabajador === 'lista' ? (
                        lista_personal.map ((trabajador, numtrab) => {
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
                                onClick={() => {previous_personal(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_personal ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_personal(); window.scrollTo(0, 0)}}>
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
            <div className='position-fixed rounded-circle shadow-lg' style={{width: 64 / proporcional, height: 64 / proporcional, 
                bottom: 50 / proporcional, right: 50 / proporcional, background: 'white', cursor: 'pointer'}}
                onClick={() => navigate ('/panel/rrhh/personal/nuevo')}>
                <img src={agregar_nuevo} style={{width: 64 / proporcional, height: 64 / proporcional, padding: 16 / proporcional}}/>
            </div>
        </div>
    )
}
