import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { set_data_editable, set_data_personal} from '../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import view from '../../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../../assets/iconos/comun/view_v1.png'
import axios from 'axios'
import { constantes } from '../../../../uri/constantes'

export default function CardCumpleaniosTablet ({proporcional, index, cumpleanio}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)
    const [mouse_view, setMouseView] = useState(false)

    const ver_cumpleanios = () => {
        axios.get (`${constantes().url_principal[0].url}/personal/${cumpleanio.id}`)
            .then ((res) => {
                dispatch (set_data_editable(false))
                dispatch(set_data_personal(res.data.trabajador))
                navigate (`/panel/rrhh/personal/trabajador/${res.data.trabajador.nombres.replace(' ', '-')}/${res.data.trabajador.id}`)
            }).catch ((res) => {

            })
    }

    return (
        <div key={index} className='rounded' style={{width: '100%', height: 'auto', 
                background: over_card ? 'rgba(244, 244, 244, 1)' : 'white', 
                borderBottom: '1px solid rgb(74, 74, 74, 0.5)'}}>
            <div style={{width: '100%', height: 'auto', padding: 5 / proporcional, cursor: 'pointer'}}
                onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                    <div className='d-flex justify-content-between' style={{width: '70%', height: 60 / proporcional}}>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                            <div className='' style={{width: '48%', height: 60 / proporcional}}>
                                <div className='' style={{width: '100%', height: 30 / proporcional}}>
                                    <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{cumpleanio.nombres.slice(0, 1)}. {cumpleanio.apellidos}</span>
                                    </p>
                                </div>
                                <div className='' style={{width: '100%', height: 30 / proporcional}}>
                                    <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{cumpleanio.departamento}</span>
                                    </p>
                                </div>
                            </div>
                            <div className='' style={{width: '48%', height: 60 / proporcional}}>
                                <div className='' style={{width: '100%', height: 30 / proporcional}}>
                                    <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{(new Date(cumpleanio.fecha_nacimiento)).toDateString()}</span>
                                    </p>
                                </div>
                                <div className='' style={{width: '100%', height: 30 / proporcional}}>
                                    <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{cumpleanio.edad}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '30%', height: 60 / proporcional,
                        paddingTop: 15 / proporcional, paddingBottom: 15 / proporcional
                    }}>
                        <div className='d-flex justify-content-center' style={{width: '33%', height: 30 / proporcional}}>
                            <img src={mouse_view ? view_select : view} style={{width: 30 / proporcional, height: 30 / proporcional, 
                                    padding: 7 / proporcional, cursor: 'pointer'}}
                                    onClick={() => ver_cumpleanios()}
                                    onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
