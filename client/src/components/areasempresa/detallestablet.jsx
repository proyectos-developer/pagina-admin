import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {areasempresadata} from '../../redux/slice/areasempresadata'
import { set_data_areas_empresa } from '../../redux/actions/data'
import { areasempresaConstants } from '../../uri/areasempresa-constants'

export default function DetallesAreaEmpresaTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const location = useLocation()

    const [editar_informacion, setEditarInformacion] = useState(false)

    const [id_area_empresa, setIdAreaEmpresa] = useState('')
    const [nombre_area, setNombreArea] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [enombre_area, setENombreArea] = useState (false)
    const [edescripcion, setEDescripcion] = useState(false)

    const [boton_actualizar, setBotonActualizar] = useState(false)
    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {update_area_empresa, get_area_empresa} = useSelector(({areasempresa_data}) => areasempresa_data)
    const {data_areas_empresa, open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_areas_empresa.nombre_area === undefined){
            dispatch(areasempresadata(areasempresaConstants(location.pathname.split ('/')[3], {}, false).get_area_empresa))
        }else{
            setIdAreaEmpresa(data_areas_empresa.id)
            setNombreArea(data_areas_empresa.nombre_area)
            setDescripcion(data_areas_empresa.descripcion)
        }
    }, [])

    useEffect(() => {
        if (get_area_empresa && get_area_empresa.success === true && get_area_empresa.area_empresa){
            setIdAreaEmpresa(get_area_empresa.area_empresa.id)
            setNombreArea(get_area_empresa.area_empresa.nombre_area)
            setDescripcion(get_area_empresa.area_empresa.descripcion)
            dispatch(areasempresadata(areasempresaConstants(0, {}, true).get_area_empresa))
        }
    }, [get_area_empresa])

    useEffect(() => {
        if (update_area_empresa && update_area_empresa.success === true && update_area_empresa.area_empresa){
            dispatch(areasempresadata(areasempresaConstants(0, {}, true).update_area_empresa))
            setEditarInformacion(false)
        }
    }, [update_area_empresa])

    const volver_a_lista = () => {
        dispatch(set_data_areas_empresa({}))
        navigate ('/panel/areas_empresa')
    }
    
    const actualizar_data_areas_empresa = () => {
        if (nombre_area === ''){
            setNombreArea(nombre_area === '' ? true : false)
        }else{
            setENombreArea(false)
            const data_nuevo = {
                nombre_area: nombre_area,
                descripcion: descripcion,
            }
            dispatch (areasempresadata(areasempresaConstants(id_area_empresa, data_nuevo, false).update_area_empresa))
        }
    }

    return (
        <div style={{width: '100%', height: '100%', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: '100%'}}>
                <div className='d-flex justify-content-center' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='' style={{width: '100%', height: 'auto'}}>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Nombre área
                            </span>
                            <input
                                type='default' 
                                id='nombre_area'
                                value={nombre_area}
                                className='form-control rounded'
                                onChange={(event) => setNombreArea (event.target.value)}
                                style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: enombre_area ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Nombre área'/>
                        </div>
                        <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                            <span style={{color: '#4a4a4a', marginBottom: 5 / proporcional, fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif'}}>
                                Descripción del área
                            </span>
                            <textarea 
                                id='descripcion'
                                type='default'
                                rows={3}
                                className='form-control rounded'
                                value={descripcion}
                                onChange={(event) => setDescripcion(event.target.value)}
                                style={{width: '100%', height: 150 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: edescripcion ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Descripción del área'/>
                        </div>
                        {
                            editar_informacion ? (
                                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                                    <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                        style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                        onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                                        onClick={() => actualizar_data_areas_empresa()}>
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
                                        >
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
            </div>
        </div>
    )
}
