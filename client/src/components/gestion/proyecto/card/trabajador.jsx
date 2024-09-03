import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { constantes } from '../../../../uri/constantes'
import { useDispatch } from 'react-redux'
import {gestionproyectosdata} from '../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants'

export default function CardTrabajador({proporcional, index, trabajador}) {

    const dispatch = useDispatch()
    const [data_trabajador, setDataTrabajador] = useState({})

    useEffect(() => {
        axios.get (`${constantes().url_principal[0].url}/trabajador/${trabajador.id_trabajador}`)
            .then ((res) => {
                setDataTrabajador(res.data.trabajador)
            }).catch ((err) => {

            })
    }, [])

    const obtener_datos_trabajador_proyecto = () => {
        console.log (trabajador)
        dispatch(gestionproyectosdata(gestionproyectosConstants(trabajador.id, 0, 0, 0, 0, 0, 0, 0, 0, {}, false).get_trabajador_proyecto))
    }

    return (
        <div key={index} style={{width: '100%', height: 30 / proporcional}}>
            {
                data_trabajador && data_trabajador.nombres ? (
                    <h6 key={index} style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                        color: '#4a4a4a'}}>{index + 1}. <span style={{fontSize: 16 / proporcional, color: '#4a4a4a', fontWeight: 600,
                                cursor: 'pointer'}}
                            onClick={() => obtener_datos_trabajador_proyecto(data_trabajador.id)}>
                            {data_trabajador.nombres + ' ' + data_trabajador.apellidos}
                        </span>
                    </h6>
                ) : null
            }
        </div>
    )
}
