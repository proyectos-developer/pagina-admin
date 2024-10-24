import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import CardProveedor from './card/proveedor.jsx'
import {proveedoresdata} from '../../../redux/slice/proveedoresdata.js'
import { proveedoresConstants } from '../../../uri/proveedores-constants.js'
import { useNavigate } from 'react-router-dom'

export default function ListaProveedores ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [begin, setBegin] = useState(0)
    const amount = 16

    const [search_proveedor, setSearchProveedor] = useState('')
    const [reset, setReset] = useState(false)

    const [lista_proveedores, setListaProveedores] = useState ([])
    const [total_proveedores, setTotalProoveedores] = useState(0)

    const [boton_nuevo, setBotonNuevo] = useState (false)
    const [boton_reset, setBotonReset] = useState (false)

    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_proveedores_filter, delete_proveedor} = useSelector(({proveedores_data}) => proveedores_data)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, begin, amount, {}, false).get_proveedores_filter))
    }, [])

    useEffect(() => {
        if (get_proveedores_filter && get_proveedores_filter.success === true && get_proveedores_filter.proveedores){
            setTotalProoveedores (get_proveedores_filter.total_proveedores)
            setListaProveedores (get_proveedores_filter.proveedores)
        }
    }, [get_proveedores_filter])

    useEffect(() => {
        if (delete_proveedor && delete_proveedor.success === true && delete_proveedor.proveedores){
            setTotalProoveedores (delete_proveedor.total_proveedores)
            setListaProveedores (delete_proveedor.proveedores)
        }
    }, [delete_proveedor])

    const buscar_proveedores = (value) => {
        if (value !== ''){
            dispatch(proveedoresdata(proveedoresConstants(0, value, 0, 0, 0, 16, {}, false).get_proveedores_filter))
        }else{
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 16, {}, false).get_proveedores_filter))
        }
        setReset(true)
        setSearchProveedor(value)
    }

    const next_proveedores = () => {
        if (begin + amount > total_proveedores){

        }else{
            setBegin (begin + amount)
            dispatch (proveedoresdata(proveedoresConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_proveedores_filter))
        }
    }

    const previous_proveedores = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (proveedoresdata(proveedoresConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_proveedores_filter))
        }
    }

    const resetear_data = () => {
        setBegin(0)
        setListaProveedores ([])
        setReset(false)
        setSearchProveedor('')
        dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 16, {}, false).get_proveedores_filter))
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
                    proveedores
                </p>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', minHeight: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '32%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${50 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Proveedores
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_proveedores_filter && get_proveedores_filter.proveedores ? begin + get_proveedores_filter.proveedores.length : 0} de ${total_proveedores}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-center' style={{width: '32%', height: 'auto'}}>
                    <div className='d-flex rounded' 
                        style={{width: reset ? 610 / proporcional : 400 / proporcional, height: 50 / proporcional}}>
                        <input 
                            id='search_proveedor'
                            className='form-control rounded-0 border-0'
                            style={{width: 400 / proporcional, height: 50 / proporcional, fontSize: 16 / proporcional,
                                    fontFamily: 'Poppins, sans-serif', fontWeight: 400,
                                    marginRight: reset ? 10 / proporcional : 0}}
                            value={search_proveedor}
                            onChange={(event) => buscar_proveedores(event.target.value)}
                            placeholder='Buscar por nombre, departamento, documento...'
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
                <div className='d-flex justify-content-end' style={{width: '32%', height: 50 / proporcional}}>
                    <div className={boton_nuevo ? 'shadow rounded' : 'rounded'} 
                        style={{width: 250 / proporcional, height: 50 / proporcional, background: '#28A745',
                                cursor: 'pointer'}}
                            onClick={() => navigate('/panel/almacen/proveedores/nuevo')}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nuevo proveedor
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional,
                    padding: 10 / proporcional, background: 'white', borderBottom: '1px solid #4a4a4a'}}>
                <div className='d-flex justify-content-between' style={{width: '70%', height: 40 / proporcional}}>
                    <div className='' style={{width: '30%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Nombre empresa
                        </h4>
                    </div>
                    <div className='' style={{width: '26.5%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Tipo proveedor
                        </h4>
                    </div>
                    <div className='' style={{width: '26.5%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Correo
                        </h4>
                    </div>
                    <div className='' style={{width: '26.5%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Teléfono
                        </h4>
                    </div>
                </div>
                <div className='d-flex justify-content-end' style={{width: '30%', height: 40 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center',
                            cursor: 'default'}}>
                            Acciones
                        </h4>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', minHeight: 500 / proporcional}}>
                {
                    lista_proveedores && lista_proveedores.length > 0 ? (
                        lista_proveedores.map ((proveedor, index) => {
                            return (
                                <CardProveedor proporcional={proporcional} key={index} index={index} proveedor={proveedor}/>
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
                                onClick={() => {previous_proveedores(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_proveedores ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_proveedores(); window.scrollTo(0, 0)}}>
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
