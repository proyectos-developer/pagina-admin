import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_calificaciones } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import view from '../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../assets/iconos/comun/view_v1.png'

export default function CardCalificacionTablet ({proporcional, index, calificacion, view_calificacion}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)
    const [mouse_view, setMouseView] = useState(false)

    const ver_comentario = () => {
        dispatch (set_data_calificaciones(calificacion))
        navigate (`/panel/calificaciones/producto/${calificacion.producto.replace(' ', '-')}/${calificacion.id}`)
    }

    return (
        <div key={index} style={{width: '100%', height: '100%'}}>
            {
                view_calificacion === 'grid' ? (
                    <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%',
                        background: 'rgba(244, 244, 244, 0.6)', border: '1px solid #28a745'}}
                        onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                                    <img className='rounded-circle' src={calificacion.url_foto} style={{width: '100%', height: '100%'}}/>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 20 / proporcional, lineHeight: `${26 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    {calificacion.producto}
                                </h4>
                            </div>
                        </div>
                        {
                            over_card ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 8 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_comentario()}
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
                                <div className='' style={{width: '42%', height: 40 / proporcional}}>
                                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        {calificacion.producto}
                                    </h4>
                                </div>
                                <div className='' style={{width: '22%', height: 40 / proporcional}}>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: '10%', height: 40 / proporcional}}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_comentario()}
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
