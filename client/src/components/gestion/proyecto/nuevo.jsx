import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../redux/slice/gestionproyectosdata'
import {gestionproyectosConstants} from '../../../uri/gestionproyectos-constants'
import {negociosdata} from '../../../redux/slice/negociosdata'
import { negociosConstants } from '../../../uri/negocios-constants'

import save from '../../../assets/iconos/comun/save_v2.png'
import save_select from '../../../assets/iconos/comun/save_v1.png'
import cross from '../../../assets/iconos/comun/cross_v2.png'
import cross_select from '../../../assets/iconos/comun/cross_v1.png'

export default function NuevaGestionProyecto ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const selectTipoMoneda = useRef(null)
    const selectEstadoProyecto = useRef(null)
    const selectCliente = useRef(null)

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
    const [eestado_proyecto, setEEstadoProyecto] = useState (false)
    const [eprioridad, setEPrioridad] = useState(false)

    const [nuevo_cliente, setNuevoCliente] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_save, setBotonSave] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const [lista_negocios, setListaNegocios] = useState([])

    const {new_informe_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {get_negocios_filter, new_negocio} = useSelector(({negocios_data}) => negocios_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 100, {}, false).get_negocios_filter))
    }, [])

    useEffect(() => {
        if (get_negocios_filter && get_negocios_filter.success === true && get_negocios_filter.negocios){
            setListaNegocios(get_negocios_filter.negocios)
            dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, true).get_negocios_filter))
        }
    }, [get_negocios_filter])

    useEffect(() => {
        if (new_informe_proyecto && new_informe_proyecto.success === true && new_informe_proyecto.gestion_proyecto){
            setListaNegocios([])
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_informe_proyecto))
            resetear_data()
        }
    }, [new_informe_proyecto])

    useEffect(() => {
        if (new_negocio && new_negocio.success === true && new_negocio.negocio){
            setIdCliente(new_negocio.negocio.id)
            setCliente(new_negocio.negocio.nombre_negocio)
            setNuevoCliente(false)
            dispatch (negociosdata(negociosConstants(0, 0, 0, 0, 0, 100, {}, false).new_negocio))
        }
    }, [new_negocio])

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

    const resetear_data = () => {
        setNombreProyecto('')
        setDescripcion('')
        setFechaInicio('')
        setFechaFinalizacion('')
        setEstadoProyecto('')
        setPrioridad('')
        setPresupuestoProyecto('')
        setMoneda('')
        setCliente('')
        setIdCliente('')
        if (selectTipoMoneda.current){
            selectTipoMoneda.current.value = '0'
        }
        if (selectEstadoProyecto.current){
            selectEstadoProyecto.current.value = '0'
        }
        if (selectCliente.current){
            selectCliente.current.value = '0'
        }
    }

    const volver_a_lista = () => {
        resetear_data()
        navigate ('/panel/gestion-proyectos')
    }

    const guardar_proyecto = () => {
        if (nombre_proyecto === '' || fecha_inicio === '' || /**estado_proyecto === '' ||**/ prioridad === ''){
            setENombreProyecto(nombre_proyecto === '' ? true : false)
            setEFechaInicio(fecha_inicio === '' ? true : false)
            setEEstadoProyecto(estado_proyecto === '' ? true : false)
            setEPrioridad(prioridad === '' ? true : false)
        }else{
            setENombreProyecto(false)
            setEFechaInicio(false)
            setEEstadoProyecto(false)
            setEPrioridad(false)
            const data_nuevo = {
              nombre_proyecto: nombre_proyecto,
              descripcion: descripcion,
              fecha_inicio: fecha_inicio,
              fecha_finalizacion: fecha_finalizacion,
              estado_proyecto: estado_proyecto,
              prioridad: prioridad,
              presupuesto_proyecto: presupuesto_proyecto,
              moneda: moneda,
              id_cliente: id_cliente
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_informe_proyecto))
        }
    }
    
    useEffect(() => {
        return (() => {
            setListaNegocios([])
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 16, {}, true).get_tipo_proyectos_negocios))
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '80%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Crear nuevo proyecto
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '80%', height: '100%'}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Nombre proyecto
                            </span>
                            <input 
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
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Cliente
                            </span>
                            {
                                nuevo_cliente ? (
                                    <div className='d-flex' style={{width: '100%', height: 50 / proporcional, border: '1px solid #007BFF'}}>
                                        <input 
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
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Descripción
                        </span>
                        <textarea 
                            id='descripcion'
                            type='default'
                            className='form-control rounded'
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
                            style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Descripción'/>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Fecha inicio
                            </span>
                            <input 
                                id='fecha_inicio'
                                type='date'
                                className='form-control rounded'
                                value={fecha_inicio}
                                onChange={(event) => setFechaInicio(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: efecha_inicio ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Fecha inicio'/>
                        </div>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Fecha finalización
                            </span>
                            <input 
                                id='fecha_finalizacion'
                                type='date'
                                className='form-control rounded'
                                value={fecha_finalizacion}
                                onChange={(event) => setFechaFinalizacion(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Fecha finalización'/>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Estado proyecto
                            </span>
                            <select 
                                ref={selectTipoMoneda}
                                id='estado_proyecto'
                                className='form-select rounded'
                                onChange={(event) => seleccionar_estado_proyecto (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eestado_proyecto ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Seleccionar estado proyecto</option>     
                            </select>
                        </div>
                        <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Moneda
                            </span>
                            <select 
                                ref={selectTipoMoneda}
                                id='moneda'
                                className='form-select rounded'
                                onChange={(event) => seleccionar_moneda (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Seleccionar moneda</option>     
                            </select>
                        </div>
                        <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Presupuesto
                            </span>
                            <input 
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
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Prioridad
                        </span>
                        <input 
                            id='prioridad'
                            type='number'
                            className='form-control rounded'
                            value={prioridad}
                            onChange={(event) => setPrioridad(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eprioridad ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Prioridad'/>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                            onClick={() => guardar_proyecto()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Guardar datos
                            </p>
                        </div>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => volver_a_lista()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
