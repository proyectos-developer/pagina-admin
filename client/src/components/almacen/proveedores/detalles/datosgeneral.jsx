import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {filesdata} from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'

import {set_data_proveedor_financiera} from '../../../../redux/actions/data'
import { constantes } from '../../../../uri/constantes'
import { useLocation, useNavigate } from 'react-router-dom'
import { proveedoresdata } from '../../../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../../../uri/proveedores-constants'

export default function DatosGeneral ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_cancelar, setBotonCasncelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)

    const id_proveedor = location.pathname.split('/')[6]
    const [logo, setLogo] = useState('')
    const [nombre_empresa, setNombreEmpresa] = useState('')
    const [nombre_contacto, setNombreContacto] = useState('')
    const [cargo, setCargo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [direccion, setDireccion] = useState('')
    const [sitio_web, setSitioWeb] = useState('')

    const [enombre_empresa, setENombreEmpresa] = useState('')

    const [file_logo, setFileLogo] = useState('')
    const [boton_subir_foto, setBotonSubirFoto] = useState(false)

    const {file_upload_logo_proveedor} = useSelector(({files_data}) => files_data)
    const {get_proveedor_general, update_proveedor_general} = useSelector(({proveedores_data}) => proveedores_data)
    const {data_proveedor, data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (data_proveedor && data_proveedor.nombre_empresa){
            setLogo(data_proveedor.logo)
            setNombreEmpresa(data_proveedor.nombre_empresa)
            setNombreContacto(data_proveedor.nombre_contacto)
            setCargo(data_proveedor.cargo)
            setTelefono(data_proveedor.telefono)
            setCorreo(data_proveedor.correo)
            setDireccion(data_proveedor.direccion)
            setSitioWeb(data_proveedor.sitio_web)
        }else{
            dispatch (proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_general))
        }
    }, [])

    useEffect(() => {
        if (get_proveedor_general && get_proveedor_general.success === true && get_proveedor_general.proveedor_general){
            setLogo(get_proveedor_general.proveedor_general.logo)
            setNombreEmpresa(get_proveedor_general.proveedor_general.nombre_empresa)
            setNombreContacto(get_proveedor_general.proveedor_general.nombre_contacto)
            setCargo(get_proveedor_general.proveedor_general.cargo)
            setTelefono(get_proveedor_general.proveedor_general.telefono)
            setCorreo(get_proveedor_general.proveedor_general.correo)
            setDireccion(get_proveedor_general.proveedor_general.direccion)
            setSitioWeb(get_proveedor_general.proveedor_general.sitio_web)
            setEditarInformacion(false)
            dispatch (proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).get_proveedor_general))
        }
    }, [get_proveedor_general])

    useEffect(() => {
        if (update_proveedor_general && update_proveedor_general.success === true && update_proveedor_general.proveedor_general){
            setLogo(update_proveedor_general.proveedor_general.logo)
            setNombreEmpresa(update_proveedor_general.proveedor_general.nombre_empresa)
            setNombreContacto(update_proveedor_general.proveedor_general.nombre_contacto)
            setCargo(update_proveedor_general.proveedor_general.cargo)
            setTelefono(update_proveedor_general.proveedor_general.telefono)
            setCorreo(update_proveedor_general.proveedor_general.correo)
            setDireccion(update_proveedor_general.proveedor_general.direccion)
            setSitioWeb(update_proveedor_general.proveedor_general.sitio_web)
            setEditarInformacion(false)
            dispatch (proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).update_proveedor_adicional))
        }
    }, [update_proveedor_general])

    useEffect(() => {
        if (file_upload_logo_proveedor && file_upload_logo_proveedor.success === true && file_upload_logo_proveedor.message === true){
            setLogo(`${constantes().url_archivo[0].url}/proveedor/logo${nombre_empresa.replace(' ', '_')}/${file_logo.name}`)
            dispatch (set_data_proveedor_financiera({url_foto: `${constantes().url_archivo[0].url}/proveedor/logo${nombre_empresa.replace(' ', '_')}/${file_logo.name}`}))
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_logo_proveedor))
        }
    }, [file_upload_logo_proveedor])

    const handleFileChangeFoto = (event) => {
        setFileLogo(event.target.files[0])
    }

    const handleUploadFoto = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_logo, file_logo.name)
        dispatch(filesdata(filesConstants(`${nombre_empresa.replace(' ', '_')}`, data, false).file_upload_logo_proveedor))
    }

    const cancelar_edicion_datos = () => {
        dispatch (proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, {}, false).get_proveedor_general))
    }

    const actualiar_datos_proveedor = () => {
        if (nombre_empresa === ''){
            setENombreEmpresa(nombre_empresa === '' ? true : false)
        }else{
            setENombreEmpresa(false)
            const data_proveedor = {
                logo: logo, 
                nombre_empresa: nombre_empresa, 
                nombre_contacto: nombre_contacto, 
                cargo: cargo, 
                telefono: telefono, 
                correo: correo, 
                direccion: direccion, 
                sitio_web: sitio_web, 
            }
            dispatch (proveedoresdata(proveedoresConstants(id_proveedor, 0, 0, 0, 0, 0, data_proveedor, false).update_proveedor_general))
        }
    }

    const volver_a_lista = () => {
        navigate ('/panel/almacen/proveedores')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='nombre_empresa'
                            type='default'
                            className='form-control rounded'
                            value={nombre_empresa}
                            onChange={(event) => setNombreEmpresa(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: enombre_empresa ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre empresa'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='nombre_contacto'
                            type='default'
                            className='form-control rounded'
                            value={nombre_contacto}
                            onChange={(event) => setNombreContacto(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre contácto'/>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion} 
                            id='cargo'
                            type='default'
                            className='form-control rounded'
                            value={cargo}
                            onChange={(event) => setCargo(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: enombre_empresa ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Cargo en la empresa'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <input
                            disabled={!editar_informacion} 
                            id='telefono'
                            type='number'
                            className='form-control rounded'
                            value={telefono}
                            onChange={(event) => setTelefono(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nro teléfono'/>
                    </div>
                    <div style={{width: '48%', height: 'auto'}}>
                        <input
                            disabled={!editar_informacion} 
                            id='correo'
                            type='e-mail'
                            className='form-control rounded'
                            value={correo}
                            onChange={(event) => setCorreo(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Correo electrónico'/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input
                        disabled={!editar_informacion}
                        type='default'
                        id='direccion'
                        value={direccion}
                        className='form-control rounded'
                        onChange={(event) => setDireccion(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional}}
                        placeholder='Dirección fiscal o de envío'/>
                </div>
                {
                    nombre_empresa !== '' ? (
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion} 
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                value={file_logo}
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={editar_informacion ? handleFileChangeFoto : null}/>
                                <div className={boton_subir_foto ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFoto}
                                        onMouseOver={() => setBotonSubirFoto(true)} 
                                        onMouseLeave={() => setBotonSubirFoto(false)}>Subir logo</p>
                                </div>
                        </div>
                    ) : null
                }
                {
                    editar_informacion ? ( 
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCasncelar(true)} onMouseLeave={() => setBotonCasncelar(false)}
                                onClick={() => cancelar_edicion_datos()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualiar_datos_proveedor()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                                onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                onClick={() => volver_a_lista()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
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
