import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_productos } from '../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import edit from '../../../../assets/iconos/comun/edit_v2.png'
import edit_select from '../../../../assets/iconos/comun/edit_v1.png'
import view from '../../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../../assets/iconos/comun/view_v1.png'
import trash from '../../../../assets/iconos/comun/trash_v2.png'
import trash_select from '../../../../assets/iconos/comun/trash_v1.png'
import on from '../../../../assets/iconos/comun/on.png'
import off from '../../../../assets/iconos/comun/off.png'

import {productosdata} from '../../../../redux/slice/productosdata'
import { productosConstants } from '../../../../uri/productos-constants'

export default function CardProductoCell ({proporcional, index, producto, view_producto}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [habilitado, setHabilitado] = useState(false)

    const [over_card, setOverCard] = useState(false)
    const [mouse_edit, setMouseEdit] = useState(false)
    const [mouse_view, setMouseView] = useState(false)
    const [mouse_trash, setMouseTrash] = useState(false)

    useEffect(() => {
        setHabilitado (producto.habilitar_producto)
    }, [])

    const ver_producto = () => {
        dispatch (set_data_productos(producto))
        navigate (`/panel/almacen/productos/producto/${producto.producto.replace(' ', '-')}/${producto.id}`)
    }

    const eliminar_producto = () => {
        dispatch(productosdata(productosConstants(producto.id, 0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).delete_producto))
    }

    const habilitar_on_off = () => {
        const data = {
            habilitar_producto: !habilitado
        }
        setHabilitado(!habilitado)
        dispatch(productosdata(productosConstants(producto.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, data, false).update_habilitar_producto))
    }

    return (
        <div key={index} style={{width: '100%', height: '100%'}}>
            {
                view_producto === 'grid' ? (
                    <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%',
                        background: 'rgba(244, 244, 244, 0.6)', border: '1px solid #28a745'}}
                        onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                                    {
                                        producto.url_foto_principal !== '' ? (
                                            <img className='rounded-circle' src={producto.url_foto_principal} 
                                                style={{width: 148 / proporcional, height: 148 / proporcional}}/>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Producto: <span style={{color: '#007BFF', fontSize: 18 / proporcional}}>{producto.producto}</span>
                                </h4>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Categoría: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>{producto.categoria}</span>
                                </h6>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Sub categoría: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>{producto.subcategoria}</span>
                                </h6>
                            </div>
                        </div>
                        {
                            over_card ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                                    <div className='d-flex justify-content-between' style={{width: '60%', height: 'auto'}}>
                                        <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => ver_producto()}
                                                onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>

                                        <img src={mouse_edit ? edit_select : edit} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => ver_producto()}
                                                onMouseOver={() => setMouseEdit(true)} onMouseLeave={() => setMouseEdit(false)}/>

                                        <img src={mouse_trash ? trash_select : trash} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => eliminar_producto()}
                                                onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                                                
                                        <img src={habilitado ? on : off} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => habilitar_on_off()}/>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                ) : (
                    <div key={index} className='rounded' style={{width: '100%', height: 100 / proporcional, 
                            background: over_card ? 'rgba(244, 244, 244, 1)' : 'rgba(244, 244, 244, 0.6)', 
                            borderBottom: '1px solid #28a745'}}>
                        <div style={{width: '100%', height: 100 / proporcional, padding: 10 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 80 / proporcional}}>
                                <div className='' style={{width: '70%', height: 80 / proporcional}}>
                                    <div style={{width: '100%', height: 'auto'}}>
                                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                            <span style={{fonstSize: 16 / proporcional}}><strong>{index + 1}. </strong></span><span style={{color: '#007BFF', fontSize: 18 / proporcional}}>{producto.producto}</span>
                                        </h4>
                                    </div>
                                    <div style={{width: '100%', height: 'auto'}}>
                                        <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                            Categoría: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>{producto.categoria}</span>
                                        </h6>
                                    </div>
                                    <div style={{width: '100%', height: 'auto'}}>
                                        <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                            Sub categoría: <span style={{color: '#007BFF', fontSize: 16 / proporcional}}>{producto.subcategoria}</span>
                                        </h6>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: '30%', height: 80 / proporcional,
                                        padding: 20 / proporcional
                                }}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_producto()}
                                            onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                                    <img src={mouse_edit ? edit_select : edit} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_producto()}
                                            onMouseOver={() => setMouseEdit(true)} onMouseLeave={() => setMouseEdit(false)}/>
                                    <img src={mouse_trash ? trash_select : trash} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => eliminar_producto()}
                                            onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                                    <img src={habilitado ? on : off} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 8 / proporcional, cursor: 'pointer'}}
                                            onClick={() => habilitar_on_off()}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
