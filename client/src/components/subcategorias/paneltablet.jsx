import React, { useEffect, useState } from 'react'

import TituloPrincipalTablet from './tituloprincipaltablet.jsx'

import { Outlet, useLocation } from 'react-router-dom'

export default function SubCategoriasPanelTablet ({proporcional}) {

    const location = useLocation()

    const [titulo_pagina, setTituloPagina] = useState ('')
    const [opcion_titulo, setOpcionTitulo] = useState (0)

    useEffect(() => {
        setTituloPagina(location.pathname.split ('/')[3] === undefined ? 'Sub categorías' : 
            location.pathname.split('/')[3] === 'nuevo' ? 'Nueva sub categoría' : `Detalles de la sub categoría`)
        setOpcionTitulo(location.pathname.split ('/')[3] === undefined ? 1 : 0)
    }, [location.pathname.split ('/')[3]])

    return (
        <div style={{width: '100%', height: '100%'}}>
            <TituloPrincipalTablet proporcional={proporcional} titulo={titulo_pagina} opcion={opcion_titulo}/>
            <Outlet/>
        </div>
    )
}
