import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuSuperiorPanelTablet from '../dashboard/menu/superiorpaneltablet.jsx'

export default function ModuloEmpresaPanelTablet({proporcional}) {

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto', paddingLeft: 60 / proporcional, paddingRight: 60 / proporcional,
                paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
                <MenuSuperiorPanelTablet proporcional={proporcional}/>
            </div>
            <Outlet/>
        </div>
    )
}
