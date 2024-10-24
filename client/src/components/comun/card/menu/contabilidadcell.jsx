import React, { useEffect, useState } from 'react'

import menu_contabilidad_grey from '../../../../assets/iconos/menu/lateral/menu_contabilidad_grey.png'
import facturacion from '../../../../assets/iconos/menu/lateral/facturacion.png'
import facturas from '../../../../assets/iconos/menu/lateral/facturas.png'
import finanzas from '../../../../assets/iconos/menu/lateral/finanzas.png'

import right from '../../../../assets/iconos/menu/lateral/right.png'
import down from '../../../../assets/iconos/menu/lateral/down.png'
import dash from '../../../../assets/iconos/menu/lateral/dash.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_opcion_menu_lateral, set_open_menu_lateral } from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CardMenuContabilidadCell({proporcional}) {

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
        if (location.pathname.split ('/')[2] === 'contabilidad'){
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
                    onClick={() => {dispatch (set_opcion_menu_lateral({sector: sector === 'contabilidad' ? '' : 'contabilidad', menu: '', submenu: ''}));
                        navigate ('/panel/contabilidad')}}>
                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                        <img src={menu_contabilidad_grey} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                            marginBottom: 0 / proporcional, color: '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                            Contabilidad
                        </p>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                        <img src={sector === 'contabilidad' ? down : right} style={{width: 30 / proporcional, 
                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                    </div>
                </div>
            </div>
            {
                opcion_menu_lateral.sector === 'contabilidad' ? ( 
                    <div style={{width: '100%', height: 'auto', paddingRight: 10 / proporcional, paddingLeft: 10 / proporcional}}>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'facturacion' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('facturacion')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'facturacion' ? '' : 'facturacion'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'contabilidad', menu: menu === 'facturacion' ? '' : 'facturacion', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={facturacion} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'facturacion' || seleccion_menu === 'facturacion' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Facturación electrónica
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'facturacion' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'facturacion' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/contabilidad/facturacion'); dispatch(set_open_menu_lateral(true));
                                                dispatch (set_opcion_menu_lateral({sector: 'contabilidad', menu: 'facturacion', sub_menu: sub_menu === 'lista-facturacion' ? '' : 'lista-facturacion'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-facturacion')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-facturacion' || sub_menu === 'lista-facturacion' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de facturación
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/contabilidad/facturacion/nuevo'); dispatch(set_open_menu_lateral(true));
                                                dispatch (set_opcion_menu_lateral({sector: 'contabilidad', menu: 'facturacion', sub_menu: sub_menu === 'nuevo-facturacion' ? '' : 'nuevo-facturacion'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('nuevo-facturacion')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-facturacion' || sub_menu === 'nuevo-facturacion' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nueva facturación
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'facturas' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('facturas')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'facturas' ? '' : 'facturas'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'contabilidad', menu: menu === 'facturas' ? '' : 'facturas', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={facturas} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'facturas' || seleccion_menu === 'facturas' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Facturas / boletas
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'facturas' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'facturas' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/contabilidad/facturas'); dispatch(set_open_menu_lateral(true));
                                                dispatch (set_opcion_menu_lateral({sector: 'contabilidad', menu: 'facturas', sub_menu: sub_menu === 'lista-facturas' ? '' : 'lista-facturas'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-facturas')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-facturas' || sub_menu === 'lista-facturas' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de facturas / boletas
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/contabilidad/facturas/nuevo'); dispatch(set_open_menu_lateral(true));
                                                dispatch (set_opcion_menu_lateral({sector: 'contabilidad', menu: 'facturas', sub_menu: sub_menu === 'nuevo-factura' ? '' : 'nuevo-factura'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('nuevo-factura')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-factura' || sub_menu === 'nuevo-factura' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nueva factura / boleta
                                            </p>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'finanzas' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('finanzas')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'finanzas' ? '' : 'finanzas'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'contabilidad', menu: menu === 'finanzas' ? '' : 'finanzas', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={finanzas} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'finanzas' || seleccion_menu === 'finanzas' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Finanzas
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'finanzas' ? down : right} style={{width: 30 / proporcional, 
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
