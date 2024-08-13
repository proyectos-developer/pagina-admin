import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { set_data_negocio } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

export default function CardNegocio ({proporcional, index, negocio}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)

    const ver_negocio = () => {
        dispatch (set_data_negocio(negocio))
        navigate (`/panel/clientes/cliente/${negocio.nombre_negocio.replace(' ', '-')}/${negocio.id}`)
    }

    return (
        <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%'}}>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}
                onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}
                onClick={() => ver_negocio()}>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                        <img className='rounded-circle' src={negocio.url_logo} style={{width: '100%', height: '100%'}}/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto'}}>
                    <h4 style={{fontSize: 20 / proporcional, lineHeight: `${26 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                        {negocio.nombre_negocio}
                    </h4>
                </div>
            </div>
        </div>
    )
}
