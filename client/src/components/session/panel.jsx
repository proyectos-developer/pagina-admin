import React from 'react'

import { Outlet } from 'react-router-dom'

export default function SessionPanel ({proporcional}) {

    return (
        <div style={{width: '100%', height: '100%', paddingTop: 100 / proporcional, paddingBottom: 100 / proporcional,
            paddingLeft: 200 / proporcional, paddingRight: 200 / proporcional}}>
            <div className='d-flex justyfi-content-between' style={{width: '100%', height: '100%'}}>
                <div style={{width: '50%', height: '100%', borderRight: '2px solid #a4a4a4'}}>

                </div>
                <div className='position-relative' style={{width: '50%', height: '100%', borderLeft: '2px solid #a4a4a4'}}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
