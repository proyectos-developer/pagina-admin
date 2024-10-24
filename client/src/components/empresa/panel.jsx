import React from 'react'
import { Outlet } from 'react-router-dom'

import MenuSuperiorPanel from '../dashboard/menu/superiorpanel'

export default function ModuloEmpresaPanel({proporcional}) {

    return (
        <div className='rounded' style={{width: '100%', height: 'auto', paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional,
            paddingLeft: 100 / proporcional, paddingRight: 100 / proporcional, background: '#f2f2f2'}}>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <MenuSuperiorPanel proporcional={proporcional}/>
            </div>
            <div className='min-vh-100' style={{width: '100%'}}>
                <Outlet/>
            </div>
        </div>
    )
}
