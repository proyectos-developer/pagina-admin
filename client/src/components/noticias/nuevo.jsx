import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {noticiasdata} from '../../redux/slice/noticiasdata'
import {noticiasConstants} from '../../uri/noticias-constants'
import {categorias_noticiasdata} from '../../redux/slice/categorias_noticiasdata'
import { categoriasnoticiasConstants } from '../../uri/categorias_noticias-constants'
import {filesdata} from '../../redux/slice/filesdata'
import {filesConstants} from '../../uri/files-constants'

import save from '../../assets/iconos/comun/save_v2.png'
import save_select from '../../assets/iconos/comun/save_v1.png'
import cross from '../../assets/iconos/comun/cross_v2.png'
import cross_select from '../../assets/iconos/comun/cross_v1.png'

export default function NuevaNoticia ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const selectCategoriaNoticia = useRef(null)

    const [file_imagen, setFileImagen] = useState (null)

    const [url_foto, setUrlFoto] = useState('')
    const [id_categoria_noticia, setIdCategoriaNoticia] = useState('')
    const [categoria_noticia, setCategoriaNoticia] = useState('')
    const [titulo, setTitulo] = useState ('')
    const [fecha, setFecha] = useState('')
    const [noticia_parrafo_1, setNoticiaParrafo1] = useState('')
    const [noticia_parrafo_2, setNoticiaParrafo2] = useState('')
    const [noticia_parrafo_3, setNoticiaParrafo3] = useState('')
    const [noticia_parrafo_4, setNoticiaParrafo4] = useState('')
    const [noticia_parrafo_5, setNoticiaParrafo5] = useState('')
    const [noticia_parrafo_6, setNoticiaParrafo6] = useState('')
    const [noticia_parrafo_7, setNoticiaParrafo7] = useState('')
    const [noticia_parrafo_8, setNoticiaParrafo8] = useState('')
    const [noticia_parrafo_9, setNoticiaParrafo9] = useState('')
    const [noticia_parrafo_10, setNoticiaParrafo10] = useState('')
    const [habilitar_comentario, setHabilitarComentarios] = useState(false)

    const [show_noticia_parrafo_2, setShowNoticiaParrafo2] = useState(false)
    const [show_noticia_parrafo_3, setShowNoticiaParrafo3] = useState(false)
    const [show_noticia_parrafo_4, setShowNoticiaParrafo4] = useState(false)
    const [show_noticia_parrafo_5, setShowNoticiaParrafo5] = useState(false)

    const [nueva_categoria_noticia, setNuevaCategoriaNoticia] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_save, setBotonSave] = useState(false)

    const [eurl_foto, setEUrlFoto] = useState(false)
    const [ecategoria_noticia, setECategoriaNoticia] = useState(false)
    const [etitulo, setETitulo] = useState (false)
    const [efecha, setEFecha] = useState(false)
    const [enoticia_parrafo_1, setENoticiaParrafo1] = useState(false)

    const [lista_categorias_noticias, setListaCategoriasNoticias] = useState([])

    const [boton_subir_foto, setBotonSubirFoto] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {get_categorias_noticias_filter, new_categoria_noticia} = useSelector(({categorias_noticias_data}) => categorias_noticias_data)
    const {new_noticia} = useSelector(({noticias_data}) => noticias_data)
    const {file_upload} = useSelector(({files_data}) => files_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 100, {}, false).get_categorias_noticias_filter))
    }, [])

    useEffect(() => {
        console.log ('get', get_categorias_noticias_filter)
        if (get_categorias_noticias_filter && get_categorias_noticias_filter.success === true &&
                get_categorias_noticias_filter.categorias_noticias){
            setListaCategoriasNoticias(get_categorias_noticias_filter.categorias_noticias)
        }
    }, [get_categorias_noticias_filter])

    useEffect(() => {
        if (new_noticia && new_noticia.success === true && new_noticia.noticia){
            dispatch(noticiasdata(noticiasConstants(0, 0, 0, 0, 0, 0, 16, {}, true).new_noticia))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_noticia])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlFoto(`https://api.developer-ideas.com/noticias/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    const seleccionar_categoria_noticia = (value) => {
        if (value !== '0' && value !== '1'){
            setIdCategoriaNoticia(value.split ('-')[0])
            setCategoriaNoticia(value.split ('-')[1])
        }else if (value === '1'){
            setNuevaCategoriaNoticia(true)
        }
    }

    useEffect(() => {
        if (new_categoria_noticia && new_categoria_noticia.success === true && new_categoria_noticia.categoria_noticia){
            setIdCategoriaNoticia(new_categoria_noticia.categoria_noticia.id)
            setCategoriaNoticia(new_categoria_noticia.categoria_noticia.categoria_noticia)
            setNuevaCategoriaNoticia(false)
            dispatch (categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 100, {}, false).new_categoria_noticia))
        }
    }, [new_categoria_noticia])

    const guardar_nueva_categoria_noticia = () => {
        const data_categoria_noticia = {
            categoria_noticia: categoria_noticia,
            descripcion: ''
        }
        dispatch (categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 16, data_categoria_noticia, false).new_categoria_noticia))
    }

    const resetear_data = () => {
        setUrlFoto('')
        setTitulo('')
        setFecha('')
        setIdCategoriaNoticia('')
        setCategoriaNoticia('')
        setHabilitarComentarios(false)
        setNoticiaParrafo1('')
        setNoticiaParrafo2('')
        setNoticiaParrafo3('')
        setNoticiaParrafo4('')
        setNoticiaParrafo5('')
        setNoticiaParrafo6('')
        setNoticiaParrafo7('')
        setNoticiaParrafo8('')
        setNoticiaParrafo9('')
        setNoticiaParrafo10('')
    }

    const volver_a_lista = () => {
        resetear_data()
        window.scrollTo(0, 0)
        navigate ('/panel/noticias')
    }

    const guardar_noticia = () => {
        if (url_foto === '' || titulo === '' || fecha === '' ||  noticia_parrafo_1 === '' || categoria_noticia === ''){
            setEFecha(fecha === '' ? true : false)
            setETitulo(titulo === '' ? true : false)
            setEUrlFoto(url_foto === '' ? true : false)
            setECategoriaNoticia(categoria_noticia === '' ? true : false)
            setENoticiaParrafo1(noticia_parrafo_1 === '' ? true : false)
        }else{
            setEFecha(false)
            setETitulo(false)
            setUrlFoto(false)
            setECategoriaNoticia(false)
            setENoticiaParrafo1(false)
            const data_nuevo = {
                fecha: fecha,
                url_foto: url_foto,
                titulo: titulo,
                usuario: 'admin',
                id_categoria_noticia: id_categoria_noticia,
                categoria_noticia: categoria_noticia,
                habilitar_comentarios: habilitar_comentario,
                noticia_parrafo_1: noticia_parrafo_1,
                noticia_parrafo_2: noticia_parrafo_2,
                noticia_parrafo_3: noticia_parrafo_3,
                noticia_parrafo_4: noticia_parrafo_4,
                noticia_parrafo_5: noticia_parrafo_5,
                noticia_parrafo_6: noticia_parrafo_6,
                noticia_parrafo_7: noticia_parrafo_7,
                noticia_parrafo_8: noticia_parrafo_8,
                noticia_parrafo_9: noticia_parrafo_9,
                noticia_parrafo_10: noticia_parrafo_10
            }
            dispatch (noticiasdata(noticiasConstants(0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_noticia))
        }
    }
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('noticias', data, false).file_upload))
    }
    
    useEffect(() => {
        return (() => {
            setListaCategoriasNoticias([])
            dispatch(filesdata(filesConstants('', {}, true).file_upload))
            dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 16, {}, true).get_categoria_noticia))
            dispatch(noticiasdata(noticiasConstants(0, 0, 0, 0, 0, 16, {}, true).new_noticia))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Nueva noticia
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '80%', height: '100%'}}>
                    <div className='d-flex justify-content-center' 
                            style={{width: '100%', height: 'auto', paddingTop: 26.5 / proporcional,
                                paddingBottom: 26.5 / proporcional, marginBottom: 16 / proporcional}}>
                        <div className='rounded-circle' style={{width:  400 / proporcional, height: 400 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_foto !== '' ? (
                                    <img className='rounded-circle' src={url_foto} 
                                    style={{width: 398 / proporcional, height: 398 / proporcional}}/>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Fecha
                                </span>
                                <input
                                    type='date' 
                                    id='fecha'
                                    value={fecha}
                                    className='form-control rounded'
                                    onChange={(event) => setFecha (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: efecha ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Fecha'/>
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Categoría noticia
                                </span>
                                {
                                    nueva_categoria_noticia ? (
                                        <div className='d-flex' style={{width: '100%', height: 50 / proporcional, border: ecategoria_noticia ? '1px solid red' : '1px solid #007BFF'}}>
                                            <input 
                                                type='default'
                                                id='categoria_noticia'
                                                className='form-control'
                                                value={categoria_noticia}
                                                onChange={(event) => setCategoriaNoticia(event.target.value)}
                                                style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                                placeholder='Nueva categoría'/>
                                            <img src={boton_cancelar ? cross_select : cross} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                                onClick={() => {setNuevaCategoriaNoticia(false); setCategoriaNoticia('')}}/>
                                            <img src={boton_save ? save_select : save} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonSave(true)} onMouseLeave={() => setBotonSave(false)}
                                                onClick={() => guardar_nueva_categoria_noticia()}/>
                                        </div>
                                    ) : (
                                        <select
                                            id='categoria_noticia'
                                            ref={selectCategoriaNoticia}
                                            className='form-select rounded'
                                            onChange={(event) => seleccionar_categoria_noticia (event.target.value)}
                                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: ecategoria_noticia ? '1px solid red' : '1px solid #007BFF',
                                                    padding: 10 / proporcional}}>
                                            <option value='0'>{categoria_noticia === '' ? 'Seleccionar categoría' : categoria_noticia}</option>
                                            <option value='1'>Crear nueva categoría</option>
                                            {
                                                lista_categorias_noticias && lista_categorias_noticias.length > 0 ? (
                                                    lista_categorias_noticias.map ((categoria_noticia, index) => {
                                                        return (
                                                            <option key={index} value={categoria_noticia.categoria_noticia + '-' + categoria_noticia.id}>{categoria_noticia.categoria_noticia}</option>
                                                        )
                                                    })
                                                ) : null
                                            }
                                        </select>
                                    )
                                }
                            </div>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Título noticia
                            </span>
                            <input 
                                id='titulo'
                                type='default'
                                className='form-control rounded'
                                value={titulo}
                                onChange={(event) => setTitulo(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: etitulo ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Título noticia'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Noticia parrafo 1
                            </span>
                            <textarea
                                rows={5} 
                                id='noticia_parrafo_1'
                                type='default'
                                className='form-control rounded'
                                value={noticia_parrafo_1}
                                onBlur={() => noticia_parrafo_1 !== '' ? setShowNoticiaParrafo2(true) : null}
                                onChange={(event) => setNoticiaParrafo1(event.target.value)}
                                style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enoticia_parrafo_1 ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Noticia parrafo 1'/>
                        </div>
                        {
                            show_noticia_parrafo_2 ? (
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Noticia parrafo 2
                                    </span>
                                    <textarea
                                        rows={5} 
                                        id='noticia_parrafo_2'
                                        type='default'
                                        className='form-control rounded'
                                        value={noticia_parrafo_2}
                                        onBlur={() => noticia_parrafo_2 !== '' ? setShowNoticiaParrafo3(true) : null}
                                        onChange={(event) => setNoticiaParrafo2(event.target.value)}
                                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: enoticia_parrafo_1 ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Noticia parrafo 2'/>
                                </div>
                            ) : null
                        }
                        {
                            show_noticia_parrafo_3 ? (
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Noticia parrafo 3
                                    </span>
                                    <textarea
                                        rows={5} 
                                        id='noticia_parrafo_3'
                                        type='default'
                                        className='form-control rounded'
                                        value={noticia_parrafo_3}
                                        onBlur={() => noticia_parrafo_3 !== '' ? setShowNoticiaParrafo4(true) : null}
                                        onChange={(event) => setNoticiaParrafo3(event.target.value)}
                                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: enoticia_parrafo_1 ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Noticia parrafo 3'/>
                                </div>
                            ) : null
                        }
                        {
                            show_noticia_parrafo_4 ? (
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Noticia parrafo 4
                                    </span>
                                    <textarea
                                        rows={5} 
                                        id='noticia_parrafo_4'
                                        type='default'
                                        className='form-control rounded'
                                        value={noticia_parrafo_4}
                                        onBlur={() => noticia_parrafo_4 !== '' ? setShowNoticiaParrafo5(true) : null}
                                        onChange={(event) => setNoticiaParrafo4(event.target.value)}
                                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: enoticia_parrafo_1 ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Noticia parrafo 4'/>
                                </div>
                            ) : null
                        }
                        {
                            show_noticia_parrafo_5 ? (
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Noticia parrafo 5
                                    </span>
                                    <textarea
                                        rows={5} 
                                        id='noticia_parrafo_5'
                                        type='default'
                                        className='form-control rounded'
                                        value={noticia_parrafo_5}
                                        onChange={(event) => setNoticiaParrafo5(event.target.value)}
                                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, s20ns-serif', border: enoticia_parrafo_1 ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Noticia parrafo 5'/>
                                </div>
                            ) : null
                        }
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
                                        fontFamily: 'Poppins, sans-serif', border: eurl_foto ? '1px solid red' : '1px solid #007BFF',
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
                                onClick={() => guardar_noticia()}>
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
