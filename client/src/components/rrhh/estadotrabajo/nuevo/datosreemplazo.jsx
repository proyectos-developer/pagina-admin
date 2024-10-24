import React, { useEffect, useRef, useState } from 'react'
import { set_confirmacion_eliminacion, set_data_estado_reemplazo, set_datos_paso_estado, set_error_message } from '../../../../redux/actions/data'
import { useDispatch, useSelector } from 'react-redux'
import { personaldata } from '../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../uri/personal-constants'
import axios from 'axios'
import { constantes } from '../../../../uri/constantes'

import check_box from '../../../../assets/iconos/comun/check_box.png'
import box from '../../../../assets/iconos/comun/box.png'

export default function DatosReemplazo ({proporcional}) {

    const dispatch = useDispatch()

    const selectRefReemplazo = useRef(null)

    const [codigo_personal_reemplazo, setCodigoPersonalReemplazo] = useState('')
    const [id_reemplazo, setIdReemplazo] = useState('') 
    const [reemplazo_nombres, setReemplazoNombres] = useState('') 
    const [reemplazo_apellidos, setReemplazoApellidos] = useState('') 
    const [reemplazo_nro_telefono, setReemplazoNroTelefono] = useState('') 
    const [reemplazo_correo, setReemplazoCorreo] = useState('')
    const [reemplazo_fecha_ingreso, setReemplazoFechaIngreso] = useState('') 
    const [reemplazo_fecha_salida, setReemplazoFechaSalida] = useState('') 
    const [reemplazo, setReemplazo] = useState(false)
    const [notas_reemplazo, setNotasReemplazo] = useState('')

    const [search_reemplazo, setSearchReemplazo] = useState('')
    const [lista_reemplazo, setListaReemplazo] = useState([])

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_guardar, setBotonGuardar] = useState(false)

    const {get_personal_filter, new_estado} = useSelector(({personal_data}) => personal_data)
    const {data_estado_reemplazo} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_estado_reemplazo && data_estado_reemplazo.nombres){
            setIdReemplazo(data_estado_reemplazo.id_reemplazo)
            setCodigoPersonalReemplazo(data_estado_reemplazo.codigo_personal_reemplazo)
            setReemplazoNombres(data_estado_reemplazo.reemplazo_nombres)
            setReemplazoApellidos(data_estado_reemplazo.reemplazo_apellidos)
            setReemplazoNroTelefono(data_estado_reemplazo.reemplazo_nro_telefono)
            setReemplazoCorreo(data_estado_reemplazo.reemplazo_correo)
            setReemplazoFechaIngreso(data_estado_reemplazo.reemplazo_fecha_ingreso)
            setReemplazoFechaSalida(data_estado_reemplazo.reemplazo_fecha_salida)
            setNotasReemplazo(data_estado_reemplazo.notas_trabajador)
            setReemplazo(data_estado_reemplazo.reemplazo)
        }else{
            setIdReemplazo('')
            setCodigoPersonalReemplazo('')
            setReemplazoNombres('')
            setReemplazoApellidos('')
            setReemplazoNroTelefono('')
            setReemplazoCorreo('')
            setReemplazoFechaIngreso('')
            setReemplazoFechaSalida('')
            setNotasReemplazo('')
            setReemplazo(false)
            selectRefReemplazo.current === null ? null : selectRefReemplazo.current.value = '0'
        }
    }, [])

    useEffect(() => {
        if (new_estado && new_estado.success === true && new_estado.estado){
            setIdReemplazo('')
            setCodigoPersonalReemplazo('')
            setReemplazoNombres('')
            setReemplazoApellidos('')
            setReemplazoNroTelefono('')
            setReemplazoCorreo('')
            setReemplazoFechaIngreso('')
            setReemplazoFechaSalida('')
            setNotasReemplazo('')
            setReemplazo(false)
        }else if (new_estado && new_estado.success === false && new_estado.error){
            dispatch (set_error_message(true))
        }
    }, [new_estado])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            setListaReemplazo(get_personal_filter.personal)
        }else if (get_personal_filter && get_personal_filter.success === false && get_personal_filter.error){
            dispatch (set_confirmacion_eliminacion(true))
        }
    }, [get_personal_filter])

    const buscar_reemplazo_trabajador = (value) => {
        if (value !== ''){
            dispatch (personaldata(personalConstants(0, value, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }else{
            dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }
        setSearchReemplazo(value)
    }

    const seleccionar_reemplazo = (value) => {
        if (value !== '0'){
            axios.get (`${constantes().url_principal[0].url}/personal/${value}`)
                .then ((res) => {
                    setIdReemplazo(res.data.trabajador.id)
                    setCodigoPersonalReemplazo(res.data.trabajador.codigo_personal)
                    setReemplazoNombres(res.data.trabajador.nombres)
                    setReemplazoApellidos(res.data.trabajador.apellidos)
                    setReemplazoNroTelefono(res.data.trabajador.nro_telefono)
                    setReemplazoCorreo(res.data.trabajador.correo_personal)
                    selectRefReemplazo.current ? selectRefReemplazo.current.value = '0' : null
                    setSearchReemplazo(res.data.trabajador.nombres + ' ' + res.data.trabajador.apellidos)
                }).catch ((err) => {
                    dispatch (set_confirmacion_eliminacion(true))
                })
        }
    }

    const volver_datos_trabajador = () => {
        dispatch (set_datos_paso_estado('trabajador'))
    }

    const guardar_datos_estado = () => {
        if (500 - notas_reemplazo.length <= 0){
        }else{
            const data_nuevo = {
                id_reemplazo: id_reemplazo,
                codigo_personal_reemplazo: codigo_personal_reemplazo,
                reemplazo_nombres: reemplazo_nombres,
                reemplazo_apellidos: reemplazo_apellidos,
                reemplazo_nro_telefono: reemplazo_nro_telefono,
                reemplazo_correo: reemplazo_correo,
                reemplazo_fecha_ingreso: reemplazo_fecha_ingreso,
                reemplazo_fecha_salida: reemplazo_fecha_salida,
                notas_reemplazo: notas_reemplazo,
                reemplazo: reemplazo
            }
            dispatch (set_data_estado_reemplazo(data_nuevo))
            dispatch (set_datos_paso_estado('guardar'))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='d-flex' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <img src={reemplazo ? check_box : box} 
                    style={{width: 30 / proporcional, height: 30 / proporcional, padding: 5 / proporcional,
                        marginRight: 10 / proporcional, cursor: 'pointer'}}
                    onClick={() => setReemplazo(!reemplazo)}/>
                <p style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: '#007BFF',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500}}>
                                    ¿Cuenta con reemplazo?</p>
            </div>
            {
                reemplazo ? (
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Buscar reemplazo</strong></span>
                                <input
                                    type='default' 
                                    id='search_reemplazo'
                                    value={search_reemplazo}
                                    className='form-control rounded'
                                    onChange={(event) => buscar_reemplazo_trabajador (event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Nombre del reemplazo'/>
                            </div>
                            {
                                lista_reemplazo && lista_reemplazo.length > 0 ? (
                                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Seleccionar reemplazo</strong></span>
                                        <select
                                            ref={selectRefReemplazo}
                                            id='search_trabajador'
                                            className='form-select rounded'
                                            onChange={(event) => seleccionar_reemplazo (event.target.value)}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                    padding: 10 / proporcional}}>
                                            <option value='0'>{reemplazo_nombres === '' ? 'Seleccionar trabajador' : reemplazo_nombres + reemplazo_apellidos}</option>
                                            {
                                                lista_reemplazo && lista_reemplazo.map ((trabajador, index) => {
                                                    return (
                                                        <option value={trabajador.id}>{trabajador.nombres} {trabajador.apellidos}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                ) : null
                            }
                        </div>
                        {
                            reemplazo_nombres !== '' ? (
                                <div style={{width: '100%', height: 'auto'}}>
                                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                    <span className='position-absolute'  
                                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                            <strong>Código trabajador</strong></span>
                                        <input  
                                            disabled={true}
                                            type='default'
                                            id='codigo_personal_reemplazo'
                                            value={codigo_personal_reemplazo}
                                            className='form-control rounded'
                                            onChange={(event) => setCodigoPersonalReemplazo(event.target.value)}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                    padding: 10 / proporcional}}
                                            placeholder='Código personal'/>
                                    </div>
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nombres</strong></span>
                                            <input
                                                disabled={true}
                                                type='default' 
                                                id='reemplazo_nombres'
                                                value={reemplazo_nombres}
                                                className='form-control rounded'
                                                onChange={(event) => setReemplazoNombres (event.target.value)}
                                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                        padding: 10 / proporcional}}
                                                placeholder='Nombres del trabajador'/>
                                        </div>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Apellidos</strong></span>
                                            <input
                                                disabled={true}
                                                type='default' 
                                                id='reemplazo_apellidos'
                                                value={reemplazo_apellidos}
                                                className='form-control rounded'
                                                onChange={(event) => setReemplazoApellidos (event.target.value)}
                                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                        padding: 10 / proporcional}}
                                                placeholder='Apellidos del trabajador'/>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Nro teléfono</strong></span>
                                            <input
                                                disabled={true}
                                                type='number' 
                                                id='reemplazo_nro_telefono'
                                                value={reemplazo_nro_telefono}
                                                className='form-control rounded'
                                                onChange={(event) => setReemplazoNroTelefono (event.target.value)}
                                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                        padding: 10 / proporcional}}
                                                placeholder='Número de teléfono'/>
                                        </div>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Correo</strong></span>
                                            <input
                                                disabled={true}
                                                type='e-mail' 
                                                id='reemplazo_correo'
                                                value={reemplazo_correo}
                                                className='form-control rounded'
                                                onChange={(event) => setReemplazoCorreo (event.target.value)}
                                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                        padding: 10 / proporcional}}
                                                placeholder='Correo personal'/>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Fecha ingreso</strong></span>
                                            <input
                                                type='date' 
                                                id='reemplazo_fecha_ingreso'
                                                value={reemplazo_fecha_ingreso}
                                                className='form-control rounded '
                                                onChange={(event) => setReemplazoFechaIngreso (event.target.value)}
                                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif',
                                                        padding: 10 / proporcional, border: '1px solid #007bff'}}
                                                placeholder='Fecha ingreso'/>
                                        </div>
                            <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Fecha salida</strong></span>
                                            <input
                                                type='date' 
                                                id='reemplazo_fecha_salida'
                                                value={reemplazo_fecha_salida}
                                                className='form-control rounded'
                                                onChange={(event) => setReemplazoFechaSalida (event.target.value)}
                                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                        fontFamily: 'Poppins, sans-serif',
                                                        padding: 10 / proporcional, border: '1px solid #007bff'}}
                                                placeholder='Fecha salida'/>
                                        </div>
                                    </div>
                            <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Notas</strong></span>
                                        <textarea
                                            type='default' 
                                            rows={4}
                                            id='notas_reemplazo'
                                            value={notas_reemplazo}
                                            className='form-control rounded'
                                            onChange={(event) => setNotasReemplazo (event.target.value)}
                                            style={{width: '100%', height: 200 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: 500 - notas_reemplazo.length > 0 ? '1px solid #007BFF' : '1px solid red',
                                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                                            placeholder='Notas'/>
                                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - notas_reemplazo.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - notas_reemplazo.length}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                ) : null
            }
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_trabajador()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                    onClick={() => guardar_datos_estado()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Gauardar
                    </p>
                </div>
            </div>
        </div>
    )
}
