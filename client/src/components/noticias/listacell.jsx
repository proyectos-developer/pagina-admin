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
import reset_v2 from '../../assets/iconos/comun/reset_v2.png'
import reset_v1 from '../../assets/iconos/comun/reset_v1.png'

import CardNoticiaCell from './card/noticiacell.jsx'
import {noticiasdata} from '../../redux/slice/noticiasdata.js'
import { noticiasConstants } from '../../uri/noticias-constants.js'

export default function ListaNoticiasCell ({proporcional}) {

    const dispatch = useDispatch()

    const [view_noticia, setViewNoticia] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_noticias, setListaGridNoticias] = useState ([])
    const [lista_noticias, setListaNoticias] = useState ([])
    const [total_noticias, setTotalNoticias] = useState(0)

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_noticias_filter, delete_noticia} = useSelector(({noticias_data}) => noticias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(noticiasdata(noticiasConstants(0, 0, 0, 0, 0, begin, amount, {}, false).get_noticias_filter))
    }, [])

    useEffect(() => {
        if (get_noticias_filter && get_noticias_filter.success === true && get_noticias_filter.noticias){
            dividir_nro_columnas(get_noticias_filter)
        }
    }, [get_noticias_filter])

    useEffect(() => {
        if (delete_noticia && delete_noticia.success === true && delete_noticia.noticias){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_noticia)
            dispatch (noticiasdata(noticiasConstants(0, 0, 0, 0, 0, 0, 16, {}, true).delete_noticia))
        }
    }, [delete_noticia])

    const next_noticias = () => {
        if (begin + amount > total_noticias){

        }else{
            setBegin (begin + amount)
            dispatch (noticiasdata(noticiasConstants(0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_noticias_filter))
        }
    }

    const previous_noticias = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (noticiasdata(noticiasConstants(0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_noticias_filter))
        }
    }

    const dividir_nro_columnas = (data_noticias) => {
        if (data_noticias.total_noticias){setTotalNoticias(data_noticias.total_noticias)}
        setListaGridNoticias (data_noticias.noticias)
        setListaNoticias (data_noticias.noticias)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridNoticias([])
        setListaNoticias ([])
        dispatch(noticiasdata(noticiasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_noticias_filter))
        dispatch(noticiasdata(noticiasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).delete_noticia))
    }

    useEffect(() => {
        return () => {
            setListaGridNoticias([])
            setListaNoticias ([])
            dispatch(noticiasdata(noticiasConstants(0, 0, 0, 0, 0, 0, 0, {}, true).get_noticias_filter))
            dispatch(noticiasdata(noticiasConstants(0, 0, 0, 0, 0, 0, 0, {}, true).delete_noticia))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Noticias
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_noticias_filter && get_noticias_filter.noticias ? begin + get_noticias_filter.noticias.length : 0} de ${total_noticias}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <img src={view_noticia === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewNoticia('lista')}/>
                    <img src={view_noticia === 'grid' || view_noticia === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewNoticia('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_noticias && lista_grid_noticias.length > 0 && view_noticia === 'grid' ? (
                    lista_grid_noticias.map ((noticia, numnot) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardNoticiaCell noticia={noticia} key={numnot} index={numnot} proporcional={proporcional} view_noticia={view_noticia}/>
                                </div>
                            </div>
                        )
                    })
                ) : 
                    lista_noticias && lista_noticias.length > 0 && view_noticia === 'lista' ? (
                        lista_noticias.map ((noticia, numnot) => {
                            return (
                                <CardNoticiaCell noticia={noticia} key={numnot} index={numnot} proporcional={proporcional} view_noticia={view_noticia}/>
                            )
                        })
                ) : null
            }                  
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_noticia === 'grid' || view_noticia === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_noticias(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_noticias ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_noticias(); window.scrollTo(0, 0)}}>
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
