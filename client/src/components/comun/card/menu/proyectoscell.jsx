import React, { useEffect, useState } from 'react'

import menu_proyectos_grey from '../../../../assets/iconos/menu/lateral/menu_proyectos_grey.png'
import negocios from '../../../../assets/iconos/menu/lateral/clientes.png'
import tipo_proyectos from '../../../../assets/iconos/menu/lateral/tipo_proyectos.png'
import proyectos from '../../../../assets/iconos/menu/lateral/proyectos.png'
import gestion from '../../../../assets/iconos/menu/lateral/gestion.png'
import presupuestos from '../../../../assets/iconos/menu/lateral/presupuestos.png'

import right from '../../../../assets/iconos/menu/lateral/right.png'
import down from '../../../../assets/iconos/menu/lateral/down.png'
import dash from '../../../../assets/iconos/menu/lateral/dash.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_opcion_menu_lateral, set_open_menu_lateral } from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CardMenuProyectosCell({proporcional}) {

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
        if (location.pathname.split ('/')[2] === 'proyectos'){
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
                    onClick={() => {dispatch (set_opcion_menu_lateral({sector: sector === 'proyectos' ? '' : 'proyectos', menu: '', submenu: ''}));
                        navigate('/panel/proyectos')}}>
                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                        <img src={menu_proyectos_grey} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                            marginBottom: 0 / proporcional, color: '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                            Proyectos
                        </p>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                        <img src={sector === 'proyectos' ? down : right} style={{width: 30 / proporcional, 
                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                    </div>
                </div>
            </div>
            {
                opcion_menu_lateral.sector === 'proyectos' ? ( 
                    <div style={{width: '100%', height: 'auto', paddingRight: 10 / proporcional, paddingLeft: 10 / proporcional}}>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'negocios' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('negocios')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'negocios' ? '' : 'negocios'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'proyectos', menu: menu === 'negocios' ? '' : 'negocios', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={negocios} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'negocios' || seleccion_menu === 'negocios' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Negocios
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'negocios' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'negocios' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/proyectos/negocios'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'negocios', sub_menu: sub_menu === 'lista-negocios' ? '' : 'lista-negocios'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-negocios')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-negocios' || sub_menu === 'lista-negocios' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de negocios
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/proyectos/negocios/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'negocios', sub_menu: sub_menu === 'nuevo-negocio' ? '' : 'nuevo-negocio'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-negocio')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-negocio' || sub_menu === 'nuevo-negocio' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nuevo cliente
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'tipos-proyectos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('tipos-proyectos')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'tipos-proyectos' ? '' : 'tipos-proyectos'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'proyectos', menu: menu === 'tipos-proyectos' ? '' : 'tipos-proyectos', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={tipo_proyectos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'tipos-proyectos' || seleccion_menu === 'tipos-proyectos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Tipos de proyectos
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'tipos-proyectos' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'tipos-proyectos' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/proyectos/tipos-proyectos'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'tipos-proyectos', sub_menu: sub_menu === 'lista-tipos-proyectos' ? '' : 'lista-tipos-proyectos'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-tipos-proyectos')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-tipos-proyectos' || sub_menu === 'lista-tipos-proyectos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de tipos de proyectos
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/proyectos/tipos-proyectos/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'tipos-proyectos', sub_menu: sub_menu === 'nuevo-tipo-proyectos' ? '' : 'nuevo-tipo-proyectos'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-tipo-proyectos')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-tipo-proyectos' || sub_menu === 'nuevo-tipo-proyectos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nuevo tipo de proyecto
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'proyectos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('proyectos')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'proyectos' ? '' : 'proyectos'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'proyectos', menu: menu === 'proyectos' ? '' : 'proyectos', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={proyectos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'proyectos' || seleccion_menu === 'proyectos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Proyectos
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'proyectos' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'proyectos' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/proyectos/proyectos'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'proyectos', sub_menu: sub_menu === 'lista-proyectos' ? '' : 'lista-proyectos'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-proyectos')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-proyectos' || sub_menu === 'lista-proyectos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de proyectos
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/proyectos/proyectos/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'proyectos', sub_menu: sub_menu === 'nuevo-proyecto' ? '' : 'nuevo-proyecto'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-proyecto')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-proyecto' || sub_menu === 'nuevo-proyecto' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nuevo proyecto
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'gestion-proyectos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('gestion-proyectos')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'gestion-proyectos' ? '' : 'gestion-proyectos'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'proyectos', menu: menu === 'gestion-proyectos' ? '' : 'gestion-proyectos', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={gestion} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'gestion-proyectos' || seleccion_menu === 'gestion-proyectos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Gestión proyectos
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'gestion-proyectos' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'gestion-proyectos' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/proyectos/gestion-proyectos'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'proyectos', sub_menu: sub_menu === 'lista-gestion-proyectos' ? '' : 'lista-gestion-proyectos'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-gestion-proyectos')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-gestion-proyectos' || sub_menu === 'lista-gestion-proyectos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de proyectos
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/proyectos/gestion-proyectos/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'proyectos', sub_menu: sub_menu === 'nuevo-getion-proyecto' ? '' : 'nuevo-getion-proyecto'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-getion-proyecto')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-getion-proyecto' || sub_menu === 'nuevo-getion-proyecto' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nuevo proyecto
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'presupuestos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('presupuestos')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'presupuestos' ? '' : 'presupuestos'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'proyectos', menu: menu === 'presupuestos' ? '' : 'presupuestos', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={presupuestos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'presupuestos' || seleccion_menu === 'presupuestos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Cotizaciones
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'presupuestos' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'presupuestos' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/proyectos/presupuestos'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'presupuestos', sub_menu: sub_menu === 'lista-presupuestos' ? '' : 'lista-presupuestos'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-presupuestos')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-presupuestos' || sub_menu === 'lista-presupuestos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de cotizaciones
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/proyectos/presupuestos/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'proyectos', menu: 'presupuestos', sub_menu: sub_menu === 'nuevo-preupuesto' ? '' : 'nuevo-preupuesto'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-preupuesto')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-preupuesto' || sub_menu === 'nuevo-preupuesto' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nuevo cotización
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}
