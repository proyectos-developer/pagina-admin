import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {serviciosdata} from '../../../redux/slice/serviciosdata'
import {serviciosConstants} from '../../../uri/servicios-constants'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'

export default function NuevaServicio ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [file_imagen, setFileImagen] = useState (null)

    const [url_foto, setUrlFoto] = useState('')
    const [servicio, setServicio] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [eservicio, setEServicio] = useState (false)
    const [edescripcion, setEDescripcion] = useState(false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

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
        }
    }, [new_servicio])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlFoto(`http://localhost:3001/servicios/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    const resetear_data = () => {
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
        if (servicio === '' || descripcion === ''){
            setEServicio(servicio === '' ? true : false)
            setEDescripcion(descripcion === '' ? true : false)
        }else{
            setEDescripcion(false)
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
            dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 0, {}, true).new_servicio))
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='shadow' 
                style={{width: '60%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', background: 'white', marginBottom: 16 / proporcional}}>
                    <div className='d-flex' style={{width: '38%', height: 'auto', padding: 20 / proporcional}}>
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
                    <div className='' style={{width: '66%', height: 'auto'}}>
                        <div style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                            <input
                                type='default' 
                                id='servicio'
                                value={servicio}
                                className='form-control rounded'
                                onChange={(event) => setServicio (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eservicio ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre del servicio'/>
                        </div>
                        <div style={{width: '100%', height: 150 / proporcional, marginBottom: 16 / proporcional}}>
                            <textarea 
                                id='descripcion'
                                type='default'
                                rows={3}
                                className='form-control rounded'
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                                style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edescripcion ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Descripción del servicio'/>
                        </div>
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 50 / proporcional}}>
                            <input 
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChange}/>
                            <div className={boton_subif_foto ? 'shadow-lg rounded' : 'rounded'} 
                                style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                    lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                    fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                    onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-between' style={{width: '63.5%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => volver_a_lista()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                        <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                            onClick={() => guardar_servicio()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Guardar datos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
