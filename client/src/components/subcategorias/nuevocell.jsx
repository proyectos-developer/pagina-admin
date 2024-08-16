import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata'
import {subcategoriasConstants} from '../../uri/subcategorias-constants'
import {categoriasdata} from '../../redux/slice/categoriasdata'
import { categoriasConstants } from '../../uri/categorias-constants'

export default function NuevaSubCategoriaCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const selectCategoria = useRef(null)

    const [id_categoria, setIdCategoria] = useState ('')
    const [categoria, setCategoria] = useState ('')
    const [subcategoria, setSubCategoria] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [ecategoria, setECategoria] = useState ('')
    const [esubcategoria, setESubCategoria] = useState (false)
    const [edescripcion, setEDescripcion] = useState(false)

    const [lista_categorias, setListaCategorias] = useState([])

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_subcategoria} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {get_categorias} = useSelector(({categorias_data}) => categorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch (categoriasdata(categoriasConstants(0, {}, false).get_categoria))
    }, [])

    useEffect(() => {
        if (get_categorias && get_categorias.success === true && get_categorias.categorias){
            setListaCategorias(get_categorias.categorias)
        }
    }, [get_categorias])

    useEffect(() => {
        if (new_subcategoria && new_subcategoria.success === true && new_subcategoria.subcategoria){
            dispatch(subcategoriasdata(subcategoriasConstants(0, {}, true).new_subcategoria))
            resetear_data()
        }
    }, [new_subcategoria])

    const seleccionar_categoria = (value) => {
        if (value !== '0'){
            setIdCategoria(value.split ('-')[0])
            setCategoria(value.split ('-')[1])
        }else{

        }
    }

    const resetear_data = () => {
        setIdCategoria('')
        setSubCategoria('')
        setCategoria('')
        setDescripcion('')
    }

    const volver_a_lista = () => {
        resetear_data()
        window.scrollTo(0, 0)
        navigate ('/panel/subcategorias')
    }

    const guardar_categoria = () => {
        if (subcategoria === '' || descripcion === ''){
          setESubCategoria(subcategoria === '' ? true : false)
          setEDescripcion(descripcion === '' ? true : false)
          setECategoria(categoria === '' ? true : false)
        }else{
            setESubCategoria(false)
            setEDescripcion(false)
            setECategoria(false)
            const data_nuevo = {
                id_categoria: id_categoria,
                categoria: categoria,
                subcategoria: subcategoria,
                descripcion: descripcion
            }
            dispatch (subcategoriasdata(subcategoriasConstants(0, data_nuevo, false).new_subcategoria))
        }
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: '100%'}}>
                <div className='d-flex justify-content-center' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='' style={{width: '48%', height: 'auto'}}>
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
                            <select
                                ref={selectCategoria}
                                id='categoria'
                                value={categoria}
                                className='form-select rounded'
                                onChange={(event) => seleccionar_categoria (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: ecategoria ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Seleccionar categoría</option>
                                {
                                    lista_categorias && lista_categorias.length > 0 ? (
                                        lista_categorias.map ((categoria, index) => {
                                            return (
                                                <option value={categoria.id + '-' + categoria.categoria}>{categoria.categoria}</option>
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
                                id='descripcion'
                                type='default'
                                rows={3}
                                className='form-control rounded'
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                                style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edescripcion ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Descripción de la sub categoría'/>
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
