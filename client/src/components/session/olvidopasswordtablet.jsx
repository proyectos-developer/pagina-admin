import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {correosdata} from '../../redux/slice/correosdata'
import { correosConstants } from '../../uri/correos-constants'

export default function OlvidoPasswordTablet ({proporcional}) {
        
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [correo, setCorreo] = useState('')
    
    const [ecorreo, setECorreo] = useState(false)

    const [boton_envio_correo, setBotonEnvioCorreo] = useState(false)

    const {local_correo_cambio_password} = useSelector(({correos_data}) => correos_data)

    useEffect(() => {
        if (local_correo_cambio_password && local_correo_cambio_password.message && local_correo_cambio_password.usuario){
            dispatch(correosdata(correosConstants(0, {}, true).local_correo_cambio_password))
            window.localStorage.setItem ('correo', correo)
            navigate ('/cambiar-password')
        }
    }, [local_correo_cambio_password])

    const envio_correo = () => {
        if (correo === ''){
            setECorreo(correo === '' ? true : false)
        }else{
            setECorreo(false)

            const data_sesion = {
                correo: correo
            }
            dispatch (correosdata(correosConstants(0, data_sesion, false).local_correo_cambio_password))
        }
    }

    return (
        <div className='' 
            style={{width: '100%', height: 'auto'}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                <div className='shadow-lg rounded' style={{width: '80%', height: 'auto', padding: 50 / proporcional}}>
                    <div style={{width: '100%', height: 'auto'}}>
                        <h2 style={{fontSize: 28 / proporcional, lineHeight: `${28 / proporcional}px`,
                            marginBottom: 32 / proporcional, fontWeight: 600, fontFamily: 'Merriweather', textAlign: 'center',
                            color: '#007BFF'}}>
                            Cambio de contraseña
                        </h2>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto',
                                marginBottom: 16 / proporcional}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`,
                                marginBottom: 0 / proporcional, fontWeight: 500, fontFamily: 'Merriweather', textAlign: 'center',
                                color: 'rgb(89, 89, 89)'}}>
                                Le enviaremos un link a su correo para que cambie su contraseña.
                            </p>
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{fontSize: 14 / proporcional, color: 'rgb(129, 129, 129)', fontWeight: 500,
                                        marginBottom: 5 / proporcional, lineHeight: `${20 / proporcional}px`}}>
                                    Correo electrónico <span style={{color: 'red'}}>(*)</span>
                                </span>
                                <input 
                                    id='correo'
                                    className='forn-control rounded'
                                    type='e-mail'
                                    value={correo}
                                    onChange={(event) => setCorreo(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional,
                                            fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', fontWeight: 500,
                                            border: ecorreo ? '1px solid red' : '1px solid rgb(189, 189, 189)',
                                            fontFamily: 'Poppins, sans-serif',
                                            paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}
                                    placeholder='Correo electrónico'/>
                            </div>
                            <div className={boton_envio_correo ? 'rounded shadow' : 'rounded shadow-sm'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF',
                                        cursor: 'pointer'}} onMouseOver={() => setBotonEnvioCorreo(true)}
                                        onMouseLeave={() => setBotonEnvioCorreo(false)}
                                onClick={() => envio_correo()}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    marginBottom: 0 / proporcional, fontWeight: 600, fontFamily: 'Poppins, sans-serif', 
                                    textAlign: 'center', color: 'white'}}>
                                    Enviar correo
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
