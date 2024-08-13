import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {clientesdata} from '../../redux/slice/clientesdata'
import {clientesConstants} from '../../uri/clientes-constants'
import { set_data_cliente } from '../../redux/actions/data'

export default function DetallesCompradorTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectPais = useRef(null)
    const selectProvincia = useRef(null)
    const selectDistrito = useRef(null)
    const selectSexo = useRef(null)

    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_cliente, setIdCliente] = useState('')
    const [url_foto, setUrlFoto] = useState ('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [correo, setCorreo] = useState('')
    const [nro_telefono, setNroTelefono] = useState ('')
    const [fecha_nacimiento, setFechaNacimiento] = useState ('')
    const [sexo, setSexo] = useState ('')
    const [direccion, setDireccion] = useState ('')
    const [provincia, setProvincia] = useState ('')
    const [distrito, setDistrito] = useState ('')
    const [pais, setPais] = useState ('')
    const [latitud, setLatitud] = useState ('')
    const [longitud, setLongitud] = useState ('')
    const [habilitado, setHabilitado] = useState ('')
    const [usuario, setUsuario] = useState(false)

    const [eurl_foto, setEUrlFoto] = useState(false)
    const [enombres, setENombres] = useState(false)
    const [eapellidos, setEApellidos] = useState(false)
    const [ecorreo, setECorreo] = useState(false)
    const [enro_telefono, setENroTelefono] = useState (false)
    const [efecha_nacimiento, setEFechaNacimiento] = useState (false)
    const [esexo, setESexo] = useState (false)
    const [edireccion, setEDireccion] = useState (false)
    const [eprovincia, setEProvincia] = useState (false)
    const [edistrito, setEDistrito] = useState (false)
    const [epais, setEPais] = useState (false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_estado_cliente, get_cliente} = useSelector(({clientes_data}) => clientes_data)
    const {data_cliente, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_cliente.correo === undefined){
            dispatch(clientesdata(clientesConstants(location.pathname.split ('/')[3], 0, 0, 16, {}, false).get_cliente))
        }else{
            setIdCliente(data_cliente.id)
            setNombres(data_cliente.nombres)
            setApellidos(data_cliente.apellidos)
            setCorreo (data_cliente.correo)
            setNroTelefono(data_cliente.nro_telefono)
            setFechaNacimiento(data_cliente.fecha_nacimiento)
            setSexo(data_cliente.sexo)
            setUsuario(data_cliente.usuario)
            setDireccion(data_cliente.direccion)
            setProvincia(data_cliente.provincia)
            setDistrito(data_cliente.distrito)
            setPais(data_cliente.pais)
            setLatitud(data_cliente.latitud)
            setLongitud(data_cliente.longitud)
            setHabilitado(data_cliente.habilitado)
        }
    }, [])

    useEffect(() => {
        if (get_cliente && get_cliente.success === true && get_cliente.cliente){
            setIdCliente(get_cliente.id)
            setNombres(get_cliente.nombres)
            setApellidos(get_cliente.apellidos)
            setCorreo (get_cliente.correo)
            setNroTelefono(get_cliente.nro_telefono)
            setFechaNacimiento(get_cliente.fecha_nacimiento)
            setSexo(get_cliente.sexo)
            setUsuario(get_cliente.usuario)
            setDireccion(get_cliente.direccion)
            setProvincia(get_cliente.provincia)
            setDistrito(get_cliente.distrito)
            setPais(get_cliente.pais)
            setLatitud(get_cliente.latitud)
            setLongitud(get_cliente.longitud)
            setHabilitado(get_cliente.habilitado)
            dispatch(clientesdata(clientesConstants(0, 0, 0, 16, {}, false).get_cliente))
        }
    }, [get_cliente])

    useEffect(() => {
        if (update_estado_cliente && update_estado_cliente.success === true && update_estado_cliente.cliente){
            dispatch(clientesdata(clientesConstants(0, 0, 0, 0, {}, true).update_estado_cliente))
            setEditarInformacion(false)
        }
    }, [update_estado_cliente])

    const volver_a_lista = () => {
        dispatch(set_data_cliente({}))
        navigate ('/panel/compradores')
    }
    
    const actualizar_datos_proyecto = () => {
        const data_nuevo = {
            habilitado: habilitado,
        }
        dispatch (clientesdata(clientesConstants(usuario, 0, 0, 0, data_nuevo, false).update_estado_cliente))
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: '100%'}}>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <div className='d-flex justify-content-center' 
                              style={{width: '35%', height: 192 / proporcional, paddingTop: 26.5 / proporcional,
                                  paddingBottom: 26.5 / proporcional}}>
                          <div className='rounded-circle' style={{width:  192 / proporcional, height: 192 / proporcional,
                              border: '1px solid #4a4a4a'}}>
                              {
                                  url_foto !== '' ? (
                                      <img className='rounded-circle' src={url_foto} 
                                          style={{width: 292 / proporcional, height: 292 / proporcional}}/>
                                  ) : null
                              }
                          </div>
                        </div>
                        <div className='' style={{width: '63%', height: 'auto'}}>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Nombres
                                </span>
                                <input 
                                    type='default'
                                    disabled={!editar_informacion}
                                    id='nombres'
                                    className='form-control rounded'
                                    value={nombres}
                                    onChange={(event) => setNombres (event.target.value)}
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
                                    type='default'
                                    disabled={!editar_informacion}
                                    id='apellidos'
                                    className='form-control rounded'
                                    value={apellidos}
                                    onChange={(event) => setApellidos (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: eapellidos ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Apellidos'/>
                            </div>
                            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Correo
                                </span>
                                <input 
                                    type='e-mail'
                                    disabled={!editar_informacion}
                                    id='correo'
                                    className='form-control rounded'
                                    value={correo}
                                    onChange={(event) => setCorreo (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: ecorreo ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='correo'/>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', height: 'auto'}}>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                marginBottom: 16 / proporcional}}>
                            <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Fecha de nacimiento
                                </span>
                                <input
                                    type='date'
                                    disabled={!editar_informacion}
                                    id='fecha_nacimiento'
                                    className='form-control rounded'
                                    value={fecha_nacimiento}
                                    onChange={(event) => setFechaNacimiento (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: efecha_nacimiento ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder=''/>
                            </div>
                            <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Sexo
                                </span>
                                <select 
                                    disabled={!editar_informacion}
                                    ref={selectSexo}
                                    id='sexo'
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setSexo (event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: esexo ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{sexo === '' ? 'Seleccionar' : sexo}</option>    
                                    <option value='Masculino'>Masculino</option>    
                                    <option value='Femenino'>Femenino</option>     
                                </select>
                            </div>
                            <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Nro teléfono
                                </span>
                                <input
                                    type='number'
                                    disabled={!editar_informacion}
                                    id='nro_telefono'
                                    className='form-control rounded'
                                    value={nro_telefono}
                                    onChange={(event) => setNroTelefono (event.target.value)}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enro_telefono ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Número telefono'/>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Dirección
                            </span>
                            <input 
                                type='default'
                                disabled={!editar_informacion}
                                id='direccion'
                                className='form-control rounded'
                                value={direccion}
                                onChange={(event) => setDireccion (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edireccion ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Dirección'/>
                        </div>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                                marginBottom: 16 / proporcional}}>
                            <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    País
                                </span>
                                <select 
                                    disabled={!editar_informacion}
                                    ref={selectPais}
                                    id='pais'
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setPais (event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: epais ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{pais === '' ? 'Seleccionar' : pais}</option>    
                                </select>
                            </div>
                            <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Provincia
                                </span>
                                <select 
                                    disabled={!editar_informacion}
                                    ref={selectProvincia}
                                    id='provincia'
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setProvincia (event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: eprovincia ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{provincia === '' ? 'Seleccionar' : provincia}</option>    
                                </select>
                            </div>
                            <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif'}}>
                                    Distrito
                                </span>
                                <select 
                                    disabled={!editar_informacion}
                                    ref={selectDistrito}
                                    id='distrito'
                                    className='form-select rounded'
                                    onChange={(event) => event.target.value !== '0' ? setDistrito (event.target.value) : null}
                                    style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: edistrito ? '1px solid red' : '1px solid #007BFF',
                                            padding: 10 / proporcional}}>
                                    <option value='0'>{distrito === '' ? 'Seleccionar' : distrito}</option>    
                                </select>
                            </div>
                        </div>
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
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
                                    placeholder='Correo electrónico'/>
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
                                        onClick={() => setEditarInformacion(false)}>
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
                                        >
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
    )
}
