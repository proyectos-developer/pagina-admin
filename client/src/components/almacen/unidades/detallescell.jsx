import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {unidadesdata} from '../../../redux/slice/unidadesdata'
import { set_data_unidad } from '../../../redux/actions/data'
import { unidadesConstants } from '../../../uri/unidades-constants'

export default function DetallesUnidadCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const id_unidad = location.pathname.split ('/')[6]
    const [unidad, setUnidad] = useState ('')
    const [medida, setMedida] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [eunidad, setEUnidad] = useState (false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_unidad, get_unidad} = useSelector(({unidades_data}) => unidades_data)
    const {data_unidad, data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_unidad.unidad === undefined){
            dispatch(unidadesdata(unidadesConstants(id_unidad, 0, 0, 0, 0, 16, {}, false).get_unidad))
        }else{
            setUnidad(data_unidad.unidad)
            setMedida(data_unidad.medida)
            setDescripcion(data_unidad.descripcion)
        }
    }, [])

    useEffect(() => {
        if (get_unidad && get_unidad.success === true && get_unidad.unidad){
            setUnidad(get_unidad.unidad.unidad)
            setMedida(get_unidad.unidad.medida)
            setDescripcion(get_unidad.unidad.descripcion)
            setEditarInformacion(false)
            dispatch(unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 0, {}, true).get_unidad))
        }
    }, [get_unidad])

    useEffect(() => {
        if (update_unidad && update_unidad.success === true && update_unidad.unidad){
            dispatch(unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 0, {}, true).update_unidad))
            setEditarInformacion(false)
        }
    }, [update_unidad])

    const volver_a_lista = () => {
        dispatch(set_data_unidad({}))
        navigate ('/panel/almacen/unidades')
    }
    
    const actualizar_data_unidad = () => {
        if (unidad === ''){
            setEUnidad(unidad === '' ? true : false)
        }else{
            setEUnidad(false)
            const data_nuevo = {
                unidad: unidad,
                medida: medida,
                descripcion: descripcion,
            }
            dispatch (unidadesdata(unidadesConstants(id_unidad, 0, 0, 0, 0, 16, data_nuevo, false).update_unidad))
        }
    }

    const cancelar_edicion_datos = () => {
        dispatch (unidadesdata(unidadesConstants(id_unidad, 0, 0, 0, 0, 0, {}, false).get_unidad))
    }

    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                            onClick={() => navigate ('/panel')}>
                        Inicio 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/almacen')}>
                        almacén
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / 
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/almacen/unidades')}>
                        unidades
                    </p>
                </div>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                        / unidad
                    </p>
                    <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                            fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                        marginRight: 10 / proporcional}}>
                        / {unidad}
                    </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                id='unidad'
                                value={unidad}
                                className='form-control rounded'
                                onChange={(event) => setUnidad (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eunidad ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre unidad'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                id='medida'
                                value={medida}
                                className='form-control rounded'
                                onChange={(event) => setMedida (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eunidad ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Símbolo'/>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <textarea
                            disabled={!editar_informacion}
                            type='default' 
                            rows={4}
                            id='descripcion'
                            value={descripcion}
                            className='form-control rounded'
                            onChange={(event) => setDescripcion (event.target.value)}
                            style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: 500 - descripcion.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='descripcion'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                        </div>
                    </div>
                    {
                        editar_informacion ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                    onClick={() => cancelar_edicion_datos()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                    onClick={() => actualizar_data_unidad()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                    onClick={() => volver_a_lista()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Volver
                                    </p>
                                </div>
                                <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                    onClick={() => setEditarInformacion(true)}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Editar datos
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
