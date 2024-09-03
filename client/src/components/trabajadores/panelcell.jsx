import React, { useEffect, useState } from 'react'

import NuevoTrabajadorCell from './menu/nuevotrabajadorcell.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_trabajadores } from '../../redux/actions/data.js'

export default function TrabajadoresPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_trabajador, setShowTrabajador] = useState(false)
    const [trabajador, setTrabajador] = useState({})

    const {new_trabajador} = useSelector(({trabajadores_data}) => trabajadores_data)
    
    useEffect(() => { 
        if (new_trabajador && new_trabajador.success === true && new_trabajador.trabajador){
            window.scrollTo(0, 0)
            setShowTrabajador(true)
            setTrabajador(new_trabajador.trabajador)
        }
    }, [new_trabajador])

    const cerrar_nuevo_lateral = () => {
        setShowTrabajador(false)
        setTrabajador({})
    }

    const corregir_informaion = () => {
        setTrabajador({})
        window.scrollTo(0,0)
        setShowTrabajador(false)
        dispatch(set_data_trabajadores(trabajador))
        navigate (`/panel/trabajadores/trabajador/${trabajador.nombres.replace(' ', '-')}/${trabajador.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_trabajador ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '80%', height: '90%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevoTrabajadorCell proporcional={proporcional} trabajador={trabajador}/>
                        <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer',
                                    marginBottom: 16 / proporcional
                                }}
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
