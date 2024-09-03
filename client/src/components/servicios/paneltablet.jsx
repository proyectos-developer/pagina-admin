import React, { useEffect, useState } from 'react'

import NuevoServicioTablet from './menu/nuevoserviciotablet.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_servicio } from '../../redux/actions/data.js'

export default function ServiciosPanelTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_servicio, setShowServicio] = useState(false)
    const [servicio, setServicio] = useState({})

    const {new_servicio} = useSelector(({servicios_data}) => servicios_data)
    
    useEffect(() => { 
        if (new_servicio && new_servicio.success === true && new_servicio.servicio){
            window.scrollTo(0, 0)
            setShowServicio(true)
            setServicio(new_servicio.servicio)
        }
    }, [new_servicio])

    const cerrar_nuevo_lateral = () => {
        setShowServicio(false)
        setServicio({})
    }

    const corregir_informaion = () => {
        setServicio({})
        window.scrollTo(0,0)
        setShowServicio(false)
        dispatch(set_data_servicio(servicio))
        navigate (`/panel/servicios/servicio/${servicio.servicio.replace(' ', '-')}/${servicio.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_servicio ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '60%', height: '92%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevoServicioTablet proporcional={proporcional} servicio={servicio}/>
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
