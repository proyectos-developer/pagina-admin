import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {departamentosdata} from '../../../redux/slice/departamentosdata'
import { departamentosConstants } from '../../../uri/departamentos-constants'
import {personaldata} from '../../../redux/slice/personaldata'
import { personalConstants } from '../../../uri/personal-constants'
import { useNavigate } from 'react-router-dom'
import {nominasdata} from '../../../redux/slice/nominasdata'
import { nominasConstants } from '../../../uri/nominas-constants'
import { set_error_message } from '../../../redux/actions/data'

export default function NuevaNominaCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectRefDepartamento = useRef(null)
    const selectRefTrabajador = useRef(null)
    
    const [codigo_personal, setCodigoPersonal] = useState('')
    const [fecha_pago, setFechaPago] = useState('')
    const [cambiar_fecha_pago, setCambiarFechaPago] = useState(false)
    const [departamento, setDepartamento] = useState('')
    const [id_departamento, setIdDepartamento] = useState('')
    const [cargo, setCargo] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [id_trabajador, setIdTrabajador] = useState('')
    const [sueldo_bruto, setSueldoBruto] = useState(0)
    const [bono, setBono] = useState(0)
    const [comisiones, setComisiones] = useState(0)
    const [horas_extras, setHorasExtras] = useState(0)
    const [precio_horas_extras, setPrecioHorasExtras] = useState(0)
    const [pago_horas_extras, setPagoHorasExtras] = useState(0)
    const [asignacion_familiar, setAsignacionFamiliar] = useState(0)
    const [bono_transporte, setBonoTransporte] = useState(0)
    const [afp, setAfp] = useState(0)
    const [seguro, setSeguro] = useState(0)
    const [adelanto_sueldo, setAdelantoSueldo] = useState(0)
    const [sueldo_neto, setSueldoNeto] = useState(0)

    const [edepartamento, setEDepartamento] =  useState(false)
    const [enombres, setENombres] =  useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)

    const [lista_departamentos, setListaDepartamentos] = useState([])
    const [lista_personal, setListaPersonal] = useState([])
    const [total_personal, setTotalPersonal] = useState (0)

    const [search_personal, setSearchPersonal] = useState ('')

    const {get_departamentos_filter} = useSelector(({departamentos_data}) => departamentos_data)
    const {get_personal_filter, get_personal} = useSelector(({personal_data}) => personal_data)
    const {new_nomina} = useSelector(({nominas_data}) => nominas_data)

    useEffect(() => {
        if (new_nomina && new_nomina.success === true && new_nomina.nomina){
            dispatch(nominasdata(nominasConstants(0, 0, 0, 0, 0, 0, 16, {}, true).new_nomina))
            window.scrollTo(0, 0)
            resetear_data()
        }else if (new_nomina && new_nomina.success === false && new_nomina.error){
            dispatch (set_error_message(true))
        }
    }, [new_nomina])

    useEffect(() => {
        setFechaPago(new Date())
        dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 100, {}, false).get_departamentos_filter))
    }, [])

    useEffect(() => {
        if (get_departamentos_filter && get_departamentos_filter.success === true && get_departamentos_filter.departamentos){
            setListaDepartamentos(get_departamentos_filter.departamentos)
        }else if (get_departamentos_filter && get_departamentos_filter.success === false && get_departamentos_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_departamentos_filter])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            setListaPersonal(get_personal_filter.personal)
            setTotalPersonal(get_personal_filter.personal.length)
        }else if (get_personal_filter && get_personal_filter.success === false && get_personal_filter.error){
            dispatch (set_error_message(true))
        }
    }, [get_personal_filter])

    useEffect(() => {
        if (get_personal && get_personal.success === true && get_personal.trabajador){
            setNombres (get_personal.trabajador.nombres)
            setApellidos (get_personal.trabajador.apellidos)
            setSueldoBruto(get_personal.trabajador.sueldo_bruto)
            setSueldoNeto(get_personal.trabajador.sueldo_neto)
            setAfp(get_personal.trabajador.afp)
            setSeguro(get_personal.trabajador.seguro)
            setCargo(get_personal.trabajador.cargo)
        }else if (get_personal && get_personal.success === false && get_personal.error){
            dispatch (set_error_message(true))
        }
    }, [get_personal])

    const seleccionar_departamento = (value) => {
        if (value !== '0'){
            setDepartamento (value.split ('-')[1])
            setIdDepartamento (value.split ('-')[0])
            dispatch (personaldata(personalConstants(0, 0, value.split('-')[0], 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }
    }

    const buscar_personal_por_departamento = (value) => {
        setSearchPersonal(value)
        if (value !== ''){
            dispatch (personaldata(personalConstants(0, value, id_departamento, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }else{
            dispatch (personaldata(personalConstants(0, 0, id_departamento, 0, 0, 0, 0, 100, {}, false).get_personal_filter))
        }
    }

    const seleccionar_tabajador = (value) => {
        if (value !== '0'){
            setIdTrabajador(value)
            dispatch (personaldata(personalConstants(value, 0, 0, 0, 0, 0, 0, 100, {}, false).get_personal))
        }
    }

    const volver_a_lista = () => {
        selectRefDepartamento.current ? selectRefDepartamento.current.value = '0' : null
        selectRefTrabajador.current ? selectRefTrabajador.current.value = '0' : null
        resetear_data()
        navigate ('/panel/rrhh/nominas')
    }

    const resetear_data = () => {
        setCodigoPersonal('')
        setFechaPago('')
        setDepartamento('')
        setIdDepartamento('')
        setCargo('')
        setNombres('')
        setApellidos('')
        setIdTrabajador('')
        setSueldoBruto(0)
        setSueldoNeto(0)
        setBono(0)
        setComisiones(0)
        setAfp(0)
        setSeguro(0)
        setHorasExtras(0)
        setPrecioHorasExtras(0)
        setPagoHorasExtras(0)
        setAsignacionFamiliar(0)
        setBonoTransporte(0)
        setAdelantoSueldo(0)
        selectRefDepartamento.current !== null ? selectRefDepartamento.current.value = '0' : null
        selectRefTrabajador.current !== null ? selectRefTrabajador.current.value = '0' : null
    }

    const guardar_datos_nomina = () => {
        if (sueldo_neto === 0 && departamento === '' && nombres === '' && cargo === ''){
            setEDepartamento (departamento === '' ? true : false)
            setENombres (nombres === '' ? true : false)
        }else{
            setEDepartamento (false)
            setENombres (false)
            const fecha = (fecha_pago.toISOString()).split('T')[0]
            const data_nomina = {
                id_personal: parseInt(id_trabajador), 
                codigo_personal: codigo_personal,   
                nombres: nombres,
                apellidos: apellidos,
                departamento: departamento,
                cargo: cargo,
                sueldo_bruto: sueldo_bruto.toString(),
                horas_extras: horas_extras.toString(),
                precio_horas_extras: precio_horas_extras.toString(),
                pago_horas_extras: pago_horas_extras.toString(),
                bono_transporte: bono_transporte.toString(),
                asignacion_familiar: asignacion_familiar.toString(),
                adelanto_sueldo: adelanto_sueldo.toString(),
                sueldo_neto: sueldo_neto.toString(),
                afp: afp.toString(),
                seguro: seguro.toString(),
                bono: bono.toString(),
                comisiones: comisiones.toString(),
                fecha_pago: fecha.split('-')[2] + '/' + fecha.split('-')[1] + '/' + fecha.split('-')[0]
            }
            dispatch (nominasdata(nominasConstants(0, 0, 0, 0, 0, 0, 16, data_nomina, false).new_nomina))
        }
    }

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel')}>
                    Inicio 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/rrhh')}>
                    R.R.H.H
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/rrhh/nominas')}>
                    nominas
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    nueva
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                        <span className='position-absolute'  
                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                <strong>Seleccionar departamento</strong></span>
                        <select
                            id='departamento'
                            ref={selectRefDepartamento}
                            className='form-select rounded'
                            onChange={(event) => seleccionar_departamento(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: edepartamento ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{departamento === '' ? 'Seleccionar departamento' : departamento}</option>
                            {
                                lista_departamentos && lista_departamentos.length > 0 ? (
                                    lista_departamentos.map ((departamento, index) => {
                                        return (
                                            <option value={departamento.id + '-' + departamento.departamento}>{departamento.departamento}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                    {
                        nombres !== '' ? (
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Codigo personal</strong></span>
                                <input
                            autoComplete={false} 
                                    type='default'
                                    id='codigo_personal'
                                    className='form-control'
                                    value={codigo_personal}
                                    onChange={(event) => setCodigoPersonal(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff'}}
                                    placeholder='Código trabajador'/>
                            </div>
                        ) : null
                    }
                </div>      
                {
                    departamento !== '' ? (  
                        <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Buscar trabajador</strong></span>
                                <input
                            autoComplete={false}
                                    type='default'
                                    id='search_personal'
                                    value={search_personal}
                                    className='form-control rounded'
                                    onChange={(event) => buscar_personal_por_departamento(event.target.value)}
                                    style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                            fontFamily: 'Poppins, sans-serif', border: enombres ? '1px solid red' :  '1px solid #007BFF',
                                            padding: 10 / proporcional}}
                                    placeholder='Buscar por nombre, código, dni...'/>
                            </div>
                            {
                                lista_personal && lista_personal.length > 0 ? (
                                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Seleccionar trabajador</strong></span>
                                        <select
                                            id='trabajador'
                                            ref={selectRefTrabajador}
                                            className='form-select rounded'
                                            onChange={(event) => seleccionar_tabajador(event.target.value)}
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                    fontFamily: 'Poppins, sans-serif', border: enombres ? '1px solid red' : '1px solid #007BFF',
                                                    padding: 10 / proporcional}}>
                                            <option value='0'>{total_personal} encontrado(s)</option>
                                            {
                                                lista_personal.map ((personal, index) => {
                                                    return (
                                                        <option value={personal.id}>{personal.nombres + ' ' + personal.apellidos}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>  
                                ) : null
                            }
                        </div>  
                    ) : null
                }                     
                {
                    nombres !== '' ? (
                        <div className='' style={{width: '100%', height: 'auto'}}>
                            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Fecha de pago</strong></span>
                                    <input
                            autoComplete={false}
                                        type='date'
                                        id='fecha_pago'
                                        value={fecha_pago}
                                        className='form-control rounded'
                                        onChange={(event) => {setFechaPago(event.target.value); setCambiarFechaPago(false)}}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                        placeholder='Buscar por nombre, código, dni...'/>
                                </div>
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Cargo en la empresa</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={true}
                                        type='default'
                                        id='cargo'
                                        value={cargo}
                                        className='form-control rounded'
                                        onChange={(event) => setCargo(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='Cargo personal'/>
                                </div>  
                            </div>  
                            <div className='rounded-circle' style={{width: '100%', height: 2 / proporcional, background: '#4a4a4a', marginBottom: 16 / proporcional}}/>
                            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Sueldo bruto (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={true}
                                        type='number'
                                        id='sueldo_bruto'
                                        value={sueldo_bruto}
                                        className='form-control rounded'
                                        onChange={(event) => setSueldoBruto(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, border: '1px solid #007bff',
                                                background: 'white'}}
                                        placeholder='0'/>
                                </div>  
                            </div> 
                            <div className='' style={{width: '100%', height: 'auto'}}>
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Bono (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={false}
                                        type='number'
                                        id='bono'
                                        value={bono}
                                        className='form-control rounded'
                                        onChange={(event) => setBono(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div> 
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Comisiones (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={false}
                                        type='number'
                                        id='comisiones'
                                        value={comisiones}
                                        className='form-control rounded'
                                        onChange={(event) => setComisiones(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div>
                            </div> 
                            <div className='' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <p  style={{lineHeight: `${25 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, background: 'white', cursor: 'pointer',
                                        padding: 12.5 / proporcional}}><strong>Otros: </strong></p>
                            </div>
                            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Asignacion familiar (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={true}
                                        type='number'
                                        id='asignacion_familiar'
                                        value={asignacion_familiar}
                                        className='form-control rounded'
                                        onChange={(event) => setAsignacionFamiliar(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div> 
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Bono transporte (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={true}
                                        type='number'
                                        id='bono_transporte'
                                        value={bono_transporte}
                                        className='form-control rounded'
                                        onChange={(event) => setBonoTransporte(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div>
                            </div>
                            <div className='' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <p  style={{lineHeight: `${25 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, background: 'white', cursor: 'pointer',
                                        padding: 12.5 / proporcional}}><strong>Horas extras realizadas: </strong>{horas_extras} hrs.</p>
                            </div>
                            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Pago / hora extra (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={false}
                                        type='number'
                                        id='precio_horas_extras'
                                        value={precio_horas_extras}
                                        className='form-control rounded'
                                        onChange={(event) => setPrecioHorasExtras(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div> 
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Pago horas extras (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={false}
                                        type='number'
                                        id='pago_horas_extras'
                                        value={pago_horas_extras}
                                        className='form-control rounded'
                                        onChange={(event) => setPagoHorasExtras(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div>
                            </div>
                            <div className='' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <p  style={{lineHeight: `${25 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, background: 'white', cursor: 'pointer',
                                        padding: 12.5 / proporcional}}><strong>Descuentos:</strong></p>
                            </div>
                            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Dscto AFP (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={true}
                                        type='number'
                                        id='afp'
                                        value={afp}
                                        className='form-control rounded'
                                        onChange={(event) => setAfp(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div> 
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Dscto seguro (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={true}
                                        type='number'
                                        id='seguro'
                                        value={seguro}
                                        className='form-control rounded'
                                        onChange={(event) => setSeguro(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div>
                            </div>
                            <div className='' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <p  style={{lineHeight: `${25 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, background: 'white', cursor: 'pointer',
                                        padding: 12.5 / proporcional}}><strong>Otros descuentos: </strong></p>
                            </div>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Adelanto sueldo (S/.)</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={true}
                                        type='number'
                                        id='adelanto_sueldo'
                                        value={adelanto_sueldo}
                                        className='form-control rounded'
                                        onChange={(event) => setAdelantoSueldo(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div>
                            </div>
                            <div className='rounded-circle' style={{width: '100%', height: 2 / proporcional, background: '#4a4a4a', marginBottom: 16 / proporcional}}/>
                            <div className='' style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                <p  style={{lineHeight: `${25 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', marginBottom: 0, background: 'white', cursor: 'pointer',
                                        padding: 12.5 / proporcional}}><strong>A pagar: </strong></p>
                            </div>
                            <div className='' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <div className='position-relative' 
                                    style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Sueldo neto</strong></span>
                                    <input
                            autoComplete={false}
                                        disabled={true}
                                        type='number'
                                        id='sueldo_neto'
                                        value={sueldo_neto}
                                        className='form-control rounded'
                                        onChange={(event) => setSueldoNeto(event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                                background: 'white', border: '1px solid #007bff'}}
                                        placeholder='0'/>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                        onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Cancelar
                        </p>
                    </div>
                    <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                        onClick={() => guardar_datos_nomina()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Guardar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
