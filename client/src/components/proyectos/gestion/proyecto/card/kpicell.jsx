import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { constantes } from '../../../../../uri/constantes'
import { useDispatch } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'

export default function CardKpiCell({proporcional, index, kpi}) {

    const dispatch = useDispatch()

    const [over_card, setOverCard] = useState('')
    const [data_tarea, setDataTarea] = useState({})

    useEffect(() => {
        axios.get (`${constantes().url_principal[0].url}/gestion/actividad/proyecto/${kpi.id_tarea}`)
            .then ((res) => {
                setDataTarea(res.data.tarea_proyecto)
            }).catch ((err) => {

            })
    }, [])

    const obtener_datos_kpi = () => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(kpi.id, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_kpi_proyecto))
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 5 / proporcional}}
            onMouseOver={() => setOverCard(kpi.id)} onMouseLeave={() => setOverCard('')}>
            {
                data_tarea && data_tarea.tarea ? (
                    <h6 className='rounded' key={index} 
                        style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: over_card === kpi.id ? 'white' : '#4a4a4a', background: over_card === kpi.id ? '#007bff' : 'white'}}>{index + 1}. 
                            <span style={{fontSize: 16 / proporcional, fontWeight: 600, cursor: 'pointer'}}
                            onClick={() => obtener_datos_kpi(kpi.id)}> {data_tarea.tarea}
                        </span>
                    </h6>
                ) : null
            }
        </div>
    )
}
