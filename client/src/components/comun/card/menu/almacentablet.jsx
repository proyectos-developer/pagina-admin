import React, { useEffect, useState } from 'react'

import menu_almacen_grey from '../../../../assets/iconos/menu/lateral/menu_almacen_grey.png'
import productos from '../../../../assets/iconos/menu/lateral/productos.png'
import proveedores from '../../../../assets/iconos/menu/lateral/proveedores.png'
import marcas from '../../../../assets/iconos/menu/lateral/marcas.png'
import categorias from '../../../../assets/iconos/menu/lateral/categorias.png'
import subcategorias from '../../../../assets/iconos/menu/lateral/subcategorias.png'
import medida from '../../../../assets/iconos/menu/lateral/medida.png'

import right from '../../../../assets/iconos/menu/lateral/right.png'
import down from '../../../../assets/iconos/menu/lateral/down.png'
import dash from '../../../../assets/iconos/menu/lateral/dash.png'

import { useDispatch, useSelector } from 'react-redux'
import { set_opcion_menu_lateral, set_open_menu_lateral } from '../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CardMenuAlmacenTablet({proporcional}) {

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
        if (location.pathname.split ('/')[2] === 'almacen'){
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
                    onClick={() => {dispatch (set_opcion_menu_lateral({sector: sector === 'almacen' ? '' : 'almacen', menu: '', submenu: ''}));
                        navigate ('/panel/almacen')}}>
                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                        <img src={menu_almacen_grey} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                            marginBottom: 0 / proporcional, color: '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                            Almacén
                        </p>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                        <img src={sector === 'almacen' ? down : right} style={{width: 30 / proporcional, 
                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                    </div>
                </div>
            </div>
            {
                opcion_menu_lateral.sector === 'almacen' ? ( 
                    <div style={{width: '100%', height: 'auto', paddingRight: 10 / proporcional, paddingLeft: 10 / proporcional}}>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'proveedores' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('proveedores')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'proveedores' ? '' : 'proveedores'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'almacen', menu: menu === 'proveedores' ? '' : 'proveedores', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={proveedores} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'proveedores' || seleccion_menu === 'proveedores' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Proveedores
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'proveedores' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'proveedores' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/almacen/proveedores'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'proveedores', sub_menu: sub_menu === 'lista-proveedores' ? '' : 'lista-proveedores'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-proveedores')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-proveedores' || sub_menu === 'lista-proveedores' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de proveedores
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/almacen/proveedores/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'proveedores', sub_menu: sub_menu === 'nuevo-proveedor' ? '' : 'nuevo-proveedor'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-proveedor')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-proveedor' || sub_menu === 'nuevo-proveedor' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nuevo proveedor
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'marcas' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('marcas')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'marcas' ? '' : 'marcas'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'almacen', menu: menu === 'marcas' ? '' : 'marcas', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={marcas} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'marcas' || seleccion_menu === 'marcas' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Marcas
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'marcas' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'marcas' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/almacen/marcas'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'marcas', sub_menu: sub_menu === 'lista-marcas' ? '' : 'lista-marcas'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-marcas')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-marcas' || sub_menu === 'lista-marcas' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de marcas
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/almacen/marcas/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'marcas', sub_menu: sub_menu === 'nuevo-marca' ? '' : 'nuevo-marca'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-marca')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-marca' || sub_menu === 'nuevo-marca' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nueva marca
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'productos' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('productos')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'productos' ? '' : 'productos'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'almacen', menu: menu === 'productos' ? '' : 'productos', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={productos} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'productos' || seleccion_menu === 'productos' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Productos
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'productos' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'productos' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/almacen/productos'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'productos', sub_menu: sub_menu === 'lista-productos' ? '' : 'lista-productos'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-productos')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-productos' || sub_menu === 'lista-productos' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de productos
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/almacen/productos/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'productos', sub_menu: sub_menu === 'nuevo-producto' ? '' : 'nuevo-producto'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-producto')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-producto' || sub_menu === 'nuevo-producto' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nuevo producto
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'categorias' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('categorias')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'categorias' ? '' : 'categorias'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'almacen', menu: menu === 'categorias' ? '' : 'categorias', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={categorias} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'categorias' || seleccion_menu === 'categorias' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Categorías
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'categorias' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'categorias' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/almacen/categorias'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'categorias', sub_menu: sub_menu === 'lista-categorias' ? '' : 'lista-categorias'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-categorias')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-categorias' || sub_menu === 'lista-categorias' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de categorías
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/almacen/categorias/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'categorias', sub_menu: sub_menu === 'nuevo-categoria' ? '' : 'nuevo-categoria'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-categoria')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-categoria' || sub_menu === 'nuevo-categoria' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nueva categoría
                                            </p>
                                        </div>
                                    </div>
                                    ) : null
                                }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'sub-categorias' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('sub-categorias')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'sub-categorias' ? '' : 'sub-categorias'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'almacen', menu: menu === 'sub-categorias' ? '' : 'sub-categorias', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={subcategorias} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'sub-categorias' || seleccion_menu === 'sub-categorias' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Sub categorías
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'sub-categorias' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'sub-categorias' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/almacen/sub-categorias'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'sub-categorias', sub_menu: sub_menu === 'lista-sub-categorias' ? '' : 'lista-sub-categorias'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-sub-categorias')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-sub-categorias' || sub_menu === 'lista-sub-categorias' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de sub categorías
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/almacen/sub-categorias/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'sub-categorias', sub_menu: sub_menu === 'nuevo-ub-categoria' ? '' : 'nuevo-ub-categoria'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-ub-categoria')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-ub-categoria' || sub_menu === 'nuevo-ub-categoria' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nueva sub categoría
                                            </p>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 40 / proporcional, paddingTop: 5 / proporcional, 
                                marginBottom: 5 / proporcional, marginTop: 5 / proporcional, paddingBottom: 5 / proporcional}}>
                                <div className={seleccion_menu === 'unidades' ? 'd-flex justify-content-between rounded shadow-sm' :
                                        'd-flex justify-content-between'} style={{width: '100%', height: 30 / proporcional, cursor: 'pointer'}}
                                    onMouseOver={() => setSeleccionMenu('unidades')} onMouseLeave={() => setSeleccionMenu('')}
                                    onClick={() => {setMenu(menu === 'unidades' ? '' : 'unidades'); 
                                        dispatch(set_opcion_menu_lateral({sector: 'almacen', menu: menu === 'unidades' ? '' : 'unidades', sub_menu: ''}))}}>
                                    <div className='d-flex' style={{width: 'auto', height: 30 / proporcional}}>
                                        <img src={medida} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                        <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                            marginBottom: 0 / proporcional, color: menu === 'unidades' || seleccion_menu === 'unidades' ? '#28a745' :  '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                            Unidades
                                        </p>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{width: 30 / proporcional, height: 30 / proporcional}}>
                                        <img src={menu === 'unidades' ? down : right} style={{width: 30 / proporcional, 
                                            height: 30 / proporcional, padding: 8 / proporcional, cursor: 'pointer'}}/>
                                    </div>
                                </div>
                            </div>
                            {
                                menu === 'unidades' ? (
                                    <div style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                                        <div className='d-flex'
                                                style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                            cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                            onClick={() => {navigate ('/panel/almacen/unidades'); dispatch(set_open_menu_lateral(false));
                                                dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'unidades', sub_menu: sub_menu === 'lista-unidades' ? '' : 'lista-unidades'}))
                                            }}
                                            onMouseOver={() => setSeleccionSubMenu('lista-unidades')}
                                            onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'lista-unidades' || sub_menu === 'lista-unidades' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Lista de unidades
                                            </p>
                                        </div>
                                        <div className='d-flex'
                                            style={{width: '100%', height: 30 / proporcional, marginTop: 5 / proporcional,
                                                    cursor: 'pointer', marginBottom: 5 / proporcional}} 
                                                    onClick={() => {navigate ('/panel/almacen/unidades/nuevo'); dispatch(set_open_menu_lateral(false));
                                                        dispatch (set_opcion_menu_lateral({sector: 'almacen', menu: 'unidades', sub_menu: sub_menu === 'nuevo-unidade' ? '' : 'nuevo-unidade'}))}}
                                                    onMouseOver={() => setSeleccionSubMenu('nuevo-unidade')}
                                                    onMouseLeave={() => setSeleccionSubMenu('')}>
                                            <img src={dash} style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                                                    paddingLeft: 0, paddingRight: 10 / proporcional, marginRight: 8 / proporcional}}/>
                                            <p style={{fontSize: 14 / proporcional, fontFamily: 'Poppins, sans-serif', lineHeight: `${30 / proporcional}px`, 
                                                marginBottom: 0 / proporcional, color: seleccion_sub_menu === 'nuevo-unidade' || sub_menu === 'nuevo-unidade' ? '#28a745' :'#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                                Nueva unidad
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
