import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../assets/iconos/comun/next_v2.png'
import next_select from '../../assets/iconos/comun/next_v1.png'
import preview from '../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../assets/iconos/comun/view_grid_v2.png'

import CardCategoriaCell from './card/categoriacell.jsx'
import {categoriasdata} from '../../redux/slice/categoriasdata.js'
import { categoriasConstants } from '../../uri/categorias-constants.js'

export default function ListaCategoriasCell ({proporcional}) {

    const dispatch = useDispatch()

    const [view_categoria, setViewCategoria] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_categorias, setListaGridCategorias] = useState ([])
    const [lista_categorias, setListaCategorias] = useState ([])
    const [total_categorias, setTotalCategorias] = useState(0)

    const [mouse_next_up, setMouseNextUp] = useState(false)
    const [mouse_preview_up, setMousePreviewUp] = useState(false)
    const [mouse_next_down, setMouseNextDown] = useState(false)
    const [mouse_preview_down, setMousePreviewDown] = useState(false)

    const {get_categorias_filter, delete_categoria} = useSelector(({categorias_data}) => categorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(categoriasdata(categoriasConstants(0, 0, 0, 0, begin, amount, {}, false).get_categorias_filter))
    }, [])

    useEffect(() => {
        if (get_categorias_filter && get_categorias_filter.success === true && get_categorias_filter.categorias){
            dividir_nro_columnas(get_categorias_filter)
        }
    }, [get_categorias_filter])

    useEffect(() => {
        if (delete_categoria && delete_categoria.success === true && delete_categoria.categorias){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_categoria)
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 16, {}, true).delete_categoria))
        }
    }, [delete_categoria])

    const next_categorias = () => {
        if (begin + amount > total_categorias){

        }else{
            setBegin (begin + amount)
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_categorias_filter))
        }
    }

    const previous_categorias = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_categorias_filter))
        }
    }

    const dividir_nro_columnas = (data_categorias) => {
        if (data_categorias.total_categorias){setTotalCategorias(data_categorias.total_categorias)}
        setListaGridCategorias (data_categorias.categorias)
        setListaCategorias (data_categorias.categorias)
    }

    useEffect(() => {
        return () => {
            setListaGridCategorias([])
            setListaCategorias ([])
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Tus categorías
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_categorias_filter && get_categorias_filter.categorias ? begin + get_categorias_filter.categorias.length : 0} de ${total_categorias}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_categoria === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                            marginRight: 5 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewCategoria('lista')}/>
                    <img src={view_categoria === 'grid' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => setViewCategoria('grid')}/>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_up ? preview_select : preview}
                        onMouseOver={() => setMousePreviewUp(true)} onMouseLeave={() => setMousePreviewUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => previous_categorias()}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_up ? next_select : next} 
                        onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => next_categorias()}/>
                </div>
            </div>
            {
                lista_grid_categorias && lista_grid_categorias.length > 0 && view_categoria === 'grid' ? (
                    lista_grid_categorias.map ((categoria, numcat) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardCategoriaCell categoria={categoria} key={numcat} index={numcat} proporcional={proporcional} view_categoria={view_categoria}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_categorias && lista_categorias.length > 0 && view_categoria === 'lista' ? (
                        lista_categorias.map ((categoria, numcat) => {
                            return (
                                <CardCategoriaCell categoria={categoria} key={numcat} index={numcat} proporcional={proporcional} view_categoria={view_categoria}/>
                            )
                        })
                ) : null
            }            
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_categoria === 'grid' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_preview_down ? preview_select : preview} 
                        onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {previous_categorias(); window.scrollTo(0, 0)}}/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    <img src={mouse_next_down ? next_select : next} 
                        onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                        style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                                cursor: 'pointer'}}
                        onClick={() => {next_categorias(); window.scrollTo(0, 0)}}/>
                </div>
            </div>
        </div>
    )
}
