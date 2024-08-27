import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_suscriptores } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import view from '../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../assets/iconos/comun/view_v1.png'
import trash from '../../../assets/iconos/comun/trash_v2.png'
import trash_select from '../../../assets/iconos/comun/trash_v1.png'

import {suscripcionesdata} from '../../../redux/slice/suscripcionesdata'
import { suscripcionesConstants } from '../../../uri/suscripciones-constants'
import axios from 'axios'
import { constantes } from '../../../uri/constantes'

export default function CardSuscripcionTablet ({proporcional, index, suscripcion, view_suscripcion}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [cliente, setCliente] = useState({})

    const [over_card, setOverCard] = useState(false)
    const [mouse_view, setMouseView] = useState(false)
    const [mouse_trash, setMouseTrash] = useState(false)

    useEffect(() => {
        axios.get(`${constantes().url_principal[0].url}/cliente/suscriptor/${suscripcion.correo}`)
            .then ((res) => {
                setCliente(res.data.cliente)
            }).catch ((err) => {

            })
    }, [])

    const ver_suscripcion = () => {
        if (cliente && cliente.nombres){
            dispatch (set_data_cliente(cliente))
            navigate (`/panel/compradores/comprador/${cliente.apellidos}/${cliente.usuario}`)
        }
    }

    const eliminar_suscripcion = () => {
        dispatch(suscripcionesdata(suscripcionesConstants(suscripcion.id, 0, 16, {}, false).delete_suscripcion))
    }

    return (
        <div key={index} style={{width: '100%', height: '100%'}}>
            {
                view_suscripcion === 'grid' ? (
                    <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%',
                        background: 'rgba(244, 244, 244, 0.6)', border: '1px solid #28a745'}}
                        onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    cliente && cliente.nombres ? (
                                        <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                                            <img className='rounded-circle' src={cliente.url_foto} style={{width: '100%', height: '100%'}}/>
                                        </div>
                                    ) : (
                                        <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}/>
                                    )
                                }
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                {
                                    cliente && cliente.nombres ? (
                                        <h6 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                            Cliente: <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{cliente.nombres.slice(0, 1)}. {cliente.apellidos}</span>
                                        </h6>
                                    ) : null
                                }
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Correo: <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{suscripcion.correo}</span>
                                </h6>
                            </div>
                        </div>
                        {
                            over_card ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                                    <div className='d-flex justify-content-between' style={{width: '60%', height: 'auto'}}>
                                        <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => ver_suscripcion()}
                                                onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>

                                        <img src={mouse_trash ? trash_select : trash} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => eliminar_suscripcion()}
                                                onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                ) : (
                    <div key={index} className='rounded' style={{width: '100%', height: cliente && cliente.nombres ? 80 / proporcional : 60 / proporcional, 
                            background: over_card ? 'rgba(244, 244, 244, 1)' : 'rgba(244, 244, 244, 0.6)', 
                            borderBottom: '1px solid #28a745'}}>
                        <div style={{width: '100%', height: cliente && cliente.nombres ? 80 / proporcional : 60 / proporcional, padding: 10 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: cliente && cliente.nombres ? 60 / proporcional : 40 / proporcional}}>
                                <div className={cliente && cliente.nombres ? '' : 'd-flex justify-content-between'} style={{width: '100%', height: cliente && cliente.nombres ? 60 / proporcional : 40 / proporcional}}>
                                    {
                                        cliente && cliente.nombres ? (
                                            <div className='' style={{width: cliente && cliente.nombres ? '100%' : '32%', height: 40 / proporcional}}>
                                                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                                    Cliente: <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{cliente.nombres.slice(0, 1)}. {cliente.apellidos}</span>
                                                </h4>
                                            </div>
                                        ) : null
                                    }
                                    <div className='' style={{width: cliente && cliente.nombres ? '100%' : '32%', height: cliente && cliente.nombres ? 20 / proporcional : 40 / proporcional}}>
                                        <h6 style={{fontSize: 14 / proporcional, lineHeight: `${cliente && cliente.nombres ? 20 / proporcional : 40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                            Correo: <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{suscripcion.correo}</span>
                                        </h6>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: '32%', height: cliente && cliente.nombres ? 60 / proporcional : 40 / proporcional,
                                        padding: cliente && cliente.nombres ? 10 / proporcional : 0
                                }}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_suscripcion()}
                                            onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                                    <img src={mouse_trash ? trash_select : trash} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => eliminar_suscripcion()}
                                            onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
