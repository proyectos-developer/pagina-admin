import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {negociosdata} from '../../redux/slice/negociosdata'
import {negociosConstants} from '../../uri/negocios-constants'
import { set_data_negocio } from '../../redux/actions/data'

export default function DetallesClienteTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_negocio, setIdNegocio] = useState('')
    const [nombre_negocio, setNombreNegocio] = useState('')
    const [nro_ruc, setNroRuc] = useState('')
    const [nombre_contacto, setNombreContacto] = useState('')
    const [nro_telefono, setNroTelefono] = useState ('')
    const [correo, setCorreo] = useState ('')
    const [url_logo, setUrlLogo] = useState ('')

    const [enombre_negocio, setENombreNegocio] = useState(false)
    const [enro_ruc, setENroRuc] = useState(false)
    const [enombre_contacto, setENombreContacto] = useState(false)
    const [enro_telefono, setENroTelefono] = useState (false)
    const [ecorreo, setECorreo] = useState (false)
    const [eurl_logo, setEUrlLogo] = useState (false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_negocio, get_negocio} = useSelector(({negocios_data}) => negocios_data)
    const {data_negocio, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_negocio.nombre_negocio === undefined){
            dispatch(negociosdata(negociosConstants(location.pathname.split ('/')[3], 0, 32, {}, false).get_negocio))
        }else{
            setIdNegocio(data_negocio.id)
            setNombreNegocio(data_negocio.nombre_negocio)
            setNroRuc(data_negocio.nro_ruc)
            setCorreo(data_negocio.correo)
            setNombreContacto(data_negocio.nombre_contacto)
            setNroTelefono(data_negocio.nro_telefono)
            setUrlLogo(data_negocio.url_logo)   
        }
    }, [])

    useEffect(() => {
        if (get_negocio && get_negocio.success === true && get_negocio.negocio){
            setIdNegocio(get_negocio.negocio.id)
            setNombreNegocio(get_negocio.negocio.nombre_negocio)
            setNroRuc(get_negocio.negocio.nro_ruc)
            setCorreo(get_negocio.negocio.correo)
            setNombreContacto(get_negocio.negocio.nombre_contacto)
            setNroTelefono(get_negocio.negocio.nro_telefono)
            setUrlLogo(get_negocio.negocio.url_logo)   
            dispatch(negociosdata(negociosConstants(0, 0, 16, {}, false).get_negocio))
        }
    }, [get_negocio])

    useEffect(() => {
        if (update_negocio && update_negocio.success === true && update_negocio.negocios){
            dispatch(negociosdata(negociosConstants(0, 0, 16, {}, true).update_negocio))
            setEditarInformacion(false)
        }
    }, [update_negocio])

    const volver_a_lista = () => {
        dispatch(set_data_negocio({}))
        navigate ('/panel/clientes')
    }

    const actualizar_datos_negocio = () => {
        if (nombre_negocio === '' || url_logo === ''){
            setENombreNegocio(nombre_negocio === '' ? true : false)
            setEUrlLogo(url_logo === '' ? true : false)
        }else{
            setENombreNegocio(false)
            setEUrlLogo(false)
            const data_nuevo = {
                nombre_negocio: nombre_negocio,
                nro_ruc: nro_ruc,
                nombre_contacto: nombre_contacto,
                nro_telefono: nro_telefono,
                correo: correo,
                url_logo: url_logo
            }
            dispatch (negociosdata(negociosConstants(id_negocio, 0, 16, data_nuevo, false).update_negocio))
        }
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 20 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 20 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: '100%'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '48%', height: 174 / proporcional}}>
                        <div className='rounded-circle' style={{width:  174 / proporcional, height: 174 / proporcional,
                            border: '1px solid #4a4a4a'}}>
                            {
                                url_logo !== '' ? (
                                    <img className='rounded-circle' src={url_logo} 
                                        style={{width: 172 / proporcional, height: 172 / proporcional}}/>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className='' style={{width: '48%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Nombre negocio / empresa
                            </span>
                            <input 
                                disabled={!editar_informacion}
                                id='nombre_negocio'
                                type='default'
                                className='form-control rounded'
                                value={nombre_negocio}
                                onChange={(event) => setNombreNegocio(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enombre_negocio ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre negocio / empresa'/>
                        </div>
                        <div style={{width: '100%', height: 'auto'}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Nro R.U.C
                            </span>
                            <input 
                                disabled={!editar_informacion}
                                id='nro_ruc'
                                type='number'
                                className='form-control rounded'
                                value={nro_ruc}
                                onChange={(event) => setNroRuc(event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enro_ruc ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nro R.U.C'/>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div style={{width: '48%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Nombre contacto
                        </span>
                        <input 
                            disabled={!editar_informacion}
                            id='nombre_contacto'
                            type='default'
                            className='form-control rounded'
                            value={nombre_contacto}
                            onChange={(event) => setNombreContacto(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: enombre_contacto ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre negocio / empresa'/>
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
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div style={{width: '100%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            Correo electronico
                        </span>
                        <input 
                            disabled={!editar_informacion}
                            id='correo'
                            type='e-mail'
                            className='form-control rounded'
                            value={correo}
                            onChange={(event) => setCorreo(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: ecorreo ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Correo electrónico'/>
                    </div>
                </div>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div style={{width: '100%', height: 'auto'}}>
                        <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif'}}>
                            URL Logo
                        </span>
                        <input 
                            disabled={!editar_informacion}
                            id='url_logo'
                            type='web'
                            className='form-control rounded'
                            value={url_logo}
                            onChange={(event) => setUrlLogo(event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eurl_logo ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='URL Logo'/>
                    </div>
                </div>
                {
                    editar_informacion ? (
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                onClick={() => actualizar_datos_negocio()}>
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
                                onClick={() => setEditarInformacion(true)}>
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
