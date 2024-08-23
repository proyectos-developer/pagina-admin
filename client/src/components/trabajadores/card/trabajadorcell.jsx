import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { set_data_trabajadores } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

export default function CardTrabajadorCell ({proporcional, index, trabajador}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)

    const ver_trabajador = () => {
        dispatch (set_data_trabajadores(trabajador))
        window.scrollTo(0, 0)
        navigate (`/panel/trabajadores/trabajador/${trabajador.apellidos}/${trabajador.id}`)
    }

    return (
        <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%'}}>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}
                onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}
                onClick={() => ver_trabajador()}>
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
                        {trabajador.nombres} {trabajador.apellidos}
                    </h4>
                    <h6 style={{fontSize: 12 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: 'rgb(89, 89, 89)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, textAlign: 'left'}}>
                        Área empresa: {trabajador.area_empresa}
                    </h6>
                    <h6 style={{fontSize: 12 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: 'rgb(89, 89, 89)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, textAlign: 'left'}}>
                        Cargo: {trabajador.cargo}
                    </h6>
                </div>
            </div>
        </div>
    )
}
