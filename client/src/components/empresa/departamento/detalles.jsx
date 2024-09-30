import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_departamento } from '../../../redux/actions/data'
import {departamentosdata} from '../../../redux/slice/departamentosdata'
import {departamentosConstants} from '../../../uri/departamentos-constants'
import {personaldata} from '../../../redux/slice/personaldata'
import { personalConstants } from '../../../uri/personal-constants'

export default function DetallesDepartamento ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [id_departamento, setIdDepartamento] = useState('')
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
    const [ejefe, setEJefe] = useState('')

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_departamento, get_departamento} = useSelector(({departamentos_data}) => departamentos_data)
    const {data_departamento, data_editable} = useSelector(({data_actions}) => data_actions)
    const {get_personal_filter} = useSelector(({personal_data}) => personal_data)
    
    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (data_departamento.departamento === undefined){
            dispatch(departamentosdata(departamentosConstants(location.pathname.split ('/')[6], 0, 0, 0, 0, 16, {}, false).get_departamento))
        }else{
            setIdDepartamento(data_departamento.id)
            setDepartamento(data_departamento.departamento)
            setDescripcion(data_departamento.descripcion)
            setIdJefe(data_departamento.id_jefe)
            setJefe(data_departamento.jefe)
            setEquipo(data_departamento.equipo)
        }
    }, [data_departamento])

    useEffect(() => {
        if (get_departamento && get_departamento.success === true && get_departamento.departamento){
            setIdDepartamento(get_departamento.departamento.id)
            setDepartamento(get_departamento.departamento.departamento)
            setDescripcion(get_departamento.departamento.descripcion)
            setIdJefe(get_departamento.departamento.id_jefe)
            setJefe(get_departamento.departamento.jefe)
            setEquipo(get_departamento.departamento.equipo)
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, true).get_departamento))
        }
    }, [get_departamento])

    useEffect(() => {
        if (update_departamento && update_departamento.success === true && update_departamento.departamento){
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, true).update_departamento))
            setEditarInformacion(false)
        }
    }, [update_departamento])

    useEffect(() => {
        if (get_personal_filter && get_personal_filter.success === true && get_personal_filter.personal){
            if (seleccion_trabajador === 'jefe'){
                setListaJefes(get_personal_filter.personal)
            }else{
                setListaEquipo(get_personal_filter.personal)
            }
        }
    }, [get_personal_filter])

    const buscar_trabajador = (value) => {
        if (value !== ''){
            if (seleccion_trabajador === 'jefe'){
                setSearchJefe(value)
            }else{
                setSearchEquipo(value)
            }
            dispatch (personaldata(personalConstants(0, seleccion_trabajador === 'jefe' ? search_jefe : search_equipo, 0, 0, 0, 0, 0, 16, {}, false).get_personal_filter))
        }else{
            setListaEquipo ([])
            setListaJefes([])
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

    const volver_a_lista = () => {
        dispatch(set_data_departamento({}))
        navigate ('/panel/empresa/departamentos')
    }
    
    const actualizar_data_departamento = () => {
        if (departamento === '' || jefe === ''){
            setEDepartamento(departamento === '' ? true : false)
            setEJefe(jefe === '' ? true : false)
        }else{
            setEDepartamento (false)
            setEJefe (false)
            const data_nuevo = {
                departamento: departamento,
                descripcion: descripcion,
                id_jefe: id_jefe,
                jefe: jefe,
                equipo: equipo
            }
            dispatch (departamentosdata(departamentosConstants(id_departamento, 0, 0, 0, 0, 16, data_nuevo, false).update_departamento))
        }
    }
    
    useEffect(() => {
        return (() => {
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 0, {}, true).update_departamento))
        })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto', paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='shadow' 
                style={{width: '60%', height: 'auto', background: 'white', padding: 50 / proporcional}}>
                <div className='' style={{width: '100%', height: 'auto'}}>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <input
                            disabled={!editar_informacion}
                            type='default' 
                            id='departamento'
                            className='form-control rounded'
                            value={departamento}
                            onChange={(event) => setDepartamento (event.target.value)}
                            style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: edepartamento ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombre del departamento'/>
                    </div>
                    <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <textarea
                            disabled={!editar_informacion} 
                            id='descripcion'
                            type='default'
                            rows={3}
                            className='form-control rounded'
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Descripción del departamento'/>
                    </div>
                    <h2 style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`,
                        marginBottom: 16 / proporcional, fontWeight: 500, color: '#28A745'}}>Jefe del departamento</h2>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                id='search_jefe'
                                value={search_jefe}
                                className='form-control rounded'
                                onFocus={() => setSeleccionTrabajador('jefe')}
                                onChange={(event) => buscar_trabajador (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: ejefe ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre del jefe'/>
                        </div>
                        {
                            lista_jefes && lista_jefes.length > 0 || jefe !== ''? (
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <select
                                    disabled={!editar_informacion}
                                        type='default' 
                                        id='jefe'
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_jefe (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: ejefe ? '1px solid red' : '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{jefe === '' ? 'Seleccionar jefe' : jefe}</option>
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
                    <h2 style={{fontSize: 18 / proporcional, lineHeight: `${30 / proporcional}px`,
                        marginBottom: 16 / proporcional, fontWeight: 500, color: '#28A745'}}>Personal del departamento</h2>
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                id='search_equipo'
                                value={search_equipo}
                                className='form-control rounded'
                                onFocus={() => setSeleccionTrabajador('equipo')}
                                onChange={(event) => buscar_trabajador (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Miembros del equipo'/>
                        </div>
                        {
                            lista_equipo && lista_equipo.length > 0 || miembro !== '' ? (
                                <div style={{width: '48%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <select
                                        disabled={!editar_informacion}
                                        type='default' 
                                        id='miembro'
                                        className='form-select rounded'
                                        onChange={(event) => seleccionar_miembro (event.target.value)}
                                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}>
                                        <option value='0'>{miembro === '' ? 'Seleccionar miembro' : miembro}</option>
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
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                            marginBottom: 16 / proporcional}}>
                        <textarea
                            disabled={true}
                            type='default' 
                            id='equipo'
                            value={equipo}
                            className='form-control rounded'
                            onChange={(event) => setEquipo (event.target.value)}
                            style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Miembros del equipo'/>
                    </div>
                    {
                        editar_informacion ? (
                            <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                                <div className='d-flex justify-content-between' style={{width: '63%', height: 'auto'}}>
                                    <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                        onClick={() => setEditarInformacion(false)}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                            Cancelar
                                        </p>
                                    </div>
                                    <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                        onClick={() => actualizar_data_departamento()}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sansNoticia-serif', textAlign: 'center', fontWeight: 600}}>
                                            Actualizar datos
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='d-flex justify-content-end' style={{width: '100%', height: 'auto'}}>
                                <div className='d-flex justify-content-between' style={{width: '63%', height: 'auto'}}>
                                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                                        onClick={() => volver_a_lista()}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                            Volver
                                        </p>
                                    </div>
                                    <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                        onClick={() => setEditarInformacion(true)}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                            Editar datos
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
