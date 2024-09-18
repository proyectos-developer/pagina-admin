import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { constantes } from '../../../../../uri/constantes'

export default function NuevoTrabajadorCell({proporcional, trabajador_proyecto}) {
    
    const [data_trabajador, setDataTrabajador] = useState({})
    const [tarea, setTarea] = useState({})

    useEffect(() => {
        axios.get(`${constantes().url_principal[0].url}/trabajador/${trabajador_proyecto.id_trabajador}`)
            .then ((res) => {
                setDataTrabajador(res.data.trabajador)
                axios.get(`${constantes().url_principal[0].url}/gestion/actividad/proyecto/${trabajador.id_tarea}`)
                    .then ((res) => {
                        setTarea(res.data.tarea_proyecto)
                    }).catch ((err) => {

                    })
            }).catch ((err) => {
                
            })
    }, [])

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                background: '#007bff' }}>
                <h2 style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 600, marginBottom: 0,
                    fontFamily: 'Merriweather', color: 'white'}}>Nuevo miembro del proyecto
                </h2>
            </div>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Nombres: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}>
                        {data_trabajador && data_trabajador.nombres ? `${data_trabajador.nombres + ' ' + data_trabajador.apellidos}` : ''}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Tarea: 
                    <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {tarea && tarea.tarea ? tarea.tarea : ''}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Rol asignado: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {trabajador.rol_asignado}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Disponibilidad: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {trabajador.disponibilidad}</span>
                </h4>
            </div>
        </div>
    )
}
