import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata'
import { set_data_subcategoria } from '../../redux/actions/data'
import { subcategoriasConstants } from '../../uri/subcategorias-constants'

export default function DetallesSubCategoriaTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_subcategoria, setIdSubCategoria] = useState ('')
    const [id_categoria, setIdCategoria] = useState ('')
    const [categoria, setCategoria] = useState ('')
    const [subcategoria, setSubCategoria] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [ecategoria, setECategoria] = useState (false)
    const [esubcategoria, setESubCategoria] = useState (false)
    const [edescripcion, setEDescripcion] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_subcategoria, get_subcategoria} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {data_subcategoria, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_subcategoria.subcategoria === undefined){
            dispatch(subcategoriasdata(subcategoriasConstants(location.pathname.split ('/')[3], {}, false).get_subcategoria))
        }else{
            setIdSubCategoria(data_subcategoria.id)
            setIdCategoria(data_subcategoria.id_categoria)
            setCategoria(data_subcategoria.categoria)
            setSubCategoria(data_subcategoria.subcategoria)
            setDescripcion(data_subcategoria.descripcion)
        }
    }, [])

    useEffect(() => {
        if (get_subcategoria && get_subcategoria.success === true && get_subcategoria.subcategoria){
            setIdSubCategoria(get_subcategoria.subcategoria.id)
            setIdCategoria(get_subcategoria.subcategoria.id_categoria)
            setCategoria(get_subcategoria.subcategoria.categoria)
            setSubCategoria(get_subcategoria.subcategoria.subcategoria)
            setDescripcion(get_subcategoria.subcategoria.descripcion)
            dispatch(subcategoriasdata(subcategoriasConstants(0, {}, true).get_subcategoria))
        }
    }, [get_subcategoria])

    useEffect(() => {
        if (update_subcategoria && update_subcategoria.success === true && update_subcategoria.subcategoria){
            dispatch(subcategoriasdata(subcategoriasConstants(0, {}, true).update_subcategoria))
            setEditarInformacion(false)
        }
    }, [update_subcategoria])

    const volver_a_lista = () => {
        dispatch(set_data_subcategoria({}))
        navigate ('/panel/subcategorias')
    }
    
    const actualizar_data_subcategoria = () => {
        const data_nuevo = {
            id_categoria: id_categoria,
            categoria: categoria,
            subcategoria: subcategoria,
            descripcion: descripcion,
        }
        dispatch (subcategoriasdata(subcategoriasConstants(id_categoria, data_nuevo, false).update_subcategoria))
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
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
                        {
                            editar_informacion ? (
                                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                    <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                        onClick={() => actualizar_data_subcategoria()}>
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
            </div>
        </div>
    )
}
