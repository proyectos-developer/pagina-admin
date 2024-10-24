import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {tipoproyectosdata} from '../../../redux/slice/tipoproyectosdata'
import {tipoproyectoConstants} from '../../../uri/tipoproyecto-constants'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'
import { constantes } from '../../../uri/constantes'
import { set_error_message } from '../../../redux/actions/data'

export default function NuevoTipoProyectoTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [file_imagen, setFileImagen] = useState (null)

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [url_tipo, setUrlTipo] = useState ('')

    const [enombre, setENombre] = useState(false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_tipo_proyecto} = useSelector(({tipoproyectos_data}) => tipoproyectos_data)
    const {file_upload} = useSelector(({files_data}) => files_data)

    useEffect(() => {
        if (new_tipo_proyecto && new_tipo_proyecto.success === true && new_tipo_proyecto.tipo_proyecto){
            dispatch(tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, {}, true).new_tipo_proyecto))
            resetear_data()
        }else if (new_tipo_proyecto && new_tipo_proyecto.success === false && new_tipo_proyecto.error){
            dispatch (set_error_message (true))
        }
    }, [new_tipo_proyecto])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlTipo(`${constantes().url_archivo[0].url}/tipo_proyectos/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }else if (file_upload && file_upload.success === false && file_upload.error){
            dispatch (set_error_message (true))
        }
    }, [file_upload])

    const resetear_data = () => {
        setNombre('')
        setDescripcion('')
        setUrlTipo('')
    }

    const volver_a_lista = () => {
        resetear_data()
        navigate ('/panel/proyectos/tipos-proyectos')
    }

    const guardar_tipo_proyecto = () => {
        if (nombre === '' || (500 - descripcion.length <= 0)){
            setENombre(nombre === '' ? true : false)
        }else{
            setENombre(false)
            const data_nuevo = {
                nombre: nombre,
                descripcion: descripcion,
                url_tipo: url_tipo
            }
            dispatch (tipoproyectosdata(tipoproyectoConstants(0, 0, 0, 0, 0, 16, data_nuevo, false).new_tipo_proyecto))
        }
    }
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('tipo_proyectos', data, false).file_upload))
    }

    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
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
                    onClick={() => navigate ('/panel/proyectos')}>
                    proyectos
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/proyectos/tipos-proyectos')}>
                    tipos de proyecto
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    nuevo
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto',
                        marginBottom: 16 / proporcional }}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 174 / proporcional,
                        marginBottom: 16 / proporcional
                    }}>
                        <div className='rounded-circle' style={{width:  174 / proporcional, height: 174 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_tipo !== '' ? (
                                    <img className='rounded-circle' src={url_tipo} 
                                        style={{width: 172 / proporcional, height: 172 / proporcional}}/>
                                ) : null
                            }
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nombre</strong></span>
                            <input 
                                id='nombre'
                                type='default'
                                className='form-control rounded'
                                value={nombre}
                                onChange={(event) => setNombre(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enombre ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Tipo de proyecto'/>
                        </div>
                        <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Descripción</strong></span>
                            <textarea 
                                id='descripcion'
                                type='default'
                                rows={3}
                                className='form-control rounded'
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                                style={{width: '100%', height: 120 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: 500 - descripcion.length <= 0 ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                                placeholder='Descripción del servicio'/>
                            <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                                <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                    fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                            <input 
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                style={{width: '65%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChange}/>
                            <div className={boton_subif_foto ? 'shadow-lg rounded' : 'rounded'} 
                                style={{width: '30%', heihgt: 40 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                    lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                    fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                    onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Volver
                        </p>
                    </div>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_tipo_proyecto()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar datos
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
