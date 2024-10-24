import React, { useEffect, useState } from 'react'

import NuevoProveedorCell from './menu/nuevoproveedorcell.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { proveedoresdata } from '../../../redux/slice/proveedoresdata.js'
import { proveedoresConstants } from '../../../uri/proveedores-constants.js'

export default function ProveedorPanelCell ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [show_proveedor, setShowProveedor] = useState(false)
    const [proveedor, setProveedor] = useState({})

    const {new_proveedor} = useSelector(({proveedores_data}) => proveedores_data)
    
    useEffect(() => { 
        if (new_proveedor && new_proveedor.success === true && new_proveedor.proveedor){
            window.scrollTo(0, 0)
            setShowProveedor(true)
            setProveedor(new_proveedor.proveedor)
            dispatch (proveedoresdata(proveedoresConstants(0, 0, 0, 0, 0, 0, {}, true).new_proveedor))
        }
    }, [new_proveedor])

    const cerrar_nuevo_lateral = () => {
        setShowProveedor(false)
        setProveedor({})
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_proveedor ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '90%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevoProveedorCell proporcional={proporcional} proveedor={proveedor}/>
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
