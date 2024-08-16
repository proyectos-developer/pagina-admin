import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {unidadesdata} from '../../redux/slice/unidadesdata'
import { unidadesConstants } from '../../uri/unidades-constants.js'

import CardUnidad from './card/unidad.jsx'

export default function ListaUnidades ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_unidades, setListaUnidades] = useState ([])
    const [unidades, setUnidades] = useState ([])
    const [total_unidades, setTotalUnidades] = useState(0)

    const {get_unidades} = useSelector(({unidades_data}) => unidades_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(unidadesdata(unidadesConstants(0, {}, false).get_unidades))
    }, [])

    useEffect(() => {
        if (get_unidades && get_unidades.success === true && get_unidades.unidades){
            let data = get_unidades.unidades.length
            let lista = []
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_unidades.total_unidades){setTotalUnidades(get_unidades.total_unidades)}
            setUnidades (get_unidades.unidades)
            setListaUnidades (lista)
        }
    }, [get_unidades])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_unidades && lista_unidades.length > 0 ? (
                    lista_unidades.map ((unidad, numuni) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    unidades [(4 * numuni)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardUnidad unidad={unidades[(4 * numuni)]} key={(4 * numuni)} index={(4 * numuni)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    unidades [((4 * numuni) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardUnidad unidad={unidades[((4 * numuni) + 1)]} key={((4 * numuni) + 1)} index={((4 * numuni) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    unidades [((4 * numuni) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardUnidad unidad={unidades[((4 * numuni) + 2)]} key={((4 * numuni) + 2)} index={((4 * numuni) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    unidades [((4 * numuni) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardUnidad unidad={unidades[((4 * numuni) + 3)]} key={((4 * numuni) + 3)} index={((4 * numuni) + 3)} proporcional={proporcional}/>
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
