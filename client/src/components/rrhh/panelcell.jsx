import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuSuperiorPanelCell from '../dashboard/menu/superiorpanelcell.jsx'

export default function ModuloRrHhPanelCell({proporcional}) {

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto', paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional,
                paddingTop: 50 / proporcional}}>
                <MenuSuperiorPanelCell proporcional={proporcional}/>
            </div>
            <Outlet/>
        </div>
    )
}
