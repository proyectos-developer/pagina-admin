import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clientesdata} from '../../redux/slice/clientesdata'
import { clientesConstants } from '../../uri/clientes-constants.js'

import CardComprador from './card/comprador.jsx'

export default function ListaCompradores ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_clientes, setListaClientes] = useState ([])
    const [clientes, setClientes] = useState ([])
    const [total_clientes, setTotalClientes] = useState(0)

    const {get_clientes} = useSelector(({clientes_data}) => clientes_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(clientesdata(clientesConstants(0, 0, 0, 16, {}, false).get_clientes))
    }, [])

    useEffect(() => {
        if (get_clientes && get_clientes.success === true && get_clientes.clientes){
            let data = get_clientes.clientes.length
            let lista = []
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_clientes.total_clientes){setTotalClientes(get_clientes.total_clientes)}
            setClientes (get_clientes.clientes)
            setListaClientes (lista)
        }
    }, [get_clientes])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_clientes && lista_clientes.length > 0 ? (
                    lista_clientes.map ((cliente, numcliente) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    clientes [(4 * numcliente)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardComprador cliente={clientes[(4 * numcliente)]} key={(4 * numcliente)} index={(4 * numcliente)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    clientes [((4 * numcliente) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardComprador cliente={clientes[((4 * numcliente) + 1)]} key={((4 * numcliente) + 1)} index={((4 * numcliente) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    clientes [((4 * numcliente) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardComprador cliente={clientes[((4 * numcliente) + 2)]} key={((4 * numcliente) + 2)} index={((4 * numcliente) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    clientes [((4 * numcliente) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardComprador cliente={clientes[((4 * numcliente) + 3)]} key={((4 * numcliente) + 3)} index={((4 * numcliente) + 3)} proporcional={proporcional}/>
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
