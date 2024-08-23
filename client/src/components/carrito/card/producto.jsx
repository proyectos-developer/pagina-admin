import React, { useState } from 'react'

export default function CardProducto ({proporcional, index, producto, view_producto}) {

    const [over_card, setOverCard] = useState(false)

    return (
        <div key={index} style={{width: '100%', height: '100%'}}>
            {
                view_producto === 'grid' ? (
                    <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%',
                        background: 'rgba(244, 244, 244, 0.6)', border: '1px solid #28a745'}}
                        onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                                    <img className='rounded-circle' src={producto.url_foto} style={{width: '100%', height: '100%'}}/>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Producto: <span style={{fontSize: 20 / proporcional, color: 'rgb(89, 89, 89)'}}>
                                    {producto.producto}</span>
                                </h4>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600}}>
                                    Cantidad: <span style={{fontSize: 20 / proporcional, color: 'rgb(89, 89, 89)'}}>
                                    {producto.cantidad}</span>
                                </h6>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div key={index} className='rounded' style={{width: '100%', height: '100%', 
                            background: over_card ? 'rgba(244, 244, 244, 1)' : 'rgba(244, 244, 244, 0.6)', 
                            borderBottom: '1px solid #28a745'}}>
                        <div style={{width: '100%', height: 'auto', padding: 10 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                                <div className='' style={{width: '48%', height: 40 / proporcional}}>
                                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        Producto: <span style={{fontSize: 20 / proporcional, color: 'rgb(89, 89, 89)'}}>
                                        {producto.producto}</span>
                                    </h4>
                                </div>
                                <div className='' style={{width: '48%', height: 40 / proporcional}}>
                                    <h6 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600}}>
                                        Cantidad: <span style={{fontSize: 20 / proporcional, color: 'rgb(89, 89, 89)'}}>
                                        {producto.cantidad}</span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
