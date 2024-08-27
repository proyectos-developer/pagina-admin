import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {productosdata} from '../../redux/slice/productosdata'
import {productosConstants} from '../../uri/productos-constants'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata'
import { subcategoriasConstants } from '../../uri/subcategorias-constants'
import {filesdata} from '../../redux/slice/filesdata'
import {filesConstants} from '../../uri/files-constants'

import save from '../../assets/iconos/comun/save_v2.png'
import save_select from '../../assets/iconos/comun/save_v1.png'
import cross from '../../assets/iconos/comun/cross_v2.png'
import cross_select from '../../assets/iconos/comun/cross_v1.png'

import {categoriasdata} from '../../redux/slice/categoriasdata'
import { categoriasConstants } from '../../uri/categorias-constants'
import {unidadesdata} from '../../redux/slice/unidadesdata'
import { unidadesConstants } from '../../uri/unidades-constants'
import {serviciosdata} from '../../redux/slice/serviciosdata'
import { serviciosConstants } from '../../uri/servicios-constants'

export default function NuevoProductoTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [file_imagen_1, setFileImagen1] = useState (null)
    const [file_imagen_2, setFileImagen2] = useState (null)
    const [file_imagen_3, setFileImagen3] = useState (null)
    const [file_imagen_4, setFileImagen4] = useState (null)
    const [file_imagen_5, setFileImagen5] = useState (null)
    const [file_imagen_6, setFileImagen6] = useState (null)

    const selectCategoria = useRef(null)
    const selectServicio = useRef(null)
    const selectSubCategoria = useRef(null)
    const selectUnidad = useRef(null)

    const [producto, setProducto] = useState('')
    const [descripcion, setDescripcion] = useState ('')
    const [caracteristica_1, setCaracteristica1] = useState('')
    const [caracteristica_2, setCaracteristica2] = useState('')
    const [caracteristica_3, setCaracteristica3] = useState('')
    const [caracteristica_4, setCaracteristica4] = useState('')
    const [caracteristica_5, setCaracteristica5] = useState('')
    const [caracteristica_6, setCaracteristica6] = useState('')
    const [caracteristica_7, setCaracteristica7] = useState('')
    const [caracteristica_8, setCaracteristica8] = useState('')
    const [caracteristica_9, setCaracteristica9] = useState('')
    const [caracteristica_10, setCaracteristica10] = useState('')
    const [caracteristica_11, setCaracteristica11] = useState('')
    const [caracteristica_12, setCaracteristica12] = useState('')
    const [caracteristica_13, setCaracteristica13] = useState('')
    const [caracteristica_14, setCaracteristica14] = useState('')
    const [caracteristica_15, setCaracteristica15] = useState('')
    const [caracteristica_16, setCaracteristica16] = useState('')
    const [caracteristica_17, setCaracteristica17] = useState('')
    const [caracteristica_18, setCaracteristica18] = useState('')
    const [caracteristica_19, setCaracteristica19] = useState('')
    const [caracteristica_20, setCaracteristica20] = useState('')
    const [id_categoria, setIdCategoria] = useState ('')
    const [categoria, setCategoria] = useState('')
    const [id_subcategoria, setIdSubCategoria] = useState ('')
    const [sub_categoria, setSubCategoria] = useState('')
    const [id_unidad, setIdUnidad] = useState ('')
    const [unidad, setUnidad] = useState('')
    const [servicio, setServicio] = useState('')
    const [url_foto_principal, setUrlFotoPrincipal] = useState('')
    const [url_foto_1, setUrlFoto1] = useState('')
    const [url_foto_2, setUrlFoto2] = useState('')
    const [url_foto_3, setUrlFoto3] = useState('')
    const [url_foto_4, setUrlFoto4] = useState('')
    const [url_foto_5, setUrlFoto5] = useState('')
    const [precio, setPrecio] = useState (0)
    const [descuento, setDescuento] = useState (0)
    const [oferta, setOferta] = useState (0)
    const [precio_mensual, setPrecioMensual] = useState (0)
    const [precio_anual, setPrecioAnual] = useState (0)
    const [comentarios, setComentarios] = useState ('')
    const [stock, setStock] = useState(0)
    const [codigo_sku, setCodigoSku] = useState ('')

    const [show_caracteristica_6, setShowCaracteristica6] = useState(false)
    const [show_caracteristica_7, setShowCaracteristica7] = useState(false)
    const [show_caracteristica_8, setShowCaracteristica8] = useState(false)
    const [show_caracteristica_9, setShowCaracteristica9] = useState(false)
    const [show_caracteristica_10, setShowCaracteristica10] = useState(false)
    const [show_caracteristica_11, setShowCaracteristica11] = useState(false)
    const [show_caracteristica_12, setShowCaracteristica12] = useState(false)
    const [show_caracteristica_13, setShowCaracteristica13] = useState(false)
    const [show_caracteristica_14, setShowCaracteristica14] = useState(false)
    const [show_caracteristica_15, setShowCaracteristica15] = useState(false)
    const [show_caracteristica_16, setShowCaracteristica16] = useState(false)
    const [show_caracteristica_17, setShowCaracteristica17] = useState(false)
    const [show_caracteristica_18, setShowCaracteristica18] = useState(false)
    const [show_caracteristica_19, setShowCaracteristica19] = useState(false)
    const [show_caracteristica_20, setShowCaracteristica20] = useState(false)

    const [eproducto, setEProducto] = useState(false)
    const [ecategoria, setECategoria] = useState(false)
    const [eurl_foto_principal, setEUrlFotoPrincipal] = useState(false)
    const [eprecio, setEPrecio] = useState (false)
    const [estock, setEStock] = useState (false)

    const [nueva_categoria, setNuevaCategoria] = useState(false)
    const [nueva_sub_categoria, setNuevaSubCategoria] = useState(false)
    const [nueva_unidad, setNuevaUnidad] = useState(false)
    const [nuevo_servicio, setNuevoServicio] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)

    const [boton_nro_foto, setBotonNroFoto] = useState(0)
    const [boton_subif_foto_1, setBotonSubirFoto1] = useState(false)
    const [boton_subif_foto_2, setBotonSubirFoto2] = useState(false)
    const [boton_subif_foto_3, setBotonSubirFoto3] = useState(false)
    const [boton_subif_foto_4, setBotonSubirFoto4] = useState(false)
    const [boton_subif_foto_5, setBotonSubirFoto5] = useState(false)
    const [boton_subif_foto_6, setBotonSubirFoto6] = useState(false)

    const [lista_categorias, setListaCategorias] = useState([])
    const [lista_sub_categorias, setListaSubCategorias] = useState([])
    const [lista_unidades, setListaUnidades] = useState([])
    const [lista_servicios, setListaServicios] = useState([])

    const [boton_save, setBotonSave] = useState(false)
    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_producto, get_producto_categorias_unidades_servicios} = useSelector(({productos_data}) => productos_data)
    const {new_categoria} = useSelector(({categorias_data}) => categorias_data)
    const {get_subcategorias_categoria, new_subcategoria, get_subcategorias_filter} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {new_unidad} = useSelector(({unidades_data}) => unidades_data)
    const {new_servicio} = useSelector(({servicios_data}) => servicios_data) 
    const {file_upload} = useSelector(({files_data}) => files_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_producto_categorias_unidades_servicios))
    }, [])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            if (boton_nro_foto === 1){setUrlFotoPrincipal(`https://api.developer-ideas.com/productos/${file_imagen_1.name}`)}
            if (boton_nro_foto === 2){setUrlFoto1(`https://api.developer-ideas.com/productos/${file_imagen_2.name}`)}
            if (boton_nro_foto === 3){setUrlFoto2(`https://api.developer-ideas.com/productos/${file_imagen_3.name}`)}
            if (boton_nro_foto === 4){setUrlFoto3(`https://api.developer-ideas.com/productos/${file_imagen_4.name}`)}
            if (boton_nro_foto === 5){setUrlFoto4(`https://api.developer-ideas.com/productos/${file_imagen_5.name}`)}
            if (boton_nro_foto === 6){setUrlFoto4(`https://api.developer-ideas.com/productos/${file_imagen_6.name}`)}
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_producto_categorias_unidades_servicios && get_producto_categorias_unidades_servicios.success === true &&
            get_producto_categorias_unidades_servicios.categorias && get_producto_categorias_unidades_servicios.unidades &&
            get_producto_categorias_unidades_servicios.servicios){
            setListaCategorias(get_producto_categorias_unidades_servicios.categorias)
            setListaUnidades(get_producto_categorias_unidades_servicios.unidades)
            setListaServicios(get_producto_categorias_unidades_servicios.sevicios)
        }
    }, [get_producto_categorias_unidades_servicios])

    useEffect(() => {
        if (new_producto && new_producto.success === true && new_producto.producto){
            dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_producto))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_producto])

    useEffect(() => {
        if (get_subcategorias_categoria && get_subcategorias_categoria.success === true && get_subcategorias_categoria.sub_categorias){
            setListaSubCategorias (get_subcategorias_categoria.sub_categorias)
            dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 100, {}, true).get_subcategorias_categoria))
        }
    }, [get_subcategorias_categoria])

    const seleccionar_categoria = (value) => {
        if (value !== '0' && value !== '1'){
            setIdCategoria(value.split ('-')[1])
            setCategoria(value.split ('-')[0])
            dispatch(subcategoriasdata(subcategoriasConstants(value.split('-')[1], 0, 0, 0, 0, 0, 100, {}, false).get_subcategorias_categoria))
        }else if (value === '1'){
            setNuevaCategoria(true)
        }
    }

    useEffect(() => {
        if (new_categoria && new_categoria.success === true && new_categoria.categoria){
            setIdCategoria(new_categoria.categoria.id)
            setCategoria(new_categoria.categoria.categoria)
            setNuevaCategoria(false)
            dispatch (subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 100, {}, false).get_subcategorias_filter))
        }
    }, [new_categoria])

    useEffect(() => {
        if (get_subcategorias_filter && get_subcategorias_filter.success === true && get_subcategorias_filter.sub_categorias){
            setListaSubCategorias(get_subcategorias_filter.sub_categorias)
        }
    }, [get_subcategorias_filter])

    const guardar_nueva_categoria = () => {
        const data_categoria = {
            url_foto: '',
            categoria: categoria,
            descripcion: ''
        }
        dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, data_categoria, false).new_categoria))
    }

    const seleccionar_sub_categoria = (value) => {
        if (value !== '0' && value !== '1'){
            setIdSubCategoria(value.split ('-')[1])
            setSubCategoria(value.split ('-')[0])
        }else if (value === '1'){
            setNuevaSubCategoria(true)
        }
    }

    useEffect(() => {
        if (new_subcategoria && new_subcategoria.success === true && new_subcategoria.sub_categoria){
            setIdSubCategoria(new_subcategoria.sub_categoria.id)
            setSubCategoria(new_subcategoria.sub_categoria.sub_categoria)
            setNuevaSubCategoria(false)
        }
    }, [new_subcategoria])

    const guardar_nueva_sub_categoria = () => {
        const data_sub_categoria = {
            id_categoria: id_categoria,
            categoria: categoria,
            sub_categoria: sub_categoria,
            descripcion: ''
        }
        dispatch (subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 16, data_sub_categoria, false).new_subcategoria))
    }

    const seleccionar_unidad = (value) => {
        if (value !== '0' && value !== '1'){
            setIdUnidad(value.split ('-')[1])
            setUnidad(value.split ('-')[0])
        }else if (value === '1'){
            setNuevaUnidad(true)
        }
    }

    useEffect(() => {
        if (new_unidad && new_unidad.success === true && new_unidad.unidad){
            setIdUnidad(new_unidad.unidad.id)
            setUnidad(new_unidad.unidad.unidad)
            setNuevaUnidad(false)
        }
    }, [new_unidad])

    const guardar_nueva_unidad = () => {
        const data_unidad = {
            unidad: unidad,
            descripcion: ''
        }
        dispatch (unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 16, data_unidad, false).new_unidad))
    }

    const seleccionar_servicio = (value) => {
        if (value !== '0' && value !== '1'){
            setIdServicio(value.split ('-')[1])
            setServicio(value.split ('-')[0])
        }else if (value === '1'){
            setNuevoServicio(true)
        }
    }

    useEffect(() => {
        if (new_servicio && new_servicio.success === true && new_servicio.servicio){
            setIdServicio(new_servicio.servicio.id)
            setServicio(new_servicio.servicio.servicio)
            setNuevoServicio(false)
        }
    }, [new_servicio])

    const guardar_nuevo_servicio = () => {
        const data_servicio = {
            servicio: servicio,
            descripcion: ''
        }
        dispatch (serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 16, data_servicio, false).new_servicio))
    }

    const resetear_data = () => {
        setProducto ('')
        setDescripcion ('')
        setCaracteristica1 ('')
        setCaracteristica2 ('')
        setCaracteristica3 ('')
        setCaracteristica4 ('')
        setCaracteristica5 ('')
        setCaracteristica6 ('')
        setCaracteristica7 ('')
        setCaracteristica8 ('')
        setCaracteristica9 ('')
        setCaracteristica10 ('')
        setCaracteristica11 ('')
        setCaracteristica12 ('')
        setCaracteristica13 ('')
        setCaracteristica14 ('')
        setCaracteristica15 ('')
        setCaracteristica16 ('')
        setCaracteristica17 ('')
        setCaracteristica18 ('')
        setCaracteristica19 ('')
        setCaracteristica20 ('')
        setShowCaracteristica6(false)
        setShowCaracteristica7(false)
        setShowCaracteristica8(false)
        setShowCaracteristica9(false)
        setShowCaracteristica10(false)
        setShowCaracteristica11(false)
        setShowCaracteristica12(false)
        setShowCaracteristica13(false)
        setShowCaracteristica14(false)
        setShowCaracteristica15(false)
        setShowCaracteristica16(false)
        setShowCaracteristica17(false)
        setShowCaracteristica18(false)
        setShowCaracteristica19(false)
        setShowCaracteristica20(false)
        setIdCategoria ('')
        setCategoria ('')
        setIdSubCategoria ('')
        setSubCategoria ('')
        setIdUnidad ('')
        setUnidad ('')
        setServicio ('')
        setUrlFotoPrincipal ('')
        setUrlFoto1 ('')
        setUrlFoto2 ('')
        setUrlFoto3 ('')
        setUrlFoto4 ('')
        setUrlFoto5 ('')
        setPrecio ('')
        setOferta ('')
        setPrecioMensual ('')
        setPrecioAnual ('')
        setComentarios ('')
        setCodigoSku ('')
        setStock (0)
        if (selectCategoria.current){
            selectCategoria.current.value = '0'
        }
        if (selectSubCategoria.current){
            selectSubCategoria.current.value = '0'
        }
        if (selectUnidad.current){
            selectUnidad.current.value = '0'
        }
        if (selectServicio.current){
            selectServicio.current.value = '0'
        }
    }
    const volver_a_lista = () => {
        resetear_data()
        navigate ('/panel/productos')
    }

    const guardar_producto = () => {
        if (producto === '' || precio === '' || stock === '' || categoria === '' || url_foto_principal === ''){
            setEProducto (producto === '' ? true : false)
            setECategoria (categoria === '' ? true : false)
            setEUrlFotoPrincipal (url_foto_principal === '' ? true : false)
            setEPrecio (precio === '' ? true : false)
            setEStock (stock === '' ? true : false)
        }else{
            setEProducto (false)
            setECategoria (false)
            setEUrlFotoPrincipal (false)
            setEPrecio (false)
            setEStock (false)
            const data_nuevo = {
                producto: producto, 
                descripcion: descripcion,
                caracteristica_1: caracteristica_1,
                caracteristica_2: caracteristica_2,
                caracteristica_3: caracteristica_3,
                caracteristica_4: caracteristica_4,
                caracteristica_5: caracteristica_5,
                caracteristica_6: caracteristica_6,
                caracteristica_7: caracteristica_7,
                caracteristica_8: caracteristica_8,
                caracteristica_9: caracteristica_9,
                caracteristica_10: caracteristica_10,
                caracteristica_11: caracteristica_11,
                caracteristica_12: caracteristica_12,
                caracteristica_13: caracteristica_13,
                caracteristica_14: caracteristica_14,
                caracteristica_15: caracteristica_15,
                caracteristica_16: caracteristica_16,
                caracteristica_17: caracteristica_17,
                caracteristica_18: caracteristica_18,
                caracteristica_19: caracteristica_19,
                caracteristica_20: caracteristica_20,
                id_categoria: id_categoria,
                categoria: categoria,
                id_subcategoria: id_subcategoria,
                subcategoria: sub_categoria,
                id_unidad: id_unidad,
                unidad: unidad,
                servicio: servicio,
                url_foto_principal: url_foto_principal,
                url_foto_uno: url_foto_1,
                url_foto_dos: url_foto_2,
                url_foto_tres: url_foto_3,
                url_foto_cuatro: url_foto_4,
                url_foto_cinco: url_foto_5,
                precio: precio,
                oferta: oferta,
                precio_mensual: precio_mensual,
                precio_anual: precio_anual,
                comentarios: comentarios,
                codigo_sku: codigo_sku,
                stock: stock,
                habilitar_producto: true
            }
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_producto))
        }
    }
    
    const handleFileChange_1 = (event) => {
        setFileImagen1(event.target.files[0])
    }

    const handleUpload_1 = (event) => {
        event.preventDefault()
        setBotonNroFoto(1)
        const data = new FormData()
        data.append('file', file_imagen_1, file_imagen_1.name)
        dispatch(filesdata(filesConstants('productos', data, false).file_upload))
    }
    
    const handleFileChange_2 = (event) => {
        setFileImagen2(event.target.files[0])
    }

    const handleUpload_2 = (event) => {
        event.preventDefault()
        setBotonNroFoto(2)
        const data = new FormData()
        data.append('file', file_imagen_2, file_imagen_2.name)
        dispatch(filesdata(filesConstants('productos', data, false).file_upload))
    }
    
    const handleFileChange_3 = (event) => {
        setFileImagen3(event.target.files[0])
    }

    const handleUpload_3 = (event) => {
        event.preventDefault()
        setBotonNroFoto(3)
        const data = new FormData()
        data.append('file', file_imagen_3, file_imagen_3.name)
        dispatch(filesdata(filesConstants('productos', data, false).file_upload))
    }
    
    const handleFileChange_4 = (event) => {
        setFileImagen4(event.target.files[0])
    }

    const handleUpload_4 = (event) => {
        event.preventDefault()
        setBotonNroFoto(4)
        const data = new FormData()
        data.append('file', file_imagen_4, file_imagen_4.name)
        dispatch(filesdata(filesConstants('productos', data, false).file_upload))
    }
    
    const handleFileChange_5 = (event) => {
        setFileImagen5(event.target.files[0])
    }

    const handleUpload_5 = (event) => {
        event.preventDefault()
        setBotonNroFoto(5)
        const data = new FormData()
        data.append('file', file_imagen_5, file_imagen_5.name)
        dispatch(filesdata(filesConstants('productos', data, false).file_upload))
    }
    
    const handleFileChange_6 = (event) => {
        setFileImagen6(event.target.files[0])
    }

    const handleUpload_6 = (event) => {
        event.preventDefault()
        setBotonNroFoto(6)
        const data = new FormData()
        data.append('file', file_imagen_6, file_imagen_6.name)
        dispatch(filesdata(filesConstants('productos', data, false).file_upload))
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Nuevo producto
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '80%', height: '100%'}}>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto',
                                    marginBottom: 16 / proporcional}}>
                                <div className='rounded' style={{width:  400 / proporcional, height: 400 / proporcional,
                                    border: '1px solid #4a4a4a'}}>
                                    {
                                        url_foto_principal !== '' ? (
                                            <img className='rounded' src={url_foto_principal} 
                                                style={{width: 398 / proporcional, height: 398 / proporcional}}/>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                                <div className='d-flex justify-content-between' style={{width: 400 / proporcional, height: 'auto'}}>
                                    <div className='rounded' style={{width:  70 / proporcional, height: 70 / proporcional,
                                        border: '1px solid #4a4a4a'}}>
                                        {
                                            url_foto_1 !== '' ? (
                                                <img className='rounded' src={url_foto_1} 
                                                    style={{width: 68 / proporcional, height: 68 / proporcional}}/>
                                            ) : null
                                        }
                                    </div>
                                    <div className='rounded' style={{width:  70 / proporcional, height: 70 / proporcional,
                                        border: '1px solid #4a4a4a'}}>
                                        {
                                            url_foto_2 !== '' ? (
                                                <img className='rounded' src={url_foto_2} 
                                                    style={{width: 68 / proporcional, height: 68 / proporcional}}/>
                                            ) : null
                                        }
                                    </div>
                                    <div className='rounded' style={{width:  70 / proporcional, height: 70 / proporcional,
                                        border: '1px solid #4a4a4a'}}>
                                        {
                                            url_foto_3 !== '' ? (
                                                <img className='rounded' src={url_foto_3} 
                                                    style={{width: 68 / proporcional, height: 68 / proporcional}}/>
                                            ) : null
                                        }
                                    </div>
                                    <div className='rounded' style={{width:  70 / proporcional, height: 70 / proporcional,
                                        border: '1px solid #4a4a4a'}}>
                                        {
                                            url_foto_4 !== '' ? (
                                                <img className='rounded' src={url_foto_4} 
                                                    style={{width: 68 / proporcional, height: 68 / proporcional}}/>
                                            ) : null
                                        }
                                    </div>
                                    <div className='rounded' style={{width:  70 / proporcional, height: 70 / proporcional,
                                        border: '1px solid #4a4a4a'}}>
                                        {
                                            url_foto_5 !== '' ? (
                                                <img className='rounded' src={url_foto_5} 
                                                    style={{width: 68 / proporcional, height: 68 / proporcional}}/>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Producto
                                </span>
                                <input 
                                    id='producto'
                                    type='default'
                                    className='form-control rounded'
                                    value={producto}
                                    onChange={(event) => setProducto(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: eproducto ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nombre del producto'/>
                            </div>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Descripción
                                </span>
                                <textarea 
                                    id='descripcion'
                                    rows={4}
                                    type='default'
                                    className='form-control rounded'
                                    value={descripcion}
                                    onChange={(event) => setDescripcion(event.target.value)}
                                    style={{width: '100%', height: 190 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Descripción del producto'/>
                            </div>
                            <div className='d-flex justify-content-between' 
                                style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Precio (S/.)
                                    </span>
                                    <input 
                                        id='precio'
                                        type='number'
                                        className='form-control rounded'
                                        value={precio}
                                        onChange={(event) => setPrecio(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: eprecio ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Precio'/>
                                </div>
                                <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Descuento (%)
                                    </span>
                                    <input 
                                        id='oferta'
                                        type='number'
                                        className='form-control rounded'
                                        value={oferta}
                                        onChange={(event) => setOferta(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Oferta'/>
                                </div>
                                <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Precio de oferta
                                    </span>
                                    <input 
                                        disabled={true}
                                        id='descuento'
                                        type='number'
                                        className='form-control rounded'
                                        value={descuento}
                                        onChange={(event) => setDescuento(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Precio de oferta'/>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between' 
                                style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Precio mensual(S/.)
                                    </span>
                                    <input 
                                        id='precio_mensual'
                                        type='number'
                                        className='form-control rounded'
                                        value={precio_mensual}
                                        onChange={(event) => setPrecioMensual(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Precio mensual'/>
                                </div>
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Precio anual(S/.)
                                    </span>
                                    <input 
                                        id='precio_anual'
                                        type='number'
                                        className='form-control rounded'
                                        value={precio_anual}
                                        onChange={(event) => setPrecioAnual(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Precio anual'/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Categoría 
                                </span>
                                {
                                    nueva_categoria ? (
                                        <div className='d-flex' style={{width: '100%', height: 50 / proporcional, border: ecategoria ? '1px solid red' : '1px solid #007BFF'}}>
                                            <input 
                                                type='default'
                                                id='categoria'
                                                className='form-control'
                                                value={categoria}
                                                onChange={(event) => setCategoria(event.target.value)}
                                                style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                                placeholder='Nueva categoría'/>
                                            <img src={boton_cancelar ? cross_select : cross} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                                onClick={() => {setNuevaCategoria(false); setCategoria('')}}/>
                                            <img src={boton_save ? save_select : save} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonSave(true)} onMouseLeave={() => setBotonSave(false)}
                                                onClick={() => guardar_nueva_categoria()}/>
                                        </div>
                                    ) : (
                                        <select
                                            id='categoria'
                                            ref={selectCategoria}
                                            className='form-select rounded'
                                            onChange={(event) => seleccionar_categoria (event.target.value)}
                                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: ecategoria ? '1px solid red' : '1px solid #007BFF',
                                                    padding: 10 / proporcional}}>
                                            <option value='0'>{categoria === '' ? 'Seleccionar categoría' : categoria}</option>
                                            <option value='1'>Crear nueva categoría</option>
                                            {
                                                lista_categorias && lista_categorias.length > 0 ? (
                                                    lista_categorias.map ((categoria, index) => {
                                                        return (
                                                            <option key={index} value={categoria.categoria + '-' + categoria.id}>{categoria.categoria}</option>
                                                        )
                                                    })
                                                ) : null
                                            }
                                        </select>
                                    )
                                }
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Sub categoría 
                                </span>
                                {
                                    nueva_sub_categoria ? (
                                        <div className='d-flex' style={{width: '100%', height: 50 / proporcional, border: '1px solid #007BFF'}}>
                                            <input 
                                                type='default'
                                                id='sub_categoria'
                                                className='form-control'
                                                value={sub_categoria}
                                                onChange={(event) => setSubCategoria(event.target.value)}
                                                style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                                placeholder='Nueva sub categoría'/>
                                            <img src={boton_cancelar ? cross_select : cross} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                                onClick={() => {setNuevaSubCategoria(false); setSubCategoria('')}}/>
                                            <img src={boton_save ? save_select : save} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonSave(true)} onMouseLeave={() => setBotonSave(false)}
                                                onClick={() => guardar_nueva_sub_categoria()}/>
                                        </div>
                                    ) : (
                                        <select
                                            disabled={!(categoria !== '' && !nueva_categoria)}
                                            id='sub_categoria'
                                            ref={selectSubCategoria}
                                            className='form-select rounded'
                                            onChange={(event) => seleccionar_sub_categoria(event.target.value)}
                                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                    padding: 10 / proporcional}}>
                                            <option value='0'>{sub_categoria === '' ? 'Seleccionar sub categoría' : sub_categoria}</option>
                                            <option value='1'>Crear nueva sub categoría</option>
                                            {
                                                lista_sub_categorias && lista_sub_categorias.length > 0 ? (
                                                    lista_sub_categorias.map ((sub_categoria, index) => {
                                                        return (
                                                            <option key={index} value={sub_categoria.sub_categoria + '-' + sub_categoria.id}>{sub_categoria.sub_categoria}</option>
                                                        )
                                                    })
                                                ) : null
                                            }
                                        </select>
                                    )
                                }
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Unidad 
                                </span>
                                {
                                    nueva_unidad ? (
                                        <div className='d-flex' style={{width: '100%', height: 50 / proporcional, border: '1px solid #007BFF'}}>
                                            <input 
                                                type='default'
                                                id='unidad'
                                                className='form-control'
                                                value={unidad}
                                                onChange={(event) => setUnidad(event.target.value)}
                                                style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                                placeholder='Nueva unidad'/>
                                            <img src={boton_cancelar ? cross_select : cross} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                                onClick={() => {setNuevaUnidad(false); setUnidad('')}}/>
                                            <img src={boton_save ? save_select : save} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonSave(true)} onMouseLeave={() => setBotonSave(false)}
                                                onClick={() => guardar_nueva_unidad()}/>
                                        </div>
                                    ) : (
                                        <select
                                            id='unidad'
                                            ref={selectUnidad}
                                            className='form-select rounded'
                                            onChange={(event) => seleccionar_unidad (event.target.value)}
                                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                    padding: 10 / proporcional}}>
                                            <option value='0'>{unidad === '' ? 'Seleccionar unidad' : unidad}</option>
                                            <option value='1'>Crear nueva unidad</option>
                                            {
                                                lista_unidades && lista_unidades.length > 0 ? (
                                                    lista_unidades.map ((unidad, index) => {
                                                        return (
                                                            <option key={index} value={unidad.unidad + '-' + unidad.id}>{unidad.unidad}</option>
                                                        )
                                                    })
                                                ) : null
                                            }
                                        </select>
                                    )
                                }
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Servicio 
                                </span>
                                {
                                    nuevo_servicio ? (
                                        <div className='d-flex' style={{width: '100%', height: 50 / proporcional, border: '1px solid #007BFF'}}>
                                            <input 
                                                type='default'
                                                id='servicio'
                                                className='form-control'
                                                value={servicio}
                                                onChange={(event) => setServicio(event.target.value)}
                                                style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                                placeholder='Nuevo servicio'/>
                                            <img src={boton_cancelar ? cross_select : cross} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                                onClick={() => {setNuevoServicio(false); setServicio('')}}/>
                                            <img src={boton_save ? save_select : save} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonSave(true)} onMouseLeave={() => setBotonSave(false)}
                                                onClick={() => guardar_nuevo_servicio()}/>
                                        </div>
                                    ) : (
                                        <select
                                            id='servicio'
                                            ref={selectServicio}
                                            className='form-select rounded'
                                            onChange={(event) => seleccionar_servicio (event.target.value)}
                                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                    padding: 10 / proporcional}}>
                                            <option value='0'>{servicio === '' ? 'Seleccionar servicio' : servicio}</option>
                                            <option value='1'>Crear nueva servicio</option>
                                            {
                                                lista_servicios && lista_servicios.length > 0 ? (
                                                    lista_servicios.map ((servicio, index) => {
                                                        return (
                                                            <option key={index} value={servicio.servicio + '-' + servicio.id}>{servicio.servicio}</option>
                                                        )
                                                    })
                                                ) : null
                                            }
                                        </select>
                                    )
                                }
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Código SKU
                                </span>
                                <input 
                                    id='codigo_sku'
                                    type='default'
                                    className='form-control rounded'
                                    value={codigo_sku}
                                    onChange={(event) => setCodigoSku(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Código Sku'/>
                            </div>
                            <div className='d-flex justify-content-start' 
                                style={{width: '48%', height: 'auto'}}>
                                <div style={{width: '100%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Stock
                                    </span>
                                    <input 
                                        id='stock'
                                        type='number'
                                        className='form-control rounded'
                                        value={stock}
                                        onChange={(event) => setStock(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: estock ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Stock'/>
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Comentarios
                            </span>
                            <textarea 
                                id='comentarios'
                                rows={3}
                                type='default'
                                className='form-control rounded'
                                value={comentarios}
                                onChange={(event) => setComentarios(event.target.value)}
                                style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Comentarios'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Característica uno
                            </span>
                            <input 
                                id='caracteristica_1'
                                type='default'
                                className='form-control rounded'
                                value={caracteristica_1}
                                onChange={(event) => setCaracteristica1(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Característica uno'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Característica dos
                            </span>
                            <input 
                                id='caracteristica_2'
                                type='default'
                                className='form-control rounded'
                                value={caracteristica_2}
                                onChange={(event) => setCaracteristica2(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Característica dos'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Característica tres
                            </span>
                            <input 
                                id='caracteristica_3'
                                type='default'
                                className='form-control rounded'
                                value={caracteristica_3}
                                onChange={(event) => setCaracteristica3(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Característica tres'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Característica cuatro
                            </span>
                            <input 
                                id='caracteristica_4'
                                type='default'
                                className='form-control rounded'
                                value={caracteristica_4}
                                onChange={(event) => setCaracteristica4(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Característica cuatro'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Característica cinco
                            </span>
                            <input 
                                id='caracteristica_5'
                                type='default'
                                className='form-control rounded'
                                value={caracteristica_5}
                                onBlur={() => setShowCaracteristica6(caracteristica_5 !== '' ? true : false)}
                                onChange={(event) => setCaracteristica5(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Característica cinco'/>
                        </div>
                        {
                            show_caracteristica_6 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica seis
                                    </span>
                                    <input 
                                        id='caracteristica_6'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_6}
                                        onBlur={() => setShowCaracteristica7(caracteristica_6 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica6(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica seis'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_7 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica siete
                                    </span>
                                    <input 
                                        id='caracteristica_7'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_7}
                                        onBlur={() => setShowCaracteristica8(caracteristica_7 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica7(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica siete'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_8 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica ocho
                                    </span>
                                    <input 
                                        id='caracteristica_8'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_8}
                                        onBlur={() => setShowCaracteristica9(caracteristica_8 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica8(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica ocho'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_9 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica nueve
                                    </span>
                                    <input 
                                        id='caracteristica_9'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_9}
                                        onBlur={() => setShowCaracteristica10(caracteristica_9 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica9(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica nueve'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_10 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica diez
                                    </span>
                                    <input 
                                        id='caracteristica_10'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_10}
                                        onBlur={() => setShowCaracteristica11(caracteristica_10 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica10(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica diez'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_11 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica once
                                    </span>
                                    <input 
                                        id='caracteristica_11'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_11}
                                        onBlur={() => setShowCaracteristica12(caracteristica_11 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica11(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica once'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_12 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica doce
                                    </span>
                                    <input 
                                        id='caracteristica_12'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_12}
                                        onBlur={() => setShowCaracteristica13(caracteristica_12 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica12(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica doce'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_13 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica trece
                                    </span>
                                    <input 
                                        id='caracteristica_13'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_13}
                                        onBlur={() => setShowCaracteristica14(caracteristica_13 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica13(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica trece'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_14 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica catorce
                                    </span>
                                    <input 
                                        id='caracteristica_14'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_14}
                                        onBlur={() => setShowCaracteristica15(caracteristica_14 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica14(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica catorce'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_15 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${15 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica quince
                                    </span>
                                    <input 
                                        id='caracteristica_15'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_15}
                                        onBlur={() => setShowCaracteristica16(caracteristica_15 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica15(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 15 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica quince'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_16 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${15 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica diez y seis
                                    </span>
                                    <input 
                                        id='caracteristica_16'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_16}
                                        onBlur={() => setShowCaracteristica17(caracteristica_16 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica16(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 15 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica diez y seis'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_17 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${15 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica diez y siete
                                    </span>
                                    <input 
                                        id='caracteristica_17'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_17}
                                        onBlur={() => setShowCaracteristica18(caracteristica_17 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica17(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 15 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica diez y siete'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_18 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${15 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica diez y ocho
                                    </span>
                                    <input 
                                        id='caracteristica_18'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_18}
                                        onBlur={() => setShowCaracteristica19(caracteristica_18 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica18(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 15 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica diez y ocho'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_19 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${15 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica diez y nueve
                                    </span>
                                    <input 
                                        id='caracteristica_19'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_19}
                                        onBlur={() => setShowCaracteristica20(caracteristica_19 !== '' ? true : false)}
                                        onChange={(event) => setCaracteristica19(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 15 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica diez y nueve'/>
                                </div>
                            ) : null
                        }
                        {
                            show_caracteristica_20 ? ( 
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${15 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Característica veinte
                                    </span>
                                    <input 
                                        id='caracteristica_20'
                                        type='default'
                                        className='form-control rounded'
                                        value={caracteristica_20}
                                        onChange={(event) => setCaracteristica20(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 15 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Característica veinte'/>
                                </div>
                            ) : null
                        }
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Url foto principal
                            </span>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                                <input 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eurl_foto_principal ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    onChange={handleFileChange_1}/>
                                <div className={boton_subif_foto_1 ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload_1}
                                        onMouseOver={() => setBotonSubirFoto1(true)} onMouseLeave={() => setBotonSubirFoto1(false)}>Subir foto</p>
                                </div>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Url foto uno
                            </span>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                                <input 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    onChange={handleFileChange_2}/>
                                <div className={boton_subif_foto_2 ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload_2}
                                        onMouseOver={() => setBotonSubirFoto2(true)} onMouseLeave={() => setBotonSubirFoto2(false)}>Subir foto</p>
                                </div>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Url foto dos
                            </span>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                                <input 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    onChange={handleFileChange_3}/>
                                <div className={boton_subif_foto_3 ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload_3}
                                        onMouseOver={() => setBotonSubirFoto3(true)} onMouseLeave={() => setBotonSubirFoto3(false)}>Subir foto</p>
                                </div>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Url foto tres
                            </span>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                                <input 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    onChange={handleFileChange_4}/>
                                <div className={boton_subif_foto_4 ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload_4}
                                        onMouseOver={() => setBotonSubirFoto4(true)} onMouseLeave={() => setBotonSubirFoto4(false)}>Subir foto</p>
                                </div>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Url foto cuatro
                            </span>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                                <input 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    onChange={handleFileChange_5}/>
                                <div className={boton_subif_foto_5 ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload_5}
                                        onMouseOver={() => setBotonSubirFoto5(true)} onMouseLeave={() => setBotonSubirFoto5(false)}>Subir foto</p>
                                </div>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Url foto cinco
                            </span>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                                <input 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    onChange={handleFileChange_6}/>
                                <div className={boton_subif_foto_6 ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload_6}
                                        onMouseOver={() => setBotonSubirFoto6(true)} onMouseLeave={() => setBotonSubirFoto6(false)}>Subir foto</p>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                                onClick={() => guardar_producto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Guardar datos
                                </p>
                            </div>
                            <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                onClick={() => volver_a_lista()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Volver
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
