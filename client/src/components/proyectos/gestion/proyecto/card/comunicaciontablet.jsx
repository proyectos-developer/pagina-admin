import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'

export default function CardComunicacionTablet ({proporcional, index, comunicacion}) {

    const dispatch = useDispatch()
    
    const [over_card, setOverCard] = useState('')

    const obtener_datos_comunicacion = (id) => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(id, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_comunicacion_proyecto))
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 5 / proporcional}}
            onMouseOver={() => setOverCard(comunicacion.id)} onMouseLeave={() => setOverCard('')}>
            <h6 className='rounded' key={index} 
                style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    color: over_card === comunicacion.id ? 'white' : '#4a4a4a', background: over_card === comunicacion.id ? '#007bff' : 'white'}}>{index + 1}. 
                    <span style={{fontSize: 16 / proporcional, fontWeight: 600, cursor: 'pointer'}}
                    onClick={() => obtener_datos_comunicacion(comunicacion.id)}>
                    {comunicacion.tipo_comunicacion}
                </span>
            </h6>
        </div>
    )
}
