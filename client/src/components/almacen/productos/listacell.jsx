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

import agregar_nuevo from '../../../assets/iconos/comun/agregar_nuevo.png'

import CardProductoCell from './card/productocell.jsx'
import {productosdata} from '../../../redux/slice/productosdata.js'
import { productosConstants } from '../../../uri/productos-constants.js'
import {subcategoriasdata} from '../../../redux/slice/subcategoriasdata.js'
import { subcategoriasConstants } from '../../../uri/subcategorias-constants.js'
import { useNavigate } from 'react-router-dom'

export default function ListaProductosCell ({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectRefCategoria = useRef(null)
    const selectRefSubCategoria = useRef(null)
    const selectRefUnidad = useRef(null)

    const [view_producto, setViewProducto] = useState ('grid')
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

    const [lista_grid_productos, setListaGridProductos] = useState ([])
    const [lista_productos, setListaProductos] = useState ([])
    const [total_productos, setTotalProductos] = useState(0)

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_productos_filter, delete_producto,
            get_producto_categorias_unidades_servicios} = useSelector(({productos_data}) => productos_data)
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
            dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, begin, amount, {}, false).get_productos_filter))
        }
    }, [get_producto_categorias_unidades_servicios])

    useEffect(() => {
        if (get_subcategorias_categoria && get_subcategorias_categoria.success === true && get_subcategorias_categoria.sub_categorias){
            setListaSubCategorias(get_subcategorias_categoria.sub_categorias)
            dispatch(productosdata(productosConstants(0, 0, 'categoria', id_categoria, 0, 0, 0, 0, 0, 100, {}, false).get_productos_filter))
        }
    }, [get_subcategorias_categoria])

    useEffect(() => {
        if (get_productos_filter && get_productos_filter.success === true && get_productos_filter.productos){
            dividir_nro_columnas(get_productos_filter)
        }
    }, [get_productos_filter])

    useEffect(() => {
        if (delete_producto && delete_producto.success === true && delete_producto.productos){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_producto)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 16, {}, true).delete_producto))
        }
    }, [delete_producto])

    const next_productos = () => {
        if (begin + amount > total_productos){

        }else{
            setBegin (begin + amount)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_productos_filter))
        }
    }

    const previous_productos = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_productos_filter))
        }
    }

    const dividir_nro_columnas = (data_productos) => {
        if (data_productos.total_productos){setTotalProductos(data_productos.total_productos)}
        setListaGridProductos (data_productos.productos)
        setListaProductos (data_productos.productos)
    }

    const seleccionar_categoria = (value) => {
        if (value !== '0'){
            setBegin(0)
            setListaGridProductos([])
            setListaProductos([])
            setIdCategoria(value.split ('-')[0])
            setCategoria(value.split ('-')[1])
            dispatch(subcategoriasdata(subcategoriasConstants(value.split('-')[0], 0, 0, 0, 0, 0, 100, {}, false).get_subcategorias_categoria))
        }
    }

    const seleccionar_sub_categoria = (value) => {
        if (value !== '0'){
            setBegin(0)
            setListaGridProductos([])
            setListaProductos([])
            setIdSubCategoria(value.split ('-')[0])
            setSubCategoria(value.split ('-')[1])
            dispatch(productosdata(productosConstants(0, 0, 'sub_categoria', value.split('-')[0], 0, 0, 0, 0, 0, 100, {}, false).get_productos_filter))
        }
    }

    const seleccionar_unidades = (value) => {
        if (value !== '0'){
            setBegin(0)
            setListaGridProductos([])
            setListaProductos([])
            setIdUnidad(value.split ('-')[0])
            setUnidad(value.split ('-')[1])
            dispatch(productosdata(productosConstants(0, 0, 'unidad', value.split('-')[0], 0, 0, 0, 0, 0, 100, {}, false).get_subcategorias_categoria))
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
        setListaCategorias([])
        setListaSubCategorias([])
        setListaUnidades([])
        setListaGridProductos([])
        setListaProductos ([])
        dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).delete_producto))
        dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_productos_filter))
    }

    useEffect(() => {
        return () => {
            setListaGridProductos([])
            setListaProductos ([])
            setListaCategorias([])
            setListaSubCategorias([])
            setListaUnidades([])
            dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_productos_filter))
            dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_producto_categorias_unidades_servicios))
            dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).delete_producto))
        }
    }, [])

    return (
        <div className='position-relative' style={{width: '100%', minHeight: 720 / proporcional, paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Productos
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_productos_filter && get_productos_filter.productos ? begin + get_productos_filter.productos.length : 0} de ${total_productos}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_producto === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewProducto('lista')}/>
                    <img src={view_producto === 'grid' || view_producto === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewProducto('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
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
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
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
                lista_grid_productos && lista_grid_productos.length > 0 && view_producto === 'grid' ? (
                    lista_grid_productos.map ((producto, numprod) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardProductoCell producto={producto} key={numprod} index={numprod} proporcional={proporcional} view_producto={view_producto}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_productos && lista_productos.length > 0 && view_producto === 'lista' ? (
                        lista_productos.map ((producto, numprod) => {
                            return (
                                <CardProductoCell producto={producto} key={numprod} index={numprod} proporcional={proporcional} view_producto={view_producto}/>
                            )
                        })
                ) : null
            }                    
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_producto === 'grid' || view_producto === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_productos(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_productos ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_productos(); window.scrollTo(0, 0)}}>
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
            <div className='position-fixed rounded-circle shadow-lg' style={{width: 64 / proporcional, height: 64 / proporcional, 
                bottom: 50 / proporcional, right: 50 / proporcional, background: 'white', cursor: 'pointer'}}
                onClick={() => navigate ('/panel/almacen/productos/nuevo')}>
                <img src={agregar_nuevo} style={{width: 64 / proporcional, height: 64 / proporcional, padding: 16 / proporcional}}/>
            </div>
        </div>
    )
}
