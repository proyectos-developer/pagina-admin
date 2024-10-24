import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { locationdata } from '../../../../redux/slice/locationdata'
import {locationConstants} from '../../../../uri/location-constants'

import {set_data_personal_ubicacion, set_datos_paso_personal, set_error_message} from '../../../../redux/actions/data'

export default function DatosComunicacionUbicacionCell ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefPais = useRef(null)
    const selectRefProvincia = useRef(null)
    const selectRefDistrito = useRef(null)

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
    const [boton_siguiente, setBotonSiguiente] = useState(false)

    const [enro_telefono, setENroTelefono] = useState(false)
    
    const {get_location_paises, get_location_provincias, get_location_distritos} = useSelector(({location_data}) => location_data)
    const {data_personal_ubicacion} = useSelector(({data_actions}) => data_actions)
    const {new_personal} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (data_personal_ubicacion && data_personal_ubicacion.nro_telefono){
            setNroTelefono(data_personal_ubicacion.nro_telefono)
            setCorreoPersonal(data_personal_ubicacion.correo_personal)
            setCorreoEmpresa(data_personal_ubicacion.correo_empresa)
            setPais(data_personal_ubicacion.pais)
            setProvincia(data_personal_ubicacion.provincia)
            setDistrito(data_personal_ubicacion.distrito)
            setDireccion(data_personal_ubicacion.direccion)
        }else{
            setNroTelefono('')
            setCorreoPersonal('')
            setCorreoEmpresa('')
            setPais('')
            setProvincia('')
            setDistrito('')
            setDireccion('')
            selectRefPais.current === null ? null : selectRefPais.current.value = '0'
            selectRefProvincia.current === null ? null : selectRefProvincia.current.value = '0'
            selectRefDistrito.current === null ? null : selectRefDistrito.current.value = '0'
        }
    }, [])

    useEffect(() => {
        if (new_personal && new_personal.success === true && new_personal.trabajador){
            setNroTelefono('')
            setCorreoPersonal('')
            setCorreoEmpresa('')
            setPais('')
            setProvincia('')
            setDistrito('')
            setDireccion('')
            selectRefPais.current !== null ? selectRefPais.current.value = '0' : null
            selectRefProvincia.current !== null ? selectRefProvincia.current.value = '0' : null
            selectRefDistrito.current !== null ? selectRefDistrito.current.value = '0' : null
        }else if (new_personal && new_personal.success === false && new_personal.error){
            dispatch (set_error_message(true))
        }
    }, [new_personal])
    
    useEffect(() => {
        window.scrollTo(0, 0)
        //dispatch(locationdata(locationConstants(0, false).get_location_paises))
    }, [])

    useEffect(() => {
        if (get_location_paises && get_location_paises.success === true && get_location_paises.paises){
            setListaPaises(get_location_paises.paises)
        }else if (get_location_paises && get_location_paises.success === false && get_location_paises.error){
            dispatch (set_error_message(true))
        }
    }, [get_location_paises])

    useEffect(() => {
        if (get_location_provincias && get_location_provincias.success === true && get_location_provincias.provincias){
            setListaProvincias(get_location_provincias.provincias)
        }else if (get_location_provincias && get_location_provincias.success === false && get_location_provincias.error){
            dispatch (set_error_message(true))
        }
    }, [get_location_provincias])

    useEffect(() => {
        if (get_location_distritos && get_location_distritos.success === true && get_location_distritos.distritos){
            setListaDistritos(get_location_distritos.distritos)
        }else if (get_location_distritos && get_location_distritos.success === false && get_location_distritos.error){
            dispatch (set_error_message(true))
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

    const continuar_datos_ubicacion = () => {
        if(nro_telefono === ''){
            setENroTelefono(nro_telefono === '' ? true : false)
        }else{
            dispatch(set_data_personal_ubicacion({
                nro_telefono: nro_telefono,
                correo_personal: correo_personal,
                correo_empresa: correo_empresa,
                pais: pais,
                provincia: provincia,
                distrito: distrito,
                direccion: direccion
            }))
            dispatch (set_datos_paso_personal('estudios'))
        }
    }

    const volver_datos_personales = () => {
        dispatch(set_data_personal_ubicacion({
            nro_telefono: nro_telefono,
            correo_personal: correo_personal,
            correo_empresa: correo_empresa,
            pais: pais,
            provincia: provincia,
            distrito: distrito,
            direccion: direccion
        }))
        dispatch(set_datos_paso_personal('personal'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nro teléfono</strong></span>
                        <input 
                            autoComplete={false}
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
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Correo personal</strong></span>
                        <input 
                            id='correo_personal'
                            autoComplete={false}
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
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Correo empresa</strong></span>
                        <input 
                            id='correo_empresa'
                            autoComplete={false}
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
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>País</strong></span>
                        <select
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
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Provincia</strong></span>
                        <select
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
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Distrito</strong></span>
                        <select
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
                            autoComplete={false}
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
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_personales()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                    onClick={() => {continuar_datos_ubicacion()}}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Continuar
                    </p>
                </div>
            </div>
        </div>
    )
}
