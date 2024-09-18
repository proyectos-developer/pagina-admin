import React, { useEffect, useState } from 'react'

import menu_estadisticas_grey from '../../../../assets/iconos/menu/lateral/menu_estadisticas_grey.png'
import favoritos from '../../../../assets/iconos/menu/lateral/favoritos.png'
import calificaciones from '../../../../assets/iconos/menu/lateral/calificaciones.png'
import reportes from '../../../../assets/iconos/menu/lateral/reportes.png'

import right from '../../../../assets/iconos/menu/lateral/right.png'
import down from '../../../../assets/iconos/menu/lateral/down.png'
import dash from '../../../../assets/iconos/menu/lateral/dash.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_opcion_menu_lateral, set_open_menu_lateral } from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CardMenuEstadisticasCell({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const {opcion_menu_lateral} = useSelector(({data_actions}) => data_actions)

    const [sector, setSector] = useState('')
    const [menu, setMenu] = useState('')
    const [sub_menu, setSubMenu] = useState('')
    const [seleccion_menu, setSeleccionMenu] = useState('')
    const [seleccion_sub_menu, setSeleccionSubMenu] = useState('')

    useEffect(() => {
        setSector(location.pathname.split ('/')[2])
        if (location.pathname.split ('/')[2] === 'estadisticas'){
            setMenu (location.pathname.split('/')[3])
            if (location.pathname.split ('/')[4] === undefined){
                setSubMenu(`lista-${location.pathname.split('/')[3]}`)
            }else if (location.pathname.split ('/')[6] === undefined){
                setSubMenu(`nuevo-${location.pathname.split('/')[3].replace('s', '')}`)
            }else{
                setSubMenu('datos')
            }
        }
    }, [location.pathname])

    useEffect(() => {
        setSector (opcion_menu_lateral.sector)
    }, [opcion_menu_lateral.sector])

    useEffect(() => {
        setMenu (opcion_menu_lateral.CardMenuEmpresa)
    }, [opcion_menu_lateral.CardMenuEmpresa])

    useEffect(() => {
        setSubMenu (opcion_menu_lateral.sub_menu)
    }, [opcion_menu_lateral.sub_menu])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                    onClick={() => {dispatch (set_opcion_menu_lateral({sector: sector === 'estadisticas' ? '' : 'estadisticas', menu: '', submenu: ''}));
                        navigate ('/panel/estadisticas')}}>
                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                        <img src={menu_estadisticas_grey} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                            marginBottom: 0 / proporcional, color: '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                            Estadísticas
                        </p>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                        <img src={sector === 'estadisticas' ? down : right} style={{width: 30 / proporcional, 
                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                    </div>
                </div>
            </div>
            {
                opcion_menu_lateral.sector === 'estadisticas' ? ( 
                    <div style={{width: '100%', height: 'auto', paddingRight: 10 / proporcional, paddingLeft: 10 / proporcional}}>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'favoritos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('favoritos')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'favoritos' ? '' : 'favoritos'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'estadisticas', menu: menu === 'favoritos' ? '' : 'favoritos', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={favoritos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'favoritos' || seleccion_menu === 'favoritos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Productos favoritos
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'favoritos' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'favoritos' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/estadisticas/favoritos'); dispatch(set_open_menu_lateral(true));
                                                dispatch (set_opcion_menu_lateral({sector: 'estadisticas', menu: 'favoritos', sub_menu: sub_menu === 'lista-favoritos' ? '' : 'lista-favoritos'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-favoritos')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-favoritos' || sub_menu === 'lista-favoritos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de favoritos
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'calificaciones' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('calificaciones')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'calificaciones' ? '' : 'calificaciones'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'estadisticas', menu: menu === 'calificaciones' ? '' : 'calificaciones', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={calificaciones} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'calificaciones' || seleccion_menu === 'calificaciones' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Calificaciones
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'calificaciones' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'calificaciones' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/estadisticas/calificaciones'); dispatch(set_open_menu_lateral(true));
                                                dispatch (set_opcion_menu_lateral({sector: 'estadisticas', menu: 'calificaciones', sub_menu: sub_menu === 'lista-calificaciones' ? '' : 'lista-calificaciones'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-calificaciones')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-calificaciones' || sub_menu === 'lista-calificaciones' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de categorías
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'reportes' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('reportes')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'reportes' ? '' : 'reportes'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'estadisticas', menu: menu === 'reportes' ? '' : 'reportes', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={reportes} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'reportes' || seleccion_menu === 'reportes' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Reportes
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'reportes' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}
