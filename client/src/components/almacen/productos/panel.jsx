import React, { useEffect, useState } from 'react'

import NuevoProducto from './menu/nuevoproducto.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productosdata } from '../../../redux/slice/productosdata.js'
import { productosConstants } from '../../../uri/productos-constants.js'

export default function ProductosPanel ({proporcional}) {

    const dispatch = useDispatch()
    
    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [show_producto, setShowProducto] = useState(false)
    const [producto, setProducto] = useState({})

    const {new_producto} = useSelector(({productos_data}) => productos_data)
    
    useEffect(() => { 
        if (new_producto && new_producto.success === true && new_producto.producto){
            window.scrollTo(0, 0)
            setShowProducto(true)
            setProducto(new_producto.producto)
            dispatch (productosdata(productosConstants(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {}, true).new_producto))
        }
    }, [new_producto])

    const cerrar_nuevo_lateral = () => {
        setShowProducto(false)
        setProducto({})
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_producto ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '30%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevoProducto proporcional={proporcional} producto={producto}/>
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
