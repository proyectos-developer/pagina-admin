import React, { useEffect } from 'react'

import {useDispatch, useSelector} from 'react-redux'

import { Outlet, useNavigate } from 'react-router-dom'
import { set_authenticated } from '../../redux/actions/data'

import ModalCargando from '../modal/cargando.jsx'

export default function GlobalPanel({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const begin_data = useSelector(({begin_data}) => begin_data)

    useEffect(() => {
        if (window.localStorage.getItem('session_id')){
            dispatch(set_authenticated(true))
        }else{
            navigate ('/')
        }
    }, [])

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            <Outlet/>
            <ModalCargando loading={begin_data.loading}/>
        </div>
    )
}
