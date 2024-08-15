import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {comprasdata} from '../../redux/slice/comprasdata'
import { comprasConstants } from '../../uri/compras-constants.js'

import CardCompraCell from './card/compracell.jsx'

export default function ListaComprasCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_compras, setListaCompras] = useState ([])
    const [total_compras, setTotalCompras] = useState(0)

    const {get_compras} = useSelector(({compras_data}) => compras_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(comprasdata(comprasConstants(0, 0, 0, 16, {}, false).get_compras))
    }, [])

    useEffect(() => {
        if (get_compras && get_compras.success === true && get_compras.compras){
            if (get_compras.total_compras){setTotalcompras(get_compras.total_compras)}
            setListaCompras (get_compras.compras)
        }
    }, [get_compras])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_compras && lista_compras.length > 0 ? (
                    lista_compras.map ((compra, numcompra) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardCompraCell compra={compra} key={numcompra} index={numcompra} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
