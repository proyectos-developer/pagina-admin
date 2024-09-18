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

import CardReunionTablet from './card/reuniontablet.jsx'
import {reunionesdata} from '../../../redux/slice/reunionesdata.js'
import { reunionesConstants } from '../../../uri/reuniones-constants.js'

export default function ListaReunionesTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [view_reunion, setViewReunion] = useState ('lista')
    const [begin, setBegin] = useState(0)
    const [amount, setAmount] = useState(16)

    const [lista_grid_reuniones, setListaGridReuniones] = useState ([])
    const [lista_reuniones, setListaReuniones] = useState ([])
    const [total_reuniones, setTotalReuniones] = useState(0)
    const [reuniones, setReuniones] = useState ([])

    const [boton_reset, setBotonReset] = useState (false)
    const [mouse_next, setMouseNext] = useState(false)
    const [mouse_preview, setMousePreviewDown] = useState(false)

    const {get_reuniones_filter} = useSelector(({reuniones_data}) => reuniones_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, begin, amount, {}, false).get_reuniones_filter))
    }, [])

    useEffect(() => {
        if (get_reuniones_filter && get_reuniones_filter.success === true && get_reuniones_filter.reuniones){
            dividir_nro_columnas(get_reuniones_filter)
        }
    }, [get_reuniones_filter])

    const next_reuniones = () => {
        if (begin + amount > total_reuniones){

        }else{
            setBegin (begin + amount)
            dispatch (reunionesdata(reunionesConstants(0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_reuniones_filter))
        }
    }

    const previous_reuniones = () => {
        if (begin - amount < 0){
            
        }else{
            setBegin (begin - amount)
            dispatch (reunionesdata(reunionesConstants(0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_reuniones_filter))
        }
    }

    const dividir_nro_columnas = (data_reuniones) => {
        if (data_reuniones.total_reuniones){setTotalReuniones(data_reuniones.total_reuniones)}
        let data = data_reuniones.reuniones.length
        let lista = []
        let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
        for (let count = 0; count < cuenta; count ++){
            lista.push ({num: `${count + 1}`})
        }
        setReuniones (data_reuniones.reuniones)
        setListaGridReuniones (lista)
        setListaReuniones (data_reuniones.reuniones)
    }

    const resetear_data = () => {
        setBegin(0)
        setListaGridReuniones([])
        setListaReuniones ([])
        setReuniones([])
        dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_reuniones_filter))
    }

    useEffect(() => {
        return () => {
            setListaGridReuniones([])
            setListaReuniones ([])
            setReuniones([])
            dispatch(reunionesdata(reunionesConstants(0, 0, 0, 0, 0, 0, 0, {}, true).get_reuniones_filter))
        }
    },[])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div style={{width: '80%', height: 'auto'}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Reuniones
                        <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                            {`mostrando del ${begin} al 
                                ${get_reuniones_filter && get_reuniones_filter.reuniones ? begin + get_reuniones_filter.reuniones.length : 0} de ${total_reuniones}`}
                        </span>
                    </h2>
                </div>
                <div className='d-flex justify-content-end' style={{width: '20%', height: 'auto'}}>
                    <img src={view_reunion === 'lista' ? view_list_v1 : view_list_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            marginRight: 10 / proporcional, cursor: 'pointer'
                        }} onClick={() => setViewReunion('lista')}/>
                    <img src={view_reunion === 'grid' || view_reunion === '' ? view_grid_v1 : view_grid_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer', marginRight: 10 / proporcional
                        }} onClick={() => setViewReunion('grid')}/>
                    <img src={boton_reset ? reset_v1 : reset_v2} 
                        style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                            cursor: 'pointer'
                        }} onClick={() => resetear_data()}
                        onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
                </div>
            </div>
            {
                lista_grid_reuniones && lista_grid_reuniones.length > 0 && view_reunion === 'grid' ? (
                    lista_grid_reuniones.map ((reunion, numreu) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    reuniones [(2 * numreu)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardReunionTablet reunion={reuniones[(2 * numreu)]} key={(2 * numreu)} index={(2 * numreu)} proporcional={proporcional} view_reunion={view_reunion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    reuniones [((2 * numreu) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardReunionTablet reunion={reuniones[((2 * numreu) + 1)]} key={((2 * numreu) + 1)} index={((2 * numreu) + 1)} proporcional={proporcional} view_reunion={view_reunion}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : 
                    lista_reuniones && lista_reuniones.length > 0 && view_reunion === 'lista' ? (
                        lista_reuniones.map ((reunion, numreu) => {
                            return (
                                <CardReunionTablet reunion={reunion} key={numreu} index={numreu} proporcional={proporcional} view_reunion={view_reunion}/>
                            )
                        })
                ) : null
            }                   
            <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                    marginTop: view_reunion === 'grid' || view_reunion === '' ? 0 : 16 / proporcional
            }}>
                <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                    {
                        begin !== 0 ? (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                                onClick={() => {previous_reuniones(); window.scrollTo(0, 0)}}>
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
                        begin + 16 >= total_reuniones ? ( 
                            null
                        ) : (
                            <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                                onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                                onClick={() => {next_reuniones(); window.scrollTo(0, 0)}}>
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
