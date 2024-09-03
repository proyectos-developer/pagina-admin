import React from 'react'

export default function NuevaGestionCell({proporcional, gestion_proyecto}) {

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                background: '#007bff' }}>
                <h2 style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 600, marginBottom: 0,
                    fontFamily: 'Merriweather', color: 'white'}}>Nueva gestión de proyecto
                </h2>
            </div>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Nombre: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {gestion_proyecto.nombre_proyecto}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Descripción: 
                    <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {gestion_proyecto.descripcion}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Fecha inicio: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {gestion_proyecto.fecha_inicio}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Fecha finalizacion: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {gestion_proyecto.fecha_finalizacion}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Estado del proyecto: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {gestion_proyecto.estado_proyecto}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Prioridad: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {gestion_proyecto.prioridad}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Presupuesto del proyecto: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}>{gestion_proyecto.moneda}{gestion_proyecto.presupuesto_proyecto}</span>
                </h4>
            </div>
        </div>
    )
}
