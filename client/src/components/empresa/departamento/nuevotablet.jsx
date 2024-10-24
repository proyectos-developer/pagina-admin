import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {departamentosdata} from '../../../redux/slice/departamentosdata'
import {departamentosConstants} from '../../../uri/departamentos-constants'
import {personaldata} from '../../../redux/slice/personaldata'
import { personalConstants } from '../../../uri/personal-constants'
import { set_error_message } from '../../../redux/actions/data'

export default function NuevoDepartamentoEmpresaTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [departamento, setDepartamento] = useState ('')
    const [descripcion, setDescripcion] = useState('')
    const [jefe, setJefe] = useState('')
    const [id_jefe, setIdJefe] = useState('')
    const [equipo, setEquipo] = useState('')

    const [miembro, setMiembro] = useState('')
    const [search_jefe, setSearchJefe] = useState('')
    const [search_equipo, setSearchEquipo] = useState('')
    const [seleccion_trabajador, setSeleccionTrabajador] = useState('')

    const [lista_jefes, setListaJefes] = useState([])
    const [lista_equipo, setListaEquipo] = useState([])

    const [edepartamento, setEDepartamento] = useState (false)
    const [edescripcion, setEDescripcion] = useState (false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_departamento} = useSelector(({departamentos_data}) => departamentos_data)
    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (new_departamento && new_departamento.success === true && new_departamento.departamento){
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, true).new_departamento))
            resetear_data()
        }else if (new_departamento && new_departamento.success === false && new_departamento.error){
            dispatch(set_error_message(true))
        }
    }, [new_departamento])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            if (seleccion_trabajador === 'jefe'){
                setListaJefes(get_personal_filter.personal)
            }else{
                setListaEquipo(get_personal_filter.personal)
            }
        }else if (get_personal_filter && get_personal_filter.success === false && get_personal_filter.error){
            dispatch(set_error_message(true))
        }
    }, [get_personal_filter])

    const buscar_trabajador = (value) => {
        if (seleccion_trabajador === 'jefe'){
            if (value !== '0'){
                setSearchJefe(value)
                dispatch (personaldata(personalConstants(0, search_jefe, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
            }else{
                setSearchJefe(value)
                dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
            }
        }else{
            if (value !== '0'){
                setSearchEquipo(value)
                dispatch (personaldata(personalConstants(0, search_equipo, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
            }else{
                setSearchEquipo(value)
                dispatch (personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
            }
        }
    }

    const seleccionar_jefe = (value) => {
        if (value !== '0'){
            setJefe(value.split ('*')[1].replace ('-', ' '))
            setIdJefe(value.split ('*')[0])
        }
    }

    const seleccionar_miembro = (value) => {
        if (value !== '0'){
            let agregar = equipo === '' ? value : equipo + ', ' + value 
            setMiembro(value)
            setEquipo(agregar)
            console.log (agregar)
        }
    }

    const resetear_data = () => {
        setDepartamento('')
        setDescripcion('')
        setJefe('')
        setIdJefe('')
        setEquipo('')
    }

    const volver_a_lista = () => {
        resetear_data()
        window.scrollTo(0, 0)
        navigate ('/panel/empresa/departamentos')
    }

    const guardar_data_departamento = () => {
        if (departamento === '' || (500 - descripcion.length <= 0)){
            setEDepartamento(departamento === '' ? true : false)
            setEDescripcion(500 - descripcion.length <= 0 === '' ? true : false)
        }else{
            setEDepartamento(false)
            setEDescripcion(false)
            const data_nuevo = {
                departamento: departamento,
                descripcion: descripcion,
                id_jefe: id_jefe === '' ? 0 : id_jefe,
                jefe: jefe,
                equipo: equipo
            }
            dispatch (departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, data_nuevo, false).new_departamento))
        }
    }
    
    useEffect(() => {
        return (() => {
        })
    }, [])

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
                        onClick={() => navigate ('/panel/empresa')}>
                    empresa
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                    onClick={() => navigate ('/panel/empresa/departamentos')}>
                    departamentos
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}>
                    nuevo
                </p>
            </div>
            <div className='shadow' 
                style={{width: '100%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nombre departamento</strong></span>
                        <input
                                    autoComplete={false}
                            type='default' 
                            id='departamento'
                            value={departamento}
                            className='form-control rounded'
                            onChange={(event) => setDepartamento (event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: edepartamento ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre departamento'/>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Desripción</strong></span>
                        <textarea 
                            id='descripcion'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: edescripcion ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='Descripción del departamento'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 500 - descripcion.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{500 - descripcion.length}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Buscar jefe</strong></span>
                            <input
                                    autoComplete={false}
                                type='default' 
                                id='search_jefe'
                                value={search_jefe}
                                className='form-control rounded'
                                onFocus={() => setSeleccionTrabajador('jefe')}
                                onChange={(event) => buscar_trabajador (event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre del jefe, código'/>
                        </div>
                        {
                            lista_jefes && lista_jefes.length > 0 ? (
                                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Seleccionar jefe</strong></span>
                                    <select
                                        type='default' 
                                        id='jefe'
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_jefe (event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{jefe === '' ? 'Seleccionar jefe' : ''}</option>
                                        {
                                            lista_jefes.map ((jefe, index) => {
                                                return (
                                                    <option value={jefe.id + '*' + jefe.nombres + '-' + jefe.apellidos}>{jefe.nombres} {jefe.apellidos}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>  
                            ) : null
                        }
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Buscar trabajadores</strong></span>
                            <input
                                    autoComplete={false}
                                type='default' 
                                id='search_equipo'
                                value={search_equipo}
                                className='form-control rounded'
                                onFocus={() => setSeleccionTrabajador('equipo')}
                                onChange={(event) => buscar_trabajador (event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre trabajador, codigo'/>
                        </div>
                        {
                            lista_equipo && lista_equipo.length > 0 ? (
                                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                        <span className='position-absolute'  
                                            style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                                background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                                <strong>Seleccionar trabajadores</strong></span>
                                    <select
                                        type='default' 
                                        id='miembro'
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_miembro (event.target.value)}
                                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{miembro === '' ? 'Seleccionar miembro' : ''}</option>
                                        {
                                            lista_equipo.map ((miembro, index) => {
                                                return (
                                                    <option value={miembro.nombres + ' ' + miembro.apellidos}>{miembro.nombres} {miembro.apellidos}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>  
                            ) : null
                        }
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Miembros del departamento</strong></span>
                        <textarea 
                            disabled={true}
                            id='equipo'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={equipo}
                            onChange={(event) => setEquipo(event.target.value)}
                            style={{width: '100%', height: 120 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: 1000 - equipo.length <= 0 ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                            placeholder='Miembros del departamento'/>
                        <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                            <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 1000 - equipo.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 1000, cursor: 'pointer'}}>{1000 - equipo.length}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => volver_a_lista()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                        <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                            onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                            onClick={() => guardar_data_departamento()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Guardar datos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
