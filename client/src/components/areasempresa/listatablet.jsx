import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {areasempresadata} from '../../redux/slice/areasempresadata'
import { areasempresaConstants } from '../../uri/areasempresa-constants.js'

import CardAreaEmpresaTablet from './card/areaempresatablet.jsx'

export default function ListaAreasEmpresa ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_areas_empresa, setListaAreasEmpresa] = useState ([])
    const [areas_empresa, setAreasEmpresa] = useState ([])
    const [total_areas_empresa, setTotalarea_empresas] = useState(0)

    const {get_areas_empresa} = useSelector(({areasempresa_data}) => areasempresa_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(areasempresadata(areasempresaConstants(0, {}, false).get_areas_empresa))
    }, [])

    useEffect(() => {
        if (get_areas_empresa && get_areas_empresa.success === true && get_areas_empresa.areas_empresa){
            let data = get_areas_empresa.areas_empresa.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            if (get_areas_empresa.total_areas_empresa){setTotalarea_empresas(get_areas_empresa.total_areas_empresa)}
            setAreasEmpresa (get_areas_empresa.areas_empresa)
            setListaAreasEmpresa (lista)
        }
    }, [get_areas_empresa])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_areas_empresa && lista_areas_empresa.length > 0 ? (
                    lista_areas_empresa.map ((area_empresa, numarea) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    areas_empresa [(2 * numarea)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardAreaEmpresaTablet area_empresa={areas_empresa[(2 * numarea)]} key={(2 * numarea)} index={(2 * numarea)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    areas_empresa [((2 * numarea) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardAreaEmpresaTablet area_empresa={areas_empresa[((2 * numarea) + 1)]} key={((2 * numarea) + 1)} index={((2 * numarea) + 1)} proporcional={proporcional}/>
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
