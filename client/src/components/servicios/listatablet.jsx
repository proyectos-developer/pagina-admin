import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {serviciosdata} from '../../redux/slice/serviciosdata'
import { serviciosConstants } from '../../uri/servicios-constants.js'

import CardServicioTablet from './card/serviciotablet.jsx'

export default function ListaServicios ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_servicios, setListaServicios] = useState ([])
    const [servicios, setServicios] = useState ([])
    const [total_servicios, setTotalServicios] = useState(0)

    const {get_servicios} = useSelector(({servicios_data}) => servicios_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(serviciosdata(serviciosConstants(0, {}, false).get_servicios))
    }, [])

    useEffect(() => {
        if (get_servicios && get_servicios.success === true && get_servicios.servicios){
            let data = get_servicios.servicios.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_servicios.total_servicios){setTotalservicios(get_servicios.total_servicios)}
            setServicios (get_servicios.servicios)
            setListaServicios (lista)
        }
    }, [get_servicios])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_servicios && lista_servicios.length > 0 ? (
                    lista_servicios.map ((servicio, numserv) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    servicios [(2 * numserv)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardServicioTablet servicio={servicios[(2 * numserv)]} key={(2 * numserv)} index={(2 * numserv)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    servicios [((2 * numserv) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardServicioTablet servicio={servicios[((2 * numserv) + 1)]} key={((2 * numserv) + 1)} index={((2 * numserv) + 1)} proporcional={proporcional}/>
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
