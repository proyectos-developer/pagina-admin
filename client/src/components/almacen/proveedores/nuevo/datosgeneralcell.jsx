import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {filesdata} from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'

import {set_data_proveedor_general, set_data_proveedor_comercial, set_data_proveedor_financiera, set_data_proveedor_evaluacion, 
      set_data_proveedor_adicional, set_datos_paso_proveedor} from '../../../../redux/actions/data'
import { constantes } from '../../../../uri/constantes'
import { useNavigate } from 'react-router-dom'

export default function DatosGeneralCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

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
    const {data_proveedor_general} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_proveedor_general && data_proveedor_general.nombre_empresa){
            setLogo(data_proveedor_general.logo)
            setNombreEmpresa(data_proveedor_general.nombre_empresa)
            setNombreContacto(data_proveedor_general.nombre_contacto)
            setCargo(data_proveedor_general.cargo)
            setTelefono(data_proveedor_general.telefono)
            setCorreo(data_proveedor_general.correo)
            setDireccion(data_proveedor_general.direccion)
            setSitioWeb(data_proveedor_general.sitio_web)
        }else{
            setLogo('')
            setNombreEmpresa('')
            setNombreContacto('')
            setCargo('')
            setTelefono('')
            setCorreo('')
            setDireccion('')
            setSitioWeb('')
        }
    }, [])

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

    const continuar_datos_comercial = () => {
        if (nombre_empresa === ''){
            setENombreEmpresa(nombre_empresa === '' ? true : false)
        }else{
            setENombreEmpresa(false)
            dispatch (set_data_proveedor_general({
                logo: logo, 
                nombre_empresa: nombre_empresa, 
                nombre_contacto: nombre_contacto, 
                cargo: cargo, 
                telefono: telefono, 
                correo: correo, 
                direccion: direccion, 
                sitio_web: sitio_web, 
            }))
            dispatch (set_datos_paso_proveedor('comercial'))
        }
    }

    const volver_a_lista = () => {
        dispatch (set_data_proveedor_general({}))
        dispatch (set_data_proveedor_comercial({}))
        dispatch (set_data_proveedor_financiera({}))
        dispatch (set_data_proveedor_adicional({}))
        dispatch (set_data_proveedor_evaluacion({}))
        navigate ('/panel/almacen/proveedores')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                <div className='' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                    <div style={{width: '100%', height: 'auto'}}>
                        <input 
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
                        <div className='' 
                            style={{width: '100%', height: 50 / proporcional, marginBottom: 16 / proporcional}}>
                            <input 
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                value={file_logo}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                                onChange={handleFileChangeFoto}/>
                                <div className={boton_subir_foto ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '100%', heihgt: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFoto}
                                        onMouseOver={() => setBotonSubirFoto(true)} 
                                        onMouseLeave={() => setBotonSubirFoto(false)}>Subir logo</p>
                                </div>
                        </div>
                    ) : null
                }
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Cancelar
                        </p>
                    </div>
                    <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                        onClick={() => continuar_datos_comercial()}>
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
