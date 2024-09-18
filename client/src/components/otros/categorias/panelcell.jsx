import React, { useEffect, useState } from 'react'

import NuevaCategoriaNoticiaCell from './menu/nuevacategorianoticiacell.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_categoria_noticia } from '../../../redux/actions/data.js'

export default function CategoriasNoticiasPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_categoria_noticia, setShowCategoriaNoticia] = useState(false)
    const [categoria_noticia, setCategoriaNoticia] = useState({})

    const {new_categoria_noticia} = useSelector(({categorias_noticias_data}) => categorias_noticias_data)
    
    useEffect(() => { 
        if (new_categoria_noticia && new_categoria_noticia.success === true && new_categoria_noticia.categoria_noticia){
            window.scrollTo(0, 0)
            setShowCategoriaNoticia(true)
            setCategoriaNoticia(new_categoria_noticia.categoria_noticia)
        }
    }, [new_categoria_noticia])

    const cerrar_nuevo_lateral = () => {
        setShowCategoriaNoticia(false)
        setCategoriaNoticia({})
    }

    const corregir_informaion = () => {
        setCategoriaNoticia({})
        window.scrollTo(0,0)
        setShowCategoriaNoticia(false)
        dispatch(set_data_categoria_noticia(categoria_noticia))
        navigate (`/panel/otros/categorias-noticias/categoria-noticia/${categoria_noticia.titulo.replace(' ', '-')}/${categoria_noticia.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_categoria_noticia ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '80%', height: '90%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevaCategoriaNoticiaCell proporcional={proporcional} categoria_noticia={categoria_noticia}/>
                        <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional, marginBottom: 16 / proporcional}}>
                            <div className={boton_cerrar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '100%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
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
