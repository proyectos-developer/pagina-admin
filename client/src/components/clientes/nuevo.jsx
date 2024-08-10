import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {negociosdata} from '../../redux/slice/negociosdata'
import {negociosConstants} from '../../uri/negocios-constants'

export default function NuevoCliente ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

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

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [show_lista, setShowLista] = useState(false)

    const [lista_negocios, setListaNegocios] = useState([])

    const {new_negocio, get_negocios} = useSelector(({negocios_data}) => negocios_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(negociosdata(negociosConstants(0, 0, 32, {}, false).get_negocios))
    }, [])

    useEffect(() => {
        if (get_negocios && get_negocios.success === true && get_negocios.negocios){
            setListaNegocios(get_negocios.negocios)
            dispatch(negociosdata(negociosConstants(0, 0, 0, {}, true).get_negocios))
        }
    }, [get_negocios])

    useEffect(() => {
        if (new_negocio && new_negocio.success === true && new_negocio.negocios){
            setListaNegocios(new_negocio.negocios)
            dispatch(negociosdata(negociosConstants(0, 0, 16, {}, true).new_negocio))
            resetear_data()
        }
    }, [new_negocio])

    const resetear_data = () => {
        setNombreNegocio('')
        setNroRuc('')
        setNombreContacto('')
        setCorreo('')
        setNroTelefono('')
        setUrlLogo('')
    }

    const volver_a_lista = () => {
        resetear_data()
        navigate ('/clientes')
    }

    const guardar_negocio_empresa = () => {
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
            dispatch (negociosdata(negociosConstants(0, 0, 16, data_nuevo, false).new_negocio))
        }
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: '100%'}}>
                <div style={{width: '25%', height: '100%'}}>
                    <h3 style={{fontSize: 20 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 16 / proporcional, fontWeight: 500,
                        fontFamily: 'Poppins, sans-serif', color: 'rgb (89, 89, 89)'}}>
                        Clientes ya agregados
                    </h3>
                    <div className={show_lista ? 'rounded overflow-auto' : 'rounded overflow-hidden'} style={{width: '100%', height: 530 / proporcional,
                            border: '1px solid #f2f2f2', padding: 5 / proporcional}}
                        onMouseOver={() => setShowLista(true)} onMouseLeave={() => setShowLista(false)}>
                        {
                            lista_negocios && lista_negocios.length > 0 ? (
                                lista_negocios.map ((negocio, index) => {
                                    return (
                                        <p style={{color: '#4a4a4a', marginBottom: 8 / proporcional, fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', fontWeight: 500}}>
                                            <strong>{index + 1}.</strong> {negocio.nombre_negocio}
                                        </p>
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
                <div style={{width: '68%', height: '100%'}}>
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
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                            onClick={() => guardar_negocio_empresa()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Guardar datos
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
                </div>
            </div>
        </div>
    )
}
