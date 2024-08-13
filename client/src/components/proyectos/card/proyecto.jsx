import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { set_data_proyecto } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

export default function CardProyecto ({proporcional, index, proyecto}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)

    const ver_proyecto = () => {
        dispatch (set_data_proyecto(proyecto))
        navigate (`/panel/proyectos/${proyecto.nombre_proyecto.replace(' ', '-')}/${proyecto.id}`)
    }

    return (
        <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%'}}>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}
                onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}
                onClick={() => ver_proyecto()}>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                        <img className='rounded-circle' src={proyecto.url_imagen} style={{width: '100%', height: '100%'}}/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto'}}>
                    <h4 style={{fontSize: 20 / proporcional, lineHeight: `${26 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                        {proyecto.nombre_proyecto}
                    </h4>
                </div>
            </div>
        </div>
    )
}
