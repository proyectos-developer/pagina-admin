import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata'
import {subcategoriasConstants} from '../../uri/subcategorias-constants'
import {categoriasdata} from '../../redux/slice/categoriasdata'
import { categoriasConstants } from '../../uri/categorias-constants'

import save from '../../assets/iconos/comun/save_v2.png'
import save_select from '../../assets/iconos/comun/save_v1.png'
import cross from '../../assets/iconos/comun/cross_v2.png'
import cross_select from '../../assets/iconos/comun/cross_v1.png'

export default function NuevaSubCategoria ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const selectCategoria = useRef(null)

    const [id_categoria, setIdCategoria] = useState ('')
    const [categoria, setCategoria] = useState ('')
    const [subcategoria, setSubCategoria] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [ecategoria, setECategoria] = useState (false)
    const [esubcategoria, setESubCategoria] = useState (false)

    const [lista_categorias, setListaCategorias] = useState([])

    const [nueva_categoria, setNuevaCategoria] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_save, setBotonSave] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_subcategoria} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {new_categoria} = useSelector(({categorias_data}) => categorias_data)
    const {get_categorias_filter} = useSelector(({categorias_data}) => categorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 100, {}, false).get_categorias_filter))
    }, [])

    useEffect(() => {
        if (get_categorias_filter && get_categorias_filter.success === true && get_categorias_filter.categorias){
            setListaCategorias(get_categorias_filter.categorias)
        }
    }, [get_categorias_filter])

    useEffect(() => {
        if (new_subcategoria && new_subcategoria.success === true && new_subcategoria.sub_categoria){
            dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 16, {}, true).new_subcategoria))
            resetear_data()
        }
    }, [new_subcategoria])

    const seleccionar_categoria = (value) => {
        if (value !== '0' && value !== '1'){
            setIdCategoria(value.split ('-')[0])
            setCategoria(value.split ('-')[1])
        }else if (value === '1'){
            setNuevaCategoria(true)
        }
    }

    useEffect(() => {
        if (new_categoria && new_categoria.success === true && new_categoria.categoria){
            setIdCategoria(new_categoria.categoria.id)
            setCategoria(new_categoria.categoria.categoria)
            setNuevaCategoria(false)
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 100, {}, false).new_categoria))
        }
    }, [new_categoria])

    const guardar_nueva_categoria = () => {
        const data_categoria = {
            url_foto: '',
            categoria: categoria,
            descripcion: ''
        }
        dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, data_categoria, false).new_categoria))
    }

    const resetear_data = () => {
        setIdCategoria('')
        setSubCategoria('')
        setCategoria('')
        setDescripcion('')
        if (selectCategoria.current){
            selectCategoria.current.value = '0'
        }
    }

    const volver_a_lista = () => {
        resetear_data()
        window.scrollTo(0, 0)
        navigate ('/panel/subcategorias')
    }

    const guardar_sub_categoria = () => {
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
                descripcion: descripcion
            }
            dispatch (subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_subcategoria))
        }
    }

    useEffect(() => {
        return (() => {
            setListaCategorias([])
            dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 0, {}, true).get_categorias_filter))
            dispatch(subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 0, {}, true).new_subcategoria))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Nueva sub categoría
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '80%', height: '100%'}}>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Sub categoría
                            </span>
                            <input
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
                            {
                                nueva_categoria ? (
                                    <div className='d-flex' style={{width: '100%', height: 50 / proporcional, border: ecategoria ? '1px solid red' : '1px solid #007BFF'}}>
                                        <input 
                                            type='default'
                                            id='categoria'
                                            className='form-control'
                                            value={categoria}
                                            onChange={(event) => setCategoria(event.target.value)}
                                            style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                            placeholder='Nueva categoría'/>
                                        <img src={boton_cancelar ? cross_select : cross} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                padding: 12 / proporcional}} 
                                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                            onClick={() => {setNuevaCategoria(false); setCategoria('')}}/>
                                        <img src={boton_save ? save_select : save} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                padding: 12 / proporcional}} 
                                            onMouseOver={() => setBotonSave(true)} onMouseLeave={() => setBotonSave(false)}
                                            onClick={() => guardar_nueva_categoria()}/>
                                    </div>
                                ) : (
                                    <select
                                        id='categoria'
                                        ref={selectCategoria}
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_categoria (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: ecategoria ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{categoria === '' ? 'Seleccionar categoría' : categoria}</option>
                                        <option value='1'>Crear nueva categoría</option>
                                        {
                                            lista_categorias && lista_categorias.length > 0 ? (
                                                lista_categorias.map ((categoria, index) => {
                                                    return (
                                                        <option key={index} value={categoria.categoria + '-' + categoria.id}>{categoria.categoria}</option>
                                                    )
                                                })
                                            ) : null
                                        }
                                    </select>
                                )
                            }
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Descripción de la subcategoría
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
                                placeholder='Descripción de la sub categoría'/>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                                onClick={() => guardar_sub_categoria()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Guardar datos
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
                    </div>
                </div>
            </div>
        </div>
    )
}
