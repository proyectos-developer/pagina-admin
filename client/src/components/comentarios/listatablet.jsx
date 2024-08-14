import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {calificacionesdata} from '../../redux/slice/calificacionesdata'
import { calificacionesConstants } from '../../uri/calificaciones-constants.js'

import CardCalificacionTablet from './card/calificaciontablet.jsx'

export default function ListaCalificacionesTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_calificaciones, setListaCalificaciones] = useState ([])
    const [calificaciones, setCalificaciones] = useState ([])
    const [total_calificaciones, setTotalCalificaciones] = useState(0)

    const {get_calificaciones} = useSelector(({calificaciones_data}) => calificaciones_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(calificacionesdata(calificacionesConstants(0, 0, 16, {}, false).get_calificaciones))
    }, [])

    useEffect(() => {
        if (get_calificaciones && get_calificaciones.success === true && get_calificaciones.calificaciones){
            let data = get_calificaciones.calificaciones.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_calificaciones.total_calificaciones){setTotalCalificaciones(get_calificaciones.total_calificaciones)}
            setCalificaciones (get_calificaciones.calificaciones)
            setListaCalificaciones (lista)
        }
    }, [get_calificaciones])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_calificaciones && lista_calificaciones.length > 0 ? (
                    lista_calificaciones.map ((calificacion, numcal) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    calificaciones [(2 * numcal)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardCalificacionTablet calificacion={calificaciones[(2 * numcal)]} key={(2 * numcal)} index={(2 * numcal)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    calificaciones [((2 * numcal) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardCalificacionTablet calificacion={calificaciones[((2 * numcal) + 1)]} key={((2 * numcal) + 1)} index={((2 * numcal) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
