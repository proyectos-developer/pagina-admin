import React, { useEffect, useState } from 'react'

import NuevoProducto from './menu/nuevoproducto.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_productos } from '../../../redux/actions/data.js'

export default function ProductosPanel ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_producto, setShowProducto] = useState(false)
    const [producto, setProducto] = useState({})

    const {new_producto} = useSelector(({productos_data}) => productos_data)
    
    useEffect(() => { 
        if (new_producto && new_producto.success === true && new_producto.producto){
            window.scrollTo(0, 0)
            setShowProducto(true)
            setProducto(new_producto.producto)
        }
    }, [new_producto])

    const cerrar_nuevo_lateral = () => {
        window.scrollTo(0,0)
        setShowProducto(false)
        setProducto({})
    }

    const corregir_informaion = () => {
        setProducto({})
        window.scrollTo(0,0)
        setShowProducto(false)
        dispatch(set_data_productos(producto))
        navigate (`/panel/almacen/productos/producto/${producto.producto.replace(' ', '-')}/${producto.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_producto ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '30%', height: '90%', background: 'white', zIndex: 9999, top: 100 / proporcional}}>
                        <NuevoProducto proporcional={proporcional} producto={producto}/>
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
