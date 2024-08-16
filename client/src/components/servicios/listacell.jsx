import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {serviciosdata} from '../../redux/slice/serviciosdata'
import { serviciosConstants } from '../../uri/servicios-constants.js'

import CardServicioCell from './card/serviciocell.jsx'

export default function ListaServiciosCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_servicios, setListaServicios] = useState ([])
    const [total_servicios, setTotalServicios] = useState(0)

    const {get_servicios} = useSelector(({servicios_data}) => servicios_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(serviciosdata(serviciosConstants(0, {}, false).get_servicios))
    }, [])

    useEffect(() => {
        if (get_servicios && get_servicios.success === true && get_servicios.servicios){
            if (get_servicios.total_servicios){setTotalservicios(get_servicios.total_servicios)}
            setListaServicios (get_servicios.servicios)
        }
    }, [get_servicios])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_servicios && lista_servicios.length > 0 ? (
                    lista_servicios.map ((servicio, numserv) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardServicioCell servicio={servicio} key={numserv} index={numserv} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
