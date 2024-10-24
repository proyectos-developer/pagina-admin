import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation, useNavigate } from 'react-router-dom'
import { productosdata } from '../../../../redux/slice/productosdata'
import { productosConstants } from '../../../../uri/productos-constants'

export default function DatosPrecios ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCasncelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const [select_foto, setSelectFoto] = useState(false)

    const id_producto = location.pathname.split ('/')[6]
    const [url_foto_principal, setUrlFotoPrincipal] = useState ('')
    const [url_foto_uno, setUrlFotoUno] = useState ('')
    const [url_foto_dos, setUrlFotoDos] = useState ('')
    const [url_foto_tres, setUrlFotoTres] = useState ('')
    const [url_foto_cuatro, setUrlFotoCuatro] = useState ('')
    const [url_foto_cinco, setUrlFotoCinco] = useState ('')

    const [file_foto_principal, setFileFotoPrincipal] = useState('')
    const [file_foto_uno, setFileFotoUno] = useState('')
    const [file_foto_dos, setFileFotoDos] = useState('')
    const [file_foto_tres, setFileFotoTres] = useState('')
    const [file_foto_cuatro, setFileFotoCuatro] = useState('')
    const [file_foto_cinco, setFileFotoCinco] = useState('')
    
    const [boton_foto_principal, setBotonFotoPrincipal] = useState(false)
    const [boton_foto_uno, setBotonFotoUno] = useState(false)
    const [boton_foto_dos, setBotonFotoDos] = useState(false)
    const [boton_foto_tres, setBotonFotoTres] = useState(false)
    const [boton_foto_cuatro, setBotonFotoCuatro] = useState(false)
    const [boton_foto_cinco, setBotonFotoCinco] = useState(false)

    const {data_productos, data_producto_detalles, data_editable} = useSelector(({data_actions}) => data_actions)
    const {update_producto_fotos, get_producto_fotos} = useSelector(({productos_data}) => productos_data)
    const {file_upload_fotos_productos} = useSelector(({files_data}) => files_data)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_productos && data_productos.foto_principal){
            setUrlFotoPrincipal(data_productos.url_foto_principal)
            setUrlFotoUno(data_productos.url_foto_uno)
            setUrlFotoDos(data_productos.url_foto_dos)
            setUrlFotoTres(data_productos.url_foto_tres)
            setUrlFotoCuatro(data_productos.url_foto_cuatro)
            setUrlFotoCinco(data_productos.url_foto_cinco)

            setFileFotoPrincipal(data_productos.url_foto_principal)
            setFileFotoUno(data_productos.url_foto_uno)
            setFileFotoDos(data_productos.url_foto_dos)
            setFileFotoTres(data_productos.url_foto_tres)
            setFileFotoCuatro(data_productos.url_foto_cuatro)
            setFileFotoCinco(data_productos.url_foto_cinco)
        }else{
            dispatch(productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_producto_fotos))
        }
    }, [])

    useEffect(() => {
        if (get_producto_fotos && get_producto_fotos.success === true && get_producto_fotos.producto){
            setUrlFotoPrincipal(get_producto_fotos.producto.url_foto_principal)
            setUrlFotoUno(get_producto_fotos.producto.url_foto_uno)
            setUrlFotoDos(get_producto_fotos.producto.url_foto_dos)
            setUrlFotoTres(get_producto_fotos.producto.url_foto_tres)
            setUrlFotoCuatro(get_producto_fotos.producto.url_foto_cuatro)
            setUrlFotoCinco(get_producto_fotos.producto.url_foto_cinco)

            setFileFotoPrincipal(get_producto_fotos.producto.url_foto_principal)
            setFileFotoUno(get_producto_fotos.producto.url_foto_uno)
            setFileFotoDos(get_producto_fotos.producto.url_foto_dos)
            setFileFotoTres(get_producto_fotos.producto.url_foto_tres)
            setFileFotoCuatro(get_producto_fotos.producto.url_foto_cuatro)
            setFileFotoCinco(get_producto_fotos.producto.url_foto_cinco)
            setEditarInformacion(false)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_producto_fotos))
        }
    }, [get_producto_fotos])

    useEffect(() => {
        if (update_producto_fotos && update_producto_fotos.success === true && update_producto_fotos.producto){
            setUrlFotoPrincipal(update_producto_fotos.producto.url_foto_principal)
            setUrlFotoUno(update_producto_fotos.producto.url_foto_uno)
            setUrlFotoDos(update_producto_fotos.producto.url_foto_dos)
            setUrlFotoTres(update_producto_fotos.producto.url_foto_tres)
            setUrlFotoCuatro(update_producto_fotos.producto.url_foto_cuatro)
            setUrlFotoCinco(update_producto_fotos.producto.url_foto_cinco)

            setFileFotoPrincipal(update_producto_fotos.producto.url_foto_principal)
            setFileFotoUno(update_producto_fotos.producto.url_foto_uno)
            setFileFotoDos(update_producto_fotos.producto.url_foto_dos)
            setFileFotoTres(update_producto_fotos.producto.url_foto_tres)
            setFileFotoCuatro(update_producto_fotos.producto.url_foto_cuatro)
            setFileFotoCinco(update_producto_fotos.producto.url_foto_cinco)
            setEditarInformacion(false)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_producto_fotos))
        }
    }, [update_producto_fotos])

    useEffect(() => {
        if (file_upload_fotos_productos && file_upload_fotos_productos.success === true && file_upload_fotos_productos.message === true){
            if (select_foto === 'principal'){
                setUrlFotoPrincipal(`${constantes().url_archivo[0].url}/productos/fotos/${data_producto_detalles.codigo_sku}/${file_foto_principal.name}`)
            }else if (select_foto === 'uno'){
                setUrlFotoUno(`${constantes().url_archivo[0].url}/productos/fotos/${data_producto_detalles.codigo_sku}/${file_foto_uno.name}`)
            }else if (select_foto === 'dos'){
                setUrlFotoDos(`${constantes().url_archivo[0].url}/productos/fotos/${data_producto_detalles.codigo_sku}/${file_foto_dos.name}`)
            }else if (select_foto === 'tres'){
                setUrlFotoTres(`${constantes().url_archivo[0].url}/productos/fotos/${data_producto_detalles.codigo_sku}/${file_foto_tres.name}`)
            }else if (select_foto === 'cuatro'){
                setUrlFotoCuatro(`${constantes().url_archivo[0].url}/productos/fotos/${data_producto_detalles.codigo_sku}/${file_foto_cuatro.name}`)
            }else if (select_foto === 'cinco'){
                setUrlFotoinco(`${constantes().url_archivo[0].url}/productos/fotos/${data_producto_detalles.codigo_sku}/${file_foto_cinco.name}`)
            }
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_fotos_productos))
        }
    }, [file_upload_fotos_productos])
    
    const handleFileChangeFotoPrincipal = (event) => {
        setFileFotoPrincipal(event.target.files[0])
    }

    const handleUploadFotoPrincipal = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_foto_principal, file_foto_principal.name)
        dispatch(filesdata(filesConstants(`${data_producto_detalles.codigo_sku}`, data, false).file_upload_fotos_productos))
    }
    
    const handleFileChangeFotoUno = (event) => {
        setFileFotoUno(event.target.files[0])
    }

    const handleUploadFotoUno = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_foto_uno, file_foto_uno.name)
        dispatch(filesdata(filesConstants(`${data_producto_detalles.codigo_sku}`, data, false).file_upload_fotos_productos))
    }
    
    const handleFileChangeFotoDos = (event) => {
        setFileFotoDos(event.target.files[0])
    }

    const handleUploadFotoDos = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_foto_dos, file_foto_dos.name)
        dispatch(filesdata(filesConstants(`${data_producto_detalles.codigo_sku}`, data, false).file_upload_fotos_productos))
    }
    
    const handleFileChangeFotoTres = (event) => {
        setFileFotoTres(event.target.files[0])
    }

    const handleUploadFotoTres = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_foto_tres, file_foto_tres.name)
        dispatch(filesdata(filesConstants(`${data_producto_detalles.codigo_sku}`, data, false).file_upload_fotos_productos))
    }
    
    const handleFileChangeFotoCuatro = (event) => {
        setFileFotoCuatro(event.target.files[0])
    }

    const handleUploadFotoCuatro = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_foto_cuatro, file_foto_cuatro.name)
        dispatch(filesdata(filesConstants(`${data_producto_detalles.codigo_sku}`, data, false).file_upload_fotos_productos))
    }
    
    const handleFileChangeFotoCinco = (event) => {
        setFileFotoCinco(event.target.files[0])
    }

    const handleUploadFotoCinco = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_foto_cinco, file_foto_cinco.name)
        dispatch(filesdata(filesConstants(`${data_producto_detalles.codigo_sku}`, data, false).file_upload_fotos_productos))
    }

    const actualizar_datos_producto = () => {
        const data_update = {
            url_foto_principal: url_foto_principal,
            url_foto_uno: url_foto_uno,
            url_foto_dos: url_foto_dos,
            url_foto_tres: url_foto_tres,
            url_foto_cuatro: url_foto_cuatro,
            url_foto_cinco: url_foto_cinco
        }
        dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, data_update, false).update_producto_fotos))
    }

    const cancelar_edicion_datos = () => {
        dispatch (productosdata(productosConstants(id_producto, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_producto_fotos))
    }

    const volver_a_lista = () => {
        navigate ('/panel/almacen/productos')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '48%', height: 400 / proporcional}}>
                        {
                            url_foto_principal !== '' ? (
                                <img className='rounded' src={url_foto_principal} style={{width: 400 / proporcional, height: 400 / proporcional}}/>
                            ) : (
                                <div className='rounded' style={{width: 400 / proporcional, height: 400 / proporcional, border: '1px solid #4a4a4a'}}/>
                            )
                        }
                    </div>
                    <div className='' style={{width: '48%', height: 400 / proporcional}}>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                {
                                    url_foto_uno !== '' ? (
                                        <img className='rounded' src={url_foto_uno} style={{width: 192 / proporcional, height: 192 / proporcional}}/>
                                    ) : (
                                        <div className='rounded' style={{width: 192 / proporcional, height: 192 / proporcional, border: '1px solid #4a4a4a'}}/>
                                    )
                                }
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                {
                                    url_foto_dos !== '' ? (
                                        <img className='rounded' src={url_foto_dos} style={{width: 192 / proporcional, height: 192 / proporcional}}/>
                                    ) : (
                                        <div className='rounded' style={{width: 192 / proporcional, height: 192 / proporcional, border: '1px solid #4a4a4a'}}/>
                                    )
                                }
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                {
                                    url_foto_tres !== '' ? (
                                        <img className='rounded' src={url_foto_tres} style={{width: 192 / proporcional, height: 192 / proporcional}}/>
                                    ) : (
                                        <div className='rounded' style={{width: 192 / proporcional, height: 192 / proporcional, border: '1px solid #4a4a4a'}}/>
                                    )
                                }
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                {
                                    url_foto_cuatro !== '' ? (
                                        <img className='rounded' src={url_foto_cuatro} style={{width: 192 / proporcional, height: 192 / proporcional}}/>
                                    ) : (
                                        <div className='rounded' style={{width: 192 / proporcional, height: 192 / proporcional, border: '1px solid #4a4a4a'}}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                    <input 
                        disabled={!editar_informacion}
                        class="form-control" 
                        type="file" 
                        id="formFile" 
                        falue={file_foto_principal}
                        style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                            padding: 10 / proporcional}}
                        onChange={handleFileChangeFotoPrincipal}/>
                        <div className={boton_foto_principal ? 'shadow-lg rounded' : 'rounded'} 
                            style={{width: '30%', heihgt: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                            <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFotoPrincipal}
                                onMouseOver={() => setBotonFotoPrincipal(true)} 
                                onMouseLeave={() => setBotonFotoPrincipal(false)}>Subir foto principal</p>
                        </div>
                </div>
                {
                    url_foto_principal !== '' ? (
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                            <input 
                                disabled={!editar_informacion}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                falue={file_foto_uno}
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChangeFotoUno}/>
                                <div className={boton_foto_uno ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFotoUno}
                                        onMouseOver={() => setBotonFotoUno(true)} 
                                        onMouseLeave={() => setBotonFotoUno(false)}>Subir foto principal</p>
                                </div>
                        </div>
                    ) : null
                }
                {
                    url_foto_uno !== '' ? (
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                            <input 
                                disabled={!editar_informacion}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                falue={file_foto_dos}
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChangeFotoDos}/>
                                <div className={boton_foto_dos ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFotoDos}
                                        onMouseOver={() => setBotonFotoDos(true)} 
                                        onMouseLeave={() => setBotonFotoDos(false)}>Subir foto principal</p>
                                </div>
                        </div>
                    ) : null
                }
                {
                    url_foto_dos !== '' ? (
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                            <input 
                                disabled={!editar_informacion}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                falue={file_foto_tres}
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChangeFotoTres}/>
                                <div className={boton_foto_tres ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFotoTres}
                                        onMouseOver={() => setBotonFotoTres(true)} 
                                        onMouseLeave={() => setBotonFotoTres(false)}>Subir foto principal</p>
                                </div>
                        </div>
                    ) : null
                }
                {
                    url_foto_tres !== '' ? (
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                            <input 
                                disabled={!editar_informacion}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                falue={file_foto_cuatro}
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChangeFotoCuatro}/>
                                <div className={boton_foto_cuatro ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFotoCuatro}
                                        onMouseOver={() => setBotonFotoCuatro(true)} 
                                        onMouseLeave={() => setBotonFotoCuatro(false)}>Subir foto principal</p>
                                </div>
                        </div>
                    ) : null
                }
                {/**
                    url_foto_cuatro !== '' ? (
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                            <input 
                                disabled={!editar_informacion}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                falue={file_foto_cinco}
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChangeFotoCinco}/>
                                <div className={boton_foto_cinco ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFotoCinco}
                                        onMouseOver={() => setBotonFotoCinco(true)} 
                                        onMouseLeave={() => setBotonFotoCinco(false)}>Subir foto principal</p>
                                </div>
                        </div>
                    ) : null
                 */}
                
                {
                    editar_informacion ? ( 
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCasncelar(true)} onMouseLeave={() => setBotonCasncelar(false)}
                                onClick={() => cancelar_edicion_datos()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_datos_producto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                onClick={() => volver_a_lista()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
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
