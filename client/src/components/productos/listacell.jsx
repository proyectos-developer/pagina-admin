import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {productosdata} from '../../redux/slice/productosdata'
import { productosConstants } from '../../uri/productos-constants.js'

import CardProductoCell from './card/productocell.jsx'

export default function ListaProductosCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_producto, setListaProductos] = useState ([])
    const [total_productos, setTotalProductos] = useState(0)

    const {get_productos_filter} = useSelector(({productos_data}) => productos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_productos_filter))
    }, [])

    useEffect(() => {
        if (get_productos_filter && get_productos_filter.success === true && get_productos_filter.productos){
            if (get_productos_filter.total_productos){setTotalProductos(get_productos_filter.total_productos)}
            setListaProductos (get_productos_filter.productos)
        }
    }, [get_productos_filter])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_producto && lista_producto.length > 0 ? (
                    lista_producto.map ((producto, numprod) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardProductoCell producto={producto} key={numprod} index={numprod} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}