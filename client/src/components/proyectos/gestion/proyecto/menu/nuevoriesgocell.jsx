import React from 'react'

export default function NuevoRiesgoCell({proporcional, riesgo_proyecto}) {
    

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                background: '#007bff' }}>
                <h2 style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 600, marginBottom: 0,
                    fontFamily: 'Merriweather', color: 'white'}}>Nuevo riesgo
                </h2>
            </div>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Riesgo: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}>
                        <br/>{riesgo_proyecto.riesgo}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Versión: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}>
                        <br/>{riesgo_proyecto.mitigacion}</span>
                </h4>
            </div>
        </div>
    )
}
