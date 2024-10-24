import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {filesdata} from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'
import { constantes } from '../../../../uri/constantes'
import {personaldata} from '../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../uri/personal-constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { set_datos_paso_personal, set_error_message } from '../../../../redux/actions/data'

export default function DatosEvaluacionesCell({proporcional, personal}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation ()

    const id_personal = location.pathname.split ('/')[6]
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [file_evaluacion, setFileEvaluacion] = useState (null)
    const [url_evaluacion, setUrlEvaluacion] = useState (null)
    const [lista_files_documentos, setListaFilesDocumentos] = useState([])
    const [notas_evaluacion, setNotasEvaluacion] = useState('')

    const [enotas_evaluacion, setENotasEvaluacion] = useState(false)

    const [boton_subir_evaluacion, setBotonSubirEvaluacion] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)

    const {file_upload_evaluacion} = useSelector(({data_actions}) => data_actions)
    const {update_personal_evaluacion, get_personal_evaluacion} = useSelector(({personal_data}) => personal_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)
    
    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (personal && personal.evaluaciones){
            setNombres(personal.departamento)
            setApellidos(personal.id_departamento)
            setUrlEvaluacion(personal.evaluaciones)
            setNotasEvaluacion(personal.notas_evaluacion)
            window.scrollTo(0, 0)
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 100, {}, false).get_departamentos_filter))
        }
    }, [])

    useEffect(() => {
        if (get_personal_evaluacion && get_personal_evaluacion.success === true && get_personal_evaluacion.trabajador){
            setNombres(get_personal_evaluacion.trabajador.departamento)
            setApellidos(get_personal_evaluacion.trabajador.id_departamento)
            setUrlEvaluacion(get_personal_evaluacion.trabajador.evaluaciones)
            setNotasEvaluacion(get_personal_evaluacion.trabajador.notas_evaluacion)
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_personal_evaluacion))
        }else if (get_personal_evaluacion && get_personal_evaluacion.success === false && get_personal_evaluacion.error){
            dispatch (set_error_message(true))
        }
    }, [get_personal_evaluacion])

    useEffect(() => {
        if (update_personal_evaluacion && update_personal_evaluacion.success === true && update_personal_evaluacion.trabajador){
            setNombres(update_personal_evaluacion.trabajador.departamento)
            setApellidos(update_personal_evaluacion.trabajador.id_departamento)
            setUrlEvaluacion(update_personal_evaluacion.trabajador.evaluaciones)
            setNotasEvaluacion(update_personal_evaluacion.trabajador.notas_evaluacion)
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(personal.id, 0, 0, 0, 0, 0, 0, 0, {}, true).update_personal_evaluacion))
        }else if (update_personal_evaluacion && update_personal_evaluacion.success === false && update_personal_evaluacion.error){
            dispatch (set_error_message(true))
        }
    }, [update_personal_evaluacion])

    useEffect(() => {
        if (file_upload_evaluacion && file_upload_evaluacion.success === true && file_upload_evaluacion.message === true){
            let file = url_evaluacion
            file = file === '' ? `${constantes().url_archivo[0].url}/personal/documentos/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_documento.name}` : 
                        file + '; ' + `${constantes().url_archivo[0].url}/personal/documentos/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_documento.name}`
            setListaFilesDocumentos(file.split (';'))
            setUrlEvaluacion(`${constantes().url_principal[0].url}/personal/evaluaciones/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_evaluacion.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_evaluacion))
        }else if (file_upload_evaluacion && file_upload_evaluacion.success === false && file_upload_evaluacion.error){
            dispatch (set_error_message(true))
        }
    }, [file_upload_evaluacion])

    const handleFileChangeEvaluacion = (event) => {
        setFileEvaluacion(event.target.files[0])
    }

    const handleUploadEvaluacion = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_evaluacion, file_evaluacion.name)
        dispatch(filesdata(filesConstants(`${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}`, data, false).file_upload_evaluacion))
    }

    const actualizar_datos_evaluacion = () => {
        if (500 - notas_evaluacion.length <= 0){
            setENotasEvaluacion(500 - notas_evaluacion.length <= 0 ? true : false)
        }else{
            const data_update = {
                evaluaciones: url_evaluacion,
                notas_evaluacion: notas_evaluacion
            }
            dispatch (personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, data_update, false).update_personal_evaluacion))
        }
    }

    const cancelar_actualizacion = () => {
        dispatch (personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, {}, false).get_personal_evaluacion))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            class="form-control" 
                            type="file" 
                            id="formFile" 
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                            onChange={handleFileChangeEvaluacion}/>
                        <div className={boton_subir_evaluacion ? 'shadow-lg rounded' : 'rounded'} 
                            style={{width: '100%', heihgt: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}>
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
                            disabled={!editar_informacion}
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
            {
                editar_informacion ? (
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => cancelar_actualizacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                            onClick={() => actualizar_datos_evaluacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => {navigate ('/panel/rrhh/personal'); dispatch(set_datos_paso_personal('personal'));
                                    setEditarInformacion(false)
                            }}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                        <div VolverlassName={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                            onClick={() => setEditarInformacion(true)}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
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
