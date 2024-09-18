import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_categoria_noticia } from '../../../redux/actions/data'
import {categorias_noticiasdata} from '../../../redux/slice/categorias_noticiasdata'
import {categoriasnoticiasConstants} from '../../../uri/categorias_noticias-constants'

export default function DetallesCategoriaNoticia ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_categoria_noticia, setIdCategoriaNoticia] = useState('')
    const [categoria_noticia, setCategoriaNoticia] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [ecategoria_noticia, setECategoriaNoticia] = useState (false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_categoria_noticia, get_categoria_noticia} = useSelector(({categorias_noticias_data}) => categorias_noticias_data)
    const {data_categoria_noticia, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_categoria_noticia.categoria_noticia === undefined){
            dispatch(categorias_noticiasdata(categoriasnoticiasConstants(location.pathname.split ('/')[6], 0, 0, 0, 0, 16, {}, false).get_categoria_noticia))
        }else{
            setIdCategoriaNoticia(data_categoria_noticia.id)
            setCategoriaNoticia(data_categoria_noticia.categoria_noticia)
            setDescripcion(data_categoria_noticia.descripcion)
        }
    }, [data_categoria_noticia])

    useEffect(() => {
        if (get_categoria_noticia && get_categoria_noticia.success === true && get_categoria_noticia.categoria_noticia){
            setIdCategoriaNoticia(get_categoria_noticia.categoria_noticia.id)
            setCategoriaNoticia(get_categoria_noticia.categoria_noticia.categoria_noticia)
            setDescripcion(get_categoria_noticia.categoria_noticia.descripcion)
            dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 16, {}, true).get_categoria_noticia))
        }
    }, [get_categoria_noticia])

    useEffect(() => {
        if (update_categoria_noticia && update_categoria_noticia.success === true && update_categoria_noticia.categoria_noticia){
            dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 16, {}, true).update_categoria_noticia))
            setEditarInformacion(false)
        }
    }, [update_categoria_noticia])

    const volver_a_lista = () => {
        dispatch(set_data_categoria_noticia({}))
        navigate ('/panel/otros/categorias-noticias')
    }
    
    const actualizar_data_categoria_noticia = () => {
        if (categoria_noticia === ''){
            setECategoriaNoticia(categoria_noticia === '' ? true : false)
        }else{
            setECategoriaNoticia (false)
            const data_nuevo = {
                categoria_noticia: categoria_noticia,
                descripcion: descripcion
            }
            dispatch (categorias_noticiasdata(categoriasnoticiasConstants(id_categoria_noticia, 0, 0, 0, 0, 16, data_nuevo, false).update_categoria_noticia))
        }
    }
    
    useEffect(() => {
        return (() => {
            dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 0, {}, true).update_categoria_noticia))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 80 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 80 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '60%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Categoría: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}>{categoria_noticia}</span>
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '60%', height: '100%'}}>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Categoría noticia
                            </span>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                id='categoria_noticia'
                                className='form-control rounded'
                                value={categoria_noticia}
                                onChange={(event) => setCategoriaNoticia (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: ecategoria_noticia ? '1px solid red' : '1px solid #007BFF',
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
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Descripción de la categoría'/>
                        </div>
                        {
                            editar_informacion ? (
                                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                    <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                        onClick={() => actualizar_data_categoria_noticia()}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sansNoticia-serif', textAlign: 'center', fontWeight: 600}}>
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
