import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {categoriasdata} from '../../redux/slice/categoriasdata'
import { categoriasConstants } from '../../uri/categorias-constants.js'

import CardCategoriaTablet from './card/categoriatablet.jsx'

export default function ListaCategoriasTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_categorias, setListaCategorias] = useState ([])
    const [categorias, setCategorias] = useState ([])
    const [total_categorias, setTotalCategorias] = useState(0)

    const {get_categorias} = useSelector(({categorias_data}) => categorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(categoriasdata(categoriasConstants(0, {}, false).get_categorias))
    }, [])

    useEffect(() => {
        if (get_categorias && get_categorias.success === true && get_categorias.categorias){
            let data = get_categorias.categorias.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_categorias.total_categorias){setTotalCategorias(get_categorias.total_categorias)}
            setCategorias (get_categorias.categorias)
            setListaCategorias (lista)
        }
    }, [get_categorias])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_categorias && lista_categorias.length > 0 ? (
                    lista_categorias.map ((categoria, numcat) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    categorias [(2 * numcat)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardCategoriaTablet categoria={categorias[(2 * numcat)]} key={(2 * numcat)} index={(2 * numcat)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    categorias [((2 * numcat) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardCategoriaTablet categoria={categorias[((2 * numcat) + 1)]} key={((2 * numcat) + 1)} index={((2 * numcat) + 1)} proporcional={proporcional}/>
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
