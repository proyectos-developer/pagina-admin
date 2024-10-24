import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {marcasdata} from '../../../redux/slice/marcasdata'
import {marcasConstants} from '../../../uri/marcas-constants'
import { constantes } from '../../../uri/constantes'
import { filesdata } from '../../../redux/slice/filesdata'
import { filesConstants } from '../../../uri/files-constants'
import { set_data_marca } from '../../../redux/actions/data'

export default function DetallesMarca ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefSector = useRef(null)
    const selectRefPaisOrigen = useRef(null)
    const selectRefTamanioEmpresa = useRef(null)
    
    const id_marca = location.pathname.split ('/')[6]
    const [nombre_marca, setNombreMarca] = useState('') 
    const [logo, setLogo] = useState('') 
    const [descripcion, setDescripcion] = useState('') 
    const [sector, setSector] = useState('') 
    const [tamanio_empresa, setTamanioEmpresa] = useState('') 
    const [pais_origen, setPaisOrigen] = useState('') 
    const [sitio_web, setSitioWeb] = useState('') 
    const [nombre_contacto, setNombreContacto] = useState('') 
    const [telefono_contacto, setTelefonoContacto] = useState('') 
    const [correo_contacto, setCorreoContacto] = useState('')
    const [redes_sociales, setRedesSociales] = useState('') 
    const [historial_interacciones, setHistorialInteracciones] = useState('') 
    const [notas, setNotas] = useState('')

    const [enombre_marca, setENombreMarca] = useState(false)

    const [file_logo, setFileLogo] = useState('')
    const [boton_subir_foto, setBotonSubirFoto] = useState(false)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_actualizar, setBotonactualizar] = useState(false)

    const {get_marca, update_marca} = useSelector(({marcas_data}) => marcas_data)
    const {data_marca, data_editable} = useSelector(({data_actions}) => data_actions)
    const {file_upload_logo_marca} = useSelector(({files_data}) => files_data)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        if (data_marca.nombre_marca === undefined){
            dispatch(marcasdata(marcasConstants(id_marca, 0, 0, 0, 0, 0, 16, {}, false).get_marca))
        }else{
            setNombreMarca(data_marca.nombre_marca)
            setLogo(data_marca.logo)
            setDescripcion(data_marca.descripcion)
            setSector(data_marca.sector)
            setTamanioEmpresa(data_marca.tamanio_empresa)
            setPaisOrigen(data_marca.pais_origen)
            setSitioWeb(data_marca.sitio_web)
            setNombreContacto(data_marca.nombre_contacto)
            setTelefonoContacto(data_marca.telefono_contacto)
            setCorreoContacto(data_marca.correo_contacto)
            setRedesSociales(data_marca.redes_sociales)
            setHistorialInteracciones(data_marca.historial_interacciones)
            setNotas(data_marca.notas)
        }
    }, [])

    useEffect(() => {
        if (get_marca && get_marca.success === true && get_marca.marca){
            setNombreMarca(get_marca.marca.nombre_marca)
            setLogo(get_marca.marca.logo)
            setDescripcion(get_marca.marca.descripcion)
            setSector(get_marca.marca.sector)
            setTamanioEmpresa(get_marca.marca.tamanio_empresa)
            setPaisOrigen(get_marca.marca.pais_origen)
            setSitioWeb(get_marca.marca.sitio_web)
            setNombreContacto(get_marca.marca.nombre_contacto)
            setTelefonoContacto(get_marca.marca.telefono_contacto)
            setCorreoContacto(get_marca.marca.correo_contacto)
            setRedesSociales(get_marca.marca.redes_sociales)
            setHistorialInteracciones(get_marca.marca.historial_interacciones)
            setNotas(get_marca.marca.notas)
            window.scrollTo(0, 0)
            setEditarInformacion(false)
            dispatch(marcasdata(marcasConstants(0, 0, 0, 0, 0, 16, {}, true).get_marca))
        }
    }, [get_marca])

    useEffect(() => {
        if (update_marca && update_marca.success === true && update_marca.marca){
            setNombreMarca(update_marca.marca.nombre_marca)
            setLogo(update_marca.marca.logo)
            setDescripcion(update_marca.marca.descripcion)
            setSector(update_marca.marca.sector)
            setTamanioEmpresa(update_marca.marca.tamanio_empresa)
            setPaisOrigen(update_marca.marca.pais_origen)
            setSitioWeb(update_marca.marca.sitio_web)
            setNombreContacto(update_marca.marca.nombre_contacto)
            setTelefonoContacto(update_marca.marca.telefono_contacto)
            setCorreoContacto(update_marca.marca.correo_contacto)
            setRedesSociales(update_marca.marca.redes_sociales)
            setHistorialInteracciones(update_marca.marca.historial_interacciones)
            setNotas(update_marca.marca.notas)
            window.scrollTo(0, 0)
            setEditarInformacion(false)
            dispatch(marcasdata(marcasConstants(0, 0, 0, 0, 0, 16, {}, true).update_marca))
        }
    }, [update_marca])

    useEffect(() => {
        if (file_upload_logo_marca && file_upload_logo_marca.success === true && file_upload_logo_marca.message === true){
            setLogo(`${constantes().url_archivo[0].url}/marca/logo/${nombre_marca.replace(' ', '_')}/${file_logo.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_logo_marca))
        }
    }, [file_upload_logo_marca])

    const handleFileChangeFoto = (event) => {
        setFileLogo(event.target.files[0])
    }

    const handleUploadFoto = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_logo, file_logo.name)
        dispatch(filesdata(filesConstants(`${nombre_empresa.replace(' ', '_')}`, data, false).file_upload_logo_marca))
    }

    const resetear_data = () => {
        nombre_marca('')
        logo('')
        descripcion('')
        sector('')
        tamanio_empresa('')
        pais_origen('')
        sitio_web('')
        nombre_contacto('')
        telefono_contacto('')
        correo_contacto('')
        redes_sociales('')
        historial_interacciones('')
        notas('')
        selectRefSector.current !== null ? selectRefSector.current.value = '0' : null
        selectRefPaisOrigen.current !== null ? selectRefPaisOrigen.current.value = '0' : null
        selectRefTamanioEmpresa.current !== null ? selectRefTamanioEmpresa.current.value = '0' : null
    }

    const volver_a_lista = () => {
        window.scrollTo(0, 0)
        dispatch(set_data_marca({}))
        navigate ('/panel/almacen/marcas')
    }

    const cancelar_edicion = () => {
        dispatch (marcasdata(marcasConstants(id_marca, 0, 0, 0, 0, 16, {}, false).get_marca))
    }

    const actualizar_datos_marca = () => {
        if (nombre_marca === '' || (500 - descripcion.length <= 0) || (500 - notas.length <= 0)){
            setENombreMarca(nombre_marca === '' ? true : false)
        }else{
            setENombreMarca(nombre_marca === '' ? true : false)
            const data_update = {
                nombre_marca: nombre_marca,
                logo: logo,
                descripcion: descripcion,
                sector: sector,
                tamanio_empresa: tamanio_empresa,
                pais_origen: pais_origen,
                sitio_web: sitio_web,
                nombre_contacto: nombre_contacto,
                telefono_contacto: telefono_contacto,
                correo_contacto: correo_contacto,
                redes_sociales: redes_sociales,
                historial_interacciones: historial_interacciones,
                notas: notas
            }
            dispatch (marcasdata(marcasConstants(id_marca, 0, 0, 0, 0, 16, data_update, false).update_marca))
        }
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
                    onClick={() => navigate ('/panel/almacen')}>
                    almacén
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/almacen/marcas')}>
                    marcas
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    marca / {nombre_marca}
                </p>
            </div>
            <div className='shadow' 
                style={{width: '80%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='' style={{width: '48%', height: 'auto',
                        border: enombre_marca  ? '1px solid red' : '1px solid #007bff', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion}
                            id='nombre_marca'
                            value={nombre_marca}
                            className='form-control rounded border-0'
                            onChange={(event) => setNombreMarca(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                            placeholder='Nombre de la marca'/>
                    </div>                      
                    <div className='' style={{width: '48%', height: 'auto',
                        border: '1px solid #007bff', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion}
                            ref={selectRefPaisOrigen}
                            id='pais_origen'
                            className='form-select rounded border-0'
                            onChange={(event) => event.target.value !== '0' ? setPaisOrigen(event.target.value) : null}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}>
                            <option value='0'>{pais_origen === '' ? 'Seleccionar país origen' : pais_origen}</option>
                        </select>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea
                        disabled={!editar_informacion}
                        type='default' 
                        rows={4}
                        id='descripcion'
                        value={descripcion}
                        className='form-control rounded'
                        onChange={(event) => setDescripcion (event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: 500 - descripcion.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='descripcion'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='' style={{width: '48%', height: 'auto',
                        border: '1px solid #007bff', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion}
                            ref={selectRefSector}
                            id='sector'
                            className='form-select rounded border-0'
                            onChange={(event) => event.target.value !== '0' ? setSector(event.target.value) : null}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}>
                            <option value='0'>{sector === '' ? 'Seleccionar sector' : sector}</option>
                        </select>
                    </div>
                    <div className='' style={{width: '48%', height: 'auto',
                        border: '1px solid #007bff', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion}
                            ref={selectRefTamanioEmpresa}
                            id='tamanio_empresa'
                            className='form-select rounded border-0'
                            onChange={(event) => event.target.value !== '0' ? setTamanioEmpresa(event.target.value) : null}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}>
                            <option value='0'>{tamanio_empresa === '' ? 'Seleccionar tamaño empresa' : tamanio_empresa}</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='' style={{width: '100%', height: 'auto',
                        border: '1px solid #007bff', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion}
                            type='url'
                            id='sitio_web'
                            value={sitio_web}
                            className='form-control rounded border-0'
                            onChange={(event) => setSitioWeb(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                            placeholder='Sitio web...'/>
                    </div>
                </div>     
                {
                    nombre_marca !== '' ? (
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
                                onChange={handleFileChangeFoto}/>
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
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <textarea
                        disabled={!editar_informacion}
                        type='default' 
                        rows={4}
                        id='notas'
                        value={notas}
                        className='form-control rounded'
                        onChange={(event) => setNotas (event.target.value)}
                        style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: 500 - notas.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='notas'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - notas.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - notas.length}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='' style={{width: '48%', height: 'auto',
                        border: '1px solid #007bff', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion}
                            id='nombre_contacto'
                            value={nombre_contacto}
                            className='form-control rounded border-0'
                            onChange={(event) => setNombreContacto(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                            placeholder='Nombre contácto'/>
                    </div>                      
                    <div className='' style={{width: '48%', height: 'auto',
                        border: '1px solid #007bff', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='telefono_contacto'
                            value={telefono_contacto}
                            className='form-control rounded border-0'
                            onChange={(event) => setTelefonoContacto(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                            placeholder='Teléfono contácto'/>
                    </div>                      
                </div>                     
                <div className='' style={{width: '100%', height: 'auto',
                    border: '1px solid #007bff', marginBottom: 16 / proporcional}}>
                    <input
                        disabled={!editar_informacion}
                        type='email'
                        id='correo_contacto'
                        value={correo_contacto}
                        className='form-control rounded border-0'
                        onChange={(event) => setCorreoContacto(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                        placeholder='Correo contácto'/>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <textarea
                            disabled={!editar_informacion}
                            type='default' 
                            rows={4}
                            id='redes_sociales'
                            value={redes_sociales}
                            className='form-control rounded'
                            onChange={(event) => setRedesSociales (event.target.value)}
                            style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: 500 - redes_sociales.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='Redes sociales'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - redes_sociales.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - redes_sociales.length}</p>
                        </div>
                    </div>
                    <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <textarea
                            disabled={!editar_informacion}
                            type='default' 
                            rows={4}
                            id='historial_interacciones'
                            value={historial_interacciones}
                            className='form-control rounded'
                            onChange={(event) => setHistorialInteracciones (event.target.value)}
                            style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: 500 - historial_interacciones.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='Historial interacciones'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - historial_interacciones.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - historial_interacciones.length}</p>
                        </div>
                    </div>
                </div>  
                {
                    editar_informacion ? (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                onClick={() => cancelar_edicion()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonactualizar(true)} onMouseLeave={() => setBotonactualizar(false)}
                                onClick={() => actualizar_datos_marca()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
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
                                onClick={() => {setEditarInformacion(true); window.scrollTo(0, 0)}}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Editar informacion
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
