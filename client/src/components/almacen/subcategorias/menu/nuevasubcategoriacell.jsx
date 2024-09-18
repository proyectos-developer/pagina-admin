import React from 'react'

export default function NuevaSubCategoriaCell({proporcional, sub_categoria}) {

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                background: '#007bff' }}>
                <h2 style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 600, marginBottom: 0,
                    fontFamily: 'Merriweather', color: 'white'}}>Nueva sub categoría
                </h2>
            </div>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Sub categoría: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {sub_categoria.sub_categoria}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Categoría: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {sub_categoria.categoria}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Descripción: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {sub_categoria.descripcion}</span>
                </h4>
            </div>
        </div>
    )
}
