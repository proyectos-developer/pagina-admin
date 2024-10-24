import React from 'react'
import { Outlet } from 'react-router-dom'

import MenuSuperiorPanelCell from '../../dashboard/menu/superiorpanelcell'

export default function ModuloAlmacenPanelCell({proporcional}) {

    return (
        <div className='rounded' style={{width: '100%', height: 'auto', paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional,
            paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional, background: '#f2f2f2'}}>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <MenuSuperiorPanelCell proporcional={proporcional}/>
            </div>
            <div className='min-vh-100' style={{width: '100%'}}>
                <Outlet/>
            </div>
        </div>
    )
}
