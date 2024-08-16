import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {subcategoriasdata} from '../../redux/slice/subcategoriasdata'
import { subcategoriasConstants } from '../../uri/subcategorias-constants.js'

import CardSubCategoriaCell from './card/subcategoriacell.jsx'

export default function ListaSubCategoriasCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_subcategorias, setSubListaCategorias] = useState ([])
    const [total_subcategorias, setTotalSubCategorias] = useState(0)

    const {get_subcategorias} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(subcategoriasdata(subcategoriasConstants(0, {}, false).get_subcategorias))
    }, [])

    useEffect(() => {
        if (get_subcategorias && get_subcategorias.success === true && get_subcategorias.subcategorias){
            if (get_subcategorias.total_subcategorias){setTotalSubCategorias(get_subcategorias.total_subcategorias)}
            setSubListaCategorias (get_subcategorias.subcategorias)
        }
    }, [get_subcategorias])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_subcategorias && lista_subcategorias.length > 0 ? (
                    lista_subcategorias.map ((subcategoria, numsubcat) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardSubCategoriaCell subcategoria={subcategoria} key={numsubcat} index={numsubcat} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
