import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_cliente } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import view from '../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../assets/iconos/comun/view_v1.png'
import on from '../../../assets/iconos/comun/on.png'
import off from '../../../assets/iconos/comun/off.png'

import {clientesdata} from '../../../redux/slice/clientesdata'
import { clientesConstants } from '../../../uri/clientes-constants'

export default function CardCliente ({proporcional, index, cliente, view_cliente}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [habilitado, setHabilitado] = useState(false)

    const [over_card, setOverCard] = useState(false)
    const [mouse_view, setMouseView] = useState(false)

    useEffect(() => {
        setHabilitado (cliente.habilitado)
    }, [])

    const ver_cliente = () => {
        console.log ('cliente', cliente)
        dispatch (set_data_cliente(cliente))
        navigate (`/panel/compradores/comprador/${cliente.apellidos.replace(' ', '-')}/${cliente.usuario_cliente}`)
    }

    const habilitar_on_off = () => {
        const data = {
            habilitado: !habilitado
        }
        setHabilitado(!habilitado)
        dispatch(clientesdata(clientesConstants(cliente.usuario, 0, 0, 0, 0, 0, data, false).update_estado_cliente))
    }

    return (
        <div key={index} style={{width: '100%', height: '100%'}}>
            {
                view_cliente === 'grid' ? (
                    <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%',
                        background: 'rgba(244, 244, 244, 0.6)', border: '1px solid #28a745'}}
                        onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                                    <div className='rounded-circle' src={cliente.url_foto} style={{width: '100%', height: '100%'}}/>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 20 / proporcional, lineHeight: `${26 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    {cliente.nombres} {cliente.apellidos}
                                </h4>
                            </div>
                        </div>
                        {
                            over_card ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 8 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_cliente()}
                                            onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                                                
                                    <img src={habilitado ? on : off} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 8 / proporcional, cursor: 'pointer'}}
                                            onClick={() => habilitar_on_off()}/>
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
                                <div className='' style={{width: '62%', height: 40 / proporcional}}>
                                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        {cliente.nombres} {cliente.apellidos}
                                    </h4>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: '32%', height: 40 / proporcional}}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_cliente()}
                                            onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                                    <img src={habilitado ? on : off} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 8 / proporcional, cursor: 'pointer'}}
                                            onClick={() => habilitar_on_off()}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
