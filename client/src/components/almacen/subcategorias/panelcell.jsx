import React, { useEffect, useState } from 'react'

import NuevaSubCategoriaCell from './menu/nuevasubcategoriacell.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_subcategoria } from '../../../redux/actions/data.js'

export default function SubCategoriasPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_sub_categoria, setShowSubCategoria] = useState(false)
    const [sub_categoria, setSubCategoria] = useState({})

    const {new_subcategoria} = useSelector(({subcategorias_data}) => subcategorias_data)
    
    useEffect(() => { 
        if (new_subcategoria && new_subcategoria.success === true && new_subcategoria.sub_categoria){
            window.scrollTo(0, 0)
            setShowSubCategoria(true)
            setSubCategoria(new_subcategoria.sub_categoria)
        }
    }, [new_subcategoria])

    const cerrar_nuevo_lateral = () => {
        window.scrollTo(0,0)
        setShowSubCategoria(false)
        setSubCategoria({})
    }

    const corregir_informaion = () => {
        setSubCategoria({})
        window.scrollTo(0,0)
        setShowSubCategoria(false)
        dispatch(set_data_subcategoria(sub_categoria))
        navigate (`/panel/almacen/subcategorias/subcategoria/${sub_categoria.sub_categoria.replace(' ', '-')}/${sub_categoria.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_sub_categoria ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '80%', height: '90%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevaSubCategoriaCell proporcional={proporcional} sub_categoria={sub_categoria}/>
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
