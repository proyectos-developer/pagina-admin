import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_productos } from '../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import view from '../../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../../assets/iconos/comun/view_v1.png'

export default function CardProductoCell ({proporcional, index, producto, view_compra}) {

    const [over_card, setOverCard] = useState(false)
    const [mouse_view, setMouseView] = useState(false)

    const ver_producto = () => {
        //dispatch (set_data_productos(producto))
        //navigate (`/panel/productos/producto/${producto.producto.replace(' ', '-')}/${producto.id}`)
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
                                    {
                                        producto.url_foto !== '' ? (
                                            <img className='rounded-circle' src={producto.url_foto} 
                                                style={{width: 148 / proporcional, height: 148 / proporcional}}/>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Producto: <span style={{color: '#007BFF', fontSize: 18 / proporcional}}>{producto.producto}</span>
                                </h4>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Cantidad pagada: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>{producto.cantidad}</span>
                                </h6>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Total pagado: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>S/. {producto.precio_total}</span>
                                </h6>
                            </div>
                        </div>
                        {
                            over_card ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                                    <div className='d-flex justify-content-center' style={{width: '60%', height: 'auto'}}>
                                        <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => ver_producto()}
                                                onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                                    </div>
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
                                    <div style={{width: '100%', height: 40 / proporcional}}>
                                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                            <span style={{fonstSize: 16 / proporcional}}><strong>{index + 1}. </strong></span>Producto: <span style={{color: '#007BFF', fontSize: 18 / proporcional}}>{producto.producto}</span>
                                        </h4>
                                    </div>
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 20 / proporcional}}>
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                                Cantidad pagada: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>{producto.cantidad}</span>
                                            </h6>
                                        </div>
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                                Total pagado: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>S/. {producto.precio_total}</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: '10%', height: 60 / proporcional,
                                        padding: 10 / proporcional
                                }}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_producto()}
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
