import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {suscripcionesdata} from '../../redux/slice/suscripcionesdata'
import { suscripcionesConstants } from '../../uri/suscripciones-constants.js'

import CardSuscripcionCell from './card/suscripcioncell.jsx'

export default function ListaSuscriptoresCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_suscripciones, setListaSuscripciones] = useState ([])
    const [total_suscripciones, setTotalSuscripciones] = useState(0)

    const {get_suscripciones} = useSelector(({suscripciones_data}) => suscripciones_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(suscripcionesdata(suscripcionesConstants(0, 0, 16, {}, false).get_suscripciones))
    }, [])

    useEffect(() => {
        if (get_suscripciones && get_suscripciones.success === true && get_suscripciones.suscripciones){
            if (get_suscripciones.total_suscripciones){setTotalSuscripciones(get_suscripciones.total_suscripciones)}
            setListaSuscripciones (get_suscripciones.suscripciones)
        }
    }, [get_suscripciones])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_suscripciones && lista_suscripciones.length > 0 ? (
                    lista_suscripciones.map ((suscripcion, numsusc) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardSuscripcionCell suscripcion={suscripcion} key={numsusc} index={numsusc} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
