import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {gestionproyectosdata} from '../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants'

export default function RiesgosProyectoTablet({proporcional, proyecto}) {

    const dispatch = useDispatch()

    const [id_proyecto, setIdProyecto] = useState(proyecto.id)
    const [riesgo_proyecto, setRiesgoProyecto] = useState('')
    const [mitigacion_riesgo, setMitigacionRiesgo] = useState('')

    const [eriesgo_proyecto, setERiesgoProyecto] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)

    const {new_riesgo_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)

    useEffect(() => {
        if (new_riesgo_proyecto && new_riesgo_proyecto.success === true && new_riesgo_proyecto.riesgo_proyecto){
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_riesgo_proyecto])

    const resetear_data = () => {
        setRiesgoProyecto('')
        setMitigacionRiesgo('')
    }

    const guardar_riesgo = () => {
        if (riesgo_proyecto === ''){
            setERiesgoProyecto(riesgo_proyecto === '' ? true : false)
        }else{
            setERiesgoProyecto(false)
            const data_documento = {
                id_proyecto: proyecto.id,
                riesgo: riesgo_proyecto,
                mitigacion: mitigacion_riesgo,
            }
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_documento, false).new_riesgo_proyecto))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4a4a4a'}}>Nuevo riesgo: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}></span>
                    </h2>
                </div>
            </div>
            <div style={{width: '100%', height: 'auto'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Riesgo
                    </span>
                    <textarea 
                        id='riesgo_proyecto'
                        type='default'
                        rows={3}
                        className='form-control rounded'
                        value={riesgo_proyecto}
                        onChange={(event) => setRiesgoProyecto(event.target.value)}
                        style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: eriesgo_proyecto ? '1px solid red' : '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Riesgo del proyecto'/>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif'}}>
                        Mitigación del riesgo
                    </span>
                    <textarea 
                        id='mitigacion_riesgo'
                        type='default'
                        rows={4}
                        className='form-control rounded'
                        value={mitigacion_riesgo}
                        onChange={(event) => setMitigacionRiesgo(event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Mitigación del riesgo'/>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_riesgo()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar riesgo
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
