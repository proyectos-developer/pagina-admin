import React, { useEffect, useState } from 'react'

import NuevaUnidadCell from './menu/nuevaunidadcell.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_unidad } from '../../../redux/actions/data.js'

export default function UnidadesPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_unidad, setShowUnidad] = useState(false)
    const [unidad, setUnidad] = useState({})

    const {new_unidad} = useSelector(({unidades_data}) => unidades_data)
    
    useEffect(() => { 
        if (new_unidad && new_unidad.success === true && new_unidad.unidad){
            window.scrollTo(0, 0)
            setShowUnidad(true)
            setUnidad(new_unidad.unidad)
        }
    }, [new_unidad])

    const cerrar_nuevo_lateral = () => {
        setShowUnidad(false)
        setUnidad({})
    }

    const corregir_informaion = () => {
        setUnidad({})
        window.scrollTo(0,0)
        setShowUnidad(false)
        dispatch(set_data_unidad(unidad))
        navigate (`/panel/almacen/unidades/unidad/${unidad.unidad.replace(' ', '-')}/${unidad.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_unidad ? (
                  <div className='position-fixed end-0 shadow overflow-auto' 
                      style={{width: '80%', height: '90%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevaUnidadCell proporcional={proporcional} unidad={unidad}/>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
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
