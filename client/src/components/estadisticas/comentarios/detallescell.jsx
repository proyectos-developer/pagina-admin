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

import CardCliente from './card/cliente.jsx'
import {calificacionesdata} from '../../../redux/slice/calificacionesdata.js'
import { calificacionesConstants } from '../../../uri/calificaciones-constants.js'
import { useLocation } from 'react-router-dom'

export default function DetallesComentariosProductoCell({proporcional}) {

    const location = useLocation()
  const dispatch = useDispatch()

  const [view_calificacion, setViewCalificacion] = useState ('grid')
  const [begin, setBegin] = useState(0)
  const [amount, setAmount] = useState(16)

  const [id_producto, setIdProducto] = useState('')
  const [nombre_producto, setNombreProducto] = useState('')

  const [lista_grid_calificaciones, setListaGridCalificaciones] = useState ([])
  const [lista_calificaciones, setListaCalificaciones] = useState ([])
  const [total_calificaciones, setTotalCalificaciones] = useState(0)

  const [boton_reset, setBotonReset] = useState (false)
  const [mouse_next, setMouseNext] = useState(false)
  const [mouse_preview, setMousePreviewDown] = useState(false)

  const {get_clientes_producto_calificacion_filter} = useSelector(({calificaciones_data}) => calificaciones_data)
  const {data_calificaciones, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

  useEffect(() => {
    if (data_calificaciones.producto === undefined){
        setIdProducto(location.pathname.split('/')[6])
        dispatch(calificacionesdata(calificacionesConstants(location.pathname.split('/')[6], 0, 0, 0, 0, 0, 0, 16, {}, false).get_clientes_producto_calificacion_filter))
    }else{
      setIdProducto(data_calificaciones.id_producto)
      setNombreProducto(data_calificaciones.producto)
      dispatch(calificacionesdata(calificacionesConstants(data_calificaciones.id_producto, 0, 0, 0, 0, 0, 0, 16, {}, false).get_clientes_producto_calificacion_filter))
    }
  }, [data_calificaciones])

  useEffect(() => {
    if (get_clientes_producto_calificacion_filter && get_clientes_producto_calificacion_filter.success === true &&
        get_clientes_producto_calificacion_filter.calificaciones){
            setNombreProducto(get_clientes_producto_calificacion_filter.calificaciones[0].producto)
          dividir_nro_columnas(get_clientes_producto_calificacion_filter)          
    }
  }, [get_clientes_producto_calificacion_filter])

  const next_calificaciones = () => {
      if (begin + amount > total_calificaciones){

      }else{
          setBegin (begin + amount)
          dispatch (calificacionesdata(calificacionesConstants(id_producto, 0, 0, 0, 0, 0, begin + amount, amount, {}, false).get_clientes_producto_calificacion_filter))
      }
  }

  const previous_calificaciones = () => {
      if (begin - amount < 0){
          
      }else{
          setBegin (begin - amount)
          dispatch (calificacionesdata(calificacionesConstants(id_producto, 0, 0, 0, 0, 0, begin - amount, amount, {}, false).get_clientes_producto_calificacion_filter))
      }
  }

  const dividir_nro_columnas = (calificaciones_data) => {
      if (calificaciones_data.total_calificaciones){setTotalCalificaciones(calificaciones_data.total_calificaciones)}
      setListaGridCalificaciones (calificaciones_data.calificaciones)
      setListaCalificaciones (calificaciones_data.calificaciones)
  }

  const resetear_data = () => {
    setBegin(0)
    setListaCalificaciones([])
    setListaGridCalificaciones([])
    setCalificaciones([])
    dispatch(calificacionesdata(calificacionesConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_clientes_producto_calificacion_filter))
  }

  useEffect(() => {
      return () => {
          setListaGridCalificaciones([])
          setListaCalificaciones ([])
          dispatch(calificacionesdata(calificacionesConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_clientes_producto_calificacion_filter))
      }
  },[])

  return (
    <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
        paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    color: '#4A4A4A'}}>Clientes calificaron <strong>{nombre_producto}</strong>
                    <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                        {`mostrando del ${begin} al 
                            ${get_clientes_producto_calificacion_filter && get_clientes_producto_calificacion_filter.calificaciones ? begin + get_clientes_producto_calificacion_filter.calificaciones.length : 0} de ${total_calificaciones}`}
                    </span>
                </h2>
            </div>
            <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                <img src={view_calificacion === 'lista' ? view_list_v1 : view_list_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                        marginRight: 5 / proporcional, cursor: 'pointer'
                    }} onClick={() => setViewCalificacion('lista')}/>
                <img src={view_calificacion === 'grid' ? view_grid_v1 : view_grid_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                        cursor: 'pointer'
                    }} onClick={() => setViewCalificacion('grid')}/>
                <img src={boton_reset ? reset_v1 : reset_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 0 / proporcional,
                        cursor: 'pointer'
                    }} onClick={() => resetear_data()}
                    onMouseOver={() => setBotonReset(true)} onMouseLeave={() => setBotonReset(false)}/>
            </div>
        </div>
        {
            lista_grid_calificaciones && lista_grid_calificaciones.length > 0 && view_calificacion === 'grid' ? (
                lista_grid_calificaciones.map ((calificacion, numcal) => {
                    return (
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <div style={{width: '90%', height: 'auto'}}>
                                <CardClienteCell calificacion={calificacion} key={numcal} index={numcal} proporcional={proporcional} view_calificacion={view_calificacion}/>
                            </div>
                        </div>
                    )
                })
            ) : 
                lista_calificaciones && lista_calificaciones.length > 0 && view_calificacion === 'lista' ? (
                    lista_calificaciones.map ((calificacion, numcal) => {
                        return (
                            <CardClienteCell calificacion={calificacion} key={numcal} index={numcal} proporcional={proporcional} view_calificacion={view_calificacion}/>
                        )
                    })
            ) : null
        }   
        <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                marginTop: view_calificacion === 'grid' || view_calificacion === '' ? 0 : 16 / proporcional
        }}>
            <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                {
                    begin !== 0 ? (
                        <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setMousePreview(true)} onMouseLeave={() => setMousePreview(false)}
                            onClick={() => {previous_calificaciones(); window.scrollTo(0, 0)}}>
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
                    begin + 16 >= total_calificaciones ? ( 
                        null
                    ) : (
                        <div style={{width: 'auto', height: 40 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setMouseNext(true)} onMouseLeave={() => setMouseNext(false)}
                            onClick={() => {next_calificaciones(); window.scrollTo(0, 0)}}>
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
