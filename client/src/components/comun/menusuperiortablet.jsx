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
import agenda from '../../assets/iconos/menu/superior/agenda_v1.png'
import agenda_select from '../../assets/iconos/menu/superior/agenda_v2.png'
import logout from '../../assets/iconos/menu/superior/logout_v2.png'
import logout_select from '../../assets/iconos/menu/superior/logout_v1.png'

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
import {favoritosdata} from '../../redux/slice/favoritosdata'
import { favoritosConstants } from '../../uri/favoritos-constants'
import {calificacionesdata} from '../../redux/slice/calificacionesdata'
import { calificacionesConstants } from '../../uri/calificaciones-constants'
import {clientesdata} from '../../redux/slice/clientesdata'
import { clientesConstants } from '../../uri/clientes-constants'
import {personaldata} from '../../redux/slice/personaldata.js'
import { personalConstants } from '../../uri/personal-constants.js'
import {departamentosdata} from '../../redux/slice/departamentosdata.js'
import { departamentosConstants } from '../../uri/departamentos-constants.js'
import {categorias_noticiasdata} from '../../redux/slice/categorias_noticiasdata'
import { categoriasnoticiasConstants } from '../../uri/categorias_noticias-constants'
import {noticiasdata} from '../../redux/slice/noticiasdata'
import { noticiasConstants } from '../../uri/noticias-constants'
import {comprasdata} from '../../redux/slice/comprasdata'
import { comprasConstants } from '../../uri/compras-constants'

import {notificacionesdata} from '../../redux/slice/notificacionesdata'
import {notificacionesConstants} from '../../uri/notificaciones-constants'
import {mensajesdata} from '../../redux/slice/mensajesdata'
import {mensajesConstants} from '../../uri/mensajes-constantes'
import {reunionesdata} from '../../redux/slice/reunionesdata'
import {reunionesConstants} from '../../uri/reuniones-constants'

import CardNotificacionTablet from './card/notificaciontablet.jsx'
import CardMensajeTablet from './card/mensajetablet.jsx'
import CardAgendaTablet from './card/agendatablet.jsx'

