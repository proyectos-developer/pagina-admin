import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import CardCategoria from './card/categoria.jsx'
import {categoriasdata} from '../../../redux/slice/categoriasdata.js'
import { useNavigate } from 'react-router-dom'
import { categoriasConstants } from '../../../uri/categorias-constants.js'

export default function ListaCategorias ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [begin, setBegin] = useState(0)
    const amount = 16

    const [search_categoria, setSearchCategoria] = useState('')
    const [reset, setReset] = useState(false)

    const [lista_categorias, setListaCategorias] = useState ([])
    const [total_categorias, setTotalCategorias] = useState(0)

    const [boton_nuevo, setBotonNuevo] = useState (false)
    const [boton_reset, setBotonReset] = useState (false)

    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_categorias_filter, delete_categoria} = useSelector(({categorias_data}) => categorias_data)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, begin, amount, {}, false).get_categorias_filter))
    }, [])

    useEffect(() => {
        if (get_categorias_filter && get_categorias_filter.success === true && get_categorias_filter.categorias){
            setTotalCategorias (get_categorias_filter.total_categorias)
            setListaCategorias (get_categorias_filter.categorias)
        }
    }, [get_categorias_filter])

    useEffect(() => {
        if (delete_categoria && delete_categoria.success === true && delete_categoria.categorias){
            setTotalCategorias (delete_categoria.total_categorias)
            setListaCategorias (delete_categoria.categorias)
        }
    }, [delete_categoria])

    const buscar_categorias = (value) => {
        if (value !== ''){
            dispatch(categoriasdata(categoriasConstants(0, value, 0, 0, 0, 16, {}, false).get_categorias_filter))
        }else{
            dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, {}, false).get_categorias_filter))
        }
        setReset(true)
        setSearchCategoria(value)
    }

    const next_categorias = () => {
        if (begin + amount > total_categorias){

        }else{
            setBegin (begin + amount)
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_categorias_filter))
        }
    }

    const previous_categorias = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_categorias_filter))
        }
    }

    const resetear_data = () => {
        setBegin(0)
        setListaCategorias ([])
        setReset(false)
        setSearchCategoria('')
        dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, {}, false).get_categorias_filter))
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
                    categorías
                </p>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', minHeight: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '32%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${50 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Categorias
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_categorias_filter && get_categorias_filter.categorias ? begin + get_categorias_filter.categorias.length : 0} de ${total_categorias}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-center' style={{width: '32%', height: 'auto'}}>
                    <div className='d-flex rounded' 
                        style={{width: reset ? 610 / proporcional : 400 / proporcional, height: 50 / proporcional}}>
                        <input 
                            id='search_categoria'
                            className='form-control rounded-0 border-0'
                            style={{width: 400 / proporcional, height: 50 / proporcional, fontSize: 16 / proporcional,
                                    fontFamily: 'Poppins, sans-serif', fontWeight: 400,
                                    marginRight: reset ? 10 / proporcional : 0}}
                            value={search_categoria}
                            onChange={(event) => buscar_categorias(event.target.value)}
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
                <div className='d-flex justify-content-end' style={{width: '32%', height: 50 / proporcional}}>
                    <div className={boton_nuevo ? 'shadow rounded' : 'rounded'} 
                        style={{width: 250 / proporcional, height: 50 / proporcional, background: '#28A745',
                                cursor: 'pointer'}}
                            onClick={() => navigate('/panel/almacen/categorias/nuevo')}
                            onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nueva categoría
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional,
                    padding: 10 / proporcional, background: 'white', borderBottom: '1px solid #4a4a4a'}}>
                <div className='d-flex justify-content-between' style={{width: '70%', height: 40 / proporcional}}>
                    <div className='' style={{width: '100%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 14 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: '#4a4a4a', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left',
                            cursor: 'default'}}>
                            Nombre categoría
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
                    lista_categorias && lista_categorias.length > 0 ? (
                        lista_categorias.map ((categoria, index) => {
                            return (
                                <CardCategoria proporcional={proporcional} key={index} index={index} categoria={categoria}/>
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
                                onClick={() => {previous_categorias(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_categorias ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_categorias(); window.scrollTo(0, 0)}}>
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
