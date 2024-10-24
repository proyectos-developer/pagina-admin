import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { locationdata } from '../../../../redux/slice/locationdata'
import {locationConstants} from '../../../../uri/location-constants'

import {personaldata} from '../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../uri/personal-constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { set_datos_paso_personal, set_error_message } from '../../../../redux/actions/data'

export default function DatosComunicacionUbicacionTablet ({proporcional, personal}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const selectRefPais = useRef(null)
    const selectRefProvincia = useRef(null)
    const selectRefDistrito = useRef(null)

    const id_personal = location.pathname.split('/')[6]
    const [nro_telefono, setNroTelefono] = useState('')
    const [correo_personal, setCorreoPersonal] = useState('')
    const [correo_empresa, setCorreoEmpresa] = useState('')
    const [pais, setPais] = useState('')
    const [provincia, setProvincia] = useState('')
    const [distrito, setDistrito] = useState('')
    const [direccion, setDireccion] = useState('')

    const [lista_paises, setListaPaises] = useState([])
    const [lista_provincias, setListaProvincias] = useState([])
    const [lista_distritos, setListaDistritos] = useState([])

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)

    const [enro_telefono, setENroTelefono] = useState(false)
    
    const {get_location_paises, get_location_provincias, get_location_distritos} = useSelector(({location_data}) => location_data)
    const {get_personal_comunicacion, update_personal_comunicacion} = useSelector(({personal_data}) => personal_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)

    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (personal && personal.nro_telefono){
            setNroTelefono(personal.nro_telefono)
            setCorreoPersonal(personal.correo_personal)
            setCorreoEmpresa(personal.correo_empresa)
            setPais(personal.pais)
            setProvincia(personal.provincia)
            setDistrito(personal.distrito)
            setDireccion(personal.direccion)
            window.scrollTo(0, 0)
            //dispatch(locationdata(locationConstants(0, false).get_location_paises))
        }
    }, [])

    useEffect(() => {
        if (get_personal_comunicacion && get_personal_comunicacion.success === true && get_personal_comunicacion.trabajador){
            setNroTelefono(get_personal_comunicacion.trabajador.nro_telefono)
            setCorreoPersonal(get_personal_comunicacion.trabajador.correo_personal)
            setCorreoEmpresa(get_personal_comunicacion.trabajador.correo_empresa)
            setPais(get_personal_comunicacion.trabajador.pais)
            setProvincia(get_personal_comunicacion.trabajador.provincia)
            setDistrito(get_personal_comunicacion.trabajador.distrito)
            setDireccion(get_personal_comunicacion.trabajador.direccion)
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_personal_comunicacion))
        }else if (get_personal_comunicacion && get_personal_comunicacion.success === false && get_personal_comunicacion.error){
            dispatch(set_error_message(true))
        }
    }, [get_personal_comunicacion])

    useEffect(() => {
        if (update_personal_comunicacion && update_personal_comunicacion.success === true && update_personal_comunicacion.trabajador){
            setNroTelefono(update_personal_comunicacion.trabajador.nro_telefono)
            setCorreoPersonal(update_personal_comunicacion.trabajador.correo_personal)
            setCorreoEmpresa(update_personal_comunicacion.trabajador.correo_empresa)
            setPais(update_personal_comunicacion.trabajador.pais)
            setProvincia(update_personal_comunicacion.trabajador.provincia)
            setDistrito(update_personal_comunicacion.trabajador.distrito)
            setDireccion(update_personal_comunicacion.trabajador.direccion)
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(personal.id, 0, 0, 0, 0, 0, 0, 0, {}, true).update_personal_comunicacion))
        }else if (update_personal_comunicacion && update_personal_comunicacion.success === false && update_personal_comunicacion.error){
            dispatch(set_error_message(true))
        }
    }, [update_personal_comunicacion])
    
    useEffect(() => {
        if (get_location_paises && get_location_paises.success === true && get_location_paises.paises){
            setListaPaises(get_location_paises.paises)
        }else if (get_location_paises && get_location_paises.success === false && get_location_paises.error){
            dispatch(set_error_message(true))
        }
    }, [get_location_paises])

    useEffect(() => {
        if (get_location_provincias && get_location_provincias.success === true && get_location_provincias.provincias){
            setListaProvincias(get_location_provincias.provincias)
        }else if (get_location_provincias && get_location_provincias.success === false && get_location_provincias.error){
            dispatch(set_error_message(true))
        }
    }, [get_location_provincias])

    useEffect(() => {
        if (get_location_distritos && get_location_distritos.success === true && get_location_distritos.distritos){
            setListaDistritos(get_location_distritos.distritos)
        }else if (get_location_distritos && get_location_distritos.success === false && get_location_distritos.error){
            dispatch(set_error_message(true))
        }
    }, [get_location_distritos])

    const seleccionar_pais = (value) => {
        if (value !== '0'){
            setPais(value === 'Peru' ? 'Perú' : '')
            dispatch (locationdata(locationConstants(value === 'Peru' ? 'Perú' : value, false).get_location_provincias))
        }
    }

    const seleccionar_provincia = (value) => {
        if (value !== '0'){
            setProvincia(value)
            dispatch (locationdata(locationConstants(value, false).get_location_distritos))
        }
    }

    const seleccionar_distrito = (value) => {
        if (value !== '0'){
            setDistrito(value)
        }
    }

    const actualizar_datos_personales = () => {
        if(nro_telefono === ''){
            setENroTelefono(nro_telefono === '' ? true : false)
        }else{
           const data_update = {
                nro_telefono: nro_telefono,
                correo_personal: correo_personal,
                correo_empresa: correo_empresa,
                pais: pais,
                provincia: provincia,
                distrito: distrito,
                direccion: direccion
            }
            dispatch (personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, data_update, false).update_personal_comunicacion))
        }
    }

    const cancelar_actualizacion = () => {
        dispatch (personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, {}, false).get_personal_comunicacion))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nro teléfono</strong></span>
                        <input
                            disabled={!editar_informacion} 
                            id='nro_telefono'
                            type='number'
                            className='form-control rounded'
                            value={nro_telefono}
                            onChange={(event) => setNroTelefono(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: enro_telefono ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nro teléfono'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Correo personal</strong></span>
                        <input
                            disabled={!editar_informacion} 
                            id='correo_personal'
                            type='e-mail'
                            className='form-control rounded'
                            value={correo_personal}
                            onChange={(event) => setCorreoPersonal(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Correo personal'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Correo empresa</strong></span>
                        <input
                            disabled={!editar_informacion} 
                            id='correo_empresa'
                            type='e-mail'
                            className='form-control rounded'
                            value={correo_empresa}
                            onChange={(event) => setCorreoEmpresa(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Correo empresa'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>País</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='pais'
                            ref={selectRefPais}
                            className='form-select rounded'
                            onChange={(event) => seleccionar_pais (event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>Seleccionar país</option>
                            {
                                lista_paises && lista_paises.length > 0 ? (
                                    lista_paises.map ((country, index) => {
                                        return (
                                            <option value={country.country_name}>{country.country_name}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Provincia</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='provincia'
                            ref={selectRefProvincia}
                            className='form-select rounded'
                            onChange={(event) => seleccionar_provincia (event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>Seleccionar provincia</option>
                            {
                                lista_provincias && lista_provincias.length > 0 ? (
                                    lista_provincias.map ((state, index) => {
                                        return (
                                            <option value={state.state_name}>{state.state_name}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Distrito</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='distrito'
                            ref={selectRefDistrito}
                            className='form-select rounded'
                            onChange={(event) => seleccionar_distrito (event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>Seleccionar distrito</option>
                            {
                                lista_distritos && lista_distritos.length > 0 ? (
                                    lista_distritos.map ((city, index) => {
                                        return (
                                            <option value={city.city_name}>{city.city_name}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Correo</strong></span>
                        <input
                            disabled={!editar_informacion} 
                            id='direccion'
                            type='default'
                            className='form-control rounded'
                            value={direccion}
                            onChange={(event) => setDireccion(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Dirección'/>
                    </div>
                </div>
            </div>
            {
                editar_informacion ? (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => cancelar_actualizacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                            onClick={() => actualizar_datos_personales()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => {navigate ('/panel/rrhh/personal'); dispatch(set_datos_paso_personal('personal'));
                                setEditarInformacion(false)
                            }}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                        <div VolverlassName={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                            onClick={() => setEditarInformacion(true)}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Editar
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
