import React, { useEffect, useState } from 'react'
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

import CardDepartamentoCell from './card/departamentocell.jsx'
import {departamentosdata} from '../../../redux/slice/departamentosdata.js'
import { departamentosConstants } from '../../../uri/departamentos-constants.js'
import { useNavigate } from 'react-router-dom'

export default function ListaDepartamentosEmpresaCell ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [view_departamento, setViewAreaEmpresa] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_departamentos, setListaGridDepartamentos] = useState ([])
    const [lista_departamentos, setListaDepartamentos] = useState ([])
    const [total_departamentos, setTotalDepartamentos] = useState(0)

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_departamentos_filter, delete_departamento} = useSelector(({departamentos_data}) => departamentos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, begin, amount, {}, false).get_departamentos_filter))
    }, [])

    useEffect(() => {
        if (get_departamentos_filter && get_departamentos_filter.success === true && get_departamentos_filter.departamentos){
            dividir_nro_columnas(get_departamentos_filter)
        }
    }, [get_departamentos_filter])

    useEffect(() => {
        if (delete_departamento && delete_departamento.success === true && delete_departamento.departamentos){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_departamento)
            dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, true).delete_departamento))
        }
    }, [delete_departamento])

    const next_departamentos = () => {
        if (begin + amount > total_departamentos){

        }else{
            setBegin (begin + amount)
            dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_departamentos_filter))
        }
    }

    const previous_departamentos = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_departamentos_filter))
        }
    }

    const dividir_nro_columnas = (data_departamentos) => {
        if (data_departamentos.total_departamentos){setTotalDepartamentos(data_departamentos.total_departamentos)}
        setListaGridDepartamentos (data_departamentos.departamentos)
        setListaDepartamentos (data_departamentos.departamentos)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridDepartamentos([])
        setListaDepartamentos ([])
        dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, false).get_departamentos_filter))
        dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, false).delete_departamento))
    }

    useEffect(() => {
        return () => {
            setListaGridDepartamentos([])
            setListaDepartamentos ([])
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 0, {}, true).get_departamentos_filter))
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 0, {}, true).delete_departamento))
        }
    },[])

    return (
        <div className='position-relative' style={{width: '100%', minHeight: 720 / proporcional, paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Departamentos
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_departamentos_filter && get_departamentos_filter.departamentos ? begin + get_departamentos_filter.departamentos.length : 0} de ${total_departamentos}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_departamento === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewAreaEmpresa('lista')}/>
                    <img src={view_departamento === 'grid' || view_departamento === '' ? view_grid_v1 : view_grid_v2} 
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
                lista_grid_departamentos && lista_grid_departamentos.length > 0 && view_departamento === 'grid' ? (
                    lista_grid_departamentos.map ((departamento, numdep) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardDepartamentoCell departamento={departamento} key={numdep} index={numdep} proporcional={proporcional} view_departamento={view_departamento}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_departamentos && lista_departamentos.length > 0 && view_departamento === 'lista' ? (
                        lista_departamentos.map ((departamento, numdep) => {
                            return (
                                <CardDepartamentoCell departamento={departamento} key={numdep} index={numdep} proporcional={proporcional} view_departamento={view_departamento}/>
                            )
                        })
                ) : null
            }                  
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_departamento === 'grid' || view_departamento === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_departamentos(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_departamentos ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_departamentos(); window.scrollTo(0, 0)}}>
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
                onClick={() => navigate ('/panel/empresa/departamentos/nuevo')}>
                <img src={agregar_nuevo} style={{width: 64 / proporcional, height: 64 / proporcional, padding: 16 / proporcional}}/>
            </div>
        </div>
    )
}
