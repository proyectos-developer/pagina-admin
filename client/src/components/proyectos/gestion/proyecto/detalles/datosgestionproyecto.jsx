import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_datos_paso_gestion_proyectos} 
    from '../../../../../redux/actions/data'
import { useLocation, useNavigate } from 'react-router-dom'
import { negociosdata } from '../../../../../redux/slice/negociosdata'
import { negociosConstants } from '../../../../../uri/negocios-constants'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import axios from 'axios'
import { constantes } from '../../../../../uri/constantes'

export default function DatosGestionProyecto ({proporcional}) {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectTipoMoneda = useRef(null)
    const selectEstadoProyecto = useRef(null)
    const selectCliente = useRef(null)
    const selectRefPrioridad = useRef(null)

    const id_proyecto = location.pathname.split ('/')[6]
    const [nombre_proyecto, setNombreProyecto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha_inicio, setFechaInicio] = useState('')
    const [fecha_finalizacion, setFechaFinalizacion] = useState ('')
    const [estado_proyecto, setEstadoProyecto] = useState ('')
    const [prioridad, setPrioridad] = useState('')
    const [presupuesto_proyecto, setPresupuestoProyecto] = useState('')
    const [moneda, setMoneda] = useState ('')
    const [cliente, setCliente] = useState('')
    const [id_cliente, setIdCliente] = useState('')

    const [enombre_proyecto, setENombreProyecto] = useState(false)
    const [efecha_inicio, setEFechaInicio] = useState(false)

    const [nuevo_cliente, setNuevoCliente] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)

    const [boton_save, setBotonSave] = useState(false)

    const [boton_cancelar_edicion, setBotonCancelarEdicion] = useState(false)
    const [boton_actualizar, setBotonActaulizar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [lista_negocios, setListaNegocios] = useState([])

    const {get_gestion_proyecto, update_gestion_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {get_negocios_filter, new_negocio} = useSelector(({negocios_data}) => negocios_data)
    const {data_editable, data_gestion_informacion} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_gestion_informacion && data_gestion_informacion.nombre_proyecto){
            setNombreProyecto(data_gestion_informacion.nombre_proyecto)
            setDescripcion(data_gestion_informacion.descripcion)
            setFechaInicio(data_gestion_informacion.fecha_inicio)
            setFechaFinalizacion(data_gestion_informacion.fecha_finalizacion)
            setEstadoProyecto(data_gestion_informacion.estado_proyecto)
            setPrioridad(data_gestion_informacion.prioridad)
            setPresupuestoProyecto(data_gestion_informacion.presupuesto_proyecto)
            setMoneda(data_gestion_informacion.moneda)
            setIdCliente(data_gestion_informacion.id_cliente)
            obtener_datos_cliente(data_gestion_informacion.id_cliente)
        }else{
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_gestion_proyecto))
        }
    }, [])

    useEffect(() => {
        if (get_gestion_proyecto && get_gestion_proyecto.success === true && get_gestion_proyecto.gestion_proyecto){
            setNombreProyecto(get_gestion_proyecto.gestion_proyecto.nombre_proyecto)
            setDescripcion(get_gestion_proyecto.gestion_proyecto.descripcion)
            setFechaInicio(get_gestion_proyecto.gestion_proyecto.fecha_inicio)
            setFechaFinalizacion(get_gestion_proyecto.gestion_proyecto.fecha_finalizacion)
            setEstadoProyecto(get_gestion_proyecto.gestion_proyecto.estado_proyecto)
            setPrioridad(get_gestion_proyecto.gestion_proyecto.prioridad)
            setPresupuestoProyecto(get_gestion_proyecto.gestion_proyecto.presupuesto_proyecto)
            setMoneda(get_gestion_proyecto.gestion_proyecto.moneda)
            setCliente(get_gestion_proyecto.gestion_proyecto.cliente)
            setIdCliente(get_gestion_proyecto.gestion_proyecto.id_cliente)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_gestion_proyecto))
            obtener_datos_cliente(get_gestion_proyecto.id_cliente)
        }
    }, [get_gestion_proyecto])

    useEffect(() => {
        if (update_gestion_proyecto && update_gestion_proyecto.success === true && update_gestion_proyecto.gestion_proyecto){
            setNombreProyecto(update_gestion_proyecto.gestion_proyecto.nombre_proyecto)
            setDescripcion(update_gestion_proyecto.gestion_proyecto.descripcion)
            setFechaInicio(update_gestion_proyecto.gestion_proyecto.fecha_inicio)
            setFechaFinalizacion(update_gestion_proyecto.gestion_proyecto.fecha_finalizacion)
            setEstadoProyecto(update_gestion_proyecto.gestion_proyecto.estado_proyecto)
            setPrioridad(update_gestion_proyecto.gestion_proyecto.prioridad)
            setPresupuestoProyecto(update_gestion_proyecto.gestion_proyecto.presupuesto_proyecto)
            setMoneda(update_gestion_proyecto.gestion_proyecto.moneda)
            setCliente(update_gestion_proyecto.gestion_proyecto.cliente)
            setIdCliente(update_gestion_proyecto.gestion_proyecto.id_cliente)
            obtener_datos_cliente(update_gestion_proyecto.gestion_proyecto.id_cliente)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_gestion_proyecto))
        }
    }, [update_gestion_proyecto])

    useEffect(() => {
        if (get_negocios_filter && get_negocios_filter.success === true && get_negocios_filter.negocios){
            setListaNegocios(get_negocios_filter.negocios)
            setEditarInformacion(true)
            dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, true).get_negocios_filter))
        }
    }, [get_negocios_filter])

    useEffect(() => {
        if (new_negocio && new_negocio.success === true && new_negocio.negocio){
            setIdCliente(new_negocio.negocio.id)
            setCliente(new_negocio.negocio.nombre_negocio)
            setNuevoCliente(false)
            dispatch (negociosdata(negociosConstants(0, 0, 0, 0, 0, 100, {}, false).new_negocio))
        }
    }, [new_negocio])

    const obtener_datos_cliente = (id) => {
        axios.get (`${constantes().url_principal[0].url}/negocio/${id}`)
            .then ((res) => {
                setCliente(res.data.negocio.nombre_negocio)
            }).catch ((err) => {

            })
    }

    const guardar_nuevo_cliente = () => {
        const data_cliente = {
            nombre_negocio: cliente,
            correo: '',
            nro_ruc: '',
            nro_telefono: '',
            nombre_contacto: '',
            url_logo: ''
        }
        dispatch (negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, data_cliente, false).new_negocio))
    }

    const seleccionar_cliente = (value) => {
      if (value !== '0' && value !== '1'){
        setIdCliente(value.split('-')[0])
        setCliente(value.split('-')[1])
      }else{  
        setNuevoCliente(true)
      }
    }

    const seleccionar_estado_proyecto = (value) => {
      if (value !== '0'){
        setEstadoProyecto(value)
      }else{  

      }
    }

    const seleccionar_moneda = (value) => {
      if (value !== '0'){
        setMoneda(value)
      }else{  

      }
    }

    const actualizar_datos_gestion = () => {
        if (nombre_proyecto === '' || fecha_inicio === '' || (500 - descripcion.length <= 0)){
            setENombreProyecto(nombre_proyecto === '' ? true : false)
            setEFechaInicio(fecha_inicio === '' ? true : false)
        }else{
            setENombreProyecto(false)
            setEFechaInicio(false)
            const data_nuevo = {
              nombre_proyecto: nombre_proyecto,
              descripcion: descripcion,
              fecha_inicio: fecha_inicio,
              fecha_finalizacion: fecha_finalizacion,
              estado_proyecto: estado_proyecto,
              prioridad: prioridad,
              presupuesto_proyecto: parseFloat(presupuesto_proyecto),
              moneda: moneda,
              id_cliente: parseInt(id_cliente)
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, data_nuevo, false).update_gestion_proyecto))
        }
    }

    const cancelar_edicion_gestion = () => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_gestion_proyecto))
    }

    const volver_a_lista = () => {
        dispatch (set_datos_paso_gestion_proyectos('gestion'))
        navigate ('/panel/proyectos/gestion-proyectos')
    }

    const editar_informacion_gestion = () => {
        dispatch (negociosdata(negociosConstants(0, 0, 0, 0, 0, 100, {}, false).get_negocios_filter))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input
                        disabled={!editar_informacion}
                        autoComplete='off' 
                        id='nombre_proyecto'
                        type='default'
                        className='form-control rounded'
                        value={nombre_proyecto}
                        onChange={(event) => setNombreProyecto(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: enombre_proyecto ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Nombre proyecto'/>
                </div>
                <div style={{width: '48%', height: 'auto'}}>
                    {
                        nuevo_cliente ? (
                            <div className='d-flex' style={{width: '100%', height: 50 / proporcional, border: '1px solid #007BFF'}}>
                                <input
                                    disabled={!editar_informacion}
                                    autoComplete='off' 
                                    type='default'
                                    id='cliente'
                                    className='form-control'
                                    value={cliente}
                                    onChange={(event) => setCliente(event.target.value)}
                                    style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                    placeholder='Nueva categoría'/>
                                <img src={boton_cancelar ? cross_select : cross} style={{width: 48 / proporcional, height: 48 / proporcional,
                                        padding: 12 / proporcional}} 
                                    onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                    onClick={() => {setNuevoCliente(false); setCliente('')}}/>
                                <img src={boton_save ? save_select : save} style={{width: 48 / proporcional, height: 48 / proporcional,
                                        padding: 12 / proporcional}} 
                                    onMouseOver={() => setBotonSave(true)} onMouseLeave={() => setBotonSave(false)}
                                    onClick={() => guardar_nuevo_cliente()}/>
                            </div>
                        ) : (
                            <select
                                disabled={!editar_informacion}
                                id='cliente'
                                ref={selectCliente}
                                className='form-select rounded'
                                onChange={(event) => seleccionar_cliente (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>{cliente === '' ? 'Seleccionar cliente' : cliente}</option>
                                <option value='1'>Crear nuevo cliente</option>
                                {
                                    lista_negocios && lista_negocios.length > 0 ? (
                                        lista_negocios.map ((negocio, index) => {
                                            return (
                                                <option key={index} value={negocio.id + '-' + negocio.nombre_negocio}>{negocio.nombre_negocio}</option>
                                            )
                                        })
                                    ) : null
                                }
                            </select>
                        )
                    }
                </div>
            </div>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <textarea
                    disabled={!editar_informacion} 
                    id='descripcion'
                    type='default'
                    rows={3}
                    className='form-control rounded'
                    value={descripcion}
                    onChange={(event) => setDescripcion(event.target.value)}
                    style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                            padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                    placeholder='Descripción del proyecto'/>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                    <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                </div>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' style={{width: '48%', height: 'auto', 
                        border: efecha_inicio ? '1px solid red' : '1px solid #007bff', marginBottom: 16 / proporcional,
                        background: !editar_informacion ? 'rgb(233, 236, 239)' : 'white'}}>
                    <div className='d-flex justify-content-start' style={{width: '38%', height: 50 / proporcional}}>
                        <p  style={{lineHeight: `${25 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, cursor: 'pointer',
                            padding: 12.5 / proporcional, paddingTop: 0, paddingBottom: 0}}><strong>Fecha <br/>inicio: </strong></p>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: '58%', height: 'auto'}}>
                        <input
                            disabled={!editar_informacion}
                            autoComplete='off'
                            type='date'
                            id='fecha_inicio'
                            value={fecha_inicio}
                            className='form-control rounded border-0'
                            onChange={(event) => setFechaInicio(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    }}
                            placeholder='Fecha inicio'/>
                    </div>  
                </div>  
                <div className='d-flex justify-content-between' style={{width: '48%', height: 'auto', 
                        border: '1px solid #007bff', marginBottom: 16 / proporcional,
                        background: !editar_informacion ? 'rgb(233, 236, 239)' : 'white'}}>
                    <div className='d-flex justify-content-start' style={{width: '38%', height: 50 / proporcional}}>
                        <p  style={{lineHeight: `${25 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, cursor: 'pointer',
                            padding: 12.5 / proporcional, paddingTop: 0, paddingBottom: 0}}><strong>Fecha <br/>asistencia: </strong></p>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: '58%', height: 'auto'}}>
                        <input
                            disabled={!editar_informacion}
                            autoComplete='off'
                            type='date'
                            id='fecha_finalizacion'
                            value={fecha_finalizacion}
                            className='form-control rounded border-0'
                            onChange={(event) => setFechaFinalizacion(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                    }}
                            placeholder='Fecha asistencia'/>
                    </div>  
                </div>  
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <select
                        disabled={!editar_informacion} 
                        ref={selectEstadoProyecto}
                        id='estado_proyecto'
                        className='form-select rounded'
                        onChange={(event) => seleccionar_estado_proyecto (event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional}}>
                        <option value='0'>Seleccionar estado proyecto</option>
                        <option value='Planificación'>Planificación</option>
                        <option value='Espera'>Espera</option>
                        <option value='Aprobado'>Aprobado</option>
                        <option value='En progreso'>En progreso</option>
                        <option value='En revisión'>En revisión</option>
                        <option value='En prueba'>En prueba</option>
                        <option value='Cancelado'>Cancelado</option>
                        <option value='Pospuesto'>Pospuesto</option>
                        <option value='Completado'>Completado</option>
                    </select>
                </div>
                <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <select
                        disabled={!editar_informacion} 
                        ref={selectTipoMoneda}
                        id='moneda'
                        className='form-select rounded'
                        onChange={(event) => seleccionar_moneda (event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional}}>
                        <option value='0'>Seleccionar moneda</option>   
                        <option value='Sol peruano'>Sol peruano</option>
                        <option value='Dólar americano'>Dólar americano</option>  
                    </select>
                </div>
                <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input
                        disabled={!editar_informacion}
                        autoComplete='off' 
                        id='presupuesto_proyecto'
                        type='number'
                        className='form-control rounded'
                        value={presupuesto_proyecto}
                        onChange={(event) => setPresupuestoProyecto(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Presupuesto'/>
                </div>
            </div>
            <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                <select
                    disabled={!editar_informacion} 
                    ref={selectRefPrioridad}
                    id='moneda'
                    className='form-select rounded'
                    onChange={(event) => seleccionar_moneda (event.target.value)}
                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                            padding: 10 / proporcional}}>
                    <option value='0'>Seleccionar prioridad</option>   
                    <option value='Muy alta'>Muy alta</option>
                    <option value='Alta'>Alta</option>
                    <option value='Media'>Media</option>  
                    <option value='Baja'>Baja</option>    
                    <option value='Sin prioridad'>Sin prioridad</option>  
                </select>
            </div>
            {
                editar_informacion ? ( 
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar_edicion ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonCancelarEdicion(true)} onMouseLeave={() => setBotonCancelarEdicion(false)}
                            onClick={() => cancelar_edicion_gestion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActaulizar(true)} onMouseLeave={() => setBotonActaulizar(false)}
                            onClick={() => actualizar_datos_gestion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar datos
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => volver_a_lista()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                        <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                            onClick={() => editar_informacion_gestion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Editar
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
