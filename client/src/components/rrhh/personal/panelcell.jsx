import React, { useEffect, useState } from 'react'

import NuevoPersonalCell from './menu/nuevopersonalcell.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_editable, set_data_personal } from '../../../redux/actions/data.js'

export default function TrabajadoresPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_personal, setShowPersonal] = useState(false)
    const [personal, setPersonal] = useState({})

    const {new_personal} = useSelector(({personal_data}) => personal_data)
    
    useEffect(() => { 
        if (new_personal && new_personal.success === true && new_personal.trabajador){
            window.scrollTo(0, 0)
            setShowPersonal(true)
            setPersonal(new_personal.trabajador)
        }
    }, [new_personal])

    const cerrar_nuevo_lateral = () => {
        setShowPersonal(false)
        setPersonal({})
    }

    const corregir_informaion = () => {
        setPersonal({})
        window.scrollTo(0,0)
        setShowPersonal(false)
        dispatch(set_data_personal(personal))
        dispatch (set_data_editable(true))
        navigate (`/panel/rrhh/personal/trabajador/${personal.trabajador.replace(' ', '-')}/${personal.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_personal ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '60%', height: '92%', background: 'white', zIndex: 9999, top: 158 / proporcional}}>
                        <NuevoPersonalCell proporcional={proporcional} trabajador={personal}/>
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
