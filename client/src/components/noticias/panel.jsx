import React, { useEffect, useState } from 'react'

import TituloPrincipal from './tituloprincipal.jsx'

import { Outlet, useLocation } from 'react-router-dom'

export default function NoticiasPanel ({proporcional}) {

    const location = useLocation()

    const [titulo_pagina, setTituloPagina] = useState ('')
    const [opcion_titulo, setOpcionTitulo] = useState (0)

    useEffect(() => {
        setTituloPagina(location.pathname.split ('/')[3] === undefined ? 'Noticias' : 
            location.pathname.split('/')[3] === 'nuevo' ? 'Nueva noticia' : `Detalles de la noticia`)
        setOpcionTitulo(location.pathname.split ('/')[3] === undefined ? 1 : 0)
    }, [location.pathname.split ('/')[3]])

    return (
        <div style={{width: '100%', height: '100%'}}>
            <TituloPrincipal proporcional={proporcional} titulo={titulo_pagina} opcion={opcion_titulo}/>
            <Outlet/>
        </div>
    )
}