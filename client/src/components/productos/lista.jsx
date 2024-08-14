import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {productosdata} from '../../redux/slice/productosdata'
import { productosConstants } from '../../uri/productos-constants.js'

import CardProducto from './card/producto.jsx'

export default function ListaProductos ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_producto, setListaProductos] = useState ([])
    const [productos, setProductos] = useState ([])
    const [total_productos, setTotalProductos] = useState(0)

    const {get_productos_filter} = useSelector(({productos_data}) => productos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_productos_filter))
    }, [])

    useEffect(() => {
        if (get_productos_filter && get_productos_filter.success === true && get_productos_filter.productos){
            let data = get_productos_filter.productos.length
            let lista = []
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_productos_filter.total_productos){setTotalProductos(get_productos_filter.total_productos)}
            setProductos (get_productos_filter.productos)
            setListaProductos (lista)
        }
    }, [get_productos_filter])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_producto && lista_producto.length > 0 ? (
                    lista_producto.map ((producto, numprod) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    productos [(4 * numprod)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardProducto producto={productos[(4 * numprod)]} key={(4 * numprod)} index={(4 * numprod)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    productos [((4 * numprod) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardProducto producto={productos[((4 * numprod) + 1)]} key={((4 * numprod) + 1)} index={((4 * numprod) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    productos [((4 * numprod) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardProducto producto={productos[((4 * numprod) + 2)]} key={((4 * numprod) + 2)} index={((4 * numprod) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    productos [((4 * numprod) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardProducto producto={productos[((4 * numprod) + 3)]} key={((4 * numprod) + 3)} index={((4 * numprod) + 3)} proporcional={proporcional}/>
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
