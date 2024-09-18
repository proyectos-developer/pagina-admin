import React from 'react'

export default function NuevoServicioTablet({proporcional, servicio}) {

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                background: '#007bff' }}>
                <h2 style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 600, marginBottom: 0,
                    fontFamily: 'Merriweather', color: 'white'}}>Nueva categoría
                </h2>
            </div>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                <div className='d-flex justify-content-center rounded-circle' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    {
                        servicio.url_foto !== '' ? (
                            <img className='rounded-circle' src={servicio.url_foto} 
                                style={{width: 200 / proporcional, height: 200 / proporcional,
                                    border: '1px solid #4a4a4a'}}/>

                        ) : null
                    }
                </div>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Sericio: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {servicio.servicio}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Descripción: 
                    <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {servicio.descripcion}</span>
                </h4>
            </div>
        </div>
    )
}
