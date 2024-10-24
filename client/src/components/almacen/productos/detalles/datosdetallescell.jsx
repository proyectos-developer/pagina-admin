import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation, useNavigate } from 'react-router-dom'
import { categoriasdata } from '../../../../redux/slice/categoriasdata'
import { categoriasConstants } from '../../../../uri/categorias-constants'
import { subcategoriasdata } from '../../../../redux/slice/subcategoriasdata'
import { subcategoriasConstants } from '../../../../uri/subcategorias-constants'
import { proveedoresdata } from '../../../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../../../uri/proveedores-constants'
import { serviciosdata } from '../../../../redux/slice/serviciosdata'
import { serviciosConstants } from '../../../../uri/servicios-constants'
import { marcasdata } from '../../../../redux/slice/marcasdata'
import { marcasConstants } from '../../../../uri/marcas-constants'
import { unidadesdata } from '../../../../redux/slice/unidadesdata'
import { unidadesConstants } from '../../../../uri/unidades-constants'
import { productosdata } from '../../../../redux/slice/productosdata'
import { productosConstants } from '../../../../uri/productos-constants'

export default function DatosDetallesCell ({proporcional}) {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectRefCategorias = useRef(null)
    const selectRefSubCategorias = useRef(null)
    const selectRefUnidades = useRef(null)
    const selectRefServicios = useRef(null)
    const selectRefProveedores = useRef(null)
    const selectRefMarcas = useRef(null)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCasncelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const id_producto = location.pathname.split('/')[6]
    const [producto, setProducto] = useState('')
    const [codigo_sku, setCodigoSku] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id_categoria, setIdCategoria] = useState('')
    const [subcategoria, setSubCategoria] = useState('')
    const [id_subcategoria, setIdSubCategoria] = useState('')
    const [id_servicio, setIdServicio] = useState('')
    const [servicio, setServicio] = useState('')
    const [proveedor, setProveedor] = useState('')
    const [id_proveedor, setIdProveedor] = useState('')
    const [marca, setMarca] = useState('')
    const [id_marca, setIdMarca] = useState('')
    const [stock, setStock] = useState('')
    const [id_unidad, setIdUnidad] = useState('')
    const [unidad, setUnidad] = useState('')

    const [lista_categorias, setListaCategorias] = useState([])
    const [lista_sub_categorias, setListaSubCategorias] = useState([])
    const [lista_unidades, setListaUnidades] = useState([])
    const [lista_servicios, setListaServicios] = useState([])
    const [lista_proveedores, setListaProveedores] = useState([])
    const [lista_marcas, setListaMarcas] = useState([])
        
    const [eproducto, setEProducto] = useState('')
    const [ecodigo_sku, setECodigoSku] = useState('')

    const {get_categorias_filter} = useSelector(({categorias_data}) => categorias_data)
    const {get_subcategorias_filter} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {get_unidades_filter} = useSelector(({unidades_data}) => unidades_data)
    const {get_proveedores_filter} = useSelector(({proveedores_data}) => proveedores_data)
    const {get_marcas_filter} = useSelector(({marcas_data}) => marcas_data)
    const {get_servicios_filter} = useSelector(({servicios_data}) => servicios_data)
    const {data_productos, data_editable} = useSelector(({data_actions}) => data_actions)
    const {update_producto_detalles, get_producto_detalles} = useSelector(({productos_data}) => productos_data)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_productos && data_productos.producto){
            setProducto(data_productos.producto)
            setCodigoSku(data_productos.codigo_sku)
            setDescripcion(data_productos.descripcion)
            setCategoria(data_productos.categoria)
            setIdCategoria(data_productos.id_categoria)
            setSubCategoria(data_productos.subcategoria)
            setIdSubCategoria(data_productos.id_subcategoria)
            setIdServicio(data_productos.id_servicio)
            setServicio(data_productos.servicio)
            setProveedor(data_productos.proveedor)
            setIdProveedor(data_productos.id_proveedor)
            setMarca(data_productos.marca)
            setIdMarca(data_productos.id_marca)
            setStock(data_productos.stock)
            setIdUnidad(data_productos.id_unidad)
            setUnidad(data_productos.unidad)
        }else{
            dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_producto_detalles))
        }
    }, [])

    useEffect(() => {
        if (get_producto_detalles && get_producto_detalles.success === true && get_producto_detalles.producto){
            setProducto(get_producto_detalles.producto.producto)
            setCodigoSku(get_producto_detalles.producto.codigo_sku)
            setDescripcion(get_producto_detalles.producto.descripcion)
            setCategoria(get_producto_detalles.producto.categoria)
            setIdCategoria(get_producto_detalles.producto.id_categoria)
            setSubCategoria(get_producto_detalles.producto.subcategoria)
            setIdSubCategoria(get_producto_detalles.producto.id_subcategoria)
            setIdServicio(get_producto_detalles.producto.id_servicio)
            setServicio(get_producto_detalles.producto.servicio)
            setProveedor(get_producto_detalles.producto.proveedor)
            setIdProveedor(get_producto_detalles.producto.id_proveedor)
            setMarca(get_producto_detalles.producto.marca)
            setIdMarca(get_producto_detalles.producto.id_marca)
            setStock(get_producto_detalles.producto.stock)
            setIdUnidad(get_producto_detalles.producto.id_unidad)
            setUnidad(get_producto_detalles.producto.unidad)
            setEditarInformacion(false)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_producto_detalles))
        }
    }, [get_producto_detalles])

    useEffect(() => {
        if (update_producto_detalles && update_producto_detalles.success === true && update_producto_detalles.producto){
            setProducto(update_producto_detalles.producto.producto)
            setCodigoSku(update_producto_detalles.producto.codigo_sku)
            setDescripcion(update_producto_detalles.producto.descripcion)
            setCategoria(update_producto_detalles.producto.categoria)
            setIdCategoria(update_producto_detalles.producto.id_categoria)
            setSubCategoria(update_producto_detalles.producto.subcategoria)
            setIdSubCategoria(update_producto_detalles.producto.id_subcategoria)
            setIdServicio(update_producto_detalles.producto.id_servicio)
            setServicio(update_producto_detalles.producto.servicio)
            setProveedor(update_producto_detalles.producto.proveedor)
            setIdProveedor(update_producto_detalles.producto.id_proveedor)
            setMarca(update_producto_detalles.producto.marca)
            setIdMarca(update_producto_detalles.producto.id_marca)
            setStock(update_producto_detalles.producto.stock)
            setIdUnidad(update_producto_detalles.producto.id_unidad)
            setUnidad(update_producto_detalles.producto.unidad)
            setEditarInformacion(false)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_producto_detalles))
        }
    }, [update_producto_detalles])

    useEffect(() => {
        if(get_categorias_filter && get_categorias_filter.success === true && get_categorias_filter.categorias){
            setListaCategorias(get_categorias_filter.categorias)
            dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 0, {}, true).get_categorias_filter))
        }
    }, [get_categorias_filter])

    useEffect(() => {
        if(get_subcategorias_filter && get_subcategorias_filter.success === true && get_subcategorias_filter.sub_categorias){
            setListaSubCategorias(get_subcategorias_filter.sub_categorias)
            dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 0, {}, true).get_subcategorias_categoria))
            dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 0, {}, true).get_subcategorias_filter))
        }
    }, [get_subcategorias_filter])

    useEffect(() => {
        if(get_unidades_filter && get_unidades_filter.success === true && get_unidades_filter.unidades){
            setListaUnidades(get_unidades_filter.unidades)
            dispatch (unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 0, {}, true).get_unidades_filter))
        }
    }, [get_unidades_filter])

    useEffect(() => {
        if(get_marcas_filter && get_marcas_filter.success === true && get_marcas_filter.marcas){
            setListaMarcas(get_marcas_filter.marcas)
            dispatch(marcasdata(marcasConstants(0, 0, 0, 0, 0, 0, {}, true).get_marcas_filter))
        }
    }, [get_marcas_filter])

    useEffect(() => {
        if(get_proveedores_filter && get_proveedores_filter.success === true && get_proveedores_filter.proveedores){
            setListaProveedores(get_proveedores_filter.proveedores)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).get_proveedores_filter))
        }
    }, [get_proveedores_filter])

    useEffect(() => {
        if(get_servicios_filter && get_servicios_filter.success === true && get_servicios_filter.servicios){
            setListaServicios(get_servicios_filter.servicios)
            dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 0, {}, true).get_servicios_filter))
        }
    }, [get_servicios_filter])

    const buscar_categorias = () => {
        if (lista_categorias && lista_categorias.length > 0){

        }else{
            dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 100, {}, false).get_categorias_filter))
        }
    }

    const seleccionar_categoria = (value) => {
        if (value !== '0'){
            setIdCategoria(value.split('-')[0])
            setCategoria(value.split('-')[1])
        }
    }

    const buscar_sub_categorias = () => {
        if (id_categoria !== ''){
            dispatch(subcategoriasdata(subcategoriasConstants(value.split('-')[0], 0, 0, 0, 0, 0, 100, {}, false).get_subcategorias_categoria))
        }else{
            dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 100, {}, false).get_subcategorias_filter))
        }
    }

    const seleccionar_sub_categoria = (value) => {
        if (value !== '0'){
            setIdSubCategoria(value.split('-')[0])
            setSubCategoria(value.split('-')[1])
        }
    }

    const buscar_proveedores = () => {
        if (lista_proveedores && lista_proveedores.length > 0){

        }else{
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 100, {}, false).get_proveedores_filter))
        }
    }

    const seleccionar_proveedor = (value) => {
        if (value !== '0'){
            setIdProveedor(value.split('-')[0])
            setProveedor(value.split('-')[1])
        }
    }

    const buscar_marcas = () => {
        if (lista_marcas && lista_marcas.length > 0){

        }else{
            dispatch(marcasdata(marcasConstants(0, 0, 0, 0, 0, 100, {}, false).get_marcas_filter))
        }
    }

    const seleccionar_marca = (value) => {
        if (value !== '0'){
            setIdMarca(value.split('-')[0])
            setMarca(value.split('-')[1])
        }
    }

    const buscar_unidades = () => {
        if (lista_unidades && lista_unidades.length > 0){

        }else{
            dispatch(unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 100, {}, false).get_unidades_filter))
        }
    }

    const seleccionar_unidad = (value) => {
        if (value !== '0'){
            setIdUnidad(value.split('-')[0])
            setUnidad(value.split('-')[1])
        }
    }

    const buscar_servicios = () => {
        if (lista_servicios && lista_servicios.length > 0){

        }else{
            dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 100, {}, false).get_servicios_filter))
        }
    }

    const seleccionar_servicio = (value) => {
        if (value !== '0'){
            setIdServicio(value.split('-')[0])
            setServicio(value.split('-')[1])
        }
    }

    const actualizar_datos_producto = () => {
        if (producto === '' || codigo_sku === ''){
            setEProducto(producto === '' ? true : false)
            setECodigoSku(codigo_sku === '' ? true : false)
        }else{
            setEProducto(false)
            setECodigoSku(false)
            const data_update = {
                producto: producto, 
                codigo_sku: codigo_sku,
                descripcion: descripcion, 
                categoria: categoria, 
                id_categoria: id_categoria, 
                subcategoria: subcategoria, 
                id_subcategoria: id_subcategoria, 
                id_servicio: id_servicio, 
                servicio: servicio, 
                proveedor: proveedor, 
                id_proveedor: id_proveedor, 
                marca: marca, 
                id_marca: id_marca, 
                stock: stock, 
                id_unidad: id_unidad, 
                unidad: unidad
            }
            dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, data_update, false).update_producto_detalles))
        }
    }

    const cancelar_edicion_datos = () => {
        dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_producto_detalles))
    }

    const volver_a_lista = () => {
        navigate ('/panel/almacen/productos')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='producto'
                            type='default'
                            className='form-control rounded'
                            value={producto}
                            onChange={(event) => setProducto(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eproducto ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Producto'/>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='codigo_sku'
                            type='default'
                            className='form-control rounded'
                            value={codigo_sku}
                            onChange={(event) => setCodigoSku(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecodigo_sku ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Código sku'/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea
                        disabled={!editar_informacion} 
                        id='descripcion'
                        type='default'
                        rows={4}
                        className='form-control rounded'
                        value={descripcion}
                        onChange={(event) => setDescripcion(event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Descripción'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            id='categoria'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_categoria(event.target.value)}
                            onFocus={() => buscar_categorias()}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{categoria === '' ? 'Seleccionar categoría' : categoria}</option>
                            {
                                lista_categorias && lista_categorias.length > 0 ? (
                                    lista_categorias.map ((categoria, index) => {
                                        return (
                                            <option value={categoria.id + '-' + categoria.categoria}>{categoria.categoria}</option>
                                        )
                                    })
                                ) : null
                            }                            
                        </select>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            id='subcategoria'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_sub_categoria(event.target.value)}
                            onFocus={() => buscar_sub_categorias()}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{subcategoria === '' ? 'Seleccionar sub categoría' : subcategoria}</option>
                            {
                                lista_sub_categorias && lista_sub_categorias.length > 0 ? (
                                    lista_sub_categorias.map ((sub_categoria, index) => {
                                        return (
                                            <option value={sub_categoria.id + '-' + sub_categoria.sub_categoria}>{sub_categoria.sub_categoria}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            id='unidad'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_unidad(event.target.value)}
                            onFocus={() => buscar_unidades()}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{unidad === '' ? 'Seleccionar unidad' : unidad}</option>
                            {
                                lista_unidades && lista_unidades.length > 0 ? (
                                    lista_unidades.map ((unidad, index) => {
                                        return (
                                            <option value={unidad.id + '-' + unidad.unidad}>{unidad.unidad}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            id='servicio'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_servicio(event.target.value)}
                            onFocus={() => buscar_servicios()}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{servicio === '' ? 'Seleccionar servicio' : servicio}</option>
                            {
                                lista_servicios && lista_servicios.length > 0 ? (
                                    lista_servicios.map ((servicio, index) => {
                                        return (
                                            <option value={servicio.id + '-' + servicio.servicio}>{servicio.servicio}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            id='proveedor'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_proveedor(event.target.value)}
                            onFocus={() => buscar_proveedores()}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{proveedor === '' ? 'Seleccionar proveedor' : proveedor}</option>
                            {
                                lista_proveedores && lista_proveedores.length > 0 ? (
                                    lista_proveedores.map ((proveedor, index) => {
                                        return (
                                            <option value={proveedor.id + '-' + proveedor.nombre_empresa}>{proveedor.nombre_empresa}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            id='marca'
                            className='form-select rounded'
                            onChange={(event) => seleccionar_marca(event.target.value)}
                            onFocus={() => buscar_marcas()}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{marca === '' ? 'Seleccionar marca' : marca}</option>
                            {
                                lista_marcas && lista_marcas.length > 0 ? (
                                    lista_marcas.map ((marca, index) => {
                                        return (
                                            <option value={marca.id + '-' + marca.nombre_marca}>{marca.nombre_marca}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                </div>
                
                {
                    editar_informacion ? ( 
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                onMouseOver={() => setBotonCasncelar(true)} onMouseLeave={() => setBotonCasncelar(false)}
                                onClick={() => cancelar_edicion_datos()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_datos_producto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                onClick={() => volver_a_lista()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                onClick={() => {setEditarInformacion(true); window.scrollTo(0, 0)}}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Editar
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
