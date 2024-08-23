import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {trabajadoresdata} from '../../redux/slice/trabajadoresdata'
import { trabajadoresConstants } from '../../uri/trabajadores-constants.js'

import CardTrabajadorTablet from './card/trabajadortablet.jsx'

export default function ListaTrabajadoresTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_trabajadores, setListaTrabajadores] = useState ([])
    const [trabajadores, setTrabajadores] = useState ([])
    const [total_trabajadores, setTotalTrabajadores] = useState(0)

    const {get_trabajadores} = useSelector(({trabajadores_data}) => trabajadores_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_trabajadores))
    }, [])

    useEffect(() => {
        if (get_trabajadores && get_trabajadores.success === true && get_trabajadores.trabajadores){
            let data = get_trabajadores.trabajadores.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_trabajadores.total_trabajadores){setTotalTrabajadores(get_trabajadores.total_trabajadores)}
            setTrabajadores (get_trabajadores.trabajadores)
            setListaTrabajadores (lista)
        }
    }, [get_trabajadores])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_trabajadores && lista_trabajadores.length > 0 ? (
                    lista_trabajadores.map ((trabajador, numtrab) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    trabajadores [(2 * numtrab)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardTrabajadorTablet trabajador={trabajadores[(2 * numtrab)]} key={(2 * numtrab)} index={(2 * numtrab)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    trabajadores [((2 * numtrab) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardTrabajadorTablet trabajador={trabajadores[((2 * numtrab) + 1)]} key={((2 * numtrab) + 1)} index={((2 * numtrab) + 1)} proporcional={proporcional}/>
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
