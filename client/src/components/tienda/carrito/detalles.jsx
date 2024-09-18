import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../../assets/iconos/comun/next_v2.png'
import next_select from '../../../assets/iconos/comun/next_v1.png'
import preview from '../../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../../assets/iconos/comun/view_grid_v2.png'
import reset_v2 from '../../../assets/iconos/comun/reset_v2.png'
import reset_v1 from '../../../assets/iconos/comun/reset_v1.png'

import CardProducto from './card/producto.jsx'
import {comprasdata} from '../../../redux/slice/comprasdata.js'
import { comprasConstants } from '../../../uri/compras-constants.js'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { constantes } from '../../../uri/constantes.js'

export default function DetallesCompra({proporcional}) {

    const location = useLocation()
  const dispatch = useDispatch()

  const [view_compra, setViewCompra] = useState ('lista')
  const [begin, setBegin] = useState(0)
  const [amount, setAmount] = useState(16)

  const [shop_id, setShopId] = useState('')
  const [fecha_compra, setFechaCompra] = useState('')
  const [cliente, setCliente] = useState({})
  const [total_pagado, setTotalPagado] = useState(0)

  const [lista_grid_productos, setListaGridProductos] = useState ([])
  const [lista_productos, setListaProductos] = useState ([])
  const [total_productos, setTotalProductos] = useState(0)
  const [productos, setProductos] = useState ([])

  const [boton_reset, setBotonReset] = useState (false)
  const [mouse_next, setMouseNext] = useState(false)
  const [mouse_preview, setMousePreview] = useState(false)

  const {get_productos_compra} = useSelector(({compras_data}) => compras_data)
  const {data_compras, open_menu_lateral} = useSelector(({data_actions}) => data_actions)


  useEffect(() => {
    if (data_compras.fecha_compra === undefined){
        setShopId(location.pathname.split('/')[5])
        dispatch(comprasdata(comprasConstants(0, location.pathname.split('/')[5], 0, 0, 0, begin, amount, {}, false).get_productos_compra))
    }else{
      setShopId(data_compras.shop_id)
      setFechaCompra(data_compras.fecha_compra)
      dispatch(comprasdata(comprasConstants(0, data_compras.shop_id, 0, 0, 0, begin, amount, {}, false).get_productos_compra))
    }
  }, [data_compras])

  useEffect(() => {
    if (get_productos_compra && get_productos_compra.success === true &&
        get_productos_compra.productos_compra){
            setFechaCompra((new Date(get_productos_compra.productos_compra[0].fecha_compra).toDateString()))
            axios.get (`${constantes().url_principal[0].url}/cliente/${get_productos_compra.productos_compra[0].usuario}`)
                .then ((res) => {
                    setCliente(res.data.cliente)
                    let pagado = 0
                    get_productos_compra.productos_compra.map ((producto) => {
                        pagado += parseFloat(producto.precio_total)
                    })
                    setTotalPagado(pagado)
                }).catch ((err) => {

                })
          dividir_nro_columnas(get_productos_compra)          
    }
  }, [get_productos_compra])

  const next_productos = () => {
      if (begin + amount > total_productos){

      }else{
          setBegin (begin + amount)
          dispatch (comprasdata(comprasConstants(0, shop_id, 0, 0, 0, begin + amount, amount, {}, false).get_productos_compra))
      }
  }

  const previous_productos = () => {
      if (begin - amount < 0){
          
      }else{
          setBegin (begin - amount)
          dispatch (comprasdata(comprasConstants(0, shop_id, 0 ,0, 0, begin - amount, amount, {}, false).get_productos_compra))
      }
  }

  const dividir_nro_columnas = (productos_data) => {
      if (productos_data.total_compras){setTotalProductos(productos_data.total_compras)}
      let data = productos_data.productos_compra.length
      let lista = []
      let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
      for (let count = 0; count < cuenta; count ++){
          lista.push ({num: `${count + 1}`})
      }
      setProductos (productos_data.productos_compra)
      setListaGridProductos (lista)
      setListaProductos (productos_data.productos_compra)
  }

  const resetear_data = () => {
    setListaGridProductos([])
    setListaProductos ([])
    setProductos([])
    dispatch(comprasdata(comprasConstants(0, 0, 0, 0, 0, 0, 16, {}, false).get_productos_compra))
  }

  useEffect(() => {
      return () => {
          setListaGridProductos([])
          setListaProductos ([])
          setProductos([])
          dispatch(comprasdata(comprasConstants(0, 0, 0, 0, 0, 0, 0, {}, false).get_productos_compra))
      }
  },[])

  return (
    <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 80 / proporcional : 100 / proporcional,
        paddingRight: open_menu_lateral ? 80 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
            <div style={{width: '90%', height: 'auto'}}>
                <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    color: '#4A4A4A'}}>Compra realizada el día: <strong>{fecha_compra} </strong>
                    <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                        {`mostrando del ${begin} al 
                            ${get_productos_compra && get_productos_compra.productos_compra ? begin + get_productos_compra.productos_compra.length : 0} de ${total_productos}`}
                    </span>
                </h2>
            </div>
            <div className='d-flex justify-content-end' style={{width: '10%', height: 'auto'}}>
                <img src={view_compra === 'lista' ? view_list_v1 : view_list_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                        marginRight: 5 / proporcional, cursor: 'pointer'
                    }} onClick={() => setViewCompra('lista')}/>
                <img src={view_compra === 'grid' ? view_grid_v1 : view_grid_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                        cursor: 'pointer'
                    }} onClick={() => setViewCompra('grid')}/>
                <img src={boton_reset ? reset_v1 : reset_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                        cursor: 'pointer'
                    }} onClick={() => resetear_data()}
                    onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
            </div>
        </div>
        {
            lista_grid_productos && lista_grid_productos.length > 0 && view_compra === 'grid' ? (
                lista_grid_productos.map ((producto, numprod) => {
                    return (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            {
                                productos [(4 * numprod)] ? (
                                    <div style={{width: '24%', height: 'auto'}}>
                                        <CardProducto producto={productos[(4 * numprod)]} key={(4 * numprod)} index={(4 * numprod)} proporcional={proporcional} view_compra={view_compra}/>
                                    </div>
                                ) : (
                                    <div style={{width: '24%', height: 'auto'}}/>
                                )
                            }
                            {
                                productos [((4 * numprod) + 1)] ? (
                                    <div style={{width: '24%', height: 'auto'}}>
                                        <CardProducto producto={productos[((4 * numprod) + 1)]} key={((4 * numprod) + 1)} index={((4 * numprod) + 1)} proporcional={proporcional} view_compra={view_compra}/>
                                    </div>
                                ) : (
                                    <div style={{width: '24%', height: 'auto'}}/>
                                )
                            }
                            {
                                productos [((4 * numprod) + 2)] ? (
                                    <div style={{width: '24%', height: 'auto'}}>
                                        <CardProducto producto={productos[((4 * numprod) + 2)]} key={((4 * numprod) + 2)} index={((4 * numprod) + 2)} proporcional={proporcional} view_compra={view_compra}/>
                                    </div>
                                ) : (
                                    <div style={{width: '24%', height: 'auto'}}/>
                                )
                            }
                            {
                                productos [((4 * numprod) + 3)] ? (
                                    <div style={{width: '24%', height: 'auto'}}>
                                        <CardProducto producto={productos[((4 * numprod) + 3)]} key={((4 * numprod) + 3)} index={((4 * numprod) + 3)} proporcional={proporcional} view_compra={view_compra}/>
                                    </div>
                                ) : (
                                    <div style={{width: '24%', height: 'auto'}}/>
                                )
                            }
                        </div>
                    )
                })
            ) : 
                lista_productos && lista_productos.length > 0 && view_compra === 'lista' ? (
                    lista_productos.map ((producto, numprod) => {
                        return (
                            <CardProducto producto={producto} key={numprod} index={numprod} proporcional={proporcional} view_compra={view_compra}/>
                        )
                    })
            ) : null
        }  
        <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                marginTop: view_compra === 'grid' || view_compra === '' ? 0 : 16 / proporcional
        }}>
            <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                {
                    begin !== 0 ? (
                        <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setMousePreview(true)} onMouseLeave={() => setMousePreview(false)}
                            onClick={() => {previous_productos(); window.scrollTo(0, 0)}}>
                            <img src={mouse_preview ? preview_select : preview} 
                                style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                            <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                marginLeft: 5 / proporcional, color: mouse_preview ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                    Anteriores
                            </span>
                        </div>
                    ) : null
                }
            </div>
            <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                {
                    begin + 16 >= total_productos ? ( 
                        null
                    ) : (
                        <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                            onClick={() => {next_productos(); window.scrollTo(0, 0)}}>
                            <span style={{fonsSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0,
                                marginRight: 5 / proporcional, color: mouse_next ? '#007bff' : 'rgb(89, 89, 89)'}}>
                                    Siguientes
                            </span>
                            <img src={mouse_next ? next_select : next} 
                                style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional}}/>
                        </div>
                    )
                }
            </div>
        </div>  
        <div className='rounded-pill' style={{width: '100%', height: 2 / proporcional, background: 'rgba(89, 89, 89, 0.8)',
            marginTop: 16 / proporcional, marginBottom: 16 / proporcional}}/>      
        <div className='d-flex justify-content-between' style={{width: '100%', height: 30 / proporcional}}>
            <div style={{width: '48%', height: 30 / proporcional}}>
                <h3 style={{fontSize: 24 / proporcional, lineHeight: `${30 / proporcional}px`, color: '#007bff',
                    fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 600}}>Total:</h3>
            </div>
            <div className='d-flex justify-content-end' style={{width: '48%', height: 30 / proporcional}}>
                <h3 style={{fontSize: 24 / proporcional, lineHeight: `${30 / proporcional}px`, color: '#007bff',
                    fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 600}}>S/. {total_pagado}</h3>
            </div>
        </div>
    </div>
  )
}
