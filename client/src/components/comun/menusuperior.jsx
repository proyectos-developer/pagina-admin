import React, { useEffect, useState } from 'react'

import menu from '../../assets/iconos/menu/superior/menu.png'
import search from '../../assets/iconos/menu/superior/search.png'
import settings from '../../assets/iconos/menu/superior/settings.png'
import logout from '../../assets/iconos/menu/superior/logout.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_authenticated, set_open_menu_lateral } from '../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import {begindata} from '../../redux/slice/begindata'
import { beginConstants } from '../../uri/begin-constants'
import {negociosdata} from '../../redux/slice/negociosdata'
import { negociosConstants } from '../../uri/negocios-constants'
import {tipoproyectosdata} from '../../redux/slice/tipoproyectosdata'
import { tipoproyectoConstants } from '../../uri/tipoproyecto-constants'
import {proyectosdata} from '../../redux/slice/proyectosdata'
import { proyectosConstants } from '../../uri/proyectos-constants'
import {categoriasdata} from '../../redux/slice/categoriasdata'
import { categoriasConstants } from '../../uri/categorias-constants'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata'
import { subcategoriasConstants } from '../../uri/subcategorias-constants'
import {unidadesdata} from '../../redux/slice/unidadesdata'
import { unidadesConstants } from '../../uri/unidades-constants'
import {productosdata} from '../../redux/slice/productosdata'
import { productosConstants } from '../../uri/productos-constants'
import {serviciosdata} from '../../redux/slice/serviciosdata'
import { serviciosConstants } from '../../uri/servicios-constants'

export default function MenuSuperior ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [menu_pagina, setMenuPagina] = useState('')
    const [search_word, setSearchWord] = useState('')

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)
    const {local_logout} = useSelector(({begin_data}) => begin_data)

    useEffect(() => {
        if (location.pathname.split('/') [2] === undefined){
            setMenuPagina('panel')
        }else if (location.pathname.split ('/')[2] !== undefined){
            setMenuPagina (location.pathname.split ('/')[2])
        }
    }, [location.pathname.split ('/')[2]])

    useEffect(() => {
        if (local_logout && local_logout.success === true){
            window.localStorage.removeItem('session_id')
            window.localStorage.removeItem('correo')
            window.localStorage.removeItem('user')
            dispatch (set_authenticated(false))
            dispatch (begindata(beginConstants(0, {}, true).local_logout))
            navigate ('/')
        }
    }, [local_logout])

    const buscar_por_palabra = () => {
        if (menu_pagina === 'clientes' && search_word !== ''){
            dispatch (negociosdata(negociosConstants(0, search_word, 0, 0, 0, 16, {}, false).get_negocios_filter))
            navigate('/panel/clientes')
        }else if (menu_pagina === 'clientes' && search_word === ''){
            dispatch (negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, false).get_negocios_filter))
        }
        else if (menu_pagina === 'tipos-proyectos' && search_word !== ''){
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, search_word, 0, 0, 0, 16, {}, false).get_tipo_proyectos_filter))
            navigate('/panel/tipos-proyectos')
        }else if (menu_pagina === 'tipos-proyectos' && search_word === ''){
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, false).get_tipo_proyectos_filter))
        }
        else if (menu_pagina === 'proyectos' && search_word !== ''){
            dispatch (proyectosdata(proyectosConstants(0, search_word, 0, 0, 0, 0, 16, {}, false).get_proyectos_filter))
            navigate('/panel/proyectos')
        }else if (menu_pagina === 'proyectos' && search_word === ''){
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_proyectos_filter))
        }
        else if (menu_pagina === 'categorias' && search_word !== ''){
            dispatch (categoriasdata(categoriasConstants(0, search_word, 0, 0, 0, 16, {}, false).get_categorias_filter))
            navigate('/panel/categorias')
        }else if (menu_pagina === 'categorias' && search_word === ''){
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, {}, false).get_categorias_filter))
        }
        else if (menu_pagina === 'subcategorias' && search_word !== ''){
            dispatch (subcategoriasdata(subcategoriasConstants(0, search_word, 0, 0, 0, 0, 16, {}, false).get_subcategorias_filter))
            navigate('/panel/subcategorias')
        }else if (menu_pagina === 'subcategorias' && search_word === ''){
            dispatch (subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_subcategorias_filter))
        }
        else if (menu_pagina === 'unidades' && search_word !== ''){
            dispatch (unidadesdata(unidadesConstants(0, search_word, 0, 0, 0, 16, {}, false).get_unidades_filter))
            navigate('/panel/unidades')
        }else if (menu_pagina === 'unidades' && search_word === ''){
            dispatch (unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 16, {}, false).get_unidades_filter))
        }
        else if (menu_pagina === 'servicios' && search_word !== ''){
            dispatch (serviciosdata(serviciosConstants(0, search_word, 0, 0, 0, 16, {}, false).get_servicios_filter))
            navigate('/panel/servicios')
        }else if (menu_pagina === 'servicios' && search_word === ''){
            dispatch (serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 16, {}, false).get_servicios_filter))
        }
        else if (menu_pagina === 'productos' && search_word !== ''){
            dispatch (productosdata(productosConstants(0, search_word, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_productos_filter))
            navigate('/panel/productos')
        }else if (menu_pagina === 'productos' && search_word === ''){
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_productos_filter))
        }
    }

    const cerrar_sesion = () => {
        dispatch(begindata(beginConstants(0, {}, false).local_logout))
    }

    return (
        <div style={{width: '100%', height: 100 / proporcional, padding: 20 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                    {
                        !open_menu_lateral ? (
                            <div style={{width: 60 / proporcional, height: 60 / proporcional, marginRight: 10 / proporcional}}>
                                <img src={menu} style={{width: 60 / proporcional, height: 60 / proporcional, cursor: 'pointer', 
                                    padding: 15 / proporcional}}
                                    onClick={() => dispatch (set_open_menu_lateral(true))}/>
                            </div>
                        ) : null
                    }
                    <div style={{width: 'auto', height: 60 / proporcional, paddingTop: 0 / proporcional, paddingBottom: 0 / proporcional}}>
                        <h1 style={{fontSize: 32 / proporcional, lineHeight: `${60 / proporcional}px`, fontFamily: 'Merriweather',
                            marginBottom: 0, color: '#007bff', fontWeight: 600, cursor: 'pointer'}}
                            onClick={() => {navigate ('/panel'); dispatch(set_open_menu_lateral(false))}}>Administrativa</h1>
                    </div>
                </div>
                <div className='' style={{width: 500 / proporcional, height: 50 / proporcional, margin: 10 / proporcional}}>
                    <div className='rounded' 
                        style={{width: 500 / proporcional, height: 50 / proporcional, border: '1px solid #f2f2f2'}}>
                        <div className='d-flex' style={{width: 498 / proporcional, height: 48 / proporcional}}>
                            <input 
                                id='search_word'
                                type='default'
                                className='form-control border-0'
                                value={search_word}
                                onChange={(event) => setSearchWord(event.target.value)}
                                style={{width: '100%', height: 48 / proporcional, fontSize: 14 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif'}}
                                placeholder='Buscar cliente, proyecto, producto...'/>
                            <img src={search} style={{width: 48 / proporcional, height: 48 / proporcional,
                                    cursor: 'pointer'
                            }}
                                onClick={() => buscar_por_palabra()}/>
                        </div>
                    </div>
                </div>
                <div style={{width: 'auto', height: 60 / proporcional}}>
                    <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                        <img src={settings} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                cursor: 'pointer'}}/>
                        <img src={logout} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                cursor: 'pointer'}} onClick={() => cerrar_sesion()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
