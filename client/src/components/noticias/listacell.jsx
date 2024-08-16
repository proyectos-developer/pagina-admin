import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {noticiasdata} from '../../redux/slice/noticiasdata'
import { noticiasConstants } from '../../uri/noticias-constants.js'

import CardNoticiaCell from './card/noticiacell.jsx'

export default function ListaNoticasCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_noticias, setListaNoticias] = useState ([])
    const [total_noticias, setTotalNoticias] = useState(0)

    const {get_noticias} = useSelector(({noticias_data}) => noticias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(noticiasdata(noticiasConstants(0, 0, 0, 16, {}, false).get_noticias))
    }, [])

    useEffect(() => {
        console.log (get_noticias)
        if (get_noticias && get_noticias.success === true && get_noticias.noticias){
            if (get_noticias.total_noticias){setTotalNoticias(get_noticias.total_noticias)}
            setListaNoticias (get_noticias.noticias)
        }
    }, [get_noticias])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_noticias && lista_noticias.length > 0 ? (
                    lista_noticias.map ((noticia, numnot) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardNoticiaCell noticia={noticia} key={numnot} index={numnot} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
