import React, { useState } from 'react'

import {useDispatch, useSelector} from 'react-redux'

import MenuLateralCell from '../comun/menulateralcell.jsx'
import MenuSuperiorCell from '../comun/menusuperiorcell.jsx'
import left from '../../assets/iconos/menu/lateral/left.png'
import { set_open_menu_lateral } from '../../redux/actions/data.js'
import { Outlet } from 'react-router-dom'

export default function HomePanelCell({proporcional}) {

    const dispatch = useDispatch()

    const [arrow_left, setArrowLeft] = useState(false)

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div className='position-relative' style={{width: '100%', height: '100%'}}>
                {
                    !open_menu_lateral ? (
                        <div className='shadow-lg position-absolute top-0 start-0' 
                            style={{width: '60%', height: '100%', borderRight: '1px solid rgba(229, 229, 229, 1)',
                                background: 'white'}}>
                            <MenuLateralCell proporcional={proporcional}/>
                            <div className={`position-absolute ${arrow_left ? 'shadow' : 'shadow-lg'} rounded-circle`} 
                                style={{width: 48 / proporcional, height: 48 / proporcional,
                                    top: 246 / proporcional, right: -24 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                    onMouseOver={() => setArrowLeft(true)} onMouseLeave={() => setArrowLeft(false)}
                                    onClick={() => dispatch (set_open_menu_lateral(!open_menu_lateral))}>
                                <img className='rounded-circle' src={left} style={{width: 48 / proporcional, height: 48 / proporcional,
                                        padding: arrow_left ? 3 / proporcional : 6 / proporcional}}/>
                            </div>
                        </div>
                    ) : null
                }
                <div style={{width: '100%', height: '100%'}}>
                    <div style={{width: '100%', height: 100 / proporcional, borderBottom: '2px solid rgba(229, 229, 229, 1)'}}>
                        <MenuSuperiorCell proporcional={proporcional}/>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}