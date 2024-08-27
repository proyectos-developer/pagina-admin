import React, { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

export default function SessionPanel ({proporcional}) {

    const navigate = useNavigate()
    
    useEffect(() => {
        if (window.localStorage.getItem('session_id')){
            navigate ('/panel')
        }
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional,
            paddingLeft: 60 / proporcional, paddingRight: 60 / proporcional}}>
            <div className='' style={{width: '100%', height: '100%'}}>
                <div style={{width: '100%', height: '100%', borderBottom: '2px solid #a4a4a4',
                    paddingBottom: 50 / proporcional}}>

                </div>
                <div className='position-relative' style={{width: '100%', height: '100%', borderTop: '2px solid #a4a4a4',
                    paddingTop: 50 / proporcional}}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
