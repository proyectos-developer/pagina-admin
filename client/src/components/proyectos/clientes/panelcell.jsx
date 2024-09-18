import React, { useEffect, useState } from 'react'

import NuevoNegocioCell from './menu/nuevonegociocell.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_negocio } from '../../../redux/actions/data.js'

export default function NegociosPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_negocio, setShowNegocio] = useState(false)
    const [negocio, setNegocio] = useState({})

    const {new_negocio} = useSelector(({negocios_data}) => negocios_data)
    
    useEffect(() => { 
        if (new_negocio && new_negocio.success === true && new_negocio.negocio){
            window.scrollTo(0, 0)
            setShowNegocio(true)
            setNegocio(new_negocio.negocio)
        }
    }, [new_negocio])

    const cerrar_nuevo_lateral = () => {
        window.scrollTo(0,0)
        setShowNegocio(false)
        setNegocio({})
    }

    const corregir_informaion = () => {
        setNegocio({})
        window.scrollTo(0,0)
        setShowNegocio(false)
        dispatch(set_data_negocio(negocio))
        navigate (`/panel/proyectos/clientes/cliente/${negocio.nombre_negocio.replace(' ', '-')}/${negocio.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_negocio ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '80%', height: '90%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevoNegocioCell proporcional={proporcional} cliente={negocio}/>
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