export default function MenuSuperiorTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [menu_pagina, setMenuPagina] = useState('')
    const [search_word, setSearchWord] = useState('')

    const [boton_menu, setBotonMenu] = useState(false)
    const [boton_search, setBotonSearch] = useState(false)
    const [boton_notifications, setBotonNotifications] = useState(false)
    const [boton_chat, setBotonChat] = useState(false)
    const [boton_agenda, setBotonAgenda] = useState(false)
    const [boton_settings, setBotonSettings] = useState(false)
    const [boton_logout, setBotonLogout] = useState(false)

    const [show_notificaciones, setShowNotificaciones] = useState(false)
    const [show_mensajes, setShowMensajes] = useState(false)
    const [show_reuniones, setShowReuniones] = useState(false)
    
    const [lista_notificaciones, setListaNotificaciones] = useState([])
    const [lista_mensajes, setListaMensajes] = useState([])
    const [lista_reuniones, setListaReuniones] = useState([])

    const [nro_notificaciones, setNroNotificaciones] = useState(0)
    const [nro_reuniones, setNroReuniones] = useState(0)
    const [nro_mensajes, setNroMensajes] = useState(0)

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)
    const {local_logout} = useSelector(({begin_data}) => begin_data)
    const {get_notificaciones_filter, update_notificacion_leida, get_nro_notificaciones} = useSelector(({notificaciones_data}) => notificaciones_data)
    const {get_mensajes_filter, update_mensaje_leida, get_nro_mensajes} = useSelector(({mensajes_data}) => mensajes_data)
    const {get_reuniones_filter, get_nro_reuniones} = useSelector(({reuniones_data}) => reuniones_data)

    useEffect(() => {
        dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_nro_notificaciones))
    }, [])

    useEffect(() => {
        if (get_nro_notificaciones && get_nro_notificaciones.success === true && get_nro_notificaciones.total_notificaciones){
            setNroNotificaciones(get_nro_notificaciones.total_notificaciones.length)
            dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_nro_mensajes))
        }
    }, [get_nro_notificaciones])

    useEffect(() => {
        if (get_nro_mensajes && get_nro_mensajes.success === true && get_nro_mensajes.total_mensajes){
            setNroMensajes(get_nro_mensajes.total_mensajes.length)
            dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_nro_reuniones))
        }
    }, [get_nro_mensajes])

    useEffect(() => {
        if (get_nro_reuniones && get_nro_reuniones.success === true && get_nro_reuniones.total_reuniones){
            setNroReuniones(get_nro_reuniones.total_reuniones.length)
        }
    }, [get_nro_reuniones])

    useEffect(() => {
        if (location.pathname.split('/') [3] === undefined){
            setMenuPagina('panel')
        }else if (location.pathname.split ('/')[3] !== undefined){
            setMenuPagina (location.pathname.split ('/')[3])
        }
    }, [location.pathname.split ('/')[3]])

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
            navigate('/panel/proyectos/clientes')
        }else if (menu_pagina === 'clientes' && search_word === ''){
            dispatch (negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, false).get_negocios_filter))
        }
        else if (menu_pagina === 'tipos-proyectos' && search_word !== ''){
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, search_word, 0, 0, 0, 16, {}, false).get_tipo_proyectos_filter))
            navigate('/panel/proyectos/tipos-proyectos')
        }else if (menu_pagina === 'tipos-proyectos' && search_word === ''){
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, false).get_tipo_proyectos_filter))
        }
        else if (menu_pagina === 'proyectos' && search_word !== ''){
            dispatch (proyectosdata(proyectosConstants(0, search_word, 0, 0, 0, 0, 16, {}, false).get_proyectos_filter))
            navigate('/panel/proyectos/proyectos')
        }else if (menu_pagina === 'proyectos' && search_word === ''){
            dispatch (proyectosdata(proyectosConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_proyectos_filter))
        }
        else if (menu_pagina === 'categorias' && search_word !== ''){
            dispatch (categoriasdata(categoriasConstants(0, search_word, 0, 0, 0, 16, {}, false).get_categorias_filter))
            navigate('/panel/almacen/categorias')
        }else if (menu_pagina === 'categorias' && search_word === ''){
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, {}, false).get_categorias_filter))
        }
        else if (menu_pagina === 'subcategorias' && search_word !== ''){
            dispatch (subcategoriasdata(subcategoriasConstants(0, search_word, 0, 0, 0, 0, 16, {}, false).get_subcategorias_filter))
            navigate('/panel/almacen/subcategorias')
        }else if (menu_pagina === 'subcategorias' && search_word === ''){
            dispatch (subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_subcategorias_filter))
        }
        else if (menu_pagina === 'unidades' && search_word !== ''){
            dispatch (unidadesdata(unidadesConstants(0, search_word, 0, 0, 0, 16, {}, false).get_unidades_filter))
            navigate('/panel/almacen/unidades')
        }else if (menu_pagina === 'unidades' && search_word === ''){
            dispatch (unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 16, {}, false).get_unidades_filter))
        }
        else if (menu_pagina === 'servicios' && search_word !== ''){
            dispatch (serviciosdata(serviciosConstants(0, search_word, 0, 0, 0, 16, {}, false).get_servicios_filter))
            navigate('/panel/empresa/servicios')
        }else if (menu_pagina === 'servicios' && search_word === ''){
            dispatch (serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 16, {}, false).get_servicios_filter))
        }
        else if (menu_pagina === 'productos' && search_word !== ''){
            dispatch (productosdata(productosConstants(0, search_word, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_productos_filter))
            navigate('/panel/almacen/productos')
        }else if (menu_pagina === 'productos' && search_word === ''){
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_productos_filter))
        }
        else if (menu_pagina === 'favoritos' && search_word !== ''){
            dispatch (favoritosdata(favoritosConstants(0, 0, search_word, 0, 0, 0, 0, 16, {}, false).get_favoritos_filter))
            navigate('/panel/estadisticyas/favoritos')
        }else if (menu_pagina === 'favoritos' && search_word === ''){
            dispatch (favoritosdata(favoritosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_favoritos_filter))
        }
        else if (menu_pagina === 'calificaciones' && search_word !== ''){
            dispatch (calificacionesdata(calificacionesConstants(0, search_word, 0, 0, 0, 0, 0, 16, {}, false).get_calificaciones_filter))
            navigate('/panel/estadisticyas/calificaciones')
        }else if (menu_pagina === 'calificaciones' && search_word === ''){
            dispatch (calificacionesdata(calificacionesConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_calificaciones_filter))
        }
        else if (menu_pagina === 'compradores' && search_word !== ''){
            dispatch (clientesdata(clientesConstants(0, search_word, 0, 0, 0, 16, {}, false).get_clientes_filter))
            navigate('/panel/tienda/compradores')
        }else if (menu_pagina === 'compradores' && search_word === ''){
            dispatch (clientesdata(clientesConstants(0, 0, 0, 0, 0, 16, {}, false).get_clientes_filter))
        }
        else if (menu_pagina === 'compras' && search_word !== ''){
            dispatch (comprasdata(comprasConstants(0, search_word, 0, 0, 0, 0, 16, {}, false).get_compras_filter))
            navigate('/panel/tienda/compras')
        }else if (menu_pagina === 'compras' && search_word === ''){
            dispatch (comprasdata(comprasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_compras_filter))
        }
        else if (menu_pagina === 'trabajadores' && search_word !== ''){
            dispatch (personaldata(personalConstants(0, search_word, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
            navigate('/panel/rrhh/personal')
        }else if (menu_pagina === 'trabajadores' && search_word === ''){
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
        }
        else if (menu_pagina === 'departamentos' && search_word !== ''){
            dispatch (departamentosdata(departamentosConstants(0, search_word, 0, 0, 0, 16, {}, false).get_departamentos_filter))
            navigate('/panel/empresa/departamentos')
        }else if (menu_pagina === 'departamentos' && search_word === ''){
            dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, false).get_departamentos_filter))
        }
        else if (menu_pagina === 'categorias-noticias' && search_word !== ''){
            dispatch (categorias_noticiasdata(categoriasnoticiasConstants(0, search_word, 0, 0, 0, 16, {}, false).get_categorias_noticias_filter))
            navigate('/panel/otros/categorias-noticias')
        }else if (menu_pagina === 'categorias-noticias' && search_word === ''){
            dispatch (categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 16, {}, false).get_categorias_noticias_filter))
        }
        else if (menu_pagina === 'noticias' && search_word !== ''){
            dispatch (noticiasdata(noticiasConstants(0, search_word, 0, 0, 0, 0, 16, {}, false).get_noticias_filter))
            navigate('/panel/otros/noticias')
        }else if (menu_pagina === 'noticias' && search_word === ''){
            dispatch (noticiasdata(noticiasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_noticias_filter))
        }
    }

    useEffect(() => {
        if (get_notificaciones_filter && get_notificaciones_filter.success === true && get_notificaciones_filter.notificaciones){
            setListaNotificaciones(get_notificaciones_filter.notificaciones)
        }
    }, [get_notificaciones_filter])

    useEffect(() => {
        if (update_notificacion_leida && update_notificacion_leida.success === true && update_notificacion_leida.notificaciones){
            setListaNotificaciones(update_notificacion_leida.notificaciones)
        }
    }, [update_notificacion_leida])

    useEffect(() => {
        if (get_mensajes_filter && get_mensajes_filter.success === true && get_mensajes_filter.mensajes){
            setListaMensajes(get_mensajes_filter.mensajes)
        }
    }, [get_mensajes_filter])

    useEffect(() => {
        if (update_mensaje_leida && update_mensaje_leida.success === true && update_mensaje_leida.notificaciones){
            setListaMensajes(update_mensaje_leida.mensajes)
        }
    }, [update_mensaje_leida])

    useEffect(() => {
        if (get_reuniones_filter && get_reuniones_filter.success === true && get_reuniones_filter.reuniones){
            setListaReuniones(get_reuniones_filter.reuniones)
        }
    }, [get_reuniones_filter])

    const cerrar_sesion = () => {
        dispatch(begindata(beginConstants(0, {}, false).local_logout))
    }

    return (
        <div style={{width: '100%', height: 160 / proporcional, padding: 20 / proporcional}}>
            <div className='' stle={{width: '100%', height: 120 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                    <div className='d-flex' style={{width: '48%', height: 60 / proporcional}}>
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
                        <div style={{width: 'auto', height: 60 / proporcional, paddingTop: 0 / proporcional, paddingBottom: 0 / proporcional}}>
                            <h1 style={{fontSize: 32 / proporcional, lineHeight: `${60 / proporcional}px`, fontFamily: 'Merriweather',
                                marginBottom: 0, color: '#007bff', fontWeight: 600, cursor: 'pointer'}}
                                onClick={() => {navigate ('/panel')}}>Administrativa</h1>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: '48%', height: 60 / proporcional, margin: 0 / proporcional}}>
                        <div className='d-flex' style={{width: 'auto', height: 60 / proporcional}}>
                            <div className='position-relative' style={{width: 60 / proporcional, height: 60 / proporcional}}
                                onMouseOver={() => {setBotonNotifications(true)}} 
                                onMouseLeave={() => {setBotonNotifications(false)}}
                                onClick={() => {setShowNotificaciones(!show_notificaciones); dispatch(notificacionesdata(notificacionesConstants(0, 0, 0, 0, 0, 0, 10, {}, false).get_notificaciones_filter))}}>
                                <img src={boton_notifications ? notifications_select : notifications} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional,
                                        cursor: 'pointer'}} />
                                <div className='position-absolute top-0 end-0 rounded-circle shadow' 
                                    style={{width: 20 / proporcional, height: 20 / proporcional, background: boton_notifications ? 'rgb(89, 89, 89)' : '#007bff'}}>
                                    <p className='rounded-circle' style={{lineHeight: `${20 / proporcional}px`, color: 'white', textAlign: 'center',
                                        fontSize: 12 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0
                                    }}>{nro_notificaciones}</p>
                                </div> 
                                {
                                    show_notificaciones ? (
                                        <div className='shadow-lg position-absolute top-100 overflow-auto' 
                                            style={{width: 400 / proporcional, minHeight: 'auto', maxHeight: 240 / proporcional, padding: 20 / proporcional, left: -200 / proporcional,
                                                background: 'white'}}>
                                            {
                                                lista_notificaciones && lista_notificaciones.length > 0 ? (
                                                    lista_notificaciones.map ((notificacion, index) => {
                                                        return (
                                                            <CardNotificacionTablet notificacion={notificacion} index={index} key={index} proporcional={proporcional} cantidad={lista_notificaciones.length}/>
                                                        )
                                                    })
                                                ) : null
                                            }
                                            <div className='d-flex justify-content-center' style={{width: '100%', height: 50 / proporcional}}>
                                                <div className='rounded shadow-sm' style={{width: '100%', height: 50 / proporcional, border: '1px solid #007bff',
                                                        background: 'white', cursor: 'pointer'}} onClick={() => navigate('/panel/notificaciones')}>
                                                    <p style={{lineHeight: `${50 / proporcional}px`, color: '#007BFF', textAlign: 'center', fontWeight: 600, 
                                                        fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0
                                                    }}>VER TODAS LAS NOTIFICACIONES</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </div>
                            <div className='position-relative' style={{width: 60 / proporcional, height: 60 / proporcional}}
                                onMouseOver={() => {setBotonChat(true)}} 
                                onMouseLeave={() => {setBotonChat(false)}}
                                onClick={() => {setShowMensajes(!show_mensajes); dispatch(mensajesdata(mensajesConstants(0, 0, 0, 0, 0, 0, 10, {}, false).get_mensajes_filter))}}>
                                <img src={boton_chat ? chat_select : chat} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional,
                                        cursor: 'pointer'}} />
                                <div className='position-absolute top-0 end-0 rounded-circle shadow' 
                                    style={{width: 20 / proporcional, height: 20 / proporcional, background: boton_chat ? 'rgb(89, 89, 89)' : '#007bff'}}>
                                    <p className='rounded-circle' style={{lineHeight: `${20 / proporcional}px`, color: 'white', textAlign: 'center',
                                        fontSize: 12 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0
                                    }}>{nro_mensajes}</p>
                                </div> 
                                {
                                    show_mensajes ? (
                                        <div className='shadow-lg position-absolute top-100 overflow-auto' 
                                            style={{width: 400 / proporcional, minHeight: 'auto', maxHeight: 240 / proporcional, padding: 20 / proporcional, left: -200 / proporcional,
                                                background: 'white'}}>
                                            {
                                                lista_mensajes && lista_mensajes.length > 0 ? (
                                                    lista_mensajes.map ((mensaje, index) => {
                                                        return (
                                                            <CardMensajeTablet mensaje={mensaje} index={index} key={index} proporcional={proporcional} cantidad={lista_mensajes.length}/>
                                                        )
                                                    })
                                                ) : null
                                            }
                                            <div className='d-flex justify-content-center' style={{width: '100%', height: 50 / proporcional}}>
                                                <div className='rounded shadow-sm' style={{width: '100%', height: 50 / proporcional, border: '1px solid #007bff',
                                                        background: 'white', cursor: 'pointer'}}  onClick={() => navigate('/panel/mensajes')}>
                                                    <p style={{lineHeight: `${50 / proporcional}px`, color: '#007BFF', textAlign: 'center', fontWeight: 600, 
                                                        fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0
                                                    }}>VER TODAS LOS MENSAJES</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </div>
                            <div className='position-relative' style={{width: 60 / proporcional, height: 60 / proporcional}}
                                onMouseOver={() => {setBotonAgenda(true)}} 
                                onMouseLeave={() => {setBotonAgenda(false)}}
                                onClick={() => {setShowReuniones(!show_reuniones); dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, 0, 10, {}, false).get_reuniones_filter))}}>
                                <img src={boton_agenda ? agenda_select : agenda} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 17 / proporcional,
                                        cursor: 'pointer'}} />
                                <div className='position-absolute top-0 end-0 rounded-circle shadow' 
                                    style={{width: 20 / proporcional, height: 20 / proporcional, background: boton_agenda ? 'rgb(89, 89, 89)' : '#007bff'}}>
                                    <p className='rounded-circle' style={{lineHeight: `${20 / proporcional}px`, color: 'white', textAlign: 'center',
                                        fontSize: 12 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0
                                    }}>{nro_reuniones}</p>
                                </div> 
                                {
                                    show_reuniones ? (
                                        <div className='shadow-lg position-absolute top-100 overflow-auto' 
                                            style={{width: 400 / proporcional, minHeight: 'auto', maxHeight: 240 / proporcional, padding: 20 / proporcional, left: -250 / proporcional,
                                                background: 'white'}}>
                                            {
                                                lista_reuniones && lista_reuniones.length > 0 ? (
                                                    lista_reuniones.map ((reunion, index) => {
                                                        return (
                                                            <CardAgendaTablet reunion={reunion} index={index} key={index} proporcional={proporcional} cantidad={lista_reuniones.length}/>
                                                        )
                                                    })
                                                ) : null
                                            }
                                            <div className='d-flex justify-content-center' style={{width: '100%', height: 50 / proporcional}}>
                                                <div className='rounded shadow-sm' style={{width: '100%', height: 50 / proporcional, border: '1px solid #007bff',
                                                        background: 'white', cursor: 'pointer'}} onClick={() => navigate('/panel/reuniones')}>
                                                    <p style={{lineHeight: `${50 / proporcional}px`, color: '#007BFF', textAlign: 'center', fontWeight: 600, 
                                                        fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0
                                                    }}>VER TODAS LAS REUNIONES</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </div>
                            <img src={boton_settings ? settings_select : settings} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                    cursor: 'pointer'}} onMouseOver={() => setBotonSettings(true)} onMouseLeave={() => setBotonSettings(false)}/>
                            <img src={boton_logout ? logout_select : logout} style={{width: 60 / proporcional, height: 60 / proporcional, padding: 15 / proporcional,
                                    cursor: 'pointer'}} onMouseOver={() => setBotonLogout(true)} onMouseLeave={() => setBotonLogout(false)}
                                    onClick={() => cerrar_sesion()}/>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 60 / proporcional}}>
                    <div className='rounded' 
                        style={{width: '50%', height: 50 / proporcional, border: '1px solid #f2f2f2'}}>
                        <div className='d-flex' style={{width: '100%', height: 48 / proporcional}}>
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
        </div>
    )
}
