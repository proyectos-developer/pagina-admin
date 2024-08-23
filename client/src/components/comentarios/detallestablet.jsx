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

import CardClienteTablet from './card/clientetablet.jsx'
import {calificacionesdata} from '../../redux/slice/calificacionesdata.js'
import { calificacionesConstants } from '../../uri/calificaciones-constants.js'

export default function DetallesComentariosProductoTablet({proporcional}) {

  const dispatch = useDispatch()

  const [view_calificacion, setViewCalificacion] = useState ('grid')
  const [begin, setBegin] = useState(0)
  const [amount, setAmount] = useState(16)

  const [id_producto, setIdProducto] = useState('')
  const [nombre_producto, setNombreProducto] = useState('')

  const [lista_grid_calificaciones, setListaGridCalificaciones] = useState ([])
  const [lista_calificaciones, setListaCalificaciones] = useState ([])
  const [total_calificaciones, setTotalCalificaciones] = useState(0)
  const [calificaciones, setCalificaciones] = useState ([])

  const [mouse_next_up, setMouseNextUp] = useState(false)
  const [mouse_preview_up, setMousePreviewUp] = useState(false)
  const [mouse_next_down, setMouseNextDown] = useState(false)
  const [mouse_preview_down, setMousePreviewDown] = useState(false)

  const {get_clientes_producto_calificacion_filter} = useSelector(({calificaciones_data}) => calificaciones_data)
  const {data_calificaciones, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

  useEffect(() => {
      setIdProducto(data_calificaciones.id_producto)
      setNombreProducto(data_calificaciones.producto)
      dispatch(calificacionesdata(calificacionesConstants(data_calificaciones.id_producto, 0, 0, 0, 0, 0, 0, 16, {}, false).get_clientes_producto_calificacion_filter))
  }, [data_calificaciones])

  useEffect(() => {
    if (get_clientes_producto_calificacion_filter && get_clientes_producto_calificacion_filter.success === true &&
        get_clientes_producto_calificacion_filter.calificaciones){
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
      let data = calificaciones_data.calificaciones.length
      let lista = []
      let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
      for (let count = 0; count < cuenta; count ++){
          lista.push ({num: `${count + 1}`})
      }
      setCalificaciones (calificaciones_data.calificaciones)
      setListaGridCalificaciones (lista)
      setListaCalificaciones (calificaciones_data.calificaciones)
  }

  useEffect(() => {
      return () => {
          setListaGridCalificaciones([])
          setListaCalificaciones ([])
          setCalificaciones([])
      }
  },[])

  return (
    <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
        paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
            <div style={{width: '80%', height: 'auto'}}>
                <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                    color: '#4A4A4A'}}>Clientes calificaron <strong>{nombre_producto}</strong>
                    <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)', marginLeft: 10 / proporcional}}>
                        {`mostrando del ${begin} al 
                            ${get_clientes_producto_calificacion_filter && get_clientes_producto_calificacion_filter.calificaciones ? begin + get_clientes_producto_calificacion_filter.calificaciones.length : 0} de ${total_calificaciones}`}
                    </span>
                </h2>
            </div>
            <div className='d-flex justify-content-end' style={{width: '20%', height: 'auto'}}>
                <img src={view_calificacion === 'lista' ? view_list_v1 : view_list_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 4 / proporcional,
                        marginRight: 5 / proporcional, cursor: 'pointer'
                    }} onClick={() => setViewCalificacion('lista')}/>
                <img src={view_calificacion === 'grid' ? view_grid_v1 : view_grid_v2} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 3 / proporcional,
                        cursor: 'pointer'
                    }} onClick={() => setViewCalificacion('grid')}/>
            </div>
        </div>
        <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
            <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                <img src={mouse_preview_up ? preview_select : preview}
                    onMouseOver={() => setMousePreviewUp(true)} onMouseLeave={() => setMousePreviewUp(false)}
                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                            cursor: 'pointer'}}
                    onClick={() => previous_calificaciones()}/>
            </div>
            <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                <img src={mouse_next_up ? next_select : next} 
                    onMouseOver={() => setMouseNextUp(true)} onMouseLeave={() => setMouseNextUp(false)}
                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                            cursor: 'pointer'}}
                    onClick={() => next_calificaciones()}/>
            </div>
        </div>
        {
            lista_grid_calificaciones && lista_grid_calificaciones.length > 0 && view_calificacion === 'grid' ? (
                lista_grid_calificaciones.map ((calificacion, numcal) => {
                    return (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            {
                                calificaciones [(2 * numcal)] ? (
                                    <div style={{width: '48%', height: 'auto'}}>
                                        <CardClienteTablet calificacion={calificaciones[(2 * numcal)]} key={(2 * numcal)} index={(2 * numcal)} proporcional={proporcional} view_calificacion={view_calificacion}/>
                                    </div>
                                ) : (
                                    <div style={{width: '48%', height: 'auto'}}/>
                                )
                            }
                            {
                                calificaciones [((2 * numcal) + 1)] ? (
                                    <div style={{width: '48%', height: 'auto'}}>
                                        <CardClienteTablet calificacion={calificaciones[((2 * numcal) + 1)]} key={((2 * numcal) + 1)} index={((2 * numcal) + 1)} proporcional={proporcional} view_calificacion={view_calificacion}/>
                                    </div>
                                ) : (
                                    <div style={{width: '48%', height: 'auto'}}/>
                                )
                            }
                        </div>
                    )
                })
            ) : 
                lista_calificaciones && lista_calificaciones.length > 0 && view_calificacion === 'lista' ? (
                    lista_calificaciones.map ((calificacion, numcal) => {
                        return (
                            <CardClienteTablet calificacion={calificacion} key={numcal} index={numcal} proporcional={proporcional} view_calificacion={view_calificacion}/>
                        )
                    })
            ) : null
        }            
        <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional,
                marginTop: view_calificacion === 'grid' ? 0 : 16 / proporcional
        }}>
            <div className='d-flex justify-content-start' style={{width: '48%', height: 40 / proporcional}}>
                <img src={mouse_preview_down ? preview_select : preview} 
                    onMouseOver={() => setMousePreviewDown(true)} onMouseLeave={() => setMousePreviewDown(false)}
                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                            cursor: 'pointer'}}
                    onClick={() => {previous_calificaciones(); window.scrollTo(0, 0)}}/>
            </div>
            <div className='d-flex justify-content-end' style={{width: '48%', height: 40 / proporcional}}>
                <img src={mouse_next_down ? next_select : next} 
                    onMouseOver={() => setMouseNextDown(true)} onMouseLeave={() => setMouseNextDown(false)}
                    style={{width: 40 / proporcional, height: 40 / proporcional, padding: 2 / proporcional,
                            cursor: 'pointer'}}
                    onClick={() => {next_calificaciones(); window.scrollTo(0, 0)}}/>
            </div>
        </div>
    </div>
  )
}
