import React, { useState } from 'react'

import {useDispatch, useSelector} from 'react-redux'

import MenuLateral from '../comun/menulateral.jsx'
import MenuSuperior from '../comun/menusuperior.jsx'
import left from '../../assets/iconos/menu/lateral/left.png'
import { set_open_menu_lateral } from '../../redux/actions/data.js'
import { Outlet } from 'react-router-dom'

export default function HomePanel({proporcional}) {

    const dispatch = useDispatch()

    const [arrow_left, setArrowLeft] = useState(false)

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div className='d-flex' style={{width: '100%', height: '100%'}}>
                {
                    open_menu_lateral ? (
                        <div className='shadow-lg position-relative min-vh-100' style={{width: '20%', borderRight: '1px solid rgba(229, 229, 229, 1)',
                                background: 'white', zIndex: 99999}}>
                            <div className='position-fixed'>
                                <div className='' style={{width: '147%'}}>
                                    <MenuLateral proporcional={proporcional}/>
                                    <div className={`position-absolute ${arrow_left ? 'shadow' : 'shadow-lg'} rounded-circle`} 
                                        style={{width: 48 / proporcional, height: 48 / proporcional,
                                            top: 246 / proporcional, left: '137%', background: '#28A745', cursor: 'pointer'}}
                                            onMouseOver={() => setArrowLeft(true)} onMouseLeave={() => setArrowLeft(false)}
                                            onClick={() => dispatch (set_open_menu_lateral(false))}>
                                        <img className='rounded-circle' src={left} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                padding: arrow_left ? 3 / proporcional : 6 / proporcional}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
                <div style={{width: open_menu_lateral ? '80%' : '100%', height: '100%'}}>
                    <div style={{width: '100%', height: 100 / proporcional, borderBottom: '2px solid rgba(229, 229, 229, 1)'}}>
                        <MenuSuperior proporcional={proporcional}/>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
