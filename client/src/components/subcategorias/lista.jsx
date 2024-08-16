import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata'
import { subcategoriasConstants } from '../../uri/subcategorias-constants.js'

import CardSubCategoria from './card/subcategoria.jsx'

export default function ListaSubCategorias ({proporcional}) {

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
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_subcategorias.total_subcategorias){setTotalSubCategorias(get_subcategorias.total_subcategorias)}
            setSubCategorias (get_subcategorias.subcategorias)
            setSubListaCategorias (lista)
        }
    }, [get_subcategorias])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_subcategorias && lista_subcategorias.length > 0 ? (
                    lista_subcategorias.map ((subcategoria, numsubcat) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    subcategorias [(4 * numsubcat)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardSubCategoria subcategoria={subcategorias[(4 * numsubcat)]} key={(4 * numsubcat)} index={(4 * numsubcat)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    subcategorias [((4 * numsubcat) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardSubCategoria subcategoria={subcategorias[((4 * numsubcat) + 1)]} key={((4 * numsubcat) + 1)} index={((4 * numsubcat) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    subcategorias [((4 * numsubcat) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardSubCategoria subcategoria={subcategorias[((4 * numsubcat) + 2)]} key={((4 * numsubcat) + 2)} index={((4 * numsubcat) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    subcategorias [((4 * numsubcat) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardSubCategoria subcategoria={subcategorias[((4 * numsubcat) + 3)]} key={((4 * numsubcat) + 3)} index={((4 * numsubcat) + 3)} proporcional={proporcional}/>
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
