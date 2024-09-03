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

import CardGestionProyecto from './card/gestion.jsx'
import {gestionproyectosdata} from '../../../redux/slice/gestionproyectosdata.js'
import { gestionproyectosConstants } from '../../../uri/gestionproyectos-constants.js'

export default function ListaGestionProyectos ({proporcional}) {

    const dispatch = useDispatch()

    const [view_gestion, setViewGestion] = useState ('grid')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_gestion_proyectos, setListaGridGestionProyectos] = useState ([])
    const [lista_gestion_proyectos, setListaGestionProyectos] = useState ([])
    const [total_gestion_proyectos, setTotalGestionProyectos] = useState(0)
    const [gestion_proyectos, setGestionProyectos] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_informes_proyectos_filter, delete_informe_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, begin, amount, {}, false).get_informes_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_informes_proyectos_filter && get_informes_proyectos_filter.success === true && get_informes_proyectos_filter.gestion_proyectos){
            dividir_nro_columnas(get_informes_proyectos_filter)
        }
    }, [get_informes_proyectos_filter])

    useEffect(() => {
        if (delete_informe_proyecto && delete_informe_proyecto.success === true && delete_informe_proyecto.gestion_proyectos){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_informe_proyecto)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 16, {}, true).delete_informe_proyecto))
        }
    }, [delete_informe_proyecto])

    const next_gestion_proyectos = () => {
        if (begin + amount > total_gestion_proyectos){

        }else{
            setBegin (begin + amount)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_informes_proyectos_filter))
        }
    }

    const previous_gestion_proyectos = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_informes_proyectos_filter))
        }
    }

    const dividir_nro_columnas = (data_gestion_proyectos) => {
        if (data_gestion_proyectos.total_proyectos){setTotalGestionProyectos(data_gestion_proyectos.total_proyectos)}
        let data = data_gestion_proyectos.gestion_proyectos.length
        let lista = []
        let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setGestionProyectos (data_gestion_proyectos.gestion_proyectos)
        setListaGridGestionProyectos (lista)
        setListaGestionProyectos (data_gestion_proyectos.gestion_proyectos)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridGestionProyectos([])
        setListaGestionProyectos ([])
        setGestionProyectos([])
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_informes_proyectos_filter))
        dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).delete_informe_proyecto))
    }

    useEffect(() => {
        return () => {
            setListaGridGestionProyectos([])
            setListaGestionProyectos ([])
            setGestionProyectos([])
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_informes_proyectos_filter))
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).delete_informe_proyecto))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Gestión de proyectos
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_informes_proyectos_filter && get_informes_proyectos_filter.gestion_proyectos ? begin + get_informes_proyectos_filter.gestion_proyectos.length : 0} de ${total_gestion_proyectos}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                    <img src={view_gestion === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewGestion('lista')}/>
                    <img src={view_gestion === 'grid' || view_gestion === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewGestion('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_gestion_proyectos && lista_grid_gestion_proyectos.length > 0 && view_gestion === 'grid' ? (
                    lista_grid_gestion_proyectos.map ((gestion_proyecto, numgest) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    gestion_proyectos [(4 * numgest)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardGestionProyecto gestion_proyecto={gestion_proyectos[(4 * numgest)]} key={(4 * numgest)} index={(4 * numgest)} proporcional={proporcional} view_gestion={view_gestion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    gestion_proyectos [((4 * numgest) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardGestionProyecto gestion_proyecto={gestion_proyectos[((4 * numgest) + 1)]} key={((4 * numgest) + 1)} index={((4 * numgest) + 1)} proporcional={proporcional} view_gestion={view_gestion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    gestion_proyectos [((4 * numgest) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardGestionProyecto gestion_proyecto={gestion_proyectos[((4 * numgest) + 2)]} key={((4 * numgest) + 2)} index={((4 * numgest) + 2)} proporcional={proporcional} view_gestion={view_gestion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    gestion_proyectos [((4 * numgest) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardGestionProyecto gestion_proyecto={gestion_proyectos[((4 * numgest) + 3)]} key={((4 * numgest) + 3)} index={((4 * numgest) + 3)} proporcional={proporcional} view_gestion={view_gestion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_gestion_proyectos && lista_gestion_proyectos.length > 0 && view_gestion === 'lista' ? (
                        lista_gestion_proyectos.map ((gestion_proyecto, numgest) => {
                            return (
                                <CardGestionProyecto gestion_proyecto={gestion_proyecto} key={numgest} index={numgest} proporcional={proporcional} view_gestion={view_gestion}/>
                            )
                        })
                ) : null
            }                  
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_gestion === 'grid' || view_gestion === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_gestion_proyectos(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_gestion_proyectos ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_gestion_proyectos(); window.scrollTo(0, 0)}}>
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
