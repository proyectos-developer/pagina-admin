import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {calificacionesdata} from '../../redux/slice/calificacionesdata'
import { calificacionesConstants } from '../../uri/calificaciones-constants.js'

import CardCalificacionCell from './card/calificacioncell.jsx'

export default function ListaCalificacionesCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_calificaciones, setListaCalificaciones] = useState ([])
    const [total_calificaciones, setTotalCalificaciones] = useState(0)

    const {get_calificaciones} = useSelector(({calificaciones_data}) => calificaciones_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(calificacionesdata(calificacionesConstants(0, 0, 16, {}, false).get_calificaciones))
    }, [])

    useEffect(() => {
        if (get_calificaciones && get_calificaciones.success === true && get_calificaciones.calificaciones){
            if (get_calificaciones.total_calificaciones){setTotalCalificaciones(get_calificaciones.total_calificaciones)}
            setListaCalificaciones (get_calificaciones.calificaciones)
        }
    }, [get_calificaciones])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_calificaciones && lista_calificaciones.length > 0 ? (
                    lista_calificaciones.map ((calificacion, numcal) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                  <div style={{width: '90%', height: 'auto'}}>
                                      <CardCalificacionCell calificacion={calificacion} key={numcal} index={numcal} proporcional={proporcional}/>
                                  </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
