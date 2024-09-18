import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuSuperiorPanelCell from '../../dashboard/menu/superiorpanelcell'

export default function ModuloAlmacenPanelCell({proporcional}) {

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto', paddingLeft: 100 / proporcional, paddingRight: 100 / proporcional,
                paddingTop: 50 / proporcional}}>
                <MenuSuperiorPanelCell proporcional={proporcional}/>
            </div>
            <Outlet/>
        </div>
    )
}
