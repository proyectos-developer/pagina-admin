import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {negociosdata} from '../../redux/slice/negociosdata'
import { negociosConstants } from '../../uri/negocios-constants'

import CardNegocioCell from './card/negociocell.jsx'

export default function ListaClientesCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_negocios, setListaNegocios] = useState ([])

    const {get_negocios} = useSelector(({negocios_data}) => negocios_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(negociosdata(negociosConstants(0, 0, 16, {}, false).get_negocios))
    }, [])

    useEffect(() => {
        if (get_negocios && get_negocios.success === true && get_negocios.negocios){
            if (lista_negocios.total_negocios){setTotalNegocios(lista_negocios.total_negocios)}
            setListaNegocios (get_negocios.negocios)
        }
    }, [get_negocios])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 20 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 20 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_negocios && lista_negocios.length > 0 ? (
                    lista_negocios.map ((negocio, numneg) => {
                        return (
                            <CardNegocioCell negocio={negocio} key={numneg} index={numneg} proporcional={proporcional}/>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
