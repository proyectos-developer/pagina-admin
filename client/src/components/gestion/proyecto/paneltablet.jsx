import React, { useEffect, useState } from 'react'

import NuevaGestionTablet from './menu/nuevagestiontablet.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_gestion_proyectos } from '../../../redux/actions/data.js'

export default function GestionProyectosPanelTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [show_gestion, setShowGestion] = useState(false)
    const [gestion_proyecto, setGestionProyecto] = useState({})

    const {new_informe_proyecto} = useSelector(({gestionproyectos_data}) => gestionproyectos_data)
    
    useEffect(() => { 
        if (new_informe_proyecto && new_informe_proyecto.success === true && new_informe_proyecto.gestion_proyecto){
            window.scrollTo(0, 0)
            setShowGestion(true)
            setGestionProyecto(new_informe_proyecto.gestion_proyecto)
        }
    }, [new_informe_proyecto])

    const agregar_tareas_proyecto = () => {
        setGestionProyecto({})
        window.scrollTo(0,0)
        setShowGestion(false)
        dispatch(set_data_gestion_proyectos(gestion_proyecto))
        navigate (`/panel/gestion-proyectos/datos/proyecto/${gestion_proyecto.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_gestion ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '60%', height: '92%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevaGestionTablet proporcional={proporcional} gestion_proyecto={gestion_proyecto}/>
                        <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                        marginBottom: 16 / proporcional
                                }}
                                onMouseOver={() => setBotonCerrar(true)} onMouseLeave={() => setBotonCerrar(false)}
                                onClick={() => agregar_tareas_proyecto()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Agregar tareas al proyecto
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