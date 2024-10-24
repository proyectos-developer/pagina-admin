import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_personal_evaluacion, set_datos_paso_personal, set_error_message } from '../../../../redux/actions/data'
import {filesdata} from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'
import { constantes } from '../../../../uri/constantes'

export default function DatosEvaluaciones ({proporcional}) {

    const dispatch = useDispatch()

    const [file_evaluacion, setFileEvaluacion] = useState (null)
    const [url_evaluacion, setUrlEvaluacion] = useState (null)
    const [lista_files_documentos, setListaFilesDocumentos] = useState([])
    const [notas_evaluacion, setNotasEvaluacion] = useState('')

    const [boton_subir_evaluacion, setBotonSubirEvaluacion] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_guardar, setBotonGuardar] = useState(false)

    const {file_upload_evaluacion} = useSelector(({data_actions}) => data_actions)
    const {data_personal_personal, datos_personal_evaluacion} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (datos_personal_evaluacion && datos_personal_evaluacion.url_evaluacion){
            setUrlEvaluacion(datos_personal_evaluacion.url_evaluacion)
            setNotasEvaluacion(datos_personal_evaluacion.notas_evaluacion)
        }else{
            setUrlEvaluacion('')
            setNotasEvaluacion('')
        }
    }, [])

    useEffect(() => {
        if (file_upload_evaluacion && file_upload_evaluacion.success === true && file_upload_evaluacion.message === true){
            let file = url_evaluacion
            file = file === '' ? `${constantes().url_archivo[0].url}/personal/documentos/${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}/${file_documento.name}` : 
                        file + '; ' + `${constantes().url_archivo[0].url}/personal/documentos/${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}/${file_documento.name}`
            setListaFilesDocumentos(file.split (';'))
            setUrlEvaluacion(`${constantes().url_principal[0].url}/personal/evaluaciones/${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}/${file_evaluacion.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_evaluacion))
        }else if (file_upload_evaluacion && file_upload_evaluacion.success === false && file_upload_evaluacion.error){
            dispatch(set_error_message(true))
        }
    }, [file_upload_evaluacion])

    const handleFileChangeEvaluacion = (event) => {
        setFileEvaluacion(event.target.files[0])
    }

    const handleUploadEvaluacion = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_evaluacion, file_evaluacion.name)
        dispatch(filesdata(filesConstants(`${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}`, data, false).file_upload_evaluacion))
    }

    const volver_datos_sueldo = () => {
        const data_nueva = {
            evaluaciones: url_evaluacion,
            notas_evaluacion: notas_evaluacion
        }
        dispatch (set_data_personal_evaluacion(data_nueva))
        dispatch (set_datos_paso_personal('sueldo'))
    }

    const guardar_datos_personal = () => {
        if (500 - notas_evaluacion.length <= 0){
        }else{
            const data_nueva = {
                evaluaciones: url_evaluacion,
                notas_evaluacion: notas_evaluacion
            }
            dispatch (set_data_personal_evaluacion(data_nueva))
            dispatch (set_datos_paso_personal('guardar'))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
                            class="form-control" 
                            type="file" 
                            id="formFile" 
                            style={{width: '65%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional}}
                            onChange={handleFileChangeEvaluacion}/>
                        <div className={boton_subir_evaluacion ? 'shadow-lg rounded' : 'rounded'} 
                            style={{width: '30%', heihgt: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                            <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadEvaluacion}
                                onMouseOver={() => setBotonSubirEvaluacion(true)} onMouseLeave={() => setBotonSubirEvaluacion(false)}>Subir archivo</p>
                        </div>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Notas evaluación</strong></span>
                        <textarea 
                            id='notas_evaluacion'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={notas_evaluacion}
                            onChange={(event) => setNotasEvaluacion(event.target.value)}
                            style={{width: '100%', height: 120 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: 500 - notas_evaluacion.length <= 0 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='Notas evaluación'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - notas_evaluacion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - notas_evaluacion.length}</p>
                        </div>
                    </div>
                </div>
                    {
                        lista_files_documentos && lista_files_documentos.length > 0 ? (
                            lista_files_documentos.map((archivo, index) => {
                                return (
                                    archivo === '' ? (
                                        null
                                    ) : (
                                        <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`,
                                            color: '#007bff', fontWeight: 500, fontFamily: 'Poppins, sans-serif',
                                            marginBottom: 16 / proporcional}}><strong>{index + 1}.</strong> {archivo}<br/>
                                        </p>
                                    )
                                )
                            })                            
                        ) : null
                    }
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_sueldo()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                    onClick={() => guardar_datos_personal()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Guardar datos
                    </p>
                </div>
            </div>
        </div>
    )
}
