import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {areasempresadata} from '../../redux/slice/areasempresadata'
import {areasempresaConstants} from '../../uri/areasempresa-constants'

export default function NuevoAreaEmpresaTablet ({proporcional}) {

    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [nombre_area, setNombreArea] = useState ('')
    const [descripcion, setDescripcion] = useState('')

    const [enombre_area, setENombreArea] = useState (false)
    const [edescripcion, setEDescripcion] = useState(false)

    const [boton_guardar, setBotonGuardar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {new_area_empresa} = useSelector(({areasempresa_data}) => areasempresa_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (new_area_empresa && new_area_empresa.success === true && new_area_empresa.area_empresa){
            dispatch(areasempresadata(areasempresaConstants(0, {}, true).new_area_empresa))
            resetear_data()
        }
    }, [new_area_empresa])


    const resetear_data = () => {
        setNombreArea('')
        setDescripcion('')
    }

    const volver_a_lista = () => {
        resetear_data()
        window.scrollTo(0, 0)
        navigate ('/panel/areas-empresa')
    }

    const guardar_categoria = () => {
        if (descripcion === '' || nombre_area === ''){
          setEDescripcion(descripcion === '' ? true : false)
          setENombreArea(nombre_area === '' ? true : false)
        }else{
            setEDescripcion(false)
            setENombreArea(false)
            const data_nuevo = {
              nombre_area: nombre_area,
              descripcion: descripcion
            }
            dispatch (areasempresadata(areasempresaConstants(0, data_nuevo, false).new_area_empresa))
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
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                            <div className={boton_guardar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonGuardar(true)} onMouseLeave={() => setBotonGuardar(false)}
                                onClick={() => guardar_categoria()}>
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
        </div>
    )
}
