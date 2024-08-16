import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {serviciosdata} from '../../redux/slice/serviciosdata'
import { serviciosConstants } from '../../uri/servicios-constants.js'

import CardServicio from './card/servicio.jsx'

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
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
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
                                    servicios [(4 * numserv)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardServicio servicio={servicios[(4 * numserv)]} key={(4 * numserv)} index={(4 * numserv)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    servicios [((4 * numserv) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardServicio servicio={servicios[((4 * numserv) + 1)]} key={((4 * numserv) + 1)} index={((4 * numserv) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    servicios [((4 * numserv) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardServicio servicio={servicios[((4 * numserv) + 2)]} key={((4 * numserv) + 2)} index={((4 * numserv) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    servicios [((4 * numserv) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardServicio servicio={servicios[((4 * numserv) + 3)]} key={((4 * numserv) + 3)} index={((4 * numserv) + 3)} proporcional={proporcional}/>
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
