import React, { useEffect, useState } from 'react'

import menu from '../../assets/iconos/menu/superior/menu.png'
import search from '../../assets/iconos/menu/superior/search.png'
import settings from '../../assets/iconos/menu/superior/settings.png'
import logout from '../../assets/iconos/menu/superior/logout.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_authenticated, set_open_menu_lateral } from '../../redux/actions/data'
import { useNavigate } from 'react-router-dom'
import {begindata} from '../../redux/slice/begindata'
import { beginConstants } from '../../uri/begin-constants'

export default function MenuSuperior ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [search_word, setSearchWord] = useState('')

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)
    const {local_logout} = useSelector(({begin_data}) => begin_data)

    useEffect(() => {
        if (local_logout && local_logout.success === true){
            window.localStorage.removeItem('session_id')
            window.localStorage.removeItem('correo')
            window.localStorage.removeItem('user')
            dispatch (set_authenticated(false))
            dispatch (begindata(beginConstants(0, {}, true).local_logout))
            navigate ('/')
        }
    }, [local_logout])

    const buscar_por_palabra = () => {
        
    }

    const cerrar_sesion = () => {
        dispatch(begindata(beginConstants(0, {}, false).local_logout))
    }

    return (
        <div style={{width: '100%', height: 100 / proporcional, padding: 20 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                    {
                        !open_menu_lateral ? (
                            <div style={{width: 60 / proporcional, height: 60 / proporcional, marginRight: 10 / proporcional}}>
                                <img src={menu} style={{width: 60 / proporcional, height: 60 / proporcional, cursor: 'pointer', 
                                    padding: 15 / proporcional}}
                                    onClick={() => dispatch (set_open_menu_lateral(true))}/>
                            </div>
                        ) : null
                    }
                    <div style={{width: 'auto', height: 60 / proporcional, paddingTop: 0 / proporcional, paddingBottom: 0 / proporcional}}>
                        <h1 style={{fontSize: 32 / proporcional, lineHeight: `${60 / proporcional}px`, fontFamily: 'Merriweather',
                            marginBottom: 0, color: '#007bff', fontWeight: 600, cursor: 'pointer'}}
                            onClick={() => {navigate ('/panel'); dispatch(set_open_menu_lateral(false))}}>Administrativa</h1>
                    </div>
                </div>
                <div className='' style={{width: 500 / proporcional, height: 50 / proporcional, margin: 10 / proporcional}}>
                    <div className='rounded' 
                        style={{width: 500 / proporcional, height: 50 / proporcional, border: '1px solid #f2f2f2'}}>
                        <div className='d-flex' style={{width: 498 / proporcional, height: 48 / proporcional}}>
                            <input 
                                id='search_word'
                                type='default'
                                className='form-control border-0'
                                value={search_word}
                                onChange={(event) => setSearchWord(event.target.value)}
                                style={{width: '100%', height: 48 / proporcional, fontSize: 14 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif'}}
                                placeholder='Buscar cliente, proyecto, producto...'/>
                            <img src={search} style={{width: 48 / proporcional, height: 48 / proporcional}}
                                onClick={() => buscar_por_palabra()}/>
                        </div>
                    </div>
                </div>
                <div style={{width: 'auto', height: 60 / proporcional}}>
                    <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                        <img src={settings} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                cursor: 'pointer'}}/>
                        <img src={logout} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                cursor: 'pointer'}} onClick={() => cerrar_sesion()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
