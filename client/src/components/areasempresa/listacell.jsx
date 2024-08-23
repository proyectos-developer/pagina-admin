import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {areasempresadata} from '../../redux/slice/areasempresadata'
import { areasempresaConstants } from '../../uri/areasempresa-constants.js'

import CardAreaEmpresaCell from './card/areaempresaCell.jsx'

export default function ListaAreasEmpresa ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_areas_empresa, setListaAreasEmpresa] = useState ([])
    const [total_areas_empresa, setTotalarea_empresas] = useState(0)

    const {get_areas_empresa} = useSelector(({areasempresa_data}) => areasempresa_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(areasempresadata(areasempresaConstants(0, {}, false).get_areas_empresa))
    }, [])

    useEffect(() => {
        if (get_areas_empresa && get_areas_empresa.success === true && get_areas_empresa.areas_empresa){
            if (get_areas_empresa.total_areas_empresa){setTotalarea_empresas(get_areas_empresa.total_areas_empresa)}
            setListaAreasEmpresa (get_areas_empresa.areas_empresa)
        }
    }, [get_areas_empresa])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_areas_empresa && lista_areas_empresa.length > 0 ? (
                    lista_areas_empresa.map ((area_empresa, numarea) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardAreaEmpresaCell area_empresa={area_empresa} key={numarea} index={numarea} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
