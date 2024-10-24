import React, { useEffect, useState } from 'react'

import NuevaSubCategoriaCell from './menu/nuevasubcategoriacell.jsx'

import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { subcategoriasdata } from '../../../redux/slice/subcategoriasdata.js'
import { subcategoriasConstants } from '../../../uri/subcategorias-constants.js'

export default function SubCategoriasPanelCell ({proporcional}) {

    const dispatch = useDispatch()
    
    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [show_subcategoria, setShowSubCategoria] = useState(false)
    const [sub_categoria, setSubCategoria] = useState({})

    const {new_subcategoria} = useSelector(({subcategorias_data}) => subcategorias_data)
    
    useEffect(() => { 
        if (new_subcategoria && new_subcategoria.success === true && new_subcategoria.sub_categoria){
            window.scrollTo(0, 0)
            setShowSubCategoria(true)
            setSubCategoria(new_subcategoria.sub_categoria)
            dispatch (subcategoriasdata(subcategoriasConstants(0, 0, 0, 0, 0, 0, 0, {}, true).new_subcategoria))
        }
    }, [new_subcategoria])

    const cerrar_nuevo_lateral = () => {
        setShowSubCategoria(false)
        setSubCategoria({})
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_subcategoria ? (
                    <div className='position-fixed end-0 top-50 shadow overflow-auto' 
                        style={{width: '90%', height: 'auto', background: 'white', zIndex: 9999}}>
                        <NuevaSubCategoriaCell proporcional={proporcional} sub_categoria={sub_categoria}/>
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
