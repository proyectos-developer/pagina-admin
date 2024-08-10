import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {negociosdata} from '../../redux/slice/negociosdata'
import { negociosConstants } from '../../uri/negocios-constants'

import CardNegocio from './card/negocio.jsx'

export default function ListaClientes ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_negocios, setListaNegocios] = useState ([])
    const [negocios, setNegocios] = useState ([])

    const {get_negocios} = useSelector(({negocios_data}) => negocios_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(negociosdata(negociosConstants(0, 0, 16, {}, false).get_negocios))
    }, [])

    useEffect(() => {
        if (get_negocios && get_negocios.success === true && get_negocios.negocios){
            let data = get_negocios.negocios.length
            let lista = []
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (lista_negocios.total_negocios){setTotalNegocios(lista_negocios.total_negocios)}
            setNegocios (get_negocios.negocios)
            setListaNegocios (lista)
        }
    }, [get_negocios])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_negocios && lista_negocios.length > 0 ? (
                    lista_negocios.map ((negocio, numneg) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    negocios [(4 * numneg)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNegocio negocio={negocios[(4 * numneg)]} key={(4 * numneg)} index={(4 * numneg)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    negocios [((4 * numneg) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNegocio negocio={negocios[((4 * numneg) + 1)]} key={((4 * numneg) + 1)} index={((4 * numneg) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    negocios [((4 * numneg) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNegocio negocio={negocios[((4 * numneg) + 2)]} key={((4 * numneg) + 2)} index={((4 * numneg) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    negocios [((4 * numneg) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNegocio negocio={negocios[((4 * numneg) + 3)]} key={((4 * numneg) + 3)} index={((4 * numneg) + 3)} proporcional={proporcional}/>
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
