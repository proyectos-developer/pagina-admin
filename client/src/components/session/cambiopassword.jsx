import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {begindata} from '../../redux/slice/begindata'
import { beginConstants } from '../../uri/begin-constants'

export default function CambioPassword ({proporcional}) {
        
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [password, setPassowrd] = useState('')
    const [confirmar_password, setConfirmarPassowrd] = useState('')
    
    const [epassword, setEPassword] = useState(false)
    const [econfirmar_password, setEConfirmarPassword] = useState(false)

    const [mensaje, setMensaje] = useState ('')

    const [boton_cambio_password, setBotonCambioPassword] = useState(false)

    const {local_cambio_password} = useSelector(({begin_data}) => begin_data)

    useEffect(() => {
        if (local_cambio_password && local_cambio_password.success === true && local_cambio_password.user){
            dispatch(begindata(beginConstants(0, {}, true).local_cambio_password))
            window.localStorage.removeItem('correo')
            navigate ('/')
        }
    }, [local_cambio_password])

    const cambio_contraseña = () => {
        if (password === '' || confirmar_password !== password || confirmar_password === ''){
            setEPassword(password === '' ? true : false)
            setEConfirmarPassword(confirmar_password === '' ? true : false)
            setMensaje(password !== confirmar_password ? true : false)
        }else{
            setEPassword(false)
            setEConfirmarPassword(false)
            setMensaje ('')

            const data_sesion = {
                password: password
            }
            dispatch (begindata(beginConstants(window.localStorage.getItem ('correo'), data_sesion, false).local_cambio_password))
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
                        <div style={{width: '100%', height: 'auto'}}>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{fontSize: 14 / proporcional, color: 'rgb(129, 129, 129)', fontWeight: 500,
                                        marginBottom: 5 / proporcional, lineHeight: `${20 / proporcional}px`}}>
                                    Contraseña <span style={{color: 'red'}}>(*)</span>
                                </span>
                                <input 
                                    id='password'
                                    className='forn-control rounded'
                                    type='password'
                                    value={password}
                                    onChange={(event) => setPassowrd(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional,
                                            fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', fontWeight: 500,
                                            border: epassword ? '1px solid red' : '1px solid rgb(189, 189, 189)',
                                            fontFamily: 'Poppins, sans-serif',
                                            paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}
                                    placeholder='Contraseña'/>
                            </div>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{fontSize: 14 / proporcional, color: 'rgb(129, 129, 129)', fontWeight: 500,
                                        marginBottom: 5 / proporcional, lineHeight: `${20 / proporcional}px`}}>
                                    Confirmar contraseña <span style={{color: 'red'}}>(*)</span>
                                </span>
                                <input 
                                    id='confirmar_password'
                                    className='forn-control rounded'
                                    type='password'
                                    value={confirmar_password}
                                    onChange={(event) => setConfirmarPassowrd(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional,
                                            fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', fontWeight: 500,
                                            border: econfirmar_password ? '1px solid red' : '1px solid rgb(189, 189, 189)',
                                            fontFamily: 'Poppins, sans-serif',
                                            paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}
                                    placeholder='Confirmar contraseña'/>
                            </div>
                            {
                                mensaje !== '' ? (
                                    <div className='d-flex' style={{width: '100%', height: 'auto',
                                            marginBottom: 16 / proporcional}}>
                                        <p style={{fontSize: 12 / proporcional, lineHeight: `${20 / proporcional}px`,
                                            marginBottom: 0 / proporcional, fontWeight: 500, fontFamily: 'Merriweather', textAlign: 'start',
                                            color: 'red'}}>
                                            Las contraseñas ingresadas no coinciden, ingrese las nuevamente.
                                        </p>
                                    </div>
                                ) : null
                            }
                            <div className={boton_cambio_password ? 'rounded shadow' : 'rounded shadow-sm'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF',
                                        cursor: 'pointer'}} onMouseOver={() => setBotonCambioPassword(true)}
                                        onMouseLeave={() => setBotonCambioPassword(false)}
                                onClick={() => cambio_contraseña()}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    marginBottom: 0 / proporcional, fontWeight: 600, fontFamily: 'Poppins, sans-serif', 
                                    textAlign: 'center', color: 'white'}}>
                                    Cambiar contraseña
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
