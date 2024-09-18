import React, { useEffect, useState } from 'react'

import NuevaCategoriaCell from './menu/nuevacategoriacell.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_categoria } from '../../../redux/actions/data.js'

export default function CategoriasPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_categoria, setShowCategoria] = useState(false)
    const [categoria, setCategoria] = useState({})

    const {new_categoria} = useSelector(({categorias_data}) => categorias_data)
    
    useEffect(() => { 
        if (new_categoria && new_categoria.success === true && new_categoria.categoria){
            window.scrollTo(0, 0)
            setShowCategoria(true)
            setCategoria(new_categoria.categoria)
        }
    }, [new_categoria])

    const cerrar_nuevo_lateral = () => {
        setShowCategoria(false)
        setCategoria({})
    }

    const corregir_informaion = () => {
        setCategoria({})
        window.scrollTo(0,0)
        setShowCategoria(false)
        dispatch(set_data_categoria(categoria))
        navigate (`/panel/almacen/categorias/categoria/${categoria.categoria.replace(' ', '-')}/${categoria.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_categoria ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '80%', height: '90%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevaCategoriaCell proporcional={proporcional} categoria={categoria}/>
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
