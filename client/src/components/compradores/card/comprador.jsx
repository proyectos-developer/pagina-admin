import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { set_data_cliente } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

export default function CardComprador ({proporcional, index, cliente}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)

    const ver_cliente = () => {
        dispatch (set_data_cliente(cliente))
        navigate (`/panel/compradores/${cliente.apellidos}/${cliente.id}`)
    }

    return (
        <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%'}}>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}
                onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}
                onClick={() => ver_cliente()}>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                        <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional,
                                border: '1px solid #4f4f4f'
                        }}/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto'}}>
                    <h4 style={{fontSize: 20 / proporcional, lineHeight: `${26 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                        {cliente.nombres} {cliente.apellidos}
                    </h4>
                    <h6 style={{fontSize: 12 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: 'rgb(89, 89, 89)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, textAlign: 'left'}}>
                        Nro teléfono: <span style={{fontSize: 14 / proporcional, color: '#007bff'}}>{cliente.nro_telefono}</span>
                    </h6>
                    <h6 style={{fontSize: 12 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: 'rgb(89, 89, 89)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, textAlign: 'left'}}>
                        Correo: <span style={{fontSize: 14 / proporcional, color: '#007bff'}}>{cliente.correo}</span>
                    </h6>
                </div>
            </div>
        </div>
    )
}
