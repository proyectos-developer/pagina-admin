import React from 'react'

import menu from '../../assets/iconos/menu/superior/menu.png'
import settings from '../../assets/iconos/menu/superior/settings.png'
import logout from '../../assets/iconos/menu/superior/logout.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_open_menu_lateral } from '../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

export default function MenuSuperiorCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    return (
        <div style={{width: '100%', height: 100 / proporcional, padding: 10 / proporcional, paddingTop: 20 / proporcional,
                paddingBottom: 20 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                    {
                        open_menu_lateral ? (
                            <div style={{width: 60 / proporcional, height: 60 / proporcional, marginRight: 10 / proporcional}}>
                                <img src={menu} style={{width: 60 / proporcional, height: 60 / proporcional, cursor: 'pointer', 
                                    padding: 17 / proporcional}}
                                    onClick={() => dispatch (set_open_menu_lateral(false))}/>
                            </div>
                        ) : null
                    }
                    <div style={{width: 'auto', height: 60 / proporcional, paddingTop: 0 / proporcional, paddingBottom: 0 / proporcional}}>
                        <h1 style={{fontSize: 32 / proporcional, lineHeight: `${60 / proporcional}px`, fontFamily: 'Merriweather',
                            marginBottom: 0, color: '#007bff', fontWeight: 600, cursor: 'pointer'}}
                            onClick={() => {navigate ('/panel'); dispatch(set_open_menu_lateral(false))}}>Administrativa</h1>
                    </div>
                </div>
                <div style={{width: 'auto', height: 60 / proporcional}}>
                    <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                        <img src={settings} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional}}/>
                        <img src={logout} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional}}/>    
                    </div>
                </div>
            </div>
        </div>
    )
}
