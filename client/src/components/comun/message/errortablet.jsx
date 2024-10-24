import React from 'react'

import save from '../../../assets/iconos/comun/error.png'

export default function ErrrorMessageTablet({proporcional}) {

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='d-flex' style={{width: '100%', height: 'auto', padding: 5 / proporcional, paddingBottom: 0,
                background: '#007bff' }}>
                <img src={save} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 7 / proporcional,
                    marginRight: 10 / proporcional}}/>
                <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    fontFamily: 'Poppins, sans-serif', color: 'white'}}>Oops! Algo salió mal
                </p>
            </div>
            <div className='' style={{width: '100%', height: 'auto', padding: 10 / proporcional }}>
                <h2 style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Por favor, inténtalo de nuevo más tarde.
                </h2>
            </div>
        </div>
    )
}
