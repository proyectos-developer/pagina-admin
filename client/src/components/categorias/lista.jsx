import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {categoriasdata} from '../../redux/slice/categoriasdata'
import { categoriasConstants } from '../../uri/categorias-constants.js'

import CardCategoria from './card/categoria.jsx'

export default function ListaCategorias ({proporcional}) {

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
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
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
                                    categorias [(4 * numcat)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCategoria categoria={categorias[(4 * numcat)]} key={(4 * numcat)} index={(4 * numcat)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    categorias [((4 * numcat) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCategoria categoria={categorias[((4 * numcat) + 1)]} key={((4 * numcat) + 1)} index={((4 * numcat) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    categorias [((4 * numcat) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCategoria categoria={categorias[((4 * numcat) + 2)]} key={((4 * numcat) + 2)} index={((4 * numcat) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    categorias [((4 * numcat) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardCategoria categoria={categorias[((4 * numcat) + 3)]} key={((4 * numcat) + 3)} index={((4 * numcat) + 3)} proporcional={proporcional}/>
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
