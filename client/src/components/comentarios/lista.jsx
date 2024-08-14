import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {calificacionesdata} from '../../redux/slice/calificacionesdata'
import { calificacionesConstants } from '../../uri/calificaciones-constants.js'

import CardCalificacion from './card/calificacion.jsx'

export default function ListaCalificaciones ({proporcional}) {

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
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
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
                                    calificaciones [(4 * numcal)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCalificacion calificacion={calificaciones[(4 * numcal)]} key={(4 * numcal)} index={(4 * numcal)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    calificaciones [((4 * numcal) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCalificacion calificacion={calificaciones[((4 * numcal) + 1)]} key={((4 * numcal) + 1)} index={((4 * numcal) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    calificaciones [((4 * numcal) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCalificacion calificacion={calificaciones[((4 * numcal) + 2)]} key={((4 * numcal) + 2)} index={((4 * numcal) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    calificaciones [((4 * numcal) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCalificacion calificacion={calificaciones[((4 * numcal) + 3)]} key={((4 * numcal) + 3)} index={((4 * numcal) + 3)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
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
