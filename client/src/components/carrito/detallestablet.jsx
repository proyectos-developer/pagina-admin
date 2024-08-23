import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import next from '../../assets/iconos/comun/next_v2.png'
import next_select from '../../assets/iconos/comun/next_v1.png'
import preview from '../../assets/iconos/comun/preview_v2.png'
import preview_select from '../../assets/iconos/comun/preview_v1.png'

import view_list_v1 from '../../assets/iconos/comun/view_list_v1.png'
import view_grid_v1 from '../../assets/iconos/comun/view_grid_v1.png'
import view_list_v2 from '../../assets/iconos/comun/view_list_v2.png'
import view_grid_v2 from '../../assets/iconos/comun/view_grid_v2.png'

import CardProductoTablet from './card/productotablet.jsx'
import {comprasdata} from '../../redux/slice/comprasdata.js'
import { comprasConstants } from '../../uri/compras-constants.js'
import { useLocation } from 'react-router-dom'

export default function DetallesCompraTablet({proporcional}) {

  const dispatch = useDispatch()
  const location = useLocation()

  const [view_producto, setViewProducto] = useState ('lista')
  const [begin, setBegin] = useState(0)
  const [amount, setAmount] = useState(16)

  const [shop_id, setShopId] = useState('')
  const [fecha_compra, setFechaCompra] = useState('')

  const [lista_grid_compras, setListaGridCompras] = useState ([])
  const [lista_compras, setListaCompras] = useState ([])
  const [total_compras, setTotalCompras] = useState(0)
  const [compras, setCompras] = useState ([])

  const [mouse_next_up, setMouseNextUp] = useState(false)
  const [mouse_preview_up, setMousePreviewUp] = useState(false)
  const [mouse_next_down, setMouseNextDown] = useState(false)
  const [mouse_preview_down, setMousePreviewDown] = useState(false)

  const {get_productos_compra} = useSelector(({compras_data}) => compras_data)
  const {data_compras, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

  useEffect(() => {
      if (data_compras.length === 0){
        dispatch(comprasdata(comprasConstants(0, location.pathname.split('/')[3], 0, 0, 0, begin, amount, {}, false).get_productos_compra))
      }else{
        setShopId(data_compras.productos_compra[0].shop_id)
        setFechaCompra(data_compras.productos_compra[0].fecha_compra)
        dividir_nro_columnas(data_compras)
      }
  }, [data_compras])

  useEffect(() => {
    if (get_productos_compra && get_productos_compra.success === true &&
        get_productos_compra.productos_compra){
          dividir_nro_columnas(get_productos_compra)          
    }
  }, [get_productos_compra])

  const next_compras = () => {
      if (begin + amount > total_compras){

      }else{
          setBegin (begin + amount)
          dispatch (comprasdata(comprasConstants(0, shop_id, 0, 0, 0, begin + amount, amount, {}, false).get_productos_compra))
      }
  }

  const previous_compras = () => {
      if (begin - amount < 0){
          
      }else{
          setBegin (begin - amount)
          dispatch (comprasdata(comprasConstants(0, shop_id, 0, 0, 0, begin - amount, amount, {}, false).get_productos_compra))
      }
  }

  const dividir_nro_columnas = (compras_data) => {
      if (compras_data.total_compras){setTotalCompras(compras_data.total_compras)}
      let data = compras_data.productos_compra.length
      let lista = []
      let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
      for (let count = 0; count < cuenta; count ++){
          lista.push ({num: `${count + 1}`})
      }
      setCompras (compras_data.productos_compra)
      setListaGridCompras (lista)
      setListaCompras (compras_data.productos_compra)
  }

  useEffect(() => {
      return () => {
          setListaGridCompras([])
          setListaCompras ([])
          setCompras([])
      }
  },[])

  return (
    <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
        paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
            <div style={{width: '80%', height: 'auto'}}>
                <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    color: '#4A4A4A'}}>Comprados del <strong>{(new Date(fecha_compra)).toDateString()}</strong>
                    <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                        {`mostrando del ${begin} al 
                            ${get_productos_compra && get_productos_compra.productos_compra ? begin + get_productos_compra.productos_compra.length : 0} de ${total_compras}`}
                    </span>
                </h2>
            </div>
            <div className='d-flex justify-content-end' style={{width: '20%', height: 'auto'}}>
                <img src={view_producto === 'lista' ? view_list_v1 : view_list_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                        marginRight: 5 / proporcional, cursor: 'pointer'
                    }} onClick={() => setViewProducto('lista')}/>
                <img src={view_producto === 'grid' ? view_grid_v1 : view_grid_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                        cursor: 'pointer'
                    }} onClick={() => setViewProducto('grid')}/>
            </div>
        </div>
        <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
            <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                <img src={mouse_preview_up ? preview_select : preview}
                    onMouseOver={() => setMousePreviewUp(true)} onMouseLeave={() => setMousePreviewUp(false)}
                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                            cursor: 'pointer'}}
                    onClick={() => previous_compras()}/>
            </div>
            <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                <img src={mouse_next_up ? next_select : next} 
                    onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                            cursor: 'pointer'}}
                    onClick={() => next_compras()}/>
            </div>
        </div>
        {
            lista_grid_compras && lista_grid_compras.length > 0 && view_producto === 'grid' ? (
                lista_grid_compras.map ((producto, numprod) => {
                    return (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            {
                                compras [(2 * numprod)] ? (
                                    <div style={{width: '48%', height: 'auto'}}>
                                        <CardProductoTablet producto={compras[(2 * numprod)]} key={(2 * numprod)} index={(2 * numprod)} proporcional={proporcional} view_producto={view_producto}/>
                                    </div>
                                ) : (
                                    <div style={{width: '48%', height: 'auto'}}/>
                                )
                            }
                            {
                                compras [((2 * numprod) + 1)] ? (
                                    <div style={{width: '48%', height: 'auto'}}>
                                        <CardProductoTablet producto={compras[((2 * numprod) + 1)]} key={((2 * numprod) + 1)} index={((2 * numprod) + 1)} proporcional={proporcional} view_producto={view_producto}/>
                                    </div>
                                ) : (
                                    <div style={{width: '48%', height: 'auto'}}/>
                                )
                            }
                        </div>
                    )
                })
            ) : 
                lista_compras && lista_compras.length > 0 && view_producto === 'lista' ? (
                    lista_compras.map ((producto, numprod) => {
                        return (
                            <CardProductoTablet producto={producto} key={numprod} index={numprod} proporcional={proporcional} view_producto={view_producto}/>
                        )
                    })
            ) : null
        }            
        <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                marginTop: view_producto === 'grid' ? 0 : 16 / proporcional
        }}>
            <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                <img src={mouse_preview_down ? preview_select : preview} 
                    onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                            cursor: 'pointer'}}
                    onClick={() => {previous_compras(); window.scrollTo(0, 0)}}/>
            </div>
            <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                <img src={mouse_next_down ? next_select : next} 
                    onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                            cursor: 'pointer'}}
                    onClick={() => {next_compras(); window.scrollTo(0, 0)}}/>
            </div>
        </div>
    </div>
  )
}
