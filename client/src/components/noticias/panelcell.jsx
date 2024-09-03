import React, { useEffect, useState } from 'react'

import NuevaNoticiaCell from './menu/nuevanoticiacell.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_noticia } from '../../redux/actions/data.js'

export default function NoticiasPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_noticia, setShowNoticia] = useState(true)
    const [noticia, setNoticia] = useState({})

    const {new_noticia} = useSelector(({noticias_data}) => noticias_data)
    
    useEffect(() => { 
        if (new_noticia && new_noticia.success === true && new_noticia.noticia){
            window.scrollTo(0, 0)
            setShowNoticia(true)
            setNoticia(new_noticia.noticia)
        }
    }, [new_noticia])

    const cerrar_nuevo_lateral = () => {
        setShowNoticia(false)
        setNoticia({})
    }

    const corregir_informaion = () => {
        setNoticia({})
        window.scrollTo(0,0)
        setShowNoticia(false)
        dispatch(set_data_noticia(noticia))
        navigate (`/panel/noticias/noticia/${noticia.titulo.replace(' ', '-')}/${noticia.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_noticia ? (
                  <div className='position-fixed end-0 shadow overflow-auto' 
                      style={{width: '80%', height: '90%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevaNoticiaCell proporcional={proporcional} noticia={noticia}/>
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
