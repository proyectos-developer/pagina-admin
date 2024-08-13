import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {negociosdata} from '../../redux/slice/negociosdata'
import { negociosConstants } from '../../uri/negocios-constants'

import CardNegocioTablet from './card/negociotablet.jsx'

export default function ListaClientesTablet ({proporcional}) {

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
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (lista_negocios.total_negocios){setTotalNegocios(lista_negocios.total_negocios)}
            setNegocios (get_negocios.negocios)
            setListaNegocios (lista)
        }
    }, [get_negocios])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 50 / proporcional : 150 / proporcional,
            paddingRight: open_menu_lateral ? 50 / proporcional : 150 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_negocios && lista_negocios.length > 0 ? (
                    lista_negocios.map ((negocio, numneg) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    negocios [(2 * numneg)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardNegocioTablet negocio={negocios[(2 * numneg)]} key={(2 * numneg)} index={(2 * numneg)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    negocios [((2 * numneg) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardNegocioTablet negocio={negocios[((2 * numneg) + 1)]} key={((2 * numneg) + 1)} index={((2 * numneg) + 1)} proporcional={proporcional}/>
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
