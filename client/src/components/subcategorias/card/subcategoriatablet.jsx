import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_subcategoria } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import edit from '../../../assets/iconos/comun/edit_v2.png'
import edit_select from '../../../assets/iconos/comun/edit_v1.png'
import view from '../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../assets/iconos/comun/view_v1.png'
import trash from '../../../assets/iconos/comun/trash_v2.png'
import trash_select from '../../../assets/iconos/comun/trash_v1.png'

import {subcategoriasdata} from '../../../redux/slice/subcategoriasdata'
import { subcategoriasConstants } from '../../../uri/subcategorias-constants'

export default function CardSubCategoriaTablet ({proporcional, index, sub_categoria, view_subcategoria}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)
    const [mouse_edit, setMouseEdit] = useState(false)
    const [mouse_view, setMouseView] = useState(false)
    const [mouse_trash, setMouseTrash] = useState(false)

    const ver_categoria = () => {
        dispatch (set_data_subcategoria(sub_categoria))
        navigate (`/panel/subcategorias/subcategoria/${sub_categoria.sub_categoria.replace(' ', '-')}/${sub_categoria.id}`)
    }

    const eliminar_sub_categoria = () => {
        dispatch(subcategoriasdata(subcategoriasConstants(sub_categoria.id, 0, 0, 0, 0, 0, 16, {}, false).delete_subcategoria))
    }

    return (
        <div key={index} style={{width: '100%', height: '100%'}}>
            {
                view_subcategoria === 'grid' ? (
                    <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%',
                        background: 'rgba(244, 244, 244, 0.6)', border: '1px solid #28a745'}}
                        onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                                    <div className='rounded-circle' src={sub_categoria.url_imagen} style={{width: 148 / proporcional, height: 148 / proporcional}}/>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Sub categoría: <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{sub_categoria.sub_categoria}</span>
                                </h4>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${26 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                    Categoría: <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{sub_categoria.categoria}</span>
                                </h6>
                            </div>
                        </div>
                        {
                            over_card ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                                    <div className='d-flex justify-content-between' style={{width: '60%', height: 'auto'}}>
                                        <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => ver_categoria()}
                                                onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>

                                        <img src={mouse_edit ? edit_select : edit} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => ver_categoria()}
                                                onMouseOver={() => setMouseEdit(true)} onMouseLeave={() => setMouseEdit(false)}/>

                                        <img src={mouse_trash ? trash_select : trash} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => eliminar_sub_categoria()}
                                                onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                ) : (
                    <div key={index} className='rounded' style={{width: '100%', height: '100%', 
                            background: over_card ? 'rgba(244, 244, 244, 1)' : 'rgba(244, 244, 244, 0.6)', 
                            borderBottom: '1px solid #28a745'}}>
                        <div style={{width: '100%', height: 'auto', padding: 10 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                                <div className='' style={{width: '40%', height: 40 / proporcional}}>
                                    <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        Sub categoría: <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{sub_categoria.sub_categoria}</span>
                                    </h4>
                                </div>
                                <div className='' style={{width: '40%', height: 40 / proporcional}}>
                                    <h6 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                        color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                        Categoría: <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{sub_categoria.categoria}</span>
                                    </h6>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: '20%', height: 40 / proporcional}}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_categoria()}
                                            onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                                    <img src={mouse_edit ? edit_select : edit} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_categoria()}
                                            onMouseOver={() => setMouseEdit(true)} onMouseLeave={() => setMouseEdit(false)}/>
                                    <img src={mouse_trash ? trash_select : trash} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => eliminar_sub_categoria()}
                                            onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
