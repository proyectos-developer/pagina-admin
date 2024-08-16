import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata'
import { subcategoriasConstants } from '../../uri/subcategorias-constants.js'

import CardSubCategoriaTablet from './card/subcategoriatablet.jsx'

export default function ListaSubCategoriasTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_subcategorias, setSubListaCategorias] = useState ([])
    const [subcategorias, setSubCategorias] = useState ([])
    const [total_subcategorias, setTotalSubCategorias] = useState(0)

    const {get_subcategorias} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(subcategoriasdata(subcategoriasConstants(0, {}, false).get_subcategorias))
    }, [])

    useEffect(() => {
        if (get_subcategorias && get_subcategorias.success === true && get_subcategorias.subcategorias){
            let data = get_subcategorias.subcategorias.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_subcategorias.total_subcategorias){setTotalSubCategorias(get_subcategorias.total_subcategorias)}
            setSubCategorias (get_subcategorias.subcategorias)
            setSubListaCategorias (lista)
        }
    }, [get_subcategorias])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_subcategorias && lista_subcategorias.length > 0 ? (
                    lista_subcategorias.map ((subcategoria, numsubcat) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    subcategorias [(2 * numsubcat)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardSubCategoriaTablet subcategoria={subcategorias[(2 * numsubcat)]} key={(2 * numsubcat)} index={(2 * numsubcat)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    subcategorias [((2 * numsubcat) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardSubCategoriaTablet subcategoria={subcategorias[((2 * numsubcat) + 1)]} key={((2 * numsubcat) + 1)} index={((2 * numsubcat) + 1)} proporcional={proporcional}/>
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
