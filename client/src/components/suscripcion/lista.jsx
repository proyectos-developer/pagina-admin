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

import CardSuscripcion from './card/suscripcion.jsx'
import {suscripcionesdata} from '../../redux/slice/suscripcionesdata.js'
import { suscripcionesConstants } from '../../uri/suscripciones-constants.js'

export default function ListaSuscriptores ({proporcional}) {

    const dispatch = useDispatch()

    const [view_suscripcion, setViewSuscripcion] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_suscriptores, setListaGridSuscriptores] = useState ([])
    const [lista_suscriptores, setListaSuscriptores] = useState ([])
    const [total_suscripciones, setTotalSuscriptores] = useState(0)
    const [suscriptores, setSuscriptores] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_suscripciones_filter, delete_suscripcion} = useSelector(({suscripciones_data}) => suscripciones_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(suscripcionesdata(suscripcionesConstants(0, begin, amount, {}, false).get_suscripciones_filter))
    }, [])

    useEffect(() => {
        if (get_suscripciones_filter && get_suscripciones_filter.success === true && get_suscripciones_filter.suscripciones){
            dividir_nro_columnas(get_suscripciones_filter)
        }
    }, [get_suscripciones_filter])

    useEffect(() => {
        if (delete_suscripcion && delete_suscripcion.success === true && delete_suscripcion.suscripciones){
            window.scrollTo(0, 0)
            setBegin(0)
            dividir_nro_columnas(delete_suscripcion)
            dispatch (suscripcionesdata(suscripcionesConstants(0, 0, 16, {}, true).delete_suscripcion))
        }
    }, [delete_suscripcion])

    const next_suscriptores = () => {
        if (begin + amount > total_suscripciones){

        }else{
            setBegin (begin + amount)
            dispatch (suscripcionesdata(suscripcionesConstants(0, begin + amount, amount, {}, false).get_suscripciones_filter))
        }
    }

    const previuos_suscriptores = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (suscripcionesdata(suscripcionesConstants(0, begin - amount, amount, {}, false).get_suscripciones_filter))
        }
    }

    const dividir_nro_columnas = (data_servicios) => {
        if (data_servicios.total_suscripciones){setTotalSuscriptores(data_servicios.total_suscripciones)}
        let data = data_servicios.suscripciones.length
        let lista = []
        let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setSuscriptores (data_servicios.suscripciones)
        setListaGridSuscriptores (lista)
        setListaSuscriptores (data_servicios.suscripciones)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridSuscriptores([])
        setListaSuscriptores ([])
        setSuscriptores([])
        dispatch(suscripcionesdata(suscripcionesConstants(0, 0, 16, {}, false).get_suscripciones_filter))
        dispatch(suscripcionesdata(suscripcionesConstants(0, 0, 16, {}, false).delete_suscripcion))
    }

    useEffect(() => {
        return () => {
            setListaGridSuscriptores([])
            setListaSuscriptores ([])
            setSuscriptores([])
            dispatch(suscripcionesdata(suscripcionesConstants(0, 0, 0, {}, true).get_suscripciones_filter))
            dispatch(suscripcionesdata(suscripcionesConstants(0, 0, 0, {}, true).delete_suscripcion))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '48%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Suscriptores
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_suscripciones_filter && get_suscripciones_filter.suscriptores ? begin + get_suscripciones_filter.suscriptores.length : 0} de ${total_suscripciones}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                    <img src={view_suscripcion === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewSuscripcion('lista')}/>
                    <img src={view_suscripcion === 'grid' || view_suscripcion === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewSuscripcion('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_suscriptores && lista_grid_suscriptores.length > 0 && view_suscripcion === 'grid' ? (
                    lista_grid_suscriptores.map ((suscripcion, numsusc) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    suscriptores [(4 * numsusc)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardSuscripcion suscripcion={suscriptores[(4 * numsusc)]} key={(4 * numsusc)} index={(4 * numsusc)} proporcional={proporcional} view_suscripcion={view_suscripcion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    suscriptores [((4 * numsusc) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardSuscripcion suscripcion={suscriptores[((4 * numsusc) + 1)]} key={((4 * numsusc) + 1)} index={((4 * numsusc) + 1)} proporcional={proporcional} view_suscripcion={view_suscripcion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    suscriptores [((4 * numsusc) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardSuscripcion suscripcion={suscriptores[((4 * numsusc) + 2)]} key={((4 * numsusc) + 2)} index={((4 * numsusc) + 2)} proporcional={proporcional} view_suscripcion={view_suscripcion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    suscriptores [((4 * numsusc) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardSuscripcion suscripcion={suscriptores[((4 * numsusc) + 3)]} key={((4 * numsusc) + 3)} index={((4 * numsusc) + 3)} proporcional={proporcional} view_suscripcion={view_suscripcion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_suscriptores && lista_suscriptores.length > 0 && view_suscripcion === 'lista' ? (
                        lista_suscriptores.map ((suscripcion, numsusc) => {
                            return (
                                <CardSuscripcion suscripcion={suscripcion} key={numsusc} index={numsusc} proporcional={proporcional} view_suscripcion={view_suscripcion}/>
                            )
                        })
                ) : null
            }                  
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_suscripcion === 'grid' || view_suscripcion === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previuos_suscriptores(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_suscripciones ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_suscriptores(); window.scrollTo(0, 0)}}>
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
