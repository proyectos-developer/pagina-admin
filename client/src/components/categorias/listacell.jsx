import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {categoriasdata} from '../../redux/slice/categoriasdata'
import { categoriasConstants } from '../../uri/categorias-constants.js'

import CardCategoriaCell from './card/categoriacell.jsx'

export default function ListaCategoriasCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_categorias, setListaCategorias] = useState ([])
    const [total_categorias, setTotalCategorias] = useState(0)

    const {get_categorias} = useSelector(({categorias_data}) => categorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(categoriasdata(categoriasConstants(0, {}, false).get_categorias))
    }, [])

    useEffect(() => {
        if (get_categorias && get_categorias.success === true && get_categorias.categorias){
            if (get_categorias.total_categorias){setTotalCategorias(get_categorias.total_categorias)}
            setListaCategorias (get_categorias.categorias)
        }
    }, [get_categorias])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_categorias && lista_categorias.length > 0 ? (
                    lista_categorias.map ((categoria, numcat) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardCategoriaCell categoria={categoria} key={numcat} index={numcat} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
