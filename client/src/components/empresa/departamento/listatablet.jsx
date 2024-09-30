import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import CardDepartamentoTablet from './card/departamentotablet.jsx'
import {departamentosdata} from '../../../redux/slice/departamentosdata.js'
import { departamentosConstants } from '../../../uri/departamentos-constants.js'
import { useNavigate } from 'react-router-dom'

export default function ListaDepartamentosEmpresaTablet ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [begin, setBegin] = useState(0)
    const amount = 16

    const [search_departamento, setSearchDepartamento] = useState('')
    const [reset, setReset] = useState(false)

    const [lista_departamentos, setListaDepartamentos] = useState ([])
    const [total_departamentos, setTotalDepartamentos] = useState(0)

    const [boton_nuevo, setBotonNuevo] = useState (false)
    const [boton_reset, setBotonReset] = useState (false)

    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_departamentos_filter, delete_departamento} = useSelector(({departamentos_data}) => departamentos_data)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, begin, amount, {}, false).get_departamentos_filter))
    }, [])

    useEffect(() => {
        if (get_departamentos_filter && get_departamentos_filter.success === true && get_departamentos_filter.departamentos){
            setTotalDepartamentos(get_departamentos_filter.total_departamentos)
            setListaDepartamentos (get_departamentos_filter.departamentos)
        }
    }, [get_departamentos_filter])

    useEffect(() => {
        if (delete_departamento && delete_departamento.success === true && delete_departamento.departamentos){
            window.scrollTo(0, 0)
            setBegin(0)
            setTotalDepartamentos(delete_departamento.total_departamentos)
            setListaDepartamentos (delete_departamento.departamentos)
            dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, true).delete_departamento))
        }
    }, [delete_departamento])

    const buscar_departamento = (value) => {
        if (value !== ''){
            dispatch(departamentosdata(departamentosConstants(0, value, 0, 0, 0, 16, {}, false).get_departamentos_filter))
        }else{
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, false).get_departamentos_filter))
        }
        setReset(true)
        setSearchDepartamento(value)
    }

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

    const resetear_data = () => {
        setBegin(0)
        setListaDepartamentos ([])
        setReset(false)
        dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, false).get_departamentos_filter))
        dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, false).delete_departamento))
    }

    useEffect(() => {
        return () => {
            
        }
    },[])

    return (
        <div className='position-relative' style={{width: '100%', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', minHeight: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '60%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${50 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Departamentos
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_departamentos_filter && get_departamentos_filter.departamentos ? begin + get_departamentos_filter.departamentos.length : 0} de ${total_departamentos}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '38%', height: 50 / proporcional}}>
                    <div className={boton_nuevo ? 'shadow rounded' : 'rounded'} 
                        style={{width: 250 / proporcional, height: 50 / proporcional, background: '#28A745',
                                cursor: 'pointer'}}
                            onClick={() => navigate('/panel/empresa/departamentos/nuevo')}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nuevo departamento
                        </p>
                    </div>
                </div>
            </div>
            <div className={'d-flex justify-content-center'} style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='d-flex rounded' 
                    style={{width: reset ? 610 / proporcional : 400 / proporcional, height: 50 / proporcional}}>
                    <input 
                        id='search_departamento'
                        className='form-control rounded-0 border-0'
                        style={{width: 400 / proporcional, height: 50 / proporcional, fontSize: 16 / proporcional,
                                fontFamily: 'Poppins, sans-serif', fontWeight: 400,
                                marginRight: reset ? 10 / proporcional : 0}}
                        value={search_departamento}
                        onChange={(event) => buscar_departamento(event.target.value)}
                        placeholder='Buscar por nombre de departamento'
                    />
                    {
                        reset ? (
                            <div className={boton_reset ? 'shadow rounded' : 'rounded'} 
                                style={{width: 200 / proporcional, height: 50 / proporcional, background: '#28A745',
                                        cursor: 'pointer'}}
                                    onClick={() => resetear_data()}
                                    onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    resetear
                                </p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional,
                    padding: 10 / proporcional, background: 'white', borderBottom: '1px solid #4a4a4a'}}>
                <div className='' style={{width: '50%', height: 40 / proporcional}}>
                    <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                        color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                        cursor: 'default'}}>
                        Nombre
                    </h4>
                </div>
                <div className='' style={{width: '20%', height: 40 / proporcional}}>
                    <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                        color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                        cursor: 'default'}}>
                        Jefe
                    </h4>
                </div>
                <div className='d-flex justify-content-end' style={{width: '30%', height: 40 / proporcional}}>
                    <div className='' style={{width: '100%', height: 30 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'right',
                            cursor: 'default'}}>
                            Acción
                        </h4>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', minHeight: 500 / proporcional}}>
                {
                    lista_departamentos && lista_departamentos.length > 0 ? (
                        lista_departamentos.map ((departamento, index) => {
                            return (
                                <CardDepartamentoTablet proporcional={proporcional} key={index} index={index} departamento={departamento}/>
                            )
                        })
                    ) : null
                }
            </div>              
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: 16 / proporcional
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
        </div>
    )
}
