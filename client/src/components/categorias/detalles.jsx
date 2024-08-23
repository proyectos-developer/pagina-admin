import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {categoriasdata} from '../../redux/slice/categoriasdata'
import { set_data_categoria } from '../../redux/actions/data'
import { categoriasConstants } from '../../uri/categorias-constants'
import {filesdata} from '../../redux/slice/filesdata'
import {filesConstants} from '../../uri/files-constants'

export default function DetallesCategoria ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [file_imagen, setFileImagen] = useState (null)
    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_categoria, setIdCategoria] = useState('')
    const [url_foto, setUrlFoto] = useState('')
    const [categoria, setCategoria] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [eurl_foto, setEUrlFoto] = useState('')
    const [ecategoria, setECategoria] = useState (false)
    const [edescripcion, setEDescripcion] = useState(false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_categoria, get_categoria} = useSelector(({categorias_data}) => categorias_data)
    const {file_upload} = useSelector(({files_data}) => files_data)
    const {data_categoria, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_categoria.categoria === undefined){
            dispatch(categoriasdata(categoriasConstants(location.pathname.split ('/')[5], 0, 0, 0, 0, 16, {}, false).get_categoria))
        }else{
            setIdCategoria(data_categoria.id)
            setCategoria(data_categoria.categoria)
            setDescripcion(data_categoria.descripcion)
        }
    }, [])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlFoto(`https://api.developer-ideas.com/categorias/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_categoria && get_categoria.success === true && get_categoria.categoria){
            setIdCategoria(get_categoria.categoria.id)
            setCategoria(get_categoria.categoria.categoria)
            setDescripcion(get_categoria.categoria.descripcion)
            dispatch(categoriasdata(categoriasConstants(0, {}, true).get_categoria))
        }
    }, [get_categoria])

    useEffect(() => {
        if (update_categoria && update_categoria.success === true && update_categoria.categoria){
            dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, {}, true).update_categoria))
            setEditarInformacion(false)
        }
    }, [update_categoria])

    const volver_a_lista = () => {
        dispatch(set_data_categoria({}))
        navigate ('/panel/categorias')
    }
    
    const actualizar_data_categoria = () => {
        if (categoria === ''){
            setECategoria(categoria === '' ? true : false)
        }else{
            setECategoria (false)
            const data_nuevo = {
                url_foto: url_foto,
                categoria: categoria,
                descripcion: descripcion
            }
            dispatch (categoriasdata(categoriasConstants(id_categoria, 0, 0, 0, 0, 16, data_nuevo, false).update_categoria))
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

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Categoría: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}>{categoria}</span>
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
                                disabled={!editar_informacion}
                                type='default' 
                                id='categoria'
                                className='form-control rounded'
                                value={categoria}
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
                                disabled={!editar_informacion} 
                                id='descripcion'
                                type='default'
                                rows={3}
                                className='form-control rounded'
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                                style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edescripcion ? '1px solid red' : '1px solid #007BFF',
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
                                    disabled={!editar_informacion}
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eurl_foto ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                    onChange={handleFileChange}/>
                                <div className={boton_subif_foto ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={editar_informacion ? handleUpload : null}
                                        onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                                </div>
                            </div>
                        </div>
                        {
                            editar_informacion ? (
                                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                    <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                        onClick={() => actualizar_data_categoria()}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                            Actualizar datos
                                        </p>
                                    </div>
                                    <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                        onClick={() => setEditarInformacion(false)}>
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
                                        onClick={() => setEditarInformacion(true)}>
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
            </div>
        </div>
    )
}
