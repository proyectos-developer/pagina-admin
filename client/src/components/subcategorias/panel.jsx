import React from 'react'

import { Outlet} from 'react-router-dom'

export default function SubCategoriasPanel () {

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Outlet/>
        </div>
    )
}