import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {clientesdata} from '../../../redux/slice/clientesdata'
import {clientesConstants} from '../../../uri/clientes-constants'
import { set_data_cliente } from '../../../redux/actions/data'

export default function DetallesComprador ({proporcional}) {

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

    const [boton_volver, setBotonVolver] = useState(false)

    const {get_cliente} = useSelector(({clientes_data}) => clientes_data)
    const {data_cliente, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_cliente.correo === undefined){
            dispatch(clientesdata(clientesConstants(location.pathname.split ('/')[6], 0, 0, 16, {}, false).get_cliente))
        }else{
            setUrlFoto(data_cliente.url_foto)
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
            setUrlFoto(get_cliente.cliente.url_foto)
            setIdCliente(get_cliente.cliente.id)
            setNombres(get_cliente.cliente.nombres)
            setApellidos(get_cliente.cliente.apellidos)
            setCorreo (get_cliente.cliente.correo)
            setNroTelefono(get_cliente.cliente.nro_telefono)
            setFechaNacimiento(get_cliente.cliente.fecha_nacimiento)
            setSexo(get_cliente.cliente.sexo)
            setUsuario(get_cliente.cliente.usuario)
            setDireccion(get_cliente.cliente.direccion)
            setProvincia(get_cliente.cliente.provincia)
            setDistrito(get_cliente.cliente.distrito)
            setPais(get_cliente.cliente.pais)
            setLatitud(get_cliente.cliente.latitud)
            setLongitud(get_cliente.cliente.longitud)
            setHabilitado(get_cliente.cliente.habilitado)
            dispatch(clientesdata(clientesConstants(0, 0, 0, 16, {}, false).get_cliente))
        }
    }, [get_cliente])

    const volver_a_lista = () => {
        dispatch(set_data_cliente({}))
        navigate ('/panel/compradores')
    }
    
    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 80 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 80 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '60%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Cliente: <span style={{fontSize: 28 / proporcional, color: '#007BFF'}}>{nombres} {apellidos}</span>
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div className='' style={{width: '60%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                        <div className='d-flex justify-content-center' 
                              style={{width: '48%', height: 192 / proporcional, paddingTop: 26.5 / proporcional,
                                  paddingBottom: 26.5 / proporcional}}>
                          <div className='rounded-circle' style={{width:  192 / proporcional, height: 192 / proporcional,
                              border: '1px solid #4a4a4a'}}>
                              {
                                  url_foto !== '' ? (
                                      <img className='rounded-circle' src={url_foto} 
                                          style={{width: 190 / proporcional, height: 190 / proporcional}}/>
                                  ) : null
                              }
                          </div>
                        </div>
                        <div className='' style={{width: '48%', height: 'auto'}}>
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
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
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
        </div>
    )
}
