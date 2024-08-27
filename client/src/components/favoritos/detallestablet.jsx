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
import reset_v2 from '../../assets/iconos/comun/reset_v2.png'
import reset_v1 from '../../assets/iconos/comun/reset_v1.png'

import CardClienteTablet from './card/clientetablet.jsx'
import {favoritosdata} from '../../redux/slice/favoritosdata.js'
import { favoritosConstants } from '../../uri/favoritos-constants.js'
import { useLocation } from 'react-router-dom'

export default function DetallesProductoFavoritoTablet({proporcional}) {

    const location = useLocation()
  const dispatch = useDispatch()

  const [view_favorito, setViewFavorito] = useState ('grid')
  const [begin, setBegin] = useState(0)
  const [amount, setAmount] = useState(16)

  const [id_producto, setIdProducto] = useState('')
  const [nombre_producto, setNombreProducto] = useState('')

  const [lista_grid_favoritos, setListaGridFavoritos] = useState ([])
  const [lista_favoritos, setListaFavoritos] = useState ([])
  const [total_favoritos, setTotalFavoritos] = useState(0)
  const [favoritos, setFavoritos] = useState ([])

  const [boton_reset, setBotonReset] = useState (false)
  const [mouse_next, setMouseNext] = useState(false)
  const [mouse_preview, setMousePreviewDown] = useState(false)

  const {get_clientes_producto_favorito_filter} = useSelector(({favoritos_data}) => favoritos_data)
  const {data_favoritos, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

  useEffect(() => {
    if (data_favoritos.producto === undefined){
        setIdProducto(location.pathname.split('/')[5])
        dispatch(favoritosdata(favoritosConstants(location.pathname.split('/')[5], 0, 0, 0, 0, 0, 0, 16, {}, false).get_clientes_producto_favorito_filter))
    }else{
      setIdProducto(data_favoritos.id_producto)
      setNombreProducto(data_favoritos.producto)
      dispatch(favoritosdata(favoritosConstants(data_favoritos.id_producto, 0, 0, 0, 0, 0, 0, 16, {}, false).get_clientes_producto_favorito_filter))
    }
  }, [data_favoritos])

  useEffect(() => {
    if (get_clientes_producto_favorito_filter && get_clientes_producto_favorito_filter.success === true &&
        get_clientes_producto_favorito_filter.favoritos){
            setNombreProducto(get_clientes_producto_favorito_filter.favoritos[0].producto)
          dividir_nro_columnas(get_clientes_producto_favorito_filter)          
    }
  }, [get_clientes_producto_favorito_filter])

  const next_favoritos = () => {
      if (begin + amount > total_favoritos){

      }else{
          setBegin (begin + amount)
          dispatch (favoritosdata(favoritosConstants(id_producto, 0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_clientes_producto_favorito_filter))
      }
  }

  const previous_favoritos = () => {
      if (begin - amount < 0){
          
      }else{
          setBegin (begin - amount)
          dispatch (favoritosdata(favoritosConstants(id_producto, 0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_clientes_producto_favorito_filter))
      }
  }

  const dividir_nro_columnas = (favoritos_data) => {
      if (favoritos_data.total_favoritos){setTotalFavoritos(favoritos_data.total_favoritos)}
      let data = favoritos_data.favoritos.length
      let lista = []
      let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
      for (let count = 0; count < cuenta; count ++){
          lista.push ({num: `${count + 1}`})
      }
      setFavoritos (favoritos_data.favoritos)
      setListaGridFavoritos (lista)
      setListaFavoritos (favoritos_data.favoritos)
  }

  const resetear_data = () => {
    setBegin(0)
    setListaFavoritos([])
    setListaGridFavoritos([])
    setFavoritos([])
    dispatch(favoritosdata(favoritosConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_clientes_producto_favorito_filter))
  }

  useEffect(() => {
      return () => {
          setListaGridFavoritos([])
          setListaFavoritos ([])
          setFavoritos([])
          dispatch(favoritosdata(favoritosConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_clientes_producto_favorito_filter))
      }
  },[])

  return (
    <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
        paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
        <div className='' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    color: '#4A4A4A'}}>Clientes agregaron a favorito <strong>{nombre_producto}<br/></strong>
                    <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                        {`mostrando del ${begin} al 
                            ${get_clientes_producto_favorito_filter && get_clientes_producto_favorito_filter.favoritos ? begin + get_clientes_producto_favorito_filter.favoritos.length : 0} de ${total_favoritos}`}
                    </span>
                </h2>
            </div>
            <div className='d-flex justify-content-end' style={{width: '20%', height: 'auto'}}>
                <img src={view_favorito === 'lista' ? view_list_v1 : view_list_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                        marginRight: 10 / proporcional, cursor: 'pointer'
                    }} onClick={() => setViewFavorito('lista')}/>
                <img src={view_favorito === 'grid' || view_favorito === '' ? view_grid_v1 : view_grid_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                        cursor: 'pointer', marginRight: 10 / proporcional
                    }} onClick={() => setViewFavorito('grid')}/>
                <img src={boton_reset ? reset_v1 : reset_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                        cursor: 'pointer'
                    }} onClick={() => resetear_data()}
                    onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
            </div>
        </div>
        {
            lista_grid_favoritos && lista_grid_favoritos.length > 0 && view_favorito === 'grid' ? (
                lista_grid_favoritos.map ((favorito, numfav) => {
                    return (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            {
                                favoritos [(2 * numfav)] ? (
                                    <div style={{width: '48%', height: 'auto'}}>
                                        <CardClienteTablet favorito={favoritos[(2 * numfav)]} key={(2 * numfav)} index={(2 * numfav)} proporcional={proporcional} view_favorito={view_favorito}/>
                                    </div>
                                ) : (
                                    <div style={{width: '48%', height: 'auto'}}/>
                                )
                            }
                            {
                                favoritos [((2 * numfav) + 1)] ? (
                                    <div style={{width: '48%', height: 'auto'}}>
                                        <CardClienteTablet favorito={favoritos[((2 * numfav) + 1)]} key={((2 * numfav) + 1)} index={((2 * numfav) + 1)} proporcional={proporcional} view_favorito={view_favorito}/>
                                    </div>
                                ) : (
                                    <div style={{width: '48%', height: 'auto'}}/>
                                )
                            }
                        </div>
                    )
                })
            ) : 
                lista_favoritos && lista_favoritos.length > 0 && view_favorito === 'lista' ? (
                    lista_favoritos.map ((favorito, numfav) => {
                        return (
                            <CardClienteTablet favorito={favorito} key={numfav} index={numfav} proporcional={proporcional} view_favorito={view_favorito}/>
                        )
                    })
            ) : null
        }       
        <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                marginTop: view_favorito === 'grid' || view_favorito === '' ? 0 : 16 / proporcional
        }}>
            <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                {
                    begin !== 0 ? (
                        <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                            onClick={() => {previous_favoritos(); window.scrollTo(0, 0)}}>
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
                    begin + 16 >= total_favoritos ? ( 
                        null
                    ) : (
                        <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                            onClick={() => {next_favoritos(); window.scrollTo(0, 0)}}>
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
    </div>
  )
}
