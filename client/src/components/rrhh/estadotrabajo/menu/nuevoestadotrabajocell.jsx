import React from 'react'

import save from '../../../../assets/iconos/comun/guardado_exitoso.png'

export default function NuevoEstadoTrabajoCell({proporcional, estado}) {

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='d-flex' style={{width: '100%', height: 'auto', padding: 5 / proporcional, paddingBottom: 0,
                background: '#007bff' }}>
                <img src={save} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 7 / proporcional,
                    marginRight: 10 / proporcional}}/>
                <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    fontFamily: 'Poppins, sans-serif', color: 'white'}}>Opereación exitosa
                </p>
            </div>
            <div className='' style={{width: '100%', height: 'auto', padding: 10 / proporcional }}>
                <h2 style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Se ha guardado la información de <strong style={{color: '#007bff'}}>({estado.nombres} {estado.apellidos})</strong>
                </h2>
            </div>
        </div>
    )
}
