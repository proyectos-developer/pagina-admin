import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {productosdata} from '../../redux/slice/productosdata'
import {productosConstants} from '../../uri/productos-constants'
import { set_data_producto } from '../../redux/actions/data'

export default function DetallesProductoTablet ({proporcional}) {

    const location = useLocation()
    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const selectCategoria = useRef(null)
    const selectServicio = useRef(null)
    const selectSubCategoria = useRef(null)

    const [id_producto, setIdProducto] = useState(0)
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
    const [codigo_sku, setCodigoSku] = useState ('')

    const [eproducto, setEProducto] = useState(false)
    const [edescripcion, setEDescripcion] = useState (false)
    const [ecaracteristica_1, setECaracteristica1] = useState(false)
    const [ecaracteristica_2, setECaracteristica2] = useState(false)
    const [ecaracteristica_3, setECaracteristica3] = useState(false)
    const [ecaracteristica_4, setECaracteristica4] = useState(false)
    const [ecaracteristica_5, setECaracteristica5] = useState(false)
    const [ecaracteristica_6, setECaracteristica6] = useState(false)
    const [ecaracteristica_7, setECaracteristica7] = useState(false)
    const [ecaracteristica_8, setECaracteristica8] = useState(false)
    const [ecaracteristica_9, setECaracteristica9] = useState(false)
    const [ecaracteristica_10, setECaracteristica10] = useState(false)
    const [ecaracteristica_11, setECaracteristica11] = useState(false)
    const [ecaracteristica_12, setECaracteristica12] = useState(false)
    const [ecaracteristica_13, setECaracteristica13] = useState(false)
    const [ecaracteristica_14, setECaracteristica14] = useState(false)
    const [ecaracteristica_15, setECaracteristica15] = useState(false)
    const [ecaracteristica_16, setECaracteristica16] = useState(false)
    const [ecaracteristica_17, setECaracteristica17] = useState(false)
    const [ecaracteristica_18, setECaracteristica18] = useState(false)
    const [ecaracteristica_19, setECaracteristica19] = useState(false)
    const [ecaracteristica_20, setECaracteristica20] = useState(false)
    const [ecategoria, setECategoria] = useState(false)
    const [esub_categoria, setESubCategoria] = useState(false)
    const [eservicio, setEServicio] = useState(false)
    const [eurl_foto_principal, setEUrlFotoPrincipal] = useState(false)
    const [eurl_foto_1, setEUrlFoto1] = useState(false)
    const [eurl_foto_2, setEUrlFoto2] = useState(false)
    const [eurl_foto_3, setEUrlFoto3] = useState(false)
    const [eurl_foto_4, setEUrlFoto4] = useState(false)
    const [eurl_foto_5, setEUrlFoto5] = useState(false)
    const [eprecio, setEPrecio] = useState (false)
    const [edescuento, setEDescuento] = useState (false)
    const [eoferta, setEOferta] = useState (false)
    const [eprecio_mensual, setEPrecioMensual] = useState (false)
    const [eprecio_anual, setEPrecioAnual] = useState (false)
    const [ecomentarios, setEComentarios] = useState (false)
    const [ecodigo_sku, setECodigoSku] = useState (false)

    const [editar_informacion, setEditarInformacion] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {get_producto, update_producto} = useSelector(({productos_data}) => productos_data)
    const {data_producto, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (update_producto && update_producto.success === true && update_producto.producto){
            dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).update_producto))
            window.scrollTo(0, 0)
            setEditarInformacion(false)
        }
    }, [update_producto])

    useEffect(() => {
        if (data_producto.producto === undefined){
            dispatch(productosdata(productosConstants(location.pathname.split ('/')[3], 0, 0, 0, 0, 0, 0, 16, {}, false).get_producto))
        }else{
            setIdProducto (data_producto.id)
            setProducto (data_producto.producto)
            setDescripcion (data_producto.descripcion)
            setCaracteristica1 (data_producto.caracteristica_1)
            setCaracteristica2 (data_producto.caracteristica_2)
            setCaracteristica3 (data_producto.caracteristica_3)
            setCaracteristica4 (data_producto.caracteristica_4)
            setCaracteristica5 (data_producto.caracteristica_5)
            setCaracteristica6 (data_producto.caracteristica_6)
            setCaracteristica7 (data_producto.caracteristica_7)
            setCaracteristica8 (data_producto.caracteristica_8)
            setCaracteristica9 (data_producto.caracteristica_9)
            setCaracteristica10 (data_producto.caracteristica_10)
            setCaracteristica11 (data_producto.caracteristica_11)
            setCaracteristica12 (data_producto.caracteristica_12)
            setCaracteristica13 (data_producto.caracteristica_13)
            setCaracteristica14 (data_producto.caracteristica_14)
            setCaracteristica15 (data_producto.caracteristica_15)
            setCaracteristica16 (data_producto.caracteristica_16)
            setCaracteristica17 (data_producto.caracteristica_17)
            setCaracteristica18 (data_producto.caracteristica_18)
            setCaracteristica19 (data_producto.caracteristica_19)
            setCaracteristica20 (data_producto.caracteristica_20)
            setIdCategoria (data_producto.id_categoria)
            setCategoria (data_producto.categoria)
            setIdSubCategoria (data_producto.id_subcategoria)
            setSubCategoria (data_producto.sub_categoria)
            setServicio (data_producto.servicio)
            setUrlFotoPrincipal (data_producto.url_foto_principal)
            setUrlFoto1 (data_producto.url_foto_1)
            setUrlFoto2 (data_producto.url_foto_2)
            setUrlFoto3 (data_producto.url_foto_3)
            setUrlFoto4 (data_producto.url_foto_4)
            setUrlFoto5 (data_producto.url_foto_5)
            setPrecio (data_producto.precio)
            setOferta (data_producto.oferta)
            setPrecioMensual (data_producto.precio_mensual)
            setPrecioAnual (data_producto.precio_anual)
            setComentarios (data_producto.comentarios)
            setCodigoSku (data_producto.codigo_sku)
        }
    }, [])

    useEffect(() => {
        if (get_producto && get_producto.success === true && get_producto.producto){
            setIdProducto (get_producto.producto.id)
            setProducto (get_producto.producto.producto)
            setDescripcion (get_producto.producto.descripcion)
            setCaracteristica1 (get_producto.producto.caracteristica_1)
            setCaracteristica2 (get_producto.producto.caracteristica_2)
            setCaracteristica3 (get_producto.producto.caracteristica_3)
            setCaracteristica4 (get_producto.producto.caracteristica_4)
            setCaracteristica5 (get_producto.producto.caracteristica_5)
            setCaracteristica6 (get_producto.producto.caracteristica_6)
            setCaracteristica7 (get_producto.producto.caracteristica_7)
            setCaracteristica8 (get_producto.producto.caracteristica_8)
            setCaracteristica9 (get_producto.producto.caracteristica_9)
            setCaracteristica10 (get_producto.producto.caracteristica_10)
            setCaracteristica11 (get_producto.producto.caracteristica_11)
            setCaracteristica12 (get_producto.producto.caracteristica_12)
            setCaracteristica13 (get_producto.producto.caracteristica_13)
            setCaracteristica14 (get_producto.producto.caracteristica_14)
            setCaracteristica15 (get_producto.producto.caracteristica_15)
            setCaracteristica16 (get_producto.producto.caracteristica_16)
            setCaracteristica17 (get_producto.producto.caracteristica_17)
            setCaracteristica18 (get_producto.producto.caracteristica_18)
            setCaracteristica19 (get_producto.producto.caracteristica_19)
            setCaracteristica20 (get_producto.producto.caracteristica_20)
            setIdCategoria (get_producto.producto.id_categoria)
            setCategoria (get_producto.producto.categoria)
            setIdSubCategoria (get_producto.producto.id_subcategoria)
            setSubCategoria (get_producto.producto.sub_categoria)
            setServicio (get_producto.producto.servicio)
            setUrlFotoPrincipal (get_producto.producto.url_foto_principal)
            setUrlFoto1 (get_producto.producto.url_foto_1)
            setUrlFoto2 (get_producto.producto.url_foto_2)
            setUrlFoto3 (get_producto.producto.url_foto_3)
            setUrlFoto4 (get_producto.producto.url_foto_4)
            setUrlFoto5 (get_producto.producto.url_foto_5)
            setPrecio (get_producto.producto.precio)
            setOferta (get_producto.producto.oferta)
            setPrecioMensual (get_producto.producto.precio_mensual)
            setPrecioAnual (get_producto.producto.precio_anual)
            setComentarios (get_producto.producto.comentarios)
            setCodigoSku (get_producto.producto.codigo_sku)
            dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).get_producto))
        }
    }, [get_producto])

    const volver_a_lista = () => {
        dispatch(set_data_producto({}))
        window.scrollTo(0, 0)
        navigate ('/panel/productos')
    }
    
    const actualizar_datos_proyecto = () => {
        if (producto === '' || descripcion === '' || precio === ''){
            setEProducto (producto === '' ? true : false)
            setEDescripcion (descripcion === '' ? true : false)
            setECaracteristica1 (caracteristica_1 === '' ? true : false)
            setECaracteristica2 (caracteristica_2 === '' ? true : false)
            setECaracteristica3 (caracteristica_3 === '' ? true : false)
            setECaracteristica4 (caracteristica_4 === '' ? true : false)
            setECaracteristica5 (caracteristica_5 === '' ? true : false)
            setECaracteristica6 (caracteristica_6 === '' ? true : false)
            setECaracteristica7 (caracteristica_7 === '' ? true : false)
            setECaracteristica8 (caracteristica_8 === '' ? true : false)
            setECaracteristica9 (caracteristica_9 === '' ? true : false)
            setECaracteristica10 (caracteristica_10 === '' ? true : false)
            setECaracteristica11 (caracteristica_11 === '' ? true : false)
            setECaracteristica12 (caracteristica_12 === '' ? true : false)
            setECaracteristica13 (caracteristica_13 === '' ? true : false)
            setECaracteristica14 (caracteristica_14 === '' ? true : false)
            setECaracteristica15 (caracteristica_15 === '' ? true : false)
            setECaracteristica16 (caracteristica_16 === '' ? true : false)
            setECaracteristica17 (caracteristica_17 === '' ? true : false)
            setECaracteristica18 (caracteristica_18 === '' ? true : false)
            setECaracteristica19 (caracteristica_19 === '' ? true : false)
            setECaracteristica20 (caracteristica_20 === '' ? true : false)
            setECategoria (categoria === '' ? true : false)
            setESubCategoria (sub_categoria === '' ? true : false)
            setEServicio (servicio === '' ? true : false)
            setEUrlFotoPrincipal (url_foto_principal === '' ? true : false)
            setEUrlFoto1 (url_foto_1 === '' ? true : false)
            setEUrlFoto2 (url_foto_2 === '' ? true : false)
            setEUrlFoto3 (url_foto_3 === '' ? true : false)
            setEUrlFoto4 (url_foto_4 === '' ? true : false)
            setEUrlFoto5 (url_foto_5 === '' ? true : false)
            setEPrecio (precio === '' ? true : false)
            setEOferta (oferta === '' ? true : false)
            setEPrecioMensual (precio_mensual === '' ? true : false)
            setEPrecioAnual (precio_anual === '' ? true : false)
            setEComentarios (comentarios === '' ? true : false)
            setECodigoSku (codigo_sku === '' ? true : false)
        }else{
            setEProducto (false)
            setEDescripcion (false)
            setECaracteristica1 (false)
            setECaracteristica2 (false)
            setECaracteristica3 (false)
            setECaracteristica4 (false)
            setECaracteristica5 (false)
            setECaracteristica6 (false)
            setECaracteristica7 (false)
            setECaracteristica8 (false)
            setECaracteristica9 (false)
            setECaracteristica10 (false)
            setECaracteristica11 (false)
            setECaracteristica12 (false)
            setECaracteristica13 (false)
            setECaracteristica14 (false)
            setECaracteristica15 (false)
            setECaracteristica16 (false)
            setECaracteristica17 (false)
            setECaracteristica18 (false)
            setECaracteristica19 (false)
            setECaracteristica20 (false)
            setECategoria (false)
            setESubCategoria (false)
            setEServicio (false)
            setEUrlFotoPrincipal (false)
            setEUrlFoto1 (false)
            setEUrlFoto2 (false)
            setEUrlFoto3 (false)
            setEUrlFoto4 (false)
            setEUrlFoto5 (false)
            setEPrecio (false)
            setEOferta (false)
            setEPrecioMensual (false)
            setEPrecioAnual (false)
            setEComentarios (false)
            setECodigoSku (false)
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
                sub_categoria: sub_categoria,
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
                sku: codigo_sku
            }
            dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 16, data_nuevo, false).update_producto))
        }
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: '100%'}}>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div className='' style={{width: '48%', height: 'auto'}}>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto',
                                marginBottom: 16 / proporcional}}>
                            <div className='rounded' style={{width:  350 / proporcional, height: 350 / proporcional,
                                border: '1px solid #4a4a4a'}}>
                                {
                                    url_foto_principal !== '' ? (
                                        <img className='rounded' src={url_foto_principal} 
                                            style={{width: 350 / proporcional, height: 350 / proporcional}}/>
                                    ) : null
                                }
                            </div>
                        </div>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                            <div className='d-flex justify-content-between' style={{width: 350 / proporcional, height: 'auto'}}>
                                <div className='rounded' style={{width:  65 / proporcional, height: 65 / proporcional,
                                    border: '1px solid #4a4a4a'}}>
                                    {
                                        url_foto_1 !== '' ? (
                                            <img className='rounded' src={url_foto_1} 
                                                style={{width: 65 / proporcional, height: 65 / proporcional}}/>
                                        ) : null
                                    }
                                </div>
                                <div className='rounded' style={{width:  65 / proporcional, height: 65 / proporcional,
                                    border: '1px solid #4a4a4a'}}>
                                    {
                                        url_foto_2 !== '' ? (
                                            <img className='rounded' src={url_foto_2} 
                                                style={{width: 65 / proporcional, height: 65 / proporcional}}/>
                                        ) : null
                                    }
                                </div>
                                <div className='rounded' style={{width:  65 / proporcional, height: 65 / proporcional,
                                    border: '1px solid #4a4a4a'}}>
                                    {
                                        url_foto_3 !== '' ? (
                                            <img className='rounded' src={url_foto_3} 
                                                style={{width: 65 / proporcional, height: 65 / proporcional}}/>
                                        ) : null
                                    }
                                </div>
                                <div className='rounded' style={{width:  65 / proporcional, height: 65 / proporcional,
                                    border: '1px solid #4a4a4a'}}>
                                    {
                                        url_foto_4 !== '' ? (
                                            <img className='rounded' src={url_foto_4} 
                                                style={{width: 65 / proporcional, height: 65 / proporcional}}/>
                                        ) : null
                                    }
                                </div>
                                <div className='rounded' style={{width:  65 / proporcional, height: 65 / proporcional,
                                    border: '1px solid #4a4a4a'}}>
                                    {
                                        url_foto_5 !== '' ? (
                                            <img className='rounded' src={url_foto_5} 
                                                style={{width: 65 / proporcional, height: 65 / proporcional}}/>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Producto
                            </span>
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
                                placeholder='Nombre del producto'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Descripción
                            </span>
                            <textarea
                                disabled={!editar_informacion} 
                                id='descripcion'
                                rows={4}
                                type='default'
                                className='form-control rounded'
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                                style={{width: '100%', height: 225 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edescripcion ? '1px solid red' : '1px solid #007BFF',
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
                                    disabled={!editar_informacion} 
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
                                    disabled={!editar_informacion} 
                                    id='oferta'
                                    type='number'
                                    className='form-control rounded'
                                    value={oferta}
                                    onChange={(event) => setoferta(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: eoferta ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Oferta'/>
                            </div>
                            <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Precio de oferta
                                </span>
                                <input
                                    disabled={!editar_informacion} 
                                    id='descuento'
                                    type='number'
                                    className='form-control rounded'
                                    value={descuento}
                                    onChange={(event) => setDescuento(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: edescuento ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Precio de oferta'/>
                            </div>
                        </div>
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
                            disabled={!editar_informacion} 
                            id='precio_mensual'
                            type='number'
                            className='form-control rounded'
                            value={precio_mensual}
                            onChange={(event) => setPrecioMensual(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eprecio_mensual ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Precio mensual'/>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Precio anual(S/.)
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='precio_anual'
                            type='number'
                            className='form-control rounded'
                            value={precio_anual}
                            onChange={(event) => setPrecioAnual(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eprecio_anual ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Precio anual'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Categoría 
                        </span>
                        <select
                            disabled={!editar_informacion}
                            id='categoria'
                            ref={selectCategoria}
                            className='form-select rounded'
                            onChange={(event) => setCategoria(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecategoria ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>Seleccionar categoría</option>
                        </select>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Sub categoría 
                        </span>
                        <select
                            disabled={!editar_informacion}
                            id='sub_categoria'
                            ref={selectSubCategoria}
                            className='form-select rounded'
                            onChange={(event) => setSubCategoria(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: esub_categoria ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>Seleccionar sub categoría</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '48%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Servicio 
                        </span>
                        <select
                            disabled={!editar_informacion}
                            id='servicio'
                            ref={selectServicio}
                            className='form-select rounded'
                            onChange={(event) => setServicio(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eservicio ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>Seleccionar servicio</option>
                        </select>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Código SKU
                            </span>
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
                                placeholder='Código Sku'/>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Comentarios
                    </span>
                    <textarea
                        disabled={!editar_informacion} 
                        id='comentarios'
                        rows={3}
                        type='default'
                        className='form-control rounded'
                        value={comentarios}
                        onChange={(event) => setComentarios(event.target.value)}
                        style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: ecomentarios ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Comentarios del producto'/>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica uno
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_1'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_1}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_1 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica uno'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica dos
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_2'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_2}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_2 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica dos'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica tres
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_3'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_3}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_3 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica tres'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica cuatro
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_4'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_4}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_4 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica cuatro'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica cinco
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_5'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_5}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_5 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica cinco'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica seis
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_6'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_6}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_6 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica seis'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica siete
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_7'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_7}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_7 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica siete'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica ocho
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_8'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_8}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_8 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica ocho'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica nueve
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_9'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_9}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_9 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica nueve'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica diez
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_10'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_10}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_10 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica diez'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica once
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_11'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_11}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_11 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica once'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica doce
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_12'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_12}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_12 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica doce'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica trece
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_13'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_13}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_13 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica trece'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica catorce
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_14'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_14}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_14 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica catorce'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica quince
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_15'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_15}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_15 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica quince'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica diez y seis
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_16'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_16}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_16 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica diez y seis'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica diez y siete
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_17'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_17}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_17 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica diez y siete'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica diez y ocho
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_18'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_18}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_18 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica diez y ocho'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica diez y nueve
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_19'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_19}
                            onChange={(event) => setCaracteristica1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_19 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica diez y nueve'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Característica veinte
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='caracteristica_20'
                            type='default'
                            className='form-control rounded'
                            value={caracteristica_20}
                            onChange={(event) => setCaracteristica2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecaracteristica_20 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Característica veinte'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url foto principal
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='url_foto_principal'
                            type='default'
                            className='form-control rounded'
                            value={url_foto_principal}
                            onChange={(event) => setUrlFotoPrincipal(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_foto_principal ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Url foto principal'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url foto uno
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='url_foto_1'
                            type='default'
                            className='form-control rounded'
                            value={url_foto_1}
                            onChange={(event) => setUrlFoto1(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_foto_1 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Url foto uno'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url foto dos
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='url_foto_2'
                            type='default'
                            className='form-control rounded'
                            value={url_foto_2}
                            onChange={(event) => setUrlFoto2(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_foto_2 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Url foto dos'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url foto tres
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='url_foto_3'
                            type='default'
                            className='form-control rounded'
                            value={url_foto_3}
                            onChange={(event) => setUrlFoto3(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_foto_3 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Url foto tres'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url foto cuatro
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='url_foto_4'
                            type='default'
                            className='form-control rounded'
                            value={url_foto_4}
                            onChange={(event) => setUrlFoto4(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_foto_4 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Url foto cuatro'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url foto cinco
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='url_foto_5'
                            type='default'
                            className='form-control rounded'
                            value={url_foto_5}
                            onChange={(event) => setUrlFoto5(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_foto_5 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Url foto cinco'/>
                    </div>
                </div>
                {
                    editar_informacion ? (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_datos_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0)}}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                >
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Editar datos
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
                    )
                }
            </div>
        </div>
    )
}
