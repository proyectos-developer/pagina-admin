import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {tipoproyectosdata} from '../../redux/slice/tipoproyectosdata'
import { tipoproyectoConstants } from '../../uri/tipoproyecto-constants.js'

import CardTipoProyectoCell from './card/tipoproyectocell.jsx'

export default function ListaTiposProyectosCell ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_tipo_proyectos, setListaTipoProyectos] = useState ([])

    const {get_tipo_proyectos} = useSelector(({tipoproyectos_data}) => tipoproyectos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, {}, false).get_tipo_proyectos))
    }, [])

    useEffect(() => {
        if (get_tipo_proyectos && get_tipo_proyectos.success === true && get_tipo_proyectos.tipo_proyectos){
            setListaTipoProyectos (get_tipo_proyectos.tipo_proyectos)
        }
    }, [get_tipo_proyectos])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_tipo_proyectos && lista_tipo_proyectos.length > 0 ? (
                    lista_tipo_proyectos.map ((tipo_proyecto, numtip) => {
                        return (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                                <div style={{width: '90%', height: 'auto'}}>
                                    <CardTipoProyectoCell tipo_proyecto={tipo_proyecto} key={numtip} index={numtip} proporcional={proporcional}/>
                                </div>
                            </div>
                        )
                    })
                ) : null
            }            
        </div>
    )
}
