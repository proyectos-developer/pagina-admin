import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {comprasdata} from '../../../redux/slice/comprasdata'
import { comprasConstants } from '../../../uri/compras-constants'
import { set_data_compras } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

export default function PedidosPorEntregarTablet({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [lista_pedidos, setListaPedidos] = useState([])

    const [overflow_pedido, setOverflowPedido] = useState(false)
    const [seleccion_pedido, setSeleccionPedido] = useState(false)
    const [shop_id, setShopId] = useState ('')
    const [boton_pedidos_entregar, setBotonPedidosEntregar] = useState(false)

    const {get_compras_filter, get_productos_compra} = useSelector(({compras_data}) => compras_data)

    useEffect(() => {
        dispatch(comprasdata(comprasConstants(0, 0, 0, 0, 0, 0, 50, {}, false).get_compras_filter))
    }, [])

    useEffect(() => {
        if (get_compras_filter && get_compras_filter.success === true){
            setListaPedidos(get_compras_filter.compras)
        }
    }, [get_compras_filter])

    const ver_pedido = (shop_id) => {
        setShopId(shop_id)
        dispatch (comprasdata(comprasConstants(0, shop_id, 0, 0, 0, 0, 16, {}, false).get_productos_compra))
    }

    useEffect(() => {
        if (get_productos_compra && get_productos_compra.success === true && get_productos_compra.productos_compra){
            navigate (`/panel/tienda/compras/productos/${shop_id}`)
        }
    }, [get_productos_compra])

    const ver_lista_pedidos_entregar = () => {
        window.scrollTo(0,0)
        navigate ('/panel/tienda/compras')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '100%', height: 'auto', padding: 10 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16,
                        fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                        Pedidos por entregar
                    </h4>
                    <div className={overflow_pedido ? 'overflow-auto' : 'overflow-hidden'} 
                        style={{width: '100%', height: 250 / proporcional, padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                        onMouseOver={() => setOverflowPedido(true)} onMouseLeave={() => setOverflowPedido(false)}>
                        {
                            lista_pedidos && lista_pedidos.length > 0 ? (
                                lista_pedidos.map ((pedido, index) => {
                                    return (
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}
                                            onMouseOver={() => setSeleccionPedido(pedido.id)} onMouseLeave={() => setSeleccionPedido('')}
                                            onClick={() => ver_pedido(pedido.shop_id)}>
                                            <div className='d-flex justify-content-start' style={{width: '48%', height: 'auto'}}>
                                                <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#007bff',
                                                    marginBottom: seleccion_pedido === pedido.id ? 16 / proporcional : 0, fontFamily: 'Poppins, sans-serif', fontWeight: seleccion_pedido === pedido.id ? 600 : 400, cursor: 'pointer'}}>
                                                    <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}>{index + 1}. </span>
                                                    {pedido.usuario}
                                                </p>
                                            </div>
                                            <div className='d-flex justify-content-end' style={{width: '48%', height: 'auto'}}>
                                                <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, color: '#4a4a4a',
                                                    marginBottom: seleccion_pedido === pedido.id ? 16 / proporcional : 0, fontFamily: 'Poppins, sans-serif', fontWeight: seleccion_pedido === pedido.id ? 600 : 400, cursor: 'pointer'}}>
                                                    <span style={{fontSize: 14 / proporcional, fontWeight: 600, color: '#4a4a4a'}}></span>
                                                    {(new Date(pedido.fecha_compra)).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : null
                        }
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_pedidos_entregar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '80%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonPedidosEntregar(true)} onMouseLeave={() => setBotonPedidosEntregar(false)}
                            onClick={() => ver_lista_pedidos_entregar()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Ver todos los pedidos por entregar
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
