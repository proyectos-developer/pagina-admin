import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { constantes } from '../../../../../uri/constantes'

export default function NuevoKpiCell({proporcional, kpi_proyecto}) {

    const [tarea, setTarea] = useState({})
    
    useEffect(() => {
        axios.get(`${constantes().url_principal[0].url}/gestion/actividad/proyecto/${kpi_proyecto.id_tarea}`)
            .then ((res) => {
                setTarea (res.data.tarea_proyecto)
            }).catch ((err) => {

            })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                background: '#007bff' }}>
                <h2 style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 600, marginBottom: 0,
                    fontFamily: 'Merriweather', color: 'white'}}>Nuevo kpi
                </h2>
            </div>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Tarea: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}>
                        <br/>{tarea && tarea.nombre ? tarea.nombre : ''}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>(%) tara completada: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}>
                        <br/>{kpi_proyecto.pocentaje_tarea_completada}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Desviacion presupuesto: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}>
                        <br/>{kpi_proyecto.desviacion_presupuesto}</span>
                </h4>
            </div>
        </div>
    )
}
