import React, { useEffect, useState } from 'react'

import TituloPrincipalCell from './tituloprincipalcell.jsx'

import { Outlet, useLocation } from 'react-router-dom'

export default function UnidadesPanelCell ({proporcional}) {

    const location = useLocation()

    const [titulo_pagina, setTituloPagina] = useState ('')
    const [opcion_titulo, setOpcionTitulo] = useState (0)

    useEffect(() => {
        setTituloPagina(location.pathname.split ('/')[3] === undefined ? 'Unidades' : 
            location.pathname.split('/')[3] === 'nuevo' ? 'Nueva unidad' : `Detalles de la unidad`)
        setOpcionTitulo(location.pathname.split ('/')[3] === undefined ? 1 : 0)
    }, [location.pathname.split ('/')[3]])

    return (
        <div style={{width: '100%', height: '100%'}}>
            <TituloPrincipalCell proporcional={proporcional} titulo={titulo_pagina} opcion={opcion_titulo}/>
            <Outlet/>
        </div>
    )
}
