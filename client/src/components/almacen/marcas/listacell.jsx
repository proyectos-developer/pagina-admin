import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import CardMarcaCell from './card/marcacell.jsx'
import {marcasdata} from '../../../redux/slice/marcasdata.js'
import { marcasConstants } from '../../../uri/marcas-constants.js'
import { useNavigate } from 'react-router-dom'

export default function ListaMarcasCell ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [begin, setBegin] = useState(0)
    const amount = 16

    const [search_marca, setSearchMarca] = useState('')
    const [reset, setReset] = useState(false)

    const [lista_marcas, setListaMarcas] = useState ([])
    const [total_marcas, setTotalMarcas] = useState(0)

    const [boton_nuevo, setBotonNuevo] = useState (false)
    const [boton_reset, setBotonReset] = useState (false)

    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_marcas_filter, delete_marca} = useSelector(({marcas_data}) => marcas_data)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(marcasdata(marcasConstants(0, 0, 0, 0, begin, amount, {}, false).get_marcas_filter))
    }, [])

    useEffect(() => {
        if (get_marcas_filter && get_marcas_filter.success === true && get_marcas_filter.marcas){
            setTotalMarcas (get_marcas_filter.total_marcas)
            setListaMarcas (get_marcas_filter.marcas)
        }
    }, [get_marcas_filter])

    useEffect(() => {
        if (delete_marca && delete_marca.success === true && delete_marca.marcas){
            setTotalMarcas (delete_marca.total_marcas)
            setListaMarcas (delete_marca.marcas)
        }
    }, [delete_marca])

    const buscar_marcas = (value) => {
        if (value !== ''){
            dispatch(marcasdata(marcasConstants(0, value, 0, 0, 0, 16, {}, false).get_marcas_filter))
        }else{
            dispatch(marcasdata(marcasConstants(0, 0, 0, 0, 0, 16, {}, false).get_marcas_filter))
        }
        setReset(true)
        setSearchMarca(value)
    }

    const next_marcas = () => {
        if (begin + amount > total_marcas){

        }else{
            setBegin (begin + amount)
            dispatch (marcasdata(marcasConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_marcas_filter))
        }
    }

    const previous_marcas = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (marcasdata(marcasConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_marcas_filter))
        }
    }

    const resetear_data = () => {
        setBegin(0)
        setListaMarcas ([])
        setReset(false)
        setSearchMarca('')
        dispatch(marcasdata(marcasConstants(0, 0, 0, 0, 0, 16, {}, false).get_marcas_filter))
    }

    useEffect(() => {
        return () => {
            
        }
    },[])

    return (
        <div className='position-relative' style={{width: '100%', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel')}>
                    Inicio 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/almacen')}>
                    almacén
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    marcas
                </p>
            </div>
            <div className='' style={{width: '100%', minHeight: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${50 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Marcas
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_marcas_filter && get_marcas_filter.marcas ? begin + get_marcas_filter.marcas.length : 0} de ${total_marcas}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 50 / proporcional}}>
                    <div className={boton_nuevo ? 'shadow rounded' : 'rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#28A745',
                                cursor: 'pointer'}}
                            onClick={() => navigate('/panel/almacen/marcas/nuevo')}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nueva marca
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='rounded' 
                    style={{width: '100%', height: 'auto'}}>
                    <input 
                        id='search_marca'
                        className='form-control rounded-0 border-0'
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional,
                                fontFamily: 'Poppins, sans-serif', fontWeight: 400,
                                marginBottom: 16 / proporcional}}
                        value={search_marca}
                        onChange={(event) => buscar_marcas(event.target.value)}
                        placeholder='Buscar por nombre, departamento, documento...'
                    />
                    {
                        reset ? (
                            <div className={boton_reset ? 'shadow rounded' : 'rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#28A745',
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
            <div className='d-flex justify-content-between' style={{width: '100%', height: 100 / proporcional,
                    padding: 10 / proporcional, background: 'white', borderBottom: '1px solid #4a4a4a'}}>
                <div className='d-flex justify-content-between' style={{width: '70%', height: 80 / proporcional}}>
                    <div className='' style={{width: '100%', height: 80 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Nombre marca
                        </h4>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Nombre contácto
                        </h4>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Correo
                        </h4>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Teléfono
                        </h4>
                    </div>
                </div>
                <div className='d-flex justify-content-end' style={{width: '30%', height: 80 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 80 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${80 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center',
                            cursor: 'default'}}>
                            Acciones
                        </h4>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', minHeight: 500 / proporcional}}>
                {
                    lista_marcas && lista_marcas.length > 0 ? (
                        lista_marcas.map ((marca, index) => {
                            return (
                                <CardMarcaCell proporcional={proporcional} key={index} index={index} marca={marca}/>
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
                                onClick={() => {previous_marcas(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_marcas ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_marcas(); window.scrollTo(0, 0)}}>
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
