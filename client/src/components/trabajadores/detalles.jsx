import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {trabajadoresdata} from '../../redux/slice/trabajadoresdata'
import {trabajadoresConstants} from '../../uri/trabajadores-constants'
import { set_data_trabajadores } from '../../redux/actions/data'

export default function DetallesTrabajador ({proporcional}) {

    const location = useLocation()
    const navigate = useNavigate ()
    const dispatch = useDispatch()

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

    const [id_trabajador, setIdTrabajador] = useState('')
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

    const [eurl_foto, setEUrlFoto] = useState(false)
    const [eid_area_empresa, setEIdAreaEmpresa] = useState (false)
    const [earea_empresa, setEAreaEmpresa] = useState(false)
    const [enombres, setENombres] = useState(false)
    const [eapellidos, setEApellidos] = useState(false)
    const [ecorreo_personal, setECorreoPersonal] = useState(false)
    const [ecorreo_empresa, setECorreoEmpresa] = useState(false)
    const [enro_telefono, setENroTelefono] = useState(false)
    const [etipo_documento, setETipoDocumento] = useState(false)
    const [enro_documento, setENroDocumento] = useState(false)
    const [efecha_nacimiento, setEFechaNacimiento] = useState(false)
    const [epais, setEPais] = useState(false)
    const [eprovincia, setEProvincia] = useState(false)
    const [edistrito, setEDistrito] = useState(false)
    const [edireccion, setEDireccion] = useState(false)
    const [eafp, setEAfp] = useState(false)
    const [eseguro, setESeguro] = useState(false)
    const [eestudios, setEEstudios] = useState(false)
    const [euniversidad, setEUniversidad] = useState(false)
    const [etitulo, setETitulo] = useState(false)
    const [ecolegio, setEColegio] = useState(false)
    const [eestado_civil, setEEstadoCivil] = useState(false)
    const [enro_hijos, setENroHijos] = useState (false)
    const [eestado_trabajo, setEEstadoTrabajo] = useState(false)
    const [efecha_inicio, setEFechaInicio] = useState (false)
    const [esueldo_bruto, setESueldoBruto] = useState(false)
    const [esueldo_neto, setESueldoNeto] = useState(false)
    const [ecargo, setECargo] = useState(false)

    const [lista_areas_empresa, setListaAreasEmpresa] = useState([])

    const [editar_informacion, setEditarInformacion] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {get_trabajador, update_trabajador} = useSelector(({trabajadores_data}) => trabajadores_data)
    const {get_ares_empresa} = useSelector(({areasempresa_data}) => areasempresa_data)
    const {data_trabajador, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (update_trabajador && update_trabajador.success === true && update_trabajador.trabajador){
            dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 16, {}, true).update_trabajador))
            window.scrollTo(0, 0)
            setEditarInformacion(false)
        }
    }, [update_trabajador])

    useEffect(() => {
        if (data_trabajador.trabajador === undefined){
            dispatch(trabajadoresdata(trabajadoresConstants(location.pathname.split ('/')[3], 0, 0, 0, 0, 0, 0, 16, {}, false).get_trabajador))
        }else{
            setIdTrabajador(data_trabajador.id)
            setUrlFoto(data_trabajador.url_foto)
            setIdAreaEmpresa(data_trabajador.id_area_empresa)
            setAreaEmpresa(data_trabajador.area_empresa)
            setNombres(data_trabajador.nombres)
            setApellidos(data_trabajador.apellidos)
            setCorreoPersonal(data_trabajador.correo_personal)
            setCorreoEmpresa(data_trabajador.correo_empresa)
            setNroTelefono(data_trabajador.nro_telefono)
            setTipoDocumento(data_trabajador.tipo_documento)
            setNroDocumento(data_trabajador.nro_documento)
            setFechaNacimiento(data_trabajador.fecha_nacimiento)
            setPais(data_trabajador.pais)
            setProvincia(data_trabajador.provincia)
            setDistrito(data_trabajador.distrito)
            setDireccion(data_trabajador.direccion)
            setAfp(data_trabajador.afp)
            setSeguro(data_trabajador.seguro)
            setEstudios(data_trabajador.estudios)
            setUniversidad(data_trabajador.universidad)
            setTitulo(data_trabajador.titulo)
            setColegio(data_trabajador.colegio)
            setEstadoCivil(data_trabajador.estado_civil)
            setNroHijos(data_trabajador.nro_hijos)
            setEstadoTrabajo(data_trabajador.estado_trabajo)
            setFechaInicio(data_trabajador.fecha_inicio)
            setSueldoBruto(data_trabajador.sueldo_bruto)
            setSueldoNeto(data_trabajador.sueldo_neto)
            setCargo(data_trabajador.cargo)
        }
    }, [])

    useEffect(() => {
        if (get_trabajador && get_trabajador.success === true && get_trabajador.trabajador){
            setIdTrabajador(get_trabajador.trabajador.id)
            setUrlFoto(get_trabajador.trabajador.url_foto)
            setIdAreaEmpresa(get_trabajador.trabajador.id_area_empresa)
            setAreaEmpresa(get_trabajador.trabajador.area_empresa)
            setNombres(get_trabajador.trabajador.nombres)
            setApellidos(get_trabajador.trabajador.apellidos)
            setCorreoPersonal(get_trabajador.trabajador.correo_personal)
            setCorreoEmpresa(get_trabajador.trabajador.correo_empresa)
            setNroTelefono(get_trabajador.trabajador.nro_telefono)
            setTipoDocumento(get_trabajador.trabajador.tipo_documento)
            setNroDocumento(get_trabajador.trabajador.nro_documento)
            setFechaNacimiento(get_trabajador.trabajador.fecha_nacimiento)
            setPais(get_trabajador.trabajador.pais)
            setProvincia(get_trabajador.trabajador.provincia)
            setDistrito(get_trabajador.trabajador.distrito)
            setDireccion(get_trabajador.trabajador.direccion)
            setAfp(get_trabajador.trabajador.afp)
            setSeguro(get_trabajador.trabajador.seguro)
            setEstudios(get_trabajador.trabajador.estudios)
            setUniversidad(get_trabajador.trabajador.universidad)
            setTitulo(get_trabajador.trabajador.titulo)
            setColegio(get_trabajador.trabajador.colegio)
            setEstadoCivil(get_trabajador.trabajador.estado_civil)
            setNroHijos(get_trabajador.trabajador.nro_hijos)
            setEstadoTrabajo(get_trabajador.trabajador.estado_trabajo)
            setFechaInicio(get_trabajador.trabajador.fecha_inicio)
            setSueldoBruto(get_trabajador.trabajador.sueldo_bruto)
            setSueldoNeto(get_trabajador.trabajador.sueldo_neto)
            setCargo(get_trabajador.trabajador.cargo)
            dispatch(trabajadoresdata(trabajadoresConstants(0, 0, 0, 0, 0, 0, 16, {}, true).get_trabajador))
        }
    }, [get_trabajador])

    const volver_a_lista = () => {
        dispatch(set_data_trabajadores({}))
        window.scrollTo(0, 0)
        navigate ('/panel/trabajadores')
    }
    
    const actualizar_datos_proyecto = () => {
        if (nombres === '' || apellidos === '' || nro_telefono === '' || tipo_documento === '' || nro_documento === '' ||
                correo_personal === ''
        ){
            setEUrlFoto(url_foto === '' ? true : false)
            setEIdAreaEmpresa(id_area_empresa === '' ? true : false)
            setEAreaEmpresa(area_empresa === '' ? true : false)
            setENombres(nombres === '' ? true : false)
            setEApellidos(apellidos === '' ? true : false)
            setECorreoPersonal(correo_personal === '' ? true : false)
            setECorreoEmpresa(correo_empresa === '' ? true : false)
            setENroTelefono(nro_telefono === '' ? true : false)
            setETipoDocumento(tipo_documento === '' ? true : false)
            setENroDocumento(nro_documento === '' ? true : false)
            setEFechaNacimiento(fecha_inicio === '' ? true : false)
            setEPais(pais === '' ? true : false)
            setEProvincia(provincia === '' ? true : false)
            setEDistrito(distrito === '' ? true : false)
            setEDireccion(direccion === '' ? true : false)
            setEAfp(afp === '' ? true : false)
            setESeguro(seguro === '' ? true : false)
            setEEstudios(estudios === '' ? true : false)
            setEUniversidad(universidad === '' ? true : false)
            setETitulo(titulo === '' ? true : false)
            setEColegio(colegio === '' ? true : false)
            setEEstadoCivil(estado_civil === '' ? true : false)
            setENroHijos(nro_hijos === '' ? true : false)
            setEEstadoTrabajo(estado_trabajo === '' ? true : false)
            setEFechaInicio(fecha_inicio === '' ? true : false)
            setESueldoBruto(sueldo_bruto === '' ? true : false)
            setESueldoNeto(sueldo_neto === '' ? true : false)
            setECargo(cargo === '' ? true : false)
        }else{
            setEUrlFoto(false)
            setEIdAreaEmpresa(false)
            setEAreaEmpresa(false)
            setENombres(false)
            setEApellidos(false)
            setECorreoPersonal(false)
            setECorreoEmpresa(false)
            setENroTelefono(false)
            setETipoDocumento(false)
            setENroDocumento(false)
            setEFechaNacimiento(false)
            setEPais(false)
            setEProvincia(false)
            setEDistrito(false)
            setEDireccion(false)
            setEAfp(false)
            setESeguro(false)
            setEEstudios(false)
            setEUniversidad(false)
            setETitulo(false)
            setEColegio(false)
            setEEstadoCivil(false)
            setENroHijos(false)
            setEEstadoTrabajo(false)
            setEFechaInicio(false)
            setESueldoBruto(false)
            setESueldoNeto(false)
            setECargo(false)
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
                nro_hijos: nro_hijos,
                estado_trabajo: estado_trabajo,
                fecha_inicio: fecha_inicio,
                sueldo_bruto: sueldo_bruto,
                sueldo_neto: sueldo_neto,
                cargo: cargo
            }
            dispatch (trabajadoresdata(trabajadoresConstants(id_trabajador, 0, 0, 0, 0, 0, 0, 16, data_nuevo, false).update_trabajador))
        }
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
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
                                Área de la empresa 
                            </span>
                            <select
                                disabled={!editar_informacion}
                                id='area_empresa'
                                ref={selectRefAreaEmpresa}
                                className='form-select rounded'
                                onChange={(event) => seleccionar_area_empresa(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: earea_empresa ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}>
                                <option value='0'>Seleccionar área empresa</option>
                                {
                                    lista_areas_empresa && lista_areas_empresa.length > 0 ? (
                                        lista_areas_empresa.map ((area_empresa, index) => {
                                            return (
                                                <option value={area_empresa.id + '-' + area_empresa.nombre_area}>{area_empresa.nombre_area}</option>
                                            )
                                        })
                                    ) : null
                                }
                            </select>
                        </div>
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div style={{width: '48%', height: 'auto'}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Nombres
                                </span>
                                <input
                                    disabled={!editar_informacion} 
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
                                    disabled={!editar_informacion} 
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
                                disabled={!editar_informacion} 
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
                                disabled={!editar_informacion} 
                                id='correo_empresa'
                                type='e-mail'
                                className='form-control rounded'
                                value={correo_empresa}
                                onChange={(event) => setCorreoEmpresa(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: ecorreo_empresa ? '1px solid red' : '1px solid #007BFF',
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
                                disabled={!editar_informacion} 
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
                                disabled={!editar_informacion} 
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
                                disabled={!editar_informacion}
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
                                disabled={!editar_informacion} 
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
                            disabled={!editar_informacion}
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
                            disabled={!editar_informacion}
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
                            disabled={!editar_informacion}
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
                            disabled={!editar_informacion} 
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
                                disabled={!editar_informacion}
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
                                disabled={!editar_informacion}
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
                                disabled={!editar_informacion}
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
                                disabled={!editar_informacion}
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
                                disabled={!editar_informacion}
                                id='afp'
                                ref={selectRefAfp}
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? setAfp(event.target.value) : null}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eafp ? '1px solid red' : '1px solid #007BFF',
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
                                disabled={!editar_informacion}
                                id='seguro'
                                ref={selectRefSeguro}
                                className='form-select rounded'
                                onChange={(event) => event.target.value !== '0' ? setSeguro(event.target.value) : null}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: eseguro ? '1px solid red' : '1px solid #007BFF',
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
                                disabled={!editar_informacion}
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
                                disabled={!editar_informacion}
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
                            disabled={!editar_informacion}
                            id='estado_trabajo'
                            ref={selectRefEstadoTrabajo}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setEstadoTrabajo(event.target.value) : null}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eestado_trabajo ? '1px solid red' : '1px solid #007BFF',
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
                            disabled={!editar_informacion} 
                            id='cargo'
                            type='default'
                            className='form-control rounded'
                            value={cargo}
                            onChange={(event) => setCargo(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecargo ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Cargo empresa'/>
                    </div>
                    <div style={{width: '32%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Fecha de inicio
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='fecha_inicio'
                            type='date'
                            className='form-control rounded'
                            value={fecha_inicio}
                            onChange={(event) => setFechaInicio(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: efecha_inicio ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Fecha inicio'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '48%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Sueldo bruto (S/.)
                            </span>
                            <input
                                disabled={!editar_informacion}
                                type='number'
                                id='sueldo_bruto'
                                className='form-select rounded'
                                value={sueldo_bruto}
                                onChange={(event) => setSueldoBruto(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: esueldo_bruto ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Sueldo bruto'/>
                        </div>
                        <div style={{width: '48%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Sueldo neto (S/.)
                            </span>
                            <input
                                disabled={!editar_informacion}
                                type='number'
                                id='sueldo_neto'
                                className='form-select rounded'
                                value={sueldo_neto}
                                onChange={(event) => setSueldoNeto(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: esueldo_neto ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Sueldo neto'/>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '100%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Url foto
                        </span>
                        <input
                            disabled={!editar_informacion} 
                            id='url_foto'
                            type='web'
                            className='form-control rounded'
                            value={url_foto}
                            onChange={(event) => setUrlFoto(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_foto ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Url foto'/>
                    </div>
                </div>
                {
                    editar_informacion ? (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_datos_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Actualizar datos
                                </p>
                            </div>
                            <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                onClick={() => {setEditarInformacion(false); window.scrollTo(0, 0)}}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cancelar
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                onClick={() => {setEditarInformacion(true); window.scrollTo(0, 0)}}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Editar datos
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
                    )
                }
            </div>
        </div>
    )
}
