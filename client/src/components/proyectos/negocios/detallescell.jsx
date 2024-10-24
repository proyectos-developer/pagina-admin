import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {negociosdata} from '../../../redux/slice/negociosdata'
import {negociosConstants} from '../../../uri/negocios-constants'
import { set_data_negocio, set_error_message } from '../../../redux/actions/data'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'
import { constantes } from '../../../uri/constantes'

export default function DetallesClienteCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [file_imagen, setFileImagen] = useState (null)

    const id_negocio = location.pathname.split ('/')[6]
    const [nombre_negocio, setNombreNegocio] = useState('')
    const [nro_ruc, setNroRuc] = useState('')
    const [nombre_contacto, setNombreContacto] = useState('')
    const [nro_telefono, setNroTelefono] = useState ('')
    const [correo, setCorreo] = useState ('')
    const [url_logo, setUrlLogo] = useState ('')

    const [enombre_negocio, setENombreNegocio] = useState(false)
    const [eurl_logo, setEUrlLogo] = useState (false)

    const [boton_subif_foto, setBotonSubirFoto] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {file_upload} = useSelector(({files_data}) => files_data)
    const {update_negocio, get_negocio} = useSelector(({negocios_data}) => negocios_data)
    const {data_negocio, data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion]  = useState(data_editable)

    useEffect(() => {
        if (data_negocio.nombre_negocio === undefined){
            dispatch(negociosdata(negociosConstants(location.pathname.split ('/')[6], 0, 0, 0, 0, 32, {}, false).get_negocio))
        }else{
            setNombreNegocio(data_negocio.nombre_negocio)
            setNroRuc(data_negocio.nro_ruc)
            setCorreo(data_negocio.correo)
            setNombreContacto(data_negocio.nombre_contacto)
            setNroTelefono(data_negocio.nro_telefono)
            setUrlLogo(data_negocio.url_logo)   
        }
    }, [])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlLogo(`${constantes().url_archivo[0].url}/negocios/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }else if (file_upload && file_upload.success === false && file_upload.error){
            dispatch (set_error_message(true))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_negocio && get_negocio.success === true && get_negocio.negocio){
            setNombreNegocio(get_negocio.negocio.nombre_negocio)
            setNroRuc(get_negocio.negocio.nro_ruc)
            setCorreo(get_negocio.negocio.correo)
            setNombreContacto(get_negocio.negocio.nombre_contacto)
            setNroTelefono(get_negocio.negocio.nro_telefono)
            setUrlLogo(get_negocio.negocio.url_logo) 
            setEditarInformacion(false)  
            dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, true).get_negocio))
        }else if (get_negocio && get_negocio.success === false && get_negocio.error){
            dispatch (set_error_message(true))
        }
    }, [get_negocio])

    useEffect(() => {
        if (update_negocio && update_negocio.success === true && update_negocio.negocio){
            dispatch(negociosdata(negociosConstants(0, 0, 0, 0, 0, 16, {}, true).update_negocio))
            setEditarInformacion(false)
        }else if (update_negocio && update_negocio.success === false && update_negocio.error){
            dispatch (set_error_message(true))
        }
    }, [update_negocio])

    const volver_a_lista = () => {
        dispatch(set_data_negocio({}))
        navigate ('/panel/proyectos/negocios')
    }

    const cancelar_edicion_datos = () => {
        dispatch (negociosdata(negociosConstants(id_negocio, 0, 0, 0, 0, 0, {}, false).get_negocio))
    }

    const actualizar_datos_negocio = () => {
        if (nombre_negocio === '' || url_logo === ''){
            setENombreNegocio(nombre_negocio === '' ? true : false)
            setEUrlLogo(url_logo === '' ? true : false)
        }else{
            setENombreNegocio(false)
            setEUrlLogo(false)
            const data_nuevo = {
                nombre_negocio: nombre_negocio,
                nro_ruc: nro_ruc,
                nombre_contacto: nombre_contacto,
                nro_telefono: nro_telefono,
                correo: correo,
                url_logo: url_logo
            }
            dispatch (negociosdata(negociosConstants(id_negocio, 0, 0, 0, 0, 16, data_nuevo, false).update_negocio))
        }
    }
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('negocios', data, false).file_upload))
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
                    onClick={() => navigate ('/panel/proyectos/negocios')}>
                    negocios
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
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='d-flex justify-content-center' style={{width: '100%', height: 174 / proporcional,
                        marginBottom: 32 / proporcional
                    }}>
                        <div className='rounded-circle' style={{width:  174 / proporcional, height: 174 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_logo !== '' ? (
                                    <img className='rounded-circle' src={url_logo} 
                                        style={{width: 172 / proporcional, height: 172 / proporcional}}/>
                                ) : (null
                                )
                            }
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nombre negocio / empresa</strong></span>
                            <input
                                disabled={!editar_informacion} 
                                id='nombre_negocio'
                                type='default'
                                className='form-control rounded'
                                value={nombre_negocio}
                                onChange={(event) => setNombreNegocio(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enombre_negocio ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre negocio / empresa'/>
                        </div>
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nro R.U.C</strong></span>
                            <input
                                disabled={!editar_informacion} 
                                id='nro_ruc'
                                type='number'
                                className='form-control rounded'
                                value={nro_ruc}
                                onChange={(event) => setNroRuc(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nro R.U.C'/>
                        </div>
                        <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nombre contácto</strong></span>
                            <input
                                disabled={!editar_informacion} 
                                id='nombre_contacto'
                                type='default'
                                className='form-control rounded'
                                value={nombre_contacto}
                                onChange={(event) => setNombreContacto(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre negocio / empresa'/>
                        </div>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                    <span className='position-absolute'  
                                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                            <strong>Nro teléfono</strong></span>
                                <input
                                    disabled={!editar_informacion} 
                                    id='nro_telefono'
                                    type='number'
                                    className='form-control rounded'
                                    value={nro_telefono}
                                    onChange={(event) => setNroTelefono(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nro teléfono'/>
                            </div>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Correo</strong></span>
                                <input
                                    disabled={!editar_informacion} 
                                    id='correo'
                                    type='e-mail'
                                    className='form-control rounded'
                                    value={correo}
                                    onChange={(event) => setCorreo(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Correo electrónico'/>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion} 
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_logo ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                                onChange={handleFileChange}/>
                            <div className={boton_subif_foto ? 'shadow-lg rounded' : 'rounded'} 
                                style={{width: '100%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                    lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                    fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                    onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    editar_informacion ? (
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom:16 / proporcional}}
                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                onClick={() => cancelar_edicion_datos()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_datos_negocio()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom:16 / proporcional}}
                                onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                onClick={() => volver_a_lista()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Volver
                                </p>
                            </div>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                onClick={() => setEditarInformacion(true)}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Editar datos
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
