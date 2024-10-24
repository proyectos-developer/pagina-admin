import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_gestion_comunicaciones, set_datos_paso_gestion_proyectos}  from '../../../../../redux/actions/data'
import { gestionproyectosdata } from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'
import { personaldata } from '../../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../../uri/personal-constants'
import axios from 'axios'
import { constantes } from '../../../../../uri/constantes'

export default function DatosComunicacionesProyecto ({proporcional, id}) {

    const dispatch = useDispatch()

    const selectRefTipo = useRef(null)
    const selectRefRemitente = useRef(null)
    const selectRefReceptor = useRef(null)

    const id_proyecto = id
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

    const [seleccionar_tipo_usuario, setSeleccionarTipoUsuario] = useState(false)

    const [search_remitente, setSearchRemitente] = useState('')
    const [search_receptor, setSearchReceptor] = useState('')

    const [lista_usuarios_receptores, setListaUsuariosReceptores] = useState([])
    const [lista_usuarios_remitentes, setListaUsuariosRemitentes] = useState([])

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)
    const {data_gestion_comuniaciones} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_gestion_comuniaciones && data_gestion_comuniaciones.usuario_comunica){
            setUsuarioComunica(data_gestion_comuniaciones.usuario_comunica)
            setUsuarioReceptor(data_gestion_comuniaciones.usuario_receptor)
            setTipoComunicacion(data_gestion_comuniaciones.tipo_comunicacion)
            setNombresComunica(data_gestion_comuniaciones.nombres_comunica)
            setTelefonoComunica(data_gestion_comuniaciones.telefono_comunica)
            setCorreoComunica(data_gestion_comuniaciones.correo_comunica)
            setApellidosComunica(data_gestion_comuniaciones.apellidos_comunica)
            setNombresReceptores(data_gestion_comuniaciones.nombres_receptores)
            setTelefonoReceptores(data_gestion_comuniaciones.telefono_receptores)
            setCorreoReceptores(data_gestion_comuniaciones.correo_receptores)
            setApellidosReceptores(data_gestion_comuniaciones.apellidos_receptores)
            setNotas(data_gestion_comuniaciones.notas)
        }else{
            setUsuarioComunica('')
            setUsuarioReceptor('')
            setTipoComunicacion('')
            setNombresComunica('')
            setTelefonoComunica('')
            setCorreoComunica('')
            setApellidosComunica('')
            setNombresReceptores('')
            setTelefonoReceptores('')
            setCorreoReceptores('')
            setApellidosReceptores('')
            setNotas('')
            selectRefTipo.current !== null ? selectRefTipo.current.value = '0' : null
            selectRefRemitente.current !== null ? selectRefRemitente.current.value = '0' : null
            selectRefReceptor.current !== null ? selectRefReceptor.current.value = '0' : null
        }
    }, [])

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

    const continuar_datos_riesgos = () => {
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
            dispatch (set_data_gestion_comunicaciones(data_comunicacion))
            dispatch (gestionproyectosdata(gestionproyectosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, data_comunicacion, false).new_comunicacion_proyecto))
        }
    }

    const volver_datos_documentos = () => {
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
        dispatch (set_data_gestion_comunicaciones(data_comunicacion))
        dispatch (set_datos_paso_gestion_proyectos('documentos'))
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <select 
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
                    <div className='' style={{width: '100%', height: 'auto',
                            border: eusuario_comunica ? '1px solid red' : '1px solid #007BFF'
                    }}>
                        <input
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
                                <div className='' style={{width: '100%', height: 'auto',
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
                                <div className='' style={{width: '100%', height: 'auto',
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
                                <div className='' style={{width: '100%', height: 'auto',
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
                                <div className='' style={{width: '100%', height: 'auto',
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
                    <div className='' style={{width: '100%', height: 'auto',
                            border:  eusuario_receptor ? '1px solid red' : '1px solid #007BFF'
                    }}>
                        <input
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
                                <div className='' style={{width: '100%', height: 'auto',
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
                                <div className='' style={{width: '100%', height: 'auto',
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
                                <div className='' style={{width: '100%', height: 'auto',
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
                                <div className='' style={{width: '100%', height: 'auto',
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
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer', marginBottom: 16 / proporcional}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_documentos()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                    onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                    onClick={() => continuar_datos_riesgos()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Guardar datos
                    </p>
                </div>
            </div>
        </div>
    )
}
