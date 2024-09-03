import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {categoriasdata} from '../../redux/slice/categoriasdata'
import {categoriasConstants} from '../../uri/categorias-constants'
import {filesdata} from '../../redux/slice/filesdata'
import {filesConstants} from '../../uri/files-constants'

export default function NuevaCategoria ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [file_imagen, setFileImagen] = useState (null)

    const [url_foto, setUrlFoto] = useState('')
    const [categoria, setCategoria] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [ecategoria, setECategoria] = useState (false)

    const [boton_subir_foto, setBotonSubirFoto] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_categoria} = useSelector(({categorias_data}) => categorias_data)
    const {file_upload} = useSelector(({files_data}) => files_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (new_categoria && new_categoria.success === true && new_categoria.categoria){
            dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 16, {}, true).new_categoria))
            resetear_data()
        }
    }, [new_categoria])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlFoto(`https://api.developer-ideas.com/categorias/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    const resetear_data = () => {
        setCategoria('')
        setDescripcion('')
    }

    const volver_a_lista = () => {
        resetear_data()
        window.scrollTo(0, 0)
        navigate ('/panel/categorias')
    }

    const guardar_categoria = () => {
        if (categoria === ''){
          setECategoria(categoria === '' ? true : false)
        }else{
            setECategoria(false)
            const data_nuevo = {
                url_foto: url_foto,
                categoria: categoria,
                descripcion: descripcion
            }
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, data_nuevo, false).new_categoria))
        }
    }
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('categorias', data, false).file_upload))
    }

    useEffect(() => {
        return (() => {
            dispatch(filesdata(filesConstants('', {}, true).file_upload))
            dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 0, {}, true).new_categoria))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Nueva categoría
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '80%', height: '100%'}}>
                    <div className='d-flex justify-content-center' 
                            style={{width: '100%', height: 'auto', paddingTop: 26.5 / proporcional,
                                paddingBottom: 26.5 / proporcional, marginBottom: 16 / proporcional}}>
                        <div className='rounded-circle' style={{width:  292 / proporcional, height: 292 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_foto !== '' ? (
                                    <img className='rounded-circle' src={url_foto} 
                                        style={{width: 290 / proporcional, height: 290 / proporcional}}/>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Categoría
                            </span>
                            <input
                                type='default' 
                                id='categoria'
                                value={categoria}
                                className='form-control rounded'
                                onChange={(event) => setCategoria (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: ecategoria ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre categoría'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Descripción de la categoría
                            </span>
                            <textarea 
                                id='descripcion'
                                type='default'
                                rows={3}
                                className='form-control rounded'
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                                style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Descripción de la categoría'/>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Url imagen
                            </span>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                                <input 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    onChange={handleFileChange}/>
                                <div className={boton_subir_foto ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                        onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                                onClick={() => guardar_categoria()}>
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
