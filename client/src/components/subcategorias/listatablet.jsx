import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../assets/iconos/comun/next_v2.png'
import next_select from '../../assets/iconos/comun/next_v1.png'
import preview from '../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../assets/iconos/comun/view_grid_v2.png'
import reset_v2 from '../../assets/iconos/comun/reset_v2.png'
import reset_v1 from '../../assets/iconos/comun/reset_v1.png'

import CardSubCategoriaTablet from './card/subcategoriatablet.jsx'
import {categoriasdata} from '../../redux/slice/categoriasdata.js'
import { categoriasConstants } from '../../uri/categorias-constants.js'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata.js'
import { subcategoriasConstants } from '../../uri/subcategorias-constants.js'

export default function ListaSubCategoriasTablet ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefCategoria = useRef(null)

    const [id_categoria, setIdCategoria] = useState('')
    const [categoria, setCategoria] = useState('')
    const [lista_categorias, setListaCattegorias] = useState([])

    const [view_subcategoria, setViewSubCategoria] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_sub_categorias, setListaGridSubCategorias] = useState ([])
    const [lista_sub_categorias, setListaSubCategorias] = useState ([])
    const [total_sub_categorias, setTotalSubCategorias] = useState(0)
    const [sub_categorias, setSubCategorias] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next_up, setMouseNextUp] = useState(false)
    const [mouse_preview_up, setMousePreviewUp] = useState(false)
    const [mouse_next_down, setMouseNextDown] = useState(false)
    const [mouse_preview_down, setMousePreviewDown] = useState(false)

    const {get_subcategorias_filter, delete_subcategoria,
            get_subcategorias_categoria
    } = useSelector(({subcategorias_data}) => subcategorias_data)
    const {get_categorias_filter} = useSelector(({categorias_data}) => categorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 100, {}, false).get_categorias_filter))
    }, [])

    useEffect(() => {
        if (get_categorias_filter && get_categorias_filter.success === true && get_categorias_filter.categorias){
            setListaCattegorias(get_categorias_filter.categorias)
            dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, begin, amount, {}, false).get_subcategorias_filter))
        }
    }, [get_categorias_filter])

    useEffect(() => {
        if (get_subcategorias_filter && get_subcategorias_filter.success === true && get_subcategorias_filter.sub_categorias){
            dividir_nro_columnas(get_subcategorias_filter)
        }
    }, [get_subcategorias_filter])


    useEffect(() => {
        if (get_subcategorias_categoria && get_subcategorias_categoria.success === true && get_subcategorias_categoria.sub_categorias){
            dividir_nro_columnas(get_subcategorias_categoria)
        }
    }, [get_subcategorias_categoria])

    useEffect(() => {
        if (delete_subcategoria && delete_subcategoria.success === true && delete_subcategoria.sub_categorias){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_subcategoria)
            dispatch (subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 16, {}, true).delete_subcategoria))
        }
    }, [delete_subcategoria])

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

    const dividir_nro_columnas = (data_sub_categorias) => {
        if (data_sub_categorias.total_sub_categorias){setTotalSubCategorias(data_sub_categorias.total_sub_categorias)}
        let data = data_sub_categorias.sub_categorias.length
        let lista = []
        let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setSubCategorias (data_sub_categorias.sub_categorias)
        setListaGridSubCategorias (lista)
        setListaSubCategorias (data_sub_categorias.sub_categorias)
    }

    const seleccionar_categoria = (value) => {
        if (value !== '0'){
            setBegin(0)
            setListaSubCategorias([])
            setListaGridSubCategorias([])
            setSubCategorias([])
            setIdCategoria(value.split ('-')[0])
            setCategoria(value.split ('-')[1])
            dispatch(subcategoriasdata(subcategoriasConstants(value.split('-')[0], 0, 0, 0, 0, 0, 16, {}, false).get_subcategorias_categoria))
        }
    }

    const resetear_data = () => {
        setBegin (0)
        if (selectRefCategoria.current){
            selectRefCategoria.current.value = '0'
        }
        setCategoria('Categoría')
        dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_subcategorias_filter))
    }

    useEffect(() => {
        return () => {
            setListaGridSubCategorias([])
            setListaSubCategorias ([])
            setSubCategorias([])
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '80%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Tus sub categorías
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_subcategorias_filter && get_subcategorias_filter.sub_categorias ? begin + get_subcategorias_filter.sub_categorias.length : 0} de ${total_sub_categorias}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '20%', height: 'auto'}}>
                    <img src={view_subcategoria === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewSubCategoria('lista')}/>
                    <img src={view_subcategoria === 'grid' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => setViewSubCategoria('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 2 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-start' style={{width: '10%', height: 40 / proporcional}}>
                    <img src={mouse_preview_up ? preview_select : preview}
                        onMouseOver={() => setMousePreviewUp(true)} onMouseLeave={() => setMousePreviewUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => previous_sub_categorias()}/>
                </div>
                <div className='d-flex justify-content-center' style={{width: '80%', height: 40 / proporcional}}>
                    <p style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                        marginRight: 10 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500,
                        cursor: 'default', fontWeight: 500}}>Filtrar por:</p>
                    <select
                        ref={selectRefCategoria}
                        className='rounded form-select'
                        id='categoria'
                        style={{width: 300 / proporcional, height: 40 / proporcional, border: '1px solid #007bff',
                                fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif'}}
                        onChange={(event) => seleccionar_categoria(event.target.value)}>
                        <option value='0'>{categoria === '' ? 'Categoría' : categoria}</option>
                        {
                            lista_categorias && lista_categorias.length > 0 ? (
                                lista_categorias.map ((categoria, index) => {
                                    return (
                                        <option key={index} value={categoria.id + '-' + categoria.categoria}>{categoria.categoria}</option>
                                    )
                                })
                            ) : null
                        }
                    </select>
                </div>
                <div className='d-flex justify-content-end' style={{width: '10%', height: 40 / proporcional}}>
                    <img src={mouse_next_up ? next_select : next} 
                        onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => next_sub_categorias()}/>
                </div>
            </div>
            {
                lista_grid_sub_categorias && lista_grid_sub_categorias.length > 0 && view_subcategoria === 'grid' ? (
                    lista_grid_sub_categorias.map ((sub_categoria, numsub) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    sub_categorias [(2 * numsub)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardSubCategoriaTablet sub_categoria={sub_categorias[(2 * numsub)]} key={(2 * numsub)} index={(2 * numsub)} proporcional={proporcional} view_subcategoria={view_subcategoria}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    sub_categorias [((2 * numsub) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardSubCategoriaTablet sub_categoria={sub_categorias[((2 * numsub) + 1)]} key={((2 * numsub) + 1)} index={((2 * numsub) + 1)} proporcional={proporcional} view_subcategoria={view_subcategoria}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_sub_categorias && lista_sub_categorias.length > 0 && view_subcategoria === 'lista' ? (
                        lista_sub_categorias.map ((sub_categoria, numsub) => {
                            return (
                                <CardSubCategoriaTablet sub_categoria={sub_categoria} key={numsub} index={numsub} proporcional={proporcional} view_subcategoria={view_subcategoria}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_subcategoria === 'grid' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_down ? preview_select : preview} 
                        onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {previous_sub_categorias(); window.scrollTo(0, 0)}}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_down ? next_select : next} 
                        onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {next_sub_categorias(); window.scrollTo(0, 0)}}/>
                </div>
            </div>
        </div>
    )
}
