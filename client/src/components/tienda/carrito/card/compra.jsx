import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_compras } from '../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import view from '../../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../../assets/iconos/comun/view_v1.png'
import axios from 'axios'
import { constantes } from '../../../../uri/constantes'

export default function CardCompra ({proporcional, index, compra, view_compra}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [cliente, setCliente] = useState({})
    const [fecha_compra, setFechaCompra] = useState('')
    const [nro_productos, setNroProductos] = useState (0)
    const [total_compra, setTotalCompra] = useState (0)

    const [over_card, setOverCard] = useState(false)
    const [mouse_view, setMouseView] = useState(false)

    useEffect(() => {
        axios.get (`${constantes().url_principal[0].url}/cliente/${compra.usuario}`)
            .then ((res) => {
                setCliente (res.data.cliente)
                setFechaCompra(compra.fecha_compra)
                axios.get (`${constantes().url_principal[0].url}/productos/compra/cliente/resumen/${compra.shop_id}`)
                    .then ((res) => {
                        setNroProductos(res.data.nro_productos)
                        setTotalCompra(res.data.total_compra)
                    }).catch ((err) => {

                    })
            }).catch ((err) => {

            })
    }, [])

    const ver_favorito = () => {
        dispatch(set_data_compras(compra))
        navigate (`/panel/compras/productos/${compra.shop_id}`)
    }

    return (
        <div key={index} style={{width: '100%', height: '100%'}}>
            {
                view_compra === 'grid' ? (
                    <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%',
                        background: 'rgba(244, 244, 244, 0.6)', border: '1px solid #28a745'}}
                        onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                                    <img className='rounded-circle' src={cliente.url_foto} style={{width: 148 / proporcional, height: 148 / proporcional}}/>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Fecha de compra: <br/><span style={{color: '#007BFF', fontSize: 18 / proporcional}}>
                                    {fecha_compra}</span>
                                </h4>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Cliente: <span style={{color: '#007BFF', fontSize: 18 / proporcional}}>
                                    {cliente && cliente.nombres ? `${cliente.nombres.slice(0, 1)}. ${cliente.apellidos}` : ''}</span>
                                </h6>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Nro de productos: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>{nro_productos}</span>
                                </h6>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Total compra: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>S/.{total_compra}</span>
                                </h6>
                            </div>
                        </div>
                        {
                            over_card ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 8 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_favorito()}
                                            onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>

                                </div>
                            ) : null
                        }
                    </div>
                ) : (
                    <div key={index} className='rounded' style={{width: '100%', height: 80 / proporcional, 
                            background: over_card ? 'rgba(244, 244, 244, 1)' : 'rgba(244, 244, 244, 0.6)', 
                            borderBottom: '1px solid #28a745'}}>
                        <div style={{width: '100%', height: 80 / proporcional, padding: 10 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                                <div style={{width: '90%', height: 60 / proporcional}}>
                                    <div className='d-flex' style={{width: '100%', height: 40 / proporcional}}>
                                        <div className='' style={{width: '48%', height: 40 / proporcional}}>
                                            <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                                Fecha compra: <span style={{color: '#007BFF', fontSize: 18 / proporcional}}>{fecha_compra}</span>
                                            </h4>
                                        </div>
                                        <div className='' style={{width: '48%', height: 40 / proporcional}}>
                                            <h6 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                                Cliente: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>
                                                {cliente && cliente.nombres ? `${cliente.nombres.slice(0, 1)}. ${cliente.apellidos}` : ''}</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div className='d-flex' style={{width: '100%', height: 20 / proporcional}}>
                                        <div className='' style={{width: '48%', height: 20 / proporcional}}>
                                            <h4 style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                                Nro productos: <span style={{color: '#007BFF', fontSize: 18 / proporcional}}>{nro_productos}</span>
                                            </h4>
                                        </div>
                                        <div className='' style={{width: '48%', height: 20 / proporcional}}>
                                            <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                                Total compra: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>S/. {total_compra}</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>                                    
                                <div className='d-flex justify-content-end' style={{width: '10%', height: 60 / proporcional, padding: 10 / proporcional}}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_favorito()}
                                            onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
