import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {personaldata} from '../../../redux/slice/personaldata'
import {personalConstants} from '../../../uri/personal-constants'
import { set_data_personal } from '../../../redux/actions/data'
import {departamentosdata} from '../../../redux/slice/departamentosdata'
import { departamentosConstants } from '../../../uri/departamentos-constants'
import {filesdata} from '../../../redux/slice/filesdata'
import {filesConstants} from '../../../uri/files-constants'

import search_select from '../../../assets/iconos/menu/superior/search_v1.png'
import search from '../../../assets/iconos/menu/superior/search_v2.png'

export default function DetallesTrabajador ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefBanco = useRef(null)
    const selectRefAreaEmpresa = useRef(null)
    const selectRefJefeInmediato = useRef(null)
    const selectRefTipoDocumento = useRef(null)
    const selectGenero = useRef(null)
    const selectRefPais = useRef(null)
    const selectRefProvincia = useRef(null)
    const selectRefDistrito = useRef(null)
    const selectRefEstadoTrabajo = useRef(null)
    const selectRefEstadoCivil = useRef(null)
    const selectRefAfp = useRef(null)
    const selectRefSeguro = useRef(null)
    const selectRefEstudios = useRef(null)
    const selectRefTitulo = useRef (null)

    const [editar_informacion, setEditarInformacion] = useState(false)

    const [file_imagen, setFileImagen] = useState (null)
    const [file_evaluacion, setFileEvaluacion] = useState (null)

    const [select_file, setSelectFile] = useState('')

    const [id_trabajador, setIdTrabajador] = useState('')
    const [url_foto, setUrlFoto] = useState('')
    const [id_departamento, setIdDepartamento] = useState ('')
    const [departamento, setDataDepartamento] = useState('')
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
    const [genero, setGenero] = useState('')
    const [jefe_inmediato, setJefeInmediato] = useState('')
    const [id_jefe_inmediato, setIdJefeInmediato] = useState('')
    const [bonos, setBonos] = useState('')
    const [comisiones, setComisiones] = useState('')
    const [evaluaciones, setEvaluaciones] = useState('')
    const [nro_cuenta_bancaria, setNroCuentaBancaria] = useState('')
    const [nro_cuenta_interbancaria, setNroCuentaInterBancaria] = useState('')

    const [search_jefe_inmediato, setSearchJefeInmediato] = useState('')
    const [id_search_jefe_inmediato, setIdSearchJefeInmediato] = useState('')

    const [edepartamento, setEDepartamento] = useState(false)
    const [enombres, setENombres] = useState(false)
    const [eapellidos, setEApellidos] = useState(false)
    const [enro_telefono, setENroTelefono] = useState(false)
    const [etipo_documento, setETipoDocumento] = useState(false)
    const [enro_documento, setENroDocumento] = useState(false)
    const [efecha_nacimiento, setEFechaNacimiento] = useState(false)

    const [boton_subir_foto, setBotonSubirFoto] = useState(false)
    const [boton_subir_evaluacion, setBotonSubirEvaluacion] = useState(false)

    const [boton_search_jefe, setBotonSearchJefe] = useState(false)

    const [lista_departamentos, setListaDepartamentos] = useState([])
    const [lista_jefes, setListaJefes] = useState([])

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_personal, get_personal, get_personal_filter} = useSelector(({personal_data}) => personal_data)
    const {file_upload} = useSelector(({files_data}) => files_data)
    const {get_departamentos_filter} = useSelector(({departamentos_filter}) => departamentos_filter)
    const {open_menu_lateral, data_personal} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (update_personal && update_personal.success === true && update_personal.trabajador){
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).update_personal))
            window.scrollTo(0, 0)
            setEditarInformacion(false)
        }
    }, [update_personal])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.usccess === true && get_personal_filter.personal){
            setListaJefes(get_personal_filter.personal)
        }
    }, [get_personal_filter])

    useEffect(() => {
        if (file_upload && file_upload.success === true && file_upload.message === true){
            if (select_file === 'foto'){
                setUrlFoto(`https://api.developer-ideas.com/personal/${file_imagen.name}`)
            }else{
                setFileEvaluacion(`https://api.developer-ideas.com/personal/${file_imagen.name}`)
            }
            dispatch (filesdata(filesConstants(0, {}, true).file_upload))
        }
    }, [file_upload])

    useEffect(() => {
        if (get_departamentos_filter && get_departamentos_filter.success === true &&
                get_departamentos_filter.departamento){
            setListaDepartamentos(get_departamentos_filter.departamento)
        }
    }, [get_departamentos_filter])

    useEffect(() => {
        if (data_personal.nombres === undefined){
            dispatch(personaldata(personalConstants(location.pathname.split ('/')[6], 0, 0, 0, 0, 0, 0, 16, {}, false).get_producto))
        }else{
            setIdTrabajador(data_personal.id_trabajador)
            setUrlFoto(data_personal.url_foto)
            setIdDepartamento(data_personal.id_departamento)
            setDataDepartamento(data_personal.departamento)
            setNombres(data_personal.nombres)
            setApellidos(data_personal.apellidos)
            setCorreoPersonal(data_personal.correo_personal)
            setCorreoEmpresa(data_personal.correo_empresa)
            setNroTelefono(data_personal.nro_telefono)
            setTipoDocumento(data_personal.tipo_documento)
            setNroDocumento(data_personal.nro_documento)
            setFechaNacimiento(data_personal.fecha_nacimiento)
            setPais(data_personal.pais)
            setProvincia(data_personal.provincia)
            setDistrito(data_personal.distrito)
            setDireccion(data_personal.direccion)
            setAfp(data_personal.afp)
            setSeguro(data_personal.seguro)
            setEstudios(data_personal.estudios)
            setUniversidad(data_personal.universidad)
            setTitulo(data_personal.titulo)
            setColegio(data_personal.colegio)
            setEstadoCivil(data_personal.estado_civil)
            setNroHijos(data_personal.hijos)
            setEstadoTrabajo(data_personal.estado_trabajo)
            setFechaInicio(data_personal.fecha_inicio)
            setSueldoBruto(data_personal.sueldo_bruto)
            setSueldoNeto(data_personal.sueldo_neto)
            setCargo(data_personal.cargo)
            setBanco(data_personal.banco)
            setGenero(data_personal.genero)
            setJefeInmediato(data_personal.jefe_inmediato)
            setIdJefeInmediato(data_personal.id_jefe_inmediato)
            setBonos(data_personal.bonos)
            setComisiones(data_personal.comisiones)
            setEvaluaciones(data_personal.evaluaciones)
            setNroCuentaBancaria(data_personal.nro_cuenta_bancaria)
            setNroCuentaInterBancaria(data_personal.nro_cuenta_interbancaria)
        }
    }, [])

    useEffect(() => {
        if (get_personal && get_personal.success === true && get_personal.trabajador){
            setIdTrabajador(get_personal.trabajador.id_trabajador)
            setUrlFoto(get_personal.trabajador.url_foto)
            setIdDepartamento(get_personal.trabajador.id_departamento)
            setDataDepartamento(get_personal.trabajador.departamento)
            setNombres(get_personal.trabajador.nombres)
            setApellidos(get_personal.trabajador.apellidos)
            setCorreoPersonal(get_personal.trabajador.correo_personal)
            setCorreoEmpresa(get_personal.trabajador.correo_empresa)
            setNroTelefono(get_personal.trabajador.nro_telefono)
            setTipoDocumento(get_personal.trabajador.tipo_documento)
            setNroDocumento(get_personal.trabajador.nro_documento)
            setFechaNacimiento(get_personal.trabajador.fecha_nacimiento)
            setPais(get_personal.trabajador.pais)
            setProvincia(get_personal.trabajador.provincia)
            setDistrito(get_personal.trabajador.distrito)
            setDireccion(get_personal.trabajador.direccion)
            setAfp(get_personal.trabajador.afp)
            setSeguro(get_personal.trabajador.seguro)
            setEstudios(get_personal.trabajador.estudios)
            setUniversidad(get_personal.trabajador.universidad)
            setTitulo(get_personal.trabajador.titulo)
            setColegio(get_personal.trabajador.colegio)
            setEstadoCivil(get_personal.trabajador.estado_civil)
            setNroHijos(get_personal.trabajador.hijos)
            setEstadoTrabajo(get_personal.trabajador.estado_trabajo)
            setFechaInicio(get_personal.trabajador.fecha_inicio)
            setSueldoBruto(get_personal.trabajador.sueldo_bruto)
            setSueldoNeto(get_personal.trabajador.sueldo_neto)
            setCargo(get_personal.trabajador.cargo)
            setBanco(get_personal.trabajador.banco)
            setGenero(get_personal.trabajador.genero)
            setJefeInmediato(get_personal.trabajador.jefe_inmediato)
            setIdJefeInmediato(get_personal.trabajador.id_jefe_inmediato)
            setBonos(get_personal.trabajador.bonos)
            setComisiones(get_personal.trabajador.comisiones)
            setEvaluaciones(get_personal.trabajador.evaluaciones)
            setNroCuentaBancaria(get_personal.trabajador.nro_cuenta_bancaria)
            setNroCuentaInterBancaria(get_personal.trabajador.nro_cuenta_interbancaria)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, true).get_personal))
        }
    }, [get_personal])

    const volver_a_lista = () => {
        dispatch(set_data_personal({}))
        window.scrollTo(0, 0)
        navigate ('/panel/rrhh/personal')
    }
    
    const actualizar_data_trabajador = () => {
        window.scrollTo(0, 0)
        if (nombres === '' || apellidos === '' || nro_telefono === '' || tipo_documento === '' || nro_documento === '' ||
                correo_personal === '' || departamento === '' || fecha_nacimiento == ''){
            setEDepartamento(departamento === '' ? true : false)
            setENombres(nombres === '' ? true : false)
            setEApellidos(apellidos === '' ? true : false)
            setENroTelefono(nro_telefono === '' ? true : false)
            setETipoDocumento(tipo_documento === '' ? true : false)
            setENroDocumento(nro_documento === '' ? true : false)
            setEFechaNacimiento(fecha_nacimiento === '' ? true : false)
        }else{
            setEDepartamento(false)
            setENombres(false)
            setEApellidos(false)
            setENroTelefono(false)
            setETipoDocumento(false)
            setENroDocumento(false)
            setEFechaNacimiento(false)
            const data_nuevo = {
                url_foto: url_foto,
                id_departamento: id_departamento,
                departamento: departamento,
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
                genero: genero,
                jefe_inmediato: jefe_inmediato,
                id_jefe_inmediato: id_jefe_inmediato,
                bonos: bonos,
                comisiones: comisiones,
                evaluaciones: evaluaciones,
                nro_cuenta_bancaria: nro_cuenta_bancaria,
                nro_cuenta_interbancaria: nro_cuenta_interbancaria
            }
            dispatch (personaldata(personalConstants(id_trabajador, 0, 0, 0, 0, 0, 0, 16, data_nuevo, false).update_personal))
        }
    }

    const obtener_data_editar = () => {
        window.scrollTo(0, 0)
        setEditarInformacion(true)
        dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 100, {}, false).get_departamentos_filter))
    }

    const seleccionar_area_empresa = (value) => {
        if (value !== '0'){
            setIdDepartamento(value.split ('-')[0])
            setDataDepartamento(value.split ('-')[1])
        }
    }

    const buscar_jefe_inmediato = () => {
        dispatch(personaldata(personalConstants(0, search_jefe_inmediato, 0, 0, 0, 0, 0, 50, {}, false).get_personal_filter))
    }

    const seleccionar_jefe_inmediato = (value) => {
        if (value !== '0'){
            setIdJefeInmediato(value.split ('*')[0])
            setJefeInmediato(value.split ('*')[1].replace('-', ' '))
        }
    }
    
    const handleFileChangeFoto = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUploadFoto = (event) => {
        event.preventDefault()
        setSelectFile('foto')
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('personal', data, false).file_upload))
    }
    
    const handleFileChangeEvaluacion = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUploadEvaluacion = (event) => {
        event.preventDefault()
        setSelectFile('evaluacion')
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants('personal', data, false).file_upload))
    }

    useEffect(() => {
        return (() => {
            setListaDepartamentos([])
            dispatch(filesdata(filesConstants('', {}, true).file_upload))
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_personal))
        })
    }, [])
    
    return (
        <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 80 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 80 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-between' style={{width: '60%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: '#4A4A4A'}}>Trabajador: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}>{apellidos}</span>
                        </h2>
                    </div>
                </div>
                <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                    <div style={{width: '60%', height: '100%'}}>
                        <div style={{width: '100%', height: '100%'}}>
                            <div className='d-flex justify-content-between' 
                                style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='d-flex justify-content-center' style={{width: '38%', height: 'auto',
                                        paddingBottom: 48 / proporcional, paddingTop: 48 / proporcional}}>
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
                                    <h2 style={{fontSize: 22 / proporcional, lineHeight: `${30 / proporcional}px`,
                                        marginBottom: 16 / proporcional, fontWeight: 500, color: '#007bff'}}>Datos personales</h2>
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                    <div className='d-flex justify-content-between' 
                                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
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
                                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                        padding: 10 / proporcional}}
                                                placeholder='Número de hijos'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between' 
                                style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div style={{width: '32%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Género
                                    </span>
                                    <select
                                        disabled={!editar_informacion}
                                        id='genero'
                                        ref={selectGenero}
                                        className='form-select rounded'
                                        onChange={(event) => event.target.value !== '0' ? setGenero(event.target.value) : null}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>Tipo documento</option>
                                        <option value='Hombre'>Hombre</option>
                                        <option value='Mujer'>Mujer</option>
                                        <option value='Otro'>Otro</option>
                                    </select>
                                </div>
                                <div style={{width: '32%', height: 'auto'}}>
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
                                <div style={{width: '32%', height: 'auto'}}>
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
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Correo personal'/>
                                </div>
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Correo empresa'/>
                                </div>
                            </div>
                            <h2 style={{fontSize: 22 / proporcional, lineHeight: `${30 / proporcional}px`,
                                marginBottom: 16 / proporcional, fontWeight: 500, color: '#007bff'}}>Datos dirección</h2>
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
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
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
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
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
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
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
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Dirección'/>
                                </div>
                            </div>
                            <h2 style={{fontSize: 22 / proporcional, lineHeight: `${30 / proporcional}px`,
                                marginBottom: 16 / proporcional, fontWeight: 500, color: '#007bff'}}>Datos estudios</h2>
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
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
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
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
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
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
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
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                    padding: 10 / proporcional}}
                                            placeholder='Nombre del universidad'/>
                                    </div>
                                </div>
                            </div>
                            <h2 style={{fontSize: 22 / proporcional, lineHeight: `${30 / proporcional}px`,
                                marginBottom: 16 / proporcional, fontWeight: 500, color: '#007bff'}}>Datos trabajo</h2>
                            <div className='d-flex justify-content-between' 
                                style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Departamento 
                                    </span>
                                    <select
                                        disabled={!editar_informacion}
                                        id='departamento'
                                        ref={selectRefAreaEmpresa}
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_area_empresa (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: edepartamento ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{departamento === '' ? 'Seleccionar departamento' : departamento}</option>
                                        <option value='1'>Crear nueva departamento</option>
                                        {
                                            lista_departamentos && lista_departamentos.length > 0 ? (
                                                lista_departamentos.map ((departamento, index) => {
                                                    return (
                                                        <option key={index} value={departamento.id + '-' + departamento.nombre_area}>{departamento.nombre_area}</option>
                                                    )
                                                })
                                            ) : null
                                        }
                                    </select>
                                </div>
                                <div style={{width: '32%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Buscar jefe inmediato
                                    </span>
                                    <div className='d-flex justify-content-between'
                                        style={{width: '100%', height: 'auto', border: '1px solid #007BFF'}}>
                                    <input 
                                            disabled={!editar_informacion}
                                        id='search_jefe_inmediato'
                                        type='default'
                                        className='form-control rounded border-0'
                                        value={search_jefe_inmediato}
                                        onChange={(event) => setSearchJefeInmediato(event.target.value)}
                                        style={{width: '90%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif',
                                                padding: 10 / proporcional}}
                                        placeholder='Nombre del jefe_inmediato'/>
                                        <img src={boton_search_jefe ? search_select : search} style={{width: 50 / proporcional, 
                                                height: 50 / proporcional, padding: 13 / proporcional, cursor: 'pointer'}}
                                            onMouseOver={() => setBotonSearchJefe (true)} onMouseLeave={() => setBotonSearchJefe(false)}
                                            onClick={() => buscar_jefe_inmediato()}/>
                                    </div>
                                </div>
                                <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Jefe inmediato 
                                    </span>
                                    <select
                                        disabled={!editar_informacion}
                                        id='jefe_inmediato'
                                        ref={selectRefJefeInmediato}
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_jefe_inmediato (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: edepartamento ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{jefe_inmediato === '' ? 'Seleccionar jefe inmediato' : jefe_inmediato}</option>
                                        {
                                            lista_jefes && lista_jefes.length > 0 ? (
                                                lista_jefes.map ((jefe, index) => {
                                                    return (
                                                        <option key={index} value={jefe.id + '*' + jefe.nombres + '-' + jefe.apellidos}>{jefe.nombres} {jefe.apellidos}</option>
                                                    )
                                                })
                                            ) : null
                                        }
                                    </select>
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
                                            disabled={!editar_informacion}
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
                                            disabled={!editar_informacion} 
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
                            <h2 style={{fontSize: 22 / proporcional, lineHeight: `${30 / proporcional}px`,
                                marginBottom: 16 / proporcional, fontWeight: 500, color: '#007bff'}}>Sueldo, beneficios seguros</h2>
                            <div className='d-flex justify-content-between' 
                                style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                                        disabled={!editar_informacion}
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
                                style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div style={{width: '48%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Sueldo bruto (S/.)
                                    </span>
                                    <input
                                            disabled={!editar_informacion}
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
                                <div style={{width: '48%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Sueldo neto (S/.)
                                    </span>
                                    <input
                                            disabled={!editar_informacion}
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
                            </div>
                            <div className='d-flex justify-content-between' 
                                style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div style={{width: '48%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Bono (S/.)
                                    </span>
                                    <input
                                            disabled={!editar_informacion}
                                        type='number'
                                        id='bonos'
                                        className='form-control rounded'
                                        value={bonos}
                                        onChange={(event) => setBonos(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Bono'/>
                                </div>
                                <div style={{width: '48%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Comisiones (S/.)
                                    </span>
                                    <input
                                            disabled={!editar_informacion}
                                        type='number'
                                        id='comisiones'
                                        className='form-control rounded'
                                        value={comisiones}
                                        onChange={(event) => setComisiones(event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='COmisiones'/>
                                </div>
                            </div>
                            <h2 style={{fontSize: 22 / proporcional, lineHeight: `${30 / proporcional}px`,
                                marginBottom: 16 / proporcional, fontWeight: 500, color: '#007bff'}}>Datos cuenta bancaria</h2>
                            <div className='d-flex justify-content-between' 
                                style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div style={{width: '32%', height: 'auto'}}>
                                    <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif'}}>
                                        Banco
                                    </span>
                                    <select
                                        disabled={!editar_informacion}
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
                                            disabled={!editar_informacion}
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
                                            disabled={!editar_informacion}
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
                            <h2 style={{fontSize: 22 / proporcional, lineHeight: `${30 / proporcional}px`,
                                marginBottom: 16 / proporcional, fontWeight: 500, color: '#007bff'}}>Foto de perfil</h2>
                            <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Url imagen
                                </span>
                                <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                                    <input 
                                            disabled={!editar_informacion}
                                        class="form-control" 
                                        type="file" 
                                        id="formFile" 
                                        style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                        onChange={handleFileChangeFoto}/>
                                    <div className={boton_subir_foto ? 'shadow-lg rounded' : 'rounded'} 
                                        style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                        <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                            lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                            fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFoto}
                                            onMouseOver={() => setBotonSubirFoto(true)} onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                                    </div>
                                </div>
                            </div>
                            <h2 style={{fontSize: 22 / proporcional, lineHeight: `${30 / proporcional}px`,
                                marginBottom: 16 / proporcional, fontWeight: 500, color: '#007bff'}}>Archivo de evaluación (.zip o .rar)</h2>
                            <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Archivo evaluación
                                </span>
                                <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                                    <input 
                                            disabled={!editar_informacion}
                                        class="form-control" 
                                        type="file" 
                                        id="formFile" 
                                        style={{width: '65%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                        onChange={handleFileChangeEvaluacion}/>
                                    <div className={boton_subir_evaluacion ? 'shadow-lg rounded' : 'rounded'} 
                                        style={{width: '30%', heihgt: 50 / proporcional, background: '#007bff', cursor: 'pointer'}}>
                                        <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                            lineHeight: `${50 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                            fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadEvaluacion}
                                            onMouseOver={() => setBotonSubirEvaluacion(true)} onMouseLeave={() => setBotonSubirEvaluacion(false)}>Subir foto</p>
                                    </div>
                                </div>
                            </div>
                            {
                                editar_informacion ? (
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                            onClick={() => actualizar_data_trabajador()}>
                                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                                fontFamily: 'Poppins, sansNoticia-serif', textAlign: 'center', fontWeight: 600}}>
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
                                            onClick={() => obtener_data_editar()}>
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
                </div>
            </div>
        </div>
    )
}
