import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { locationdata } from '../../../../redux/slice/locationdata'
import {locationConstants} from '../../../../uri/location-constants'

import {set_data_personal_ubicacion, set_datos_paso_personal} from '../../../../redux/actions/data'

export default function DatosComunicacionUbicacion ({proporcional}) {

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

    useEffect(() => {
        if (data_personal_ubicacion && data_personal_ubicacion.nro_telefono){
            setNroTelefono(data_personal_ubicacion.nro_telefono)
            setCorreoPersonal(data_personal_ubicacion.correo_personal)
            setCorreoEmpresa(data_personal_ubicacion.correo_empresa)
            setPais(data_personal_ubicacion.pais)
            setProvincia(data_personal_ubicacion.provincia)
            setDistrito(data_personal_ubicacion.distrito)
            setDireccion(data_personal_ubicacion.direccion)
        }
    }, [])
    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(locationdata(locationConstants(0, false).get_location_paises))
    }, [])

    useEffect(() => {
        if (get_location_paises && get_location_paises.success === true && get_location_paises.paises){
            setListaPaises(get_location_paises.paises)
        }
    }, [get_location_paises])

    useEffect(() => {
        if (get_location_provincias && get_location_provincias.success === true && get_location_provincias.provincias){
            setListaProvincias(get_location_provincias.provincias)
        }
    }, [get_location_provincias])

    useEffect(() => {
        if (get_location_distritos && get_location_distritos.success === true && get_location_distritos.distritos){
            setListaDistritos(get_location_distritos.distritos)
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
        dispatch(set_datos_paso_personal('personal'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '32%', height: 'auto'}}>
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
                    <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input 
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
                    <div style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
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
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '32%', height: 'auto'}}>
                        <select
                            id='pais'
                            ref={selectRefPais}
                            className='form-select rounded'
                            onChange={(event) => seleccionar_pais (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
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
                    <div style={{width: '32%', height: 'auto'}}>
                        <select
                            id='provincia'
                            ref={selectRefProvincia}
                            className='form-select rounded'
                            onChange={(event) => seleccionar_provincia (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
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
                    <div style={{width: '32%', height: 'auto'}}>
                        <select
                            id='distrito'
                            ref={selectRefDistrito}
                            className='form-select rounded'
                            onChange={(event) => seleccionar_distrito (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
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
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div style={{width: '100%', height: 'auto'}}>
                        <input 
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
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_personales()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                    onClick={() => {continuar_datos_ubicacion()}}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Continuar
                    </p>
                </div>
            </div>
        </div>
    )
}
