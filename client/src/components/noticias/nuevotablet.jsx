import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {noticiasdata} from '../../redux/slice/noticiasdata'
import {noticiasConstants} from '../../uri/noticias-constants'

export default function NuevaNoticiaTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const selectCategoriaNoticia = useRef(null)

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

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_noticia} = useSelector(({noticias_data}) => noticias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (new_noticia && new_noticia.success === true && new_noticia.noticia){
            dispatch(noticiasdata(noticiasConstants(0, 0, 0, 16, {}, true).new_noticia))
            resetear_data()
        }
    }, [new_noticia])

    const seleccionar_categoria_noticia = (value) => {
      if (value !== '0'){
        setIdCategoriaNoticia(value.split('-')[0])
        setCategoriaNoticia(value.split('-')[1])
      }else{  

      }
    }

    const resetear_data = () => {
        setIdCategoriaNoticia('')
        setCategoriaNoticia('')
        setUrlFoto('')
        setFechaNoticia('')
        setTituloNoticia('')
        setNoticia('')
        if (selectCategoriaNoticia.current){
            selectCategoriaNoticia.current.value = '0'
        }
    }

    const volver_a_lista = () => {
        resetear_data()
        window.scrollTo(0, 0)
        navigate ('/panel/noticias')
    }

    const guardar_noticia = () => {
        if (url_foto === '' || titulo_noticia === '' || fecha_noticia === '' || noticia === ''){
          setEUrlFoto(url_foto === '' ? true : false)
          setETituloNoticia(titulo_noticia === '' ? true : false)
          setEFechaNoticia(fecha_noticia === '' ? true : false)
          setENoticia(noticia === '' ? true : false)
        }else{
            setEUrlFoto(false)
            setETituloNoticia(false)
            setEFechaNoticia(false)
            setENoticia(false)
            const data_nuevo = {
              id_categoria_noticia: id_categoria_noticia,
              categoria_noticia: categoria_noticia,
              url_foto: url_foto,
              fecha: fecha_noticia,
              titulo: titulo_noticia,
              noticia: noticia,
              habilitar_comentarios: true
            }
            dispatch (noticiasdata(noticiasConstants(0, 0, 0, 16, data_nuevo, false).new_noticia))
        }
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: '100%'}}>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div className='d-flex justify-content-center' 
                            style={{width: '38%', height: 292 / proporcional, paddingTop: 26.5 / proporcional,
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
                    <div className='' style={{width: '58%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Categoría noticia
                            </span>
                            <select 
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
    )
}
