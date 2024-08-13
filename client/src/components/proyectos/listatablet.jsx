import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {proyectosdata} from '../../redux/slice/proyectosdata'
import { proyectosConstants } from '../../uri/proyectos-constants.js'

import CardProyectoTablet from './card/proyectotablet.jsx'

export default function ListaProyectosTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_proyectos, setListaProyectos] = useState ([])
    const [proyectos, setProyectos] = useState ([])

    const {get_proyectos} = useSelector(({proyectos_data}) => proyectos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(proyectosdata(proyectosConstants(0, 0, 0, {}, false).get_proyectos))
    }, [])

    useEffect(() => {
        if (get_proyectos && get_proyectos.success === true && get_proyectos.proyectos){
            let data = get_proyectos.proyectos.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            setProyectos (get_proyectos.proyectos)
            setListaProyectos (lista)
        }
    }, [get_proyectos])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_proyectos && lista_proyectos.length > 0 ? (
                    lista_proyectos.map ((proyecto, numproy) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    proyectos [(2 * numproy)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardProyectoTablet proyecto={proyectos[(2 * numproy)]} key={(2 * numproy)} index={(2 * numproy)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '48%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    proyectos [((2 * numproy) + 1)] ? (
                                        <div style={{width: '48%', height: 'auto'}}>
                                            <CardProyectoTablet proyecto={proyectos[((2 * numproy) + 1)]} key={((2 * numproy) + 1)} index={((2 * numproy) + 1)} proporcional={proporcional}/>
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
