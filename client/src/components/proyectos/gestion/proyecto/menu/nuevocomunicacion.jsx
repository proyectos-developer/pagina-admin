import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { constantes } from '../../../../../uri/constantes'

export default function NuevoComunicacion({proporcional, comunicacion_proyecto}) {
    
    const [usuario_remitente, setUsuarioRemitente] = useState('')
    const [usuario_receptor, setUsuarioReceptor] = useState('')

    useEffect(() => {
        axios.get(`${constantes().url_principal[0].url}/trabajador/${comunicacion_proyecto.usuario_comunica}`)
            .then ((res) => {
                setUsuarioRemitente(res.data.trabajador.nombres + ' ' + res.data.trabajador.apellidos)
                axios.get(`${constantes().url_principal[0].url}/trabajador/${comunicacion_proyecto.usuarios_receptores}`)
                    .then ((res) => {
                        setUsuarioReceptor(res.data.trabajador.nombres + ' ' + res.data.trabajador.apellidos)
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
                    fontFamily: 'Merriweather', color: 'white'}}>Nueva comunicación del equipo
                </h2>
            </div>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Remitente: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}>
                        {usuario_remitente}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Receptores: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}>
                        {usuario_receptor}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Tipo comunicacion: 
                    <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {comunicacion_proyecto.tipo_comunicacion}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Notas: 
                    <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {comunicacion_proyecto.notas}</span>
                </h4>
            </div>
        </div>
    )
}
