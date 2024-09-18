import React, { useEffect, useState } from 'react'

import NuevoProyectoTablet from './menu/nuevoproyectotablet.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_proyecto } from '../../../redux/actions/data.js'

export default function ProyectosPanelTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_proyecto, setShowProyecto] = useState(false)
    const [proyecto, setProyecto] = useState({})

    const {new_proyecto} = useSelector(({proyectos_data}) => proyectos_data)
    
    useEffect(() => { 
        if (new_proyecto && new_proyecto.success === true && new_proyecto.proyecto){
            window.scrollTo(0, 0)
            setShowProyecto(true)
            setProyecto(new_proyecto.proyecto)
        }
    }, [new_proyecto])

    const cerrar_nuevo_lateral = () => {
        window.scrollTo(0,0)
        setShowProyecto(false)
        setProyecto({})
    }

    const corregir_informaion = () => {
        setProyecto({})
        window.scrollTo(0,0)
        setShowProyecto(false)
        dispatch(set_data_proyecto(proyecto))
        navigate (`/panel/proyectos/proyectos/proyecto/${proyecto.nombre_proyecto.replace(' ', '-')}/${proyecto.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_proyecto ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '60%', height: '92%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevoProyectoTablet proporcional={proporcional} proyecto={proyecto}/>
                        <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional}}
                                onMouseOver={() => setBotonCerrar(true)} onMouseLeave={() => setBotonCerrar(false)}
                                onClick={() => corregir_informaion()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Corregir información
                                </p>
                            </div>
                            <div className={boton_corregir ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
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
