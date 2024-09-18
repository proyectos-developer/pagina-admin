import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {begindata} from '../../../redux/slice/begindata'
import { beginConstants } from '../../../uri/begin-constants'
import { set_authenticated } from '../../../redux/actions/data'

export default function LoginSessionCell ({proporcional}) {
        
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    
    const [ecorreo, setECorreo] = useState(false)
    const [epassword, setEPassword] = useState(false)

    const [boton_sesion, setBotonSesion] = useState(false)

    const {local_signin} = useSelector(({begin_data}) => begin_data)

    useEffect(() => {
        if (local_signin && local_signin.success === true && local_signin.user){
            window.localStorage.setItem ('session_id', local_signin.user.session_id)
            window.localStorage.setItem ('user', local_signin.user.user.usuario)
            window.localStorage.setItem ('correo', local_signin.user.user.correo)
            dispatch (set_authenticated(true))
            dispatch(begindata(beginConstants(0, {}, true).local_signin))
            navigate ('/panel')
        }
    }, [local_signin])

    const iniciar_sesion = () => {
        if (correo === '' || password === ''){
            setECorreo(correo === '' ? true : false)
            setEPassword(password === '' ? true : false)
        }else{
            setECorreo(false)
            setEPassword(false)

            const data_sesion = {
                correo: correo,
                password: password
            }
            dispatch (begindata(beginConstants(0, data_sesion, false).local_signin))
        }
    }

    return (
        <div className='' 
            style={{width: '100%', height: 'auto'}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                <div className='shadow-lg rounded' style={{width: '90%', height: 'auto', padding: 20 / proporcional}}>
                    <div style={{width: '100%', height: 'auto'}}>
                        <h2 style={{fontSize: 28 / proporcional, lineHeight: `${28 / proporcional}px`,
                            marginBottom: 32 / proporcional, fontWeight: 600, fontFamily: 'Merriweather', textAlign: 'center',
                            color: '#007BFF'}}>
                            Iniciar sesión
                        </h2>
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
                                    onChange={(event) => setPassword(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional,
                                            fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', fontWeight: 500,
                                            border: epassword ? '1px solid red' : '1px solid rgb(189, 189, 189)',
                                            fontFamily: 'Poppins, sans-serif',
                                            paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}
                                    placeholder='Contraseña'/>
                            </div>
                            <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto',
                                    marginBottom: 16 / proporcional}}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`,
                                    marginBottom: 0 / proporcional, fontWeight: 500, fontFamily: 'Merriweather', textAlign: 'center',
                                    color: 'rgb(89, 89, 89)'}}>
                                    ¿Olvidaste tu contraseña? <span style={{color: '#007bff', fontWeight: 600,
                                        textDecoration: 'underline', cursor: 'pointer'}}
                                        onClick={() => navigate ('/olvido-password')}>
                                        Ingresa aquí
                                    </span>
                                </p>
                            </div>
                            <div className={boton_sesion ? 'rounded shadow' : 'rounded shadow-sm'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF',
                                        cursor: 'pointer'}} onMouseOver={() => setBotonSesion(true)}
                                        onMouseLeave={() => setBotonSesion(false)}
                                onClick={() => iniciar_sesion()}>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    marginBottom: 0 / proporcional, fontWeight: 600, fontFamily: 'Poppins, sans-serif', 
                                    textAlign: 'center', color: 'white'}}>
                                    Iniciar sesión
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
