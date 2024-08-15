import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {suscripcionesdata} from '../../redux/slice/suscripcionesdata'
import { suscripcionesConstants } from '../../uri/suscripciones-constants.js'

import CardSuscripcionTablet from './card/suscripciontablet.jsx'

export default function ListaSuscriptoresTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_suscripciones, setListaSuscripciones] = useState ([])
    const [suscripciones, setSuscripciones] = useState ([])
    const [total_suscripciones, setTotalSuscripciones] = useState(0)

    const {get_suscripciones} = useSelector(({suscripciones_data}) => suscripciones_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(suscripcionesdata(suscripcionesConstants(0, 0, 16, {}, false).get_suscripciones))
    }, [])

    useEffect(() => {
        if (get_suscripciones && get_suscripciones.success === true && get_suscripciones.suscripciones){
            let data = get_suscripciones.suscripciones.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_suscripciones.total_suscripciones){setTotalSuscripciones(get_suscripciones.total_suscripciones)}
            setSuscripciones (get_suscripciones.suscripciones)
            setListaSuscripciones (lista)
        }
    }, [get_suscripciones])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_suscripciones && lista_suscripciones.length > 0 ? (
                    lista_suscripciones.map ((suscripcion, numsusc) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    suscripciones [(2 * numsusc)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardSuscripcionTablet suscripcion={suscripciones[(2 * numsusc)]} key={(2 * numsusc)} index={(2 * numsusc)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    suscripciones [((2 * numsusc) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardSuscripcionTablet suscripcion={suscripciones[((2 * numsusc) + 1)]} key={((2 * numsusc) + 1)} index={((2 * numsusc) + 1)} proporcional={proporcional}/>
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
