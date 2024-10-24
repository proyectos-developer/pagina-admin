import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { set_datos_paso_gestion_proyectos}  from '../../../../../redux/actions/data'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { personaldata } from '../../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../../uri/personal-constants'
import axios from 'axios'
import { constantes } from '../../../../../uri/constantes'
import { useLocation, useNavigate } from 'react-router-dom'

export default function DatosComunicacionesProyectoCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefTipo = useRef(null)
    const selectRefRemitente = useRef(null)
    const selectRefReceptor = useRef(null)

    const id_proyecto = location.pathname.split ('/')[6]
    const [id_comunicacion, setIdComunicacion] = useState(0)
    const [usuario_comunica, setUsuarioComunica] = useState('')
    const [nombres_comunica, setNombresComunica] = useState('')
    const [telefono_comunica, setTelefonoComunica] = useState('')
    const [correo_comunica, setCorreoComunica] = useState('')
    const [apellidos_comunica, setApellidosComunica] = useState('')
    const [nombres_receptores, setNombresReceptores] = useState('')
    const [telefono_receptores, setTelefonoReceptores] = useState('')
    const [correo_receptores, setCorreoReceptores] = useState('')
    const [apellidos_receptores, setApellidosReceptores] = useState('')
    const [usuario_receptor, setUsuarioReceptor] = useState('')
    const [tipo_comunicacion, setTipoComunicacion] = useState('')
    const [notas, setNotas] = useState('')

    const [eusuario_comunica, setEUsuarioComunica] = useState(false)
    const [eusuario_receptor, setEUsuarioReceptor] = useState(false)
    const [etipo_comunicacion, setETipoComunicacion] = useState(false)

    const [lista_comunicaciones, setListaComunicacionesProyecto] = useState([])

    const [seleccionar_tipo_usuario, setSeleccionarTipoUsuario] = useState(false)

    const [search_remitente, setSearchRemitente] = useState('')
    const [search_receptor, setSearchReceptor] = useState('')

    const [lista_usuarios_receptores, setListaUsuariosReceptores] = useState([])
    const [lista_usuarios_remitentes, setListaUsuariosRemitentes] = useState([])

    const [over_comunicacion, setOverComunicacion] = useState(false)
    const [nueva_comunicacion, setNuevaComunicacion] = useState(false)

    const [boton_cancelar_edicion, setBotonCancelarEdicion] = useState(false)
    const [boton_actualizar, setBotonActaulizar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_nuevo, setBotonNuevo] = useState(false)
    const [boton_cancelar_nuevo, setBotonCancelarNuevo] = useState(false)

    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)
    const {new_comunicacion_proyecto, update_comunicacion_proyecto, get_comunicaciones_proyectos_filter,
        get_comunicacion_proyecto} 
        =  useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_comunicaciones_proyectos_filter))
    }, [])

    useEffect(() => {
        if (get_comunicaciones_proyectos_filter && get_comunicaciones_proyectos_filter.success === true && get_comunicaciones_proyectos_filter.comunicacion_proyectos){
            setListaComunicacionesProyecto(get_comunicaciones_proyectos_filter.comunicacion_proyectos)
        }
    }, [get_comunicaciones_proyectos_filter])

    useEffect(() => {
        if (get_comunicacion_proyecto && get_comunicacion_proyecto.success === true && get_comunicacion_proyecto.comunicacion_proyecto){
            setIdComunicacion(get_comunicacion_proyecto.comunicacion_proyecto.id)
            setUsuarioComunica(get_comunicacion_proyecto.comunicacion_proyecto.usuario_comunica)
            setNombresComunica(get_comunicacion_proyecto.comunicacion_proyecto.nombres_comunica)
            setTelefonoComunica(get_comunicacion_proyecto.comunicacion_proyecto.telefono_comunica)
            setCorreoComunica(get_comunicacion_proyecto.comunicacion_proyecto.correo_comunica)
            setApellidosComunica(get_comunicacion_proyecto.comunicacion_proyecto.apellidos_comunica)
            setNombresReceptores(get_comunicacion_proyecto.comunicacion_proyecto.nombres_receptores)
            setTelefonoReceptores(get_comunicacion_proyecto.comunicacion_proyecto.telefono_receptores)
            setCorreoReceptores(get_comunicacion_proyecto.comunicacion_proyecto.correo_receptores)
            setApellidosReceptores(get_comunicacion_proyecto.comunicacion_proyecto.apellidos_receptores)
            setUsuarioReceptor(get_comunicacion_proyecto.comunicacion_proyecto.usuario_receptor)
            setTipoComunicacion(get_comunicacion_proyecto.comunicacion_proyecto.tipo_comunicacion)
            setNotas(get_comunicacion_proyecto.comunicacion_proyecto.notas)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_comunicacion_proyecto))
        }
    }, [get_comunicacion_proyecto])

    useEffect(() => {
        if (update_comunicacion_proyecto && update_comunicacion_proyecto.success === true && update_comunicacion_proyecto.comunicacion_proyecto){
            setIdComunicacion(update_comunicacion_proyecto.comunicacion_proyecto.id)
            setUsuarioComunica(update_comunicacion_proyecto.comunicacion_proyecto.usuario_comunica)
            setNombresComunica(update_comunicacion_proyecto.comunicacion_proyecto.nombres_comunica)
            setTelefonoComunica(update_comunicacion_proyecto.comunicacion_proyecto.telefono_comunica)
            setCorreoComunica(update_comunicacion_proyecto.comunicacion_proyecto.correo_comunica)
            setApellidosComunica(update_comunicacion_proyecto.comunicacion_proyecto.apellidos_comunica)
            setNombresReceptores(update_comunicacion_proyecto.comunicacion_proyecto.nombres_receptores)
            setTelefonoReceptores(update_comunicacion_proyecto.comunicacion_proyecto.telefono_receptores)
            setCorreoReceptores(update_comunicacion_proyecto.comunicacion_proyecto.correo_receptores)
            setApellidosReceptores(update_comunicacion_proyecto.comunicacion_proyecto.apellidos_receptores)
            setUsuarioReceptor(update_comunicacion_proyecto.comunicacion_proyecto.usuario_receptor)
            setTipoComunicacion(update_comunicacion_proyecto.comunicacion_proyecto.tipo_comunicacion)
            setNotas(update_comunicacion_proyecto.comunicacion_proyecto.notas)
            setEditarInformacion(false)
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).update_comunicacion_proyecto))
        }
    }, [update_comunicacion_proyecto])

    useEffect(() => {
        if (new_comunicacion_proyecto && new_comunicacion_proyecto.success === true && new_comunicacion_proyecto.comunicacion_proyecto){
            setEditarInformacion(false)
            setNuevaComunicacion(false)
            dispatch(gestionproyectosdata(gestionproyectosConstants(id_proyecto, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_comunicacion_proyecto))
            dispatch(gestionproyectosdata(gestionproyectosConstants(0, 0, 'proyecto', id_proyecto, 0, 0, 0, 0, 100, {}, false).get_comunicaciones_proyectos_filter))
        }
    }, [new_comunicacion_proyecto])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            if (seleccionar_tipo_usuario) {
                setListaUsuariosReceptores(get_personal_filter.personal)
            }else{
                setListaUsuariosRemitentes(get_personal_filter.personal)
            }
        }
    }, [get_personal_filter])

    const buscar_usuario_remitente = (value) => {
        setSearchRemitente(value)
        if (value !== ''){
            setSeleccionarTipoUsuario(false)
            dispatch(personaldata(personalConstants(0, value, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }else{
            setListaUsuariosRemitentes([])
        }
    }

    const seleccionar_usuario_remitente = (value) => {
        if (value !== '0'){
            setUsuarioComunica(value)
            axios.get (`${constantes().url_principal[0].url}/personal/${value}`)
                .then ((res) => {
                    setNombresComunica(res.data.trabajador.nombres)
                    setApellidosComunica(res.data.trabajador.apellidos)
                    setCorreoComunica(res.data.trabajador.correo_personal)
                    setTelefonoComunica(res.data.trabajador.nro_telefono)
                }).catch ((err) => {

                })
        }
    }

    const buscar_usuario_receptor = (value) => {
        setSearchReceptor(value)
        if (value !== ''){
            setSeleccionarTipoUsuario(true)
            dispatch(personaldata(personalConstants(0, value, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }else{
            setListaUsuariosReceptores([])
        }
    }

    const seleccionar_usuario_receptor = (value) => {
        if (value !== '0'){
            setUsuarioReceptor(value)
            axios.get (`${constantes().url_principal[0].url}/personal/${value}`)
                .then ((res) => {
                    setNombresReceptores(res.data.trabajador.nombres)
                    setApellidosReceptores(res.data.trabajador.apellidos)
                    setCorreoReceptores(res.data.trabajador.correo_personal)
                    setTelefonoReceptores(res.data.trabajador.nro_telefono)
                }).catch ((err) => {

                })
        }
    }

    const seleccionar_tipo_comunicacion = (value) => {
        if (value !== '0'){
            setTipoComunicacion(value)
        }
    }

    const agregar_nueva_comunicacion = () => {
        setIdComunicacion('')
        setUsuarioComunica('')
        setNombresComunica('')
        setTelefonoComunica('')
        setCorreoComunica('')
        setApellidosComunica('')
        setNombresReceptores('')
        setTelefonoReceptores('')
        setCorreoReceptores('')
        setApellidosReceptores('')
        setUsuarioReceptor('')
        setTipoComunicacion('')
        setNotas('')
        setEditarInformacion(true)
        setNuevaComunicacion(true)
    }

    const guardar_nueva_comunicacion = () => {
        if (tipo_comunicacion === '' || usuario_comunica === '' || usuario_receptor === '' ||
            (500 - notas.length <= 0)
        ){
            setEUsuarioComunica(tipo_comunicacion === '' ? true : false)
            setEUsuarioReceptor(notas === '' ? true : false)
            setETipoComunicacion(usuario_comunica === '' ? true : false)
        }else{
            setEUsuarioComunica(false)
            setEUsuarioReceptor(false)
            setETipoComunicacion(false)
            const data_comunicacion = {
                id_proyecto: id_proyecto,
                usuario_comunica: usuario_comunica,
                nombres_comunica: nombres_comunica,
                apellidos_comunica: apellidos_comunica,
                correo_comunica: correo_comunica,
                telefono_comunica: telefono_comunica,
                usuarios_receptores: usuario_receptor,
                nombres_receptores: nombres_receptores,
                apellidos_receptores: apellidos_receptores,
                correo_receptores: correo_receptores,
                telefono_receptores: telefono_receptores,
                tipo_comunicacion: tipo_comunicacion,
                notas: notas
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_comunicacion, false).new_comunicacion_proyecto))
        }
    }

    const actualizar_datos_comunicacion = () => {
        if (tipo_comunicacion === '' || usuario_comunica === '' || usuario_receptor === '' ||
            (500 - notas.length <= 0)
        ){
            setEUsuarioComunica(tipo_comunicacion === '' ? true : false)
            setEUsuarioReceptor(notas === '' ? true : false)
            setETipoComunicacion(usuario_comunica === '' ? true : false)
        }else{
            setEUsuarioComunica(false)
            setEUsuarioReceptor(false)
            setETipoComunicacion(false)
            const data_comunicacion = {
                id_proyecto: id_proyecto,
                usuario_comunica: usuario_comunica,
                nombres_comunica: nombres_comunica,
                apellidos_comunica: apellidos_comunica,
                correo_comunica: correo_comunica,
                telefono_comunica: telefono_comunica,
                usuarios_receptores: usuario_receptor,
                nombres_receptores: nombres_receptores,
                apellidos_receptores: apellidos_receptores,
                correo_receptores: correo_receptores,
                telefono_receptores: telefono_receptores,
                tipo_comunicacion: tipo_comunicacion,
                notas: notas
            }
            dispatch (gestionproyectosdata(gestionproyectosConstants(id_comunicacion, 0, 0, 0, 0, 0, 0, 0, 0, data_comunicacion, false).update_comunicacion_proyecto))
        }
    }

    const cancelar_edicion_comunicacion = () => {
        dispatch (gestionproyectosdata(gestionproyectosConstants(id_comunicacion, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_comunicacion_proyecto))
    }

    const volver_a_lista = () => {
        dispatch (set_datos_paso_gestion_proyectos('gestion'))
        navigate ('/panel/proyectos/gestion-proyectos')
    }

    const editar_informacion_comunicacion = () => {
        setEditarInformacion(true)
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='overflow-auto' style={{width: '100%', height: 'auto', maxHeight: 300 / proporcional, marginBottom: 16 / proporcional}}>
                        {
                            lista_comunicaciones && lista_comunicaciones.length > 0 ? (
                                lista_comunicaciones.map ((comunicacion, index) => {
                                    return (
                                        <div key={index} className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}
                                            onMouseOver={() => setOverComunicacion(comunicacion.id)} onMouseLeave={() => setOverComunicacion('')}
                                            onClick={() => dispatch(gestionproyectosdata(gestionproyectosConstants(comunicacion.id, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_comunicacion_proyecto))}>
                                            <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: over_comunicacion === comunicacion.id ? 700 : 500, cursor: 'pointer'}}><strong>{index + 1}. </strong>{comunicacion.tipo_comunicacion}  - {comunicacion.apellidos_receptores}</p>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}>
                                    <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>Aún no a agregado comunicaciones al proyecto</p>
                                </div>
                            )
                        }
                    </div>
                    <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                        onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                        onClick={() => agregar_nueva_comunicacion()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Nueva comunicación
                        </p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <select
                            disabled={!editar_informacion} 
                            id='tipo_comunicacion'
                            type='default'
                            className='form-select rounded'
                            value={tipo_comunicacion}
                            onChange={(event) => seleccionar_tipo_comunicacion(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: etipo_comunicacion ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{tipo_comunicacion === '' ? 'Seleccionar tipo comunicación' : tipo_comunicacion}</option>
                            <option value='Advertencia'>Advertencia</option>
                            <option value='Error'>Error</option>
                            <option value='Corrección'>Corrección</option>
                            <option value='Informativa'>Informativa</option>
                            <option value='Notificación'>Notificación</option>
                            <option value='Reunión'>Reunión</option>
                        </select>
                    </div>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                    border: eusuario_comunica ? '1px solid red' : '1px solid #007BFF'
                            }}>
                                <input
                                    disabled={!editar_informacion} 
                                    type='default' 
                                    value={search_remitente}
                                    className='form-control rounded border-0'
                                    onChange={(event) => buscar_usuario_remitente (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', 
                                            padding: 10 / proporcional}}
                                    placeholder='Buscar trabajador remitente'/>
                            </div>
                        </div>
                        {
                            lista_usuarios_remitentes && lista_usuarios_remitentes.length > 0 ? (
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <select
                                        disabled={!editar_informacion}
                                        type='default' 
                                        id='trabajador'
                                        value={usuario_comunica}
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_usuario_remitente (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: eusuario_comunica ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{usuario_comunica === '' ? 'Seleccionar trabajador' : usuario_comunica}</option>
                                        {
                                            lista_usuarios_remitentes && lista_usuarios_remitentes.length > 0 ? (
                                                lista_usuarios_remitentes.map ((trabajador, index) => {
                                                    return (
                                                        <option key={index} value={trabajador.id}>
                                                            {trabajador.nombres + ' ' + trabajador.apellidos}
                                                        </option>
                                                    )
                                                })
                                            ) : null
                                        }
                                    </select>
                                </div>
                            ) : null
                        }
                    </div>
                    {
                        nombres_comunica !== '' ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                border:  '1px solid #007BFF'
                                        }}>
                                            <input
                                                disabled={true}
                                                type='default' 
                                                value={nombres_comunica}
                                                className='form-control rounded border-0'
                                                onChange={(event) => setNombresComunica (event.target.value)}
                                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', 
                                                        padding: 10 / proporcional}}
                                                placeholder=''/>
                                        </div>
                                    </div>
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                border:  '1px solid #007BFF'
                                        }}>
                                            <input
                                                disabled={true}
                                                type='default' 
                                                value={apellidos_comunica}
                                                className='form-control rounded border-0'
                                                onChange={(event) => setApellidosComunica (event.target.value)}
                                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', 
                                                        padding: 10 / proporcional}}
                                                placeholder=''/>
                                        </div>
                                    </div>
                                </div>
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                border:  '1px solid #007BFF'
                                        }}>
                                            <input
                                                disabled={true}
                                                type='number' 
                                                value={telefono_comunica}
                                                className='form-control rounded border-0'
                                                onChange={(event) => setTelefonoComunica (event.target.value)}
                                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', 
                                                        padding: 10 / proporcional}}
                                                placeholder=''/>
                                        </div>
                                    </div>
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                border:  '1px solid #007BFF'
                                        }}>
                                            <input
                                                disabled={true}
                                                type='e-mail' 
                                                value={correo_comunica}
                                                className='form-control rounded border-0'
                                                onChange={(event) => setCorreoComunica (event.target.value)}
                                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', 
                                                        padding: 10 / proporcional}}
                                                placeholder=''/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                    border:  eusuario_receptor ? '1px solid red' : '1px solid #007BFF'
                            }}>
                                <input
                                    disabled={!editar_informacion} 
                                    type='default' 
                                    value={search_receptor}
                                    className='form-control rounded border-0'
                                    onChange={(event) => buscar_usuario_receptor (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', 
                                            padding: 10 / proporcional}}
                                    placeholder='Buscar trabajador receptor'/>
                            </div>
                        </div>
                        {
                            lista_usuarios_receptores && lista_usuarios_receptores.length > 0 ? (
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <select
                                        disabled={!editar_informacion}
                                        type='default' 
                                        id='trabajador'
                                        value={usuario_receptor}
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_usuario_receptor (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: eusuario_receptor ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{usuario_receptor === '' ? 'Seleccionar trabajador' : usuario_receptor}</option>
                                        {
                                            lista_usuarios_receptores && lista_usuarios_receptores.length > 0 ? (
                                                lista_usuarios_receptores.map ((trabajador, index) => {
                                                    return (
                                                        <option key={index} value={trabajador.id}>
                                                            {trabajador.nombres + ' ' + trabajador.apellidos}
                                                        </option>
                                                    )
                                                })
                                            ) : null
                                        }
                                    </select>
                                </div>
                            ) : null
                        }
                    </div>
                    {
                        nombres_receptores !== '' ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                border:  '1px solid #007BFF'
                                        }}>
                                            <input
                                                disabled={true}
                                                type='default' 
                                                value={nombres_receptores}
                                                className='form-control rounded border-0'
                                                onChange={(event) => setNombresReceptores (event.target.value)}
                                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', 
                                                        padding: 10 / proporcional}}
                                                placeholder=''/>
                                        </div>
                                    </div>
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                border:  '1px solid #007BFF'
                                        }}>
                                            <input
                                                disabled={true}
                                                type='default' 
                                                value={apellidos_receptores}
                                                className='form-control rounded border-0'
                                                onChange={(event) => setApellidosReceptores (event.target.value)}
                                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', 
                                                        padding: 10 / proporcional}}
                                                placeholder=''/>
                                        </div>
                                    </div>
                                </div>
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                border:  '1px solid #007BFF'
                                        }}>
                                            <input
                                                disabled={true}
                                                type='number' 
                                                value={telefono_receptores}
                                                className='form-control rounded border-0'
                                                onChange={(event) => setTelefonoReceptores (event.target.value)}
                                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', 
                                                        padding: 10 / proporcional}}
                                                placeholder=''/>
                                        </div>
                                    </div>
                                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                                border:  '1px solid #007BFF'
                                        }}>
                                            <input
                                                disabled={true}
                                                type='e-mail' 
                                                value={correo_receptores}
                                                className='form-control rounded border-0'
                                                onChange={(event) => setCorreoReceptores (event.target.value)}
                                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', 
                                                        padding: 10 / proporcional}}
                                                placeholder=''/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <textarea 
                            disabled={!editar_informacion}
                            id='notas'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={notas}
                            onChange={(event) => setNotas(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='Notas'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - notas.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - notas.length}</p>
                        </div>
                    </div>
                    {
                        editar_informacion && !nueva_comunicacion ? ( 
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_edicion ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonCancelarEdicion(true)} onMouseLeave={() => setBotonCancelarEdicion(false)}
                                    onClick={() => cancelar_edicion_comunicacion()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonActaulizar(true)} onMouseLeave={() => setBotonActaulizar(false)}
                                    onClick={() => actualizar_datos_comunicacion()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Actualizar datos
                                    </p>
                                </div>
                            </div>
                        ) : !editar_informacion && !nueva_comunicacion ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                    onClick={() => volver_a_lista()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Volver
                                    </p>
                                </div>
                                <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                    onClick={() => lista_comunicaciones && lista_comunicaciones.length > 0 ? editar_informacion_comunicacion() : null}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Editar
                                    </p>
                                </div>
                            </div>
                        ) : nueva_comunicacion ? (
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className={boton_cancelar_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                                    onMouseOver={() => setBotonCancelarNuevo(true)} onMouseLeave={() => setBotonCancelarNuevo(false)}
                                    onClick={() => {setEditarInformacion(false); setNuevaComunicacion(false)}}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Cancelar
                                    </p>
                                </div>
                                <div className={boton_nuevo ? 'shadow rounded' : 'shadow-sm rounded'} 
                                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                    onMouseOver={() => setBotonNuevo(true)} onMouseLeave={() => setBotonNuevo(false)}
                                    onClick={() => guardar_nueva_comunicacion()}>
                                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                        Guardar comunicacion
                                    </p>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}
