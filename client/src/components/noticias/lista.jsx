import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {noticiasdata} from '../../redux/slice/noticiasdata'
import { noticiasConstants } from '../../uri/noticias-constants.js'

import CardNoticia from './card/noticia.jsx'

export default function ListaNoticas ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_noticias, setListaNoticias] = useState ([])
    const [noticias, setNoticias] = useState ([])
    const [total_noticias, setTotalNoticias] = useState(0)

    const {get_noticias} = useSelector(({noticias_data}) => noticias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(noticiasdata(noticiasConstants(0, 0, 0, 16, {}, false).get_noticias))
    }, [])

    useEffect(() => {
        console.log (get_noticias)
        if (get_noticias && get_noticias.success === true && get_noticias.noticias){
            let data = get_noticias.noticias.length
            let lista = []
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_noticias.total_noticias){setTotalNoticias(get_noticias.total_noticias)}
            setNoticias (get_noticias.noticias)
            setListaNoticias (lista)
        }
    }, [get_noticias])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_noticias && lista_noticias.length > 0 ? (
                    lista_noticias.map ((noticia, numnot) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    noticias [(4 * numnot)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNoticia noticia={noticias[(4 * numnot)]} key={(4 * numnot)} index={(4 * numnot)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    noticias [((4 * numnot) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNoticia noticia={noticias[((4 * numnot) + 1)]} key={((4 * numnot) + 1)} index={((4 * numnot) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    noticias [((4 * numnot) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNoticia noticia={noticias[((4 * numnot) + 2)]} key={((4 * numnot) + 2)} index={((4 * numnot) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    noticias [((4 * numnot) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardNoticia noticia={noticias[((4 * numnot) + 3)]} key={((4 * numnot) + 3)} index={((4 * numnot) + 3)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
