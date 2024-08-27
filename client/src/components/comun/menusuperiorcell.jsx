import React, { useEffect, useState } from 'react'

import menu from '../../assets/iconos/menu/superior/menu_v1.png'
import menu_select from '../../assets/iconos/menu/superior/menu_v2.png'
import search from '../../assets/iconos/menu/superior/search_v2.png'
import search_select from '../../assets/iconos/menu/superior/search_v1.png'
import settings from '../../assets/iconos/menu/superior/settings_v2.png'
import settings_select from '../../assets/iconos/menu/superior/settings_v1.png'
import chat from '../../assets/iconos/menu/superior/chat_v1.png'
import chat_select from '../../assets/iconos/menu/superior/chat_v2.png'
import notifications from '../../assets/iconos/menu/superior/notifications_v1.png'
import notifications_select from '../../assets/iconos/menu/superior/notifications_v2.png'
import logout from '../../assets/iconos/menu/superior/logout_v2.png'
import logout_select from '../../assets/iconos/menu/superior/logout_v1.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_open_menu_lateral } from '../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
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
import {favoritosdata} from '../../redux/slice/favoritosdata'
import { favoritosConstants } from '../../uri/favoritos-constants'
import {calificacionesdata} from '../../redux/slice/calificacionesdata'
import { calificacionesConstants } from '../../uri/calificaciones-constants'
import {clientesdata} from '../../redux/slice/clientesdata'
import { clientesConstants } from '../../uri/clientes-constants'

export default function MenuSuperiorCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [menu_pagina, setMenuPagina] = useState('')
    const [search_word, setSearchWord] = useState('')

    const [boton_menu, setBotonMenu] = useState(false)
    const [boton_search, setBotonSearch] = useState(false)
    const [boton_notifications, setBotonNotifications] = useState(false)
    const [boton_chat, setBotonChat] = useState(false)
    const [boton_settings, setBotonSettings] = useState(false)
    const [boton_logout, setBotonLogout] = useState(false)

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (location.pathname.split('/') [2] === undefined){
            setMenuPagina('panel')
        }else if (location.pathname.split ('/')[2] !== undefined){
            setMenuPagina (location.pathname.split ('/')[2])
        }
    }, [location.pathname.split ('/')[2]])

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
        else if (menu_pagina === 'favoritos' && search_word !== ''){
            dispatch (favoritosdata(favoritosConstants(0, 0, search_word, 0, 0, 0, 0, 16, {}, false).get_favoritos_filter))
            navigate('/panel/favoritos')
        }else if (menu_pagina === 'favoritos' && search_word === ''){
            dispatch (favoritosdata(favoritosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_favoritos_filter))
        }
        else if (menu_pagina === 'calificaciones' && search_word !== ''){
            dispatch (calificacionesdata(calificacionesConstants(0, search_word, 0, 0, 0, 0, 0, 16, {}, false).get_calificaciones_filter))
            navigate('/panel/calificaciones')
        }else if (menu_pagina === 'calificaciones' && search_word === ''){
            dispatch (calificacionesdata(calificacionesConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_calificaciones_filter))
        }
        else if (menu_pagina === 'compradores' && search_word !== ''){
            dispatch (clientesdata(clientesConstants(0, search_word, 0, 0, 0, 16, {}, false).get_clientes_filter))
            navigate('/panel/compradores')
        }else if (menu_pagina === 'compradores' && search_word === ''){
            dispatch (clientesdata(clientesConstants(0, 0, 0, 0, 0, 16, {}, false).get_clientes_filter))
        }
    }

    return (
        <div style={{width: '100%', height: 220 / proporcional, padding: 10 / proporcional, paddingTop: 20 / proporcional,
                paddingBottom: 20 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                    {
                        open_menu_lateral ? (
                            <div style={{width: 60 / proporcional, height: 60 / proporcional, marginRight: 10 / proporcional}}>
                            <img src={boton_menu ? menu_select : menu} style={{width: 60 / proporcional, height: 60 / proporcional, cursor: 'pointer', 
                                padding: 15 / proporcional}} onMouseOver={() => setBotonMenu(true)}
                                onMouseLeave={() => setBotonMenu(false)}
                                onClick={() => dispatch (set_open_menu_lateral(false))}/>
                            </div>
                        ) : null
                    }
                </div>
                <div style={{width: 'auto', height: 60 / proporcional}}>
                    <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                        <img src={boton_notifications ? notifications_select : notifications} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                cursor: 'pointer'}} onMouseOver={() => setBotonNotifications(true)} onMouseLeave={() => setBotonNotifications(false)}/>
                        <img src={boton_chat ? chat_select : chat} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                cursor: 'pointer'}} onMouseOver={() => setBotonChat(true)} onMouseLeave={() => setBotonChat(false)}/>
                        <img src={boton_settings ? settings_select : settings} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                cursor: 'pointer'}} onMouseOver={() => setBotonSettings(true)} onMouseLeave={() => setBotonSettings(false)}/>
                        <img src={boton_logout ? logout_select : logout} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                cursor: 'pointer'}} onMouseOver={() => setBotonLogout(true)} onMouseLeave={() => setBotonLogout(false)}
                                onClick={() => cerrar_sesion()}/>
                    </div>
                </div>
            </div>
            <div style={{width: 'auto', height: 60 / proporcional, paddingTop: 0 / proporcional, paddingBottom: 0 / proporcional}}>
                <h1 style={{fontSize: 32 / proporcional, lineHeight: `${60 / proporcional}px`, fontFamily: 'Merriweather',
                    marginBottom: 0, color: '#007bff', fontWeight: 600, cursor: 'pointer', textAlign: 'center'}}
                    onClick={() => {navigate ('/panel'); dispatch(set_open_menu_lateral(false))}}>Administrativa</h1>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 60 / proporcional, padding: 5 / proporcional}}>
                <div className='rounded' 
                    style={{width: '90%', height: 50 / proporcional, border: '1px solid #f2f2f2'}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 48 / proporcional}}>
                        <input 
                            id='search_word'
                            type='default'
                            className='form-control border-0'
                            value={search_word}
                            onChange={(event) => setSearchWord(event.target.value)}
                            style={{width: '90%', height: 48 / proporcional, fontSize: 14 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif'}}
                            placeholder='Buscar cliente, proyecto, producto...'/>
                        <img src={boton_search ? search_select : search} 
                            style={{width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'
                        }} onMouseOver={() => setBotonSearch(true)} onMouseLeave={() => setBotonSearch(false)}
                            onClick={() => buscar_por_palabra()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
