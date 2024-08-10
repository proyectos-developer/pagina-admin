import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {tipoproyectosdata} from '../../redux/slice/tipoproyectosdata'
import { tipoproyectoConstants } from '../../uri/tipoproyecto-constants.js'

import CardTipoProyecto from './card/tipoproyecto.jsx'

export default function ListaClientes ({proporcional}) {

    const dispatch = useDispatch()

    const [lista_tipo_proyectos, setListaTipoProyectos] = useState ([])
    const [tipo_proyectos, setTipoProyectos] = useState ([])

    const {get_tipo_proyectos} = useSelector(({tipoproyectos_data}) => tipoproyectos_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        dispatch(tipoproyectosdata(tipoproyectoConstants(0, {}, false).get_tipo_proyectos))
    }, [])

    useEffect(() => {
        if (get_tipo_proyectos && get_tipo_proyectos.success === true && get_tipo_proyectos.tipo_proyectos){
            let data = get_tipo_proyectos.tipo_proyectos.length
            let lista = []
            let cuenta = data / 4 < 1 ? 1 : data % 4 !== 0 ? (data / 4) + 1 : data / 4
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            setTipoProyectos (get_tipo_proyectos.tipo_proyectos)
            setListaTipoProyectos (lista)
        }
    }, [get_tipo_proyectos])

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            {
                lista_tipo_proyectos && lista_tipo_proyectos.length > 0 ? (
                    lista_tipo_proyectos.map ((tipo_proyecto, numtip) => {
                        return (
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                {
                                    tipo_proyectos [(4 * numtip)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTipoProyecto tipo_proyecto={tipo_proyectos[(4 * numtip)]} key={(4 * numtip)} index={(4 * numtip)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    tipo_proyectos [((4 * numtip) + 1)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTipoProyecto tipo_proyecto={tipo_proyectos[((4 * numtip) + 1)]} key={((4 * numtip) + 1)} index={((4 * numtip) + 1)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    tipo_proyectos [((4 * numtip) + 2)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTipoProyecto tipo_proyecto={tipo_proyectos[((4 * numtip) + 2)]} key={((4 * numtip) + 2)} index={((4 * numtip) + 2)} proporcional={proporcional}/>
                                        </div>
                                    ) : (
                                        <div style={{width: '24%', height: 'auto'}}/>
                                    )
                                }
                                {
                                    tipo_proyectos [((4 * numtip) + 3)] ? (
                                        <div style={{width: '24%', height: 'auto'}}>
                                            <CardTipoProyecto tipo_proyecto={tipo_proyectos[((4 * numtip) + 3)]} key={((4 * numtip) + 3)} index={((4 * numtip) + 3)} proporcional={proporcional}/>
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
