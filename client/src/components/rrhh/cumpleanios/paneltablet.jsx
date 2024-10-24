import React from 'react'

import { Outlet} from 'react-router-dom'

export default function CumpleaniosPanelTablet () {

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            <Outlet/>
        </div>
    )
}
