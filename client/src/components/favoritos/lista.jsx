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

import CardFavorito from './card/favorito.jsx'
import {productosdata} from '../../redux/slice/productosdata.js'
import { productosConstants } from '../../uri/productos-constants.js'
import {favoritosdata} from '../../redux/slice/favoritosdata.js'
import { favoritosConstants } from '../../uri/favoritos-constants.js'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata.js'
import { subcategoriasConstants } from '../../uri/subcategorias-constants.js'

export default function ListaFavoritos ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefCategoria = useRef(null)
    const selectRefSubCategoria = useRef(null)
    const selectRefUnidad = useRef(null)

    const [boton_reset, setBotonReset] = useState (false)
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

    const [mouse_next_up, setMouseNextUp] = useState(false)
    const [mouse_preview_up, setMousePreviewUp] = useState(false)
    const [mouse_next_down, setMouseNextDown] = useState(false)
    const [mouse_preview_down, setMousePreviewDown] = useState(false)

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
        let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
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
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
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
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewFavorito('lista')}/>
                    <img src={view_favorito === 'grid' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => setViewFavorito('grid')}/>
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
                        onClick={() => previous_favoritos()}/>
                </div>
                <div className='d-flex justify-content-center' style={{width: '80%', height: 40 / proporcional}}>
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
                <div className='d-flex justify-content-end' style={{width: '10%', height: 40 / proporcional}}>
                    <img src={mouse_next_up ? next_select : next} 
                        onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => next_favoritos()}/>
                </div>
            </div>
            {
                lista_grid_favoritos && lista_grid_favoritos.length > 0 && view_favorito === 'grid' ? (
                    lista_grid_favoritos.map ((favorito, numfav) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    favoritos [(4 * numfav)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardFavorito favorito={favoritos[(4 * numfav)]} key={(4 * numfav)} index={(4 * numfav)} proporcional={proporcional} view_favorito={view_favorito}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    favoritos [((4 * numfav) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardFavorito favorito={favoritos[((4 * numfav) + 1)]} key={((4 * numfav) + 1)} index={((4 * numfav) + 1)} proporcional={proporcional} view_favorito={view_favorito}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    favoritos [((4 * numfav) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardFavorito favorito={favoritos[((4 * numfav) + 2)]} key={((4 * numfav) + 2)} index={((4 * numfav) + 2)} proporcional={proporcional} view_favorito={view_favorito}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    favoritos [((4 * numfav) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardFavorito favorito={favoritos[((4 * numfav) + 3)]} key={((4 * numfav) + 3)} index={((4 * numfav) + 3)} proporcional={proporcional} view_favorito={view_favorito}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_favoritos && lista_favoritos.length > 0 && view_favorito === 'lista' ? (
                        lista_favoritos.map ((favorito, numfav) => {
                            return (
                                <CardFavorito favorito={favorito} key={numfav} index={numfav} proporcional={proporcional} view_favorito={view_favorito}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_favorito === 'grid' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_down ? preview_select : preview} 
                        onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {previous_favoritos(); window.scrollTo(0, 0)}}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_down ? next_select : next} 
                        onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {next_favoritos(); window.scrollTo(0, 0)}}/>
                </div>
            </div>
        </div>
    )
}
