import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_producto_fotos, set_datos_paso_producto} from '../../../../redux/actions/data'

export default function DatosFotosTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const [select_foto, setSelectFoto] = useState(false)

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
    
    const {data_producto_fotos} = useSelector(({data_actions}) => data_actions)
    const {file_upload_fotos_productos} = useSelector(({files_data}) => files_data)

    useEffect(() => {
        if (data_producto_fotos && data_producto_fotos.foto_principal){
            setUrlFotoPrincipal(data_producto_fotos.url_foto_principal)
            setUrlFotoUno(data_producto_fotos.url_foto_uno)
            setUrlFotoDos(data_producto_fotos.url_foto_dos)
            setUrlFotoTres(data_producto_fotos.url_foto_tres)
            setUrlFotoCuatro(data_producto_fotos.url_foto_cuatro)
            setUrlFotoCinco(data_producto_fotos.url_foto_cinco)

            setFileFotoPrincipal(data_producto_fotos.url_foto_principal)
            setFileFotoUno(data_producto_fotos.url_foto_uno)
            setFileFotoDos(data_producto_fotos.url_foto_dos)
            setFileFotoTres(data_producto_fotos.url_foto_tres)
            setFileFotoCuatro(data_producto_fotos.url_foto_cuatro)
            setFileFotoCinco(data_producto_fotos.url_foto_cinco)
        }else{
            setUrlFotoPrincipal('')
            setUrlFotoUno('')
            setUrlFotoDos('')
            setUrlFotoTres('')
            setUrlFotoCuatro('')
            setUrlFotoCinco('')

            setFileFotoPrincipal('')
            setFileFotoUno('')
            setFileFotoDos('')
            setFileFotoTres('')
            setFileFotoCuatro('')
            setFileFotoCinco('')
        }
    }, [])

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

    const guardar_datos_producto = () => {
        dispatch (set_data_producto_fotos({
            url_foto_principal: url_foto_principal,
            url_foto_uno: url_foto_uno,
            url_foto_dos: url_foto_dos,
            url_foto_tres: url_foto_tres,
            url_foto_cuatro: url_foto_cuatro,
            url_foto_cinco: url_foto_cinco
        }))
        dispatch (set_datos_paso_producto('guardar'))
    }

    const volver_a_lista = () => {
        dispatch (set_data_producto_fotos({
            url_foto_principal: url_foto_principal,
            url_foto_uno: url_foto_uno,
            url_foto_dos: url_foto_dos,
            url_foto_tres: url_foto_tres,
            url_foto_cuatro: url_foto_cuatro,
            url_foto_cinco: url_foto_cinco
        }))
        dispatch (set_datos_paso_producto('caracteristicas'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                    <input 
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
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 400 / proporcional, marginBottom: 16 / proporcional}}>
                        {
                            url_foto_principal !== '' ? (
                                <img className='rounded' src={url_foto_principal} style={{width: 400 / proporcional, height: 400 / proporcional}}/>
                            ) : (
                                <div className='rounded' style={{width: 400 / proporcional, height: 400 / proporcional, border: '1px solid #4a4a4a'}}/>
                            )
                        }
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div className='d-flex justify-content-center' style={{width: '48%', height: 'auto'}}>
                            {
                                url_foto_uno !== '' ? (
                                    <img className='rounded' src={url_foto_uno} style={{width: 250 / proporcional, height: 250 / proporcional}}/>
                                ) : (
                                    <div className='rounded' style={{width: 250 / proporcional, height: 250 / proporcional, border: '1px solid #4a4a4a'}}/>
                                )
                            }
                        </div>
                        <div className='d-flex justify-content-center' style={{width: '48%', height: 'auto'}}>
                            {
                                url_foto_dos !== '' ? (
                                    <img className='rounded' src={url_foto_dos} style={{width: 250 / proporcional, height: 250 / proporcional}}/>
                                ) : (
                                    <div className='rounded' style={{width: 250 / proporcional, height: 250 / proporcional, border: '1px solid #4a4a4a'}}/>
                                )
                            }
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div className='d-flex justify-content-center' style={{width: '48%', height: 'auto'}}>
                            {
                                url_foto_tres !== '' ? (
                                    <img className='rounded' src={url_foto_tres} style={{width: 250 / proporcional, height: 250 / proporcional}}/>
                                ) : (
                                    <div className='rounded' style={{width: 250 / proporcional, height: 250 / proporcional, border: '1px solid #4a4a4a'}}/>
                                )
                            }
                        </div>
                        <div className='d-flex justify-content-center' style={{width: '48%', height: 'auto'}}>
                            {
                                url_foto_cuatro !== '' ? (
                                    <img className='rounded' src={url_foto_cuatro} style={{width: 250 / proporcional, height: 250 / proporcional}}/>
                                ) : (
                                    <div className='rounded' style={{width: 250 / proporcional, height: 250 / proporcional, border: '1px solid #4a4a4a'}}/>
                                )
                            }
                        </div>
                    </div>
                </div>
                {/**
                    url_foto_cuatro !== '' ? (
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                            <input 
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
                    <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                        onClick={() => guardar_datos_producto()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
