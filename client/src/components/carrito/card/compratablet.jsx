import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_compras } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import view from '../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../assets/iconos/comun/view_v1.png'
import axios from 'axios'
import { constantes } from '../../../uri/constantes'

export default function CardCompraTablet ({proporcional, index, compra, view_compra}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productos_compra, setProductosCompra] = useState([])
    const [total_compras, setTotalCompras] = useState(0)

    const [over_card, setOverCard] = useState(false)
    const [mouse_view, setMouseView] = useState(false)

    useEffect(() => {
        axios.get(`${constantes().url_principal[0].url}/compras/productos/${compra.shop_id}/0/16`)
            .then ((res) => {
                setProductosCompra(res.data)
                setTotalCompras(res.data.total_compras)
            }).catch ((err) => {

            })
    }, [])

    const ver_compra = () => {
        dispatch (set_data_compras(productos_compra))
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
                            <div style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${26 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Fecha: <span style={{fontSize: 18 / proporcional, color: 'rgb(89, 89, 89)'}}>
                                        {(new Date(compra.fecha_compra)).toDateString()}</span>
                                </h4>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Num productos: <span style={{fontSize: 18 / proporcional, color: 'rgb(89, 89, 89)'}}>
                                        {total_compras}</span>
                                </h6>
                            </div>
                        </div>
                        {
                            over_card ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 8 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_compra()}
                                            onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                                                
                                </div>
                            ) : null
                        }
                    </div>
                ) : (
                    <div key={index} className='rounded' style={{width: '100%', height: '100%', 
                            background: over_card ? 'rgba(244, 244, 244, 1)' : 'rgba(244, 244, 244, 0.6)', 
                            borderBottom: '1px solid #28a745'}}>
                        <div style={{width: '100%', height: 'auto', padding: 10 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                                <div className='' style={{width: '32%', height: 40 / proporcional}}>
                                    <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        Fecha: <span style={{fontSize: 18 / proporcional, color: 'rgb(89, 89, 89)'}}>
                                            {(new Date(compra.fecha_compra)).toDateString()}</span>
                                    </h4>
                                </div>
                                <div className='' style={{width: '20%', height: 40 / proporcional}}>
                                    <h6 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                        Num productos: <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)'}}>
                                            {total_compras}</span>
                                    </h6>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: '32%', height: 40 / proporcional}}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_compra()}
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
