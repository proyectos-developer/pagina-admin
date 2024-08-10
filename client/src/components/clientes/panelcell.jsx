import React, { useEffect, useState } from 'react'

import TituloPrincipalCell from './tituloprincipalcell.jsx'

import { Outlet, useLocation } from 'react-router-dom'

export default function ClientesPanelCell ({proporcional}) {

    const location = useLocation()

    const [titulo_pagina, setTituloPagina] = useState ('')

    useEffect(() => {
        setTituloPagina(location.pathname.split ('/')[2] === undefined ? 'Nuestros clientes' : 'Nuevo cliente')
    }, [location.pathname.split ('/')[2]])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <TituloPrincipalCell proporcional={proporcional} titulo={titulo_pagina}/>
            <Outlet/>
        </div>
    )
}
