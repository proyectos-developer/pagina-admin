import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {trabajadoresdata} from '../../redux/slice/trabajadoresdata'
import { trabajadoresConstants } from '../../uri/trabajadores-constants.js'

import CardTrabajadorCell from './card/trabajadorcell.jsx'

export default function ListaTrabajadoresCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_trabajadores, setListaTrabajadores] = useState ([])
    const [total_trabajadores, setTotalTrabajadores] = useState(0)

    const {get_trabajadores} = useSelector(({trabajadores_data}) => trabajadores_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_trabajadores))
    }, [])

    useEffect(() => {
        if (get_trabajadores && get_trabajadores.success === true && get_trabajadores.trabajadores){
            if (get_trabajadores.total_trabajadores){setTotalTrabajadores(get_trabajadores.total_trabajadores)}
            setListaTrabajadores (get_trabajadores.trabajadores)
        }
    }, [get_trabajadores])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_trabajadores && lista_trabajadores.length > 0 ? (
                    lista_trabajadores.map ((trabajador, numtrab) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardTrabajadorCell trabajador={trabajador} key={numtrab} index={numtrab} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
