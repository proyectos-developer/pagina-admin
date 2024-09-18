import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuSuperiorPanelTablet from '../../dashboard/menu/superiorpanel'

export default function ModuloProjectsPanelTablet({proporcional}) {

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto', paddingLeft: 100 / proporcional, paddingRight: 100 / proporcional,
                paddingTop: 50 / proporcional}}>
                <MenuSuperiorPanelTablet proporcional={proporcional}/>
            </div>
            <Outlet/>
        </div>
    )
}
