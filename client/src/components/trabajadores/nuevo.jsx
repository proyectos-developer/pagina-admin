import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {trabajadoresdata} from '../../redux/slice/trabajadoresdata'
import {trabajadoresConstants} from '../../uri/trabajadores-constants'
import {filesdata} from '../../redux/slice/filesdata'
import {filesConstants} from '../../uri/files-constants'

import save from '../../assets/iconos/comun/save_v2.png'
import save_select from '../../assets/iconos/comun/save_v1.png'
import cross from '../../assets/iconos/comun/cross_v2.png'
import cross_select from '../../assets/iconos/comun/cross_v1.png'
import {areasempresadata} from '../../redux/slice/areasempresadata'
import { areasempresaConstants } from '../../uri/areasempresa-constants'

export default function NuevoTrabajador ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const selectRefBanco = useRef(null)
    const selectRefAreaEmpresa = useRef(null)
    const selectRefTipoDocumento = useRef(null)
    const selectRefPais = useRef(null)
    const selectRefProvincia = useRef(null)
    const selectRefDistrito = useRef(null)
    const selectRefEstadoTrabajo = useRef(null)
    const selectRefEstadoCivil = useRef(null)
    const selectRefAfp = useRef(null)
    const selectRefSeguro = useRef(null)
    const selectRefEstudios = useRef(null)
    const selectRefTitulo = useRef (null)

    const [file_imagen, setFileImagen] = useState (null)

    const [url_foto, setUrlFoto] = useState('')
    const [id_area_empresa, setIdAreaEmpresa] = useState ('')
    const [area_empresa, setAreaEmpresa] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [correo_personal, setCorreoPersonal] = useState('')
    const [correo_empresa, setCorreoEmpresa] = useState('')
    const [nro_telefono, setNroTelefono] = useState('')
    const [tipo_documento, setTipoDocumento] = useState('')
    const [nro_documento, setNroDocumento] = useState('')
    const [fecha_nacimiento, setFechaNacimiento] = useState('')
    const [pais, setPais] = useState('')
    const [provincia, setProvincia] = useState('')
    const [distrito, setDistrito] = useState('')
    const [direccion, setDireccion] = useState('')
    const [afp, setAfp] = useState('')
    const [seguro, setSeguro] = useState('')
    const [estudios, setEstudios] = useState('')
    const [universidad, setUniversidad] = useState('')
    const [titulo, setTitulo] = useState('')
    const [colegio, setColegio] = useState('')
    const [estado_civil, setEstadoCivil] = useState('')
    const [nro_hijos, setNroHijos] = useState ('')
    const [estado_trabajo, setEstadoTrabajo] = useState('')
    const [fecha_inicio, setFechaInicio] = useState ('')
    const [sueldo_bruto, setSueldoBruto] = useState('')
    const [sueldo_neto, setSueldoNeto] = useState('')
    const [cargo, setCargo] = useState('')
    const [banco, setBanco] = useState('')
    const [nro_cuenta_bancaria, setNroCuentaBancaria] = useState('')
    const [nro_cuenta_interbancaria, setNroCuentaInterBancaria] = useState('')

    const [earea_empresa, setEAreaEmpresa] = useState(false)
    const [enombres, setENombres] = useState(false)
    const [eapellidos, setEApellidos] = useState(false)
    const [ecorreo_personal, setECorreoPersonal] = useState(false)
    const [enro_telefono, setENroTelefono] = useState(false)
    const [etipo_documento, setETipoDocumento] = useState(false)
    const [enro_documento, setENroDocumento] = useState(false)
    const [efecha_nacimiento, setEFechaNacimiento] = useState(false)
    const [epais, setEPais] = useState(false)
    const [eprovincia, setEProvincia] = useState(false)
    const [edistrito, setEDistrito] = useState(false)
    const [edireccion, setEDireccion] = useState(false)
    const [eestudios, setEEstudios] = useState(false)
    const [euniversidad, setEUniversidad] = useState(false)
    const [etitulo, setETitulo] = useState(false)
    const [ecolegio, setEColegio] = useState(false)
    const [eestado_civil, setEEstadoCivil] = useState(false)
    const [enro_hijos, setENroHijos] = useState (false)

    const [boton_subir_foto, setBotonSubirFoto] = useState(false)

    const [lista_areas_empresa, setListaAreasEmpresa] = useState([])

    const [nueva_area_empresa, setNuevaAreaEmpresa] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_save, setBotonSave] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_trabajador} = useSelector(({trabajadores_data}) => trabajadores_data)
    const {file_upload} = useSelector(({files_data}) => files_data)
    const {new_area_empresa, get_areas_empresa_filter} = useSelector(({areasempresa_data}) => areasempresa_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 100, {}, false).get_areas_empresa_filter))
    }, [])

    useEffect(() => {
        if (get_areas_empresa_filter && get_areas_empresa_filter.success === true && get_areas_empresa_filter.areas_empresa){
            setListaAreasEmpresa(get_areas_empresa_filter.areas_empresa)
        }
    }, [get_areas_empresa_filter])

    useEffect(() => {
        if (new_trabajador && new_trabajador.success === true && new_trabajador.trabajador){
            dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).new_trabajador))
            window.scrollTo(0, 0)
            resetear_data()
        }
    }, [new_trabajador])

    const seleccionar_area_empresa = (value) => {
        if (value !== '0' && value !== '1'){
            setIdAreaEmpresa(value.split ('-')[0])
            setAreaEmpresa(value.split ('-')[1])
        }else if (value === '1'){
            setNuevaAreaEmpresa(true)
        }
    }

    useEffect(() => {
        if (new_area_empresa && new_area_empresa.success === true && new_area_empresa.area_empresa){
            setIdAreaEmpresa(new_area_empresa.area_empresa.id)
            setAreaEmpresa(new_area_empresa.area_empresa.nombre_area)
            setNuevaAreaEmpresa(false)
            dispatch (areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 100, {}, false).new_area_empresa))
        }
    }, [new_area_empresa])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            setUrlFoto(`https://api.developer-ideas.com/trabajadores/${file_imagen.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    const guardar_nueva_area_empresa = () => {
        const data_area_empresa = {
            nombre_area: area_empresa,
            descripcion: ''
        }
        dispatch (areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 16, data_area_empresa, false).new_area_empresa))
    }

    const resetear_data = () => {
        setUrlFoto('')
        setIdAreaEmpresa('')
        setAreaEmpresa('')
        setNombres('')
        setApellidos('')
        setCorreoPersonal('')
        setCorreoEmpresa('')
        setNroTelefono('')
        setTipoDocumento('')
        setNroDocumento('')
        setFechaNacimiento('')
        setPais('')
        setProvincia('')
        setDistrito('')
        setDireccion('')
        setAfp('')
        setSeguro('')
        setEstudios('')
        setUniversidad('')
        setTitulo('')
        setColegio('')
        setEstadoCivil('')
        setNroHijos('')
        setEstadoTrabajo('')
        setFechaInicio('')
        setSueldoBruto('')
        setSueldoNeto('')
        setCargo('')
        setBanco('')
        setNroCuentaBancaria('')
        setNroCuentaInterBancaria('')
    }

    const volver_a_lista = () => {
        resetear_data()
        navigate ('/panel/trabajadores')
    }

    const guardar_producto = () => {
        if (nombres === '' || apellidos === '' || nro_telefono === '' || tipo_documento === '' || nro_documento === '' ||
                correo_personal === '' || area_empresa === '' || fecha_nacimiento == '' /**|| pais == '' || provincia == '' ||
                distrito == '' || direccion == '' || estudios == '' || universidad == '' || titulo == '' ||
                colegio == '' || estado_civil == '' || nro_hijos == ''**/
        ){
            setEAreaEmpresa(area_empresa === '' ? true : false)
            setENombres(nombres === '' ? true : false)
            setEApellidos(apellidos === '' ? true : false)
            setECorreoPersonal(correo_personal === '' ? true : false)
            setENroTelefono(nro_telefono === '' ? true : false)
            setETipoDocumento(tipo_documento === '' ? true : false)
            setENroDocumento(nro_documento === '' ? true : false)
            setEFechaNacimiento(fecha_nacimiento === '' ? true : false)
            /**setEPais(pais === '' ? true : false)
            setEProvincia(provincia === '' ? true : false)
            setEDistrito(distrito === '' ? true : false)
            setEDireccion(direccion === '' ? true : false)
            setEEstudios(estudios === '' ? true : false)
            setEUniversidad(universidad === '' ? true : false)
            setETitulo(titulo === '' ? true : false)
            setEColegio(colegio === '' ? true : false)
            setEEstadoCivil(estado_civil === '' ? true : false)
            setENroHijos(nro_hijos === '' ? true : false)**/
        }else{
            setEAreaEmpresa(false)
            setENombres(false)
            setEApellidos(false)
            setECorreoPersonal(false)
            setENroTelefono(false)
            setETipoDocumento(false)
            setENroDocumento(false)
            setEFechaNacimiento(false)
            setEPais(false)
            setEProvincia(false)
            setEDistrito(false)
            setEDireccion(false)
            setEEstudios(false)
            setEUniversidad(false)
            setETitulo(false)
            setEColegio(false)
            setEEstadoCivil(false)
            setENroHijos(false)
            const data_nuevo = {
                url_foto: url_foto,
                id_area_empresa: id_area_empresa,
                area_empresa: area_empresa,
                nombres: nombres,
                apellidos: apellidos,
                correo_personal: correo_personal,
                correo_empresa: correo_empresa,
                nro_telefono: nro_telefono,
                tipo_documento: tipo_documento,
                nro_documento: nro_documento,
                fecha_nacimiento: fecha_nacimiento,
                pais: pais,
                provincia: provincia,
                distrito: distrito,
                direccion: direccion,
                afp: afp,
                seguro: seguro,
                estudios: estudios,
                universidad: universidad,
                titulo: titulo,
                colegio: colegio,
                estado_civil: estado_civil,
                hijos: nro_hijos,
                estado_trabajo: estado_trabajo,
                fecha_inicio: fecha_inicio,
                sueldo_bruto: sueldo_bruto,
                sueldo_neto: sueldo_neto,
                cargo: cargo,
                banco: banco,
                nro_cuenta_bancaria: nro_cuenta_bancaria,
                nro_cuenta_interbancaria: nro_cuenta_interbancaria
            }
            dispatch (trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 0, 16, data_nuevo, false).new_trabajador))
        }
    }
    
    const handleFileChange = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('trabajadores', data, false).file_upload))
    }

    useEffect(() => {
        return (() => {
            setListaAreasEmpresa([])
            dispatch(filesdata(filesConstants('', {}, true).file_upload))
            dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_trabajador))
            dispatch(areasempresadata(areasempresaConstants(0, 0, 0, 0, 0, 0, {}, true).new_area_empresa))
        })
    }, [])

    return (
        <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '80%', height: 'auto'}}>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: '#4A4A4A'}}>Nuevo trabajador
                        </h2>
                    </div>
                </div>
                <div style={{width: '100%', height: '100%'}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <div className='d-flex justify-content-center' style={{width: '38%', height: 'auto',
                                paddingBottom: 28 / proporcional, paddingTop: 28 / proporcional}}>
                            <div className='rounded-circle' style={{width:  292 / proporcional, height: 292 / proporcional,
                                border: '1px solid #4a4a4a'}}>
                                {
                                    url_foto !== '' ? (
                                        <img className='rounded-circle' src={url_foto} 
                                            style={{width: 292 / proporcional, height: 292 / proporcional}}/>
                                    ) : null
                                }
                            </div>
                        </div>
                        <div style={{width: '58%', height: 'auto'}}>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Área empresa 
                                </span>
                                {
                                    nueva_area_empresa ? (
                                        <div className='d-flex' style={{width: '100%', height: 50 / proporcional, border: earea_empresa ? '1px solid red' : '1px solid #007BFF'}}>
                                            <input 
                                                type='default'
                                                id='area_empresa'
                                                className='form-control'
                                                value={area_empresa}
                                                onChange={(event) => setAreaEmpresa(event.target.value)}
                                                style={{width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional}}
                                                placeholder='Nueva área empresa'/>
                                            <img src={boton_cancelar ? cross_select : cross} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                                onClick={() => {setNuevaAreaEmpresa(false); setAreaEmpresa('')}}/>
                                            <img src={boton_save ? save_select : save} style={{width: 48 / proporcional, height: 48 / proporcional,
                                                    padding: 12 / proporcional}} 
                                                onMouseOver={() => setBotonSave(true)} onMouseLeave={() => setBotonSave(false)}
                                                onClick={() => guardar_nueva_area_empresa()}/>
                                        </div>
                                    ) : (
                                        <select
                                            id='area_empresa'
                                            ref={selectRefAreaEmpresa}
                                            className='form-select rounded'
                                            onChange={(event) => seleccionar_area_empresa (event.target.value)}
                                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: earea_empresa ? '1px solid red' : '1px solid #007BFF',
                                                    padding: 10 / proporcional}}>
                                            <option value='0'>{area_empresa === '' ? 'Seleccionar área empresa' : area_empresa}</option>
                                            <option value='1'>Crear nueva área empresa</option>
                                            {
                                                lista_areas_empresa && lista_areas_empresa.length > 0 ? (
                                                    lista_areas_empresa.map ((area_empresa, index) => {
                                                        return (
                                                            <option key={index} value={area_empresa.id + '-' + area_empresa.nombre_area}>{area_empresa.nombre_area}</option>
                                                        )
                                                    })
                                                ) : null
                                            }
                                        </select>
                                    )
                                }
                            </div>
                            <div className='d-flex justify-content-between' 
                                style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div style={{width: '48%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Nombres
                                    </span>
                                    <input 
                                        id='nombres'
                                        type='default'
                                        className='form-control rounded'
                                        value={nombres}
                                        onChange={(event) => setNombres(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: enombres ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Nombres'/>
                                </div>
                                <div style={{width: '48%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Apellidos
                                    </span>
                                    <input 
                                        id='apellidos'
                                        type='default'
                                        className='form-control rounded'
                                        value={apellidos}
                                        onChange={(event) => setApellidos(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: eapellidos ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Apellidos'/>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Correo personal
                                </span>
                                <input 
                                    id='correo_personal'
                                    type='e-mail'
                                    className='form-control rounded'
                                    value={correo_personal}
                                    onChange={(event) => setCorreoPersonal(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: ecorreo_personal ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Correo personal'/>
                            </div>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Correo empresa
                                </span>
                                <input 
                                    id='correo_empresa'
                                    type='e-mail'
                                    className='form-control rounded'
                                    value={correo_empresa}
                                    onChange={(event) => setCorreoEmpresa(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Correo empresa'/>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div className='d-flex justify-content-between' 
                            style={{width: '48%', height: 'auto'}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Fecha nacimiento
                                </span>
                                <input 
                                    id='fecha_nacimiento'
                                    type='date'
                                    className='form-control rounded'
                                    value={fecha_nacimiento}
                                    onChange={(event) => setFechaNacimiento(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: efecha_nacimiento ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Fecha nacimiento'/>
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Nro teléfono
                                </span>
                                <input 
                                    id='nro_telefono'
                                    type='number'
                                    className='form-control rounded'
                                    value={nro_telefono}
                                    onChange={(event) => setNroTelefono(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enro_telefono ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nro teléfono'/>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' 
                            style={{width: '48%', height: 'auto'}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Tipo documento 
                                </span>
                                <select
                                    id='tipo_documento'
                                    ref={selectRefTipoDocumento}
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setTipoDocumento(event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: etipo_documento ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>Tipo documento</option>
                                    <option value='D.N.I'>D.N.I</option>
                                    <option value='Pasaporte'>Pasaporte</option>
                                    <option value='C.E'>C.E</option>
                                    <option value='Otro'>Otro</option>
                                </select>
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Nro documento
                                </span>
                                <input 
                                    id='nro_documento'
                                    type='number'
                                    className='form-control rounded'
                                    value={nro_documento}
                                    onChange={(event) => setNroDocumento(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enro_documento ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nro documento'/>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                País 
                            </span>
                            <select
                                id='pais'
                                ref={selectRefPais}
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? setPais(event.target.value) : null}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: epais ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Seleccionar país</option>
                            </select>
                        </div>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Provincia 
                            </span>
                            <select
                                id='provincia'
                                ref={selectRefProvincia}
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? setProvincia(event.target.value) : null}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eprovincia ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Seleccionar provincia</option>
                            </select>
                        </div>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Distrito 
                            </span>
                            <select
                                id='distrito'
                                ref={selectRefDistrito}
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? setDistrito(event.target.value) : null}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edistrito ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Seleccionar distrito</option>
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '100%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Dirección
                            </span>
                            <input 
                                id='direccion'
                                type='default'
                                className='form-control rounded'
                                value={direccion}
                                onChange={(event) => setDireccion(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edireccion ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Dirección'/>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div className='d-flex justify-content-between' 
                            style={{width: '48%', height: 'auto'}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Colegio 
                                </span>
                                <input
                                    type='default'
                                    id='colegio'
                                    value={colegio}
                                    className='form-control rounded'
                                    onChange={(event) => setColegio(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: ecolegio ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nombre del colegio'/>
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Estudios 
                                </span>
                                <select
                                    id='estudios'
                                    ref={selectRefEstudios}
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setEstudios(event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: eestudios ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>Seleccionar estudios</option>
                                </select>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' 
                            style={{width: '48%', height: 'auto'}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Título 
                                </span>
                                <select
                                    id='colegio'
                                    ref={selectRefTitulo}
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setTitulo(event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: etitulo ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>Seleccionar titulo</option>
                                </select>
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Universidad 
                                </span>
                                <input
                                    type='default'
                                    id='universidad'
                                    value={universidad}
                                    className='form-control rounded'
                                    onChange={(event) => setUniversidad(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: euniversidad ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nombre del universidad'/>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div className='d-flex justify-content-between' 
                            style={{width: '48%', height: 'auto'}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    AFP 
                                </span>
                                <select
                                    id='afp'
                                    ref={selectRefAfp}
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setAfp(event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>Seleccionar AFP</option>
                                </select>
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Seguro 
                                </span>
                                <select
                                    id='seguro'
                                    ref={selectRefSeguro}
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setSeguro(event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>Seleccionar Seguro</option>
                                </select>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between' 
                            style={{width: '48%', height: 'auto'}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Estado civil 
                                </span>
                                <select
                                    id='colegio'
                                    ref={selectRefEstadoCivil}
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setEstadoCivil(event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: eestado_civil ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>Seleccionar estado civil</option>
                                </select>
                            </div>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Número de hijos
                                </span>
                                <input
                                    type='number'
                                    id='nro_hijos'
                                    value={nro_hijos}
                                    className='form-control rounded'
                                    onChange={(event) => setNroHijos(event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enro_hijos ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Número de hijos'/>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Estado de trabajo
                            </span>
                            <select
                                id='estado_trabajo'
                                ref={selectRefEstadoTrabajo}
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? setEstadoTrabajo(event.target.value) : null}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Estado trabajo</option>
                                <option value='Trabajando'>Trabajando</option>
                                <option value='Vacaciones'>Vacaciones</option>
                                <option value='Descanso médico'>Descanso médico</option>
                                <option value='Maternidad'>Maternidad</option>
                                <option value='Otro'>Otro</option>
                            </select>
                        </div>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Cargo en la empresa
                            </span>
                            <input 
                                id='cargo'
                                type='default'
                                className='form-control rounded'
                                value={cargo}
                                onChange={(event) => setCargo(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Cargo empresa'/>
                        </div>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Fecha de inicio
                            </span>
                            <input 
                                id='fecha_inicio'
                                type='date'
                                className='form-control rounded'
                                value={fecha_inicio}
                                onChange={(event) => setFechaInicio(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Fecha inicio'/>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Sueldo bruto (S/.)
                            </span>
                            <input
                                type='number'
                                id='sueldo_bruto'
                                className='form-control rounded'
                                value={sueldo_bruto}
                                onChange={(event) => setSueldoBruto(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Sueldo bruto'/>
                        </div>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Sueldo neto (S/.)
                            </span>
                            <input
                                type='number'
                                id='sueldo_neto'
                                className='form-control rounded'
                                value={sueldo_neto}
                                onChange={(event) => setSueldoNeto(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Sueldo neto'/>
                        </div>
                        <div style={{width: '32%', height: 'auto'}}/>
                    </div>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Banco
                            </span>
                            <select
                                id='banco'
                                ref={selectRefBanco}
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? setBanco(event.target.value) : null}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Banco</option>
                            </select>
                        </div>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Nro cuenta
                            </span>
                            <input
                                type='number'
                                id='nro_cuenta_bancaria'
                                value={nro_cuenta_bancaria}
                                className='form-control rounded'
                                onChange={(event) => setNroCuentaBancaria(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nro cuenta'/>
                        </div>
                        <div style={{width: '32%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Nro cuenta interbancaria
                            </span>
                            <input
                                type='number'
                                id='nro_cuenta_inerbancaria'
                                value={nro_cuenta_interbancaria}
                                className='form-control rounded'
                                onChange={(event) => setNroCuentaInterBancaria(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Cuenta interbancaria'/>
                        </div>
                    </div>
                    <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url imagen
                        </span>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                            <input 
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChange}/>
                            <div className={boton_subir_foto ? 'shadow-lg rounded' : 'rounded'} 
                                style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                    lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                    fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload}
                                    onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                            onClick={() => guardar_producto()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Guardar datos
                            </p>
                        </div>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => volver_a_lista()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
