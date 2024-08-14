import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {favoritosdata} from '../../redux/slice/favoritosdata'
import { favoritosConstants } from '../../uri/favoritos-constants.js'

import CardFavoritoTablet from './card/favoritotablet.jsx'

export default function ListaFavoritosTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_favoritos, setListaFavoritos] = useState ([])
    const [favoritos, setFavoritos] = useState ([])
    const [total_favoritos, setTotalFavoritos] = useState(0)

    const {get_favoritos} = useSelector(({favoritos_data}) => favoritos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(favoritosdata(favoritosConstants(0, 0, 16, {}, false).get_favoritos))
    }, [])

    useEffect(() => {
        if (get_favoritos && get_favoritos.success === true && get_favoritos.favoritos){
            let data = get_favoritos.favoritos.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_favoritos.total_favoritos){setTotalFavoritos(get_favoritos.total_favoritos)}
            setFavoritos (get_favoritos.favoritos)
            setListaFavoritos (lista)
        }
    }, [get_favoritos])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_favoritos && lista_favoritos.length > 0 ? (
                    lista_favoritos.map ((favorito, numfav) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    favoritos [(2 * numfav)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardFavoritoTablet favorito={favoritos[(2 * numfav)]} key={(2 * numfav)} index={(2 * numfav)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    favoritos [((2 * numfav) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardFavoritoTablet favorito={favoritos[((2 * numfav) + 1)]} key={((2 * numfav) + 1)} index={((2 * numfav) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
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
