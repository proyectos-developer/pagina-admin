import React, { useEffect, useState } from 'react'

import NuevaMarcaTablet from './menu/nuevamarcatablet.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { marcasdata } from '../../../redux/slice/marcasdata.js'
import { marcasConstants } from '../../../uri/marcas-constants.js'

export default function MarcaPanelTablet ({proporcional}) {

    const dispatch = useDispatch()
    
    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [show_marca, setShowMarca] = useState(false)
    const [marca, setMarca] = useState({})

    const {new_marca} = useSelector(({marcas_data}) => marcas_data)
    
    useEffect(() => { 
        if (new_marca && new_marca.success === true && new_marca.marca){
            window.scrollTo(0, 0)
            setShowMarca(true)
            setMarca(new_marca.marca)
            dispatch (marcasdata(marcasConstants(0, 0, 0, 0, 0, 0, {}, true).new_marca))
        }
    }, [new_marca])

    const cerrar_nuevo_lateral = () => {
        setShowMarca(false)
        setMarca({})
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_marca ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaMarcaTablet proporcional={proporcional} marca={marca}/>
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
