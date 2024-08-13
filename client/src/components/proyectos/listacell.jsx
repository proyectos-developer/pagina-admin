import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {proyectosdata} from '../../redux/slice/proyectosdata'
import { proyectosConstants } from '../../uri/proyectos-constants.js'

import CardProyectoCell from './card/proyectocell.jsx'

export default function ListaProyectosCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_proyectos, setListaProyectos] = useState ([])

    const {get_proyectos} = useSelector(({proyectos_data}) => proyectos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(proyectosdata(proyectosConstants(0, 0, 0, {}, false).get_proyectos))
    }, [])

    useEffect(() => {
        if (get_proyectos && get_proyectos.success === true && get_proyectos.proyectos){
            setListaProyectos (get_proyectos.proyectos)
        }
    }, [get_proyectos])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_proyectos && lista_proyectos.length > 0 ? (
                    lista_proyectos.map ((proyecto, numproy) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardProyectoCell proyecto={proyecto} key={numproy} index={numproy} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
