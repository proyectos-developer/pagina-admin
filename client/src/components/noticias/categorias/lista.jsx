import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../../assets/iconos/comun/view_grid_v2.png'
import reset_v2 from '../../../assets/iconos/comun/reset_v2.png'
import reset_v1 from '../../../assets/iconos/comun/reset_v1.png'

import CardCategoriaNoticia from './card/categoria_noticia.jsx'
import {categorias_noticiasdata} from '../../../redux/slice/categorias_noticiasdata.js'
import { categoriasnoticiasConstants } from '../../../uri/categorias_noticias-constants.js'

export default function ListaCategoriasNoticias ({proporcional}) {

    const dispatch = useDispatch()

    const [view_categoria_noticia, setViewCategoriaNoticia] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_categorias_noticias, setListaGridCategoriasNoticias] = useState ([])
    const [lista_categorias_noticias, setListaCategoriasNoticias] = useState ([])
    const [total_categorias_noticias, setTotalCategoriasNoticias] = useState(0)
    const [categorias_noticias, setCategoriasNoticias] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_categorias_noticias_filter, delete_categoria_noticia} = useSelector(({categorias_noticias_data}) => categorias_noticias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, begin, amount, {}, false).get_categorias_noticias_filter))
    }, [])

    useEffect(() => {
      console.log ('get', get_categorias_noticias_filter)
        if (get_categorias_noticias_filter && get_categorias_noticias_filter.success === true && get_categorias_noticias_filter.categorias_noticias){
            dividir_nro_columnas(get_categorias_noticias_filter)
        }
    }, [get_categorias_noticias_filter])

    useEffect(() => {
        if (delete_categoria_noticia && delete_categoria_noticia.success === true && delete_categoria_noticia.categorias_noticias){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_categoria_noticia)
            dispatch (categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 16, {}, true).delete_categoria_noticia))
        }
    }, [delete_categoria_noticia])

    const next_categorias = () => {
        if (begin + amount > total_categorias_noticias){

        }else{
            setBegin (begin + amount)
            dispatch (categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, begin + amount, amount, {}, false).get_categorias_noticias_filter))
        }
    }

    const previous_categorias = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, begin - amount, amount, {}, false).get_categorias_noticias_filter))
        }
    }

    const dividir_nro_columnas = (data_categorias_noticias) => {
        if (data_categorias_noticias.total_categorias_noticias){setTotalCategoriasNoticias(data_categorias_noticias.total_categorias_noticias)}
        let data = data_categorias_noticias.categorias_noticias.length
        let lista = []
        let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setCategoriasNoticias (data_categorias_noticias.categorias_noticias)
        setListaGridCategoriasNoticias (lista)
        setListaCategoriasNoticias (data_categorias_noticias.categorias_noticias)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridCategoriasNoticias([])
        setListaCategoriasNoticias ([])
        setCategoriasNoticias([])
        dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 16, {}, false).get_categorias_noticias_filter))
        dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 16, {}, false).delete_categoria_noticia))
    }

    useEffect(() => {
        return () => {
            setListaGridCategoriasNoticias([])
            setListaCategoriasNoticias ([])
            setCategoriasNoticias([])
            dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 0, {}, true).get_categorias_noticias_filter))
            dispatch(categorias_noticiasdata(categoriasnoticiasConstants(0, 0, 0, 0, 0, 0, {}, true).delete_categoria_noticia))
        }
    }, [])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Categorías noticias
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_categorias_noticias_filter && get_categorias_noticias_filter.categorias_noticias ? begin + get_categorias_noticias_filter.categorias_noticias.length : 0} de ${total_categorias_noticias}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                    <img src={view_categoria_noticia === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewCategoriaNoticia('lista')}/>
                    <img src={view_categoria_noticia === 'grid' || view_categoria_noticia === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewCategoriaNoticia('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_categorias_noticias && lista_grid_categorias_noticias.length > 0 && view_categoria_noticia === 'grid' ? (
                    lista_grid_categorias_noticias.map ((categoria_noticia, numcat) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    categorias_noticias [(4 * numcat)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCategoriaNoticia categoria_noticia={categorias_noticias[(4 * numcat)]} key={(4 * numcat)} index={(4 * numcat)} proporcional={proporcional} view_categoria_noticia={view_categoria_noticia}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    categorias_noticias [((4 * numcat) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCategoriaNoticia categoria_noticia={categorias_noticias[((4 * numcat) + 1)]} key={((4 * numcat) + 1)} index={((4 * numcat) + 1)} proporcional={proporcional} view_categoria_noticia={view_categoria_noticia}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    categorias_noticias [((4 * numcat) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCategoriaNoticia categoria_noticia={categorias_noticias[((4 * numcat) + 2)]} key={((4 * numcat) + 2)} index={((4 * numcat) + 2)} proporcional={proporcional} view_categoria_noticia={view_categoria_noticia}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    categorias_noticias [((4 * numcat) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCategoriaNoticia categoria_noticia={categorias_noticias[((4 * numcat) + 3)]} key={((4 * numcat) + 3)} index={((4 * numcat) + 3)} proporcional={proporcional} view_categoria_noticia={view_categoria_noticia}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_categorias_noticias && lista_categorias_noticias.length > 0 && view_categoria_noticia === 'lista' ? (
                        lista_categorias_noticias.map ((categoria_noticia, numcat) => {
                            return (
                                <CardCategoriaNoticia categoria_noticia={categoria_noticia} key={numcat} index={numcat} proporcional={proporcional} view_categoria_noticia={view_categoria_noticia}/>
                            )
                        })
                ) : null
            }             
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_categoria_noticia === 'grid' || view_categoria_noticia === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_categorias(); window.scrollTo(0, 0)}}>
                                <img src={mouse_preview ? preview_select : preview} 
                                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                                <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                    marginLeft: 5 / proporcional, color: mouse_preview ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                        Anteriores
                                </span>
                            </div>
                        ) : null
                    }
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin + 16 >= total_categorias_noticias ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_categorias(); window.scrollTo(0, 0)}}>
                                <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                    marginRight: 5 / proporcional, color: mouse_next ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                        Siguientes
                                </span>
                                <img src={mouse_next ? next_select : next} 
                                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
