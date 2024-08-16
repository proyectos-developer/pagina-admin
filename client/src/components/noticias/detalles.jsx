import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {noticiasdata} from '../../redux/slice/noticiasdata'
import { set_data_noticia } from '../../redux/actions/data'
import { noticiasConstants } from '../../uri/noticias-constants'

export default function DetallesNoticias ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectCategoriaNoticia = useRef(null)

    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_noticia, setIdNoticia] = useState(0)
    const [id_categoria_noticia, setIdCategoriaNoticia] = useState('')
    const [categoria_noticia, setCategoriaNoticia] = useState ('')
    const [url_foto, setUrlFoto] = useState('')
    const [fecha_noticia, setFechaNoticia] = useState ('')
    const [titulo_noticia, setTituloNoticia] = useState('')
    const [noticia, setNoticia] = useState('')
    const [habilitar_comentarios, setHabilitarComentarios] = useState(true)

    const [ecategoria_noticia, setECategoriaNoticia] = useState (false)
    const [eurl_foto, setEUrlFoto] = useState(false)
    const [efecha_noticia, setEFechaNoticia] = useState (false)
    const [etitulo_noticia, setETituloNoticia] = useState(false)
    const [enoticia, setENoticia] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_noticia, get_noticia} = useSelector(({noticias_data}) => noticias_data)
    const {data_noticia, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_noticia.titulo === undefined){
            dispatch(noticiasdata(noticiasConstants(location.pathname.split ('/')[3], 0, 0, 16, {}, false).get_noticia))
        }else{
            setIdNoticia(data_noticia.id)
            setIdCategoriaNoticia(data_noticia.id_categoria_noticia)
            setCategoriaNoticia(data_noticia.categoria_noticia)
            setUrlFoto(data_noticia.url_foto)
            setFechaNoticia(data_noticia.fecha)
            setTituloNoticia(data_noticia.titulo)
            setNoticia(data_noticia.noticia)
        }
    }, [])

    useEffect(() => {
        if (get_noticia && get_noticia.success === true && get_noticia.noticia){
            setIdNoticia(get_noticia.noticia.id)
            setIdCategoriaNoticia(get_noticia.noticia.id_categoria_noticia)
            setCategoriaNoticia(get_noticia.noticia.categoria_noticia)
            setUrlFoto(get_noticia.noticia.url_foto)
            setFechaNoticia(get_noticia.noticia.fecha)
            setTituloNoticia(get_noticia.noticia.titulo)
            setNoticia(get_noticia.noticia.noticia)
            dispatch(noticiasdata(noticiasConstants(0, 0, 0, 16, {}, true).get_noticia))
        }
    }, [get_noticia])

    useEffect(() => {
        if (update_noticia && update_noticia.success === true && update_noticia.noticia){
            dispatch(noticiasdata(noticiasConstants(0, 0, 0, 16, {}, true).update_noticia))
            setEditarInformacion(false)
        }
    }, [update_noticia])

    const volver_a_lista = () => {
        dispatch(set_data_noticia({}))
        navigate ('/panel/noticias')
    }
    
    const actualizar_data_noticia = () => {
        const data_nuevo = {
            id_categoria_noticia: id_categoria_noticia,
            categoria_noticia: categoria_noticia,
            url_foto: url_foto,
            fecha: fecha_noticia,
            titulo: titulo_noticia,
            noticia: noticia,
            habilitar_comentarios: true
        }
        dispatch (noticiasdata(noticiasConstants(id_noticia, 0, 0, 0, data_nuevo, false).update_noticia))
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: '100%'}}>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div className='d-flex justify-content-center' 
                            style={{width: '48%', height: 292 / proporcional, paddingTop: 26.5 / proporcional,
                                paddingBottom: 26.5 / proporcional}}>
                        <div className='rounded' style={{width:  292 / proporcional, height: 292 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_foto !== '' ? (
                                    <img className='rounded' src={url_foto} 
                                        style={{width: 292 / proporcional, height: 292 / proporcional}}/>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className='' style={{width: '48%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Categoría noticia
                            </span>
                            <select
                                disabled={!editar_informacion} 
                                ref={selectCategoriaNoticia}
                                id='categoria_noticia'
                                className='form-select rounded'
                                onChange={(event) => seleccionar_categoria_noticia (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: ecategoria_noticia ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Seleccionar categoría noticia</option>     
                            </select>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Fecha publicación
                            </span>
                            <input
                                disabled={!editar_informacion} 
                                id='fecha_noticia'
                                type='date'
                                className='form-control rounded'
                                value={fecha_noticia}
                                onChange={(event) => setFechaNoticia(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: efecha_noticia ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Fecha'/>
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Título de la noticia
                            </span>
                            <textarea
                                disabled={!editar_informacion} 
                                id='titulo_noticia'
                                type='default'
                                rows={3}
                                className='form-control rounded'
                                value={titulo_noticia}
                                onChange={(event) => setTituloNoticia(event.target.value)}
                                style={{width: '100%', height: 115 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: etitulo_noticia ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Título'/>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Noticia
                    </span>
                    <textarea
                        disabled={!editar_informacion} 
                        id='noticia'
                        type='default'
                        rows={10}
                        className='form-control rounded'
                        value={noticia}
                        onChange={(event) => setNoticia(event.target.value)}
                        style={{width: '100%', height: 500 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: enoticia ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Noticia'/>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Url foto noticia
                    </span>
                    <input
                        disabled={!editar_informacion} 
                        id='url_foto'
                        type='url'
                        className='form-control rounded'
                        value={url_foto}
                        onChange={(event) => setUrlFoto(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: eurl_foto ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Url foto'/>
                </div>
                {
                    editar_informacion ? (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_data_noticia()}>
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
