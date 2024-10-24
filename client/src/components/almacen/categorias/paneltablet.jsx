import React, { useEffect, useState } from 'react'

import NuevaCategoriaTablet from './menu/nuevacategoriatablet.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { categoriasdata } from '../../../redux/slice/categoriasdata.js'
import { categoriasConstants } from '../../../uri/categorias-constants.js'

export default function CategoriasPanelTablet ({proporcional}) {

    const dispatch = useDispatch()
    
    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [show_categoria, setShowCategoria] = useState(false)
    const [categoria, setCategoria] = useState({})

    const {new_categoria} = useSelector(({marcas_data}) => marcas_data)
    
    useEffect(() => { 
        if (new_categoria && new_categoria.success === true && new_categoria.categoria){
            window.scrollTo(0, 0)
            setShowCategoria(true)
            setCategoria(new_categoria.categoria)
            dispatch (categoriasdata(categoriasConstants(0, 0, 0, 0, 0, 0, {}, true).new_categoria))
        }
    }, [new_categoria])

    const cerrar_nuevo_lateral = () => {
        setShowCategoria(false)
        setCategoria({})
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_categoria ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '60%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaCategoriaTablet proporcional={proporcional} categoria={categoria}/>
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
