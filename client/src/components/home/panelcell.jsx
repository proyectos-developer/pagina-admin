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
        <div className='rounded' 
            style={{width: '100%', height: '100%'}}>
            <div className='position-relative' style={{width: '100%', height: '100%'}}>
                {
                    open_menu_lateral ? (
                        <div className='d-flex position-fixed top-0 start-0 min-vh-100' 
                            style={{width: '100%', background: 'rgba(89, 89, 89, 0.6)', zIndex: 99999}}>
                            <div className='shadow-lg' 
                                style={{width: '60%', borderRight: '1px solid rgba(229, 229, 229, 1)', background: 'white', zIndex: 99999}}>
                                <div className='position-fixed' style={{width: '60%', height: '100%'}}>
                                    <MenuLateralCell proporcional={proporcional}/>
                                </div>
                                <div className={`position-fixed ${arrow_left ? 'shadow' : 'shadow-lg'} rounded-circle`} 
                                    style={{width: 48 / proporcional, height: 48 / proporcional,
                                        top: 246 / proporcional, left: '56%', background: '#28A745', cursor: 'pointer'}}
                                        onMouseOver={() => setArrowLeft(true)} onMouseLeave={() => setArrowLeft(false)}
                                        onClick={() => dispatch (set_open_menu_lateral(false))}>
                                    <img className='rounded-circle' src={left} style={{width: 48 / proporcional, height: 48 / proporcional,
                                            padding: arrow_left ? 3 / proporcional : 6 / proporcional}}/>
                                </div>
                            </div>
                            <div className='position-fixed top-0 start-0 min-vh-100' 
                                style={{width: '100%'}} onClick={() => {dispatch (set_open_menu_lateral(false))}}/>
                        </div>
                    ) : null
                }
                <div style={{width: '100%', height: '100%', background: '#007bff', paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional}}>
                    <div style={{width: '100%', height: 160 / proporcional, borderBottom: '2px solid rgba(229, 229, 229, 1)'}}>
                        <MenuSuperiorCell proporcional={proporcional}/>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
