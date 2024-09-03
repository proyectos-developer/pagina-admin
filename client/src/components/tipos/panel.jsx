import React, { useEffect, useState } from 'react'

import NuevoTipoProyecto from './menu/nuevotipoproyecto.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_tipo_proyecto } from '../../redux/actions/data.js'

export default function TiposProyectosPanel ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_tipo_proyecto, setShowTipoProyecto] = useState(false)
    const [tipo_proyecto, setTipoProyecto] = useState({})

    const {new_tipo_proyecto} = useSelector(({proyectos_data}) => proyectos_data)
    
    useEffect(() => { 
        if (new_tipo_proyecto && new_tipo_proyecto.success === true && new_tipo_proyecto.tipo_proyecto){
            window.scrollTo(0, 0)
            setShowTipoProyecto(true)
            setTipoProyecto(new_tipo_proyecto.tipo_proyecto)
        }
    }, [new_tipo_proyecto])

    const cerrar_nuevo_lateral = () => {
        window.scrollTo(0,0)
        setShowTipoProyecto(false)
        setTipoProyecto({})
    }

    const corregir_informaion = () => {
        setTipoProyecto({})
        window.scrollTo(0,0)
        setShowTipoProyecto(false)
        dispatch(set_data_tipo_proyecto(tipo_proyecto))
        navigate (`/panel/tipos-proyectos/tipo-proyecto/${tipo_proyecto.nombre.replace(' ', '-')}/${tipo_proyecto.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_tipo_proyecto ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '30%', height: '90%', background: 'white', zIndex: 9999, top: 100 / proporcional}}>
                        <NuevoTipoProyecto proporcional={proporcional} tipo_proyecto={tipo_proyecto}/>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrar(true)} onMouseLeave={() => setBotonCerrar(false)}
                                onClick={() => corregir_informaion()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Corregir información
                                </p>
                            </div>
                            <div className={boton_corregir ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCorregir(true)} onMouseLeave={() => setBotonCorregir(false)}
                                onClick={() => cerrar_nuevo_lateral()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            <Outlet/>
        </div>
    )
}
