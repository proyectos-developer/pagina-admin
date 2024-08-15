import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {comprasdata} from '../../redux/slice/comprasdata'
import { comprasConstants } from '../../uri/compras-constants.js'

import CardCompraTablet from './card/compratablet.jsx'

export default function ListaComprasTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_compras, setListaCompras] = useState ([])
    const [compras, setCompras] = useState ([])
    const [total_compras, setTotalCompras] = useState(0)

    const {get_compras} = useSelector(({compras_data}) => compras_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(comprasdata(comprasConstants(0, 0, 0, 16, {}, false).get_compras))
    }, [])

    useEffect(() => {
        if (get_compras && get_compras.success === true && get_compras.compras){
            let data = get_compras.compras.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_compras.total_compras){setTotalcompras(get_compras.total_compras)}
            setCompras (get_compras.compras)
            setListaCompras (lista)
        }
    }, [get_compras])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_compras && lista_compras.length > 0 ? (
                    lista_compras.map ((compra, numcompra) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    compras [(2 * numcompra)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardCompraTablet compra={compras[(2 * numcompra)]} key={(2 * numcompra)} index={(2 * numcompra)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    compras [((2 * numcompra) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardCompraTablet compra={compras[((2 * numcompra) + 1)]} key={((2 * numcompra) + 1)} index={((2 * numcompra) + 1)} proporcional={proporcional}/>
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
