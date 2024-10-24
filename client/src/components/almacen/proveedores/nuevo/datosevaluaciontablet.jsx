import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_proveedor_evaluacion, set_datos_paso_proveedor} from '../../../../redux/actions/data'

export default function DatosEvaluacionTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    
    const [calificacion, setCalificacion] = useState('')
    const [comentarios, setComentarios] = useState('')
    const [ultima_revision, setUltimaRevision] = useState('')

    const {data_proveedor_evaluacion} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_proveedor_evaluacion && data_proveedor_evaluacion.calificacion){
            setCalificacion(data_proveedor_evaluacion.calificacion)
            setComentarios(data_proveedor_evaluacion.comentarios)
            setUltimaRevision(data_proveedor_evaluacion.ultima_revision)
        }else{
            setCalificacion('')
            setComentarios('')
            setUltimaRevision('')
        }
    }, [])

    const continuar_datos_financiera = () => {
        dispatch (set_data_proveedor_evaluacion({
                calificacion: calificacion,
                comentarios: comentarios,
                ultima_revision: ultima_revision
        }))
        dispatch (set_datos_paso_proveedor('adicional'))
    }

    const volver_a_lista = () => {
        dispatch (set_data_proveedor_evaluacion({
                calificacion: calificacion,
                comentarios: comentarios,
                ultima_revision: ultima_revision
        }))
        dispatch (set_datos_paso_proveedor('general'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' style={{width: '48%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input 
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
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}/>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Volver
                        </p>
                    </div>
                    <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                        onClick={() => continuar_datos_financiera()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Continuar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
