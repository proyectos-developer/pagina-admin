import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../../assets/iconos/comun/view_grid_v2.png'
import reset_v2 from '../../../assets/iconos/comun/reset_v2.png'
import reset_v1 from '../../../assets/iconos/comun/reset_v1.png'

import CardFavoritoTablet from './card/favoritotablet.jsx'
import {productosdata} from '../../../redux/slice/productosdata.js'
import { productosConstants } from '../../../uri/productos-constants.js'
import {favoritosdata} from '../../../redux/slice/favoritosdata.js'
import { favoritosConstants } from '../../../uri/favoritos-constants.js'
import {subcategoriasdata} from '../../../redux/slice/subcategoriasdata.js'
import { subcategoriasConstants } from '../../../uri/subcategorias-constants.js'

export default function ListaFavoritosTablet ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefCategoria = useRef(null)
    const selectRefSubCategoria = useRef(null)
    const selectRefUnidad = useRef(null)

    const [view_favorito, setViewFavorito] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [id_categoria, setIdCategoria] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id_sub_categoria, setIdSubCategoria] = useState('')
    const [sub_categoria, setSubCategoria] = useState('')
    const [id_unidad, setIdUnidad] = useState('')
    const [unidad, setUnidad] = useState('')

    const [lista_categorias, setListaCategorias] = useState([])
    const [lista_subcategorias, setListaSubCategorias] = useState([])
    const [lista_unidades, setListaUnidades] = useState([])

    const [lista_grid_favoritos, setListaGridFavoritos] = useState ([])
    const [lista_favoritos, setListaFavoritos] = useState ([])
    const [total_favoritos, setTotalFavoritos] = useState(0)
    const [favoritos, setFavoritos] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_producto_categorias_unidades_servicios} = useSelector(({productos_data}) => productos_data)
    const {get_favoritos_filter} = useSelector(({favoritos_data}) => favoritos_data)
    const {get_subcategorias_categoria} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_producto_categorias_unidades_servicios))
    }, [])

    useEffect(() => {
        if (get_producto_categorias_unidades_servicios && get_producto_categorias_unidades_servicios.success === true &&
            get_producto_categorias_unidades_servicios.categorias && get_producto_categorias_unidades_servicios.unidades &&
            get_producto_categorias_unidades_servicios.servicios){
            setListaCategorias(get_producto_categorias_unidades_servicios.categorias)
            setListaUnidades(get_producto_categorias_unidades_servicios.unidades)
            dispatch(favoritosdata(favoritosConstants(0, 0, 0, 0, 0, 0, begin, amount, {}, false).get_favoritos_filter))
        }
    }, [get_producto_categorias_unidades_servicios])

    useEffect(() => {
        if (get_favoritos_filter && get_favoritos_filter.success === true && get_favoritos_filter.favoritos){
            dividir_nro_columnas(get_favoritos_filter)
        }
    }, [get_favoritos_filter])

    useEffect(() => {
        if (get_subcategorias_categoria && get_subcategorias_categoria.success === true && get_subcategorias_categoria.sub_categorias){
            setListaSubCategorias(get_subcategorias_categoria.sub_categorias)
            dispatch(favoritosdata(favoritosConstants(0, 'categoria', id_categoria, 0, 0, 0, 0, 100, {}, false).get_favoritos_filter))
        }
    }, [get_subcategorias_categoria])

    const next_favoritos = () => {
        if (begin + amount > total_favoritos){

        }else{
            setBegin (begin + amount)
            dispatch (favoritosdata(favoritosConstants(0, 0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_favoritos_filter))
        }
    }

    const previous_favoritos = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (favoritosdata(favoritosConstants(0, 0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_favoritos_filter))
        }
    }

    const dividir_nro_columnas = (data_favoritos) => {
        if (data_favoritos.total_favoritos){setTotalFavoritos(data_favoritos.total_favoritos)}
        let data = data_favoritos.favoritos.length
        let lista = []
        let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setFavoritos (data_favoritos.favoritos)
        setListaGridFavoritos (lista)
        setListaFavoritos (data_favoritos.favoritos)
    }

    const seleccionar_categoria = (value) => {
        if (value !== '0'){
            setBegin(0)
            setListaGridFavoritos([])
            setListaFavoritos([])
            setFavoritos([])
            setIdCategoria(value.split ('-')[0])
            setCategoria(value.split ('-')[1])
            dispatch(subcategoriasdata(subcategoriasConstants(value.split('-')[0], 0, 0, 0, 0, 0, 100, {}, false).get_subcategorias_categoria))
        }
    }

    const seleccionar_sub_categoria = (value) => {
        if (value !== '0'){
            setBegin(0)
            setListaGridFavoritos([])
            setListaFavoritos([])
            setFavoritos([])
            setIdSubCategoria(value.split ('-')[0])
            setSubCategoria(value.split ('-')[1])
            dispatch(favoritosdata(favoritosConstants(0, 'sub_categoria', value.split('-')[0], 0, 0, 0, 0, 100, {}, false).get_favoritos_filter))
        }
    }

    const seleccionar_unidades = (value) => {
        if (value !== '0'){
            setBegin(0)
            setListaGridFavoritos([])
            setListaFavoritos([])
            setFavoritos([])
            setIdUnidad(value.split ('-')[0])
            setUnidad(value.split ('-')[1])
            dispatch(favoritosdata(favoritosConstants(0, 'unidad', value.split('-')[0], 0, 0, 0, 0, 100, {}, false).get_favoritos_filter))
        }
    }

    const resetear_data = () => {
        setBegin (0)
        if (selectRefCategoria.current){
            selectRefCategoria.current.value = '0'
        }
        if (selectRefSubCategoria.current){
            selectRefSubCategoria.current.value = '0'
        }
        if (selectRefUnidad.current){
            selectRefUnidad.current.value = '0'
        }
        setListaGridFavoritos([])
        setListaFavoritos ([])
        setFavoritos([])
        setListaCategorias([])
        setListaSubCategorias([])
        setListaUnidades([])
        setCategoria('Categoría')
        setSubCategoria('Sub categoría')
        setUnidad('Unidad')
        dispatch(favoritosdata(favoritosConstants(0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_favoritos_filter))
    }

    useEffect(() => {
        return () => {
            setListaGridFavoritos([])
            setListaFavoritos ([])
            setFavoritos([])
            setListaCategorias([])
            setListaSubCategorias([])
            setListaUnidades([])
            dispatch(favoritosdata(favoritosConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_favoritos_filter))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '80%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Agregaron a favoritos
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_favoritos_filter && get_favoritos_filter.favoritos ? begin + get_favoritos_filter.favoritos.length : 0} de ${total_favoritos}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                    <img src={view_favorito === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewFavorito('lista')}/>
                    <img src={view_favorito === 'grid' || view_favorito === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewFavorito('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '90%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                <p style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                    marginRight: 10 / proporcional, fontFamily: 'Poppins, sans-serif', fontWeight: 500,
                    cursor: 'default', fontWeight: 500}}>Filtrar por:</p>
                <select
                    ref={selectRefCategoria}
                    className='rounded form-select'
                    id='categoria'
                    style={{width: 200 / proporcional, height: 40 / proporcional, border: '1px solid #007bff',
                            fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginRight: 10 / proporcional}}
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
                <select
                    ref={selectRefSubCategoria}
                    className='rounded form-select'
                    id='sub_categoria'
                    style={{width: 200 / proporcional, height: 40 / proporcional, border: '1px solid #007bff',
                            fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginRight: 10 / proporcional}}
                    onChange={(event) => seleccionar_sub_categoria(event.target.value)}>
                    <option value='0'>{sub_categoria === '' ? 'Sub categoría' : sub_categoria}</option>
                    {
                        lista_subcategorias && lista_subcategorias.length > 0 ? (
                            lista_subcategorias.map ((sub_categoria, index) => {
                                return (
                                    <option key={index} value={sub_categoria.id + '-' + sub_categoria.sub_categoria}>{sub_categoria.sub_categoria}</option>
                                )
                            })
                        ) : null
                    }
                </select>
                <select
                    ref={selectRefUnidad}
                    className='rounded form-select'
                    id='unidad'
                    style={{width: 200 / proporcional, height: 40 / proporcional, border: '1px solid #007bff',
                            fontSize: 16 / proporcional, fontFamily: 'Poppins, sans-serif', marginRight: 10 / proporcional}}
                    onChange={(event) => seleccionar_unidades(event.target.value)}>
                    <option value='0'>{unidad === '' ? 'Unidad' : unidad}</option>
                    {
                        lista_unidades && lista_unidades.length > 0 ? (
                            lista_unidades.map ((unidad, index) => {
                                return (
                                    <option key={index} value={unidad.id + '-' + unidad.unidad}>{unidad.unidad}</option>
                                )
                            })
                        ) : null
                    }
                </select>
            </div>
            {
                lista_grid_favoritos && lista_grid_favoritos.length > 0 && view_favorito === 'grid' ? (
                    lista_grid_favoritos.map ((favorito, numfav) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    favoritos [(2 * numfav)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardFavoritoTablet favorito={favoritos[(2 * numfav)]} key={(2 * numfav)} index={(2 * numfav)} proporcional={proporcional} view_favorito={view_favorito}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    favoritos [((2 * numfav) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardFavoritoTablet favorito={favoritos[((2 * numfav) + 1)]} key={((2 * numfav) + 1)} index={((2 * numfav) + 1)} proporcional={proporcional} view_favorito={view_favorito}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_favoritos && lista_favoritos.length > 0 && view_favorito === 'lista' ? (
                        lista_favoritos.map ((favorito, numfav) => {
                            return (
                                <CardFavoritoTablet favorito={favorito} key={numfav} index={numfav} proporcional={proporcional} view_favorito={view_favorito}/>
                            )
                        })
                ) : null
            }        
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_favorito === 'grid' || view_favorito === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_favoritos(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_favoritos ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_favoritos(); window.scrollTo(0, 0)}}>
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
