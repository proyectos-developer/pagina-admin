import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {favoritosdata} from '../../redux/slice/favoritosdata'
import { favoritosConstants } from '../../uri/favoritos-constants.js'

import CardFavoritoCell from './card/favoritocell.jsx'

export default function ListaFavoritosCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_favoritos, setListaFavoritos] = useState ([])
    const [total_favoritos, setTotalFavoritos] = useState(0)

    const {get_favoritos} = useSelector(({favoritos_data}) => favoritos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(favoritosdata(favoritosConstants(0, 0, 16, {}, false).get_favoritos))
    }, [])

    useEffect(() => {
        if (get_favoritos && get_favoritos.success === true && get_favoritos.favoritos){
          setListaFavoritos (get_favoritos.favoritos)
        }
    }, [get_favoritos])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_favoritos && lista_favoritos.length > 0 ? (
                    lista_favoritos.map ((favorito, numfav) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                  <div style={{width: '90%', height: 'auto'}}>
                                      <CardFavoritoCell favorito={favorito} key={numfav} index={numfav} proporcional={proporcional}/>
                                  </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
