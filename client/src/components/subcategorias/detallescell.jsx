import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata'
import { set_data_subcategoria } from '../../redux/actions/data'
import { subcategoriasConstants } from '../../uri/subcategorias-constants'
import {categoriasdata} from '../../redux/slice/categoriasdata'
import { categoriasConstants } from '../../uri/categorias-constants'

export default function DetallesSubCategoriaCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectCategoria = useRef(null)

    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_subcategoria, setIdSubCategoria] = useState ('')
    const [id_categoria, setIdCategoria] = useState ('')
    const [categoria, setCategoria] = useState ('')
    const [subcategoria, setSubCategoria] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [ecategoria, setECategoria] = useState (false)
    const [esubcategoria, setESubCategoria] = useState (false)

    const [lista_categorias, setListaCategorias] = useState([])

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_subcategoria, get_subcategoria} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {get_categorias_filter} = useSelector(({categorias_data}) => categorias_data)
    const {data_subcategoria, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (get_categorias_filter && get_categorias_filter.success === true && get_categorias_filter.categorias){
            setEditarInformacion(true)
            setListaCategorias(get_categorias_filter.categorias)
        }
    }, [get_categorias_filter])

    useEffect(() => {
        if (data_subcategoria.categoria === undefined){
            dispatch(subcategoriasdata(subcategoriasConstants(location.pathname.split ('/')[5], 0, 0, 0, 0, 0, 16, {}, false).get_subcategoria))
        }else{
            setIdSubCategoria(data_subcategoria.id)
            setIdCategoria(data_subcategoria.id_categoria)
            setCategoria(data_subcategoria.categoria)
            setSubCategoria(data_subcategoria.sub_categoria)
            setDescripcion(data_subcategoria.descripcion)
        }
    }, [])

    useEffect(() => {
        if (get_subcategoria && get_subcategoria.success === true && get_subcategoria.sub_categoria){
            setIdSubCategoria(get_subcategoria.sub_categoria.id)
            setIdCategoria(get_subcategoria.sub_categoria.id_categoria)
            setCategoria(get_subcategoria.sub_categoria.categoria)
            setSubCategoria(get_subcategoria.sub_categoria.sub_categoria)
            setDescripcion(get_subcategoria.sub_categoria.descripcion)
            dispatch(subcategoriasdata(subcategoriasConstants(0, {}, true).get_subcategoria))
        }
    }, [get_subcategoria])

    useEffect(() => {
        if (update_subcategoria && update_subcategoria.success === true && update_subcategoria.sub_categoria){
            dispatch(subcategoriasdata(subcategoriasConstants(0, {}, true).update_subcategoria))
            setEditarInformacion(false)
        }
    }, [update_subcategoria])

    const volver_a_lista = () => {
        dispatch(set_data_subcategoria({}))
        navigate ('/panel/subcategorias')
    }

    const editar_informacion_subcategoria = () => {
        dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 100, {}, false).get_categorias_filter))
    }
    
    const actualizar_data_subcategoria = () => {
        if (subcategoria === '' || categoria === ''){
            setESubCategoria(subcategoria === '' ? true : false)
            setECategoria(categoria === '' ? true : false)
        }else{
            setESubCategoria(false)
            setECategoria(false)
            const data_nuevo = {
                id_categoria: id_categoria,
                categoria: categoria,
                sub_categoria: subcategoria,
                descripcion: descripcion,
            }
            dispatch (subcategoriasdata(subcategoriasConstants(id_subcategoria, 0, 0, 0, 0, 0, 16, data_nuevo, false).update_subcategoria))
        }
    }

    useEffect (() => {
        return () => {
            setListaCategorias([])
            dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 0, {}, true).get_categoria))
            dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 0, {}, true).update_subcategoria))
        }
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Sub categoría: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}>{subcategoria}</span>
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '100%', height: '100%'}}>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Sub categoría
                            </span>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                id='subcategoria'
                                value={subcategoria}
                                className='form-control rounded'
                                onChange={(event) => setSubCategoria (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: esubcategoria ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre sub categoría'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Categoría
                            </span>
                            <select
                                disabled={!editar_informacion}
                                ref={selectCategoria}
                                id='categoria'
                                value={categoria}
                                className='form-select rounded'
                                onChange={(event) => seleccionar_categoria (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: ecategoria ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>{categoria === '' ? 'Seleccionar categoría' : categoria}</option>
                                {
                                    lista_categorias && lista_categorias.length > 0 ? (
                                        lista_categorias.map ((categoria, index) => {
                                            return (
                                                <option key={index} value={categoria.id + '-' + categoria.categoria}>{categoria.categoria}</option>
                                            )
                                        })
                                    ) : null
                                }
                            </select>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Descripción de la subcategoría
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
                                placeholder='Descripción de la sub categoría'/>
                        </div>
                        {
                            editar_informacion ? (
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                                marginBottom: 16 / proporcional}}
                                        onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                        onClick={() => actualizar_data_subcategoria()}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                            Actualizar datos
                                        </p>
                                    </div>
                                    <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                        onClick={() => setEditarInformacion(false)}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                            Cancelar
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                                marginBottom: 16 / proporcional}}
                                        onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                        onClick={() => editar_informacion_subcategoria()}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                            Editar datos
                                        </p>
                                    </div>
                                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
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
