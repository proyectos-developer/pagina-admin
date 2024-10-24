import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {serviciosdata} from '../../../redux/slice/serviciosdata'
import {serviciosConstants} from '../../../uri/servicios-constants'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'
import { constantes } from '../../../uri/constantes'
import { set_error_message } from '../../../redux/actions/data'

export default function NuevoServicioCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [file_imagen, setFileImagen] = useState (null)

    const [url_foto, setUrlFoto] = useState('')
    const [servicio, setServicio] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [eservicio, setEServicio] = useState (false)

    const [boton_subir_foto, setBotonSubirFoto] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_servicio} = useSelector(({servicios_data}) => servicios_data)
    const {file_upload} = useSelector(({files_data}) => files_data)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (new_servicio && new_servicio.success === true && new_servicio.servicio){
            dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 16, {}, true).new_servicio))
            resetear_data()
        }else if (new_servicio && new_servicio.success === false && new_servicio.error){
            dispatch (set_error_message(true))
        }
    }, [new_servicio])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlFoto(`${constantes().url_archivo[0].url}/servicios/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }else if (file_upload && file_upload.success === false && file_upload.error){
            dispatch (set_error_message(true))
        }
    }, [file_upload])

    const resetear_data = () => {
        window.scrollTo(0, 0)
        setUrlFoto('')
        setServicio('')
        setDescripcion('')
    }

    const volver_a_lista = () => {
        resetear_data()
        window.scrollTo(0, 0)
        navigate ('/panel/empresa/servicios')
    }

    const guardar_servicio = () => {
        if (servicio === ''){
            setEServicio(servicio === '' ? true : false)
        }else{
            setEServicio(false)
            const data_nuevo = {
                url_foto: url_foto,
                servicio: servicio,
                descripcion: descripcion
            }
            dispatch (serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 16, data_nuevo, false).new_servicio))
        }
    }
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('servicios', data, false).file_upload))
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
                        onClick={() => navigate ('/panel/empresa')}>
                    empresa
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/empresa/servicios')}>
                    servicios
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
                style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                <div className='d-flex justify-content-center' 
                    style={{width: '100%', height: 'auto', background: 'white', marginBottom: 16 / proporcional}}>
                    <div className='rounded-circle' style={{width:  242 / proporcional, height: 242 / proporcional,
                        border: '1px solid #4a4a4a', marginRight: 16 / proporcional}}>
                        {
                            url_foto !== '' ? (
                                <img className='rounded-circle' src={url_foto} 
                                style={{width: 240 / proporcional, height: 240 / proporcional}}/>
                            ) : null
                        }
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nombre servicio</strong></span>
                        <input
                            autoComplete={false}
                            type='default' 
                            id='servicio'
                            value={servicio}
                            className='form-control rounded'
                            onChange={(event) => setServicio (event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eservicio ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre del servicio'/>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nombre servicio</strong></span>
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
                    <div className='' 
                        style={{width: '100%', height: 'auto'}}>
                        <input
                            autoComplete={false} 
                            class="form-control" 
                            type="file" 
                            id="formFile" 
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                            onChange={handleFileChange}/>
                        <div className={boton_subir_foto ? 'shadow-lg rounded' : 'rounded'} 
                            style={{width: '100%', heihgt: 40 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                            <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Foto de logo</p>
                        </div>
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer', cursor: 'pointer', marginBottom: 16 / proporcional}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Volver
                        </p>
                    </div>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_servicio()}>
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
