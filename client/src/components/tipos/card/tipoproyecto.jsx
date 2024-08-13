import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { set_data_tipo_proyecto } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

export default function CardTipoProyecto ({proporcional, index, tipo_proyecto}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)

    const ver_tipo_proyecto = () => {
        dispatch (set_data_tipo_proyecto(tipo_proyecto))
        navigate (`/panel/tipos-proyectos/tipo-proyecto/${tipo_proyecto.nombre.replace(' ', '-')}/${tipo_proyecto.id}`)
    }

    return (
        <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%'}}>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}
                onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}
                onClick={() => ver_tipo_proyecto()}>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                        <img className='rounded-circle' src={tipo_proyecto.url_tipo} style={{width: '100%', height: '100%'}}/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto'}}>
                    <h4 style={{fontSize: 20 / proporcional, lineHeight: `${26 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                        {tipo_proyecto.nombre}
                    </h4>
                </div>
            </div>
        </div>
    )
}
