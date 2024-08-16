import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {unidadesdata} from '../../redux/slice/unidadesdata'
import { unidadesConstants } from '../../uri/unidades-constants.js'

import CardUnidadCell from './card/unidadcell.jsx'

export default function ListaUnidadesCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_unidades, setListaUnidades] = useState ([])
    const [total_unidades, setTotalUnidades] = useState(0)

    const {get_unidades} = useSelector(({unidades_data}) => unidades_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(unidadesdata(unidadesConstants(0, {}, false).get_unidades))
    }, [])

    useEffect(() => {
        if (get_unidades && get_unidades.success === true && get_unidades.unidades){
            if (get_unidades.total_unidades){setTotalUnidades(get_unidades.total_unidades)}
            setListaUnidades (get_unidades.unidades)
        }
    }, [get_unidades])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_unidades && lista_unidades.length > 0 ? (
                    lista_unidades.map ((unidad, numuni) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardUnidadCell unidad={unidad} key={numuni} index={numuni} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
