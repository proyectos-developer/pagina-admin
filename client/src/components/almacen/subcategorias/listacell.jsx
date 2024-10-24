import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import CardSubCategoriaCell from './card/subcategoriacell.jsx'
import {subcategoriasdata} from '../../../redux/slice/subcategoriasdata.js'
import { useNavigate } from 'react-router-dom'
import { subcategoriasConstants } from '../../../uri/subcategorias-constants.js'

export default function ListaCategoriasCell ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [begin, setBegin] = useState(0)
    const amount = 16

    const [search_sub_categoria, setSearchSubCategoria] = useState('')
    const [reset, setReset] = useState(false)

    const [lista_sub_categorias, setListaSubCategorias] = useState ([])
    const [total_sub_categorias, setTotalSubCategorias] = useState(0)

    const [boton_nuevo, setBotonNuevo] = useState (false)
    const [boton_reset, setBotonReset] = useState (false)

    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_subcategorias_filter, delete_subcategoria} = useSelector(({subcategorias_data}) => subcategorias_data)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, begin, amount, {}, false).get_subcategorias_filter))
    }, [])

    useEffect(() => {
        if (get_subcategorias_filter && get_subcategorias_filter.success === true && get_subcategorias_filter.sub_categorias){
            setTotalSubCategorias (get_subcategorias_filter.total_sub_categorias)
            setListaSubCategorias (get_subcategorias_filter.sub_categorias)
        }
    }, [get_subcategorias_filter])

    useEffect(() => {
        if (delete_subcategoria && delete_subcategoria.success === true && delete_subcategoria.sub_categorias){
            setTotalSubCategorias (delete_subcategoria.total_sub_categorias)
            setListaSubCategorias (delete_subcategoria.sub_categorias)
        }
    }, [delete_subcategoria])

    const buscar_sub_categorias = (value) => {
        if (value !== ''){
            dispatch(subcategoriasdata(subcategoriasConstants(0, value, 0, 0, 0, 0, 16, {}, false).get_subcategorias_filter))
        }else{
            dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_subcategorias_filter))
        }
        setReset(true)
        setSearchSubCategoria(value)
    }

    const next_sub_categorias = () => {
        if (begin + amount > total_sub_categorias){

        }else{
            setBegin (begin + amount)
            dispatch (subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_subcategorias_filter))
        }
    }

    const previous_sub_categorias = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_subcategorias_filter))
        }
    }

    const resetear_data = () => {
        setBegin(0)
        setListaSubCategorias ([])
        setReset(false)
        setSearchSubCategoria('')
        dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_subcategorias_filter))
    }

    useEffect(() => {
        return () => {
            
        }
    },[])

    return (
        <div className='position-relative' style={{width: '100%', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel')}>
                    Inicio 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/almacen')}>
                    almacén
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    sub categorías
                </p>
            </div>
            <div className='' style={{width: '100%', minHeight: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${50 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Sub categorias
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_subcategorias_filter && get_subcategorias_filter.sub_categorias ? begin + get_subcategorias_filter.sub_categorias.length : 0} de ${total_sub_categorias}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 50 / proporcional}}>
                    <div className={boton_nuevo ? 'shadow rounded' : 'rounded'} 
                        style={{width: 250 / proporcional, height: 50 / proporcional, background: '#28A745',
                                cursor: 'pointer'}}
                            onClick={() => navigate('/panel/almacen/sub-categorias/nuevo')}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nueva sub categoría
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='rounded' 
                    style={{width: '100%', height: 50 / proporcional}}>
                    <input 
                        id='search_sub_categoria'
                        className='form-control rounded-0 border-0'
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional,
                                fontFamily: 'Poppins, sans-serif', fontWeight: 400,
                                marginRight: reset ? 10 / proporcional : 0}}
                        value={search_sub_categoria}
                        onChange={(event) => buscar_sub_categorias(event.target.value)}
                        placeholder='Buscar por nombre, departamento, documento...'
                    />
                    {
                        reset ? (
                            <div className={boton_reset ? 'shadow rounded' : 'rounded'} 
                                style={{width: 200 / proporcional, height: 50 / proporcional, background: '#28A745',
                                        cursor: 'pointer'}}
                                    onClick={() => resetear_data()}
                                    onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    resetear
                                </p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional,
                    padding: 10 / proporcional, background: 'white', borderBottom: '1px solid #4a4a4a'}}>
                <div className='d-flex justify-content-between' style={{width: '70%', height: 40 / proporcional}}>
                    <div className='' style={{width: '100%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Nombre sub categoría
                        </h4>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Categoría
                        </h4>
                    </div>
                </div>
                <div className='d-flex justify-content-end' style={{width: '30%', height: 40 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center',
                            cursor: 'default'}}>
                            Acciones
                        </h4>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', minHeight: 500 / proporcional}}>
                {
                    lista_sub_categorias && lista_sub_categorias.length > 0 ? (
                        lista_sub_categorias.map ((sub_categoria, index) => {
                            return (
                                <CardSubCategoriaCell proporcional={proporcional} key={index} index={index} sub_categoria={sub_categoria}/>
                            )
                        })
                    ) : null
                }
            </div>              
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_sub_categorias(); window.scrollTo(0, 0)}}>
                                <img src={mouse_preview ? preview_select : preview} 
                                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                                <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                    marginLeft: 5 / proporcional, color: mouse_preview ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                        Anteriores
                                </span>
                            </div>
                        ) : null
                    }
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin + 16 >= total_sub_categorias ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_sub_categorias(); window.scrollTo(0, 0)}}>
                                <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                    marginRight: 5 / proporcional, color: mouse_next ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                        Siguientes
                                </span>
                                <img src={mouse_next ? next_select : next} 
                                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
