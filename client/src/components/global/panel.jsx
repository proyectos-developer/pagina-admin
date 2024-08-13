import React, { useEffect } from 'react'

import {useDispatch, useSelector} from 'react-redux'

import { Outlet, useNavigate } from 'react-router-dom'
import { set_authenticated } from '../../redux/actions/data'

export default function GlobalPanel({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (window.localStorage.getItem('session_id')){
            dispatch(set_authenticated(true))
            navigate ('/panel')
        }else{
            navigate ('/')
        }
    }, [])

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Outlet/>
        </div>
    )
}
