import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {serviciosdata} from '../../../redux/slice/serviciosdata'
import { set_data_servicio } from '../../../redux/actions/data'
import { serviciosConstants } from '../../../uri/servicios-constants'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'

export default function DetallesServicio ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [file_imagen, setFileImagen] = useState (null)

    const [id_servicio, setIdServicio] = useState('')
    const [url_foto, setUrlFoto] = useState('')
    const [servicio, setServicio] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [eservicio, setEServicio] = useState (false)
    const [edescripcion, setEDescripcion] = useState(false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_servicio, get_servicio} = useSelector(({servicios_data}) => servicios_data)
    const {file_upload} = useSelector(({files_data}) => files_data)
    const {data_servicio, data_editable} = useSelector(({data_actions}) => data_actions)
    
    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (data_servicio.servicio === undefined){
            dispatch(serviciosdata(serviciosConstants(location.pathname.split ('/')[6], 0, 0, 0, 0, 16, {}, false).get_servicio))
        }else{
            setUrlFoto(data_servicio.url_foto)
            setIdServicio(data_servicio.id)
            setServicio(data_servicio.servicio)
            setDescripcion(data_servicio.descripcion)
        }
    }, [])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlFoto(`https://api.developer-ideas.com/servicios/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_servicio && get_servicio.success === true && get_servicio.servicio){
            setUrlFoto(get_servicio.servicio.url_foto)
            setIdServicio(get_servicio.servicio.id)
            setServicio(get_servicio.servicio.servicio)
            setDescripcion(get_servicio.servicio.descripcion)
            dispatch(serviciosdata(serviciosConstants(0, 0, 0, 0, 0, 16, {}, true).get_servicio))
        }
    }, [get_servicio])

    useEffect(() => {
        if (update_servicio && update_servicio.success === true && update_servicio.servicio){
            dispatch(serviciosdata(serviciosConstants(id_servicio, 0, 0, 0, 0, 16, {}, true).update_servicio))
            setEditarInformacion(false)
        }
    }, [update_servicio])

    const volver_a_lista = () => {
        dispatch(set_data_servicio({}))
        navigate ('/panel/empresa/servicios')
    }
    
    const actualizar_data_servicio = () => {
        if (servicio === '' || descripcion === ''){
            setEServicio(servicio === '' ? true : false)
            setEDescripcion(descripcion === '' ? true : false)
        }else{
            setEServicio (false)
            setEDescripcion(false)
            const data_nuevo = {
                url_foto: url_foto,
                servicio: servicio,
                descripcion: descripcion
            }
            dispatch (serviciosdata(serviciosConstants(id_servicio, 0, 0, 0, 0, 16, data_nuevo, false).update_servicio))
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
                                disabled={!editar_informacion}
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
                                disabled={!editar_informacion}
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
                                disabled={!editar_informacion}
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
                    {
                        editar_informacion ? (
                            <div className='d-flex justify-content-between' style={{width: '63.5%', height: 'auto'}}>
                                <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                    onClick={() => setEditarInformacion(false)}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                    onClick={() => actualizar_data_servicio()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : (
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
                                <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
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
