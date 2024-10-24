import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation, useNavigate } from 'react-router-dom'
import { proveedoresdata } from '../../../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../../../uri/proveedores-constants'

export default function DatosEvaluacionCell ({proporcional}) {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCasncelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    
    const id_proveedor = location.pathname.split ('/')[6]
    const [calificacion, setCalificacion] = useState('')
    const [comentarios, setComentarios] = useState('')
    const [ultima_revision, setUltimaRevision] = useState('')

    const {data_proveedor, data_editable} = useSelector(({data_actions}) => data_actions)
    const {get_proveedor_evaluacion, update_proveedor_evaluacion} = 
        useSelector(({proveedores_data}) => proveedores_data)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_proveedor && data_proveedor.calificacion){
            setCalificacion(data_proveedor.calificacion)
            setComentarios(data_proveedor.comentarios)
            setUltimaRevision(data_proveedor.ultima_revision)
        }else{
            dispatch (proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_evaluacion))
        }
    }, [])
    
    useEffect(() => {
        if (get_proveedor_evaluacion && get_proveedor_evaluacion.success === true && get_proveedor_evaluacion.proveedor_evaluacion){
            setCalificacion(get_proveedor_evaluacion.proveedor_evaluacion.calificacion)
            setComentarios(get_proveedor_evaluacion.proveedor_evaluacion.comentarios)
            setUltimaRevision(get_proveedor_evaluacion.proveedor_evaluacion.ultima_revision)
            setEditarInformacion(false)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).get_proveedor_evaluacion))
        }
    }, [get_proveedor_evaluacion])
    
    useEffect(() => {
        if (update_proveedor_evaluacion && update_proveedor_evaluacion.success === true && update_proveedor_evaluacion.proveedor_evaluacion){
            setCalificacion(update_proveedor_evaluacion.proveedor_evaluacion.calificacion)
            setComentarios(update_proveedor_evaluacion.proveedor_evaluacion.comentarios)
            setUltimaRevision(update_proveedor_evaluacion.proveedor_evaluacion.ultima_revision)
            setEditarInformacion(false)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).update_proveedor_evaluacion))
        }
    }, [update_proveedor_evaluacion])

    const actualiar_datos_proveedor = () => {
        const data_update = {
            calificacion: calificacion,
            comentarios: comentarios,
            ultima_revision: ultima_revision,
        }
        dispatch (proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, data_update, false).update_proveedor_evaluacion))
    }

    const cancelar_edicion_datos = () => {
        dispatch(proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_evaluacion))
    }

    const volver_a_lista = () => {
        navigate ('/panel/almacen/proveedores')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='calificacion'
                            type='number'
                            className='form-control rounded'
                            value={calificacion}
                            onChange={(event) => setCalificacion(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Calificación'/>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='ultima_revision'
                            type='date'
                            className='form-control rounded'
                            value={ultima_revision}
                            onChange={(event) => setUltimaRevision(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Última revisión'/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea
                        disabled={!editar_informacion} 
                        id='comentarios'
                        type='default'
                        rows={4}
                        className='form-control rounded'
                        value={comentarios}
                        onChange={(event) => setComentarios(event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Comentarios'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 1000 - comentarios.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{1000 - comentarios.length}</p>
                    </div>
                </div>
                {
                    editar_informacion ? ( 
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                onMouseOver={() => setBotonCasncelar(true)} onMouseLeave={() => setBotonCasncelar(false)}
                                onClick={() => cancelar_edicion_datos()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualiar_datos_proveedor()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                onClick={() => volver_a_lista()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                onClick={() => {setEditarInformacion(true); window.scrollTo(0, 0)}}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Editar
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
