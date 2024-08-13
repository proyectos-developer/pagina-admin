import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clientesdata} from '../../redux/slice/clientesdata'
import { clientesConstants } from '../../uri/clientes-constants.js'

import CardCompradorCell from './card/compradorcell.jsx'

export default function ListaCompradoresCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_clientes, setListaClientes] = useState ([])
    const [clientes, setClientes] = useState ([])

    const {get_clientes} = useSelector(({clientes_data}) => clientes_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(clientesdata(clientesConstants(0, 0, 0, 16, {}, false).get_clientes))
    }, [])

    useEffect(() => {
        if (get_clientes && get_clientes.success === true && get_clientes.clientes){
            setListaClientes (get_clientes.clientes)
        }
    }, [get_clientes])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_clientes && lista_clientes.length > 0 ? (
                    lista_clientes.map ((cliente, numcliente) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardCompradorCell cliente={cliente} key={numcliente} index={numcliente} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
