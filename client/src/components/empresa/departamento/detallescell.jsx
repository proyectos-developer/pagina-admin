import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_departamento } from '../../../redux/actions/data'
import {departamentosdata} from '../../../redux/slice/departamentosdata'
import {departamentosConstants} from '../../../uri/departamentos-constants'

export default function DetallesDepartamentoCell ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_departamento, setIdDepartamento] = useState('')
    const [departamento, setDepartamento] = useState ('')
    const [descripcion, setDescripcion] = useState('')
    const [jefe, setJefe] = useState('')
    const [id_jefe, setIdJefe] = useState('')
    const [equipo, setEquipo] = useState('')

    const [edepartamento, setEDepartamento] = useState (false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_departamento, get_departamento} = useSelector(({departamentos_data}) => departamentos_data)
    const {data_departamento, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_departamento.departamento === undefined){
            dispatch(departamentosdata(departamentosConstants(location.pathname.split ('/')[6], 0, 0, 0, 0, 16, {}, false).get_departamento))
        }else{
            setIdDepartamento(data_departamento.id)
            setDepartamento(data_departamento.departamento)
            setDescripcion(data_departamento.descripcion)
        }
    }, [data_departamento])

    useEffect(() => {
        if (get_departamento && get_departamento.success === true && get_departamento.departamento){
            setIdDepartamento(get_departamento.departamento.id)
            setDepartamento(get_departamento.departamento.departamento)
            setDescripcion(get_departamento.departamento.descripcion)
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, true).get_departamento))
        }
    }, [get_departamento])

    useEffect(() => {
        if (update_departamento && update_departamento.success === true && update_departamento.departamento){
            dispatch(departamentosdata(departamentosConstants(0, 0, 0, 0, 0, 16, {}, true).update_departamento))
            setEditarInformacion(false)
        }
    }, [update_departamento])

    const volver_a_lista = () => {
        dispatch(set_data_departamento({}))
        navigate ('/panel/empresa/departamentos')
    }
    
    const actualizar_data_departamento = () => {
        if (departamento === ''){
            setEDepartamento(departamento === '' ? true : false)
        }else{
            setEDepartamento (false)
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
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', marginBottom: 16 / proporcional}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <h2 style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4A4A4A'}}>Departamento: <span style={{fontSize: 28 / proporcional, color: '#007bff'}}>{nombre_area}</span>
                    </h2>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{width: '100%', height: '100%'}}>
                <div style={{width: '100%', height: '100%'}}>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Departamento
                            </span>
                            <input
                                disabled={!editar_informacion}
                                type='default' 
                                id='departamento'
                                className='form-control rounded'
                                value={departamento}
                                onChange={(event) => setNombreArea (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edepartamento ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre del departamento'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Descripción del departamento
                            </span>
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
                        {
                            editar_informacion ? (
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                                marginBottom: 16 / proporcional
                                        }}
                                        onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                        onClick={() => actualizar_data_departamento()}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sansNoticia-serif', textAlign: 'center', fontWeight: 600}}>
                                            Actualizar datos
                                        </p>
                                    </div>
                                    <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                                        onClick={() => setEditarInformacion(false)}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                            Cancelar
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className='' style={{width: '100%', height: 'auto'}}>
                                    <div className={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                                marginBottom: 16 / proporcional
                                        }}
                                        onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                                        onClick={() => setEditarInformacion(true)}>
                                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                            Editar datos
                                        </p>
                                    </div>
                                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
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
            </div>
        </div>
    )
}
