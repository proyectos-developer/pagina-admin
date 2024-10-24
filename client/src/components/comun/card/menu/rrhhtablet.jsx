import React, { useEffect, useState } from 'react'
/**----------------------------------------------------------------------- */
import menu_rrhh_grey from '../../../../assets/iconos/menu/lateral/menu_rrhh_grey.png'
import personal from '../../../../assets/iconos/menu/lateral/personal.png'
import nominas from '../../../../assets/iconos/menu/lateral/nominas.png'
import estado_trabajo from '../../../../assets/iconos/menu/lateral/estado_trabajo.png'
import birthday from '../../../../assets/iconos/menu/lateral/birthday.png'
import asistencia from '../../../../assets/iconos/menu/lateral/asistencia.png'
import reclutamiento from '../../../../assets/iconos/menu/lateral/reclutamiento.png'
import capacitacion from '../../../../assets/iconos/menu/lateral/capacitacion.png'
import autoatencion from '../../../../assets/iconos/menu/lateral/autoatencion.png'

import right from '../../../../assets/iconos/menu/lateral/right.png'
import down from '../../../../assets/iconos/menu/lateral/down.png'
import dash from '../../../../assets/iconos/menu/lateral/dash.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_opcion_menu_lateral, set_open_menu_lateral } from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CardMenuRrHhTablet ({proporcional}) {

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
        if (location.pathname.split ('/')[2] === 'rrhh'){
            setMenu (location.pathname.split('/')[3])
            if (location.pathname.split ('/')[4] === undefined){
                setSubMenu('lista')
            }else if (location.pathname.split ('/')[6] === undefined){
                setSubMenu('nuevo')
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
                    onClick={() => {dispatch (set_opcion_menu_lateral({sector: sector === 'rrhh' ? '' : 'rrhh', menu: '', submenu: ''}));
                        navigate ('/panel/rrhh')}}>
                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                        <img src={menu_rrhh_grey} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                            marginBottom: 0 / proporcional, color: '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                            Recursos humanos
                        </p>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                        <img src={opcion_menu_lateral.sector === 'rrhh' ? down : right} style={{width: 30 / proporcional, 
                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                    </div>
                </div>
            </div>
            {
                opcion_menu_lateral.sector === 'rrhh' ? ( 
                    <div style={{width: '100%', height: 'auto', paddingRight: 10 / proporcional, paddingLeft: 10 / proporcional}}>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'personal' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('personal')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'personal' ? '' : 'personal'); 
                                        dispatch(set_open_menu_lateral({sector: 'rrhh', menu: menu === 'personal' ? '' : 'personal', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={personal} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'personal' || seleccion_menu === 'personal' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Personal
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'personal' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'personal' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/rrhh/personal'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'rrhh', menu: 'personal', sub_menu: sub_menu === 'lista' ? '' : 'lista'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de personal
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                        cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                        onClick={() => {navigate ('/panel/rrhh/personal/nuevo'); dispatch(set_open_menu_lateral(false));
                                                            dispatch (set_opcion_menu_lateral({sector: 'rrhh', menu: 'personal', sub_menu: 'nuevo'}))}}
                                                        onMouseOver={() => setSeleccionSubMenu('nuevo')}
                                                        onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo' || sub_menu === 'nuevo' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nuevo personal
                                            </p>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'nominas' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('nominas')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'nominas' ? '' : 'nominas'); 
                                        dispatch(set_open_menu_lateral({sector: 'rrhh', menu: menu === 'nominas' ? '' : 'nominas', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={nominas} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'nominas' || seleccion_menu === 'nominas' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Nominas
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'nominas' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'nominas' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/rrhh/nominas'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'rrhh', menu: 'nominas', sub_menu: sub_menu === 'lista' ? '' : 'lista'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de nominas
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                        cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                        onClick={() => {navigate ('/panel/rrhh/nominas/nuevo'); dispatch(set_open_menu_lateral(false));
                                                            dispatch (set_opcion_menu_lateral({sector: 'rrhh', menu: 'nominas', sub_menu: 'nuevo'}))}}
                                                        onMouseOver={() => setSeleccionSubMenu('nuevo')}
                                                        onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo' || sub_menu === 'nuevo' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nueva nomina
                                            </p>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'estado-trabajo' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('estado-trabajo')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'estado-trabajo' ? '' : 'estado-trabajo'); 
                                        dispatch(set_open_menu_lateral({sector: 'rrhh', menu: menu === 'estado-trabajo' ? '' : 'estado-trabajo', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={estado_trabajo} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'estado-trabajo' || seleccion_menu === 'estado-trabajo' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Estado de trabajo
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'estado-trabajo' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'estado-trabajo' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/rrhh/estado-trabajo'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'rrhh', menu: 'estado-trabajo', sub_menu: sub_menu === 'lista' ? '' : 'lista'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de estados trabajo
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                        cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                        onClick={() => {navigate ('/panel/rrhh/estado-trabajo/nuevo'); dispatch(set_open_menu_lateral(false));
                                                            dispatch (set_opcion_menu_lateral({sector: 'rrhh', menu: 'estado-trabajo', sub_menu: 'nuevo'}))}}
                                                        onMouseOver={() => setSeleccionSubMenu('nuevo')}
                                                        onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo' || sub_menu === 'nuevo' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nuevo estado trabajo
                                            </p>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'asistencias' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('asistencias')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'asistencias' ? '' : 'asistencias'); 
                                        dispatch(set_open_menu_lateral({sector: 'rrhh', menu: menu === 'asistencias' ? '' : 'asistencias', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={asistencia} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'asistencias' || seleccion_menu === 'asistencias' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Asistencias
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'asistencias' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'asistencias' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/rrhh/asistencias'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'rrhh', menu: 'asistencias', sub_menu: sub_menu === 'lista' ? '' : 'lista'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de asistencias
                                            </p>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'cumpleanios' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('cumpleanios')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'cumpleanios' ? '' : 'cumpleanios'); 
                                        dispatch(set_open_menu_lateral({sector: 'rrhh', menu: menu === 'cumpleanios' ? '' : 'cumpleanios', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={birthday} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'cumpleanios' || seleccion_menu === 'cumpleanios' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Cumpleaños
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'cumpleanios' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'cumpleanios' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/rrhh/cumpleanios'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'rrhh', menu: 'cumpleanios', sub_menu: sub_menu === 'lista' ? '' : 'lista'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista' || sub_menu === 'lista' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de cumpleanios
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
