import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { constantes } from '../../../../../uri/constantes'
import { useDispatch } from 'react-redux'
import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'

export default function CardTrabajadorCell({proporcional, index, trabajador}) {

    const dispatch = useDispatch()

    const [over_card, setOverCard] = useState('')
    const [data_trabajador, setDataTrabajador] = useState({})

    useEffect(() => {
        axios.get (`${constantes().url_principal[0].url}/trabajador/${trabajador.id_trabajador}`)
            .then ((res) => {
                setDataTrabajador(res.data.trabajador)
            }).catch ((err) => {

            })
    }, [])

    const obtener_datos_trabajador_proyecto = () => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(trabajador.id, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_trabajador_proyecto))
    }

    return (
        <div style={{width: '100%', height: 'auto', padding: 5 / proporcional}}
            onMouseOver={() => setOverCard(trabajador.id)} onMouseLeave={() => setOverCard('')}>
            {
                data_trabajador && data_trabajador.nombres ? (
                    <h6 className='rounded' key={index} 
                        style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                            color: over_card === trabajador.id ? 'white' : '#4a4a4a', background: over_card === trabajador.id ? '#007bff' : 'white'}}>{index + 1}. 
                            <span style={{fontSize: 16 / proporcional, fontWeight: 600, cursor: 'pointer'}}
                            onClick={() => obtener_datos_trabajador_proyecto(trabajador.id)}> {data_trabajador.nombres + ' ' + data_trabajador.apellidos}
                        </span>
                    </h6>
                ) : null
            }
        </div>
    )
}
