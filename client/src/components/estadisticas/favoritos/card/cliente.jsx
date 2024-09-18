import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_cliente } from '../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import view from '../../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../../assets/iconos/comun/view_v1.png'
import axios from 'axios'
import { constantes } from '../../../../uri/constantes'

export default function CardCliente ({proporcional, index, favorito, view_favorito}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [cliente, setCliente] = useState({})
    const [total_veces_compro, setTotalVecesCompro] = useState(0)

    const [over_card, setOverCard] = useState(false)
    const [mouse_view, setMouseView] = useState(false)

    useEffect(() => {
        axios.get (`${constantes().url_principal[0].url}/cliente/${favorito.usuario_cliente}`)
            .then ((res) => {
                setCliente(res.data.cliente)
                axios.get(`${constantes().url_principal[0].url}/favorito/compras/producto/${favorito.id_producto}/${favorito.usuario_cliente}`)
                    .then ((res) => {
                        setTotalVecesCompro(res.data.total_compras)
                    }).catch ((err) => {

                    })
            }).catch ((err) => {

            })
    }, [])

    const ver_favorito = () => {
        //navigate (`/panel/favoritos/producto/${favorito.producto.replace(' ', '-')}/${favorito.id}`)
    }

    return (
        <div key={index} style={{width: '100%', height: '100%'}}>
            {
                view_favorito === 'grid' ? (
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
                                    Cliente: <span style={{color: '#007BFF', fontSize: 18 / proporcional}}>{cliente && cliente.nombres ? cliente.nombres.slice(0, 1) : ''}. {cliente.apellidos}</span>
                                </h4>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Veces compró: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>{total_veces_compro}</span>
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
                    <div key={index} className='rounded' style={{width: '100%', height: '100%', 
                            background: over_card ? 'rgba(244, 244, 244, 1)' : 'rgba(244, 244, 244, 0.6)', 
                            borderBottom: '1px solid #28a745'}}>
                        <div style={{width: '100%', height: 'auto', padding: 10 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                                <div className='' style={{width: '40%', height: 40 / proporcional}}>
                                    <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        Cliente: <span style={{color: '#007BFF', fontSize: 18 / proporcional}}>{cliente && cliente.nombres ? cliente.nombres.slice(0, 1) : ''}. {cliente.apellidos}</span>
                                    </h4>
                                </div>
                                <div className='' style={{width: '40%', height: 40 / proporcional}}>
                                    <h6 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        Veces compró: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>{total_veces_compro}</span>
                                    </h6>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: '10%', height: 40 / proporcional}}>
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
