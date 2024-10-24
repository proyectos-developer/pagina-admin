import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {categoriasdata} from '../../../redux/slice/categoriasdata'
import { set_data_categoria } from '../../../redux/actions/data'
import { categoriasConstants } from '../../../uri/categorias-constants'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'
import { constantes } from '../../../uri/constantes'

export default function DetallesCategoriaCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [file_imagen, setFileImagen] = useState (null)

    const id_categoria = location.pathname.split ('/')[6]
    const [url_foto, setUrlFoto] = useState('')
    const [categoria, setCategoria] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [ecategoria, setECategoria] = useState (false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_categoria, get_categoria} = useSelector(({categorias_data}) => categorias_data)
    const {file_upload} = useSelector(({files_data}) => files_data)
    const {data_categoria, data_editable} = useSelector(({data_actions}) => data_actions)
    
    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_categoria.categoria === undefined){
            dispatch(categoriasdata(categoriasConstants(id_categoria, 0, 0, 0, 0, 16, {}, false).get_categoria))
        }else{
            setCategoria(data_categoria.categoria)
            setDescripcion(data_categoria.descripcion)
        }
    }, [])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlFoto(`${constantes().url_archivo[0].url}/categorias/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_categoria && get_categoria.success === true && get_categoria.categoria){
            setCategoria(get_categoria.categoria.categoria)
            setDescripcion(get_categoria.categoria.descripcion)
            setEditarInformacion(false)
            dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, {}, true).get_categoria))
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
        navigate ('/panel/almacen/categorias')
    }

    const cancelar_edicion_datos = () => {
        dispatch (categoriasdata(categoriasConstants(id_categoria, 0, 0, 0, 0, 0, {}, false).get_categoria))
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

    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                            onClick={() => navigate ('/panel')}>
                        Inicio 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/almacen')}>
                        almacén
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/almacen/categorias')}>
                        categorías
                    </p>
                </div>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    / categoria
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    / {categoria}
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
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
                        <textarea
                            disabled={!editar_informacion} 
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
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <input 
                                disabled={!editar_informacion}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                                onChange={handleFileChange}/>
                            <div className={boton_subif_foto ? 'shadow-lg rounded' : 'rounded'} 
                                style={{width: '100%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                    lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                    fontWeight: 500, cursor: 'pointer'}} onClick={editar_informacion ? handleUpload : null}
                                    onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                            </div>
                        </div>
                    </div>
                    {
                        editar_informacion ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                    onClick={() => cancelar_edicion_datos()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                    onClick={() => actualizar_data_categoria()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                    onClick={() => volver_a_lista()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Volver
                                    </p>
                                </div>
                                <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                    onClick={() => setEditarInformacion(true)}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Editar datos
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
