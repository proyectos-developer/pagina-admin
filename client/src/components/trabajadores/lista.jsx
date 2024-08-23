import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {trabajadoresdata} from '../../redux/slice/trabajadoresdata'
import { trabajadoresConstants } from '../../uri/trabajadores-constants.js'

import CardTrabajador from './card/trabajador.jsx'

export default function ListaTrabajadores ({proporcional}) {

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
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_trabajadores.total_trabajadores){setTotalTrabajadores(get_trabajadores.total_trabajadores)}
            setTrabajadores (get_trabajadores.trabajadores)
            setListaTrabajadores (lista)
        }
    }, [get_trabajadores])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_trabajadores && lista_trabajadores.length > 0 ? (
                    lista_trabajadores.map ((trabajador, numtrab) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    trabajadores [(4 * numtrab)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={trabajadores[(4 * numtrab)]} key={(4 * numtrab)} index={(4 * numtrab)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    trabajadores [((4 * numtrab) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={trabajadores[((4 * numtrab) + 1)]} key={((4 * numtrab) + 1)} index={((4 * numtrab) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    trabajadores [((4 * numtrab) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={trabajadores[((4 * numtrab) + 2)]} key={((4 * numtrab) + 2)} index={((4 * numtrab) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    trabajadores [((4 * numtrab) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTrabajador trabajador={trabajadores[((4 * numtrab) + 3)]} key={((4 * numtrab) + 3)} index={((4 * numtrab) + 3)} proporcional={proporcional}/>
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
