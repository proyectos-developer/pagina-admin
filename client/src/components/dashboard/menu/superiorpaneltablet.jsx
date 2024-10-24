import React, { useEffect, useState } from 'react'

import menu_empresa_blue from '../../../assets/iconos/menu/lateral/menu_empresa_blue.png'
import menu_rrhh_blue from '../../../assets/iconos/menu/lateral/menu_rrhh_blue.png'
import menu_proyectos_blue from '../../../assets/iconos/menu/lateral/menu_proyectos_blue.png'
import menu_almacen_blue from '../../../assets/iconos/menu/lateral/menu_almacen_blue.png'
import menu_tienda_blue from '../../../assets/iconos/menu/lateral/menu_tienda_blue.png'
import menu_estadisticas_blue from '../../../assets/iconos/menu/lateral/menu_estadisticas_blue.png'
import menu_contabilidad_blue from '../../../assets/iconos/menu/lateral/menu_contabilidad_blue.png'
import menu_otros_blue from '../../../assets/iconos/menu/lateral/menu_otros_blue.png'

import menu_empresa_white from '../../../assets/iconos/menu/lateral/menu_empresa_white.png'
import menu_rrhh_white from '../../../assets/iconos/menu/lateral/menu_rrhh_white.png'
import menu_proyectos_white from '../../../assets/iconos/menu/lateral/menu_proyectos_white.png'
import menu_almacen_white from '../../../assets/iconos/menu/lateral/menu_almacen_white.png'
import menu_tienda_white from '../../../assets/iconos/menu/lateral/menu_tienda_white.png'
import menu_estadisticas_white from '../../../assets/iconos/menu/lateral/menu_estadisticas_white.png'
import menu_contabilidad_white from '../../../assets/iconos/menu/lateral/menu_contabilidad_white.png'
import menu_otros_white from '../../../assets/iconos/menu/lateral/menu_otros_white.png'
import { useLocation, useNavigate } from 'react-router-dom'

export default function MenuSuperiorPanelTablet ({proporcional}) {

    const location = useLocation()
    const navigate = useNavigate()

    const [pagina, setPagina] = useState('')
    const [seleccion_menu, setSeleccionMenu] = useState('')

    useEffect(() => {
        setPagina(location.pathname.split ('/')[2] === undefined ? '' : location.pathname.split ('/')[2])
    }, [location.pathname])

    return (
        <div style={{width: '100%', height: 'auto', marginBottom: pagina === '' ? 32 / proporcional : 0}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional,
                    marginBottom: 16 / proporcional}}>
                <div className={'shadow-lg rounded-pill'} 
                    style={{width: '24%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'empresa' || pagina === 'empresa' ?
                        '#007bff' : 'white'}} onClick={() => navigate ('/panel/empresa')}
                    onMouseOver={() => setSeleccionMenu('empresa')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'empresa' || pagina === 'empresa' ? menu_empresa_white : menu_empresa_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 16 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'empresa' || pagina === 'empresa' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Empresa</p>
                    </div>
                </div>
                <div className={'shadow-lg rounded-pill'} 
                    style={{width: '24%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'rrhh' || pagina === 'rrhh' ?
                        '#007bff' : 'white'}} onClick={() => navigate ('/panel/rrhh')}
                    onMouseOver={() => setSeleccionMenu('rrhh')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'rrhh' || pagina === 'rrhh' ? menu_rrhh_white : menu_rrhh_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 16 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'rrhh' || pagina === 'rrhh' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>R.R.H.H</p>
                    </div>
                </div>
                <div className={'shadow-lg rounded-pill'} 
                    style={{width: '24%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'contabilidad' || pagina === 'contabilidad' ?
                        '#007bff' : 'white'}} onClick={() => navigate ('/panel/contabilidad')}
                    onMouseOver={() => setSeleccionMenu('contabilidad')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'contabilidad' || pagina === 'contabilidad' ? menu_contabilidad_white : menu_contabilidad_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 16 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'contabilidad' || pagina === 'contabilidad' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Contabilidad</p>
                    </div>
                </div>
                <div className={'shadow-lg rounded-pill'} 
                    style={{width: '24%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'proyectos' || pagina === 'proyectos' ?
                        '#007bff' : 'white'}} onClick={() => navigate ('/panel/proyectos')}
                    onMouseOver={() => setSeleccionMenu('proyectos')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'proyectos' || pagina === 'proyectos' ? menu_proyectos_white : menu_proyectos_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 16 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'proyectos' || pagina === 'proyectos' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Proyectos</p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                <div className={'shadow-lg rounded-pill'} 
                    style={{width: '24%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'almacen' || pagina === 'almacen' ?
                        '#007bff' : 'white'}} onClick={() => navigate ('/panel/almacen')}
                    onMouseOver={() => setSeleccionMenu('almacen')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'almacen' || pagina === 'almacen' ? menu_almacen_white : menu_almacen_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 16 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'almacen' || pagina === 'almacen' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Almacén</p>
                    </div>
                </div>
                <div className={'shadow-lg rounded-pill'} 
                    style={{width: '24%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'tienda' || pagina === 'tienda' ?
                        '#007bff' : 'white'}} onClick={() => navigate ('/panel/tienda')}
                    onMouseOver={() => setSeleccionMenu('tienda')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'tienda' || pagina === 'tienda' ? menu_tienda_white : menu_tienda_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 16 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'tienda' || pagina === 'tienda' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Tienda</p>
                    </div>
                </div>
                <div className={'shadow-lg rounded-pill'} 
                    style={{width: '24%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'estadisticas' || pagina === 'estadisticas' ?
                        '#007bff' : 'white'}} onClick={() => navigate ('/panel/estadisticas')}
                    onMouseOver={() => setSeleccionMenu('estadisticas')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'estadisticas' || pagina === 'estadisticas' ? menu_estadisticas_white : menu_estadisticas_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 16 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'estadisticas' || pagina === 'estadisticas' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Estadísticas</p>
                    </div>
                </div>
                <div className={'shadow-lg rounded-pill'} 
                    style={{width: '24%', height: 'auto', cursor: 'pointer', background: seleccion_menu === 'otros' || pagina === 'otros' ?
                        '#007bff' : 'white'}} onClick={() => navigate ('/panel/otros')}
                    onMouseOver={() => setSeleccionMenu('otros')} onMouseLeave={() => setSeleccionMenu('')}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 60  / proporcional}}>
                        <img src={seleccion_menu === 'otros' || pagina === 'otros' ? menu_otros_white : menu_otros_blue} 
                            style={{width: 60 / proporcional, height: 60 / proporcional, padding: 16 / proporcional}}/>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${60 / proporcional}px`, marginBottom: 0, fontWeight: 500,
                            color: seleccion_menu === 'otros' || pagina === 'otros' ? 'white' : '#00b7ff', fontFamily: 'Poppins, sans-serif'}}>Otros</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
