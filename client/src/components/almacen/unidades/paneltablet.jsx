import React, { useEffect, useState } from 'react'

import NuevaUnidadTablet from './menu/nuevaunidadtablet.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { unidadesdata } from '../../../redux/slice/unidadesdata.js'
import { unidadesConstants } from '../../../uri/unidades-constants.js'

export default function UnidadesPanelTablet ({proporcional}) {

    const dispatch = useDispatch()
    
    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [show_unidad, setShowUnidad] = useState(false)
    const [unidad, setUnidad] = useState({})

    const {new_unidad} = useSelector(({unidades_data}) => unidades_data)
    
    useEffect(() => { 
        if (new_unidad && new_unidad.success === true && new_unidad.unidad){
            window.scrollTo(0, 0)
            setShowUnidad(true)
            setUnidad(new_unidad.unidad)
            dispatch (unidadesdata(unidadesConstants(0, 0, 0, 0, 0, 0, {}, true).new_unidad))
        }
    }, [new_unidad])

    const cerrar_nuevo_lateral = () => {
        setShowUnidad(false)
        setUnidad({})
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_unidad ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaUnidadTablet proporcional={proporcional} unidad={unidad}/>
                        <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrar(true)} onMouseLeave={() => setBotonCerrar(false)}
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
